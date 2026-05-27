import type { Ingredient } from '@/features/recipes/types'
import supabase from './supabase'

async function uploadRecipeImage(userId: string, imageFile: File) {
    const safeFileName = imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '-')
    const imagePath = `${userId}/${Date.now()}-${safeFileName}`
    const { error: uploadError } = await supabase.storage.from('recipes_images').upload(imagePath, imageFile, {
        cacheControl: '3600',
        contentType: imageFile.type,
        upsert: false,
    })

    if (uploadError) throw new Error(uploadError.message || 'Recipe image could not be uploaded')

    const {
        data: { publicUrl },
    } = supabase.storage.from('recipes_images').getPublicUrl(imagePath)

    return publicUrl
}

export async function getRecipes() {
    const { data, error } = await supabase
        .from('recipes')
        .select('*, ingredients(id, count, catalog_id, catalog(name, units, category))')
        .order('created_at', { ascending: true })

    if (error) {
        console.error(error)
        throw new Error('Recipes could not be loaded')
    }
    return data
}

export async function updateRecipe({
    id,
    title,
    description,
    category,
    imageFile,
    ingredients,
}: {
    id: number
    title: string
    description: string
    category: string
    imageFile?: File | null
    ingredients: Ingredient[]
}) {
    const updates: { title: string; description: string; category: string; image?: string } = {
        title,
        description,
        category,
    }

    if (imageFile) {
        const {
            data: { user },
        } = await supabase.auth.getUser()

        updates.image = await uploadRecipeImage(user!.id, imageFile)
    }

    const { error: recipeError } = await supabase.from('recipes').update(updates).eq('id', id)

    if (recipeError) throw new Error('Recipe could not be updated')

    const { error: deleteError } = await supabase.from('ingredients').delete().eq('recipe_id', id)

    if (deleteError) throw new Error('Old ingredients could not be deleted')

    const newIngredients = ingredients.map(i => ({
        recipe_id: id,
        catalog_id: i.catalog_id,
        count: i.count,
    }))

    const { error: insertError } = await supabase.from('ingredients').insert(newIngredients)

    if (insertError) throw new Error('New ingredients could not be saved')
}

export async function createRecipe({
    title,
    description,
    category,
    imageFile,
    ingredients,
}: {
    title: string
    description: string
    category: string
    imageFile: File
    ingredients: Ingredient[]
}) {
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const publicUrl = await uploadRecipeImage(user!.id, imageFile)

    const { data, error } = await supabase
        .from('recipes')
        .insert({ title, description: description || '', category, image: publicUrl, user_id: user!.id })
        .select()
        .single()

    if (error) throw new Error('Recipe could not be created')

    const newIngredients = ingredients.map(i => ({
        recipe_id: data.id,
        catalog_id: i.catalog_id,
        count: i.count,
    }))

    if (newIngredients.length) {
        const { error: ingredientsError } = await supabase.from('ingredients').insert(newIngredients)
        if (ingredientsError) throw new Error('Ingredients could not be saved')
    }

    return data
}

export async function deleteRecipe(id: number) {
    const { error } = await supabase.from('recipes').delete().eq('id', id)
    if (error) throw new Error('Recipe could not be deleted')
}

export async function duplicateRecipe(id: number) {
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const { data: recipe, error: fetchError } = await supabase
        .from('recipes')
        .select('*, ingredients(catalog_id, count)')
        .eq('id', id)
        .single()

    if (fetchError) throw new Error('Recipe could not be fetched')

    const { data: newRecipe, error: insertError } = await supabase
        .from('recipes')
        .insert({
            title: `${recipe.title} (copy)`,
            description: recipe.description,
            category: recipe.category,
            image: recipe.image,
            user_id: user!.id,
        })
        .select()
        .single()

    if (insertError) throw new Error('Recipe could not be duplicated')

    if (recipe.ingredients.length) {
        const newIngredients = recipe.ingredients.map((i: { catalog_id: number; count: number }) => ({
            recipe_id: newRecipe.id,
            catalog_id: i.catalog_id,
            count: i.count,
        }))

        const { error: ingredientsError } = await supabase.from('ingredients').insert(newIngredients)
        if (ingredientsError) throw new Error('Ingredients could not be duplicated')
    }

    return newRecipe
}
