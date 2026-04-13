import { useState } from 'react'
import { CiSquarePlus } from 'react-icons/ci'
import { useAddProduct } from '../hooks/useAddProduct'
import type { Product } from '../types'
import { useProducts } from '../hooks/useProducts'
import { useUpdateProduct } from '../hooks/useUpdateProduct'
import { InputField } from '@/ui/Input'
import { useFormik } from 'formik'
import { validationSchema } from '@/ui/Input/validationSchema'
import { Button } from '@/components/ui/button'
import ComboboxBasic from '@/ui/Combobox'
import { useCatalog } from '../hooks/useCatalog'

export default function AddNewProduct() {
    const [showForm, isShowForm] = useState(false)

    const formik = useFormik({
        initialValues: {
            product: '',
            count: 1,
            units: '',
            category: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            if (values.product) {
                const existing = products.find((p: Product) => p.name === values.product)
                if (existing) {
                    updateProduct({ id: existing.id!, updates: { count: existing.count + values.count } })
                    formik.resetForm()
                } else {
                    const item = {
                        name: values.product,
                        count: +values.count,
                        units: values.units,
                        category: values.category as Product['category'],
                        isChecked: false,
                    }
                    addProduct(item)
                    formik.resetForm()
                }
            }
        },
    })

    const { isCreating, addProduct } = useAddProduct()
    const { products } = useProducts()
    const { updateProduct } = useUpdateProduct()
    const { catalog } = useCatalog()

    return (
        <div className="flex gap-3 flex-col">
            <Button onClick={() => isShowForm(!showForm)} className="flex gap-2 items-center mb-2 cursor-pointer">
                <CiSquarePlus className="size-6" />
                Add new product
            </Button>
            <form onSubmit={formik.handleSubmit} className={`${showForm ? '' : 'hidden'}`}>
                <ComboboxBasic
                    label="Products"
                    value={formik.values.product}
                    onChange={value => {
                        const catalogItem = catalog.find(item => item.name === value)
                        formik.setFieldValue('product', value)
                        if (catalogItem) {
                            formik.setFieldValue('units', catalogItem.units)
                            formik.setFieldValue('category', catalogItem.category)
                        }
                    }}
                    options={catalog.map(item => item.name)}
                />
                <InputField
                    fieldName="Count"
                    placeholder=""
                    type="number"
                    {...formik.getFieldProps('count')}
                    error={formik.touched.count ? formik.errors.count : undefined}
                />
                <div className="flex gap-3">
                    <Button disabled={isCreating} type="submit">
                        Add
                    </Button>
                    <Button onClick={() => isShowForm(false)} type="button">
                        Close
                    </Button>
                </div>
            </form>
        </div>
    )
}
