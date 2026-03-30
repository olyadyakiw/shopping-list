import { useState } from 'react'
import { CiSquarePlus } from 'react-icons/ci'
import { useAddProduct } from '../hooks/useAddProduct'
import type { Product } from '../types'
import { useProducts } from '../hooks/useProducts'
import { useUpdateProduct } from '../hooks/useUpdateProduct'
import Select from '../../../ui/Select'
import { unitsOption } from '../../../constants/unitsOption'
import { categoryOptions } from '../../../constants/categoryOption'
import { InputField } from '@/ui/Input'
import { useFormik } from 'formik'
import { validationSchema } from '@/ui/Input/validationSchema'
import { Button } from '@/components/ui/button'

export default function AddNewProduct() {
    const [showForm, isShowForm] = useState(false)

    const formik = useFormik({
        initialValues: {
            product: '',
            count: 1,
            category: 'Dairy',
            units: 'pieces',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            if (values.product) {
                const existing = products.find((p: Product) => p.name === values.product)
                if (existing) {
                    updateProduct({ id: existing.id!, updates: { count: existing.count + values.count } })
                } else {
                    const item = {
                        name: values.product,
                        count: +values.count,
                        units: values.units,
                        category: values.category as Product['category'],
                        isChecked: false,
                    }
                    addProduct(item)
                }
            }
        },
    })

    const { isCreating, addProduct } = useAddProduct()
    const { products } = useProducts()
    const { updateProduct } = useUpdateProduct()

    return (
        <div className="flex gap-3 flex-col">
            <Button onClick={() => isShowForm(!showForm)} className="flex gap-2 items-center mb-2 cursor-pointer">
                <CiSquarePlus className="size-6" />
                Add new product
            </Button>
            <form onSubmit={formik.handleSubmit} className={`${showForm ? '' : 'hidden'}`}>
                <InputField
                    fieldName="Product"
                    placeholder="Add new product"
                    type="text"
                    error={formik.touched.product ? formik.errors.product : undefined}
                    {...formik.getFieldProps('product')}
                />
                <InputField
                    fieldName="Count"
                    placeholder=""
                    type="number"
                    {...formik.getFieldProps('count')}
                    error={formik.touched.count ? formik.errors.count : undefined}
                />

                <Select
                    label="Units"
                    value={formik.values.units}
                    onChange={value => formik.setFieldValue('units', value)}
                    options={unitsOption}
                />
                <Select
                    label="Category"
                    value={formik.values.category}
                    onChange={value => formik.setFieldValue('category', value)}
                    options={categoryOptions}
                />
                <div className="flex gap-3">
                    <button disabled={isCreating} className="cursor-pointer border-2 black px-6 py-3" type="submit">
                        Add
                    </button>
                    <button
                        onClick={() => isShowForm(false)}
                        className="cursor-pointer border-2 black px-6 py-3"
                        type="button"
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    )
}
