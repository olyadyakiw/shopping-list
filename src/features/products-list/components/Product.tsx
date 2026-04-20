import type { Product } from '../types'
import { useUpdateProduct } from '../hooks/useUpdateProduct'
import { useDeleteProduct } from '../hooks/useDeleteProduct'
import FileEditsOutlineIcon from '@/components/icons/FileEditsOutlineIcon'
import TrashCanOutlineIcon from '@/components/icons/TrashCanOutlineIcon'
import BaseButton from '@/ui/BaseButton'
import CheckboxBase from '@/ui/CheckboxBase'
import EditProductModal from './EditProductModal'
import { useState } from 'react'

export default function Product(product: Product) {
    const { updateProduct, isPending } = useUpdateProduct()
    const { deleteProduct, isCreating } = useDeleteProduct()
    const { id, name, count, units, isChecked, color } = product
    const [showModal, isShowModal] = useState(false)
    return (
        <>
            <li>
                <label className="flex justify-between items-center gap-2">
                    <div className="flex gap-2 items-center capitalize py-2">
                        <CheckboxBase
                            className={`data-[state=checked]:bg-${color} data-[state=checked]:border-${color}`}
                            disabled={isPending}
                            onCheckedChange={() => id && updateProduct({ id, updates: { isChecked: !isChecked } })}
                            checked={isChecked}
                        />
                        {name}
                    </div>
                    <div className="flex gap-2 items-center">
                        {count} {units}
                        <div className="flex">
                            <BaseButton
                                className={`text-${color} cursor-pointer bg-transparent hover:bg-light-grey p-0 rounded-lg size-7`}
                                disabled={isCreating}
                                onClick={() => isShowModal(true)}
                            >
                                <FileEditsOutlineIcon className="size-6" />
                            </BaseButton>
                            <BaseButton
                                className={`text-${color} cursor-pointer bg-transparent hover:bg-light-grey p-0 rounded-lg size-7`}
                                disabled={isCreating}
                                onClick={() => id && deleteProduct(id)}
                            >
                                <TrashCanOutlineIcon className="size-6" />
                            </BaseButton>
                        </div>
                    </div>
                </label>
            </li>
            <EditProductModal
                product={product}
                open={showModal}
                onClose={() => {
                    isShowModal(false)
                }}
            />
        </>
    )
}
