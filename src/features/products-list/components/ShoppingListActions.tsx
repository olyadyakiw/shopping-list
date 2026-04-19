import { useProducts } from '../hooks/useProducts'
import { useDeleteProduct } from '../hooks/useDeleteProduct'
import BaseButton from '@/ui/BaseButton'

export default function ShoppingListActions() {
    const { products } = useProducts()
    const { deleteProduct, isCreating } = useDeleteProduct()

    function handleDeleteAll() {
        products.forEach(product => deleteProduct(product.id))
    }

    function handleDeleteChecked() {
        const checked = products.filter(product => product.isChecked === true)
        checked.forEach(product => deleteProduct(product.id))
    }

    return (
        <div className="flex gap-2 flex-wrap mb-4">
            <BaseButton className="bg-black hover:bg-black/80" disabled={isCreating} onClick={handleDeleteChecked}>
                Clear checked items
            </BaseButton>
            <BaseButton className="bg-black hover:bg-black/80" disabled={isCreating} onClick={handleDeleteAll}>
                Clear all
            </BaseButton>
        </div>
    )
}
