export type Product = {
    name: string
    count: number
    isChecked: boolean
}

export type Products = Product[]

export type ProductProps = Product & {
    onDelete: (name: string) => void
}
