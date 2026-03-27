import type { Product } from '../features/products-list/types'
import type { Option } from '../ui/Select'

export const categoryOptions: Option<Product['category']>[] = [
    { val: 'Dairy', name: 'Dairy' },
    { val: 'Meat & Fish', name: 'Meat & Fish' },
    { val: 'Fruits & Vegetables', name: 'Fruits & Vegetables' },
    { val: 'Bakery', name: 'Bakery' },
    { val: 'Frozen', name: 'Frozen' },
    { val: 'Snacks', name: 'Snacks' },
    { val: 'Household', name: 'Household' },
    { val: 'Personal Care', name: 'Personal Care' },
]
