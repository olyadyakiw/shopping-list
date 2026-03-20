import { useState } from 'react'
import { CiSquarePlus } from 'react-icons/ci'
import type { Product } from '../types'

type Props = {
    onAdd: (product: Product) => void
}

export default function AddNewProduct({ onAdd }: Props) {
    const [showForm, isShowForm] = useState(false)
    const [product, setProduct] = useState('')
    const [count, setCount] = useState(1)

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (product) {
            onAdd({ name: product, count, checked: false })
        }
        setProduct('')
        setCount(1)
    }

    return (
        <div className="flex gap-3 flex-col">
            <button onClick={() => isShowForm(!showForm)} className="flex gap-2 items-center mb-2 cursor-pointer">
                <CiSquarePlus className="size-6" />
                Add new product
            </button>
            <form onSubmit={handleSubmit} className={`${showForm ? '' : 'hidden'}`}>
                <label className="flex flex-col gap-2 mb-2">
                    <span>Product:</span>
                    <input
                        className="border-2 border-black"
                        value={product}
                        onChange={e => setProduct(e.target.value)}
                        type="text"
                    />
                </label>
                <label className="flex flex-col gap-2 mb-2">
                    <span>Count: </span>
                    <input
                        className="border-2 border-black"
                        value={count}
                        onChange={e => setCount(+e.target.value)}
                        type="number"
                    />
                </label>
                <div className="flex gap-3">
                    <button className="cursor-pointer border-2 black px-6 py-3" type="submit">
                        Add
                    </button>
                    <button
                        onClick={() => isShowForm(false)}
                        className="cursor-pointer border-2 black px-6 py-3"
                        type="button"
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    )
}
