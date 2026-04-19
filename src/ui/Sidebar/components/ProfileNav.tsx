export default function ProfileNav() {
    const name = 'Olha Diakiv'
    return (
        <div className="mt-auto">
            <div className="flex gap-2 items-center px-4 py-2 transition-all hover:bg-light-grey-2 rounded-lg">
                <div className="size-15 flex items-center justify-center font-semibold text-green text-lg rounded-full bg-white shrink-0">
                    {name
                        .split(' ')
                        .map(word => word[0])
                        .join('')}
                </div>
                <div className="text-lg">{name}</div>
            </div>
        </div>
    )
}
