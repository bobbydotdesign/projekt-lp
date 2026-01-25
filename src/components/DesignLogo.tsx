function DesignLogo() {
  return (
    <div data-blend-name="LogoSection" className="flex flex-col items-center justify-center">
      <div
        data-blend-name="BrandText"
        className="text-white text-logo flex flex-col items-center justify-center gap-12"
      >
        <div className="text-center indent-[2em] relative inline-block">
          DESIGN
          <div
            className="absolute border border-[#00BFFF] rounded pointer-events-none"
            style={{ top: '-6px', bottom: '-6px', left: '1.5em', right: '1.5em' }}
            aria-hidden="true"
          />
        </div>
        <div data-blend-name="Logo" className="w-20 h-14 flex-shrink-0">
          <img src="/images/logo.svg" alt="Projekt Logo" className="w-full h-full" />
        </div>
        <div className="text-center indent-[2em]">ENGINEERED</div>
      </div>
    </div>
  )
}

export { DesignLogo }
