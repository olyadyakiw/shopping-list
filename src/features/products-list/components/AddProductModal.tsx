import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog-base-ui'
import { useFormik } from 'formik'
import { InputField } from '@/ui/Input'
import { toast } from 'sonner'
import SelectField from '@/ui/Select'
import { categoryOptions } from '@/constants/categoryOption'
import { unitsOption } from '@/constants/unitsOption'
import { useAddCatalogItem } from '@/hooks/useAddCatalogItem'
import { useAddProduct } from '../hooks/useAddProduct'
import type { Product } from '../types'
import * as Yup from 'yup'
import FileEditsOutlineIcon from '@/components/icons/FileEditsOutlineIcon'
import BaseButton from '@/ui/BaseButton'

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
            count: 1,
            units: 'pcs',
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
            <DialogContent className="sm:max-w-90 sm:px-7.5 sm:py-6 bg-light-grey gap-4" showCloseButton={false}>
                <DialogHeader>
                    <div className="flex items-center gap-1">
                        <FileEditsOutlineIcon fill="var(--color-black)" width="36" height="36" />
                        <DialogTitle className="text-2xl font-semibold">Add product</DialogTitle>
                    </div>
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
                    <div className="flex gap-2 justify-between mt-4">
                        <BaseButton
                            className="bg-green text-light-green hover:bg-green/80 max-w-37 w-full"
                            type="submit"
                        >
                            Add
                        </BaseButton>
                        <BaseButton
                            onClick={e => {
                                e.preventDefault()
                                onClose()
                            }}
                            className="bg-black hover:bg-black/80 text-white max-w-37 w-full"
                            type="button"
                        >
                            Cancel
                        </BaseButton>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
