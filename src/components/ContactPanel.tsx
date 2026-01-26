import { useEffect, useState } from "react"
import { useForm } from "@formspree/react"
import { track } from "@vercel/analytics"
import { FORMSPREE_CONTACT_FORM_ID } from "@/lib/constants"

interface ContactPanelProps {
  onClose: () => void
}

function ContactPanel({ onClose }: ContactPanelProps) {
  const [state, handleSubmit, reset] = useForm(FORMSPREE_CONTACT_FORM_ID)
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (state.succeeded) {
      track("contact_form_submit")
    }
  }, [state.succeeded])

  function handleClose() {
    if (state.succeeded) {
      setTimeout(() => {
        reset()
        setEmail("")
        setMessage("")
      }, 300)
    }
    onClose()
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleSubmit(e)
  }

  return (
    <aside
      data-blend-name="ContactPanel"
      aria-label="Contact form"
      className="absolute inset-0 bg-white/[0.08] backdrop-blur-xl rounded-2xl overflow-hidden"
    >
      <div className="h-full w-full flex flex-col justify-end px-8 pt-12 pb-8 font-['Inter']">
        {/* Form */}
        {!state.succeeded ? (
          <form onSubmit={handleFormSubmit} className="space-y-6 animate-fade-in-up animate-delay-400">
            <div>
              <label htmlFor="contact-email" className="sr-only">
                Email address
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                autoComplete="email"
                className="w-full bg-transparent border-b border-white/20 text-white placeholder:text-white/40 py-3 focus:outline-none focus:border-white/50 transition-colors text-base"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="sr-only">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Say what you gotta say ..."
                required
                rows={4}
                className="w-full bg-transparent border-b border-white/20 text-white placeholder:text-white/40 py-3 focus:outline-none focus:border-white/50 transition-colors resize-none text-base"
              />
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="w-full py-4 border border-white/50 text-white hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 text-sm text-form-button focus-visible:focus-ring"
            >
              {state.submitting ? "Sending..." : "Send"}
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="w-full text-white/40 hover:text-white py-2 transition-colors text-form-cancel focus-visible:focus-ring"
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="animate-fade-in-up animate-delay-400">
            <div className="text-center mb-8">
              <p className="text-white/80 text-form-heading">You said it!</p>
            </div>
            <button
              onClick={handleClose}
              className="w-full py-4 border border-white/50 text-white hover:bg-white hover:text-black transition-all duration-300 text-form-done focus-visible:focus-ring"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}

export { ContactPanel }
