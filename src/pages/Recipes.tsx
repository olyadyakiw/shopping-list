import RecipesList from '@/features/recipes'

export default function Recipes() {
    return (
        <div className="flex flex-col px-6 py-10 w-full">
            <header className="mb-6 pb-2">
                <h1 className="text-2xl font-bold">Recipes</h1>
            </header>
            <RecipesList />
        </div>
    )
}
