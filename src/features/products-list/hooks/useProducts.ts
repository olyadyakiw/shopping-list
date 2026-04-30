import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../../../services/apiProducts'

export function useProducts() {
    const {
        isLoading,
        error,
        data: products = [],
    } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        staleTime: 5 * 60 * 1000,
    })

    return { isLoading, error, products }
}
