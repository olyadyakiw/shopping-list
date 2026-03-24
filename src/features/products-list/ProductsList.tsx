import AddNewProduct from './components/AddNewProduct'
import Product from './components/Product'
import { useProducts } from './useProducts'

export default function ProductsList() {
    const { products, isLoading } = useProducts()

    return (
        <div className="max-w-96">
            <AddNewProduct />
            {!isLoading ? (
                <ul>
                    {products.map((product, index) => {
                        return (
                            <Product
                                id={product.id}
                                key={`${product.name}-${index}`}
                                name={product.name}
                                count={product.count}
                                units={product.units}
                                isChecked={product.isChecked}
                            />
                        )
                    })}
                </ul>
            ) : (
                'Loading...'
            )}
        </div>
    )
}
