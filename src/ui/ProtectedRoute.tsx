import { useUser } from '@/features/auth/hooks/useUser'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useUser()

    if (isLoading) return <div>Loading...</div>

    if (!isAuthenticated) return <Navigate to="/login" />

    return children
}

export default ProtectedRoute
