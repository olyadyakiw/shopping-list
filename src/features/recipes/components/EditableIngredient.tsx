import TrashCanOutlineIcon from '@/components/icons/TrashCanOutlineIcon'
import { useCatalog } from '@/hooks/useCatalog'
import BaseButton from '@/ui/BaseButton'
import ComboboxBasic from '@/ui/Combobox'
import { InputField } from '@/ui/Input'
import { useState } from 'react'
import type { Ingredient } from '../types'

export type Props = {
    ingredient: Ingredient
    onUpdateIngredient: (id: number, changes: Partial<Ingredient>) => void
    onDeleteIngredient: (id: number) => void
}

export default function EditableIngredient({ ingredient, onUpdateIngredient, onDeleteIngredient }: Props) {
    const [searchText, setSearchText] = useState(ingredient.catalog.name)
    const { catalog } = useCatalog()

    // const handleComboboxChange = (value: string) => {
    //     const catalogItem = catalog.find(item => item.name === value)
    //     if (catalogItem) {
    //         onUpdateIngredient(ingredient.id, { catalog: catalogItem, catalog_id: catalogItem.id })
    //     }
    // }

    const handleComboboxChange = (value: string) => {
        console.log('combobox value:', value)
        const catalogItem = catalog.find(item => item.name === value)
        console.log('catalogItem:', catalogItem)
        if (catalogItem) {
            onUpdateIngredient(ingredient.id, { catalog: catalogItem, catalog_id: catalogItem.id })
        }
    }

    return (
        <li className="list-none h-fit w-full flex">
            <label className="flex justify-between items-center gap-2 py-2 border-b border-border last:border-0">
                <ComboboxBasic
                    label="Product List"
                    onSearchChange={setSearchText}
                    onChange={value => {
                        handleComboboxChange(value)
                    }}
                    options={catalog.map(item => item.name)}
                    inputValue={searchText}
                    value={ingredient.catalog.name}
                />
            </label>
            <InputField
                fieldName="Count"
                placeholder=""
                type="number"
                value={ingredient.count}
                onChange={e => {
                    console.log('input changed', e.target.value)
                    onUpdateIngredient(ingredient.id, { count: +e.target.value })
                }}
            />
            {ingredient.catalog.units}
            <BaseButton onClick={() => onDeleteIngredient(ingredient.id)}>
                <TrashCanOutlineIcon />
            </BaseButton>
        </li>
    )
}
