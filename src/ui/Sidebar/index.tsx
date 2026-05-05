import { useState } from 'react'
import Logo from './components/Logo'
import MainNav from './components/MainNav'
import ProfileNav from './components/ProfileNav'

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 p-2 rounded-md bg-light-grey md:hidden focus:outline-none hover:bg-gray-200 transition-colors"
            >
                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                )}
            </button>

            {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 z-30 bg-black/40 md:hidden" />}

            <div
                className={`
                flex flex-col h-screen p-6 w-64 shrink-0 fixed top-0 left-0 bg-light-grey z-40
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0
            `}
            >
                <div className="mb-8 md:mb-0">
                    <Logo />
                </div>
                <div className="flex-1 mt-6">
                    <MainNav />
                </div>
                <ProfileNav />
            </div>
        </>
    )
}
