import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Maison from "@/components/Maison";
import Marquee from "@/components/Marquee";
import Rituel from "@/components/Rituel";
import Carte from "@/components/Carte";
import Anais from "@/components/Anais";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Infos from "@/components/Infos";
import Footer from "@/components/Footer";

const HOUSE_MARQUEE = [
  "Poulets fermiers Label Rouge",
  "Grenailles confites au jus",
  "Piment d’Espelette",
  "Assiettes dépareillées",
  "Petit Bayonne",
];

export default function HomePage() {
  return (
    <>
      <a className="visually-hidden" href="#maison">
        Aller au contenu
      </a>
      <Preloader />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Maison />
        <Marquee items={HOUSE_MARQUEE} variant="wine" duration={28} />
        <Rituel />
        <Carte />
        <Anais />
        <Gallery />
        <Reviews />
        <Infos />
      </main>
      <Footer />
    </>
  );
}
