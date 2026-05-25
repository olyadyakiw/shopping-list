import { useEffect, useRef } from 'react'
import { loginWithGoogle } from '@/services/auth/googleAuth'
import Logo from '@/ui/Sidebar/components/Logo'
import Matter from 'matter-js'

import bananaUrl from '/products-images/banana.svg'
import breadUrl from '/products-images/bread.svg'
import greenAppleUrl from '/products-images/green_apple.svg'
import ketchupUrl from '/products-images/ketchup.svg'
import milkUrl from '/products-images/milk.svg'
import pepperUrl from '/products-images/pepper.svg'
import redAppleUrl from '/products-images/red_apple.svg'

const PRODUCT_IMAGES: string[] = [bananaUrl, breadUrl, greenAppleUrl, ketchupUrl, milkUrl, pepperUrl, redAppleUrl]

interface ImageBody extends Matter.Body {
    img: HTMLImageElement
    imgSize: number
}

export default function Login() {
    const sceneRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = sceneRef.current

        if (!container) return

        if (container.querySelector('canvas')) return

        const W = container.clientWidth
        const H = container.clientHeight

        console.log('Canvas size:', W, H)

        const loadedImages = new Map<string, HTMLImageElement>()
        let loadedCount = 0

        const startPhysics = () => {
            const engine = Matter.Engine.create()

            const render = Matter.Render.create({
                element: container,
                engine,
                options: {
                    width: W,
                    height: H,
                    background: 'transparent',
                    wireframes: false,
                },
            })

            const floor = Matter.Bodies.rectangle(W / 2, H - 10, W, 20, {
                isStatic: true,
                render: { visible: false },
            })

            const wallL = Matter.Bodies.rectangle(-25, H / 2, 50, H, {
                isStatic: true,
                render: { visible: false },
            })

            const wallR = Matter.Bodies.rectangle(W + 25, H / 2, 50, H, {
                isStatic: true,
                render: { visible: false },
            })

            Matter.World.add(engine.world, [floor, wallL, wallR])

            const mouse = Matter.Mouse.create(render.canvas)

            const mouseConstraint = Matter.MouseConstraint.create(engine, {
                mouse,
                constraint: {
                    stiffness: 0.2,
                    render: { visible: false },
                },
            })

            Matter.World.add(engine.world, mouseConstraint)

            render.mouse = mouse

            let spawnCount = 0

            const spawnInterval = setInterval(() => {
                if (spawnCount >= 30) {
                    clearInterval(spawnInterval)
                    return
                }

                const src = PRODUCT_IMAGES[Math.floor(Math.random() * PRODUCT_IMAGES.length)]

                const img = loadedImages.get(src)

                if (!img) return

                const x = 80 + Math.random() * (W - 160)
                const size = 120 + Math.random() * 50

                const collisionRadius = size * 0.4

                const body = Matter.Bodies.circle(x, -60, collisionRadius, {
                    restitution: 0.3,
                    friction: 0.5,
                    frictionAir: 0.01,
                    density: 0.001,
                    render: {
                        visible: false,
                    },
                }) as ImageBody

                body.img = img
                body.imgSize = size

                Matter.World.add(engine.world, body)

                spawnCount++
            }, 400)

            const runner = Matter.Runner.create()

            Matter.Runner.run(runner, engine)
            Matter.Render.run(render)

            const renderLoop = () => {
                const ctx = render.context

                ctx.clearRect(0, 0, W, H)

                engine.world.bodies.forEach(b => {
                    const body = b as ImageBody

                    if (!body.img) return

                    const maxSize = body.imgSize

                    const aspect = body.img.width / body.img.height

                    let drawWidth = maxSize
                    let drawHeight = maxSize

                    if (aspect > 1) {
                        drawHeight = maxSize / aspect
                    } else {
                        drawWidth = maxSize * aspect
                    }

                    ctx.save()

                    ctx.translate(body.position.x, body.position.y)
                    ctx.rotate(body.angle)

                    ctx.drawImage(body.img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight)

                    ctx.restore()
                })

                animationFrame = requestAnimationFrame(renderLoop)
            }

            let animationFrame = requestAnimationFrame(renderLoop)

            return () => {
                clearInterval(spawnInterval)

                cancelAnimationFrame(animationFrame)

                Matter.Render.stop(render)
                Matter.Runner.stop(runner)

                Matter.World.clear(engine.world, false)
                Matter.Engine.clear(engine)

                render.canvas.remove()
            }
        }

        let cleanup: (() => void) | undefined

        PRODUCT_IMAGES.forEach(src => {
            const img = new Image()

            img.src = src

            img.onload = () => {
                loadedImages.set(src, img)

                loadedCount++

                console.log(`Loaded image ${loadedCount}/${PRODUCT_IMAGES.length}`)

                if (loadedCount === PRODUCT_IMAGES.length) {
                    console.log('All images loaded')

                    cleanup = startPhysics()
                }
            }

            img.onerror = () => {
                console.error('Failed to load image:', src)
            }
        })

        return () => {
            cleanup?.()
        }
    }, [])

    return (
        <div className="relative flex justify-center items-center min-h-screen w-full overflow-hidden">
            <div ref={sceneRef} className="absolute inset-0 pointer-events-auto" style={{ zIndex: 0 }} />

            <div className="relative flex flex-col max-w-xs text-center z-10 pointer-events-none">
                <Logo />

                <h1 className="text-4xl font-semibold mb-8">Ready to shop?</h1>

                <button
                    onClick={loginWithGoogle}
                    className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium cursor-pointer pointer-events-auto bg-white"
                >
                    <img src="https://authjs.dev/img/providers/google.svg" alt="Google logo" height="24" width="24" />

                    <span>Continue with Google</span>
                </button>
            </div>
        </div>
    )
}
