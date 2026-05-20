import { useState } from 'react'
import type { Recipe } from '../types'
import type { Ingredient } from '../types'

export function useEditRecipe(recipe: Recipe | null) {
    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState('')
    const [editedDescription, setEditedDescription] = useState('')
    const [editedIngredients, setEditedIngredients] = useState<Ingredient[]>([])

    const startEditing = () => {
        if (!recipe) return
        setIsEditing(true)
        setEditedTitle(recipe.title)
        setEditedDescription(recipe.description)
        setEditedIngredients(structuredClone(recipe.ingredients))
    }

    const cancel = () => {
        setIsEditing(false)
        setEditedIngredients([])
        setEditedTitle('')
        setEditedDescription('')
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
        editedIngredients,
        startEditing,
        cancel,
        updateIngredient,
        removeIngredients,
        addIngredient,
    }
}
