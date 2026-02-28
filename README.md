# Jaho Plattenleger Website

Professionelle Website für Jaho Plattenleger - Schweizer Plattenleger Service mit Fokus auf Qualität und Präzision.

## 🚀 Features

- **SEO Optimiert**: Vollständige SEO-Optimierung für deutsche Suchmaschinen mit strukturierten Daten (JSON-LD)
- **3D Animationen**: Moderne GSAP-Animationen mit 3D-Flip-Karten und Parallax-Effekten
- **Responsive Design**: Optimiert für alle Geräte (Mobile-First)
- **Performance**: Schnelle Ladezeiten durch optimierte Assets und Code-Splitting
- **Accessibility**: WCAG 2.1 konform

## 📁 Projektstruktur

```
src/
├── animations/          # GSAP Animationen
│   ├── heroAnimation.js
│   └── navbarAnimation.js
├── components/
│   ├── hero/           # Hero Section Komponenten
│   │   ├── Hero.jsx
│   │   ├── HeroDesktop.jsx
│   │   └── HeroMobile.jsx
│   ├── layout/         # Layout Komponenten
│   │   ├── Navbar.jsx
│   │   ├── NavbarDesktop.jsx
│   │   ├── NavbarMobile.jsx
│   │   └── Footer.jsx
│   └── sections/       # Haupt-Sektionen
│       ├── About.jsx
│       ├── Services.jsx
│       ├── Projects.jsx
│       └── Contact.jsx
├── data/
│   └── content.jsx     # Alle Inhalte (mehrsprachig erweiterbar)
├── App.jsx
├── main.jsx
└── index.css
```

## 🎨 Animationen

### Hero Animationen
- **3D Buchstaben-Animation**: Jeder Buchstabe animiert einzeln mit Rotation
- **Magnetische Buttons**: Buttons folgen dem Mauszeiger
- **Tilt-Effekt**: Karten neigen sich basierend auf Mausposition
- **Spotlight**: Folgt dem Cursor mit sanftem Gradient

### Section Animationen
- **ScrollTrigger**: Elemente erscheinen beim Scrollen
- **3D Flip Cards**: Projekt-Karten drehen sich beim Klick
- **Parallax**: Hintergrund-Elemente bewegen sich langsamer
- **Hover Effects**: Interaktive Hover-Animationen auf allen interaktiven Elementen

## 🔧 Installation

```bash
# Abhängigkeiten installieren
npm install

# Development Server starten
npm run dev

# Production Build erstellen
npm run build

# Preview Production Build
npm run preview
```

## 📦 Technologien

- **React 19** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS 4** - Styling
- **GSAP 3** - Animationen mit ScrollTrigger Plugin
- **React Icons** - Icon Library

## 🎯 SEO Features

### Meta Tags
- Vollständige Open Graph Tags
- Twitter Card Support
- Canonical URLs
- Strukturierte Daten (JSON-LD) für Local Business

### Suchmaschinen
- `robots.txt` konfiguriert
- `sitemap.xml` für alle Seiten
- Semantisches HTML
- Alt-Texte für Bilder (vorbereitet)

### Keywords
- Plattenleger Schweiz
- Fliesenleger
- Bodenleger
- Badezimmer Fliesen
- Küche Fliesen
- Grossformat Fliesen
- Feinsteinzeug

## 🌐 Deployment

### Vite Build
```bash
npm run build
```

Die Build-Dateien befinden sich im `dist/` Ordner und können auf jedem Static Host deployed werden:
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages

### Empfohlene Einstellungen
- Domain: `jaho-plattenleger.ch`
- HTTPS aktivieren
- Kompression aktivieren (gzip/brotli)
- Cache-Headers für statische Assets

## 📱 Browser Support

- Chrome (letzte 2 Versionen)
- Firefox (letzte 2 Versionen)
- Safari (letzte 2 Versionen)
- Edge (letzte 2 Versionen)
- Mobile Browser (iOS Safari, Chrome Mobile)

## 🎨 Farben

```css
--color-primary: #b11226  /* Rot - Hauptfarbe */
--color-dark: #121417     /* Dunkelgrau - Text */
--color-bg: #f7f7f5       /* Hellgrau - Hintergrund */
--color-slate: #2e3a46    /* Mittelgrau - Sekundärtext */
--color-accent: #d6b27c   /* Gold - Akzent */
```

## 📝 Inhalte anpassen

Alle Inhalte befinden sich in `src/data/content.jsx`. Dort können Sie einfach:
- Texte ändern
- Neue Projekte hinzufügen
- Kontaktinformationen aktualisieren
- Navigation anpassen

## 🚀 Performance

- Lazy Loading für Bilder (vorbereitet)
- Code Splitting
- Optimierte GSAP Animations (GPU-beschleunigt)
- Minimale Bundle Size
- Tree Shaking aktiviert

## 📞 Kontakt Integration

- WhatsApp Integration
- E-Mail Kontaktformular (vorbereitet)
- Telefon Click-to-Call

## 🔄 Zukünftige Erweiterungen

- [ ] Backend für Kontaktformular
- [ ] Bildergalerie für Projekte
- [ ] Blog-Sektion
- [ ] Kundenbewertungen
- [ ] Mehrsprachigkeit (DE/FR/IT/EN)
- [ ] Dark Mode

## 📄 Lizenz

Alle Rechte vorbehalten - Jaho Plattenleger © 2026
# jahoui
