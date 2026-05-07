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
        <div className="mx-auto w-full max-w-[80vw] px-6">
          <BackToHome className="mb-2" />
        </div>
      </div>
      <HomeSeoContent />
    </>
  )
}
