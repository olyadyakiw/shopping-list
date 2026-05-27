import { ButtonGroup } from '@/components/ui/button-group'
import BaseButton from '@/ui/BaseButton'
import { FiPlus, FiMinus } from 'react-icons/fi'

type Props = {
    servings: number
    onServings: (fn: (prev: number) => number) => void
    isEditing?: boolean
    variant?: string
}

export default function ServingsSelector({ servings, onServings, isEditing, variant }: Props) {
    return (
        <ButtonGroup className="flex items-center gap-2 relative z-1">
            <BaseButton
                className={`flex items-center justify-center size-7 rounded-full ${variant === 'white' ? 'bg-white' : 'bg-medium-grey'} text-black border text-xl hover:bg-dark-grey p-0`}
                onClick={() =>
                    onServings(s => {
                        if (s > 1) return s - 1
                        return 1
                    })
                }
                disabled={isEditing}
            >
                <FiMinus />
            </BaseButton>
            <span className={`text-center text-sm flex flex-col ${variant === 'white' ? 'text-white' : ''}`}>
                <span className="text-lg leading-[0.75]${variant === 'white' ? 'bg-white' : 'bg-medium-grey'}">
                    {servings}
                </span>{' '}
                servings
            </span>
            <BaseButton
                className={`flex items-center justify-center size-7 rounded-full ${variant === 'white' ? 'bg-white' : 'bg-medium-grey'} text-black border text-xl hover:bg-dark-grey p-0`}
                onClick={() => onServings(s => s + 1)}
                disabled={isEditing}
            >
                <FiPlus />
            </BaseButton>
        </ButtonGroup>
    )
}
