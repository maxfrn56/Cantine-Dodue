export const RESTAURANT = {
  name: "Cantine Dodue",
  baseline: "Rôtisserie & garde-manger",
  tagline: "Cantine de quartier & rôtisserie. Sur place et à emporter avec des produits frais et locaux.",
  city: "Bayonne",
  neighborhood: "Petit Bayonne",
  address: "46 Rue Pannecau",
  zip: "64100 Bayonne",
  phone: "06 15 15 14 29",
  phoneHref: "tel:+33615151429",
  instagram: "https://www.instagram.com/cantinedodue.rotisserie/",
  instagramHandle: "@cantinedodue.rotisserie",
  maps: "https://www.google.com/maps/search/?api=1&query=Cantine+Dodue+46+Rue+Pannecau+64100+Bayonne",
  priceRange: "10–20 €",
  rating: "5,0",
  reviewCount: 56,
  chef: "Anaïs Xavier Saraiva",
  chefFirst: "Anaïs",
} as const;

export const HOURS = [
  { day: "Lundi", service: "Fermé", closed: true },
  { day: "Mardi", service: "11:30 – 14:30 · 18:30 – 22:00" },
  { day: "Mercredi", service: "11:30 – 14:30 · 18:30 – 22:00" },
  { day: "Jeudi", service: "11:30 – 14:30 · 18:30 – 22:00" },
  { day: "Vendredi", service: "11:30 – 14:30 · 18:30 – 23:00" },
  { day: "Samedi", service: "11:30 – 15:00 · 18:30 – 23:00" },
  { day: "Dimanche", service: "11:30 – 15:00" },
];

export type MenuItem = {
  name: string;
  detail: string;
  price: string;
  image: string;
};

export const MENU: { label: string; items: MenuItem[] }[] = [
  {
    label: "À la broche",
    items: [
      {
        name: "Poulet fermier entier",
        detail: "Élevé plein air, mariné 24 h, doré 2 h sur la broche",
        price: "19",
        image: "/images/poulets-rotis.png",
      },
      {
        name: "Demi-poulet & grenailles confites",
        detail: "Pommes de terre confites dans le jus de rôtisserie",
        price: "13",
        image: "/images/poulets-rotis.png",
      },
      {
        name: "Brochettes de poulet mariné",
        detail: "Marinade paprika fumé, citron confit, herbes du marché",
        price: "12",
        image: "/images/anais.png",
      },
    ],
  },
  {
    label: "Les incontournables",
    items: [
      {
        name: "Poulet pané maison",
        detail: "Chapelure au piment d’Espelette, sauce dodue",
        price: "9",
        image: "/images/equipe.png",
      },
      {
        name: "Burger de poulet",
        detail: "Pain brioché, tomme des Pyrénées, oignons rouges",
        price: "11",
        image: "/images/equipe.png",
      },
      {
        name: "Wrap poulet César",
        detail: "Sucrine croquante, parmesan, anchois, croûtons",
        price: "11",
        image: "/images/illu-table.png",
      },
      {
        name: "Pilons croustillants",
        detail: "Six pilons laqués au miel du Pays basque",
        price: "9",
        image: "/images/equipe.png",
      },
    ],
  },
  {
    label: "Les à-côtés",
    items: [
      {
        name: "Frites fraîches",
        detail: "Coupées le matin, deux bains, fleur de sel",
        price: "4",
        image: "/images/illu-facade.png",
      },
      {
        name: "Betterave, chèvre & noix",
        detail: "Roquette, chèvre frais, noix torréfiées, vinaigrette miel",
        price: "8",
        image: "/images/assiette-betterave.png",
      },
      {
        name: "Planche Tristorra & chorizo",
        detail: "Charcuterie basque à partager, cornichons maison",
        price: "6",
        image: "/images/bache-fetes.png",
      },
      {
        name: "Gâteau basque à la cerise",
        detail: "Pâte sablée, confiture d’Itxassou, crème fouettée",
        price: "6",
        image: "/images/illu-table.png",
      },
    ],
  },
];

export const RITUAL = [
  {
    index: "01",
    title: "Le choix",
    text: "Des poulets fermiers élevés en plein air à moins de cent kilomètres de la rue Pannecau. On les connaît par leur prénom, ou presque.",
    image: "/images/anais.png",
    caption: "Anaïs, en cuisine dès 7 h",
  },
  {
    index: "02",
    title: "La marinade",
    text: "Vingt-quatre heures dans un bain de piment d’Espelette, d’ail confit, de thym et de citron. Le temps fait le travail, on ne le presse jamais.",
    image: "/images/poulets-rotis.png",
    caption: "Marinade 24 h, paprika fumé",
  },
  {
    index: "03",
    title: "La broche",
    text: "Deux heures de rotation lente. Le jus tombe sur les grenailles posées dessous : c’est là que tout se passe, et ça ne se raconte pas.",
    image: "/images/poulets-rotis.png",
    caption: "Grenailles confites au jus",
  },
  {
    index: "04",
    title: "Le comptoir",
    text: "Sur place entre les carreaux rouges, ou emballé dans du papier kraft pour la maison. La cantine reste une cantine : simple et généreuse.",
    image: "/images/devanture.png",
    caption: "46 rue Pannecau, Petit Bayonne",
  },
];

export const GALLERY = [
  {
    src: "/images/devanture.png",
    label: "La devanture",
    meta: "Rue Pannecau",
  },
  {
    src: "/images/poulets-rotis.png",
    label: "Sortie de broche",
    meta: "11 h 45",
  },
  {
    src: "/images/equipe.png",
    label: "La brigade",
    meta: "Avant le service",
  },
  {
    src: "/images/assiette-betterave.png",
    label: "Betterave & chèvre",
    meta: "Ardoise du jour",
  },
  {
    src: "/images/bache-fetes.png",
    label: "Fêtes de Bayonne",
    meta: "Édition 2026",
  },
  {
    src: "/images/enseigne.png",
    label: "L’enseigne",
    meta: "Vert sage & brique",
  },
  {
    src: "/images/affiche-ripaille.png",
    label: "Ripaille",
    meta: "11 & 12.09",
  },
];

export const REVIEWS = [
  {
    author: "Dora Dubau",
    when: "il y a 2 mois",
    visit: "Visité en juin",
    text: "Excellent restaurant ! Nous avons été très bien accueillis. Tous les plats sont faits maison et préparés avec beaucoup de soin et d’amour. Je recommande sans hésiter !",
  },
  {
    author: "Laurie Bonillo",
    when: "il y a 4 mois",
    visit: "Visité en mai",
    text: "De passage sur Bayonne, nous nous sommes arrêtés par hasard dans ce petit restaurant un peu hors de la ville. Une très belle surprise, on y reviendra les yeux fermés.",
  },
  {
    author: "Louise Biarnès",
    when: "il y a 4 mois",
    visit: "Visité en mai",
    text: "Super découverte ! Cette rôtisserie vient tout juste d’ouvrir ses portes, l’accueil est très chaleureux !! J’ai pris un plat à emporter, cuisine absolument délicieuse !",
  },
];

export const NAV_LINKS = [
  { label: "La maison", href: "#maison" },
  { label: "Le rituel", href: "#rituel" },
  { label: "La carte", href: "#carte" },
  { label: "Anaïs", href: "#anais" },
  { label: "Nous trouver", href: "#infos" },
];
