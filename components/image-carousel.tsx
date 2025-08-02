"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const images = [
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fem%202-Fib3rPQmuMeXxTuGKQVVliVmBWj12r.png",
    alt: "Street style fashion with white top and cargo pants",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fem%205-oiZkelkzg2pPL82MwuClgOUNSNpgUe.png",
    alt: "Luxe grunge style with silver dress",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fem%201-ChbEVdymXAzL1xjlhcekeYa1UaCL6Q.png",
    alt: "Grunge inspired oversized sweater look",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fem%204-PXaCizlTjCCVIPwkLP0a4D2j6VGqGc.png",
    alt: "Bohemian maximalist dress with fur coat",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fem%206-IvsyPfeJZDaO0Sly9s8sK0PBwA9EQy.png",
    alt: "Gothic romantic style with black coat",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fem%203-XFFmuOO6k4es11uyPJyJOEhukknJk0.png",
    alt: "Casual luxe style with painted denim",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male%202-TNYtbAhq4TkQX8Isyq7R1sKtxFsl0O.png",
    alt: "Burgundy leather coat look",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male%204-x52rNAyPgpDM5qELtNDiKdm5FodGfs.png",
    alt: "Black leather jacket with shearling",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male%201-thm0i18q2UTa6wF3adH78ffTV24K2d.png",
    alt: "Casual streetwear with plaid shirt",
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male%203-t4elXvW3U84zCvLDLbpebkIqfGZ4XU.png",
    alt: "Military inspired coat with pinstripes",
  },
]

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000) // Change image every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      {images.map((image, index) => (
        <div
          key={image.url}
          className="absolute w-full h-full transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: index === currentIndex ? 1 : 0,
            zIndex: index === currentIndex ? 1 : 0,
          }}
        >
          <Image
            src={image.url || "/placeholder.svg"}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  )
}
