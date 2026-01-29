import type { CursorVariant, MousePosition } from '@/types'
import { buttonStyles } from '@/lib/styles'
import {
  BUTTON_HEIGHT,
  BUTTON_PADDING_X,
  BUTTON_PADDING_Y,
  CURSOR_WIDTH_EMAIL,
  CURSOR_WIDTH_WAITLIST,
  CURSOR_WIDTH_ROADMAP,
} from '@/lib/constants'

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
        className={`${buttonStyles.pill} transition-[width] duration-300 ease-out`}
        style={{
          paddingLeft: BUTTON_PADDING_X,
          paddingRight: BUTTON_PADDING_X,
          paddingTop: BUTTON_PADDING_Y,
          paddingBottom: BUTTON_PADDING_Y,
          height: BUTTON_HEIGHT,
          width: variant === 'email'
            ? CURSOR_WIDTH_EMAIL
            : variant === 'roadmap'
              ? CURSOR_WIDTH_ROADMAP
              : CURSOR_WIDTH_WAITLIST
        }}
      >
        <span>
          {variant === 'email' ? 'Email' : variant === 'roadmap' ? 'See Roadmap' : 'Join Projekt Waitlist'}
        </span>
        <img
          src="/images/arrow-narrow-right.svg"
          alt=""
          className="w-4 h-4 transition-transform duration-300 ease-out"
          style={{
            transform: variant === 'email'
              ? 'rotate(-45deg)'
              : variant === 'roadmap'
                ? 'rotate(90deg)'
                : 'rotate(0deg)'
          }}
        />
      </div>
    </div>
  )
}

export { FloatingCursor }
