import Seo from "../seo/Seo"
import BackToHome from "../components/layout/BackToHome"
import Contact from "../components/sections/Contact"
import GalleryShowcase from "../components/sections/GalleryShowcase"

export default function PlattenlegerZuerich() {
  return (
    <>
      <Seo
        title="Plattenleger Zürich – Fliesenleger vom Profi"
        description="Plattenleger in Zürich für Bad, Küche und Boden. Saubere Verlegung, faire Preise und zuverlässige Termine. Jetzt Offerte anfragen."
        path="/plattenleger-zuerich"
      />

      <section className="mx-auto w-full max-w-[1100px] px-6 pt-12 pb-10">
        <BackToHome className="mb-6" />
        <h1 className="hero-title mb-4">Plattenleger Zürich – Fliesenleger vom Profi</h1>
        <p className="font-[var(--font-body)] text-[var(--color-slate)] text-base md:text-lg leading-relaxed max-w-3xl text-safe">
          Wir verlegen Fliesen und Platten präzise – in Badezimmern, Küchen und auf Böden. Sie erhalten eine saubere Ausführung,
          klare Kommunikation und eine Offerte, die zu Ihrem Projekt passt.
        </p>
      </section>

      <section className="mx-auto w-full max-w-[1100px] px-6 py-10">
        <h2 className="section-title mb-4">Leistungen im Überblick</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Bad & Dusche", text: "Nasszellen, Duschen, Wände und Böden – langlebig, dicht und optisch perfekt." },
            { title: "Küche", text: "Rückwände, Wandfliesen, Übergänge – modern, pflegeleicht und robust." },
            { title: "Böden", text: "Wohnräume, Eingänge, Treppen – sauber verlegt, gerade Fugen, stabile Übergänge." },
            { title: "Reparaturen", text: "Austausch einzelner Platten, Silikonfugen, kleinere Ausbesserungen." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-6 depth-shadow">
              <h3 className="font-[var(--font-heading)] text-xl md:text-2xl leading-snug text-[var(--color-dark)] mb-2">
                {item.title}
              </h3>
              <p className="font-[var(--font-body)] text-[var(--color-slate)] leading-relaxed text-safe">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1100px] px-6 py-10">
        <h2 className="section-title mb-4">Warum Jaho Plattenleger</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Sauber & präzise", text: "Gerade Linien, gleichmässige Fugen und ein Ergebnis, das lange hält." },
            { title: "Fair & transparent", text: "Klare Offerte und nachvollziehbare Schritte – ohne Überraschungen." },
            { title: "Zuverlässig", text: "Termintreue und ein reibungsloser Ablauf – vom Start bis zur Abnahme." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-6">
              <h3 className="font-[var(--font-heading)] text-xl leading-snug text-[var(--color-dark)] mb-2">{item.title}</h3>
              <p className="font-[var(--font-body)] text-[var(--color-slate)] leading-relaxed text-safe">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1100px] px-6 py-10">
        <h2 className="section-title mb-4">Kosten Plattenleger Zürich</h2>
        <p className="font-[var(--font-body)] text-[var(--color-slate)] leading-relaxed max-w-3xl text-safe">
          Die Kosten hängen von Untergrund, Format, Schnittaufwand und Details (z.B. Abdichtung, Nischen, Gefälle) ab. Am besten:
          kurz anfragen – wir geben Ihnen eine realistische Einschätzung und erstellen eine passende Offerte.
        </p>
      </section>

      <GalleryShowcase title="Referenzen & Bilder" />

      <section className="mx-auto w-full max-w-[1100px] px-6 py-10">
        <h2 className="section-title mb-4">FAQ</h2>
        <div className="space-y-4">
          {[
            {
              q: "Wie schnell erhalte ich eine Offerte?",
              a: "In der Regel melden wir uns kurzfristig. Für eine genaue Offerte klären wir kurz die Details (Fläche, Material, Zustand).",
            },
            {
              q: "Arbeitet ihr auch mit Grossformat-Platten?",
              a: "Ja – wir haben Erfahrung mit Feinsteinzeug und Grossformaten inklusive sauberer Kanten und Übergänge.",
            },
            {
              q: "Übernehmt ihr auch kleine Reparaturen?",
              a: "Ja, je nach Aufwand. Schreiben Sie uns einfach kurz, was gemacht werden soll.",
            },
          ].map((item) => (
            <details
              key={item.q}
              className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-6"
            >
              <summary className="font-[var(--font-heading)] text-lg md:text-xl leading-snug text-[var(--color-dark)] cursor-pointer">
                {item.q}
              </summary>
              <p className="mt-3 font-[var(--font-body)] text-[var(--color-slate)] leading-relaxed text-safe">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <Contact />
    </>
  )
}

