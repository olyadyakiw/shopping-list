import { useState } from 'react'
import type { Recipe } from '../types'
import type { Ingredient } from '../types'

export function useEditRecipe(recipe: Recipe | null) {
    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState('')
    const [editedDescription, setEditedDescription] = useState('')
    const [editedRecipeCategory, setEditedRecipeCategory] = useState('')
    const [editedIngredients, setEditedIngredients] = useState<Ingredient[]>([])

    const startEditing = () => {
        if (!recipe) return
        setIsEditing(true)
        setEditedTitle(recipe.title)
        setEditedDescription(recipe.description)
        setEditedRecipeCategory(recipe.category)
        setEditedIngredients(structuredClone(recipe.ingredients))
    }

    const cancel = () => {
        setIsEditing(false)
        setEditedIngredients([])
        setEditedTitle('')
        setEditedDescription('')
        setEditedRecipeCategory('')
    }

    const removeIngredients = (id: number) => {
        setEditedIngredients(editedIngredients.filter(item => item.id !== id))
    }

    const addIngredient = () => {
        const ingredient = {
            id: Math.random(),
            count: 0,
            recipe_id: recipe?.id ?? 0,
            catalog_id: 0,
            catalog: { name: '', units: '', category: '' },
        }
        setEditedIngredients([...editedIngredients, ingredient])
    }

    const updateIngredient = (id: number, changes: Partial<Ingredient>) => {
        const ingredient = editedIngredients.map(item => {
            if (item.id === id) {
                return { ...item, ...changes }
            }
            return item
        })
        setEditedIngredients(ingredient)
    }

    return {
        isEditing,
        setEditedTitle,
        editedTitle,
        editedDescription,
        setEditedDescription,
        editedRecipeCategory,
        setEditedRecipeCategory,
        editedIngredients,
        startEditing,
        cancel,
        updateIngredient,
        removeIngredients,
        addIngredient,
    }
}
