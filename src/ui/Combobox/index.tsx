'use client'

import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox'

type ComboboxProps<T extends string> = {
    label: string
    value: T
    onChange: (value: T) => void
    options: string[]
    inputValue?: string
    emptyContent?: React.ReactNode
    onSearchChange?: (value: string) => void
}

export default function ComboboxBasic<T extends string>({
    label,
    value,
    onChange,
    onSearchChange,
    emptyContent,
    options,
    inputValue,
}: ComboboxProps<T>) {
    return (
        <label className="flex flex-col gap-1 mb-2">
            <span className="text-sm">{label}:</span>
            <Combobox
                inputValue={inputValue}
                onInputValueChange={onSearchChange}
                value={value}
                onValueChange={val => val && onChange(val as T)}
                items={options}
            >
                <ComboboxInput placeholder="Choose item" />
                <ComboboxContent>
                    <ComboboxEmpty>{emptyContent}</ComboboxEmpty>
                    <ComboboxList>
                        {(option: string) => (
                            <ComboboxItem key={option} value={option}>
                                {option}
                            </ComboboxItem>
                        )}
                    </ComboboxList>
                </ComboboxContent>
            </Combobox>
        </label>
    )
}
