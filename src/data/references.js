import bath1 from "../assets/bath1.jpeg"
import bath2 from "../assets/bath2.jpeg"
import bath3 from "../assets/bath3.jpeg"
import bath4 from "../assets/bath4.jpeg"
import bath5 from "../assets/bath5.jpeg"
import bath6 from "../assets/bath6.jpeg"
import bath7 from "../assets/bath7.jpeg"
import bath8 from "../assets/bath8.jpeg"
import bath9 from "../assets/bath9.jpeg"
import seal1 from "../assets/seal1.jpeg"
import new1 from "../assets/new1.jpeg"
import new2 from "../assets/new2.jpeg"
import new3 from "../assets/new3.jpeg"
import new4 from "../assets/new4.jpeg"
import new5 from "../assets/new5.jpeg"
import new6 from "../assets/new6.jpeg"
import new7 from "../assets/new7.jpeg"
import new8 from "../assets/new8.jpeg"
import new9 from "../assets/new9.jpeg"
import other1 from "../assets/other1.jpeg"
import other2 from "../assets/other2.jpeg"
import other3 from "../assets/other3.jpeg"
import other4 from "../assets/other4.jpeg"
import other5 from "../assets/other5.jpeg"
import other6 from "../assets/other6.jpeg"
import other7 from "../assets/other7.jpeg"
import other8 from "../assets/other8.jpeg"
import other9 from "../assets/other9.jpeg"
import platten1 from "../assets/platten1.jpeg"
import platten2 from "../assets/platten2.jpeg"
import platten3 from "../assets/platten3.jpeg"
import platten4 from "../assets/platten4.jpeg"
import platten5 from "../assets/platten5.jpeg"

const createReferences = (category, label, images) =>
  images.map(({ src, width, height }, index) => ({
    id: `${category}-${index + 1}`,
    src,
    width,
    height,
    category,
    title: `${label} – Referenz ${index + 1} von Plattenleger Jaho GmbH`,
  }))

const referenceGroups = [
  createReferences("bath", "Badezimmer und Badrenovation", [
    { src: bath1, width: 704, height: 960 },
    { src: bath2, width: 704, height: 960 },
    { src: bath3, width: 704, height: 960 },
    { src: bath4, width: 704, height: 960 },
    { src: bath5, width: 704, height: 960 },
    { src: bath6, width: 704, height: 960 },
    { src: bath7, width: 704, height: 960 },
    { src: bath8, width: 704, height: 960 },
    { src: bath9, width: 704, height: 960 },
  ]),
  createReferences("seal", "Abdichtung im Nassbereich", [
    { src: seal1, width: 960, height: 540 },
  ]),
  createReferences("new", "Neue Plattenleger-Arbeiten", [
    { src: new1, width: 704, height: 960 },
    { src: new2, width: 704, height: 960 },
    { src: new3, width: 704, height: 960 },
    { src: new4, width: 704, height: 960 },
    { src: new5, width: 704, height: 960 },
    { src: new6, width: 704, height: 960 },
    { src: new7, width: 704, height: 960 },
    { src: new8, width: 640, height: 1422 },
    { src: new9, width: 704, height: 960 },
  ]),
  createReferences("other", "Weitere Fliesen- und Plattenarbeiten", [
    { src: other1, width: 704, height: 960 },
    { src: other2, width: 704, height: 960 },
    { src: other3, width: 704, height: 960 },
    { src: other4, width: 704, height: 960 },
    { src: other5, width: 704, height: 960 },
    { src: other6, width: 704, height: 960 },
    { src: other7, width: 704, height: 960 },
    { src: other8, width: 704, height: 960 },
    { src: other9, width: 704, height: 960 },
  ]),
  createReferences("platten", "Bodenplatten und Grossformat", [
    { src: platten1, width: 960, height: 540 },
    { src: platten2, width: 960, height: 540 },
    { src: platten3, width: 960, height: 540 },
    { src: platten4, width: 960, height: 720 },
    { src: platten5, width: 960, height: 720 },
  ]),
]

/** Interleaved for a varied horizontal sequence while keeping output deterministic. */
export const references = Array.from(
  { length: Math.max(...referenceGroups.map((group) => group.length)) },
  (_, index) => referenceGroups.map((group) => group[index]).filter(Boolean)
).flat()

