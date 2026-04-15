import { getCatalog } from '@/services/apiCatalog'
import { useQuery } from '@tanstack/react-query'

export function useCatalog() {
    const {
        isLoading,
        error,
        data: catalog = [],
    } = useQuery({
        queryKey: ['catalog'],
        queryFn: getCatalog,
    })

    return { isLoading, error, catalog }
}
