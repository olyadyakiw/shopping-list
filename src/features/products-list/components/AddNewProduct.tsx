import { useState } from 'react'
import { CiSquarePlus } from 'react-icons/ci'
import { useAddProduct } from '../hooks/useAddProduct'
import type { Product } from '../types'
import { useProducts } from '../hooks/useProducts'
import { useUpdateProduct } from '../hooks/useUpdateProduct'

export default function AddNewProduct() {
    const [showForm, isShowForm] = useState(false)
    const [product, setProduct] = useState('')
    const [count, setCount] = useState(1)
    const [units, setUnits] = useState('Pieces')
    const [category, setCategory] = useState<Product['category']>('Dairy')

    const { isCreating, addProduct } = useAddProduct()
    const { products } = useProducts()
    const { updateProduct } = useUpdateProduct()

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (product) {
            const existing = products.find((p: Product) => p.name === product)
            if (existing) {
                updateProduct({ id: existing.id!, updates: { count: existing.count + count } })
            } else {
                const item = { name: product, count, units, category, isChecked: false }
                addProduct(item)
            }
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
                <label className="flex flex-col gap-2 mb-2">
                    <span>Units: </span>
                    <select value={units} onChange={e => setUnits(e.target.value)} className="border-2 border-black">
                        <option value="pieces">Pieces</option>
                        <option value="litres">Litres</option>
                        <option value="Gramms">Gramms</option>
                    </select>
                </label>
                <label className="flex flex-col gap-2 mb-2">
                    <span>Category: </span>
                    <select
                        value={category}
                        onChange={e => setCategory(e.target.value as Product['category'])}
                        className="border-2 border-black"
                    >
                        <option value="Dairy">Dairy</option>
                        <option value="Meat & Fish">Meat & Fish</option>
                        <option value="Fruits & Vegetables">Fruits & Vegetables</option>
                        <option value="Bakery">Bakery</option>
                        <option value="Frozen">Frozen</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Household">Household</option>
                        <option value="Personal Care">Personal Care</option>
                    </select>
                </label>
                <div className="flex gap-3">
                    <button disabled={isCreating} className="cursor-pointer border-2 black px-6 py-3" type="submit">
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
