import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog-base-ui'
import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { InputField } from '@/ui/Input'
import BaseButton from '@/ui/BaseButton'
import { CiSquarePlus } from 'react-icons/ci'
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
    const { createRecipe } = useCreateRecipe()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [activeTab, setActiveTab] = useState('ingridients')

    function handleSave() {
        createRecipe({ title, description, ingredients }, { onSuccess: onClose })
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
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                className="flex flex-col sm:max-w-175 max-h-140 h-full sm:px-7.5 sm:py-6 bg-light-grey gap-4 overflow-y-scroll"
                showCloseButton={false}
            >
                <DialogHeader>
                    <InputField
                        className="mb-0 max-w-75"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        inputClassName="md:text-2xl text-black"
                        placeholder="Type recipe title..."
                    />
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
                        className="bg-green hover:bg-green/80 text-light-green max-w-full md:max-w-[50%] w-full"
                    >
                        Save Recipe
                    </BaseButton>
                    <BaseButton
                        onClick={onClose}
                        className="bg-black hover:bg-black/80 text-white max-w-full md:max-w-[50%] w-full"
                    >
                        Cancel
                    </BaseButton>
                </div>
            </DialogContent>
        </Dialog>
    )
}
