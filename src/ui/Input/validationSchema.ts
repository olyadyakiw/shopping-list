import * as Yup from 'yup'

export const validationSchema = Yup.object({
    product: Yup.string().required('Product is required'),
    count: Yup.number().min(1, 'Min 1').required('Count is required'),
})
