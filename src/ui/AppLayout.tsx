import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function AppLayout() {
    return (
        <div className="flex gap-3 h-full">
            <Sidebar />
            <div className="w-full ps 0 md:ps-65">
                <Outlet />
            </div>
        </div>
    )
}
