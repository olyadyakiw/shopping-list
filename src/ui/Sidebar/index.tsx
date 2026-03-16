import Logo from './components/Logo'
import MainNav from './components/MainNav'
import ProfileNav from './components/ProfileNav'

export default function Sidebar() {
    return (
        <div className="flex flex-col h-screen p-6 w-60">
            <Logo />
            <MainNav />
            <ProfileNav />
        </div>
    )
}
