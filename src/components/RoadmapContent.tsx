import { useRef, useEffect, useCallback, useState } from "react"
import { ChevronUp, Check } from "lucide-react"

interface RoadmapContentProps {
  onClose: () => void
  isOpen: boolean
}

interface RoadmapItem {
  title: string
  description?: string
  completed: boolean
}

interface RoadmapSection {
  id: string
  title: string
  items: RoadmapItem[]
}

interface Tenet {
  title: string
  description: string
}

const tenets: Tenet[] = [
  {
    title: "The evolution, not a compromise",
    description: "This is what design tools become in the era of AI. Not a hybrid, not a bridge, how prompt engineering as it should have always been.",
  },
  {
    title: "Production-ready is the only output",
    description: "Nothing we produce should need translation to be real. If it's in the tool, it ships. No throwaway prototypes.",
  },
  {
    title: "Zero to building in seconds",
    description: "No setup screens, no stack decisions, no naming required. The first experience should feel like magic, not screens of setup.",
  },
  {
    title: "Prompt-first, GUI-always",
    description: "Everything starts with a prompt. But every element is inspectable, selectable, and editable via direct manipulation.",
  },
  {
    title: "Speed is a feature",
    description: "Responsiveness isn't polish, it's core. Fast feedback loops keep users in flow. Milliseconds compound into feeling.",
  },
  {
    title: "Opinionated defaults, portable outputs",
    description: "Strong stack opinion to start, but code translates cleanly to any framework. No vendor lock-in through code.",
  },
]

const roadmapData: RoadmapSection[] = [
  {
    id: "in-progress",
    title: "In Progress",
    items: [
      { title: "Pages dropdown fix", description: "Resolving URL bar page selector issues", completed: false },
      { title: "Auth flow", description: "Login and signup with Supabase", completed: false },
      { title: "License validation", description: "Alpha access gating for early users", completed: false },
    ],
  },
  {
    id: "whats-next",
    title: "What's Next",
    items: [
      { title: "Settings sync", description: "Cloud-synced preferences across devices", completed: false },
      { title: "Speed improvements", description: "Faster startup, snappier interactions, reduced latency everywhere", completed: false },
      { title: "Reliability hardening", description: "Edge case handling, graceful recovery, rock-solid stability", completed: false },
      { title: "Onboarding flow", description: "Guided first-run experience to get you building fast", completed: false },
      { title: "Tutorials & help", description: "In-app guidance, tips, and documentation", completed: false },
    ],
  },
  {
    id: "horizon",
    title: "On the Horizon",
    items: [
      { title: "Multi-project workspaces", description: "Work across multiple projects simultaneously", completed: false },
      { title: "Agent presets", description: "Pre-configured modes for code review, debugging, refactoring", completed: false },
      { title: "Multi-provider support", description: "OpenCode, Codex, and other AI coding assistants", completed: false },
      { title: "External browser selection", description: "Select elements in Chrome/Safari, not just the preview", completed: false },
      { title: "Claude-assisted debugging", description: "Auto-diagnose issues when things go wrong", completed: false },
      { title: "Local-first data", description: "SQLite storage that graduates to cloud when ready", completed: false },
      { title: "Local versioning", description: "Auto-snapshot, visual timeline, one-click restore", completed: false },
      { title: "Service integrations", description: "GitHub, Convex, Supabase, Firebase — connect when ready", completed: false },
      { title: "Preview sharing", description: "Share prototypes via local network or tunneling", completed: false },
      { title: "Terminal rendering polish", description: "Pixel-perfect accuracy and visual refinements", completed: false },
    ],
  },
  {
    id: "foundation",
    title: "Foundation",
    items: [
      { title: "3-panel resizable layout", completed: true },
      { title: "Terminal-first with xterm.js", completed: true },
      { title: "Full Claude Code compatibility", completed: true },
      { title: "Multi-agent tabs", completed: true },
      { title: "Tab renaming & reordering", completed: true },
      { title: "Real-time PTY streaming via Rust", completed: true },
      { title: "Monaco editor with syntax highlighting", completed: true },
      { title: "Cmd+K inline code editing", completed: true },
      { title: "File auto-refresh on changes", completed: true },
      { title: "Project file browser", completed: true },
      { title: "Native webview preview", completed: true },
      { title: "Viewport toggles (desktop/tablet/mobile)", completed: true },
      { title: "Live reload via Browser Sync", completed: true },
      { title: "Element selection in preview", completed: true },
      { title: "Navigator panel (Webflow-style DOM tree)", completed: true },
      { title: "Inline prompting on selected elements", completed: true },
      { title: "Pending changes system", completed: true },
      { title: "Framework-aware route detection", completed: true },
      { title: "Theme system (light/dark/system)", completed: true },
      { title: "Sound notifications", completed: true },
      { title: "Voice dictation with Web Speech API", completed: true },
      { title: "Settings & bug report dialogs", completed: true },
    ],
  },
]

const navItems = [
  { id: "tenets", label: "Tenets" },
  { id: "in-progress", label: "In Progress" },
  { id: "whats-next", label: "Next" },
  { id: "horizon", label: "Horizon" },
  { id: "foundation", label: "Foundation" },
]

function RoadmapContent({ onClose, isOpen }: RoadmapContentProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const sectionObserverRef = useRef<IntersectionObserver | null>(null)
  const [activeSection, setActiveSection] = useState<string>("tenets")

  const scrollToSection = (id: string) => {
    const container = scrollContainerRef.current
    const element = document.getElementById(id)
    if (container && element) {
      const elementTop = element.offsetTop
      const scrollMargin = 96 // matches scroll-mt-24 (24 * 4 = 96px)
      container.scrollTo({
        top: elementTop - scrollMargin,
        behavior: "smooth"
      })
    }
  }

  // Observer for tracking active section in nav
  const setupSectionObserver = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return

    if (sectionObserverRef.current) {
      sectionObserverRef.current.disconnect()
    }

    sectionObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        root: container,
        threshold: 0.3,
        rootMargin: "-20% 0px -60% 0px",
      }
    )

    const sectionIds = ["tenets", "in-progress", "whats-next", "horizon", "foundation"]
    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        sectionObserverRef.current?.observe(element)
      }
    })
  }, [])

  const setupObserver = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // Reset all elements to hidden state
    const revealElements = container.querySelectorAll(".reveal-on-scroll")
    revealElements.forEach((el) => {
      el.classList.remove("unveiled")
    })

    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("unveiled")
          }
        })
      },
      {
        root: container,
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      }
    )

    // Small delay to ensure elements are reset before observing
    setTimeout(() => {
      revealElements.forEach((el) => {
        observerRef.current?.observe(el)
      })
    }, 50)
  }, [])

  // Setup observers when roadmap opens
  useEffect(() => {
    if (isOpen) {
      // Delay to allow slide animation to start
      const timer = setTimeout(() => {
        setupObserver()
        setupSectionObserver()
      }, 100)
      return () => clearTimeout(timer)
    } else {
      // Reset when closing
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      if (sectionObserverRef.current) {
        sectionObserverRef.current.disconnect()
      }
      setActiveSection("tenets")

      // Reset scroll position when closing
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0
      }
    }
  }, [isOpen, setupObserver, setupSectionObserver])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      if (sectionObserverRef.current) {
        sectionObserverRef.current.disconnect()
      }
    }
  }, [])

  return (
    <div className="h-full bg-black text-white">
      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="h-full overflow-y-auto scroll-smooth"
      >
        {/* Close button at top */}
        <div className="flex justify-center py-6">
          <button
            onClick={onClose}
            className="p-3 text-gray-400 hover:text-white transition-colors"
            aria-label="Close roadmap"
          >
            <ChevronUp className="w-7 h-7" />
          </button>
        </div>

        <div className="flex">
          {/* Side nav - hidden on mobile, sticky */}
          <nav className="hidden md:block sticky top-4 h-fit ml-4 pl-4 pr-6 self-start">
            <div className="space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block text-[9px] font-medium tracking-widest uppercase transition-colors whitespace-nowrap ${
                    activeSection === item.id
                      ? "text-white"
                      : "text-gray-500 hover:text-white"
                  }`}
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Main content */}
          <div className="flex-1 pb-32 px-6 md:px-12">
            <div className="max-w-2xl mx-auto">
            {/* Header with status pill */}
            <header className="mb-10 md:mb-14 reveal-on-scroll">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                <h1 className="text-form-heading text-white">Roadmap</h1>
                {/* Status pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
                  </span>
                  <span className="text-[10px] font-medium tracking-widest uppercase text-yellow-400/90">
                    Pre-Alpha
                  </span>
                </div>
              </div>
              <p className="text-panel-body text-gray-400 max-w-md">
                What's built and what's to come. Building Projekt in public, one feature at a time and testing every step of the way.
              </p>
            </header>

            {/* Tenets Section */}
            <section id="tenets" className="mb-12 md:mb-16 reveal-on-scroll scroll-mt-24">
              <h2 className="text-form-heading text-gray-500 mb-5">
                Tenets
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {tenets.map((tenet, index) => (
                  <div
                    key={tenet.title}
                    className="p-4 rounded-lg bg-white/[0.02] border border-white/5 reveal-on-scroll"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <h3 className="text-panel-body text-white font-normal mb-2">
                      {tenet.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-gray-500">
                      {tenet.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Roadmap sections */}
            <div className="space-y-12 md:space-y-16">
              {roadmapData.map((section) => (
                <section key={section.id} id={section.id} className="reveal-on-scroll scroll-mt-24">
                  <h2 className="text-form-heading text-gray-500 mb-5">
                    {section.title}
                  </h2>
                  <ul className="space-y-3">
                    {section.items.map((item, index) => (
                      <li
                        key={item.title}
                        className="reveal-on-scroll"
                        style={{ transitionDelay: `${index * 30}ms` }}
                      >
                        <div className="flex items-start gap-3">
                          {/* Status indicator */}
                          <div className={`
                            mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0
                            ${item.completed
                              ? "bg-white/10"
                              : "border border-white/20"
                            }
                          `}>
                            {item.completed && (
                              <Check className="w-3 h-3 text-white/60" strokeWidth={2.5} />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h3 className={`
                              text-panel-body font-normal
                              ${item.completed
                                ? "text-gray-500 line-through decoration-gray-600"
                                : "text-white"
                              }
                            `}>
                              {item.title}
                            </h3>
                            {item.description && !item.completed && (
                              <p className="text-[13px] text-gray-500 mt-0.5">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { RoadmapContent }
