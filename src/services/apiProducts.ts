import supabase from './supabase'

export async function getProducts() {
    const { data, error } = await supabase.from('products').select('*')
    console.log(data)

    if (error) {
        console.error(error)
        throw new Error('Settings could not be loaded')
    }
    return data
}
