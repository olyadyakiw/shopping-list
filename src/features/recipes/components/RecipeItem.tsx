import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { Recipe } from '../types'
import { useAddRecipeToList } from '../hooks/useAddRecipeToList'
import { toast } from 'sonner'
import BaseButton from '@/ui/BaseButton'
import ServingsSelector from './ServingsSelector'
import { useState } from 'react'

type Props = {
    recipe: Recipe
    onPreview: () => void
}

function RecipeItem({ recipe, onPreview }: Props) {
    const { addRecipeToList } = useAddRecipeToList()
    const [servings, setServings] = useState(2)

    function handleAddButton() {
        addRecipeToList(recipe, servings)
        toast.success('Recipe has been added')
    }
    return (
        <Card className="relative">
            <CardHeader className="flex gap-5 h-full">
                <img className="w-26.5 h-26.5 object-cover rounded-[20px]" src={recipe.image} />
                <div className="flex flex-col gap-2 h-full justify-between w-full items-start">
                    <CardTitle>{recipe.title}</CardTitle>
                    <div className="bg-medium-grey px-3 py-1.5 rounded-[30px] text-sm font-semibold text-dark-grey">
                        {recipe.category}
                    </div>
                </div>
            </CardHeader>
            <CardFooter className="flex flex-col md:flex-row gap-2 justify-between">
                <ServingsSelector servings={servings} onServings={setServings} />
                <BaseButton
                    className="bg-green hover:bg-green/80 text-light-green z-1"
                    type="button"
                    onClick={handleAddButton}
                >
                    Add To List
                </BaseButton>
            </CardFooter>
            <div onClick={onPreview} className="inset-0 absolute cursor-pointer rounded-[20px]"></div>
        </Card>
    )
}

export default RecipeItem
