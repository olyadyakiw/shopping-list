import Product from './components/Product'
import type { Product as ProductType } from './types'
import { useProducts } from './hooks/useProducts'
import { categoryOptions } from '@/constants/categoryOption'

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
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-x-6 lg:gap-y-8">
            {!isLoading
                ? Object.entries(groupedProducts).map(([category, items]) => {
                      const color = categoryOptions.find(cat => cat.val === category)?.color
                      return (
                          <div key={category}>
                              <h2
                                  className={`py-2 bg-${color} text-white w-full text-center font-semibold text-xl rounded-[8px] mb-2`}
                              >
                                  {category}
                              </h2>
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
                                              color={color}
                                          />
                                      )
                                  })}
                              </ul>
                          </div>
                      )
                  })
                : 'Loading...'}
        </div>
    )
}
