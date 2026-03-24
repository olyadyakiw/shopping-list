export type Product = {
    name: string
    count: number
    isChecked: boolean
    id?: number
}

export type Products = Product[]

export type ProductProps = Product & {
    onDelete: (name: string) => void
}
