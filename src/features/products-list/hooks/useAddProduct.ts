import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addProduct as addProductFn } from '../../../services/apiProducts'

export function useAddProduct() {
    const queryClient = useQueryClient()

    const { mutate: addProduct, isPending: isCreating } = useMutation({
        mutationFn: addProductFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
        },
        onError: err => console.error(err.message),
    })

    return { isCreating, addProduct }
}
