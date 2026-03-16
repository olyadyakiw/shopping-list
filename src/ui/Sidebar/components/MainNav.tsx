import { NavLink } from 'react-router-dom'

import { CiViewList } from 'react-icons/ci'
import { FaPlateWheat } from 'react-icons/fa6'
import { CgTemplate } from 'react-icons/cg'

const links = [
    { name: 'Shopping List', to: 'shopping-list', icon: <CiViewList className="size-8" /> },
    { name: 'Recipes', to: 'recipes', icon: <FaPlateWheat className="size-8" /> },
    { name: 'Templates', to: 'templates', icon: <CgTemplate className="size-8" /> },
]

export default function MainNav() {
    return (
        <nav>
            <ul className="flex flex-col gap-2">
                {links.map(link => (
                    <li key={link.to}>
                        <NavLink
                            to={link.to}
                            className="flex items-center gap-2 px-4 py-2 transition-all hover:bg-blue-100 rounded-lg"
                        >
                            <span className="text-blue-400">{link.icon}</span>
                            <span>{link.name}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
