import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export type Option<T> = {
    val: T
    name: string
    color?: string
}

type SelectProps<T extends string> = {
    value: T
    onChange: (value: T) => void
    options: Option<T>[]
    label?: string
}

export default function SelectField<T extends string>({ label, value, onChange, options }: SelectProps<T>) {
    return (
        <label className="flex flex-col gap-1 mb-2">
            {label ? <span className="text-base">{label}:</span> : null}
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder={`Select ${label}`} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {options.map(option => (
                            <SelectItem key={option.val} value={option.val}>
                                {option.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </label>
    )
}
