export const buttonStyles = {
  pill: 'bg-black/70 backdrop-blur-sm text-white text-xs rounded-2xl flex items-center gap-2.5 whitespace-nowrap',
  submit: 'w-full py-4 border border-white/50 text-white hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 text-sm text-form-button focus-visible:focus-ring',
  cancel: 'w-full text-white/40 hover:text-white py-2 transition-colors text-form-cancel focus-visible:focus-ring',
  done: 'w-full py-4 border border-white/50 text-white hover:bg-white hover:text-black transition-all duration-300 text-form-done focus-visible:focus-ring',
  contact: 'text-white/60 hover:text-white transition-colors text-contact focus-visible:focus-ring rounded',
} as const
