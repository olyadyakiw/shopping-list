import { getRecipes } from '@/services/apiRecipes'
import { useQuery } from '@tanstack/react-query'

export function useRecipes() {
    const {
        isLoading,
        error,
        data: recipes = [],
    } = useQuery({
        queryKey: ['recipes'],
        queryFn: getRecipes,
    })

    return { isLoading, error, recipes }
}
