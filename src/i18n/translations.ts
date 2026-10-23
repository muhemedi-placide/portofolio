import type { Lang } from "./context";

/**
 * English overrides for short, data-driven strings that pages read from
 * `src/content/site.ts`. Keyed by the exact French source string.
 * Falls back to the French source when no English entry exists.
 */
const EN: Record<string, string> = {
  // Nav
  Accueil: "Home",
  Galerie: "Gallery",
  Tarificataire: "Pricing",
  Actualités: "News",
  Contact: "Contact",

  // Profile
  "Concepteur & développeur de logiciels": "Software designer & developer",
  "ICT Manager chez DEN & FILS en France": "ICT Manager at DEN & FILS in France",
  "Freelance à distance": "Freelance, remote",
  "Depuis 2018": "Since 2018",
  "Bac +3 en Computer Science": "Bachelor's degree in Computer Science",
  "Master en Génie et Conception de Logiciels": "Master's degree in Software Engineering & Design",

  // Services
  "Site web vitrine / blog": "Showcase website / blog",
  "Site de présentation, blog, actualités, galerie et formulaire de contact.":
    "Presentation site, blog, news, gallery and contact form.",
  "Système de gestion standard": "Standard management system",
  "Gestion de magasin, station, hôtel, bar, restaurant, pharmacie, stock, ventes, rapports et e-commerce selon le niveau du projet.":
    "Management of shops, stations, hotels, bars, restaurants, pharmacies, stock, sales, reports and e-commerce depending on project scope.",
  "Système institutionnel complexe": "Complex institutional system",
  "Gestion d'hôpital, gestion scolaire, gestion d'établissement, paiements, dossiers, utilisateurs, rôles et rapports avancés.":
    "Hospital, school and institution management, payments, records, users, roles and advanced reports.",

  // Approche
  "Analyse claire du besoin": "Clear needs analysis",
  "Une écoute attentive pour comprendre votre activité et définir une solution adaptée.":
    "Careful listening to understand your business and design a suitable solution.",
  "Développement professionnel": "Professional development",
  "Des solutions simples, sécurisées, évolutives et faciles à utiliser au quotidien.":
    "Simple, secure, scalable solutions that are easy to use every day.",
  "Suivi et maintenance après livraison": "Follow-up and maintenance after delivery",
  "Un accompagnement technique continu pour garantir stabilité et performance.":
    "Ongoing technical support to guarantee stability and performance.",

  // Why choose
  "Service rapide": "Fast delivery",
  "Je travaille avec une méthode claire pour livrer rapidement une solution propre, fonctionnelle et adaptée aux priorités du client.":
    "I work with a clear method to quickly deliver a clean, functional solution aligned with the client's priorities.",
  "Solution simple et personnalisée": "Simple, tailored solution",
  "Chaque projet est conçu selon le besoin réel de l'utilisateur, avec une interface facile à comprendre et agréable à utiliser.":
    "Every project is designed around real user needs, with an interface that is easy to understand and pleasant to use.",
  "Accompagnement après livraison": "Post-delivery support",
  "Je reste disponible après la livraison pour aider le client à bien utiliser son système, corriger les petits problèmes et améliorer progressivement la solution.":
    "I remain available after delivery to help the client use the system, fix small issues and gradually improve the solution.",
  "Vision orientée résultat": "Result-driven vision",
  "Mon objectif n'est pas seulement de créer un outil, mais d'aider le client à mieux organiser son activité, améliorer sa visibilité, fidéliser ses clients et transformer de simples visiteurs en clients potentiels.":
    "My goal is not only to build a tool but to help the client better organise their business, improve visibility, build loyalty and turn simple visitors into potential customers.",

  // Accompagnement
  "Conseil stratégique": "Strategic advice",
  "Je peux orienter le client sur la meilleure manière d'utiliser son site ou son logiciel pour atteindre ses objectifs.":
    "I can guide the client on the best way to use their site or software to reach their goals.",
  "Visibilité et conversion": "Visibility & conversion",
  "J'aide à réfléchir sur la manière d'attirer les visiteurs, présenter clairement les services et convertir un simple visiteur en client potentiel.":
    "I help think through how to attract visitors, clearly present services and turn a simple visitor into a potential customer.",
  "Suivi professionnel": "Professional follow-up",
  "Après la livraison, le client bénéficie d'un accompagnement technique pour garder sa solution stable, utile et évolutive.":
    "After delivery, the client benefits from ongoing technical support to keep the solution stable, useful and evolving.",

  // Pricing tiers
  Essentiel: "Starter",
  Pro: "Pro",
  Business: "Business",
  Institution: "Institution",
  "Le plus demandé": "Most Popular",
  "Présence en ligne simple": "Simple online presence",
  "Vitrine professionnelle complète": "Complete professional showcase",
  "Site + Système de gestion": "Website + Management system",
  "Plateforme sur mesure": "Tailor-made platform",
  "Une présence en ligne simple pour les très petits budgets.":
    "A simple online presence for very small budgets.",
  "La vitrine professionnelle complète pour attirer des clients 24 h/24.":
    "The complete professional showcase to attract clients 24/7.",
  "Site internet + système de gestion complet. Pilotez toute votre entreprise depuis un seul endroit.":
    "Website + full management system. Control your entire business from one place.",
  "Plateforme sur mesure pour les organisations multi-agences avec une gouvernance avancée.":
    "Tailor-made platform for multi-branch organizations with advanced governance.",
  "900 000 FBu": "900,000 FBu",
  "1 500 000 FBu": "1,500,000 FBu",
  "3 500 000 FBu": "3,500,000 FBu",
  "4 500 000 FBu": "4,500,000 FBu",
  "6 000 000 FBu": "6,000,000 FBu",
  // Starter features
  "Jusqu'à 3 pages professionnelles": "Up to 3 professional pages",
  "Formulaire de contact": "Contact form",
  "Design responsive": "Responsive design",
  "Référencement de base": "Basic SEO",
  "Nom de domaine & hébergement standard": "Domain & standard hosting",
  "Pas de blog, galerie ni intégration WhatsApp":
    "No blog, no gallery, no WhatsApp integration",
  // Pro features
  "Jusqu'à 10 pages": "Up to 10 pages",
  "Présentation des services et produits": "Service & product showcase",
  "Blog, actualités et galerie": "Blog, news & gallery",
  "Formulaire de contact + bouton WhatsApp": "Contact form + WhatsApp button",
  "Administration simple des contenus": "Easy content administration",
  "Design responsive et référencement": "Responsive design & SEO",
  // Business features
  "Tout le pack Pro": "Everything in Pro",
  "Tableau de bord en temps réel": "Real-time dashboard",
  "Gestion des ventes, achats et dépenses": "Sales, purchases & expense tracking",
  "Contrôle du stock avec alertes": "Stock management with alerts",
  "Gestion des clients et fournisseurs": "Customer & supplier management",
  "Caisse, factures et reçus": "Point of sale, invoices & receipts",
  "Rapports, statistiques et historique des opérations":
    "Reports, statistics & operation history",
  "Magasins, pharmacies, restaurants, hôtels, stations-service et PME":
    "Shops, pharmacies, restaurants, hotels, gas stations, SMEs",
  "Personnalisation, formation, déploiement et hébergement standard":
    "Personalization, training, deployment & standard hosting",
  // Institution features
  "Gestion multi-agences et multi-départements":
    "Multi-agency & multi-department management",
  "Tableaux de bord exécutifs en temps réel":
    "Executive real-time dashboards",
  "Suivi des performances et activités des équipes":
    "Team performance & activity tracking",
  "Workflows de validation et d'approbation":
    "Validation & approval workflows",
  "Rôles, permissions et journal d'audit":
    "Roles, permissions & audit logs",
  "Portails, rapports et modules personnalisés":
    "Custom portals, reports & modules",
  "Écoles, hôpitaux, institutions, distributeurs et grandes entreprises":
    "Schools, hospitals, institutions, distributors & large enterprises",
  "Étude fonctionnelle, développement sur mesure, migration, formation et accompagnement au lancement":
    "Functional study, custom development, migration, training & launch support",
  // CTAs
  Commencer: "Get Started",
  "Créer mon site professionnel": "Create My Professional Site",
  "Prendre le contrôle de mon entreprise": "Take Control of My Business",
  "Demander une consultation": "Request a Consultation",

  // Gallery categories & filters
  "Boutique en ligne": "Online store",
  "Logiciel de gestion": "Management software",
  "Finance & monnaie": "Finance & currency",
  "Gestion hôtelière": "Hospitality management",
  "Présence digitale": "Digital presence",

  // Article categories
  "Mise à jour": "Update",
  Conseil: "Advice",
  "Bonnes pratiques": "Best practices",
  "Projet en cours": "Work in progress",
};

export function translate(fr: string, lang: Lang): string {
  if (lang !== "en") return fr;
  return EN[fr] ?? fr;
}
