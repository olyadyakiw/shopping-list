import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { Recipe } from '../types'
import { useAddRecipeToList } from '../hooks/useAddRecipeToList'
import { toast } from 'sonner'

type Props = {
    recipe: Recipe
    onPreview: () => void
    count: number
}

function RecipeItem({ recipe, onPreview, count }: Props) {
    const { addRecipeToList } = useAddRecipeToList()

    function handleAddButton() {
        addRecipeToList(recipe, count)
        toast.success('Recepy has been added')
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>{recipe.title}</CardTitle>
            </CardHeader>
            <CardFooter>
                <Button onClick={onPreview}>Preview</Button>
                <Button onClick={handleAddButton}>Add</Button>
            </CardFooter>
        </Card>
    )
}

export default RecipeItem
