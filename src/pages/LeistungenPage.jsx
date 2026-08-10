import Seo from "../seo/Seo"
import { content } from "../data/content"
import BackToHome from "../components/layout/BackToHome"
import HomeSeoContent from "../components/sections/HomeSeoContent"

export default function LeistungenPage() {
  return (
    <>
      <Seo
        title={`Leistungen – Jeder Fliesenauftrag Schweiz | ${content.brand}`}
        description="Wir übernehmen jeden Auftrag im Fliesenbereich: Pool, Bad, Küche, Schlafzimmer, Wohnraum, Treppen, Terrasse, Gehwege, Pflaster und Gewerbe. Jede Fliesenart – Plattenleger Jaho GmbH."
        path="/leistungen"
      />
      <div className="pt-10 pb-4">
        <div className="mx-auto w-full min-w-0 content-shell">
          <BackToHome className="mb-2" />
        </div>
      </div>
      <HomeSeoContent />
    </>
  )
}
