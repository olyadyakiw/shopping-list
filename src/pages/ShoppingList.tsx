import AddNewProduct from '@/features/products-list/components/AddNewProduct'
import ProductsList from '../features/products-list/ProductsList'
import ShoppingListActions from '@/features/products-list/components/ShoppingListActions'

export default function ShoppingList() {
    return (
        <div className="flex flex-col px-6 py-10 w-full">
            <header className="flex justify-between gap-2 mb-6 pb-2">
                <h1 className="text-4xl font-semibold">Ready to shop?</h1>
                <ShoppingListActions />
            </header>
            <section>
                <div className="flex justify-between gap-16">
                    <div className="max-w-90 w-full">
                        <AddNewProduct />
                    </div>
                    <ProductsList />
                </div>
            </section>
        </div>
    )
}
