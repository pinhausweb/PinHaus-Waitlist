"use client"

import { useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

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
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <div className="relative w-full h-full">
      {/* Navigation Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 text-dark-brown rounded-full p-2 shadow-md hover:bg-white transition-colors"
        aria-label="Scroll left"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 text-dark-brown rounded-full p-2 shadow-md hover:bg-white transition-colors"
        aria-label="Scroll right"
      >
        <ChevronRight size={24} />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide h-full pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {images.map((image) => (
          <div key={image.url} className="flex-none w-[300px] mx-2 bg-white p-2">
            <div className="relative w-full h-full aspect-[3/5]">
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-contain"
                sizes="300px"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
