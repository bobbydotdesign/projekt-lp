import type { CursorVariant, MousePosition } from '@/types'

interface FloatingCursorProps {
  position: MousePosition
  variant?: CursorVariant
}

function FloatingCursor({ position, variant = 'waitlist' }: FloatingCursorProps) {
  return (
    <div
      className="fixed pointer-events-none z-50 hidden md:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
      aria-hidden="true"
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
          alt=""
          className="w-4 h-4 transition-transform duration-300 ease-out"
          style={{
            transform: variant === 'email' ? 'rotate(-45deg)' : 'rotate(0deg)'
          }}
        />
      </div>
    </div>
  )
}

export { FloatingCursor }
