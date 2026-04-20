import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProduct as deleteProductFn } from '../../../services/apiProducts'

export function useDeleteProduct() {
    const queryClient = useQueryClient()

    const {
        mutate: deleteProduct,
        mutateAsync: deleteProductAsync,
        isPending: isCreating,
    } = useMutation({
        mutationFn: deleteProductFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
        onError: err => console.error(err.message),
    })

    return { isCreating, deleteProduct, deleteProductAsync }
}
