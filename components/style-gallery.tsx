import Image from "next/image"
import Link from "next/link"

const fashionImages = [
  {
    id: "street-style",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fem%202-Fib3rPQmuMeXxTuGKQVVliVmBWj12r.png",
    alt: "Street style fashion with white top and cargo pants",
  },
  {
    id: "luxe-grunge",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fem%205-oiZkelkzg2pPL82MwuClgOUNSNpgUe.png",
    alt: "Luxe grunge style with silver dress",
  },
  {
    id: "oversized-sweater",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fem%201-ChbEVdymXAzL1xjlhcekeYa1UaCL6Q.png",
    alt: "Grunge inspired oversized sweater look",
  },
  {
    id: "bohemian-dress",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fem%204-PXaCizlTjCCVIPwkLP0a4D2j6VGqGc.png",
    alt: "Bohemian maximalist dress with fur coat",
  },
  {
    id: "gothic-coat",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fem%206-IvsyPfeJZDaO0Sly9s8sK0PBwA9EQy.png",
    alt: "Gothic romantic style with black coat",
  },
  {
    id: "casual-luxe",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fem%203-XFFmuOO6k4es11uyPJyJOEhukknJk0.png",
    alt: "Casual luxe style with painted denim",
  },
  {
    id: "burgundy-coat",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male%202-TNYtbAhq4TkQX8Isyq7R1sKtxFsl0O.png",
    alt: "Burgundy leather coat look",
  },
  {
    id: "shearling-jacket",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male%204-x52rNAyPgpDM5qELtNDiKdm5FodGfs.png",
    alt: "Black leather jacket with shearling",
  },
  {
    id: "plaid-shirt",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male%201-thm0i18q2UTa6wF3adH78ffTV24K2d.png",
    alt: "Casual streetwear with plaid shirt",
  },
  {
    id: "pinstripe-coat",
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male%203-t4elXvW3U84zCvLDLbpebkIqfGZ4XU.png",
    alt: "Military inspired coat with pinstripes",
  },
]

export default function StyleGallery() {
  return (
    <div className="w-full overflow-x-auto pb-6">
      <div className="flex space-x-6 min-w-max">
        {fashionImages.map((image) => (
          <Link
            key={image.url}
            href={`/style/${image.id}`}
            className="w-[280px] flex-none cursor-pointer hover:opacity-90"
          >
            <div className="relative w-full h-[420px]">
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-contain"
                style={{ backgroundColor: "transparent" }}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export { fashionImages }
