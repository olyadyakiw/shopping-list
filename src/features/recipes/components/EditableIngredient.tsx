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
    ingredients: Ingredient[]
}

export default function EditableIngredient({ ingredient, onUpdateIngredient, onDeleteIngredient, ingredients }: Props) {
    const [searchText, setSearchText] = useState(ingredient.catalog.name)
    const { catalog } = useCatalog()

    const filteredCatalog = catalog.filter(
        item => !ingredients.filter(i => i.id !== ingredient.id).some(i => i.catalog.name === item.name),
    )

    const handleComboboxChange = (value: string) => {
        const catalogItem = catalog.find(item => item.name === value)
        if (catalogItem) {
            onUpdateIngredient(ingredient.id, { catalog: catalogItem, catalog_id: catalogItem.id })
        }
    }

    return (
        <li className="list-none h-fit w-full flex items-center justify-between gap-2">
            <div className="max-w-full w-full">
                <ComboboxBasic
                    onSearchChange={setSearchText}
                    onChange={value => {
                        handleComboboxChange(value)
                    }}
                    options={filteredCatalog.map(item => item.name)}
                    inputValue={searchText}
                    value={ingredient.catalog.name}
                />
            </div>
            <div className="flex items-center shrink-0">
                <div className="flex items-center">
                    <InputField
                        placeholder=""
                        type="number"
                        value={ingredient.count}
                        onChange={e => {
                            onUpdateIngredient(ingredient.id, { count: +e.target.value })
                        }}
                        className="mb-0 max-w-15"
                    />
                    <span className="w-7 text-center">{ingredient.catalog.units}</span>
                </div>
                <BaseButton
                    className={`text-red cursor-pointer bg-transparent hover:bg-light-grey p-0 rounded-lg size-7`}
                    onClick={() => onDeleteIngredient(ingredient.id)}
                >
                    <TrashCanOutlineIcon />
                </BaseButton>
            </div>
        </li>
    )
}
