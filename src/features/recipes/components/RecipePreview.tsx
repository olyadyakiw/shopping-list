import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { Recipe } from '../types'
import { useFormik } from 'formik'
import { validationSchema } from '@/ui/Input/validationSchema'
import { InputField } from '@/ui/Input'
import Ingredient from './Ingredient'
import { Button } from '@/components/ui/button'
import { useAddRecipeToList } from '../hooks/useAddRecipeToList'

type Props = {
    recipe: Recipe | null
    open: boolean
    onClose: () => void
}

export default function RecipePreview({ recipe, open, onClose }: Props) {
    const { addRecipeToList } = useAddRecipeToList()

    const formik = useFormik({
        initialValues: {
            count: 1,
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log(values)
        },
    })

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{recipe?.title}</DialogTitle>
                </DialogHeader>
                <p>{recipe?.description}</p>
                <InputField
                    fieldName="Count"
                    placeholder=""
                    type="number"
                    {...formik.getFieldProps('count')}
                    error={formik.touched.count ? formik.errors.count : undefined}
                />
                {recipe?.ingredients.map(ingredient => {
                    return <Ingredient key={ingredient.id} {...ingredient} />
                })}
                <Button onClick={() => addRecipeToList(recipe!)}>Add</Button>
            </DialogContent>
        </Dialog>
    )
}
