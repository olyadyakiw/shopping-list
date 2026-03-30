export type Option<T> = {
    val: T
    name: string
}

type SelectProps<T extends string> = {
    label: string
    value: T
    onChange: (value: T) => void
    options: Option<T>[]
}

export default function Select<T extends string>({ label, value, onChange, options }: SelectProps<T>) {
    return (
        <label className="flex flex-col gap-2 mb-2">
            <span>{label}:</span>

            <select value={value} onChange={e => onChange(e.target.value as T)} className="border-2 border-black">
                {options.map(option => (
                    <option key={option.val} value={option.val}>
                        {option.name}
                    </option>
                ))}
            </select>
        </label>
    )
}
