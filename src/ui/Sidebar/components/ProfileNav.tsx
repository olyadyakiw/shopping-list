import { useLogout } from '@/features/auth/hooks/useLogout'
import { useUser } from '@/features/auth/hooks/useUser'
import BaseButton from '@/ui/BaseButton'

export default function ProfileNav() {
    const { user } = useUser()
    const { logout, isPending } = useLogout()
    const name = user?.user_metadata.full_name || 'User'
    return (
        <div className="mt-auto">
            <div className="flex gap-2 items-center px-4 py-2 transition-all hover:bg-light-grey-2 rounded-lg">
                <div className="size-15 flex items-center justify-center font-semibold text-green text-lg rounded-full bg-white shrink-0">
                    {name
                        .split(' ')
                        .map((word: string) => word[0])
                        .join('')}
                </div>
                <div className="text-lg">{name}</div>
            </div>
            <div>
                <BaseButton disabled={isPending} onClick={() => logout()}>
                    Log out
                </BaseButton>
            </div>
        </div>
    )
}
