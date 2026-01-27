import { useEffect } from "react"
import { useForm, ValidationError } from "@formspree/react"
import { track } from "@vercel/analytics"
import { FORMSPREE_FORM_ID, FORM_RESET_DELAY_MS } from "@/lib/constants"

interface WaitlistFormProps {
  open: boolean
  onClose: () => void
}

function WaitlistForm({ open, onClose }: WaitlistFormProps) {
  const [state, handleSubmit, reset] = useForm(FORMSPREE_FORM_ID)

  useEffect(() => {
    if (state.succeeded) {
      track("waitlist_signup")
    }
  }, [state.succeeded])

  function handleClose() {
    if (state.succeeded) {
      setTimeout(() => reset(), FORM_RESET_DELAY_MS)
    }
    onClose()
  }

  return (
    <aside
      data-blend-name="WaitlistForm"
      aria-label="Waitlist signup"
      className={`
        h-full bg-black rounded-2xl overflow-hidden
        transition-all duration-200 ease-out
        ${open ? "w-full md:w-[360px] opacity-100" : "w-0 opacity-0"}
      `}
    >
      <div
        className={`
          h-full w-full md:w-[360px] flex flex-col px-8 pt-12 pb-8 font-['Inter']
          transition-opacity duration-150
          ${open ? "opacity-100 delay-100" : "opacity-0"}
        `}
      >
        <div className="mb-auto animate-fade-in-up animate-delay-200">
          <h1 className="text-white text-sm mb-3 font-normal">
            Projekt, built for designers who engineer.
          </h1>
          <p className="text-gray-400 text-panel-body mb-4">
            The control and speed of a terminal meets the craft of a design tool, built specifically for Claude Code, with more soon.
          </p>
          <p className="text-gray-400 text-panel-body mb-4">
            The best part? It's BYOK, so no more wasting money paying for models you don't need.
          </p>
          <p className="text-gray-400 text-panel-body">
            Manage files, see live previews, launch agents, and refine every detail in one seamless experience.
          </p>
        </div>

        <div className="text-left mb-8 animate-fade-in-up animate-delay-300">
          <h2 className="text-white text-form-heading mb-2 h-[21px]">
            {state.succeeded ? "You're on the list" : "Join the Waitlist"}
          </h2>
          <p className="text-gray-400 text-panel-body">
            {state.succeeded
              ? "We'll notify you when Projekt launches."
              : "Be the first to know when Projekt launches."}
          </p>
        </div>

        {!state.succeeded ? (
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up animate-delay-400">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email address"
                required
                autoComplete="email"
                className="w-full bg-transparent border-b border-[#333] text-white placeholder:text-gray-500 py-3 focus:outline-none focus:border-white transition-colors text-form-input"
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="text-red-400 text-xs mt-2 tracking-wide"
                role="alert"
              />
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="w-full py-4 md:py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 text-sm md:text-xs text-form-button focus-visible:focus-ring"
            >
              {state.submitting ? "Joining..." : "Join Waitlist"}
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="w-full text-gray-600 hover:text-white py-2 transition-colors md:hidden text-form-cancel focus-visible:focus-ring"
            >
              Cancel
            </button>
          </form>
        ) : (
          <button
            onClick={handleClose}
            className="w-full py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 md:hidden animate-fade-in-up animate-delay-400 text-form-done focus-visible:focus-ring"
          >
            Done
          </button>
        )}
      </div>
    </aside>
  )
}

export { WaitlistForm }
