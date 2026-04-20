import Product from './components/Product'
import type { Product as ProductType } from './types'
import { useProducts } from './hooks/useProducts'
import { categoryOptions } from '@/constants/categoryOption'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

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
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2 }} gutterBreakPoints={{ 360: 16, 750: 20 }}>
            <Masonry gutter="32px">
                {!isLoading
                    ? Object.entries(groupedProducts).map(([category, items]) => {
                          const color = categoryOptions.find(cat => cat.val === category)?.color
                          return (
                              <div key={category} className="w-full">
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
            </Masonry>
        </ResponsiveMasonry>
    )
}
