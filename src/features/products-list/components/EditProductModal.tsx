import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useFormik } from 'formik'
import { InputField } from '@/ui/Input'
import { toast } from 'sonner'
import SelectField from '@/ui/Select'
import { unitsOption } from '@/constants/unitsOption'
import * as Yup from 'yup'
import { useUpdateProduct } from '../hooks/useUpdateProduct'
import type { Product } from '../types'
import BaseButton from '@/ui/BaseButton'
import FileEditsOutlineIcon from '@/components/icons/FileEditsOutlineIcon'

type Props = {
    product: Product
    open: boolean
    onClose: () => void
}

const modalValidationSchema = Yup.object({
    count: Yup.number().min(0.01, 'Min 0.01').required('Count is required'),
    units: Yup.string().required('Units is required'),
})

export default function EditProductModal({ product, open, onClose }: Props) {
    const { updateProduct } = useUpdateProduct()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            count: product.count,
            units: product.units,
        },
        validationSchema: modalValidationSchema,
        onSubmit: values => {
            const item = {
                count: +values.count,
                units: values.units,
            }

            if (product.id) {
                updateProduct({ id: product.id, updates: item })
            }

            toast.success('Product has been updated')
            formik.resetForm()
            onClose()
        },
    })

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-90 sm:px-7.5 sm:py-6 bg-light-grey" showCloseButton={false}>
                <DialogHeader>
                    <div className="flex items-center gap-1">
                        <FileEditsOutlineIcon width="36" height="36" />
                        <DialogTitle className="text-2xl font-semibold">Update product</DialogTitle>
                    </div>
                </DialogHeader>
                <form onSubmit={formik.handleSubmit}>
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
                    <div className="flex gap-2 justify-between mt-4">
                        <BaseButton
                            className="bg-green text-light-green hover:bg-green/80 max-w-37 w-full"
                            type="submit"
                        >
                            Save
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
