export type Product = {
    name: string
    count: number
    checked: boolean
}

export type Products = Product[]

export type ProductProps = Product & {
    onDelete: (name: string) => void
}
