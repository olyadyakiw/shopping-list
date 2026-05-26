import { useState } from 'react'
import RecipeItem from './components/RecipeItem'
import RecipePreview from './components/RecipePreview'
import { useRecipes } from './hooks/useRecipes'

export default function RecipesList() {
    const { recipes, isLoading } = useRecipes()
    const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null)
    const selectedRecipe = recipes.find(r => r.id === selectedRecipeId) ?? null

    return !isLoading ? (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.map(recipe => (
                    <RecipeItem key={recipe.id} recipe={recipe} onPreview={() => setSelectedRecipeId(recipe.id)} />
                ))}
            </div>

            <RecipePreview recipe={selectedRecipe} open={!!selectedRecipe} onClose={() => setSelectedRecipeId(null)} />
        </>
    ) : (
        <div>Loading...</div>
    )
}
