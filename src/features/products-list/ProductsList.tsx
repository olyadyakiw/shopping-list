import Product from './components/Product'
import type { Product as ProductType } from './types'
import { useProducts } from './hooks/useProducts'

export default function ProductsList() {
    const { products, isLoading } = useProducts()

    const groupedProducts = products.reduce<Record<string, ProductType[]>>(
        (acc, product) => {
            const cat = product.category
            if (!acc[cat]) acc[cat] = []
            acc[cat].push(product)
            return acc
        },
        {} as Record<string, ProductType[]>,
    )

    return (
        <div className="w-full">
            {!isLoading
                ? Object.entries(groupedProducts).map(([category, items]) => (
                      <div key={category}>
                          <h2>{category}</h2>
                          <ul>
                              {items.map((product: ProductType, index: number) => {
                                  return (
                                      <Product
                                          id={product.id}
                                          key={`${product.name}-${index}`}
                                          name={product.name}
                                          count={product.count}
                                          category={product.category}
                                          units={product.units}
                                          isChecked={product.isChecked}
                                      />
                                  )
                              })}
                          </ul>
                      </div>
                  ))
                : 'Loading...'}
        </div>
    )
}
