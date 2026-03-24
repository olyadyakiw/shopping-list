import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProduct as updateProductFn } from '../../services/apiProducts'
import type { Product } from './types'

export function useUpdateProduct() {
    const queryClient = useQueryClient()

    const { mutate: updateProduct, isPending } = useMutation({
        mutationFn: ({ id, updates }: { id: number; updates: Partial<Product> }) => updateProductFn(id, updates),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
    })

    return { updateProduct, isPending }
}
