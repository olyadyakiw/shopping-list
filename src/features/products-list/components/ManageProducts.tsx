import { useProducts } from '../hooks/useProducts'
import ShoppingListActions from './ShoppingListActions'
import ProgressBar from '@/ui/ProgressBar'

export default function ManageProducts() {
    const { products } = useProducts()
    const checkedLength = products.filter(product => product.isChecked === true).length
    const percents = +(products.length === 0 ? 0 : (checkedLength / products.length) * 100).toFixed(0)

    return (
        <div className="flex flex-col py-10 px-8 bg-light-grey rounded-[30px] w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Manage products</h2>
                <span className="text-dark-grey font-semibold">
                    {checkedLength}/{products.length}
                </span>
            </div>
            <ProgressBar value={percents} />
            <ShoppingListActions />
        </div>
    )
}
