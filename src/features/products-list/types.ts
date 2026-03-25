export type Product = {
    name: string
    count: number
    isChecked: boolean
    units: string
    category:
        | 'Dairy'
        | 'Meat & Fish'
        | 'Fruits & Vegetables'
        | 'Bakery'
        | 'Frozen'
        | 'Snacks'
        | 'Household'
        | 'Personal Care'
    id?: number
}

export type Products = Product[]
