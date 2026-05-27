import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog-base-ui'
import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { InputField } from '@/ui/Input'
import BaseButton from '@/ui/BaseButton'
import { CiImport, CiSquarePlus } from 'react-icons/ci'
import { useCreateRecipe } from '../hooks/useCreateRecipe'
import EditableIngredient from './EditableIngredient'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import type { Ingredient } from '../types'
import SelectField from '@/ui/Select'
import { recipeCategoryOption } from '@/constants/unitsOption'
import { toast } from 'sonner'

function AutoFocusPlugin({ shouldFocus }: { shouldFocus: boolean }) {
    const [editor] = useLexicalComposerContext()
    useEffect(() => {
        if (shouldFocus) {
            setTimeout(() => editor.focus(), 0)
        }
    }, [shouldFocus, editor])
    return null
}

type Props = {
    open: boolean
    onClose: () => void
}

const EMPTY_INGREDIENT = (): Ingredient => ({
    id: Date.now(),
    count: 1,
    recipe_id: 0,
    catalog_id: 0,
    catalog: { name: '', units: '', category: '' },
})

export default function AddRecipeModal({ open, onClose }: Props) {
    const { createRecipe, isPending } = useCreateRecipe()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [categoryRecipe, setCategoryRecipe] = useState('breakfast')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState('')
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [activeTab, setActiveTab] = useState('ingridients')

    useEffect(() => {
        if (!imagePreview.startsWith('blob:')) return

        return () => URL.revokeObjectURL(imagePreview)
    }, [imagePreview])

    function handleSave() {
        if (!title.trim()) {
            toast.error('Recipe title is required')
            return
        }

        if (!imageFile) {
            toast.error('Recipe image is required')
            return
        }

        createRecipe(
            { title: title.trim(), description, category: categoryRecipe, imageFile, ingredients },
            {
                onSuccess: () => {
                    resetForm()
                    onClose()
                },
                onError: error => {
                    toast.error(error.message)
                },
            },
        )
    }

    function handleClose() {
        resetForm()
        onClose()
    }

    function resetForm() {
        setTitle('')
        setDescription('')
        setCategoryRecipe('breakfast')
        setImageFile(null)
        setImagePreview('')
        setIngredients([])
        setActiveTab('ingridients')
    }

    function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        setImageFile(file)
        setImagePreview(URL.createObjectURL(file))
        e.target.value = ''
    }

    function addIngredient() {
        setIngredients(prev => [...prev, EMPTY_INGREDIENT()])
    }

    function updateIngredient(id: number, changes: Partial<Ingredient>) {
        setIngredients(prev => prev.map(i => (i.id === id ? { ...i, ...changes } : i)))
    }

    function removeIngredient(id: number) {
        setIngredients(prev => prev.filter(i => i.id !== id))
    }

    const initialConfig = {
        namespace: 'AddRecipeEditor',
        onError: () => console.log('error'),
        editable: true,
    }

    return (
        <Dialog open={open} onOpenChange={isOpen => !isOpen && handleClose()}>
            <DialogContent
                className="flex flex-col sm:max-w-175 max-h-190 h-full sm:px-7.5 sm:py-6 bg-light-grey gap-4 overflow-y-scroll"
                showCloseButton={false}
            >
                <DialogHeader
                    className="relative min-h-58 bg-no-repeat bg-cover bg-center rounded-[20px] p-5 overflow-hidden"
                    style={imagePreview ? { backgroundImage: `url(${imagePreview})` } : undefined}
                >
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative z-10 flex justify-between h-full flex-col">
                        <div className="flex justify-between items-start gap-4 text-white">
                            <SelectField
                                value={categoryRecipe}
                                onChange={value => setCategoryRecipe(value)}
                                options={recipeCategoryOption}
                            />
                        </div>
                        <input
                            id="recipe-image-upload"
                            className="sr-only"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <label
                            htmlFor="recipe-image-upload"
                            className="absolute top-1/2 left-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center gap-3 text-2xl font-medium text-white transition hover:text-white/80"
                        >
                            <span className="flex size-8 items-center justify-center rounded bg-white/70 text-gray-500">
                                <CiImport className="size-7" />
                            </span>
                            {imageFile ? 'Change the image' : 'Upload the image'}
                        </label>
                        <InputField
                            className="mb-0 max-w-75"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            inputClassName="md:text-2xl text-black"
                            placeholder="Type recipe title..."
                        />
                    </div>
                </DialogHeader>
                <Tabs
                    defaultValue="ingridients"
                    className="w-full gap-4"
                    value={activeTab}
                    onValueChange={setActiveTab}
                >
                    <TabsList>
                        <TabsTrigger value="ingridients">Ingridients</TabsTrigger>
                        <TabsTrigger value="directions">Directions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="ingridients">
                        <div className="h-82.5 p-6 bg-white rounded-[20px] overflow-y-scroll">
                            <ul className="flex flex-wrap gap-4 mb-4">
                                {ingredients.map(ingredient => (
                                    <EditableIngredient
                                        key={ingredient.id}
                                        ingredient={ingredient}
                                        onUpdateIngredient={updateIngredient}
                                        onDeleteIngredient={removeIngredient}
                                        ingredients={ingredients}
                                    />
                                ))}
                            </ul>
                            <BaseButton
                                onClick={addIngredient}
                                className="bg-green hover:bg-green/80 text-light-green w-full"
                            >
                                <CiSquarePlus className="size-6 text-light-green" />
                                Add Ingredient
                            </BaseButton>
                        </div>
                    </TabsContent>
                    <TabsContent value="directions">
                        <LexicalComposer initialConfig={initialConfig}>
                            <PlainTextPlugin
                                contentEditable={
                                    <div className="h-82.5 bg-white rounded-[20px] overflow-y-scroll">
                                        <ContentEditable autoFocus className="h-full p-6 rounded-[20px]" />
                                    </div>
                                }
                                ErrorBoundary={LexicalErrorBoundary}
                            />
                            <HistoryPlugin />
                            <OnChangePlugin
                                onChange={editorState => setDescription(JSON.stringify(editorState.toJSON()))}
                            />
                            <AutoFocusPlugin shouldFocus={activeTab === 'directions'} />
                        </LexicalComposer>
                    </TabsContent>
                </Tabs>
                <div className="flex flex-col md:flex-row gap-2 justify-between mt-auto">
                    <BaseButton
                        onClick={handleSave}
                        disabled={isPending}
                        className="bg-green hover:bg-green/80 text-light-green max-w-full md:max-w-[50%] w-full"
                    >
                        {isPending ? 'Saving...' : 'Save Recipe'}
                    </BaseButton>
                    <BaseButton
                        onClick={handleClose}
                        disabled={isPending}
                        className="bg-black hover:bg-black/80 text-white max-w-full md:max-w-[50%] w-full"
                    >
                        Cancel
                    </BaseButton>
                </div>
            </DialogContent>
        </Dialog>
    )
}
