import { BsThreeDotsVertical } from 'react-icons/bs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import FileEditsOutlineIcon from '@/components/icons/FileEditsOutlineIcon'
import ClipboardIcon from '@/components/icons/ClipboardIcon'
import TrashCanOutlineIcon from '@/components/icons/TrashCanOutlineIcon'
import type { Recipe } from '../types'

type Props = {
    recipe: Recipe | null
    startEditing: () => void
    isEditing: boolean
}

export default function RecipeDropdown({ isEditing, startEditing }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={`size-8 hover:bg-medium-grey rounded-full p-1.5 ${isEditing ? 'opacity-50 cursor-auto bg-medium-grey' : 'opacity-100 cursor-pointer bg-transparent'}`}
                asChild
                disabled={isEditing}
            >
                <BsThreeDotsVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
                <DropdownMenuItem onClick={startEditing}>
                    <FileEditsOutlineIcon width="16" height="16" fill={'var(--color-black)'} /> Edit recepy
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <ClipboardIcon width="16" height="16" fill={'var(--color-black)'} /> Duplicate recepy
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red">
                    <TrashCanOutlineIcon width="16" height="16" fill={'var(--color-red)'} /> Delete recepy
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
