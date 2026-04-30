import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProduct as updateProductFn } from '../../../services/apiProducts'
import type { Product } from '../types'

export function useUpdateProduct() {
    const queryClient = useQueryClient()

    const { mutate: updateProduct, isPending } = useMutation({
        mutationFn: ({ id, updates }: { id: number; updates: Partial<Product> }) => updateProductFn(id, updates),
        onMutate: ({ id, updates }) => {
            const previousProducts = queryClient.getQueryData(['products'])
            queryClient.setQueryData(['products'], (old: Product[]) =>
                old.map(product => {
                    if (product.id === id) {
                        return { ...product, ...updates }
                    } else {
                        return product
                    }
                }),
            )
            return { previousProducts }
        },
        onError: (_err, _variables, context) => {
            queryClient.setQueryData(['products'], context?.previousProducts)
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
    })

    return { updateProduct, isPending }
}
