import { useState } from 'react'
import { CiSquarePlus } from 'react-icons/ci'
import { useAddProduct } from '../hooks/useAddProduct'
import type { Product } from '../types'
import { useProducts } from '../hooks/useProducts'
import { useUpdateProduct } from '../hooks/useUpdateProduct'
import Select from '../../../ui/Select'
import { unitsOption } from '../../../constants/unitsOption'
import { categoryOptions } from '../../../constants/categoryOption'

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
                <Select label="Units" value={units} onChange={setUnits} options={unitsOption} />
                <Select label="Category" value={category} onChange={setCategory} options={categoryOptions} />
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
