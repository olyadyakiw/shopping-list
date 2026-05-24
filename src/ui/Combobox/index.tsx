'use client'

import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox'
import BaseButton from '../BaseButton'

type ComboboxProps<T extends string> = {
    value: T
    onChange: (value: T) => void
    options: string[]
    isShowModal: (value: boolean) => void
    inputValue?: string
    emptyContent?: React.ReactNode
    onSearchChange?: (value: string) => void
    label?: string
    searchText?: string
}

export default function ComboboxBasic<T extends string>({
    label,
    value,
    onChange,
    onSearchChange,
    emptyContent,
    options,
    inputValue,
    isShowModal,
    searchText,
}: ComboboxProps<T>) {
    const filteredOptions = searchText
        ? options.filter(o => o.toLowerCase().includes(searchText.toLowerCase()))
        : options

    return (
        <label className="flex flex-col gap-2">
            {label && <span className="text-base font-semibold">{label}:</span>}
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
                    <div className="flex flex-col">
                        <ComboboxList>
                            {(option: string) => (
                                <ComboboxItem key={option} value={option}>
                                    {option.toLowerCase()}
                                </ComboboxItem>
                            )}
                        </ComboboxList>
                        {filteredOptions.length > 0 && !options.includes(searchText ?? '') && (
                            <div className="p-1 border-t border-border">
                                <BaseButton
                                    className="bg-green hover:bg-green/80 text-light-green w-full"
                                    type="button"
                                    onClick={() => isShowModal(true)}
                                >
                                    Add {searchText || 'new product'}
                                </BaseButton>
                            </div>
                        )}
                    </div>
                </ComboboxContent>
            </Combobox>
        </label>
    )
}
