import { ArrowRight } from "lucide-react"

function CommitMessageBox() {
  return (
    <div
      data-blend-name="CommitBox"
      className="bg-[#212121] rounded-2xl px-[21px] py-[18px] flex items-center justify-between w-fit h-[39px] gap-3"
      role="img"
      aria-label="Commit message input preview"
    >
      <div className="flex items-center gap-3">
        <span className="text-white font-semibold text-xs">H1</span>
        <div className="flex items-center">
          <div className="w-[1px] h-[14px] bg-white blinking-line" aria-hidden="true" />
          <span className="text-white text-xs">Describe changes ...</span>
        </div>
      </div>
      <ArrowRight className="w-4 h-4 text-white" aria-hidden="true" />
    </div>
  )
}

export { CommitMessageBox }
