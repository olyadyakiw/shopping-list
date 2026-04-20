import type { Product } from '../features/products-list/types'
import type { Option } from '../ui/Select'

export const categoryOptions: Option<Product['category']>[] = [
    { val: 'Dairy', name: 'Dairy', color: 'blue' },
    { val: 'Grocery', name: 'Grocery', color: 'red' },
    { val: 'Meat & Fish', name: 'Meat & Fish', color: 'purple' },
    { val: 'Fruits & Vegetables', name: 'Fruits & Vegetables', color: 'green' },
    { val: 'Bakery', name: 'Bakery', color: 'orange' },
    { val: 'Frozen', name: 'Frozen', color: 'purple' },
    { val: 'Snacks', name: 'Snacks', color: 'pink' },
    { val: 'Beverages', name: 'beverages', color: 'blue' },
    { val: 'Household', name: 'Household', color: 'orange' },
    { val: 'Personal Care', name: 'Personal Care', color: 'red' },
]
