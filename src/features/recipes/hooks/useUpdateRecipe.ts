import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateRecipe as updateRecipeFn } from '../../../services/apiRecipes'

export function useUpdateRecipe() {
    const queryClient = useQueryClient()

    const { mutate: updateRecipe, isPending } = useMutation({
        mutationFn: updateRecipeFn,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['recipes'] }),
    })

    return { updateRecipe, isPending }
}
