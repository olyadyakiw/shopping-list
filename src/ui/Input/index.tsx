import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    fieldName: string
    error?: string
}

export function InputField({ fieldName, error, ...rest }: InputFieldProps) {
    return (
        <Field className="gap-1 mb-2">
            <FieldLabel htmlFor={`input-field-${fieldName}`}>{fieldName}</FieldLabel>
            <Input {...rest} id={`input-field-${fieldName}`} />
            <FieldError>{error && <span>{error}</span>}</FieldError>
        </Field>
    )
}
