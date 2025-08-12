"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function WaitlistPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Grid configuration
    const GRID_SIZE = 25
    const SPACING = 30
    const LETTERS = ["P", "I", "N", "H", "A", "U", "S"]
    const FONT_SIZE = 12
    const DAMPING = 0.92
    const ATTRACTION_STRENGTH = 0.12
    const INFLUENCE_RADIUS = 90

    // Ripple class
    class Ripple {
      x: number
      y: number
      radius: number
      maxRadius: number
      speed: number
      alpha: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.radius = 0
        // Random max radius between 70% and 140% of base 300
        this.maxRadius = 300 * (0.7 + Math.random() * 0.7) // 210 to 420
        this.speed = 2.6
        this.alpha = 1
      }

      update() {
        this.radius += this.speed
        this.alpha = Math.max(0, 1 - this.radius / this.maxRadius)
        return this.radius < this.maxRadius
      }

      getInfluenceAt(x: number, y: number) {
        const distance = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2)
        const rippleEdge = this.radius
        const rippleWidth = 50 // Keep width constant

        if (distance >= rippleEdge - rippleWidth && distance <= rippleEdge + rippleWidth) {
          const distanceFromEdge = Math.abs(distance - rippleEdge)
          const influence = (1 - distanceFromEdge / rippleWidth) * this.alpha
          return Math.max(0, influence)
        }
        return 0
      }
    }

    // Node class
    class Node {
      x: number
      y: number
      originalX: number
      originalY: number
      vx: number
      vy: number
      letter: string
      connections: any[]
      isDragging: boolean
      energy: number
      rippleInfluence: number
      breathingScale: number

      constructor(x: number, y: number, originalX: number, originalY: number, letter: string) {
        this.x = x
        this.y = y
        this.originalX = originalX
        this.originalY = originalY
        this.vx = 0
        this.vy = 0
        this.letter = letter
        this.connections = []
        this.isDragging = false
        this.energy = 0
        this.rippleInfluence = 0
        this.breathingScale = 1
      }

      update(
        mouseX: number,
        mouseY: number,
        prevMouseX: number,
        prevMouseY: number,
        isMouseDown: boolean,
        mouseVelocity: number,
        time: number,
        ripples: Ripple[],
      ) {
        // Calculate ripple influence
        this.rippleInfluence = 0
        for (const ripple of ripples) {
          this.rippleInfluence = Math.max(this.rippleInfluence, ripple.getInfluenceAt(this.x, this.y))
        }

        // Subtle breathing effect
        const breathingPhase = time * 0.001 + this.originalX * 0.005 + this.originalY * 0.005
        const breathingIntensity = Math.sin(breathingPhase) * 0.5 + 0.5
        this.breathingScale = 1 + breathingIntensity * 0.3

        // Calculate dynamic influence radius
        const dynamicInfluenceRadius = INFLUENCE_RADIUS * (1 + mouseVelocity * 0.01)

        // Check if mouse is within influence radius
        const distanceToMouse = Math.sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2)

        if (isMouseDown && distanceToMouse <= dynamicInfluenceRadius) {
          const dragDirX = mouseX - prevMouseX
          const dragDirY = mouseY - prevMouseY
          const dragMagnitude = Math.sqrt(dragDirX * dragDirX + dragDirY * dragDirY)

          if (dragMagnitude > 0) {
            const influence = 1 - distanceToMouse / dynamicInfluenceRadius
            const forceStrength = influence * (0.5 + mouseVelocity * 0.02)

            this.vx += (dragDirX / dragMagnitude) * forceStrength
            this.vy += (dragDirY / dragMagnitude) * forceStrength
          }
        }

        // Spring force back to original position
        const dx = this.originalX - this.x
        const dy = this.originalY - this.y
        this.vx += dx * ATTRACTION_STRENGTH
        this.vy += dy * ATTRACTION_STRENGTH

        // Apply velocity
        this.x += this.vx
        this.y += this.vy

        // Damping
        this.vx *= DAMPING
        this.vy *= DAMPING

        // Calculate energy
        this.energy = Math.sqrt(this.vx * this.vx + this.vy * this.vy) * 10
        this.energy = Math.min(this.energy, 1)
      }

      draw() {
        const scaledFontSize = FONT_SIZE * this.breathingScale
        const isInverted = this.rippleInfluence > 0.1

        if (isSuccess) {
          // Success state: white background, black text appears in ripples
          if (isInverted) {
            ctx.fillStyle = `rgba(0, 0, 0, ${0.3 + this.rippleInfluence * 0.7})`
          } else {
            ctx.fillStyle = "rgba(0, 0, 0, 0)" // Invisible on white background
          }
        } else {
          // Normal state: background image, white text appears in ripples
          if (isInverted) {
            ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + this.rippleInfluence * 0.7})`
          } else {
            ctx.fillStyle = "rgba(0, 0, 0, 0)" // Fully transparent when not activated
          }
        }

        ctx.font = `${scaledFontSize}px Arial`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(this.letter, this.x, this.y)
      }
    }

    // Create grid
    const nodes: Node[] = []
    const cols = Math.ceil(canvas.width / SPACING) + 2
    const rows = Math.ceil(canvas.height / SPACING) + 2

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * SPACING
        const y = row * SPACING
        const letterIndex = (row * cols + col) % LETTERS.length
        const letter = LETTERS[letterIndex]
        nodes.push(new Node(x, y, x, y, letter))
      }
    }

    // Mouse interaction variables
    let mouseX = 0
    let mouseY = 0
    let prevMouseX = 0
    let prevMouseY = 0
    let isMouseDown = false
    let mouseVelocity = 0
    let ripples: Ripple[] = []

    // Function to create random ripple
    const createRandomRipple = () => {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      ripples.push(new Ripple(x, y))
    }

    // Auto-spawn ripples
    setTimeout(() => {
      createRandomRipple()
      createRandomRipple()
    }, 4000) // 2 ripples after 4 seconds

    setTimeout(() => {
      createRandomRipple()
    }, 7000) // 1 ripple after 7 seconds

    function getMousePos(e: MouseEvent | TouchEvent) {
      const rect = canvas.getBoundingClientRect()
      if (e instanceof MouseEvent) {
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        }
      } else {
        const touch = e.touches[0]
        return {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        }
      }
    }

    // Mouse events
    const handleMouseDown = (e: MouseEvent) => {
      const pos = getMousePos(e)
      mouseX = pos.x
      mouseY = pos.y
      isMouseDown = true
      ripples.push(new Ripple(mouseX, mouseY))
    }

    const handleMouseMove = (e: MouseEvent) => {
      prevMouseX = mouseX
      prevMouseY = mouseY
      const pos = getMousePos(e)
      mouseX = pos.x
      mouseY = pos.y
      const deltaX = mouseX - prevMouseX
      const deltaY = mouseY - prevMouseY
      mouseVelocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    }

    const handleMouseUp = () => {
      isMouseDown = false
    }

    // Touch events
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      const pos = getMousePos(e)
      mouseX = pos.x
      mouseY = pos.y
      isMouseDown = true
      ripples.push(new Ripple(mouseX, mouseY))
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      prevMouseX = mouseX
      prevMouseY = mouseY
      const pos = getMousePos(e)
      mouseX = pos.x
      mouseY = pos.y
      const deltaX = mouseX - prevMouseX
      const deltaY = mouseY - prevMouseY
      mouseVelocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    }

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault()
      isMouseDown = false
    }

    // Add event listeners
    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseup", handleMouseUp)
    canvas.addEventListener("touchstart", handleTouchStart)
    canvas.addEventListener("touchmove", handleTouchMove)
    canvas.addEventListener("touchend", handleTouchEnd)

    // Animation loop
    function animate() {
      const currentTime = Date.now()

      // Calculate background inversion
      let backgroundInversion = 0
      for (const ripple of ripples) {
        const rippleArea = Math.PI * ripple.radius * ripple.radius
        const screenArea = canvas.width * canvas.height
        const influence = Math.min(rippleArea / screenArea, 1) * ripple.alpha
        backgroundInversion = Math.max(backgroundInversion, influence * 0.5)
      }

      // Set background color
      if (isSuccess) {
        // Success state: transparent background to show image
        canvas.style.backgroundColor = "transparent"
      } else {
        // Normal state: transparent background to show image
        canvas.style.backgroundColor = "transparent"
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update ripples
      ripples = ripples.filter((ripple) => ripple.update())

      // Update and draw nodes
      for (const node of nodes) {
        node.update(mouseX, mouseY, prevMouseX, prevMouseY, isMouseDown, mouseVelocity, currentTime, ripples)
        node.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseup", handleMouseUp)
      canvas.removeEventListener("touchstart", handleTouchStart)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isSuccess])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate email
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.")
      return
    }

    if (isSubmitting) {
      return // Prevent double submission
    }

    setIsSubmitting(true)

    try {
      // Send to Google Apps Script (handles both data collection and email)
      await fetch(
        "https://script.google.com/macros/s/AKfycbwSAnFvqAv8hyIafvBF07AywwK4NztdurWW15FisRO_eTkmc8ZGOWPuzPGLwSox0ycy/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ email }),
        },
      )

      // Start transition
      setIsTransitioning(true)

      // After 1 second, complete the transition
      setTimeout(() => {
        setIsSuccess(true)
        setIsTransitioning(false)
      }, 1000)

      // Clear email input
      setEmail("")
    } catch (error) {
      console.error("Error submitting email:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: isSuccess ? 'url("/Success-Background.jpg")' : 'url("/backstage-fashion-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          imageRendering: 'optimizeSpeed',
          imageRendering: '-webkit-optimize-contrast',
        }}
      />
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing z-10"
        style={{ background: isSuccess ? "#ffffff" : "transparent" }}
      />

      {/* Email form overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <div className="max-w-md w-full mx-4 pointer-events-auto">
          {!isSuccess ? (
            <form
              onSubmit={handleSubmit}
              className={`space-y-4 transition-opacity duration-1000 ${isTransitioning ? "opacity-0" : "opacity-100"}`}
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-transparent border-b-2 border-white text-white placeholder:text-white focus:outline-none focus:border-white/80"
                style={{
                  color: "#FFFFFF",
                  backgroundColor: "transparent",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                }}
                required
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full p-4 font-bold transition-all duration-300 relative overflow-hidden disabled:opacity-50 text-2xl"
                style={{
                  background: "transparent",
                  border: "2px solid transparent",
                }}
              >
                {/* Corner brackets */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Top-left bracket */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-white"></div>
                  {/* Top-right bracket */}
                  <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-white"></div>
                  {/* Bottom-left bracket */}
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-white"></div>
                  {/* Bottom-right bracket */}
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-white"></div>
                </div>
                
                <span 
                  className="relative z-10"
                  style={{
                    background: "linear-gradient(135deg, rgb(245, 245, 250) 0%, rgb(160, 160, 190) 25%, rgb(100, 100, 130) 50%, rgb(220, 220, 240) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  {isSubmitting ? "Joining..." : "JOIN NOW"}
                </span>
              </button>
            </form>
          ) : (
            <div className="text-center animate-fadeIn">
              <h1 className="text-4xl font-medium text-black mb-2">YOU'RE IN</h1>
              <p className="text-gray-600 text-sm">Early access coming soon.</p>
            </div>
          )}
        </div>
      </div>

      {/* Back button */}
      <Link
        href="/"
        className={`absolute top-6 left-6 z-20 transition-colors duration-1000 pointer-events-auto ${
          isSuccess ? "text-black hover:text-gray-700" : "text-white hover:text-white/80"
        }`}
      >
        <ChevronLeft size={32} />
      </Link>

      {/* Black overlay that stays for 0.3s then fades away on success */}
      {isSuccess && (
        <div
          className="absolute inset-0 z-30 animate-blackStayThenFade pointer-events-none"
          style={{
            backgroundColor: "#0D0D0D",
            willChange: "opacity",
          }}
        />
      )}



      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes blackStayThenFade {
          0% { opacity: 1; }
          27.3% { opacity: 1; }  /* Stay at full opacity for 0.3s out of 1.1s total */
          27.4% { opacity: 0.99; } /* Ensure it stays black during transition */
          100% { opacity: 0; }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out forwards;
        }

        .animate-blackStayThenFade {
          animation: blackStayThenFade 1.1s ease-in-out forwards;
        }

        /* Mobile keyboard fixes */
        @media screen and (max-width: 768px) {
          .min-h-screen {
            min-height: 100vh;
            min-height: -webkit-fill-available;
          }
          
          /* Prevent white space when keyboard appears */
          input[type="email"] {
            font-size: 16px; /* Prevents zoom on iOS */
          }
          
          /* Ensure form stays centered even with keyboard */
          .absolute.inset-0.flex.items-center.justify-center {
            align-items: flex-start;
            padding-top: 20vh;
          }
        }
      `}</style>
    </div>
  )
}
