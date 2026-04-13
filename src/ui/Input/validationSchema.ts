import * as Yup from 'yup'

export const validationSchema = Yup.object({
    product: Yup.string().required('Product is required'),
    count: Yup.number().min(0.01, 'Min 0.01').required('Count is required'),
})
