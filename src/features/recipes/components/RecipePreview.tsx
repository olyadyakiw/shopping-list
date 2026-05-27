import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog-base-ui'
import type { Recipe } from '../types'
import Ingredient from './Ingredient'
import { useAddRecipeToList } from '../hooks/useAddRecipeToList'
import { toast } from 'sonner'
import BaseButton from '@/ui/BaseButton'
import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CiImport, CiSquarePlus } from 'react-icons/ci'
import { useEditRecipe } from '../hooks/useEditRecipe'
import EditableIngredient from './EditableIngredient'
import { InputField } from '@/ui/Input'
import { useUpdateRecipe } from '../hooks/useUpdateRecipe'

import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import RecipeDropdown from './RecipeDropdown'
import ServingsSelector from './ServingsSelector'
import SelectField from '@/ui/Select'
import { recipeCategoryOption } from '@/constants/unitsOption'

type Props = {
    recipe: Recipe | null
    open: boolean
    onClose: () => void
}

export default function RecipePreview({ recipe, open, onClose }: Props) {
    const { addRecipeToList } = useAddRecipeToList()
    const [servings, setServings] = useState(2)
    const [editedImageFile, setEditedImageFile] = useState<File | null>(null)
    const [editedImagePreview, setEditedImagePreview] = useState('')
    const {
        isEditing,
        startEditing,
        setEditedTitle,
        editedTitle,
        setEditedDescription,
        editedDescription,
        editedIngredients,
        cancel,
        updateIngredient,
        removeIngredients,
        addIngredient,
        editedRecipeCategory,
        setEditedRecipeCategory,
    } = useEditRecipe(recipe!)
    const { updateRecipe, isPending } = useUpdateRecipe()

    useEffect(() => {
        return () => {
            if (editedImagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(editedImagePreview)
            }
        }
    }, [editedImagePreview])

    function handleStartEditing() {
        setEditedImageFile(null)
        setEditedImagePreview('')
        startEditing()
    }

    function handleClose() {
        resetEditedImage()
        if (isEditing) cancel()
        onClose()
    }

    function handleAddButton() {
        addRecipeToList(recipe!, servings)
        onClose()
        toast.success('Recipe has been added')
    }

    function handleSaveButton() {
        updateRecipe(
            {
                id: recipe!.id,
                title: editedTitle,
                description: editedDescription,
                category: editedRecipeCategory,
                imageFile: editedImageFile,
                ingredients: editedIngredients,
            },
            {
                onSuccess: () => {
                    resetEditedImage()
                    cancel()
                },
                onError: error => {
                    toast.error(error.message)
                },
            },
        )
    }

    function handleCancelEditing() {
        resetEditedImage()
        cancel()
    }

    function resetEditedImage() {
        if (editedImagePreview.startsWith('blob:')) {
            URL.revokeObjectURL(editedImagePreview)
        }
        setEditedImageFile(null)
        setEditedImagePreview('')
    }

    function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        if (editedImagePreview.startsWith('blob:')) {
            URL.revokeObjectURL(editedImagePreview)
        }

        setEditedImageFile(file)
        setEditedImagePreview(URL.createObjectURL(file))
        e.target.value = ''
    }

    const ingredients = isEditing ? editedIngredients : recipe?.ingredients
    const headerImage = editedImagePreview || recipe?.image

    const initialConfig = {
        namespace: 'MyEditor',
        onError: () => console.log('error'),
        editorState: recipe?.description ? recipe.description : undefined,
        editable: isEditing,
    }

    return (
        <Dialog open={open} onOpenChange={isOpen => !isOpen && handleClose()}>
            <DialogContent
                className="flex flex-col sm:max-w-175 max-h-190 h-full sm:px-7.5 sm:py-6 bg-light-grey gap-4 overflow-y-scroll"
                showCloseButton={false}
            >
                <DialogHeader
                    className="relative min-h-58 bg-no-repeat bg-cover bg-center rounded-[20px] p-5 overflow-hidden"
                    style={{ backgroundImage: `url(${headerImage})` }}
                >
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative z-10 flex justify-between h-full flex-col">
                        <div className="flex justify-between items-center gap-8">
                            {isEditing ? (
                                <SelectField
                                    value={editedRecipeCategory}
                                    onChange={value => setEditedRecipeCategory(value)}
                                    options={recipeCategoryOption}
                                />
                            ) : (
                                <span className="py-1.5 px-3.5 rounded-[30px] bg-white">{recipe?.category}</span>
                            )}
                            <RecipeDropdown recipe={recipe} startEditing={handleStartEditing} isEditing={isEditing} />
                        </div>
                        {isEditing && (
                            <>
                                <input
                                    id="recipe-preview-image-upload"
                                    className="sr-only"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                <label
                                    htmlFor="recipe-preview-image-upload"
                                    className="absolute top-1/2 left-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center gap-3 text-2xl font-medium text-white transition hover:text-white/80"
                                >
                                    <span className="flex size-8 items-center justify-center rounded bg-white/70 text-gray-500">
                                        <CiImport className="size-7" />
                                    </span>
                                    {editedImageFile ? 'Change the image' : 'Upload the image'}
                                </label>
                            </>
                        )}
                        <div className="flex justify-between items-center gap-4">
                            {isEditing ? (
                                <InputField
                                    className="mb-0 max-w-75"
                                    value={editedTitle}
                                    onChange={e => setEditedTitle(e.target.value)}
                                    inputClassName="md:text-2xl text-black"
                                />
                            ) : (
                                <DialogTitle className="text-2xl font-semibold text-white">{recipe?.title}</DialogTitle>
                            )}
                            <ServingsSelector
                                variant="white"
                                servings={servings}
                                onServings={setServings}
                                isEditing={isEditing}
                            />
                        </div>
                    </div>
                </DialogHeader>
                <Tabs defaultValue="ingridients" className="w-full gap-4">
                    <TabsList>
                        <TabsTrigger value="ingridients">Ingridients</TabsTrigger>
                        <TabsTrigger value="directions">Directions</TabsTrigger>
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
                        <LexicalComposer key={`${recipe?.id}-${isEditing}`} initialConfig={initialConfig}>
                            <PlainTextPlugin
                                contentEditable={
                                    <div className="h-82.5 p-6 bg-white rounded-[20px] overflow-y-scroll">
                                        <ContentEditable />
                                    </div>
                                }
                                ErrorBoundary={LexicalErrorBoundary}
                            />
                            <HistoryPlugin />
                            <OnChangePlugin
                                onChange={editorState => {
                                    setEditedDescription(JSON.stringify(editorState.toJSON()))
                                }}
                            />
                        </LexicalComposer>
                    </TabsContent>
                </Tabs>
                <div className="flex flex-col md:flex-row gap-2 justify-between mt-auto">
                    {isEditing ? (
                        <>
                            <BaseButton
                                onClick={handleSaveButton}
                                disabled={isPending}
                                className="bg-green hover:bg-green/80 text-light-green max-w-full md:max-w-[50%] w-full"
                            >
                                {isPending ? 'Saving...' : 'Save changes'}
                            </BaseButton>
                            <BaseButton
                                onClick={handleCancelEditing}
                                disabled={isPending}
                                className="bg-black hover:bg-black/80 text-white max-w-full md:max-w-[50%] w-full"
                                type="button"
                            >
                                Cancel Edits
                            </BaseButton>
                        </>
                    ) : (
                        <>
                            <BaseButton
                                onClick={handleAddButton}
                                className="bg-green hover:bg-green/80 text-light-green max-w-full md:max-w-[50%] w-full"
                            >
                                <CiSquarePlus className="size-6 text-light-green" />
                                Add To Shopping List
                            </BaseButton>
                            <BaseButton
                                onClick={e => {
                                    e.preventDefault()
                                    onClose()
                                }}
                                className="bg-black hover:bg-black/80 text-white max-w-full md:max-w-[50%] w-full"
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
