import Logo from './components/Logo'
import MainNav from './components/MainNav'
import ProfileNav from './components/ProfileNav'

export default function Sidebar() {
    return (
        <div className="flex flex-col h-screen p-6 w-60 shrink-0 fixed top-0 left-0">
            <Logo />
            <MainNav />
            <ProfileNav />
        </div>
    )
}
