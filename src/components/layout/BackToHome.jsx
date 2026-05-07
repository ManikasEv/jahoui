import { Link } from "react-router-dom"

export default function BackToHome({ className = "" }) {
  return (
    <Link
      to="/"
      className={[
        "inline-flex items-center gap-1.5 font-[var(--font-body)] text-sm font-semibold text-[var(--color-primary)]",
        "hover:text-[var(--color-dark)] transition-colors underline-offset-4 hover:underline",
        className,
      ].join(" ")}
    >
      <span aria-hidden>←</span>
      Zur Startseite
    </Link>
  )
}
