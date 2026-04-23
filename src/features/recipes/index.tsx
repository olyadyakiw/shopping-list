import { useState } from 'react'
import RecipeItem from './components/RecipeItem'
import RecipePreview from './components/RecipePreview'
import { useRecipes } from './hooks/useRecipes'

export default function RecipesList() {
    const { recipes } = useRecipes()
    const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null)
    const selectedRecipe = recipes.find(r => r.id === selectedRecipeId) ?? null

    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                {recipes.map(recipe => (
                    <RecipeItem
                        key={recipe.id}
                        recipe={recipe}
                        count={2}
                        onPreview={() => setSelectedRecipeId(recipe.id)}
                    />
                ))}
            </div>

            <RecipePreview recipe={selectedRecipe} open={!!selectedRecipe} onClose={() => setSelectedRecipeId(null)} />
        </>
    )
}
