import supabase from './supabase'

export async function getRecipes() {
    const { data, error } = await supabase
        .from('recipes')
        .select('*, ingredients(count, catalog(name, units, category))')
        .order('created_at', { ascending: true })
    console.log(data)

    if (error) {
        console.error(error)
        throw new Error('Recipes could not be loaded')
    }
    return data
}
