import Logo from './components/Logo'
import MainNav from './components/MainNav'
import ProfileNav from './components/ProfileNav'

export default function Sidebar() {
    return (
        <div className="flex-col h-screen p-6 w-65 shrink-0 fixed top-0 left-0 hidden md:flex bg-light-grey">
            <Logo />
            <MainNav />
            <ProfileNav />
        </div>
    )
}
