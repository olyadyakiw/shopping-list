import { IoIosClose } from 'react-icons/io'

import type { Product } from '../types'
import { useUpdateProduct } from '../hooks/useUpdateProduct'
import { useDeleteProduct } from '../hooks/useDeleteProduct'

export default function Product({ id, name, count, units, isChecked }: Product) {
    const { updateProduct, isPending } = useUpdateProduct()
    const { deleteProduct, isCreating } = useDeleteProduct()
    return (
        <li>
            <label className="flex justify-between items-center gap-2">
                <div className="flex gap-2">
                    <input
                        disabled={isPending}
                        onChange={() => id && updateProduct({ id, updates: { isChecked: !isChecked } })}
                        checked={isChecked}
                        type="checkbox"
                    />
                    {name}
                </div>
                <div className="flex gap-2 items-center">
                    {count} {units}
                    <button className="cursor-pointer" disabled={isCreating} onClick={() => id && deleteProduct(id)}>
                        <IoIosClose className="size-8" />
                    </button>
                </div>
            </label>
        </li>
    )
}
