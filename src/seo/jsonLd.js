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
      streetAddress: content?.sections?.contact?.info?.street || "Winznauerstrasse 8",
      postalCode: content?.sections?.contact?.info?.postalCode || "4632",
      addressLocality: content?.sections?.contact?.info?.city || "Trimbach",
      addressRegion: "Solothurn",
      addressCountry: "CH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.3636,
      longitude: 7.8833,
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
      "Wir übernehmen jeden Auftrag im Fliesen- und Plattenbereich: Pool, Bad, Küche, Schlafzimmer, Wohnraum, Treppen, Terrasse, Gehwege, Pflaster und Gewerbe – jede Fliesenart und jedes Format.",
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
      name: "Jeder Fliesenauftrag – alle Räume und Materialien",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Jeder Fliesen- und Plattenauftrag",
            serviceType: "Alle Fliesenarbeiten",
            description:
              "Wir übernehmen jeden Job im Fliesenbereich – jede Raumart, jede Fliesenart, jedes Format.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pool & Schwimmbad – Fliesen und Platten",
            serviceType: "Poolfliesen",
          },
        },
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
            name: "Schlafzimmer & Wohnräume – Wand- und Bodenfliesen",
            serviceType: "Schlafzimmer und Wohnraum Fliesen",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Böden, Treppen & Pflaster – Innen und Aussen",
            serviceType: "Bodenplatten, Treppen und Pflaster",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Terrasse, Gehwege & Aussenbereiche",
            serviceType: "Terrassenfliesen und Gehwege",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Gewerbe & Objekte – langlebige Beläge",
            serviceType: "Gewerbe Fliesen",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Jede Fliesenart – Keramik, Naturstein, Feinsteinzeug, Grossformat, Mosaik",
            serviceType: "Alle Fliesenarten",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Renovationen, Neubau und Sanierung",
            serviceType: "Fliesen Renovation",
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
      { "@type": "ListItem", position: 3, name: "Referenzen", url: `${SITE_URL}/referenzen` },
      { "@type": "ListItem", position: 4, name: "FAQ", url: `${SITE_URL}/#faq` },
      { "@type": "ListItem", position: 5, name: "Kontakt", url: `${SITE_URL}/#contact` },
    ],
  }

  return {
    "@context": "https://schema.org",
    "@graph": [localBusiness, faqPage, website, homeSectionsNav],
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
