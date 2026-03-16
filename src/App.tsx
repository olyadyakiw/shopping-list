import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './ui/AppLayout'
import ShoppingList from './pages/ShoppingList'
import Templates from './pages/Templates'
import Recipes from './pages/Recipes'
import NewRecipe from './pages/NewPesipe'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
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
    )
}

export default App
