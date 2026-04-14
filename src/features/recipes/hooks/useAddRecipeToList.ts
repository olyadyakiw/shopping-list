import { useAddProduct } from '@/features/products-list/hooks/useAddProduct'
import { useProducts } from '@/features/products-list/hooks/useProducts'
import { useUpdateProduct } from '@/features/products-list/hooks/useUpdateProduct'
import type { Recipe } from '../types'

export function useAddRecipeToList() {
    const { products } = useProducts()
    const { addProduct } = useAddProduct()
    const { updateProduct } = useUpdateProduct()

    function addRecipeToList(recipe: Recipe) {
        recipe.ingredients.forEach(ingredient => {
            const ingr = ingredient.catalog
            const existing = products.find(p => p.name === ingr.name)
            if (existing) {
                updateProduct({ id: existing.id!, updates: { count: existing.count + ingredient.count } })
            } else {
                addProduct({
                    name: ingr.name,
                    count: ingredient.count,
                    category: ingr.category,
                    units: ingr.units,
                    isChecked: false,
                })
            }
        })
    }

    return { addRecipeToList }
}
