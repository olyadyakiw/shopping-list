import ProductsList from '../features/products-list'

export default function ShoppingList() {
    return (
        <div className="flex flex-col px-6 py-10 w-full">
            <header className="mb-6 pb-2">
                <h1 className="text-2xl font-bold">Shopping List</h1>
            </header>
            <section>
                <ProductsList />
            </section>
        </div>
    )
}
