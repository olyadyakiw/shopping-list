import type { Ingredient } from '../types'

export default function Ingredient({ catalog, count }: Ingredient) {
    return (
        <li className="list-none">
            <label className="flex justify-between items-center gap-2 py-2 border-b border-border last:border-0">
                <span className="text-sm text-foreground">{catalog.name}</span>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {count} {catalog.units}
                </span>
            </label>
        </li>
    )
}
