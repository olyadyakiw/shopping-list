import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { Recipe } from '../types'

type Props = {
    recipe: Recipe
    onPreview: () => void
}

function RecipeItem({ recipe, onPreview }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{recipe.title}</CardTitle>
            </CardHeader>
            <CardFooter>
                <Button onClick={onPreview}>Preview</Button>
                <Button>Add</Button>
            </CardFooter>
        </Card>
    )
}

export default RecipeItem
