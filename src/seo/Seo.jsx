import { Helmet } from "react-helmet-async"

const SITE_URL = "https://jaho-plattenleger.ch"
const DEFAULT_OG_IMAGE = `${SITE_URL}/logojaho.jpg`

export default function Seo({
  title,
  description,
  path = "/",
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
}) {
  const url = canonical || `${SITE_URL}${path}`
  const safeTitle = title || "Jaho Plattenleger"
  const safeDescription = description || ""

  return (
    <Helmet>
      <title>{safeTitle}</title>
      {safeDescription ? <meta name="description" content={safeDescription} /> : null}
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={safeTitle} />
      {safeDescription ? <meta property="og:description" content={safeDescription} /> : null}
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="de_CH" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={safeTitle} />
      {safeDescription ? <meta name="twitter:description" content={safeDescription} /> : null}
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}

