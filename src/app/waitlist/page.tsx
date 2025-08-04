"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"

export default function WaitlistPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [email, setEmail] = useState("")

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
        this.maxRadius = 300
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
        const rippleWidth = 50

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

        if (isInverted) {
          ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + this.rippleInfluence * 0.7})`
        } else {
          ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
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
      const bgGray = Math.floor(backgroundInversion * 255)
      canvas.style.backgroundColor = `rgb(${bgGray}, ${bgGray}, ${bgGray})`

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
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email submission here
    console.log("Email submitted:", email)
    // You can add your email collection logic here
  }

  return (
    <div className={`min-h-screen relative overflow-hidden ${isSuccess ? 'bg-white' : 'bg-black'}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        style={{ background: isSuccess ? "#ffffff" : "#000000" }}
      />

      {/* Email form overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg max-w-md w-full mx-4 pointer-events-auto">
          <Link href="/" className="text-dark-brown hover:text-medium-brown transition-colors mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold mb-4 text-dark-brown text-center">Join the Waitlist</h1>
          <p className="text-medium-brown mb-6 text-center">
            Be the first to experience the future of fashion curation.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-medium-brown text-dark-brown placeholder:text-medium-brown/50 focus:outline-none focus:border-dark-brown rounded"
              required
            />
            <button
              type="submit"
              className="w-full p-3 bg-dark-brown text-light-gray hover:bg-medium-brown transition-colors cursor-pointer rounded"
            >
              Join Now
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
