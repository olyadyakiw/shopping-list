export type Recipe = {
    id: number
    title: string
    description: string
    ingredients: Ingredient[]
    direction: string
    category: string
    image: string
}

export type Ingredient = {
    id: number
    count: number
    recipe_id: number
    catalog_id: number
    catalog: Catalog
}

export type Catalog = {
    name: string
    units: string
    category: string
}
