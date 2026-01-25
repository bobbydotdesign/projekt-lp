import { useForm, ValidationError } from "@formspree/react"

const FORMSPREE_FORM_ID = "xzdewnbq"

interface WaitlistPanelProps {
  open: boolean
  onClose: () => void
}

function WaitlistPanel({ open, onClose }: WaitlistPanelProps) {
  const [state, handleSubmit, reset] = useForm(FORMSPREE_FORM_ID)

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
        transition-all duration-500 ease-out
        ${open ? "w-[400px] opacity-100" : "w-0 opacity-0"}
      `}
    >
      <div
        className={`
          h-full w-[400px] flex flex-col justify-center px-8
          transition-opacity duration-300
          ${open ? "opacity-100 delay-200" : "opacity-0"}
        `}
        style={{ fontFamily: 'Inter' }}
      >
        <div className="text-center mb-10">
          <h2
            className="text-white mb-4"
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
              className="w-full py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50"
              style={{
                fontSize: '11px',
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
              className="w-full text-gray-600 hover:text-white py-2 transition-colors"
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
            className="w-full py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300"
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
