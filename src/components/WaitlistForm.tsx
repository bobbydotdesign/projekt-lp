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
      className={`h-full overflow-hidden rounded-2xl bg-black transition-all duration-200 ease-out ${open ? "w-full opacity-100 md:w-[360px]" : "w-0 opacity-0"} `}
    >
      <div
        className={`flex h-full w-full flex-col px-8 pb-8 pt-12 font-['Inter'] transition-opacity duration-150 md:w-[360px] ${open ? "opacity-100 delay-100" : "opacity-0"} `}
      >
        <div className="animate-fade-in-up animate-delay-200 mb-auto">
          <h1 className="mb-3 text-sm font-normal text-white">
            Projekt, built for designers who engineer.
          </h1>
          <p className="text-panel-body mb-4 text-gray-400">
            The control and speed of a terminal meets the craft of a design
            tool, built specifically for Claude Code.
          </p>
          <p className="text-panel-body mb-4 text-gray-400">
            Projekt is BYOK. Use your existing Claude or Opencode subscription,
            no paying for models you don't need.
          </p>
          <p className="text-panel-body text-gray-400">
            Manage files, see live previews, launch agents, and refine every
            detail in one seamless experience.
          </p>
        </div>

        <div className="animate-fade-in-up animate-delay-300 mb-8 text-left">
          <h2 className="text-form-heading mb-2 h-[21px] text-white">
            {state.succeeded ? "You're on the list" : "Join the Waitlist"}
          </h2>
          <p className="text-panel-body text-gray-400">
            {state.succeeded
              ? "We'll notify you when Projekt launches."
              : "Be the first to know when Projekt launches."}
          </p>
        </div>

        {!state.succeeded ? (
          <form
            onSubmit={handleSubmit}
            className="animate-fade-in-up animate-delay-400 space-y-6"
          >
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
                className="text-form-input w-full border-b border-[#333] bg-transparent py-3 text-white transition-colors placeholder:text-gray-500 focus:border-white focus:outline-none"
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="mt-2 text-xs tracking-wide text-red-400"
                role="alert"
              />
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="text-form-button focus-visible:focus-ring w-full border border-white py-4 text-sm text-white transition-all duration-300 hover:bg-white hover:text-black disabled:opacity-50 md:py-3 md:text-xs"
            >
              {state.submitting ? "Joining..." : "Join Waitlist"}
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="text-form-cancel focus-visible:focus-ring w-full py-2 text-gray-600 transition-colors hover:text-white md:hidden"
            >
              Cancel
            </button>
          </form>
        ) : (
          <button
            onClick={handleClose}
            className="animate-fade-in-up animate-delay-400 text-form-done focus-visible:focus-ring w-full border border-white py-3 text-white transition-all duration-300 hover:bg-white hover:text-black md:hidden"
          >
            Done
          </button>
        )}
      </div>
    </aside>
  )
}

export { WaitlistForm }
