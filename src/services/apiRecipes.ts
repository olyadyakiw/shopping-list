import type { Ingredient } from '@/features/recipes/types'
import supabase from './supabase'

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
    ingredients,
}: {
    id: number
    title: string
    description: string
    category: string
    ingredients: Ingredient[]
}) {
    const { error: recipeError } = await supabase.from('recipes').update({ title, description, category }).eq('id', id)

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
    ingredients,
}: {
    title: string
    description: string
    ingredients: Ingredient[]
}) {
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const { data, error } = await supabase
        .from('recipes')
        .insert({ title, description: description || '', user_id: user!.id })
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
        .insert({ title: `${recipe.title} (copy)`, description: recipe.description, user_id: user!.id })
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
