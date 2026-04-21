import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './ui/AppLayout'
import ShoppingList from './pages/ShoppingList'
import Templates from './pages/Templates'
import Recipes from './pages/Recipes'
import NewRecipe from './pages/NewPesipe'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from './components/ui/sonner'
import ProtectedRoute from './ui/ProtectedRoute'

function App() {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route
                        element={
                            <ProtectedRoute>
                                <AppLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Navigate replace to="shopping-list" />} />
                        <Route path="shopping-list" element={<ShoppingList />} />
                        <Route path="recipes" element={<Recipes />} />
                        <Route path="recepies/new" element={<NewRecipe />} />
                        <Route path="templates" element={<Templates />} />
                    </Route>

                    <Route path="login" element={<Login />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
            <Toaster />
        </QueryClientProvider>
    )
}

export default App
