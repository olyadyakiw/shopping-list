import AddNewProduct from './components/AddNewProduct'
import Product from './components/Product'
import type { Products } from './types'

const products: Products = [
    {
        name: 'tomato',
        count: 1,
    },
    {
        name: 'tomato',
        count: 1,
    },
]

export default function ProductsList() {
    return (
        <div className="max-w-100">
            <AddNewProduct />
            <ul>
                {products.map(product => {
                    return <Product key={product.name} name={product.name} count={product.count} />
                })}
            </ul>
        </div>
    )
}
