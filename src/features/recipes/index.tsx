import { useState } from 'react'
import { type Recipe } from './types'
import RecipeItem from './components/RecipeItem'
import RecipePreview from './components/RecipePreview'
import { useRecipes } from './hooks/useRecipes'

export default function RecipesList() {
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
    const { recipes } = useRecipes()

    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                {recipes.map(recipe => (
                    <RecipeItem key={recipe.id} recipe={recipe} count={2} onPreview={() => setSelectedRecipe(recipe)} />
                ))}
            </div>

            <RecipePreview recipe={selectedRecipe} open={!!selectedRecipe} onClose={() => setSelectedRecipe(null)} />
        </>
    )
}
