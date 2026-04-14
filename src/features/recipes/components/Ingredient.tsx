import type { Ingredient } from '../types'

export default function Ingredient({ catalog, count }: Ingredient) {
    return (
        <li>
            <label className="flex justify-between items-center gap-2">
                <div className="flex gap-2">{catalog.name}</div>
                <div className="flex gap-2 items-center">
                    {count} {catalog.units}
                </div>
            </label>
        </li>
    )
}
