import { BsThreeDotsVertical } from 'react-icons/bs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import FileEditsOutlineIcon from '@/components/icons/FileEditsOutlineIcon'
import ClipboardIcon from '@/components/icons/ClipboardIcon'
import TrashCanOutlineIcon from '@/components/icons/TrashCanOutlineIcon'
import type { Recipe } from '../types'
import { useDeleteRecipe } from '../hooks/useDeleteRecipe'
import { useDuplicateRecipe } from '../hooks/useDuplicateRecipe'
import { toast } from 'sonner'

type Props = {
    recipe: Recipe | null
    startEditing: () => void
    isEditing: boolean
}

export default function RecipeDropdown({ recipe, isEditing, startEditing }: Props) {
    const { deleteRecipe } = useDeleteRecipe()
    const { duplicateRecipe } = useDuplicateRecipe()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={`size-8 hover:bg-green rounded-full p-1.5 ${isEditing ? 'opacity-50 cursor-auto bg-green' : 'opacity-100 cursor-pointer bg-transparent'}`}
                asChild
                disabled={isEditing}
            >
                <BsThreeDotsVertical fill={'var(--color-white)'} />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
                <DropdownMenuItem onClick={startEditing}>
                    <FileEditsOutlineIcon width="16" height="16" fill={'var(--color-black)'} /> Edit recipe
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        duplicateRecipe(recipe!.id)
                    }}
                >
                    <ClipboardIcon width="16" height="16" fill={'var(--color-black)'} /> Duplicate recipe
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => {
                        deleteRecipe(recipe!.id)
                        toast.success('Recipe has been deleted')
                    }}
                    className="text-red focus:text-red"
                >
                    <TrashCanOutlineIcon width="16" height="16" fill={'var(--color-red)'} /> Delete recipe
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
