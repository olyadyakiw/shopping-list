import { NavLink } from 'react-router-dom'

import ChecklistIcon from '@/components/icons/ChecklistIcon'
import DocTextIcon from '@/components/icons/DocTextIcon'
import ClipboardIcon from '@/components/icons/ClipboardIcon'

const links = [
    { name: 'Shopping List', to: 'shopping-list', icon: <ChecklistIcon width="20" height="20" fill="currentColor" /> },
    { name: 'Recipes', to: 'recipes', icon: <DocTextIcon width="20" height="20" fill="currentColor" /> },
    { name: 'Templates', to: 'templates', icon: <ClipboardIcon width="20" height="20" fill="currentColor" /> },
]

export default function MainNav() {
    return (
        <nav>
            <ul className="flex flex-col gap-2">
                {links.map(link => (
                    <li key={link.to}>
                        <NavLink
                            to={link.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 transition-all hover:bg-light-grey-2 rounded-[20px] ${isActive ? 'bg-medium-grey text-black' : 'text-dark-grey'}`
                            }
                        >
                            <span>{link.icon}</span>
                            <span>{link.name}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
