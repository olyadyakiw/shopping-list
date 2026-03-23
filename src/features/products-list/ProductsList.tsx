import { useState } from 'react'
import AddNewProduct from './components/AddNewProduct'
import Product from './components/Product'
import type { Products, Product as ProductType } from './types'
import { useProducts } from './useProducts'

export default function ProductsList() {
    const { products, isLoading } = useProducts()
    const [_, setProducts] = useState<Products>(products)

    const handleAddProduct = (product: ProductType) => {
        setProducts(prev => [...prev, product])
    }

    const handleDeleteProduct = (name: string) => {
        setProducts(prev => prev.filter(item => item.name !== name))
    }

    return (
        <div className="max-w-96">
            <AddNewProduct onAdd={handleAddProduct} />
            <ul>
                {products.map((product, index) => {
                    return (
                        <Product
                            key={`${product.name}-${index}`}
                            name={product.name}
                            count={product.count}
                            isChecked={product.isChecked}
                            onDelete={handleDeleteProduct}
                        />
                    )
                })}
            </ul>
        </div>
    )
}
