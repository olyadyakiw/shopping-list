import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createRecipe } from '@/services/apiRecipes'

export function useCreateRecipe() {
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: createRecipe,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recipes'] }),
    })

    return { createRecipe: mutate, isPending }
}
