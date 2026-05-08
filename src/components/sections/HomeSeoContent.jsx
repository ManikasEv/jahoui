import { Link } from "react-router-dom"

/**
 * SEO copy: Leistungen & Region (standalone page `/leistungen`, linked from footer).
 */
export default function HomeSeoContent() {
  return (
    <section
      id="leistungen-text"
      className="mx-auto w-full min-w-0 content-shell py-12 sm:py-14 border-y border-black/[0.06] bg-white/[0.35]"
      aria-labelledby="home-seo-h2-main"
    >
      <div className="max-w-3xl mx-auto w-full min-w-0 font-[var(--font-body)] text-[var(--color-slate)] leading-relaxed text-safe space-y-8">
        <header className="text-center space-y-3 px-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-primary)]">
            Leistungen & Region
          </p>
          <h2 id="home-seo-h2-main" className="font-[var(--font-heading)] text-[clamp(1.2rem,4vw+0.6rem,1.85rem)] md:text-3xl font-bold text-[var(--color-dark)] tracking-tight text-safe">
            Leistungen von Bad, Küche bis Boden
          </h2>
          <p className="text-base md:text-[1.05rem]">
            Plattenleger Jaho GmbH verbindet handwerkliche Präzision mit klarer Beratung: Ob{" "}
            <strong className="font-semibold text-[var(--color-dark)]">Badezimmer</strong>,{" "}
            <strong className="font-semibold text-[var(--color-dark)]">Küche</strong> oder{" "}
            <strong className="font-semibold text-[var(--color-dark)]">Boden</strong> – wir legen Feinsteinzeug,
            Keramik und Grossformat so, dass Fugen ruhig wirken, Übergänge sauber sitzen und die Fläche im Alltag
            mitmacht. Auf dieser Seite finden Sie unsere{" "}
            <a href="/#gallery" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
              Referenzprojekte
            </a>
            , Antworten in der{" "}
            <a href="/#faq" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
              FAQ
            </a>{" "}
            und die Möglichkeit, direkt{" "}
            <a href="/#contact" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
              Kontakt
            </a>{" "}
            aufzunehmen.
          </p>
        </header>

        <article className="space-y-6">
          <h2 className="font-[var(--font-heading)] text-xl md:text-2xl text-[var(--color-dark)]">
            Badezimmer Renovationen
          </h2>
          <p>
            Im Bad entscheiden oft unsichtbare Details: Abdichtung, Gefälle in der Dusche, saubere Kanten an
            Ecken und Einstiegen. Wir renovieren Nasszellen so, dass Technik stimmt und das Erscheinungsbild ruhig
            bleibt – von der klassischen Keramik bis zu Grossformat-Platten. Für eine gezielte Ausführung in der Stadt
            und Region finden Sie auch unsere Seite{" "}
            <Link
              to="/badrenovation-zuerich"
              className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline"
            >
              Bad Renovation Zürich
            </Link>
            .
          </p>
          <p>
            Typische Materialien sind strapazierfähiges{" "}
            <strong className="text-[var(--color-dark)]">Feinsteinzeug</strong>, strukturierte Oberflächen für mehr
            Griff im Duschbereich und pflegeleichte Wände, die Feuchtigkeit und Reinigung mitmachen. Wo nötig,
            stimmen wir uns mit Sanitär oder anderen Gewerken ab, damit Schnittstellen und Höhen exakt passen.
          </p>
        </article>

        <article className="space-y-6">
          <h2 className="font-[var(--font-heading)] text-xl md:text-2xl text-[var(--color-dark)]">
            Küchenplatten
          </h2>
          <p>
            In der Küche treffen Hitze, Spritzwasser und häufige Reinigung aufeinander. Deshalb setzen wir auf
            widerstandsfähige Platten, saubere Schnitte an Steckdosen und Ausschnitten sowie durchdachte Übergänge zum
            Boden. Ob{" "}
            <strong className="text-[var(--color-dark)]">Küchenrückwand</strong>, Wand bis zur Unterschrankkante oder
            durchgehender Boden – wir beraten zu Format und Stossverband, damit das Raumbild stimmig wirkt. Mehr dazu:{" "}
            <Link
              to="/kueche-fliesen-zuerich"
              className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline"
            >
              Küchen Fliesen Zürich
            </Link>
            .
          </p>
        </article>

        <article className="space-y-6">
          <h2 className="font-[var(--font-heading)] text-xl md:text-2xl text-[var(--color-dark)]">
            Bodenplatten
          </h2>
          <p>
            Bodenfliesen müssen nicht nur gut aussehen, sondern auch Belastung, Stösse und punktuelle Feuchtigkeit
            aushalten. Wir achten auf ebenen Untergrund, passende Verlegesysteme und ruhige Dehnungsbereiche – besonders
            bei grossen Formaten. Treppen, Eingänge und offene Wohnbereiche profitieren von einer klaren
            Linienführung und stabilen Übergängen zu anderen Belägen.
          </p>
        </article>

        <article className="space-y-6">
          <h2 className="font-[var(--font-heading)] text-xl md:text-2xl text-[var(--color-dark)]">
            Ablauf & Materialien
          </h2>
          <p>
            Unser Ablauf beginnt mit Ihrer Anfrage und einer realistischen Ersteinschätzung. Wo sinnvoll, klären wir
            Untergrund, bestehende Schichten und Details vor Ort. Danach folgen Vorbereitung, Verlegung und Finish –
            inklusive sauberer Silikonfugen und Abnahme im gemeinsamen Blick. Als Materialien kommen je nach Projekt
            <strong className="text-[var(--color-dark)]"> Feinsteinzeug</strong>,{" "}
            <strong className="text-[var(--color-dark)]">Keramik</strong>, Steinoptik oder Grossformat zum Einsatz; wir
            erklären Vor- und Nachteile verständlich, ohne unnötige Upgrades zu verkaufen.
          </p>
        </article>

        <article className="space-y-6">
          <h2 className="font-[var(--font-heading)] text-xl md:text-2xl text-[var(--color-dark)]">
            Warum Plattenleger Jaho GmbH?
          </h2>
          <p>
            Mit über zwei Jahrzehnten Erfahrung im Fliesenhandwerk und der Arbeit in der Schweiz legen wir Wert auf
            messbare Qualität: gleichmässige Fugen, präzise Schnitte und ein Ergebnis, das auch nach Jahren noch
            überzeugt. Unsere Kunden schätzen transparente Offerten, termintreue Umsetzung und eine Kommunikation, die
            zum Projekt passt – vom Einfamilienhaus bis zur partnerschaftlichen Zusammenarbeit mit Architektur und
            Gewerken.
          </p>
        </article>

        <article className="space-y-6">
          <h2 className="font-[var(--font-heading)] text-xl md:text-2xl text-[var(--color-dark)]">
            Unsere Projekte & Referenzen
          </h2>
          <p>
            Vor der Entscheidung für ein Material hilft oft ein konkretes Bild: In unserer Galerie zeigen wir eine
            Auswahl realisierter Arbeiten – von kompakten Nassbereichen bis zu grossen Bodenflächen. So erhalten Sie ein
            Gefühl für Fugenbild, Licht und Struktur. Kombiniert mit einer persönlichen Beratung finden wir die Lösung,
            die zu Budget und Nutzung passt – ob minimalistisch, klassisch oder mit Akzentflächen.
          </p>
          <p>
            Für Inspiration scrollen Sie zum Bereich{" "}
            <a href="/#gallery" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
              Referenzen
            </a>
            ; dort können Sie einzelne Bilder vergrössern und sich einen Eindruck von Kanten, Übergängen und
            Oberflächen verschaffen.
          </p>
        </article>

        <article className="space-y-6">
          <h2 className="font-[var(--font-heading)] text-xl md:text-2xl text-[var(--color-dark)]">
            Region & lokale Seiten
          </h2>
          <p>
            Wir sind in mehreren Regionen für Sie da und unterhalten eigene Landingpages für lokale Suchanfragen –
            inklusive{" "}
            <Link to="/plattenleger-zuerich" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
              Plattenleger Zürich
            </Link>
            ,{" "}
            <Link to="/plattenleger-luzern" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
              Luzern
            </Link>
            ,{" "}
            <Link to="/plattenleger-zug" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
              Zug
            </Link>
            ,{" "}
            <Link
              to="/plattenleger-winterthur"
              className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline"
            >
              Winterthur
            </Link>{" "}
            und{" "}
            <Link to="/plattenleger-aargau" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
              Aargau
            </Link>
            . So finden Sie gezielt Informationen zu <strong className="text-[var(--color-dark)]">Fliesenleger</strong>
            -Services in Ihrer Gegend und können uns direkt für eine{" "}
            <a href="/#contact" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
              Offerte
            </a>{" "}
            erreichen.
          </p>
        </article>

        <div className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-6 md:p-8 depth-shadow">
          <h3 className="font-[var(--font-heading)] text-lg md:text-xl text-[var(--color-dark)] mb-3">
            Vertrauen & nächste Schritte
          </h3>
          <p className="mb-4">
            Überzeugen Sie sich von unserer Arbeit in der{" "}
            <a href="/#gallery" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
              Galerie
            </a>{" "}
            und lesen Sie häufige Fragen zur{" "}
            <a href="/#faq" className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline">
              Offerte, Region und Materialien
            </a>
            . Wenn Sie ein konkretes Projekt planen, freuen wir uns auf Ihre Nachricht – inklusive Fotos und groben
            Massen, damit wir Sie effizient beraten können.
          </p>
          <p className="text-sm text-[var(--color-slate)]/90">
            Hinweis: Leistungsumfang und Preise hängen vom Objekt ab; alle Angaben auf dieser Seite ersetzen keine
            Besichtigung bei komplexen Sanierungen.
          </p>
        </div>
      </div>
    </section>
  )
}
