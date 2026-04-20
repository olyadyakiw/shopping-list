import { useProducts } from '../hooks/useProducts'
import { useDeleteProduct } from '../hooks/useDeleteProduct'
import BaseButton from '@/ui/BaseButton'
import ConfirmDeleteProductsModal from './ConfirmDeleteProductsModal'
import { useState } from 'react'

export default function ShoppingListActions() {
    const { products } = useProducts()
    const { deleteProduct, isCreating } = useDeleteProduct()
    const [showModal, isShowModal] = useState(false)

    function handleDeleteChecked() {
        const checked = products.filter(product => product.isChecked === true)
        checked.forEach(product => deleteProduct(product.id))
    }

    return (
        <div className="flex gap-2 justify-between">
            <BaseButton
                className="bg-green text-light-green hover:bg-green/80 max-w-36 w-full py-2"
                disabled={isCreating}
                onClick={handleDeleteChecked}
            >
                Clear checked
            </BaseButton>
            <BaseButton
                className="bg-red text-light-red hover:bg-red/80 max-w-36 w-full py-2"
                disabled={isCreating}
                onClick={() => isShowModal(true)}
            >
                Clear Entire List
            </BaseButton>
            <ConfirmDeleteProductsModal
                open={showModal}
                onClose={() => {
                    isShowModal(false)
                }}
            />
        </div>
    )
}
