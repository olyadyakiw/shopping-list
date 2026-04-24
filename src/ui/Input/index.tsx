import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    fieldName?: string
    error?: string
    className?: string
    inputClassName?: string
}

export function InputField({ fieldName, error, className, inputClassName, ...rest }: InputFieldProps) {
    return (
        <Field className={`gap-2 mb-2 ${className}`}>
            {fieldName && (
                <FieldLabel className="text-base font-normal" htmlFor={`input-field-${fieldName}`}>
                    {fieldName}
                </FieldLabel>
            )}
            <Input className={`bg-white ${inputClassName}`} {...rest} id={`input-field-${fieldName}`} />
            <FieldError>{error && <span>{error}</span>}</FieldError>
        </Field>
    )
}
