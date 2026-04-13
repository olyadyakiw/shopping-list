import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { Recipe } from '../types'
import ProductsList from '@/features/products-list/ProductsList'
import { useFormik } from 'formik'
import { validationSchema } from '@/ui/Input/validationSchema'
import { InputField } from '@/ui/Input'

type Props = {
    recipe: Recipe | null
    open: boolean
    onClose: () => void
}

export default function RecipePreview({ recipe, open, onClose }: Props) {
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

                <ProductsList />
            </DialogContent>
        </Dialog>
    )
}
