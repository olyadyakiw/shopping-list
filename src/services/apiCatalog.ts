import type { Catalog } from '@/features/recipes/types'
import supabase from './supabase'

export async function getCatalog() {
    const { data, error } = await supabase.from('catalog').select('*').order('name', { ascending: true })

    if (error) {
        console.error(error)
        throw new Error('Catalog could not be loaded')
    }
    return data
}

export async function addCatalogItem(newItem: Catalog) {
    const { data, error } = await supabase
        .from('catalog')
        .insert([{ ...newItem }])
        .select()
        .single()

    if (error) {
        console.error(error)
        throw new Error('Product could not be added')
    }

    return data
}
