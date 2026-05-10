/** Single source for structured data (keep FAQ copy aligned with content.sections.faq.items). */

import { SITE_ORIGIN as SITE_URL } from "../config/siteOrigin"

export function buildHomeJsonLd(content) {
  const phone = (content?.sections?.contact?.info?.phone || "").replace(/\s/g, "") || "+41765452332"
  const faqItems = content?.sections?.faq?.items || []

  const localBusiness = {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: content.brand,
    image: `${SITE_URL}/logojaho.jpg`,
    url: SITE_URL,
    telephone: phone,
    email: content?.sections?.contact?.info?.email || "info@jaho-plattenleger.ch",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CH",
      addressRegion: "Schweiz",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.3769,
      longitude: 8.5417,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:00",
      },
    ],
    sameAs: [`https://wa.me/${content.footer.whatsappPhone}`],
    description:
      "Professioneller Plattenleger in der Schweiz. Spezialisiert auf Badezimmer, Küchen, Bodenplatten und Renovationen – präzise Verlegung und saubere Fugen.",
    areaServed: [
      { "@type": "City", name: "Zürich" },
      { "@type": "City", name: "Winterthur" },
      { "@type": "City", name: "Zug" },
      { "@type": "City", name: "Luzern" },
      { "@type": "AdministrativeArea", name: "Kanton Aargau" },
      { "@type": "Country", name: "Schweiz" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Plattenleger-Leistungen",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Badezimmer & Nasszellen – Fliesen und Platten",
            serviceType: "Plattenverlegung Bad",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Küchen – Rückwand und Bodenplatten",
            serviceType: "Küchenfliesen",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Böden & Treppen – Feinsteinzeug und Grossformat",
            serviceType: "Bodenplatten",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Renovationen und Sanierung",
            serviceType: "Bad Renovation",
          },
        },
      ],
    },
  }

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  }

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: content.brand,
    publisher: { "@id": `${SITE_URL}/#localbusiness` },
  }

  /** In-page sections — helps discovery of anchor URLs (same canonical page). */
  const homeSectionsNav = {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#home-sections`,
    name: "Hauptbereiche Startseite",
    numberOfItems: 5,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Über uns", url: `${SITE_URL}/#about` },
      { "@type": "ListItem", position: 2, name: "Kunden", url: `${SITE_URL}/#clients` },
      { "@type": "ListItem", position: 3, name: "Referenzen", url: `${SITE_URL}/#gallery` },
      { "@type": "ListItem", position: 4, name: "FAQ", url: `${SITE_URL}/#faq` },
      { "@type": "ListItem", position: 5, name: "Kontakt", url: `${SITE_URL}/#contact` },
    ],
  }

  /** Standalone URLs — mirrors sitemap; reinforces site structure for search (sitelinks are not guaranteed). */
  const mainSitePages = {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#main-pages`,
    name: "Wichtige Seiten",
    numberOfItems: 8,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Leistungen & Region", url: `${SITE_URL}/leistungen` },
      { "@type": "ListItem", position: 2, name: "Plattenleger Zürich", url: `${SITE_URL}/plattenleger-zuerich` },
      { "@type": "ListItem", position: 3, name: "Plattenleger Luzern", url: `${SITE_URL}/plattenleger-luzern` },
      { "@type": "ListItem", position: 4, name: "Plattenleger Zug", url: `${SITE_URL}/plattenleger-zug` },
      { "@type": "ListItem", position: 5, name: "Plattenleger Winterthur", url: `${SITE_URL}/plattenleger-winterthur` },
      { "@type": "ListItem", position: 6, name: "Plattenleger Aargau", url: `${SITE_URL}/plattenleger-aargau` },
      { "@type": "ListItem", position: 7, name: "Bad Renovation Zürich", url: `${SITE_URL}/badrenovation-zuerich` },
      { "@type": "ListItem", position: 8, name: "Küchen Fliesen Zürich", url: `${SITE_URL}/kueche-fliesen-zuerich` },
    ],
  }

  return {
    "@context": "https://schema.org",
    "@graph": [localBusiness, faqPage, website, homeSectionsNav, mainSitePages],
  }
}

export function buildCityLandingJsonLd({ title, path, cityName, regionNote }) {
  const pageUrl = `${SITE_URL}${path}`
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description: regionNote,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: {
          "@type": "Service",
          name: `Plattenleger ${cityName}`,
          areaServed: { "@type": "City", name: cityName },
          provider: { "@id": `${SITE_URL}/#localbusiness` },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Start",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: title,
            item: pageUrl,
          },
        ],
      },
    ],
  }
}
