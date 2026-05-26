import { useState } from 'react'
import RecipesList from '@/features/recipes'
import BaseButton from '@/ui/BaseButton'
import AddRecipeModal from '@/features/recipes/components/AddRecipeModal'
import { CiSquarePlus } from 'react-icons/ci'

export default function Recipes() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex flex-col px-6 py-10 w-full">
            <header className="my-6 pb-2 flex justify-between gap-2">
                <div className="flex gap-3 items-start max-w-sm w-full">
                    <BaseButton
                        className="bg-green hover:bg-green/80 text-light-green w-full"
                        type="button"
                        onClick={() => setIsOpen(true)}
                    >
                        <CiSquarePlus className="size-6 text-light-green" />
                        Create new recipe
                    </BaseButton>
                </div>
            </header>
            <RecipesList />
            <AddRecipeModal open={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    )
}
