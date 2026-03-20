import { useState } from 'react'
import AddNewProduct from './components/AddNewProduct'
import Product from './components/Product'
import type { Products, Product as ProductType } from './types'

const initialProducts: Products = [{ name: 'tomato', count: 1, checked: true }]

export default function ProductsList() {
    const [products, setProducts] = useState<Products>(initialProducts)

    const handleAddProduct = (product: ProductType) => {
        setProducts(prev => [...prev, product])
    }

    return (
        <div className="max-w-100">
            <AddNewProduct onAdd={handleAddProduct} />
            <ul>
                {products.map((product, index) => {
                    return (
                        <Product
                            key={`${product.name}-${index}`}
                            name={product.name}
                            count={product.count}
                            checked={product.checked}
                        />
                    )
                })}
            </ul>
        </div>
    )
}
