import { useEffect } from "react"
import { useForm, ValidationError } from "@formspree/react"
import { track } from "@vercel/analytics"

const FORMSPREE_FORM_ID = "xzdewnbq"

interface WaitlistPanelProps {
  open: boolean
  onClose: () => void
}

function WaitlistPanel({ open, onClose }: WaitlistPanelProps) {
  const [state, handleSubmit, reset] = useForm(FORMSPREE_FORM_ID)

  useEffect(() => {
    if (state.succeeded) {
      track("waitlist_signup")
    }
  }, [state.succeeded])

  function handleClose() {
    if (state.succeeded) {
      setTimeout(() => reset(), 300)
    }
    onClose()
  }

  return (
    <div
      data-blend-name="WaitlistPanel"
      className={`
        h-full bg-black rounded-2xl overflow-hidden
        transition-all duration-200 ease-out
        ${open ? "w-full md:w-[400px] opacity-100" : "w-0 opacity-0"}
      `}
    >
      <div
        className={`
          h-full w-full md:w-[400px] flex flex-col px-8 pt-12 pb-8
          transition-opacity duration-150
          ${open ? "opacity-100 delay-100" : "opacity-0"}
        `}
        style={{ fontFamily: 'Inter' }}
      >
        {/* Product description */}
        <div className="mb-auto">
          <p
            className="text-white mb-3"
            style={{
              fontSize: 'clamp(15px, 1.3vw, 13px)',
              fontWeight: 500,
              letterSpacing: '0.05em',
              lineHeight: 1.5
            }}
          >
            Projekt, built for design engineers.
          </p>
          <p
            className="text-gray-400 mb-4"
            style={{
              fontSize: 'clamp(14px, 1.1vw, 12px)',
              fontWeight: 300,
              letterSpacing: '0.02em',
              lineHeight: 1.6
            }}
          >
            The control of an IDE meets the craft of a design tool, built specifically for Claude Code.
          </p>
          <p
            className="text-gray-400 mb-4"
            style={{
              fontSize: 'clamp(14px, 1.1vw, 12px)',
              fontWeight: 300,
              letterSpacing: '0.02em',
              lineHeight: 1.6
            }}
          >
            The best part? It's BYOK, so no more wasting money paying for models you don't need.
          </p>
          <p
            className="text-gray-400"
            style={{
              fontSize: 'clamp(14px, 1.1vw, 12px)',
              fontWeight: 300,
              letterSpacing: '0.02em',
              lineHeight: 1.6
            }}
          >
            Manage files, see live previews, launch agents, and refine every detail in one seamless experience.
          </p>
        </div>

        {/* Form header */}
        <div className="text-center mb-8">
          <h2
            className="text-white mb-2"
            style={{
              fontSize: 'clamp(10px, 1.4vw, 14px)',
              fontWeight: 400,
              letterSpacing: '0.3em',
              textTransform: 'uppercase'
            }}
          >
            {state.succeeded ? "You're on the list" : "Join the Waitlist"}
          </h2>
          <p
            className="text-gray-500"
            style={{
              fontSize: 'clamp(10px, 1.2vw, 12px)',
              letterSpacing: '0.1em'
            }}
          >
            {state.succeeded
              ? "We'll notify you when Projekt launches."
              : "Be the first to know when Projekt launches."}
          </p>
        </div>

        {!state.succeeded ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email address"
                required
                className="w-full bg-transparent border-b border-[#333] text-white placeholder:text-gray-500 py-3 focus:outline-none focus:border-white transition-colors"
                style={{ fontSize: 'clamp(10px, 1.2vw, 12px)', letterSpacing: '0.1em' }}
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="text-red-400 text-xs mt-2 tracking-wide"
              />
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="w-full py-4 md:py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 text-sm md:text-xs"
              style={{
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 400
              }}
            >
              {state.submitting ? "Joining..." : "Join Waitlist"}
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="w-full text-gray-600 hover:text-white py-2 transition-colors md:hidden"
              style={{
                fontSize: '10px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase'
              }}
            >
              Cancel
            </button>
          </form>
        ) : (
          <button
            onClick={handleClose}
            className="w-full py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 md:hidden"
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 400
            }}
          >
            Done
          </button>
        )}

      </div>
    </div>
  )
}

export { WaitlistPanel }
