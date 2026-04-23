import type { Ingredient } from '../types'

export default function Ingredient({ catalog, count }: Ingredient) {
    return (
        <li className="list-none h-fit w-full">
            <label className="flex justify-between items-center gap-2 py-2 border-b border-border last:border-0">
                <span className="text-base font-semibold text-black">{catalog.name}</span>
                <span className="text-base font-medium text-dark-grey whitespace-nowrap">
                    {count} {catalog.units}
                </span>
            </label>
        </li>
    )
}
