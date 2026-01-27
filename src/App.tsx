import { useState, useEffect, useCallback, useRef } from "react"
import { WaitlistForm } from "@/components/WaitlistForm"
import { DesignLogo } from "@/components/DesignLogo"
import { CommitMessageBox } from "@/components/CommitMessageBox"
import { FloatingCursor } from "@/components/FloatingCursor"
import { MobileWaitlistButton } from "@/components/MobileWaitlistButton"
import { MobileContactButton } from "@/components/MobileContactButton"
import { ContactPopover } from "@/components/ContactPopover"
import { ContactPanel } from "@/components/ContactPanel"
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

  return (
    <div className="h-full bg-black p-2 md:p-4 overflow-hidden">
      {showCursor && <FloatingCursor position={mousePos} variant={cursorVariant} />}

      {!waitlistOpen && !contactOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden flex flex-col items-center gap-6">
          <MobileContactButton onClick={handleOpenContact} />
          <MobileWaitlistButton onClick={handleOpenWaitlist} />
        </div>
      )}

      <div className={`w-full h-[calc(100vh-16px)] md:h-[calc(100vh-32px)] flex transition-all duration-200 ${waitlistOpen ? 'md:gap-4' : 'gap-0'}`}>
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

          <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2">
            <ContactPopover
              onMouseEnter={handleContactMouseEnter}
              onMouseLeave={handleContactMouseLeave}
            />
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
    </div>
  )
}

export default App
