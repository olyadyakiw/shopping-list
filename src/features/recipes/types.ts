export type Recipe = {
    id: number
    title: string
    ingredients: Ingredient[]
}

export type Ingredient = {
    id: number
    count: number
    recepy_id: number
    catalog_id: number
    catalog: Catalog
}

export type Catalog = {
    name: string
    units: string
    category: string
}
