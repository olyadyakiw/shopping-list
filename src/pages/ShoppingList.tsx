import AddNewProduct from '@/features/products-list/components/AddNewProduct'
import ProductsList from '../features/products-list/ProductsList'
import ManageProducts from '@/features/products-list/components/ManageProducts'
import { useProducts } from '@/features/products-list/hooks/useProducts'

export default function ShoppingList() {
    const { products } = useProducts()

    return (
        <div className="flex flex-col px-6 py-10 w-full">
            <section>
                <div className="grid gap-x-15 gap-y-8 lg:grid-cols-3">
                    <div className="lg:col-start-1 lg:row-start-1">
                        <ManageProducts />
                    </div>
                    <div className="lg:col-span-2 lg:row-span-3">
                        {products.length === 0 ? 'Add your first product!' : <ProductsList />}
                    </div>
                    <div className="lg:col-start-1 lg:row-start-2">
                        <AddNewProduct />
                    </div>
                </div>
            </section>
        </div>
    )
}
