import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { Recipe } from '../types'
import { useFormik } from 'formik'
import { validationSchema } from '@/ui/Input/validationSchema'
import { InputField } from '@/ui/Input'
import Ingredient from './Ingredient'
import { Button } from '@/components/ui/button'
import { useAddRecipeToList } from '../hooks/useAddRecipeToList'
import { toast } from 'sonner'

type Props = {
    recipe: Recipe | null
    open: boolean
    onClose: () => void
}

export default function RecipePreview({ recipe, open, onClose }: Props) {
    const { addRecipeToList } = useAddRecipeToList()

    const formik = useFormik({
        initialValues: {
            count: 2,
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log(values)
        },
    })

    function handleAddButton() {
        addRecipeToList(recipe!, formik.values.count)
        onClose()
        toast.success('Recepy has been added')
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{recipe?.title}</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">{recipe?.description}</p>
                <InputField
                    fieldName="Count"
                    placeholder=""
                    type="number"
                    {...formik.getFieldProps('count')}
                    error={formik.touched.count ? formik.errors.count : undefined}
                />
                <ul>
                    {recipe?.ingredients.map(ingredient => {
                        const ingrCount = (ingredient.count * +formik.values.count).toFixed(2)
                        return <Ingredient key={ingredient.id} {...ingredient} count={+ingrCount} />
                    })}
                </ul>
                <Button className="w-full mt-2" onClick={handleAddButton}>
                    Add
                </Button>
            </DialogContent>
        </Dialog>
    )
}
