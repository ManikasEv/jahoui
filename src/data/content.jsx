export const content = {
    brand: "Jaho Plattenleger",
    nav: {
      links: [
        { href: "#hero", label: "Start" },
        { href: "#about", label: "Über uns" },
        { href: "#services", label: "Leistungen" },
        { href: "#projects", label: "Projekte" },
        { href: "#contact", label: "Kontakt" },
      ],
      cta: "Offerte anfragen",
      mobileOpen: "Menü",
      mobileClose: "Schliessen",
    },
  
    hero: {
      badge: "Schweiz • Qualität • Pünktlich",
      title: "Präzise Platten. Saubere Fugen.",
      subtitle:
        "Badezimmer, Küchen, Böden — wir liefern gerade Linien, perfekte Fugen und Ergebnisse, die halten.",
      ctas: [
        { type: "button", label: "Kostenlose Offerte", href: "#contact" },
        { type: "link", label: "Projekte ansehen", href: "#projects" },
      ],
      chips: ["Saubere Kanten", "Langlebige Fugen", "Präzise Übergänge"],
      note: "Antwort meist innerhalb 24h",
      rightCard: {
        tag: "Premium",
        title: "Spezialisiert auf",
        subtitle: "Präzise Ausführung für anspruchsvolle Räume.",
        bullets: [
          "Grossformat & Feinsteinzeug",
          "Duschen & Nasszellen",
          "Treppen & Übergänge",
          "Reparaturen & Silikonfugen",
        ],
        calloutTitle: "Einfach erreichbar",
        calloutText: "Wir antworten normalerweise innerhalb von 24 Stunden",
      },
    },
  
    footer: {
      copyright: "Alle Rechte vorbehalten.",
      whatsappLabel: "WhatsApp",
      // digits only: countrycode + number, no +
      whatsappPhone: "41791234567",
      whatsappPrefill:
        "Hallo! Ich hätte gerne eine Offerte für Plattenarbeiten. Können wir die Details besprechen?",
    },
  
    sections: {
      about: {
        title: "Über uns",
        text:
          "Wir sind ein professioneller Plattenleger-Service mit Fokus auf Präzision, saubere Handwerkskunst und dauerhafte Qualität. Mit jahrelanger Erfahrung in der Schweizer Baubranche garantieren wir höchste Standards bei jedem Projekt.",
      },
      services: {
        title: "Unsere Leistungen",
        text: "Von der Planung bis zur perfekten Ausführung — wir bieten umfassende Plattenleger-Dienstleistungen für Privat- und Geschäftskunden.",
        items: [
          {
            title: "Badezimmer & Nasszellen",
            description: "Fachgerechte Verlegung in Feuchträumen mit perfekter Abdichtung",
            icon: "bath"
          },
          {
            title: "Küchen & Wohnräume",
            description: "Stilvolle Bodenbeläge und Wandverkleidungen für jeden Geschmack",
            icon: "home"
          },
          {
            title: "Grossformat Fliesen",
            description: "Moderne Grossformate und Feinsteinzeug professionell verlegt",
            icon: "grid"
          },
          {
            title: "Renovationen & Reparaturen",
            description: "Sanierung alter Fliesen und Ausbesserung von Schäden",
            icon: "tools"
          }
        ]
      },
      projects: {
        title: "Unsere Projekte",
        text: "Überzeugen Sie sich von unserer Qualität. Hier sehen Sie eine Auswahl unserer abgeschlossenen Arbeiten.",
        items: [
          {
            title: "Luxusbad Zürich",
            description: "Komplette Badsanierung mit Grossformat-Feinsteinzeug",
            category: "Badezimmer",
            image: "/projects/project1.jpg"
          },
          {
            title: "Moderne Küche Bern",
            description: "Stilvolle Wandfliesen und Bodenfliesen in offener Küche",
            category: "Küche",
            image: "/projects/project2.jpg"
          },
          {
            title: "Penthouse Basel",
            description: "Durchgehende Bodenverlegung in exklusivem Penthouse",
            category: "Wohnbereich",
            image: "/projects/project3.jpg"
          }
        ]
      },
      contact: {
        title: "Kontakt aufnehmen",
        text: "Schreiben Sie uns oder kontaktieren Sie uns direkt über WhatsApp. Wir freuen uns auf Ihr Projekt!",
        info: {
          phone: "+41 79 123 45 67",
          email: "info@jaho-plattenleger.ch",
          address: "Schweiz"
        }
      },
    },
  }