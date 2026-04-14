import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { Recipe } from '../types'
import { useAddRecipeToList } from '../hooks/useAddRecipeToList'

type Props = {
    recipe: Recipe
    onPreview: () => void
}

function RecipeItem({ recipe, onPreview }: Props) {
    const { addRecipeToList } = useAddRecipeToList()
    return (
        <Card>
            <CardHeader>
                <CardTitle>{recipe.title}</CardTitle>
            </CardHeader>
            <CardFooter>
                <Button onClick={onPreview}>Preview</Button>
                <Button onClick={() => addRecipeToList(recipe)}>Add</Button>
            </CardFooter>
        </Card>
    )
}

export default RecipeItem
