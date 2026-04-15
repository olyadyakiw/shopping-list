import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addCatalogItem as addCatalogItemFn } from '../services/apiCatalog'

export function useAddCatalogItem() {
    const queryClient = useQueryClient()

    const { mutate: addCatalogItem, isPending: isCreating } = useMutation({
        mutationFn: addCatalogItemFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['catalog'] })
        },
        onError: err => console.error(err.message),
    })

    return { isCreating, addCatalogItem }
}
