import type { Metadata, Viewport } from "next";
import { Anton, Grand_Hotel, Jost } from "next/font/google";
import { AppStateProvider } from "@/components/AppState";
import SmoothScroll from "@/components/SmoothScroll";
import { RESTAURANT } from "@/lib/data";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const grandHotel = Grand_Hotel({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-grand-hotel",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cantine Dodue — Rôtisserie & garde-manger à Bayonne",
  description:
    "Cantine de quartier et rôtisserie au Petit Bayonne. Poulets fermiers à la broche, produits frais et locaux, sur place et à emporter. 46 rue Pannecau.",
  metadataBase: new URL("https://cantinedodue.fr"),
  openGraph: {
    title: "Cantine Dodue — Bayonne",
    description: RESTAURANT.tagline,
    locale: "fr_FR",
    type: "website",
  },
  icons: { icon: "/images/logo-dodue.png" },
};

export const viewport: Viewport = {
  themeColor: "#4e0f15",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: RESTAURANT.name,
  image: "/images/devanture.png",
  servesCuisine: ["Rôtisserie", "Bistrot", "Cuisine basque"],
  priceRange: RESTAURANT.priceRange,
  telephone: "+33615151429",
  address: {
    "@type": "PostalAddress",
    streetAddress: RESTAURANT.address,
    addressLocality: "Bayonne",
    postalCode: "64100",
    addressCountry: "FR",
  },
  sameAs: [RESTAURANT.instagram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${anton.variable} ${grandHotel.variable} ${jost.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AppStateProvider>
          <SmoothScroll />
          {children}
        </AppStateProvider>
      </body>
    </html>
  );
}
