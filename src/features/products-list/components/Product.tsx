import { IoIosClose } from 'react-icons/io'

import type { Product } from '../types'

export default function Product({ name, count }: Product) {
    return (
        <li>
            <label className="flex justify-between items-center gap-2">
                <div className="flex gap-2">
                    <input type="checkbox" />
                    {name}
                </div>
                <div className="flex gap-2 items-center">
                    {count}
                    <button>
                        <IoIosClose className="size-8" />
                    </button>
                </div>
            </label>
        </li>
    )
}
