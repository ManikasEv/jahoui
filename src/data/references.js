import a1 from "../assets/a1.jpg"
import a2 from "../assets/a2.jpg"
import a3 from "../assets/a3.jpg"
import a4 from "../assets/a4.jpg"
import b1 from "../assets/b1.jpg"
import b2 from "../assets/b2.jpg"
import b3 from "../assets/b3.jpg"
import b4 from "../assets/b4.jpg"
import b5 from "../assets/b5.jpg"
import b6 from "../assets/b6.jpg"
import b7 from "../assets/b7.jpg"
import c1 from "../assets/c1.jpg"
import c2 from "../assets/c2.jpg"
import c3 from "../assets/c3.jpg"
import c4 from "../assets/c4.jpg"
import c5 from "../assets/c5.jpg"
import f1 from "../assets/f1.jpg"
import h3 from "../assets/h3.jpg"
import he1 from "../assets/he1.jpg"
import he2 from "../assets/he2.jpg"
import j1 from "../assets/j1.jpg"
import j3 from "../assets/j3.jpg"
import j4 from "../assets/j4.jpg"
import j5 from "../assets/j5.jpg"
import j6 from "../assets/j6.jpg"
import j7 from "../assets/j7.jpg"

export const REFERENCE_FILTERS = [
  { id: "all", label: "Alle" },
  { id: "bad", label: "Badezimmer" },
  { id: "kueche", label: "Küche" },
  { id: "boden", label: "Boden" },
  { id: "detail", label: "Details" },
]

/** Shared reference portfolio data. */
export const references = [
  { id: "a1", src: a1, title: "Bad – Wand & Boden", category: "bad" },
  { id: "a2", src: a2, title: "Küche – Rückwand", category: "kueche" },
  { id: "a3", src: a3, title: "Boden – Wohnbereich", category: "boden" },
  { id: "a4", src: a4, title: "Bad – Duschzone", category: "bad" },
  { id: "b1", src: b1, title: "Treppen & Kanten", category: "detail" },
  { id: "b2", src: b2, title: "Großformat – Fläche", category: "detail" },
  { id: "b3", src: b3, title: "Naturstein-Optik", category: "detail" },
  { id: "b4", src: b4, title: "Anschluss & Silikon", category: "detail" },
  { id: "b5", src: b5, title: "Boden – Strapazierfähig", category: "boden" },
  { id: "b6", src: b6, title: "Bad – Linienführung", category: "bad" },
  { id: "b7", src: b7, title: "Küche – Details", category: "kueche" },
  { id: "c1", src: c1, title: "Boden – Formatmix", category: "boden" },
  { id: "c2", src: c2, title: "Bad – Wandflächen", category: "bad" },
  { id: "c3", src: c3, title: "Boden – Übergänge", category: "boden" },
  { id: "c4", src: c4, title: "Küche – Akzentfläche", category: "kueche" },
  { id: "c5", src: c5, title: "Bad – Finish", category: "bad" },
  { id: "f1", src: f1, title: "Boden – Finale Fläche", category: "boden" },
  { id: "h3", src: h3, title: "Gewerbe – Grossfläche verlegt", category: "boden" },
  { id: "he1", src: he1, title: "Industriehalle – Bodenverlegung", category: "boden" },
  { id: "he2", src: he2, title: "Grossprojekt – Feinsteinzeug", category: "boden" },
  { id: "j1", src: j1, title: "Treppenkante & Stufenprofil", category: "detail" },
  { id: "j3", src: j3, title: "Flur – Grossformat-Boden", category: "boden" },
  { id: "j4", src: j4, title: "Ladenfläche – Bodenplatten", category: "boden" },
  { id: "j5", src: j5, title: "Büro – Boden fertig verlegt", category: "boden" },
  { id: "j6", src: j6, title: "Wand – Nassbereich in Arbeit", category: "bad" },
  { id: "j7", src: j7, title: "Grossraum – Boden & Säulen", category: "boden" },
]

export function filterReferences(items, categoryId) {
  if (!categoryId || categoryId === "all") return items
  return items.filter((item) => item.category === categoryId)
}
