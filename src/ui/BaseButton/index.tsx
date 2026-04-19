import { Button } from '@/components/ui/button'

type ButtonProps = React.ComponentProps<typeof Button>

export default function BaseButton({ className, children, ...props }: ButtonProps) {
    return (
        <Button className={`flex gap-2 items-center cursor-pointer py-3 ${className}`} {...props}>
            {children}
        </Button>
    )
}
