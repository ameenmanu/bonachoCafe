import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let currentProgress = 0
    let targetProgress = 0

    // Simulate loading progress
    const updateProgress = () => {
      // If window is loaded, jump to 100
      if (document.readyState === "complete" && targetProgress < 100) {
        targetProgress = 100
      } else if (targetProgress < 90) {
        // Otherwise slowly approach 90%
        targetProgress += Math.random() * 15
        if (targetProgress > 90) targetProgress = 90
      }

      // Ease current progress towards target
      currentProgress += (targetProgress - currentProgress) * 0.1
      setProgress(Math.round(currentProgress))

      if (currentProgress >= 99.9) {
        setProgress(100)
        setTimeout(() => setIsLoaded(true), 500)
      } else {
        requestAnimationFrame(updateProgress)
      }
    }

    // Start progress
    requestAnimationFrame(updateProgress)

    // Ensure it eventually completes even if 'load' event doesn't fire nicely
    const fallbackTimer = setTimeout(() => {
      targetProgress = 100
    }, 5000)

    const handleLoad = () => {
      targetProgress = 100
    }

    if (document.readyState === "complete") {
      targetProgress = 100
    } else {
      window.addEventListener("load", handleLoad)
    }

    return () => {
      window.removeEventListener("load", handleLoad)
      clearTimeout(fallbackTimer)
    }
  }, [])

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            backgroundColor: "#000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#FAF8F5",
          }}
        >
          <div style={{ overflow: "hidden", marginBottom: "2rem" }}>
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                fontFamily: '"Fraunces", serif',
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 800,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Banacho
            </motion.h1>
          </div>

          <div style={{ width: "200px", height: "2px", backgroundColor: "rgba(255,255,255,0.2)", position: "relative", overflow: "hidden", borderRadius: "2px" }}>
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                backgroundColor: "#FAF8F5",
                width: `${progress}%`,
              }}
            />
          </div>
          
          <motion.div 
            style={{ 
              marginTop: "1rem", 
              fontFamily: '"DM Sans", sans-serif', 
              fontSize: "0.9rem",
              letterSpacing: "0.1em",
              opacity: 0.6
            }}
          >
            {progress}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
