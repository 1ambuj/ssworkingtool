/** Product previews for the home Featured / Learning sections. */
import epdfBook from '@/assets/img/epdf-book.png'
import ssaLearning from '@/assets/img/ssa_learning.png'
import ssaTimesheet from '@/assets/img/ssa_timesheet.png'

export function TimesheetPreview() {
  return (
    <figure className="animate-fade-up-delay overflow-hidden rounded-[1.5rem] border border-border/60 bg-[#1c1917] shadow-[0_24px_60px_-28px_rgba(28,25,23,0.55)]">
      <img
        src={ssaTimesheet}
        alt="SSA Intersoft dashboard"
        className="block h-auto w-full"
      />
    </figure>
  )
}

export function LearningPreview() {
  return (
    <figure className="animate-fade-up-delay overflow-hidden rounded-[1.5rem] border border-border/70 bg-panel shadow-[0_24px_60px_-28px_rgba(28,25,23,0.28)] ring-1 ring-brand-100/80">
        <img
          src={ssaLearning}
        />
    </figure>
  )
}

export function EpdfBookPreview() {
  return (
    <figure className="animate-fade-up-delay overflow-hidden rounded-[1.5rem] border border-sky-200 bg-white shadow-[0_24px_60px_-28px_rgba(14,116,144,0.35)]">
      <img
        src={epdfBook}
        alt="ePDF book editor"
        className="block h-auto w-full object-cover object-top"
      />
    </figure>
  )
}
