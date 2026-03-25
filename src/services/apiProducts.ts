import type { Product } from '../features/products-list/types'
import supabase from './supabase'

export async function getProducts() {
    const { data, error } = await supabase.from('products').select('*')
    console.log(data)

    if (error) {
        console.error(error)
        throw new Error('Products could not be loaded')
    }
    return data
}

export async function addProduct(newProduct: Product) {
    const { data, error } = await supabase
        .from('products')
        .insert([{ ...newProduct }])
        .select()
        .single()

    if (error) {
        console.error(error)
        throw new Error('Product could not be added')
    }

    return data
}

export async function updateProduct(id: number, updates: Partial<Product>) {
    const { data, error } = await supabase.from('products').update(updates).eq('id', id).select()

    if (error) {
        console.error(error)
        throw new Error('Product could not be updated')
    }

    return data
}

export async function deleteProduct(id: number) {
    const { data, error } = await supabase.from('products').delete().eq('id', id)

    if (error) {
        console.error(error)
        throw new Error('Product could not be deleted')
    }

    return data
}
