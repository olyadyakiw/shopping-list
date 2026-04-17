import AddNewProduct from './components/AddNewProduct'
import Product from './components/Product'
import type { Product as ProductType } from './types'
import { useProducts } from './hooks/useProducts'
import { Button } from '@/components/ui/button'
import { useDeleteProduct } from './hooks/useDeleteProduct'

export default function ProductsList() {
    const { products, isLoading } = useProducts()
    const { deleteProduct, isCreating } = useDeleteProduct()

    const groupedProducts = products.reduce<Record<string, ProductType[]>>(
        (acc, product) => {
            const cat = product.category
            if (!acc[cat]) acc[cat] = []
            acc[cat].push(product)
            return acc
        },
        {} as Record<string, ProductType[]>,
    )

    function handleDeleteAll() {
        products.forEach(product => deleteProduct(product.id))
    }

    function handleDeleteChecked() {
        const checked = products.filter(product => product.isChecked === true)
        checked.forEach(product => deleteProduct(product.id))
    }

    return (
        <div className="max-w-96">
            <div className="flex gap-2 flex-wrap mb-4">
                <Button disabled={isCreating} onClick={handleDeleteChecked}>
                    Clear checked items
                </Button>
                <Button disabled={isCreating} onClick={handleDeleteAll}>
                    Clear all
                </Button>
            </div>
            <AddNewProduct />
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
