import { useEffect, useRef } from "react"
import { Outlet, useLocation, NavLink, useNavigate } from "react-router"
import { AnimatePresence, motion } from "framer-motion"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Navbar } from "../components/Navbar"
import Preloader from "../components/Preloader"
const navItems = [
  {
    label: "Home",
    to: "/",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/></svg>
  },
  { 
    label: "Menu", 
    to: "/menu", 
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
  },
  { 
    label: "Contact", 
    to: "/contact", 
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  },
  { 
    label: "Reviews", 
    to: "/reviews", 
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  },
  { 
    label: "About", 
    to: "/about", 
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
  },
]

export function SiteLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const lenisRef = useRef<Lenis | null>(null)
  const initialPathnameRef = useRef(location.pathname)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08 }) // lower = smoother/slower
    lenisRef.current = lenis
    const scrollToTop = () => lenis.scrollTo(0, { duration: 0.9 })
    window.addEventListener("site-scroll-to-top", scrollToTop)
    lenis.on("scroll", ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener("site-scroll-to-top", scrollToTop)
      lenisRef.current = null
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined
    if (navigation?.type === "reload" && initialPathnameRef.current !== "/") {
      navigate("/", { replace: true })
    }
  }, [navigate])

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true })
    requestAnimationFrame(() => {
      requestAnimationFrame(() => ScrollTrigger.refresh())
    })
  }, [location.pathname, navigate])

  return (
    <div className="site-shell">
      <Preloader />
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <footer className="home-footer">
        <div className="footer-main">
          <div className="footer-title-wrap">
            <div className="footer-title-text">
              <p className="eyebrow text-lime">Come hungry.</p>
              <h2>
                Stay for the
                <br />
                good mood.
              </h2>
            </div>
            <img src="/assets/logo1.png" alt="Banacho Logo" className="footer-logo" />
          </div>
          <div className="footer-details">
            <div className="footer-col">
              <h4>Contact</h4>
              <a href="mailto:hello@banachocafe.com">hello@banachocafe.com</a>
              <a href="tel:+919876543210">+91 987 654 3210</a>
            </div>
            <div className="footer-col">
              <h4>Socials</h4>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
            </div>
            <div className="footer-col">
              <h4>Location</h4>
              <p>
                Basement Floor, SJ Arcade,<br />
                Bypass Road, Ponniakurussi,<br />
                Perinthalmanna, Kerala
              </p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Banacho Cafe · Perinthalmanna</span>
          <span>© {new Date().getFullYear()} Banacho Cafe</span>
        </div>
      </footer>

      <nav className="bottom-nav" aria-label="Main navigation">
        {navItems.map(({ label, to, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span className="nav-icon">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
