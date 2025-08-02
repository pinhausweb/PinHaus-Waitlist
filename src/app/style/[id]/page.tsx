import Image from "next/image"
import Link from "next/link"
import { fashionImages } from "@/components/style-gallery"
import { ArrowLeft } from "lucide-react"

// Mock product recommendations data
const productRecommendations = {
  "street-style": [
    { id: 1, name: "Distressed Cargo Pants", price: "$89.99", image: "/placeholder.svg?height=200&width=200" },
    { id: 2, name: "Draped White Top", price: "$45.00", image: "/placeholder.svg?height=200&width=200" },
    { id: 3, name: "Studded Combat Boots", price: "$129.99", image: "/placeholder.svg?height=200&width=200" },
    { id: 4, name: "Mesh Cap", price: "$32.00", image: "/placeholder.svg?height=200&width=200" },
  ],
  "luxe-grunge": [
    { id: 1, name: "Silver Metallic Dress", price: "$120.00", image: "/placeholder.svg?height=200&width=200" },
    { id: 2, name: "Faux Fur Collar Jacket", price: "$189.99", image: "/placeholder.svg?height=200&width=200" },
    { id: 3, name: "Leather Ankle Boots", price: "$149.99", image: "/placeholder.svg?height=200&width=200" },
    { id: 4, name: "Statement Necklace", price: "$45.00", image: "/placeholder.svg?height=200&width=200" },
  ],
  "oversized-sweater": [
    { id: 1, name: "Oversized Graphic Sweater", price: "$79.99", image: "/placeholder.svg?height=200&width=200" },
    { id: 2, name: "Plaid Asymmetric Skirt", price: "$65.00", image: "/placeholder.svg?height=200&width=200" },
    { id: 3, name: "Studded Choker", price: "$29.99", image: "/placeholder.svg?height=200&width=200" },
    { id: 4, name: "Canvas High-tops", price: "$59.99", image: "/placeholder.svg?height=200&width=200" },
  ],
}

// Default recommendations for styles without specific products
const defaultRecommendations = [
  { id: 1, name: "Vintage Inspired Top", price: "$49.99", image: "/placeholder.svg?height=200&width=200" },
  { id: 2, name: "Statement Outerwear", price: "$159.99", image: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: "Textured Bottoms", price: "$79.99", image: "/placeholder.svg?height=200&width=200" },
  { id: 4, name: "Unique Accessories", price: "$39.99", image: "/placeholder.svg?height=200&width=200" },
]

export default function StylePage({ params }: { params: { id: string } }) {
  const image = fashionImages.find((img) => img.id === params.id)

  // If image not found, use the first image as fallback
  const currentImage = image || fashionImages[0]

  // Get recommendations for this style or use default
  const recommendations =
    productRecommendations[params.id as keyof typeof productRecommendations] || defaultRecommendations

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Header */}
      <div className="bg-dark-brown text-light-gray py-6">
        <div className="container px-4 md:px-6">
          <Link href="/" className="inline-flex items-center text-light-gray hover:text-light-beige transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 md:px-6 py-12">
        <div className="grid gap-12">
          {/* Featured Image */}
          <div className="mx-auto max-w-2xl">
            <div className="relative w-full h-[600px]">
              <Image
                src={currentImage.url || "/placeholder.svg"}
                alt={currentImage.alt}
                fill
                className="object-contain"
                priority
                style={{ backgroundColor: "transparent" }}
              />
            </div>
          </div>

          {/* Product Recommendations */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-dark-brown text-center">Shop This Look</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recommendations.map((product) => (
                <div key={product.id} className="space-y-3">
                  <div className="aspect-square relative bg-white">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover p-4"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-dark-brown">{product.name}</h3>
                    <p className="text-medium-brown">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
