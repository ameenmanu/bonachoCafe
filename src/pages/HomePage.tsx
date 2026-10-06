import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const clamp = (value: number) => Math.min(1, Math.max(0, value))

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12h13M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BurgerStory() {
  const containerRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lastDrawnFrameRef = useRef(-1)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const playheadRef = useRef({ frame: 0 })
  const frameCount = 99

  // 1. Preload + decode
  useEffect(() => {
    let cancelled = false
    const imgs: HTMLImageElement[] = Array(frameCount).fill(null)
    
    // Load first image immediately to paint the initial state without blocking
    const firstImg = new Image()
    firstImg.src = `/frames/ezgif-frame-001.jpg`
    firstImg.onload = () => {
      if (!cancelled) {
        imagesRef.current[0] = firstImg
        drawFrame(playheadRef.current.frame)
        
        // Progressively load the rest of the sequence in the background
        for (let i = 1; i < frameCount; i++) {
          const img = new Image()
          img.src = `/frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`
          imagesRef.current[i] = img
        }
      }
    }
    
    imagesRef.current = imgs

    return () => { cancelled = true }
  }, [])

  // 2. Size the canvas ONLY on resize (not inside drawFrame)
  const sizeCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    lastDrawnFrameRef.current = -1
  }

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current
    const frameIndex = Math.max(0, Math.min(frameCount - 1, Math.round(index)))
    const img = imagesRef.current[frameIndex]
    if (!canvas || !img || !img.naturalWidth) return
    if (lastDrawnFrameRef.current === frameIndex) return

    const ctx = canvas.getContext("2d", { alpha: false })!
    const cw = canvas.width
    const ch = canvas.height
    const imgRatio = img.naturalWidth / img.naturalHeight
    const canvasRatio = cw / ch

    let dw, dh, ox, oy
    if (imgRatio > canvasRatio) {
      dw = cw; dh = cw / imgRatio; ox = 0; oy = (ch - dh) / 2
    } else {
      dh = ch; dw = ch * imgRatio; ox = (cw - dw) * 0.75; oy = 0
    }
    ctx.fillStyle = "#000"          // must match the frame background
    ctx.fillRect(0, 0, cw, ch)
    ctx.drawImage(img, ox, oy, dw, dh)
    lastDrawnFrameRef.current = frameIndex
  }

  // 3. GSAP ScrollTrigger Logic
  useGSAP(() => {
    sizeCanvas()
    drawFrame(playheadRef.current.frame)

    const onResize = () => { sizeCanvas(); drawFrame(playheadRef.current.frame) }
    window.addEventListener("resize", onResize)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: true,
      }
    })

    // Frame sequence animation
    tl.to(playheadRef.current, {
      frame: frameCount - 1,
      ease: "none",
      duration: 1,
      onUpdate: () => drawFrame(playheadRef.current.frame)
    }, 0)

    // Title fades out
    tl.to('.hero-title', {
      opacity: 0,
      ease: "none",
      duration: 0.15
    }, 0.05)

    // Mid-scroll quote fades in
    tl.to('.hero-subtitle', {
      opacity: 1,
      ease: "none",
      duration: 0.15
    }, 0.25)

    // Mid-scroll quote fades out
    tl.to('.hero-subtitle', {
      opacity: 0,
      ease: "none",
      duration: 0.15
    }, 0.55)

    // Intro card slides up
    tl.fromTo('.intro-card',
      { yPercent: 105, opacity: 0 },
      { yPercent: 0, opacity: 1, ease: "none", duration: 0.3 },
      0.7
    )

    return () => window.removeEventListener("resize", onResize)
  }, { scope: containerRef })

  return (
    <section ref={containerRef} style={{ width: '100%', height: '100vh', overflow: 'hidden', position: 'relative', backgroundColor: '#000' }}>

      {/* Canvas for Video Frames */}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          position: 'absolute',
          inset: 0,
        }}
      />

      {/* Hero Title */}
      <div className="hero-title" style={{ position: 'absolute', zIndex: 10, opacity: 1 }}>
        <p>Perinthalmanna · Kerala</p>
        <h1>
          Go on.
          <br />
          Take a bite.
        </h1>
        <div className="scroll-cue">
          <span /> Scroll to unpack
        </div>
      </div>

      {/* Mid-Scroll Quote */}
      <div className="hero-subtitle" style={{
        position: 'absolute',
        zIndex: 10,
        opacity: 0,
        top: '35%',
        left: 'clamp(2rem, 8vw, 6rem)',
        maxWidth: '450px'
      }}>
        <h2 style={{ fontFamily: '"Fraunces", serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--cream)', lineHeight: 1.1, margin: 0 }}>
          Crafted to perfection.
        </h2>
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '1.25rem', color: 'var(--cream)', opacity: 0.8, marginTop: '1rem' }}>
          Experience the ultimate fusion of bold flavors and fresh ingredients, perfectly layered in every single bite.
        </p>
      </div>

      {/* Intro Card */}
      <article
        className="intro-card"
        style={{
          position: 'absolute',
          zIndex: 10,
          right: '3vw',
          bottom: '3vh',
          transform: 'translateY(105%)', // Initial state for GSAP
          opacity: 0
        }}
      >
        <span className="card-kicker">Welcome to Banacho</span>
        <h2>
          A little green.
          <br />A lot of flavor.
        </h2>
        <p>
          Part neighborhood hideaway, part full-flavor playground. Settle in
          for crisp fried chicken, Arabian favorites and shakes that never
          learned to be subtle.
        </p>
        <div className="card-actions">
          <Link to="/menu">
            Explore the menu <Arrow />
          </Link>
          <Link to="/contact" className="text-link">
            Find us
          </Link>
        </div>
      </article>

    </section>
  )
}

function FriesChapter() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo(".fries-image",
      { x: "100vw", y: 50, rotate: 45 },
      { 
        x: "-100vw", 
        y: -50, 
        rotate: -45, 
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%", // Start early when section comes into view
          end: "bottom 10%", // End late as section leaves view
          scrub: 1, 
        } 
      }
    )
  }, { scope: ref })

  return (
    <section className="fries-chapter" ref={ref}>
      <div className="fries-copy">
        <p className="eyebrow">The Banacho way · 01</p>
        <h2>
          Serious about
          <br />
          the good stuff.
        </h2>
        <p>
          We cook for the moment everyone reaches across the table. Crisp edges,
          generous sauces, bright herbs and the right amount of glorious mess.
        </p>
      </div>
      <div className="fries-orbit">
        <div className="orbit-label top">Golden & crisp</div>
        <img
          className="fries-image"
          src="/assets/loaded-fries.png"
          alt="Banacho loaded fries with fresh salsa"
        />
        <img
          className="orbit-berry berry-one"
          src="/assets/strawberry.png"
          alt=""
        />
        <img
          className="orbit-berry berry-two"
          src="/assets/strawberry.png"
          alt=""
        />
        <div className="orbit-label bottom">Built to share</div>
      </div>
    </section>
  )
}

const TopProducts = [
  { id: 1, name: "Vanilla Bean Flat White", rating: "5.0", reviews: 124, img: "/assets/coldcofeejpg.jpg", price: "$4.50" },
  { id: 2, name: "Loaded Truffle Fries", rating: "4.9", reviews: 89, img: "/assets/loaded-fries.png", price: "$8.00" },
  { id: 3, name: "Strawberry Burst Shake", rating: "5.0", reviews: 210, img: "/assets/strawberry-shake.png", price: "$6.50" },
  { id: 4, name: "Berry Delight Cup", rating: "4.8", reviews: 156, img: "/assets/berry-cup.png", price: "$5.50" },
  { id: 5, name: "Classic Zinger Burger", rating: "4.9", reviews: 302, img: "/assets/burger-hero.png", price: "$12.00" },
]

function TopProductsMarquee() {
  const repeatedProducts = [...TopProducts, ...TopProducts]
  return (
    <section className="marquee-section">
      <div className="marquee-heading text-center mb-6">
        <p className="eyebrow">Crowd Favorites</p>
        <h2 style={{ fontFamily: '"Fraunces", serif', fontSize: '2.5rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>Highly Reviewed</h2>
        <p style={{ color: '#D32F2F', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '0.05em' }}>Top Reviewed Items</p>
      </div>
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {repeatedProducts.map((product, i) => (
            <Link to="/reviews" key={`${product.id}-${i}`} className="marquee-card">
              <img src={product.img} alt={product.name} className="marquee-img" />
              <div className="marquee-content">
                <div className="marquee-title-row">
                  <h3 className="marquee-name">{product.name}</h3>
                  <span className="marquee-price">{product.price}</span>
                </div>
                <div className="marquee-rating">
                  <span className="star">★</span> {product.rating} ({product.reviews} reviews)
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function ComboOffersSection() {
  // Use the exact poster images provided by the user
  const posters = [
    "/assets/8e6b2cc96c5071111c8003d92603189b.jpg",
    "/assets/7c73847210101b7ec1b57148ed1cfe74.jpg",
    "/assets/8e6b2cc96c5071111c8003d92603189b.jpg" // Note: Re-using image as requested by user
  ];

  // Duplicate for seamless loop
  const repeatedPosters = [...posters, ...posters, ...posters, ...posters];

  return (
    <section className="bg-[#FAF8F5] py-20 w-full overflow-hidden relative z-20 border-b border-[#EADBCE]">
      <div className="text-center mb-10 px-6">
        <p className="text-[#2C221B] font-bold uppercase tracking-wider text-sm mb-2">Today's Special</p>
        <h2 className="font-serif text-4xl md:text-5xl font-extrabold text-[#D32F2F] leading-tight" style={{ fontFamily: '"Fraunces", serif' }}>
          Unbeatable Combo Offers
        </h2>
      </div>

      <div className="marquee-wrapper-reverse">
        <div className="marquee-track-reverse" style={{ gap: '2rem' }}>
          {repeatedPosters.map((poster, index) => (
            <Link to="/menu" key={index} className="shrink-0 block">
              <img 
                src={poster} 
                alt={`Special Combo Offer ${index}`} 
                className="w-[260px] h-[280px] object-contain rounded-xl shadow-sm hover:-translate-y-1 transition-transform duration-300"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HomePage() {
  return (
    <>
      <BurgerStory />
      <ComboOffersSection />
      <FriesChapter />
      <TopProductsMarquee />

      <section className="drinks-section">
        <div className="drinks-heading">
          <p className="eyebrow">After the spice · 02</p>
          <h2>
            Cool down
            <br />
            beautifully.
          </h2>
          <p>
            Faloodas, fruit-forward shakes and premium ice cream—stacked high
            and made for stealing the first sip.
          </p>
          <Link to="/menu">
            Meet the sweet side <Arrow />
          </Link>
        </div>
        <div className="drink-collage">
          <img
            className="drink berry-cup"
            src="/assets/berry-cup.png"
            alt="Strawberry berry cup"
          />
          <img
            className="drink juice-flow"
            src="/assets/e8479cbca7012eef7f340e125a75fa1d-removebg-preview.png"
            alt="Juice flowing dg"
          />
          <img
            className="drink pink-shake"
            src="/assets/strawberry-shake.png"
            alt="Strawberry cream shake"
          />
          <img
            className="drink purple-shake"
            src="/assets/blueberry-shake.png"
            alt="Blueberry cream shake"
          />
          <img className="drink-smoke" src="/assets/smoke.png" alt="" />
        </div>
      </section>

    </>
  )
}
