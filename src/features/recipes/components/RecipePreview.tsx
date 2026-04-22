import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { Recipe } from '../types'
import Ingredient from './Ingredient'
import { useAddRecipeToList } from '../hooks/useAddRecipeToList'
import { toast } from 'sonner'
import { ButtonGroup } from '@/components/ui/button-group'
import BaseButton from '@/ui/BaseButton'
import { useState } from 'react'
import { FiPlus, FiMinus } from 'react-icons/fi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import FileEditsOutlineIcon from '@/components/icons/FileEditsOutlineIcon'
import ClipboardIcon from '@/components/icons/ClipboardIcon'
import TrashCanOutlineIcon from '@/components/icons/TrashCanOutlineIcon'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CiSquarePlus } from 'react-icons/ci'

type Props = {
    recipe: Recipe | null
    open: boolean
    onClose: () => void
}

export default function RecipePreview({ recipe, open, onClose }: Props) {
    const { addRecipeToList } = useAddRecipeToList()
    const [servings, setServings] = useState(2)

    function handleAddButton() {
        addRecipeToList(recipe!, servings)
        onClose()
        toast.success('Recepy has been added')
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-175 sm:px-7.5 sm:py-6 bg-light-grey gap-4" showCloseButton={false}>
                <DialogHeader>
                    <div className="flex justify-between items-center">
                        <DialogTitle className="text-2xl font-semibold">{recipe?.title}</DialogTitle>
                        <div className="flex items-center gap-8">
                            <ButtonGroup className="flex items-center gap-2">
                                <BaseButton
                                    className="flex items-center justify-center size-7 rounded-full bg-medium-grey text-black border text-xl hover:bg-dark-gre p-0"
                                    onClick={() =>
                                        setServings(s => {
                                            if (s > 0) return s - 1
                                            return 0
                                        })
                                    }
                                >
                                    <FiMinus />
                                </BaseButton>
                                <span className="text-center text-sm flex flex-col">
                                    <span className="text-lg leading-[0.75]">{servings}</span> servings
                                </span>
                                <BaseButton
                                    className="flex items-center justify-center size-7 rounded-full bg-medium-grey text-black border text-xl hover:bg-dark-grey p-0"
                                    onClick={() => setServings(s => s + 1)}
                                >
                                    <FiPlus />
                                </BaseButton>
                            </ButtonGroup>
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    className="cursor-pointer size-8 hover:bg-medium-grey rounded-full p-1.5"
                                    asChild
                                >
                                    <BsThreeDotsVertical />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="bottom" align="end">
                                    <DropdownMenuItem>
                                        <FileEditsOutlineIcon width="16" height="16" fill={'var(--color-black)'} /> Edit
                                        recepy
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <ClipboardIcon width="16" height="16" fill={'var(--color-black)'} /> Duplicate
                                        recepy
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red">
                                        <TrashCanOutlineIcon width="16" height="16" fill={'var(--color-red)'} /> Delete
                                        recepy
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </DialogHeader>
                <Tabs defaultValue="ingridients" className="w-full">
                    <TabsList>
                        <TabsTrigger value="ingridients">Ingridients</TabsTrigger>
                        <TabsTrigger value="directions">Directions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="ingridients">
                        <ul className="flex flex-wrap gap-x-8">
                            {recipe?.ingredients.map(ingredient => {
                                const ingrCount = (ingredient.count * +servings).toFixed(2)
                                return <Ingredient key={ingredient.id} {...ingredient} count={+ingrCount} />
                            })}
                        </ul>
                    </TabsContent>
                    <TabsContent value="directions">Directions</TabsContent>
                </Tabs>
                <div className="flex gap-2 justify-between mt-4">
                    <BaseButton
                        onClick={handleAddButton}
                        className="bg-green hover:bg-green/80 text-light-green max-w-[50%] w-full"
                    >
                        <CiSquarePlus className="size-6 text-light-green" />
                        Add To Shopping List
                    </BaseButton>
                    <BaseButton
                        onClick={e => {
                            e.preventDefault()
                            onClose()
                        }}
                        className="bg-black hover:bg-black/80 text-white max-w-[50%] w-full"
                        type="button"
                    >
                        Cancel
                    </BaseButton>
                </div>
            </DialogContent>
        </Dialog>
    )
}
