export const profile = {
  name: "Muhemedi Placide",
  title: "Concepteur & développeur de logiciels",
  position: "ICT Manager chez DEN & FILS en France",
  status: "Freelance à distance",
  since: "Depuis 2018",
  education: [
    "Bac +3 en Computer Science",
    "Master en Génie et Conception de Logiciels",
  ],
  email: "muhemediplacide2011@gmail.com",
  whatsapp: "+25765167979",
  linkedin: "https://www.linkedin.com/in/salumu-muhemedi-699806297",
};

import magasinImg from "@/assets/articles/magasin.jpg";
import entrepriseImg from "@/assets/articles/entreprise.jpg";
import maintenanceImg from "@/assets/articles/maintenance.jpg";
import ecommerceImg from "@/assets/articles/ecommerce.jpg";

import galleryEcommerce from "@/assets/gallery/ecommerce.png.asset.json";
import galleryMagasin from "@/assets/gallery/magasin.png.asset.json";
import galleryMonetaire from "@/assets/gallery/monetaire.png.asset.json";
import galleryVitrine from "@/assets/gallery/vitrine.png.asset.json";
import galleryHotel from "@/assets/gallery/hotel.png.asset.json";

export const services = [
  {
    title: "Site web vitrine / blog",
    description:
      "Site de présentation, blog, actualités, galerie et formulaire de contact.",
    icon: "Globe",
  },
  {
    title: "Système de gestion standard",
    description:
      "Gestion de magasin, station, hôtel, bar, restaurant, pharmacie, stock, ventes, rapports et e-commerce selon le niveau du projet.",
    icon: "LayoutDashboard",
  },
  {
    title: "Système institutionnel complexe",
    description:
      "Gestion d'hôpital, gestion scolaire, gestion d'établissement, paiements, dossiers, utilisateurs, rôles et rapports avancés.",
    icon: "Building2",
  },
];

export const approche = [
  {
    title: "Analyse claire du besoin",
    description:
      "Une écoute attentive pour comprendre votre activité et définir une solution adaptée.",
  },
  {
    title: "Développement professionnel",
    description:
      "Des solutions simples, sécurisées, évolutives et faciles à utiliser au quotidien.",
  },
  {
    title: "Suivi et maintenance après livraison",
    description:
      "Un accompagnement technique continu pour garantir stabilité et performance.",
  },
];

export type GalleryItem = {
  slug: string;
  title: string;
  category: string;
  description: string;
  filter: "sites" | "gestion" | "ecommerce" | "institution";
  image: string;
  client?: string;
  year?: string;
  stack?: string[];
  highlights?: string[];
  content?: string[];
};

export const gallery: GalleryItem[] = [
  {
    slug: "ecommerce-marche-peyi",
    title: "Marché Peyi — Plateforme e-commerce (France)",
    category: "Boutique en ligne",
    description:
      "Site e-commerce d'épicerie fine opérant en France : catalogue, panier, paiement, multi-devise et livraison rapide.",
    filter: "ecommerce",
    image: galleryEcommerce.url,
    client: "Marché Peyi — Épicerie fine",
    year: "2026",
    stack: ["React", "Node.js", "Stripe", "Base de données SQL"],
    highlights: [
      "Catalogue produits avec catégories et coffrets cadeaux",
      "Panier dynamique, codes promo et livraison offerte conditionnelle",
      "Paiement sécurisé, gestion multi-devise (EUR / USD) et thème clair/sombre",
      "Expédition sous 24h et suivi des commandes côté client",
    ],
    content: [
      "Marché Peyi est une boutique en ligne d'épicerie fine qui distribue des produits d'exception sur le marché français. L'objectif du projet était de proposer une expérience d'achat rapide, rassurante et adaptée aux attentes d'une clientèle européenne.",
      "La page d'accueil met en avant une bannière promotionnelle (livraison offerte dès 49€, code PEYI10) et un visuel produit chaleureux pour traduire immédiatement la promesse « 100% authentique ». Le parcours est volontairement court : Accueil, Produits, Coffrets, Contact.",
      "Le système gère le multi-devise (France / USD), un thème clair/sombre, un mini-panier persistant et une checkout sécurisée. Côté back-office, le commerçant suit ses commandes, son stock et ses clients depuis un tableau unique.",
      "Le site est optimisé mobile-first, accessible et pensé pour le référencement naturel afin de favoriser l'acquisition de nouveaux clients sur le marché français.",
    ],
  },
  {
    slug: "gestion-magasin-igeek",
    title: "IGEEK — Système de gestion de magasin électronique",
    category: "Logiciel de gestion",
    description:
      "Plateforme de gestion complète d'un magasin d'électronique : ventes, achats, stock, caisse, dépenses, dettes et rapports.",
    filter: "gestion",
    image: galleryMagasin.url,
    client: "IGEEK",
    year: "2026",
    stack: ["React", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    highlights: [
      "Tableau de bord temps réel : ventes du jour, semaine, mois et bénéfices",
      "Modules Ventes, Achats, Caisse, Banques, Dépenses et Dettes",
      "Alertes de stock faible et suivi de 198+ références",
      "Comparaison des performances et répartition des paiements (cash, mobile, etc.)",
    ],
    content: [
      "IGEEK est une boutique d'électronique qui avait besoin d'un outil unique pour piloter l'ensemble de son activité au quotidien. La solution livrée centralise les ventes, les achats, la caisse, les dépenses et les dettes dans une seule interface sombre, lisible et orientée action.",
      "Le tableau de bord met en avant les indicateurs essentiels : ventes du jour, ventes semaine, ventes mois, bénéfice, stock total, stock faible, dettes et dépenses. Tout est visible en un coup d'œil pour permettre au gérant de prendre les bonnes décisions sans perdre de temps.",
      "Les vendeurs accèdent à un module de vente rapide avec recherche produit, gestion client et impression de reçu. Les achats sont enregistrés avec leur prix d'entrée pour calculer automatiquement la marge réelle de chaque produit.",
      "Le module de rapports génère des bilans journaliers, hebdomadaires et mensuels exportables. La solution est sécurisée par rôles : caissier, vendeur, gestionnaire et administrateur disposent chacun de leurs propres droits.",
    ],
  },
  {
    slug: "gestion-monetaire-babu-gold",
    title: "Babu Gold — Gestion monétaire & taux en temps réel",
    category: "Finance & monnaie",
    description:
      "Control center pour bureau de change et gestion monétaire multi-devises avec dashboard verrouillé par code de sécurité.",
    filter: "institution",
    image: galleryMonetaire.url,
    client: "Babu Gold",
    year: "2026",
    stack: ["React", "TypeScript", "Lovable Cloud", "Sécurité par rôles"],
    highlights: [
      "Live dashboard journalier avec navigation par date",
      "Taux terrain configurable et conversion automatique CDF / USD",
      "Verrouillage des montants par code de sécurité administrateur",
      "Suivi des opérations, bénéfices, dettes et caisse jour par jour",
    ],
    content: [
      "Babu Gold est un acteur du change et de la gestion monétaire qui manipule quotidiennement plusieurs devises. La plateforme livrée — le « Babu Gold Control Center » — leur permet de suivre en temps réel chaque opération avec un haut niveau de confidentialité.",
      "Le dashboard est volontairement verrouillé : les montants ne s'affichent qu'après saisie d'un code de sécurité par l'administrateur. Cela évite l'exposition involontaire des chiffres à un tiers présent dans le bureau.",
      "L'interface propose une navigation par journée (Aujourd'hui, J-1, J-2…) pour reconstituer rapidement l'historique. Chaque journée affiche le total CDF, le total USD, les opérations, les dettes, les dépenses et le bénéfice net.",
      "Le taux terrain est configurable par l'administrateur et appliqué automatiquement à toutes les conversions. Le système est conçu pour rester clair, professionnel et rassurant, à l'image du secteur financier.",
    ],
  },
  {
    slug: "hotel-bar-resto",
    title: "Hôtel-Bar-Restaurant — Gestion opérationnelle complète",
    category: "Gestion hôtelière",
    description:
      "Pilotage complet d'un hôtel avec bar, restaurant et caisse : réservations, chambres, stock boissons, restauration et finances.",
    filter: "gestion",
    image: galleryHotel.url,
    client: "Hôtel partenaire",
    year: "2026",
    stack: ["React", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    highlights: [
      "Réception : taux d'occupation, chambres libres / occupées / réservées / maintenance",
      "Module Bar : stock boissons, ventes et alertes de rupture",
      "Module Restaurant : commandes, tables, comptes actifs",
      "Caisse nette du jour, flux financiers et dernières opérations en direct",
    ],
    content: [
      "Un hôtel moderne ne se résume pas à des chambres : il combine restauration, bar et caisse. Cette solution unifie ces trois métiers dans un seul tableau de bord opérationnel.",
      "Côté réception, le taux d'occupation est calculé en direct (par exemple 80% — 4 chambres sur 5). Les statuts Libres, Occupées, Réservées, Maintenance et En attente sont affichés sous forme de cartes colorées pour réagir vite.",
      "Le module Bar suit le stock boissons et déclenche des alertes en cas de rupture. Le module Restaurant gère les comptes actifs (clients en cours), les commandes et la facturation par table.",
      "Côté finance, la caisse nette du jour, les flux et les dernières opérations sont consolidés. Le manager dispose ainsi d'une vue 360° de l'établissement, sans changer d'application.",
    ],
  },
  {
    slug: "site-vitrine-muhemedi-placide",
    title: "Muhemedi Placide — Site vitrine personnel",
    category: "Présence digitale",
    description:
      "Site vitrine premium pour concepteur & développeur de logiciels : présentation, galerie, tarificataire, blog et contact.",
    filter: "sites",
    image: galleryVitrine.url,
    client: "Muhemedi Placide",
    year: "2026",
    stack: ["TanStack Start", "React", "Tailwind CSS", "Lovable Cloud"],
    highlights: [
      "Design éditorial bleu nuit / doré / vert — typographie serif premium",
      "Pages Accueil, Galerie, Tarificataire, Actualités, Contact",
      "Formulaire de contact relié à la base et notification email",
      "Mobile-first, SEO et Open Graph soignés sur chaque page",
    ],
    content: [
      "Ce site vitrine présente mon profil de concepteur et développeur de logiciels à des clients, entreprises et institutions. Il combine une identité graphique premium (bleu nuit, doré, vert) avec une mise en page éditoriale lisible.",
      "La page d'accueil ouvre sur une promesse claire : « Des logiciels simples, professionnels et adaptés à vos besoins », accompagnée d'une carte profil rassurante (formation, expérience, statut freelance).",
      "Le site couvre toutes les sections attendues : services, approche, galerie de réalisations, tarificataire transparent, actualités du blog et formulaire de contact connecté à la base de données.",
      "Il est pensé mobile-first, optimisé pour le référencement et déployé sur l'infrastructure Lovable Cloud pour garantir performance et disponibilité.",
    ],
  },
];

export const pricing = [
  {
    tier: "Essentiel",
    title: "Présence en ligne simple",
    type: "Une présence en ligne simple pour les très petits budgets.",
    price: "900 000 FBu",
    priceKes: 39000,
    features: [
      "Jusqu'à 3 pages professionnelles",
      "Formulaire de contact",
      "Design responsive",
      "Référencement de base",
      "Nom de domaine & hébergement standard",
    ],
    exclusion: "Pas de blog, galerie ni intégration WhatsApp",
    cta: "Commencer",
    accent: "green" as const,
    featured: false,
  },
  {
    tier: "Pro",
    title: "Vitrine professionnelle complète",
    type: "La vitrine professionnelle complète pour attirer des clients 24 h/24.",
    price: "1 500 000 FBu",
    priceKes: 65000,
    features: [
      "Jusqu'à 10 pages",
      "Présentation des services et produits",
      "Blog, actualités et galerie",
      "Formulaire de contact + bouton WhatsApp",
      "Administration simple des contenus",
      "Design responsive et référencement",
      "Nom de domaine & hébergement standard",
    ],
    cta: "Créer mon site professionnel",
    accent: "navy" as const,
    featured: false,
  },
  {
    tier: "Business",
    badge: "Le plus demandé",
    title: "Site + Système de gestion",
    type: "Site internet + système de gestion complet. Pilotez toute votre entreprise depuis un seul endroit.",
    price: "3 500 000 FBu",
    priceKes: 151000,
    originalPrice: "4 500 000 FBu",
    features: [
      "Tout le pack Pro",
      "Tableau de bord en temps réel",
      "Gestion des ventes, achats et dépenses",
      "Contrôle du stock avec alertes",
      "Gestion des clients et fournisseurs",
      "Caisse, factures et reçus",
      "Rapports, statistiques et historique des opérations",
    ],
    idealFor: "Magasins, pharmacies, restaurants, hôtels, stations-service et PME",
    includes: "Personnalisation, formation, déploiement et hébergement standard",
    cta: "Prendre le contrôle de mon entreprise",
    accent: "gold" as const,
    featured: true,
  },
  {
    tier: "Institution",
    title: "Plateforme sur mesure",
    type: "Plateforme sur mesure pour les organisations multi-agences avec une gouvernance avancée.",
    price: "6 000 000 FBu",
    priceKes: 259000,
    features: [
      "Gestion multi-agences et multi-départements",
      "Tableaux de bord exécutifs en temps réel",
      "Suivi des performances et activités des équipes",
      "Workflows de validation et d'approbation",
      "Rôles, permissions et journal d'audit",
      "Portails, rapports et modules personnalisés",
    ],
    idealFor: "Écoles, hôpitaux, institutions, distributeurs et grandes entreprises",
    includes: "Étude fonctionnelle, développement sur mesure, migration, formation et accompagnement au lancement",
    cta: "Demander une consultation",
    accent: "navy" as const,
    featured: false,
  },
];

export const faq: { q: { fr: string; en: string }; a: { fr: string; en: string } }[] = [
  {
    q: {
      fr: "Combien de temps faut-il pour créer mon site ou système ?",
      en: "How long does it take to build my website or system?",
    },
    a: {
      fr: "Le site Pro standard est livré en 5 à 7 jours ouvrés. Le pack Business prend généralement 10 à 14 jours, tandis que la plateforme Institution fait l'objet d'un calendrier défini après l'étude fonctionnelle.",
      en: "The standard Pro site is ready within 5 to 7 working days. The Business pack usually takes 10–14 days, while the Institution platform timeline is defined after the functional study.",
    },
  },
  {
    q: {
      fr: "Puis-je changer de pack plus tard ?",
      en: "Can I upgrade my pack later?",
    },
    a: {
      fr: "Bien sûr. Vous pouvez passer d'Essentiel à Pro, ou de Pro à Business à tout moment. Nous facturons uniquement la différence et migrons vos données sans interruption.",
      en: "Absolutely. You can move from Starter to Pro, or from Pro to Business at any time. We'll only charge the difference and migrate your data seamlessly.",
    },
  },
  {
    q: {
      fr: "Fournissez-vous une formation pour l'utilisation du système ?",
      en: "Do you provide training for managing the system?",
    },
    a: {
      fr: "Oui. Tous les packs à partir de Pro incluent une formation pratique. Les packs Business et Institution comprennent également un guide utilisateur détaillé et un support à distance le premier mois.",
      en: "Yes. All packs from Pro upwards include a hands-on training session. Business and Institution also come with a detailed user guide and remote support during the first month.",
    },
  },
  {
    q: {
      fr: "Quel type de support proposez-vous après la mise en ligne ?",
      en: "What kind of support do you offer after launch?",
    },
    a: {
      fr: "Tous les forfaits incluent l'hébergement standard et le support technique. Un support prioritaire et des contrats de maintenance étendue sont disponibles pour les clients Business et Institution.",
      en: "We provide standard hosting and technical support for all plans. Priority support and extended maintenance contracts are available for Business and Institution clients.",
    },
  },
  {
    q: {
      fr: "Y a-t-il des frais cachés ?",
      en: "Are there any hidden fees?",
    },
    a: {
      fr: "Non. Le prix affiché comprend le nom de domaine, l'hébergement standard et les fonctionnalités listées. Des personnalisations avancées sortant du cadre du pack feront l'objet d'un devis complémentaire si nécessaire.",
      en: "No. The price you see includes domain registration, standard hosting, and the features listed. Advanced customizations beyond the scope of the pack will be quoted separately if needed.",
    },
  },
];

export const pricingDetails = [
  {
    title: "Conception et main-d'œuvre",
    text: "Analyse du besoin, conception, développement, base de données, interfaces, tests, corrections, mise en ligne et formation de base.",
  },
  {
    title: "Hébergement standard inclus",
    text: "Nom de domaine, stockage standard, configuration technique de base et mise en ligne.",
  },
  {
    title: "Maintenance",
    text: "Assistance technique, petites corrections, mises à jour de sécurité, suivi du bon fonctionnement et accompagnement utilisateur.",
  },
  {
    title: "Conditions importantes",
    text: "Les nouvelles fonctionnalités, grands changements ou modules importants font l'objet d'un devis séparé. Le contrat de maintenance peut être négociable après une année de service.",
  },
];

export const articles = [
  {
    slug: "nouvelle-interface-magasin",
    title: "Nouvelle interface pour système de gestion de magasin",
    excerpt:
      "Amélioration de l'expérience utilisateur, du tableau de bord et du suivi des ventes.",
    date: "2026-05-12",
    category: "Mise à jour",
    icon: "Sparkles",
    image: magasinImg,
    content: [
      "Une bonne interface de gestion ne se contente pas d'afficher des chiffres : elle doit aider le commerçant à prendre rapidement les bonnes décisions au quotidien. C'est dans cet esprit que la nouvelle interface du système de gestion de magasin a été repensée.",
      "Le nouveau tableau de bord regroupe en un seul écran les indicateurs essentiels : ventes du jour, alertes de stock, produits les plus demandés et clients récents. Les informations sont organisées de manière claire pour que même un utilisateur non technique puisse comprendre la situation de son magasin en quelques secondes.",
      "Le suivi des ventes a également été amélioré. Chaque transaction est enregistrée avec son détail, et des rapports journaliers, hebdomadaires ou mensuels peuvent être générés en un clic. Les écarts de caisse, les retours et les dettes clients sont identifiés rapidement pour éviter les pertes.",
      "Côté stock, l'interface met en avant les produits proches de la rupture, les articles à rotation lente et les nouvelles entrées. Le commerçant garde ainsi le contrôle de son inventaire sans avoir à fouiller dans plusieurs écrans.",
      "Cette mise à jour s'accompagne d'optimisations techniques : chargement plus rapide, meilleure prise en charge des écrans mobiles, et une navigation plus fluide. Le but reste le même : offrir un outil simple, fiable et orienté vers la réussite de l'activité du client.",
    ],
  },
  {
    slug: "pourquoi-logiciel-de-gestion",
    title: "Pourquoi une entreprise a besoin d'un logiciel de gestion",
    excerpt:
      "Un logiciel bien conçu aide à suivre les ventes, le stock, les clients et les rapports avec plus de précision.",
    date: "2026-04-22",
    category: "Conseil",
    icon: "Lightbulb",
    image: entrepriseImg,
    content: [
      "Beaucoup d'entrepreneurs commencent leur activité avec un cahier, un tableau Excel ou des notes éparpillées. Cela fonctionne au début, mais devient vite un frein dès que l'activité grandit : informations perdues, erreurs de calcul, manque de visibilité sur les bénéfices réels.",
      "Un logiciel de gestion centralise toutes les opérations de l'entreprise au même endroit : ventes, achats, stock, clients, dépenses et rapports. L'information devient fiable, partagée entre les utilisateurs autorisés, et accessible à tout moment.",
      "Le suivi du stock devient précis : on sait ce qui entre, ce qui sort, ce qui reste, et on évite les ruptures comme les surstocks. Le suivi des clients permet de mieux connaître ses habitudes d'achat, de fidéliser les bons clients et de relancer ceux qui s'éloignent.",
      "Les rapports automatiques aident le dirigeant à comprendre la santé de son activité : chiffre d'affaires, marges, produits les plus rentables, charges réelles. Les décisions ne sont plus prises à l'aveugle, mais sur la base de chiffres clairs.",
      "Investir dans un logiciel de gestion, c'est gagner du temps, réduire les erreurs et professionnaliser son activité. C'est aussi préparer son entreprise à grandir sereinement, avec une organisation solide et durable.",
    ],
  },
  {
    slug: "maintenance-logicielle",
    title: "Maintenance logicielle : un élément essentiel après la livraison",
    excerpt:
      "La maintenance permet de garder le système sécurisé, stable et adapté aux besoins du client.",
    date: "2026-03-08",
    category: "Bonnes pratiques",
    icon: "Wrench",
    image: maintenanceImg,
    content: [
      "Livrer un logiciel n'est pas la fin du projet : c'est le début de sa vie réelle. Comme tout outil professionnel, un logiciel doit être entretenu pour rester sécurisé, performant et adapté à l'évolution de l'activité du client.",
      "La maintenance technique couvre plusieurs aspects : corrections de petits problèmes détectés à l'usage, mises à jour de sécurité, surveillance du bon fonctionnement, sauvegardes régulières et optimisations de performance.",
      "Sans maintenance, un logiciel finit par accumuler des dettes techniques : lenteurs, bugs récurrents, vulnérabilités exploitables. Pour une entreprise, cela peut signifier des pertes de données, des interruptions d'activité ou une perte de confiance des utilisateurs.",
      "La maintenance comprend aussi un volet humain : accompagner les utilisateurs, répondre à leurs questions, former de nouvelles personnes et adapter progressivement la solution aux nouveaux besoins de l'activité.",
      "C'est pour cela que mes contrats incluent toujours une période de maintenance après livraison. Le client n'est jamais laissé seul : il bénéficie d'un suivi technique régulier qui garantit la stabilité et la durabilité de sa solution.",
    ],
  },
  {
    slug: "module-ecommerce",
    title: "Préparation d'un nouveau module e-commerce",
    excerpt:
      "Travail sur le panier, les commandes, la livraison et le suivi client.",
    date: "2026-02-15",
    category: "Projet en cours",
    icon: "ShoppingCart",
    image: ecommerceImg,
    content: [
      "Le e-commerce ne se limite pas à mettre des produits en ligne : c'est tout un parcours pensé pour rassurer le client et l'amener naturellement vers l'achat. Le nouveau module e-commerce en préparation a été conçu autour de cette logique.",
      "Le panier est désormais plus clair : ajout, modification de quantité et suppression se font sans rechargement. Le client visualise immédiatement son total, les frais éventuels et les promotions appliquées. Le passage à la commande se fait en quelques étapes simples.",
      "Le suivi de commande a été renforcé : à chaque étape (validation, préparation, expédition, livraison), le client reçoit une mise à jour et peut consulter l'état de sa commande depuis son espace personnel. Côté gestion, le commerçant a un tableau unique pour suivre toutes les commandes en cours.",
      "La partie livraison intègre plusieurs options selon la zone : retrait en boutique, livraison à domicile, livraison rapide. Les frais et les délais sont calculés automatiquement pour éviter toute confusion au moment du paiement.",
      "Ce module sera proposé en option pour les sites vitrines existants et inclus dans les systèmes de gestion qui souhaitent ouvrir une activité en ligne. L'objectif est d'aider chaque client à transformer un simple visiteur en client fidèle.",
    ],
  },
];

export const whyChoose = [
  {
    title: "Service rapide",
    description:
      "Je travaille avec une méthode claire pour livrer rapidement une solution propre, fonctionnelle et adaptée aux priorités du client.",
    icon: "Zap",
  },
  {
    title: "Solution simple et personnalisée",
    description:
      "Chaque projet est conçu selon le besoin réel de l'utilisateur, avec une interface facile à comprendre et agréable à utiliser.",
    icon: "Heart",
  },
  {
    title: "Accompagnement après livraison",
    description:
      "Je reste disponible après la livraison pour aider le client à bien utiliser son système, corriger les petits problèmes et améliorer progressivement la solution.",
    icon: "LifeBuoy",
  },
  {
    title: "Vision orientée résultat",
    description:
      "Mon objectif n'est pas seulement de créer un outil, mais d'aider le client à mieux organiser son activité, améliorer sa visibilité, fidéliser ses clients et transformer de simples visiteurs en clients potentiels.",
    icon: "Target",
  },
];

export const accompagnement = [
  {
    title: "Conseil stratégique",
    description:
      "Je peux orienter le client sur la meilleure manière d'utiliser son site ou son logiciel pour atteindre ses objectifs.",
    icon: "Compass",
  },
  {
    title: "Visibilité et conversion",
    description:
      "J'aide à réfléchir sur la manière d'attirer les visiteurs, présenter clairement les services et convertir un simple visiteur en client potentiel.",
    icon: "TrendingUp",
  },
  {
    title: "Suivi professionnel",
    description:
      "Après la livraison, le client bénéficie d'un accompagnement technique pour garder sa solution stable, utile et évolutive.",
    icon: "ShieldCheck",
  },
];

export const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/galerie", label: "Galerie" },
  { to: "/tarificataire", label: "Tarificataire" },
  { to: "/actualites", label: "Actualités" },
  { to: "/contact", label: "Contact" },
] as const;
