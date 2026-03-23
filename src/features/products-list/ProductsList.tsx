import { useState } from 'react'
import AddNewProduct from './components/AddNewProduct'
import Product from './components/Product'
import type { Products, Product as ProductType } from './types'

const initialProducts: Products = []

export default function ProductsList() {
    const [products, setProducts] = useState<Products>(initialProducts)

    const handleAddProduct = (product: ProductType) => {
        setProducts(prev => [...prev, product])
    }

    const handleDeleteProduct = (name: string) => {
        setProducts(prev => prev.filter(item => item.name !== name))
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
                            onDelete={handleDeleteProduct}
                        />
                    )
                })}
            </ul>
        </div>
    )
}
