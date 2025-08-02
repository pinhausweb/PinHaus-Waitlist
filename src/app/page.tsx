import Link from "next/link"

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-dark-brown text-light-gray relative overflow-hidden">
      {/* Video Background */}
      <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay muted loop playsInline>
        <source
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Webmodelwalk-LiX2aAJECilGHcUr0WcPWWrIQ5Gay3.mp4"
          type="video/mp4"
        />
      </video>

      {/* Content */}
      <h1 className="text-[12vw] font-bold tracking-tighter z-10 relative">PINHAUS</h1>
      <Link
        href="/waitlist"
        className="mt-8 px-8 py-3 text-light-gray bg-transparent hover:bg-light-beige/20 transition-all cursor-pointer border border-light-gray/30 z-10 relative"
      >
        Join Waitlist
      </Link>
    </div>
  )
}
