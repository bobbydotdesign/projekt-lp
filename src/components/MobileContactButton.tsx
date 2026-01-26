interface MobileContactButtonProps {
  onClick: () => void
}

function MobileContactButton({ onClick }: MobileContactButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-white/60 hover:text-white transition-colors text-contact focus-visible:focus-ring rounded"
    >
      Communicate
    </button>
  )
}

export { MobileContactButton }
