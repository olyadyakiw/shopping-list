import { useState } from 'react'
import type { Recipe } from '../types'
import type { Ingredient } from '../types'

export function useEditRecipe(recipe: Recipe) {
    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState('')
    const [editedIngredients, setEditedIngredients] = useState<Ingredient[]>([])

    const startEditing = () => {
        setIsEditing(true)
        setEditedTitle(recipe.title)
        const copyIngredients = structuredClone(recipe.ingredients)
        setEditedIngredients(copyIngredients)
    }

    const cancel = () => {
        setIsEditing(false)
        setEditedIngredients([])
        setEditedTitle('')
    }

    const removeIngredients = (id: number) => {
        setEditedIngredients(editedIngredients.filter(item => item.id !== id))
    }

    const addIngredient = () => {
        const ingredient = {
            id: Math.random(),
            count: 0,
            recepy_id: recipe.id,
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
        editedIngredients,
        startEditing,
        cancel,
        updateIngredient,
        removeIngredients,
        addIngredient,
    }
}
