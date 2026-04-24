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
    ingredients,
}: {
    id: number
    title: string
    ingredients: Ingredient[]
}) {
    const { error: titleError } = await supabase.from('recipes').update({ title }).eq('id', id)

    if (titleError) throw new Error('Recipe title could not be updated')

    const { error: deleteError } = await supabase.from('ingredients').delete().eq('recepy_id', id)

    if (deleteError) throw new Error('Old ingredients could not be deleted')

    const newIngredients = ingredients.map(i => ({
        recepy_id: id,
        catalog_id: i.catalog_id,
        count: i.count,
    }))

    const { error: insertError } = await supabase.from('ingredients').insert(newIngredients)

    if (insertError) throw new Error('New ingredients could not be saved')
}
