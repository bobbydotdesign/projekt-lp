import { useState, useEffect, useCallback, useRef } from "react"
import { WaitlistForm } from "@/components/WaitlistForm"
import { DesignLogo } from "@/components/DesignLogo"
import { CommitMessageBox } from "@/components/CommitMessageBox"
import { FloatingCursor } from "@/components/FloatingCursor"
import { MobileWaitlistButton } from "@/components/MobileWaitlistButton"
import { MobileContactButton } from "@/components/MobileContactButton"
import { ContactPopover } from "@/components/ContactPopover"
import { ContactPanel } from "@/components/ContactPanel"
import { RoadmapContent } from "@/components/RoadmapContent"
import { BREAKPOINTS } from "@/lib/constants"
import type { CursorVariant, MousePosition } from "@/types"

const getIsDesktop = () =>
  typeof window !== 'undefined' && window.matchMedia(`(min-width: ${BREAKPOINTS.MD}px)`).matches

function App() {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 })
  const [showCursor, setShowCursor] = useState(false)
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('waitlist')
  const [isDesktop, setIsDesktop] = useState(getIsDesktop)
  const [waitlistOpen, setWaitlistOpen] = useState(getIsDesktop)
  const [contactOpen, setContactOpen] = useState(false)
  const [roadmapOpen, setRoadmapOpen] = useState(false)

  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const checkDesktop = () => {
      const desktop = getIsDesktop()
      setIsDesktop(desktop)
      if (desktop) {
        setWaitlistOpen(true)
      }
    }
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    animationFrameRef.current = requestAnimationFrame(() => {
      setMousePos({ x: e.clientX, y: e.clientY })
      setShowCursor(true)
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setShowCursor(false)
    setCursorVariant('waitlist')
  }, [])

  const handleContactMouseEnter = useCallback(() => {
    setCursorVariant('email')
  }, [])

  const handleContactMouseLeave = useCallback(() => {
    setCursorVariant('waitlist')
  }, [])

  const handleOpenWaitlist = useCallback(() => {
    setWaitlistOpen(true)
  }, [])

  const handleCloseWaitlist = useCallback(() => {
    if (!isDesktop) {
      setWaitlistOpen(false)
    }
  }, [isDesktop])

  const handleOpenContact = useCallback(() => {
    setContactOpen(true)
  }, [])

  const handleCloseContact = useCallback(() => {
    setContactOpen(false)
  }, [])

  const handleOpenRoadmap = useCallback(() => {
    setRoadmapOpen(true)
  }, [])

  const handleCloseRoadmap = useCallback(() => {
    setRoadmapOpen(false)
  }, [])

  const handleRoadmapMouseEnter = useCallback(() => {
    setCursorVariant('roadmap')
  }, [])

  const handleRoadmapMouseLeave = useCallback(() => {
    setCursorVariant('waitlist')
  }, [])

  return (
    <div className="h-full bg-black overflow-hidden">
      {showCursor && !roadmapOpen && <FloatingCursor position={mousePos} variant={cursorVariant} />}

      {/* Mobile buttons - outside sliding container for proper fixed positioning */}
      {!waitlistOpen && !contactOpen && !roadmapOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <MobileContactButton onClick={handleOpenContact} />
            <button
              onClick={handleOpenRoadmap}
              className="text-contact text-white/40 hover:text-white transition-colors"
            >
              Roadmap
            </button>
          </div>
          <MobileWaitlistButton onClick={handleOpenWaitlist} />
        </div>
      )}

      {/* Sliding container - holds both landing and roadmap */}
      <div
        className="transition-transform duration-700 ease-out"
        style={{
          height: "200%",
          transform: roadmapOpen ? "translateY(-50%)" : "translateY(0)",
        }}
      >
        {/* Landing Page Section */}
        <section className="h-1/2 p-3 md:p-5">
          <div className={`w-full h-full flex transition-all duration-200 ${waitlistOpen ? 'md:gap-4' : 'gap-0'}`}>
            <main
              data-blend-name="LandingPageContainer"
              className={`relative flex-1 h-full bg-gray-800 rounded-2xl overflow-hidden transition-all duration-200 animate-fade-in cursor-hidden bg-cover bg-center safari-radius-fix ${waitlistOpen ? 'hidden md:block' : ''}`}
              style={{
                backgroundImage: 'url("/images/background-2fafc0.png")'
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <header className="absolute top-28 left-0 right-0 flex justify-center md:hidden animate-fade-in-up">
                <span className="text-white text-logo-mobile">
                  Projekt
                </span>
              </header>

              <div className="absolute inset-0 flex flex-col items-center justify-center -mt-[15%] md:-mt-[20%]">
                <div className="mb-4 animate-fade-in-up animate-delay-100">
                  <CommitMessageBox />
                </div>
                <div className="animate-fade-in-up animate-delay-200">
                  <DesignLogo />
                </div>
              </div>

              <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 items-center gap-6">
                <ContactPopover
                  onMouseEnter={handleContactMouseEnter}
                  onMouseLeave={handleContactMouseLeave}
                />
                <span className="text-white/20">|</span>
                <button
                  onClick={handleOpenRoadmap}
                  onMouseEnter={handleRoadmapMouseEnter}
                  onMouseLeave={handleRoadmapMouseLeave}
                  className="text-contact text-white/40 hover:text-white transition-colors"
                >
                  Roadmap
                </button>
              </div>
            </main>

            {(isDesktop || waitlistOpen) && (
              <WaitlistForm open={waitlistOpen} onClose={handleCloseWaitlist} />
            )}
          </div>

          {!isDesktop && contactOpen && (
            <div className="absolute inset-0 p-2 z-50 md:hidden">
              <ContactPanel onClose={handleCloseContact} />
            </div>
          )}
        </section>

        {/* Roadmap Section */}
        <section className="h-1/2 p-3 md:p-5">
          <div className="h-full rounded-2xl overflow-hidden relative">
            <RoadmapContent onClose={handleCloseRoadmap} isOpen={roadmapOpen} />
            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
