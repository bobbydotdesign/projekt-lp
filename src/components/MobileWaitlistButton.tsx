interface MobileWaitlistButtonProps {
  onClick: () => void
}

function MobileWaitlistButton({ onClick }: MobileWaitlistButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Open Projekt waitlist signup form"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden bg-black/70 backdrop-blur-sm text-white text-xs px-[21px] py-[18px] rounded-2xl flex items-center gap-2.5 whitespace-nowrap h-[39px] focus-visible:focus-ring"
    >
      <span>Join Projekt Waitlist</span>
      <img src="/images/arrow-narrow-right.svg" alt="" className="w-4 h-4" aria-hidden="true" />
    </button>
  )
}

export { MobileWaitlistButton }
