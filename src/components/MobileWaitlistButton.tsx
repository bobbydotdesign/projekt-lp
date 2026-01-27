import { buttonStyles } from '@/lib/styles'
import { BUTTON_HEIGHT, BUTTON_PADDING_X, BUTTON_PADDING_Y } from '@/lib/constants'

interface MobileWaitlistButtonProps {
  onClick: () => void
}

function MobileWaitlistButton({ onClick }: MobileWaitlistButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Open Projekt waitlist signup form"
      className={`${buttonStyles.pill} focus-visible:focus-ring`}
      style={{
        paddingLeft: BUTTON_PADDING_X,
        paddingRight: BUTTON_PADDING_X,
        paddingTop: BUTTON_PADDING_Y,
        paddingBottom: BUTTON_PADDING_Y,
        height: BUTTON_HEIGHT,
      }}
    >
      <span>Join Projekt Waitlist</span>
      <img src="/images/arrow-narrow-right.svg" alt="" className="w-4 h-4" aria-hidden="true" />
    </button>
  )
}

export { MobileWaitlistButton }
