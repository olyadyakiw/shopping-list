import { Progress } from '@/components/ui/progress'
import { Field, FieldLabel } from '@/components/ui/field'

export default function ProgressBar({ value }: { value: number }) {
    return (
        <Field className="w-full max-w-sm mb-4">
            <FieldLabel htmlFor="progress-upload">
                <span>Progress</span>
                <span className="ml-auto">{value}%</span>
            </FieldLabel>
            <Progress value={value} id="progress-upload" />
        </Field>
    )
}
