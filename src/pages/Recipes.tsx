import { useState } from 'react'
import RecipesList from '@/features/recipes'
import BaseButton from '@/ui/BaseButton'
import AddRecipeModal from '@/features/recipes/components/AddRecipeModal'

export default function Recipes() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex flex-col px-6 py-10 w-full">
            <header className="mb-6 pb-2 flex justify-between gap-2">
                <h1 className="text-2xl font-bold">Recipes</h1>
                <BaseButton onClick={() => setIsOpen(true)}>Add new recipe</BaseButton>
            </header>
            <RecipesList />
            <AddRecipeModal open={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    )
}
