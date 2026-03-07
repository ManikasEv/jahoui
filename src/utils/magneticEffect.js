import { gsap } from "gsap"

/**
 * Creates a magnetic effect where elements follow the cursor
 */
export function createMagneticEffect(element, strength = 0.3) {
  if (!element) return

  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength

    gsap.to(element, {
      x: deltaX,
      y: deltaY,
      duration: 0.5,
      ease: "power2.out",
    })
  }

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    })
  }

  element.addEventListener("mousemove", handleMouseMove)
  element.addEventListener("mouseleave", handleMouseLeave)

  return () => {
    element.removeEventListener("mousemove", handleMouseMove)
    element.removeEventListener("mouseleave", handleMouseLeave)
  }
}

/**
 * Creates a cursor follower element
 */
export function createCursorFollower() {
  const follower = document.createElement("div")
  follower.className = "cursor-follower"
  document.body.appendChild(follower)

  let mouseX = 0
  let mouseY = 0
  let currentX = 0
  let currentY = 0

  const handleMouseMove = (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  }

  const animate = () => {
    currentX += (mouseX - currentX) * 0.1
    currentY += (mouseY - currentY) * 0.1
    
    follower.style.transform = `translate(${currentX}px, ${currentY}px)`
    requestAnimationFrame(animate)
  }

  document.addEventListener("mousemove", handleMouseMove)
  animate()

  return () => {
    document.removeEventListener("mousemove", handleMouseMove)
    follower.remove()
  }
}
