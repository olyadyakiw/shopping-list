import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog-base-ui'
import type { Recipe } from '../types'
import Ingredient from './Ingredient'
import { useAddRecipeToList } from '../hooks/useAddRecipeToList'
import { toast } from 'sonner'
import { ButtonGroup } from '@/components/ui/button-group'
import BaseButton from '@/ui/BaseButton'
import { useState } from 'react'
import { FiPlus, FiMinus } from 'react-icons/fi'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CiSquarePlus } from 'react-icons/ci'
import { useEditRecipe } from '../hooks/useEditRecipe'
import EditableIngredient from './EditableIngredient'
import { InputField } from '@/ui/Input'
import { useUpdateRecipe } from '../hooks/useUpdateRecipe'

import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import RecipeDropdown from './RecipeDropdown'

type Props = {
    recipe: Recipe | null
    open: boolean
    onClose: () => void
}

export default function RecipePreview({ recipe, open, onClose }: Props) {
    const { addRecipeToList } = useAddRecipeToList()
    const [servings, setServings] = useState(2)
    const {
        isEditing,
        startEditing,
        setEditedTitle,
        editedTitle,
        editedIngredients,
        cancel,
        updateIngredient,
        removeIngredients,
        addIngredient,
    } = useEditRecipe(recipe!)
    const { updateRecipe } = useUpdateRecipe()

    function handleAddButton() {
        addRecipeToList(recipe!, servings)
        onClose()
        toast.success('Recepy has been added')
    }

    function handleSaveButton() {
        updateRecipe(
            {
                id: recipe!.id,
                title: editedTitle,
                ingredients: editedIngredients,
            },
            {
                onSuccess: () => {
                    cancel()
                },
            },
        )
    }

    const ingredients = isEditing ? editedIngredients : recipe?.ingredients

    const initialConfig = {
        namespace: 'MyEditor',
        onError: () => console.log('error'),
        editorState: recipe?.direction,
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                className="flex flex-col sm:max-w-175 max-h-134 h-full sm:px-7.5 sm:py-6 bg-light-grey gap-4 overflow-y-scroll"
                showCloseButton={false}
            >
                <DialogHeader>
                    <div className="flex justify-between items-center">
                        {isEditing ? (
                            <InputField
                                className="mb-0 max-w-75"
                                value={editedTitle}
                                onChange={e => setEditedTitle(e.target.value)}
                                inputClassName="md:text-2xl text-black"
                            />
                        ) : (
                            <DialogTitle className="text-2xl font-semibold">{recipe?.title}</DialogTitle>
                        )}
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
                                    disabled={isEditing}
                                >
                                    <FiMinus />
                                </BaseButton>
                                <span className="text-center text-sm flex flex-col">
                                    <span className="text-lg leading-[0.75]">{servings}</span> servings
                                </span>
                                <BaseButton
                                    className="flex items-center justify-center size-7 rounded-full bg-medium-grey text-black border text-xl hover:bg-dark-grey p-0"
                                    onClick={() => setServings(s => s + 1)}
                                    disabled={isEditing}
                                >
                                    <FiPlus />
                                </BaseButton>
                            </ButtonGroup>

                            <RecipeDropdown recipe={recipe} startEditing={startEditing} isEditing={isEditing} />
                        </div>
                    </div>
                </DialogHeader>
                <Tabs defaultValue="ingridients" className="w-full">
                    <TabsList>
                        <TabsTrigger value="ingridients">Ingridients</TabsTrigger>
                        <TabsTrigger disabled={isEditing} value="directions">
                            Directions
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="ingridients">
                        <div className="h-82.5 p-6 bg-white rounded-[20px] overflow-y-scroll">
                            <ul className="flex flex-wrap gap-4 mb-4">
                                {ingredients?.map(ingredient => {
                                    const ingrCount = (ingredient.count * +servings).toFixed(2)
                                    if (isEditing)
                                        return (
                                            <EditableIngredient
                                                key={ingredient.id}
                                                ingredient={ingredient}
                                                onUpdateIngredient={updateIngredient}
                                                onDeleteIngredient={removeIngredients}
                                                ingredients={ingredients}
                                            />
                                        )

                                    return <Ingredient key={ingredient.id} {...ingredient} count={+ingrCount} />
                                })}
                            </ul>
                            {isEditing && (
                                <BaseButton
                                    onClick={addIngredient}
                                    className="bg-green hover:bg-green/80 text-light-green w-full"
                                >
                                    <CiSquarePlus className="size-6 text-light-green" />
                                    Add Ingredient
                                </BaseButton>
                            )}
                        </div>
                    </TabsContent>
                    <TabsContent value="directions">
                        <LexicalComposer initialConfig={initialConfig}>
                            <PlainTextPlugin
                                contentEditable={<ContentEditable />}
                                ErrorBoundary={LexicalErrorBoundary}
                            />
                            <HistoryPlugin />
                        </LexicalComposer>
                    </TabsContent>
                </Tabs>
                <div className="flex gap-2 justify-between mt-auto">
                    {isEditing ? (
                        <>
                            <BaseButton
                                onClick={handleSaveButton}
                                className="bg-green hover:bg-green/80 text-light-green max-w-[50%] w-full"
                            >
                                Save changes
                            </BaseButton>
                            <BaseButton
                                onClick={cancel}
                                className="bg-black hover:bg-black/80 text-white max-w-[50%] w-full"
                                type="button"
                            >
                                Cancel Edits
                            </BaseButton>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
