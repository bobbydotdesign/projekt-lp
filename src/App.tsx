import { useState, useEffect } from "react"
import { WaitlistPanel } from "@/components/WaitlistForm"

function DesignLogo() {
  return (
    <div data-blend-name="LogoSection" className="flex flex-col items-center justify-center">
      {/* Brand Text with logo in between */}
      <div
        data-blend-name="BrandText"
        className="text-white flex flex-col items-center justify-center"
        style={{
          fontFamily: 'Inter',
          fontSize: 'clamp(12px, 1.8vw, 18px)',
          fontWeight: 400,
          letterSpacing: '2em',
          textTransform: 'uppercase',
          gap: '3rem'
        }}
      >
        <div style={{ textAlign: 'center', textIndent: '2em' }} className="relative inline-block">
          DESIGN
          <div className="absolute border border-[#00BFFF] rounded pointer-events-none" style={{ top: '-6px', bottom: '-6px', left: '1.5em', right: '1.5em' }} />
        </div>
        <div data-blend-name="Logo" className="w-20 h-14 flex-shrink-0">
          <img src="/images/logo.svg" alt="Logo" className="w-full h-full" />
        </div>
        <div style={{ textAlign: 'center', textIndent: '2em' }}>ENGINEERED</div>
      </div>
    </div>
  )
}

function CommitMessageBox() {
  return (
    <div data-blend-name="CommitBox" className="bg-[#212121] rounded-2xl px-[21px] py-[18px] flex items-center justify-between w-[220px] h-[39px]">
      <div className="flex items-center gap-3">
        <span className="text-white font-semibold text-xs">H1</span>
        <div className="flex items-center">
          <div className="w-[1px] h-[14px] bg-white blinking-line"></div>
          <span className="text-white text-xs">Describe changes ...</span>
        </div>
      </div>
      <img src="/images/arrow-square-right.svg" alt="Square Arrow" className="w-4 h-4" />
    </div>
  )
}

function FloatingCursor({ x, y, variant = 'waitlist' }: { x: number; y: number; variant?: 'waitlist' | 'email' }) {
  return (
    <div
      className="fixed pointer-events-none z-50 hidden md:block"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div
        className="bg-black/70 backdrop-blur-sm text-white text-xs px-[21px] py-[18px] rounded-2xl flex items-center gap-2.5 whitespace-nowrap h-[39px] transition-[width] duration-300 ease-out"
        style={{
          width: variant === 'email' ? '90px' : '185px'
        }}
      >
        <span>
          {variant === 'email' ? 'Email' : 'Join Projekt Waitlist'}
        </span>
        <img
          src="/images/arrow-narrow-right.svg"
          alt="Arrow"
          className="w-4 h-4 transition-transform duration-300 ease-out"
          style={{
            transform: variant === 'email' ? 'rotate(-45deg)' : 'rotate(0deg)'
          }}
        />
      </div>
    </div>
  )
}

function MobileWaitlistButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden bg-black/70 backdrop-blur-sm text-white text-xs px-[21px] py-[18px] rounded-2xl flex items-center gap-2.5 whitespace-nowrap h-[39px]"
    >
      <span>Join Projekt Waitlist</span>
      <img src="/images/arrow-narrow-right.svg" alt="Arrow" className="w-4 h-4" />
    </button>
  )
}

// Check if desktop at load time
const getIsDesktop = () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [showCursor, setShowCursor] = useState(false)
  const [cursorVariant, setCursorVariant] = useState<'waitlist' | 'email'>('waitlist')
  const [isDesktop, setIsDesktop] = useState(getIsDesktop)
  const [waitlistOpen, setWaitlistOpen] = useState(getIsDesktop)

  // Handle window resize
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

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
    setShowCursor(true)
  }

  const handleMouseLeave = () => {
    setShowCursor(false)
    setCursorVariant('waitlist')
  }

  return (
    <div className="h-full bg-black p-2 md:p-4 overflow-hidden">
      {/* Floating cursor that follows mouse - desktop only */}
      {showCursor && <FloatingCursor x={mousePos.x} y={mousePos.y} variant={cursorVariant} />}

      {/* Fixed bottom button - mobile only */}
      {!waitlistOpen && <MobileWaitlistButton onClick={() => setWaitlistOpen(true)} />}

      <div className={`w-full h-[calc(100vh-16px)] md:h-[calc(100vh-32px)] flex transition-all duration-200 ${waitlistOpen ? 'md:gap-4' : 'gap-0'}`}>
        {/* Main Landing Page */}
        <div
          data-blend-name="LandingPageContainer"
          className={`relative flex-1 h-full bg-gray-800 rounded-2xl overflow-hidden transition-all duration-200 ${waitlistOpen ? 'hidden md:block' : ''}`}
          style={{
            backgroundImage: 'url("/images/background-2fafc0.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            cursor: 'none'
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Mobile header - Projekt name */}
          <div className="absolute top-20 left-0 right-0 flex justify-center md:hidden">
            <span
              className="text-white"
              style={{
                fontFamily: 'Inter',
                fontSize: '12px',
                fontWeight: 400,
                letterSpacing: '0.3em',
                textTransform: 'uppercase'
              }}
            >
              Projekt
            </span>
          </div>

          {/* Main Content Area - centered */}
          <div className="absolute inset-0 flex flex-col items-center justify-center md:-mt-[20%]">
            <div className="mb-4">
              <CommitMessageBox />
            </div>
            <DesignLogo />
          </div>

          {/* Contact Link */}
          <a
            href="mailto:bobby@getprojekt.com"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors"
            style={{
              fontFamily: 'Inter',
              fontSize: '10px',
              fontWeight: 400,
              letterSpacing: '0.3em',
              textTransform: 'uppercase'
            }}
            onMouseEnter={() => setCursorVariant('email')}
            onMouseLeave={() => setCursorVariant('waitlist')}
          >
            Communicate
          </a>
        </div>

        {/* Waitlist Panel */}
        <WaitlistPanel open={waitlistOpen} onClose={() => !isDesktop && setWaitlistOpen(false)} />
      </div>
    </div>
  )
}

export default App
