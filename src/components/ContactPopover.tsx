import { useState } from "react"
import { useForm } from "@formspree/react"
import { track } from "@vercel/analytics"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FORMSPREE_CONTACT_FORM_ID } from "@/lib/constants"

interface ContactPopoverProps {
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

function ContactPopover({ onMouseEnter, onMouseLeave }: ContactPopoverProps) {
  const [open, setOpen] = useState(false)
  const [state, handleSubmit, reset] = useForm(FORMSPREE_CONTACT_FORM_ID)
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleSubmit(e)
    if (!state.errors) {
      track("contact_form_submit")
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen && state.succeeded) {
      setTimeout(() => {
        reset()
        setEmail("")
        setMessage("")
      }, 300)
    }
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          className="hidden sm:inline text-white/60 hover:text-white transition-colors animate-fade-in animate-delay-400 text-contact focus-visible:focus-ring rounded"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          Communicate
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        sideOffset={16}
        className="w-72 p-0 border-0 bg-white/[0.08] backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden"
      >
        <form onSubmit={handleFormSubmit} className="p-4">
          {!state.succeeded ? (
            <>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                autoComplete="email"
                className="w-full bg-transparent border-b border-white/20 text-white placeholder:text-white/40 py-2 mb-3 focus:outline-none focus:border-white/50 transition-colors text-xs tracking-wide"
              />
              <div className="relative">
                <textarea
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Say what you gotta say ..."
                  required
                  rows={3}
                  className="w-full bg-transparent text-white placeholder:text-white/40 py-2 pr-10 focus:outline-none resize-none text-xs tracking-wide leading-relaxed"
                />
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="absolute bottom-2 right-0 text-white/60 hover:text-white transition-colors disabled:opacity-30 focus-visible:focus-ring rounded"
                  aria-label="Send message"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <div className="py-4 text-center">
              <p className="text-white/80 text-xs tracking-wide">
                You said it!
              </p>
            </div>
          )}
        </form>
      </PopoverContent>
    </Popover>
  )
}

export { ContactPopover }
