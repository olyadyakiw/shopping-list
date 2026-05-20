import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteRecipe } from '@/services/apiRecipes'

export function useDeleteRecipe() {
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: deleteRecipe,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recipes'] }),
        onError: error => console.log('delete error', error),
    })

    return { deleteRecipe: mutate, isPending }
}
