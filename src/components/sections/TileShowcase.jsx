import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import * as THREE from "three"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js"

const praises = [
  { text: "Perfekte Verarbeitung", angle: 0 },
  { text: "Saubere Fugen", angle: 30 },
  { text: "Präzise Arbeit", angle: 60 },
  { text: "Langlebige Qualität", angle: 90 },
  { text: "Meisterhafte Arbeit", angle: 120 },
  { text: "Höchste Standards", angle: 150 },
  { text: "Millimetergenau", angle: 180 },
  { text: "Erstklassig", angle: 210 },
  { text: "Termingerecht", angle: 240 },
  { text: "Professionell", angle: 270 },
  { text: "Zuverlässig", angle: 300 },
  { text: "Erfahren", angle: 330 },
]

export default function TileShowcase() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const tileGroupRef = useRef(null)
  const textGroupsRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetRotationRef = useRef({ x: 0, y: 0 })
  const mobileMessagesRef = useRef([])
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.offsetWidth / containerRef.current.offsetHeight,
      0.1,
      1000
    )
    camera.position.z = 4
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    })
    renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer

    // Create tile geometry
    const tileGroup = new THREE.Group()
    tileGroupRef.current = tileGroup

    // Create single large tile
    const tileSize = 1.2
    const geometry = new THREE.BoxGeometry(tileSize, tileSize, 0.08)
    
    // Create gradient material for tile
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    
    // Create marble-like texture
    const gradient = ctx.createLinearGradient(0, 0, 512, 512)
    gradient.addColorStop(0, '#ffffff')
    gradient.addColorStop(0.3, '#f8f9fa')
    gradient.addColorStop(0.6, '#e9ecef')
    gradient.addColorStop(1, '#dee2e6')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 512, 512)
    
    // Add marble veins
    ctx.strokeStyle = 'rgba(180, 180, 180, 0.3)'
    ctx.lineWidth = 2
    for (let i = 0; i < 15; i++) {
      ctx.beginPath()
      ctx.moveTo(Math.random() * 512, Math.random() * 512)
      ctx.quadraticCurveTo(
        Math.random() * 512, Math.random() * 512,
        Math.random() * 512, Math.random() * 512
      )
      ctx.stroke()
    }
    
    const texture = new THREE.CanvasTexture(canvas)
    
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      metalness: 0.4,
      roughness: 0.3,
      emissive: 0xffffff,
      emissiveIntensity: 0.1,
    })

    const tile = new THREE.Mesh(geometry, material)
    tileGroup.add(tile)
    scene.add(tileGroup)

    // Create 3D text labels around the tile
    const createTextMeshes = () => {
      praises.forEach((praise, index) => {
        const textGroup = new THREE.Group()
        
        // Create line that goes up
        const lineMaterial = new THREE.LineBasicMaterial({ 
          color: 0xffffff, // White color
          linewidth: 2,
          transparent: true,
          opacity: 0
        })
        
        // Calculate direction based on angle around the tile
        const angle = (praise.angle * Math.PI) / 180
        const radius = tileSize / 2
        
        // Start position on tile edge
        const startX = Math.cos(angle) * radius
        const startY = Math.sin(angle) * radius
        
        // First line - goes straight outward from tile
        const lineLength = 0.6
        const endX1 = startX + Math.cos(angle) * lineLength
        const endY1 = startY + Math.sin(angle) * lineLength
        
        const linePoints1 = []
        linePoints1.push(new THREE.Vector3(startX, startY, 0))
        linePoints1.push(new THREE.Vector3(endX1, endY1, 0))
        const lineGeometry1 = new THREE.BufferGeometry().setFromPoints(linePoints1)
        const line1 = new THREE.Line(lineGeometry1, lineMaterial.clone())
        
        // Second line - 90 degree turn (straight up or down)
        const verticalLength = 0.4
        // If angle is in top half (90-270), go up, otherwise go down
        const goUp = angle > Math.PI/2 && angle < Math.PI*3/2
        const endX2 = endX1
        const endY2 = endY1 + (goUp ? verticalLength : -verticalLength)
        
        const linePoints2 = []
        linePoints2.push(new THREE.Vector3(endX1, endY1, 0))
        linePoints2.push(new THREE.Vector3(endX2, endY2, 0))
        const lineGeometry2 = new THREE.BufferGeometry().setFromPoints(linePoints2)
        const line2 = new THREE.Line(lineGeometry2, lineMaterial.clone())
        
        textGroup.add(line1)
        textGroup.add(line2)
        
        // Create simple text sprite
        const createTextSprite = (message) => {
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')
          canvas.width = 512
          canvas.height = 128
          
          context.fillStyle = 'rgba(0, 0, 0, 0)'
          context.fillRect(0, 0, canvas.width, canvas.height)
          
          context.font = 'Bold 36px Arial'
          context.fillStyle = 'white'
          context.textAlign = 'center'
          context.textBaseline = 'middle'
          context.fillText(message, 256, 64)
          
          const texture = new THREE.CanvasTexture(canvas)
          const spriteMaterial = new THREE.SpriteMaterial({ 
            map: texture,
            transparent: true,
            opacity: 0
          })
          const sprite = new THREE.Sprite(spriteMaterial)
          sprite.scale.set(1.5, 0.375, 1)
          
          // Position text at the end of second line
          sprite.position.set(endX2, endY2, 0)
          
          return sprite
        }
        
        const textSprite = createTextSprite(praise.text)
        textGroup.add(textSprite)
        
        textGroup.userData = {
          line1,
          line2,
          textSprite,
          targetAngle: praise.angle,
        }
        
        textGroupsRef.current.push(textGroup)
        tileGroup.add(textGroup)
      })
    }

    createTextMeshes()

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(3, 3, 5)
    scene.add(directionalLight)

    const pointLight1 = new THREE.PointLight(0xc41e3a, 0.6)
    pointLight1.position.set(-2, 2, 3)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xffffff, 0.5)
    pointLight2.position.set(2, -2, 2)
    scene.add(pointLight2)

    // Animation loop
    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Smooth rotation based on mouse
      targetRotationRef.current.x += (mouseRef.current.y * 0.3 - targetRotationRef.current.x) * 0.08
      targetRotationRef.current.y += (mouseRef.current.x * 0.8 - targetRotationRef.current.y) * 0.08

      tileGroup.rotation.x = targetRotationRef.current.x
      tileGroup.rotation.y = targetRotationRef.current.y

      // Auto-rotate when not hovering
      if (Math.abs(mouseRef.current.x) < 0.01 && Math.abs(mouseRef.current.y) < 0.01) {
        tileGroup.rotation.y += 0.005
      }

      // Update text visibility based on rotation
      const currentAngleDeg = ((tileGroup.rotation.y * 180) / Math.PI) % 360
      
      textGroupsRef.current.forEach((textGroup) => {
        const { line1, line2, textSprite, targetAngle } = textGroup.userData
        
        // Calculate angular difference
        let angleDiff = Math.abs(currentAngleDeg - targetAngle)
        if (angleDiff > 180) angleDiff = 360 - angleDiff
        
        // Show text when within 70 degrees of target angle (wider threshold)
        const threshold = 70
        let opacity = 0
        
        if (angleDiff < threshold) {
          opacity = 1 - (angleDiff / threshold)
        }
        
        // Animate lines and text
        if (line1.material.opacity < opacity) {
          line1.material.opacity += 0.05
        } else if (line1.material.opacity > opacity) {
          line1.material.opacity -= 0.05
        }
        
        if (line2.material.opacity < opacity) {
          line2.material.opacity += 0.05
        } else if (line2.material.opacity > opacity) {
          line2.material.opacity -= 0.05
        }
        
        if (textSprite.material.opacity < opacity) {
          textSprite.material.opacity += 0.05
        } else if (textSprite.material.opacity > opacity) {
          textSprite.material.opacity -= 0.05
        }
      })

      renderer.render(scene, camera)
    }
    animate()

    // Mouse move handler
    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }

    const handleMouseLeave = () => {
      mouseRef.current.x = 0
      mouseRef.current.y = 0
    }

    containerRef.current.addEventListener("mousemove", handleMouseMove)
    containerRef.current.addEventListener("mouseleave", handleMouseLeave)

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.offsetWidth
      const height = containerRef.current.offsetHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      containerRef.current?.removeEventListener("mousemove", handleMouseMove)
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("resize", handleResize)
      geometry.dispose()
      material.dispose()
      texture.dispose()
      renderer.dispose()
    }
  }, [])

  // Mobile 3D animation effect
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (!isMobile) return

    const messages = mobileMessagesRef.current.filter(el => el !== null && el !== undefined)
    if (messages.length === 0) {
      console.log('No messages found for animation')
      return
    }

    console.log(`Starting mobile animation with ${messages.length} messages`)
    
    let currentIndex = 0
    let isAnimating = false

    const animateMessage = () => {
      if (isAnimating) return
      isAnimating = true

      const currentMsg = messages[currentIndex]
      const nextIndex = (currentIndex + 1) % messages.length
      
      // Hide all messages first
      messages.forEach(msg => {
        if (msg) gsap.set(msg, { opacity: 0, scale: 0.3, y: 50 })
      })

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating = false
          currentIndex = nextIndex
          setTimeout(animateMessage, 100)
        }
      })

      // Animate current message
      tl.to(currentMsg, {
        scale: 1, 
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      })
      .to(currentMsg, {
        scale: 1,
        opacity: 1,
        duration: 2.0,
        ease: "none"
      })
      .to(currentMsg, {
        opacity: 0,
        scale: 0.8,
        y: -30,
        duration: 0.4,
        ease: "power2.in"
      })
    }

    // Start animation after delay
    const timeout = setTimeout(() => {
      console.log('Starting first animation')
      animateMessage()
    }, 800)

    return () => {
      clearTimeout(timeout)
      gsap.killTweensOf(messages)
    }
  }, [])

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">
            Unsere Qualität spricht für sich
          </h2>
          <p className="font-[var(--font-body)] text-lg text-[var(--color-slate)] max-w-2xl mx-auto">
            <span className="hidden md:inline">Bewegen Sie die Maus und entdecken Sie unsere Werte</span>
            <span className="md:hidden">Sehen Sie unsere Qualitätsmerkmale</span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          {/* Desktop 3D Canvas Container */}
          <div
            ref={containerRef}
            className="hidden md:block relative w-full max-w-4xl aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-white/10 shadow-2xl"
          >
            <canvas ref={canvasRef} className="w-full h-full" />
            
            {/* Subtle grid overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />
          </div>

          {/* Mobile 3D animated messages */}
          <div className="md:hidden w-full max-w-md mx-auto">
            <div 
              className="relative h-[300px] rounded-2xl overflow-visible bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-white/10 shadow-2xl flex items-center justify-center"
              style={{ perspective: "1000px" }}
            >
              {/* Subtle grid overlay */}
              <div className="absolute inset-0 pointer-events-none z-0 rounded-2xl overflow-hidden" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />

              {/* Animated messages */}
              <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
                {praises.map((praise, i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      if (el) mobileMessagesRef.current[i] = el
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center pointer-events-none"
                    style={{
                      opacity: 0,
                      transform: "scale(0.3) translateY(50px)"
                    }}
                  >
                    <svg 
                      className="w-16 h-16 text-[var(--color-primary)] mb-4" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <rect x="2" y="2" width="8" height="8" rx="1" />
                      <rect x="13" y="2" width="8" height="8" rx="1" />
                      <rect x="2" y="13" width="8" height="8" rx="1" />
                      <rect x="13" y="13" width="8" height="8" rx="1" />
                    </svg>
                    <p className="font-[var(--font-heading)] text-xl font-bold text-white drop-shadow-lg">
                      {praise.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Decorative corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[var(--color-primary)] opacity-50 pointer-events-none" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[var(--color-primary)] opacity-50 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[var(--color-primary)] opacity-50 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[var(--color-primary)] opacity-50 pointer-events-none" />
            </div>
          </div>

          {/* Instruction hint - Desktop only */}
          <div className="hidden md:flex items-center gap-3 text-center justify-center bg-white/90 backdrop-blur px-6 py-4 rounded-xl border border-black/10 shadow-lg">
            <svg 
              className="w-6 h-6 text-[var(--color-primary)]" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <rect x="2" y="2" width="8" height="8" rx="1" />
              <rect x="13" y="2" width="8" height="8" rx="1" />
              <rect x="2" y="13" width="8" height="8" rx="1" />
              <rect x="13" y="13" width="8" height="8" rx="1" />
            </svg>
            <p className="font-[var(--font-body)] text-sm text-[var(--color-dark)] font-semibold">
              Bewegen Sie Ihre Maus über die Fliese, um verschiedene Qualitätsmerkmale zu entdecken
            </p>
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl font-bold text-[var(--color-primary)] mb-2">25+</div>
            <div className="font-[var(--font-body)] text-[var(--color-slate)]">Jahre Erfahrung</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-[var(--color-primary)] mb-2">500+</div>
            <div className="font-[var(--font-body)] text-[var(--color-slate)]">Projekte abgeschlossen</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-[var(--color-primary)] mb-2">100%</div>
            <div className="font-[var(--font-body)] text-[var(--color-slate)]">Kundenzufriedenheit</div>
          </div>
        </div>
      </div>
    </section>
  )
}
