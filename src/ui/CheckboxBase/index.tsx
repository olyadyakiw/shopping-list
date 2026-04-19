import { Checkbox } from '@/components/ui/checkbox'

type CheckboxProps = React.ComponentProps<typeof Checkbox>

export default function CheckboxBase({ className, ...props }: CheckboxProps) {
    return (
        <Checkbox
            className={`${className} w-4.5 h-4.5 border-medium-grey rounded-[5px] hover:bg-light-grey`}
            {...props}
        />
    )
}
