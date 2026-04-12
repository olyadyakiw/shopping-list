import supabase from './supabase'

export async function getCatalog() {
    const { data, error } = await supabase.from('catalog').select('*').order('name', { ascending: true })
    console.log(data)

    if (error) {
        console.error(error)
        throw new Error('Catalog could not be loaded')
    }
    return data
}
