import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useFormik } from 'formik'
import { InputField } from '@/ui/Input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import SelectField from '@/ui/Select'
import { categoryOptions } from '@/constants/categoryOption'
import { unitsOption } from '@/constants/unitsOption'
import { useAddCatalogItem } from '@/hooks/useAddCatalogItem'
import { useAddProduct } from '../hooks/useAddProduct'
import type { Product } from '../types'
import * as Yup from 'yup'

type Props = {
    defaultName: string
    open: boolean
    onClose: () => void
}

const modalValidationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    count: Yup.number().min(0.01, 'Min 0.01').required('Count is required'),
})

export default function AddProductModal({ defaultName, open, onClose }: Props) {
    const { addCatalogItem } = useAddCatalogItem()
    const { addProduct } = useAddProduct()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: defaultName,
            count: 0,
            units: 'kg',
            category: 'Dairy',
        },
        validationSchema: modalValidationSchema,
        onSubmit: values => {
            const item = {
                name: values.name,
                count: +values.count,
                units: values.units,
                category: values.category as Product['category'],
                isChecked: false,
            }
            const catalogItem = {
                name: values.name,
                units: values.units,
                category: values.category,
            }
            addProduct(item)
            addCatalogItem(catalogItem)
            toast.success('Product has been added')
            formik.resetForm()
            onClose()
        },
    })

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add product</DialogTitle>
                </DialogHeader>
                <form onSubmit={formik.handleSubmit}>
                    <InputField
                        fieldName="Product"
                        placeholder="Add product..."
                        type="string"
                        {...formik.getFieldProps('name')}
                        error={formik.touched.count ? formik.errors.name : undefined}
                    />
                    <InputField
                        fieldName="Count"
                        placeholder=""
                        type="number"
                        min={1}
                        {...formik.getFieldProps('count')}
                        error={formik.touched.count ? formik.errors.count : undefined}
                    />
                    <SelectField
                        label="Units"
                        value={formik.values.units}
                        onChange={value => formik.setFieldValue('units', value)}
                        options={unitsOption}
                    />
                    <SelectField
                        label="Category"
                        value={formik.values.category}
                        onChange={value => formik.setFieldValue('category', value)}
                        options={categoryOptions}
                    />
                    <Button className="w-full mt-2" type="submit">
                        Add
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
