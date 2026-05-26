import { useRef } from 'react'
import { loginWithGoogle } from '@/services/auth/googleAuth'
import Logo from '@/ui/Sidebar/components/Logo'
import { useFallingProductsScene } from '@/hooks/useFallingProductsScene'

export default function Login() {
    const sceneRef = useRef<HTMLDivElement>(null)
    useFallingProductsScene(sceneRef)

    return (
        <div className="relative flex justify-center items-center min-h-screen w-full overflow-hidden">
            <div ref={sceneRef} className="absolute inset-0 pointer-events-auto" style={{ zIndex: 0 }} />

            <div className="relative flex flex-col max-w-xs text-center z-10 pointer-events-none md-8 md:mb-24">
                <Logo />

                <h1 className="text-4xl font-semibold mb-8">Ready to shop?</h1>

                <button
                    onClick={loginWithGoogle}
                    className="flex items-center gap-6 text-lg border border-primary-300 rounded-[40px] px-10 py-4 font-medium cursor-pointer pointer-events-auto bg-white"
                >
                    <img src="https://authjs.dev/img/providers/google.svg" alt="Google logo" height="24" width="24" />

                    <span>Continue with Google</span>
                </button>
            </div>
        </div>
    )
}
