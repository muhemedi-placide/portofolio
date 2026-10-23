# Plan d'implémentation

Travail organisé en 4 lots livrables. Tout reste dans le style graphique existant (bleu nuit, doré, vert, beige, cartes arrondies).

## Prérequis backend

Activer **Lovable Cloud** (base de données + edge functions + envoi d'emails intégré). Pas besoin de compte externe ni de clé Resend à fournir : j'utilise l'infrastructure email native de Lovable, et les emails partiront depuis un sous-domaine vérifié automatiquement.

Si vous préférez utiliser votre propre domaine d'envoi (ex. `notify.muhemediplacide.com`), on pourra le configurer ensuite — sinon on garde le domaine par défaut Lovable.

## Lot 1 — Base de données & contact

**Tables créées (Lovable Cloud)**
- `contact_messages` : id, full_name, email, phone, project_type, estimated_budget, message, created_at
- `pricing_leads` : id, email, token (unique), token_expires_at, unlocked_at, source_page, consent_newsletter, created_at

RLS activé. Insertion publique autorisée (formulaire anonyme), lecture réservée au service role uniquement.

**Page Contact**
- Formulaire enrichi (ajout des champs Téléphone, Type de projet, Budget estimatif déjà absents) avec validation Zod.
- Server function `submitContact` : valide → insère dans `contact_messages` → envoie email vers `muhemediplacide2011@gmail.com` via Lovable Emails.
- Message de confirmation : *« Merci pour votre message. Votre demande a bien été envoyée. Je vous répondrai rapidement. »*

## Lot 2 — Tarifs verrouillés + déverrouillage par email

**Affichage**
- Page Tarificataire : descriptions, inclusions, conditions visibles. Montants remplacés par badge doré **« ••• ••• FBu — Montant verrouillé »**.
- Les vrais montants ne sont **jamais** envoyés au client tant que le token n'est pas validé (server fn qui ne retourne les prix qu'après vérification).

**Bloc déverrouillage** (au-dessus de la grille)
- Texte exact demandé.
- Champ email + case à cocher consentement newsletter (non cochée par défaut) + bouton **Déverrouiller les tarifs**.

**Flux**
1. Server fn `requestPricingUnlock({ email, consent })` → validation Zod → crée un token (`crypto.randomUUID()` + hash), expiration +24h, insertion `pricing_leads` → envoie email.
2. Email reçu : objet **« Votre accès à la grille tarifaire »**, contenu exact demandé, bouton vers `/tarificataire?unlock_token=...`
3. Au chargement de `/tarificataire` avec `unlock_token`, server fn `verifyPricingToken` retourne les prix réels uniquement si valide + non expiré, et marque `unlocked_at`.
4. Token expiré → message : *« Ce lien a expiré. Veuillez entrer à nouveau votre email pour recevoir un nouveau lien d'accès. »*

**Sécurité**
- Validation côté client (Zod) et serveur.
- Protection anti-spam basique : 1 demande / email / 5 minutes.
- Token unique, à usage de lecture seulement, expirant à 24h.

## Lot 3 — Articles : pages détail + images

**Routes**
- Nouvelle route `/actualites/$slug` (TanStack file route : `src/routes/actualites.$slug.tsx`).
- Chaque article gagne : `slug`, `image`, `content` (corps complet en plusieurs paragraphes), `category`, `date` dans `src/content/site.ts`.

**Page détail**
- Image principale en hero, titre, date, catégorie, contenu, bouton « ← Retour aux actualités », section « Articles similaires » (3 cartes basées sur la catégorie).
- Bouton **Lire plus** sur les cartes Actualités → `<Link to="/actualites/$slug">`.

**Images professionnelles**
- 4 images générées (premium tier pour fidélité) sauvegardées dans `src/assets/articles/` :
  1. Tableau de bord gestion de magasin
  2. Entrepreneur + logiciel de gestion
  3. Développeur / maintenance / sécurité
  4. E-commerce moderne (panier, paiement)

## Lot 4 — Nouvelles sections design

**Accueil — « Pourquoi me choisir ? »** (après les services)
- Sous-titre + 4 cartes (Service rapide / Solution personnalisée / Accompagnement / Vision résultat) + bouton **Discuter de mon projet** → `/contact`.

**Tarificataire — « Plus qu'un tarif : un accompagnement »** (après les cartes de prix)
- Texte d'intro + 3 blocs (Conseil stratégique / Visibilité et conversion / Suivi professionnel).

## Détails techniques

- Stack : TanStack Start + Lovable Cloud (Supabase managé) + Lovable Emails (pas de clé Resend nécessaire).
- Server functions dans `src/lib/*.functions.ts` ; clients Supabase via `requireSupabaseAuth` non requis (endpoints publics) — j'utilise le client publishable côté serveur + RLS « insert only » sur les deux tables, et un endpoint admin (service role chargé dynamiquement) uniquement pour la vérification du token et la lecture des prix.
- Aucun montant tarifaire n'est inclus dans le bundle client : les prix vivent dans une table `pricing_items` (ou retournés depuis un fichier `*.server.ts` non importé côté client) lus uniquement après validation du token.
- Désabonnement newsletter : champ `consent_newsletter` stocké ; lien d'unsubscribe géré par l'infra Lovable Emails sur les futurs envois marketing.

## Points à confirmer

1. OK pour utiliser **Lovable Cloud + Lovable Emails** (zéro configuration de votre côté, emails envoyés depuis un sous-domaine Lovable au début) ?
2. OK pour que les **vrais montants** soient stockés côté serveur uniquement (jamais dans le code frontend) ?
3. Pour le **contenu détaillé des 4 articles** : je rédige un contenu professionnel cohérent avec les titres existants, ou vous souhaitez fournir les textes ?

