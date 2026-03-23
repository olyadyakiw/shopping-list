import { IoIosClose } from 'react-icons/io'

import type { Product, ProductProps } from '../types'
import { useState } from 'react'

export default function Product({ name, count, checked, onDelete }: ProductProps) {
    const [isChecked, setIsChecked] = useState(checked)

    return (
        <li>
            <label className="flex justify-between items-center gap-2">
                <div className="flex gap-2">
                    <input onChange={() => setIsChecked(!isChecked)} checked={isChecked} type="checkbox" />
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
