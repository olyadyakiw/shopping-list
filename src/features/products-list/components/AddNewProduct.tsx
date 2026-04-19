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
import { useCatalog } from '@/hooks/useCatalog'
import AddProductModal from './AddProductModal'
import BaseButton from '@/ui/BaseButton'

export default function AddNewProduct() {
    const [showModal, isShowModal] = useState(false)
    const [searchText, setSearchText] = useState('')

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

    const handleComboboxChange = (value: string) => {
        const catalogItem = catalog.find(item => item.name === value)
        formik.setFieldValue('product', value)
        if (catalogItem) {
            formik.setFieldValue('units', catalogItem.units)
            formik.setFieldValue('category', catalogItem.category)
        }
    }

    const onSubmitForm = (e: React.FormEvent) => {
        e.preventDefault()
        formik.handleSubmit()
        setSearchText('')
    }

    return (
        <div className="flex flex-col py-10 px-8 bg-light-grey rounded-[30px] w-full">
            <h2 className="text-2xl font-semibold mb-6">Add product</h2>
            <form onSubmit={onSubmitForm}>
                <ComboboxBasic
                    key={showModal ? 'open' : 'closed'}
                    label="Product List"
                    value={formik.values.product}
                    onChange={value => handleComboboxChange(value)}
                    onSearchChange={setSearchText}
                    options={catalog.map(item => item.name)}
                    inputValue={searchText}
                    emptyContent={
                        <Button type="button" onClick={() => isShowModal(true)}>
                            + Add "{searchText}"
                        </Button>
                    }
                />
                <InputField
                    fieldName="Count"
                    placeholder=""
                    type="number"
                    {...formik.getFieldProps('count')}
                    error={formik.touched.count ? formik.errors.count : undefined}
                />
                <div className="flex gap-3">
                    <BaseButton
                        disabled={isCreating}
                        type="submit"
                        className="mt-2 bg-green hover:bg-green/80 text-light-green w-full"
                    >
                        <CiSquarePlus className="size-6 text-light-green" />
                        Add product
                    </BaseButton>
                </div>
            </form>
            <AddProductModal
                open={showModal}
                onClose={() => {
                    isShowModal(false)
                    setSearchText('')
                }}
                defaultName={searchText}
            />
        </div>
    )
}
