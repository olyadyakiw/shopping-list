import { useState } from 'react'
import { type Recipe } from './types'
import { mockRecipes } from './data'
import RecipeItem from './components/RecipeItem'
import RecipePreview from './components/RecipePreview'

export default function RecipesList() {
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)

    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                {mockRecipes.map(recipe => (
                    <RecipeItem key={recipe.id} recipe={recipe} onPreview={() => setSelectedRecipe(recipe)} />
                ))}
            </div>

            <RecipePreview recipe={selectedRecipe} open={!!selectedRecipe} onClose={() => setSelectedRecipe(null)} />
        </>
    )
}
