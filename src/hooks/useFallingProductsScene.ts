import { useEffect, type RefObject } from 'react'
import Matter from 'matter-js'

import bananaUrl from '/products-images/banana.svg'
import breadUrl from '/products-images/bread.svg'
import greenAppleUrl from '/products-images/green_apple.svg'
import ketchupUrl from '/products-images/ketchup.svg'
import milkUrl from '/products-images/milk.svg'
import pepperUrl from '/products-images/pepper.svg'
import redAppleUrl from '/products-images/red_apple.svg'

const PRODUCT_IMAGES: string[] = [bananaUrl, breadUrl, greenAppleUrl, ketchupUrl, milkUrl, pepperUrl, redAppleUrl]

const PRODUCT_BODY_OPTIONS: Matter.IChamferableBodyDefinition = {
    restitution: 0.3,
    friction: 0.5,
    frictionAir: 0.01,
    density: 0.001,
    render: {
        visible: false,
    },
}

interface ImageBody extends Matter.Body {
    img: HTMLImageElement
    imgWidth: number
    imgHeight: number
}

function isImageBody(body: Matter.Body): body is ImageBody {
    return 'img' in body && 'imgWidth' in body && 'imgHeight' in body
}

export function useFallingProductsScene(sceneRef: RefObject<HTMLDivElement | null>) {
    useEffect(() => {
        const container = sceneRef.current

        if (!container) return

        if (container.querySelector('canvas')) return

        const W = container.clientWidth
        const H = container.clientHeight

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
                const width = img.naturalWidth || img.width
                const height = img.naturalHeight || img.height
                const maxSize = Math.max(width, height)

                const body =
                    src === milkUrl
                        ? Matter.Bodies.rectangle(x, -height / 2, width, height, {
                              ...PRODUCT_BODY_OPTIONS,
                              chamfer: { radius: 10 },
                          })
                        : Matter.Bodies.circle(x, -maxSize / 2, maxSize * 0.4, PRODUCT_BODY_OPTIONS)

                const imageBody = body as ImageBody

                imageBody.img = img
                imageBody.imgWidth = width
                imageBody.imgHeight = height

                Matter.World.add(engine.world, imageBody)

                spawnCount++
            }, 400)

            const runner = Matter.Runner.create()

            Matter.Runner.run(runner, engine)
            Matter.Render.run(render)

            const keepProductsInBounds = () => {
                engine.world.bodies.forEach(body => {
                    if (!isImageBody(body)) return

                    const halfWidth = (body.bounds.max.x - body.bounds.min.x) / 2
                    const halfHeight = (body.bounds.max.y - body.bounds.min.y) / 2
                    const x = Math.min(Math.max(body.position.x, halfWidth), W - halfWidth)
                    const minY = body.position.y < halfHeight && body.velocity.y > 0 ? body.position.y : halfHeight
                    const y = Math.min(Math.max(body.position.y, minY), H - halfHeight)
                    const isOutOfBoundsX = x !== body.position.x
                    const isOutOfBoundsY = y !== body.position.y

                    if (!isOutOfBoundsX && !isOutOfBoundsY) return

                    Matter.Body.setPosition(body, { x, y })
                    Matter.Body.setVelocity(body, {
                        x: isOutOfBoundsX ? 0 : body.velocity.x,
                        y: isOutOfBoundsY ? 0 : body.velocity.y,
                    })
                })
            }

            Matter.Events.on(engine, 'afterUpdate', keepProductsInBounds)

            const renderLoop = () => {
                const ctx = render.context

                ctx.clearRect(0, 0, W, H)

                engine.world.bodies.forEach(b => {
                    const body = b as ImageBody

                    if (!body.img) return

                    ctx.save()

                    ctx.translate(body.position.x, body.position.y)
                    ctx.rotate(body.angle)

                    ctx.drawImage(body.img, -body.imgWidth / 2, -body.imgHeight / 2, body.imgWidth, body.imgHeight)

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
                Matter.Events.off(engine, 'afterUpdate', keepProductsInBounds)

                Matter.World.clear(engine.world, false)
                Matter.Engine.clear(engine)

                render.canvas.remove()
            }
        }

        let cleanup: (() => void) | undefined

        let isCancelled = false
        const images: HTMLImageElement[] = []

        PRODUCT_IMAGES.forEach(src => {
            const img = new Image()
            images.push(img)

            img.src = src

            img.onload = () => {
                if (isCancelled) return

                loadedImages.set(src, img)

                loadedCount++

                if (loadedCount === PRODUCT_IMAGES.length) {
                    cleanup = startPhysics()
                }
            }

            img.onerror = () => {
                console.error('Failed to load image:', src)
            }
        })

        return () => {
            isCancelled = true
            images.forEach(img => {
                img.onload = null
                img.onerror = null
            })
            cleanup?.()
        }
    }, [sceneRef])
}
