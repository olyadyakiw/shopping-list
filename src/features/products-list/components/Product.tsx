import { IoIosClose } from 'react-icons/io'

import type { Product, ProductProps } from '../types'
import { useUpdateProduct } from '../useUpdateProduct'

export default function Product({ id, name, count, isChecked, onDelete }: ProductProps) {
    const { updateProduct, isPending } = useUpdateProduct()
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
                    {count}
                    <button onClick={() => onDelete(name)}>
                        <IoIosClose className="size-8" />
                    </button>
                </div>
            </label>
        </li>
    )
}
