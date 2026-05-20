import { useMutation, useQueryClient } from '@tanstack/react-query'
import { duplicateRecipe } from '@/services/apiRecipes'

export function useDuplicateRecipe() {
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: duplicateRecipe,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recipes'] }),
        onError: error => console.log('duplicate error', error),
    })

    return { duplicateRecipe: mutate, isPending }
}
