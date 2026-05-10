import { Link } from "react-router-dom"
import Seo from "../seo/Seo"
import { content } from "../data/content"
import BackToHome from "../components/layout/BackToHome"
import HomeSeoContent from "../components/sections/HomeSeoContent"

export default function LeistungenPage() {
  return (
    <>
      <Seo
        title={`Leistungen Bad, Küche & Boden – Schweiz | ${content.brand}`}
        description="Plattenleger-Leistungen: Badezimmer, Küchenplatten, Boden und Regionen. Plattenleger Jaho GmbH – präzise Verlegung in der Schweiz."
        path="/leistungen"
      />
      <div className="pt-10 pb-4">
        <div className="mx-auto w-full min-w-0 content-shell">
          <BackToHome className="mb-2" />
          <p className="mt-4 font-[var(--font-body)] text-sm text-[var(--color-slate)] leading-relaxed max-w-3xl">
            Schnellzugriff:{" "}
            <Link to="/plattenleger-zuerich" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
              Plattenleger Zürich
            </Link>
            {" · "}
            <Link to="/badrenovation-zuerich" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
              Bad Renovation
            </Link>
            {" · "}
            <Link to="/kueche-fliesen-zuerich" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
              Küchen Fliesen
            </Link>
            {" · "}
            <Link to="/#gallery" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
              Galerie
            </Link>
            {" · "}
            <Link to="/#contact" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
              Offerte
            </Link>
          </p>
        </div>
      </div>
      <HomeSeoContent />
    </>
  )
}
