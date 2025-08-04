import Link from "next/link"

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-light-gray relative overflow-hidden">
      {/* Video Background */}
      <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay muted loop playsInline>
        <source
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Webmodelwalk-LiX2aAJECilGHcUr0WcPWWrIQ5Gay3.mp4"
          type="video/mp4"
        />
      </video>

      {/* Content */}
      <h1 className="text-[12vw] md:text-[12vw] text-[16.8vw] font-bold tracking-tighter z-10 relative">PINHAUS</h1>
      <Link
        href="/waitlist"
        className="mt-4 md:mt-8 px-6 md:px-8 py-2 md:py-3 text-sm md:text-base text-light-gray bg-transparent hover:bg-light-beige/20 transition-all cursor-pointer border border-light-gray/30 z-10 relative"
      >
        Join Waitlist
      </Link>
    </div>
  )
}
