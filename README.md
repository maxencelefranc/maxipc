<!-- markdownlint-disable MD022 MD031 MD032 MD034 MD040 -->

# MaxiPC - Site Web Professionnel

Site web pour MaxiPC, micro-entreprise spécialisée dans la réparation, montage, optimisation et dépannage de PC à Lannion. Au-delà de la vitrine, le site inclut réservation en ligne, boutique, espace client et back-office admin, appuyés sur Supabase.

## 📋 Contenu du site

### Pages publiques
- **Accueil (index.html)** : Hero (avec animation 3D sur desktop), présentation, atouts, avis Google
- **Services (services.html)** : Détail complet des services proposés
- **Tarifs (tarifs.html)** : Packs principaux + services à la carte, promotions dynamiques
- **À propos (apropos.html)** : Présentation du technicien, approche, zones d'intervention
- **Contact (contact.html)** : Formulaire (Turnstile), informations, FAQ
- **Boutique (boutique.html)** : Composants et prestations à la commande
- **Réservation (reservation.html)** : Calendrier de disponibilité + formulaire de réservation
- **Mon espace (my-reservations.html)** : Suivi des réservations/commandes du client connecté
- **Connexion (auth.html)** : Inscription / connexion (Supabase Auth)
- **Mentions légales, CGV, Confidentialité, Cookies** : pages légales

### Back-office
- **admin.html** : réservations, commandes, contenu du site, promotions, avis — réservé aux comptes listés dans la table `admin_users` (policies RLS Supabase, pas un simple contrôle côté client)

## 🎨 Design & Style

**Palette (thème sombre) :**
- Dégradé primaire : `#667eea → #764ba2`
- Dégradé secondaire : `#f093fb → #f5576c`
- Dégradé accent : `#4facfe → #00f2fe`
- Fond : `#0f0f1e` / `#1a1a2e`

**Typographie :** Poppins · **Icônes :** Font Awesome 6.4.0

## 📱 Responsive

- Desktop (1200px+), tablette, mobile (jusqu'à 768px), petit mobile (jusqu'à 480px)
- Menu hamburger dès 1100px (le menu complet déborderait sinon entre 769-1100px)
- L'animation 3D du hero (three.js + modèle `.glb`) ne se charge que sur desktop (>768px) pour ne pas peser sur le mobile

## 📂 Structure des fichiers (aperçu)

```
MaxiPc/
├── index.html, services.html, tarifs.html, apropos.html, contact.html
├── boutique.html, reservation.html, my-reservations.html, auth.html, admin.html
├── mentions-legales.html, cgv.html, politique-confidentialite.html, politique-cookies.html
├── styles.css              # Feuille de style principale (utilisée par toutes les pages)
├── styles/                 # Système modulaire (variables, base, components, reviews)
│                           #   chargé en plus de styles.css sur une partie des pages
├── script.js               # Toute la logique JS (nav, boutique, calendrier, admin, avis...)
├── scripts/                # navigation.js, forms.js, animations.js
├── supabase-config.js      # Client Supabase + helpers (auth, reservations, orders)
├── data/                   # reviews.json, shop-products.json
├── supabase/                # SETUP_DATABASE.sql, migrations, policies RLS
└── README.md
```

## 🔧 Installation & Utilisation

### Local
1. Cloner le dépôt
2. Servir le dossier avec un serveur statique (ouvrir `index.html` directement fonctionne aussi, mais certaines requêtes peuvent nécessiter http/https)

```bash
npx http-server -p 8000
# puis http://localhost:8000
```

### Backend
- **Supabase** : base de données + auth. Voir `supabase/SETUP_DATABASE.sql` pour le schéma et les policies RLS (reservations, orders, admin_users, site_content).
- **Formspree** : notifications du propriétaire à chaque réservation/commande (endpoint dans `reservation.html`).
- **Cloudflare Turnstile** : captcha sur les formulaires de réservation et contact.
- **Stripe** : pas d'intégration active actuellement (une tentative liée aux cours en ligne a été retirée — voir historique git si besoin de la réintroduire pour un autre usage).

## 📋 SEO & Métadonnées

- Meta description/OG/Twitter par page, canonical vers `https://maxipc.fr/`
- `sitemap.xml` et `robots.txt` à jour sur le domaine `maxipc.fr`
- Google Analytics (gtag) sur toutes les pages publiques

## 📞 Informations de contact

- Email : lefrancmaxence8@gmail.com
- Téléphone : +33 6 82 18 67 91
- Zone : Lannion et environs

## ⭐ Avis clients

Le site affiche les avis Google. Ils peuvent être mis à jour manuellement dans `data/reviews.json` ou via le back-office admin.

## 🩺 Vision — Le Passeport Santé du PC

Direction stratégique envisagée pour différencier MaxiPC d'un simple "dépannage informatique" (discussion du 2026-08-18) : positionner MaxiPC comme **« le médecin de votre ordinateur »**, avec une relation de suivi dans la durée plutôt qu'une intervention ponctuelle.

Trois éléments qui se renforcent mutuellement :

1. **Passeport Santé du PC** — chaque PC suivi a un dossier avec un numéro unique, un score MaxiPC `/100` par composant (CPU, GPU, SSD, RAM, températures, sécurité, alimentation), un historique d'interventions et des recommandations ("à prévoir"). Offre phare : **Bilan de Santé MaxiPC**.
2. **Contrôle Technique PC** — prestation vendue séparément (ex. 29,90-39,90 €, ou avec optimisation à 59,90 €), plus facile à vendre qu'un vague "diagnostic". Débouche naturellement sur réparation/optimisation/sauvegarde/sécurisation/suivi annuel.
3. **PC sauvés** — contenu marketing (avant/après de PC récupérés, format vidéo TikTok/Facebook) ; rejoint l'idée "Portfolio de réparations avant/après" déjà notée plus bas dans ce fichier.

**Principe de mise en œuvre : pas d'application au démarrage.** Commencer simple — fiche client, fiche PC, numéro unique, rapport PDF, QR code, historique — et n'envisager de l'outillage/automatisation qu'une fois un volume significatif de PC suivis (ex. 50-100+). Techniquement, ça s'appuierait sur une extension du modèle Supabase existant (nouvelle table `devices` liée au client, aux réservations et aux scores) plutôt que sur un nouveau système.

## 🌍 Intégrations futures

- [ ] Passeport Santé du PC (voir section Vision ci-dessus)
- [ ] Portfolio "PC sauvés" (avant/après)
- [ ] Blog pour SEO
- [ ] Chatbot pour assistance
- [ ] WhatsApp Business API

## 🛠️ Maintenance

### Mettre à jour les informations de contact
Chercher `lefrancmaxence8@gmail.com` et `+33682186791` dans les fichiers HTML.

### Ajouter une page
1. Dupliquer une page `.html` existante proche du besoin
2. Modifier le contenu et les meta
3. Ajouter le lien dans la nav **et** le footer de chaque page (pas de composant de nav partagé — à répercuter manuellement)

## 📝 Checklist avant mise en ligne

- [x] Google Analytics
- [x] Domaine configuré (maxipc.fr + CNAME GitHub Pages)
- [ ] Vérifier tous les liens fonctionnent
- [ ] Tester sur mobile/tablette/desktop
- [ ] Configurer Google Search Console
- [ ] Tester vitesse (PageSpeed Insights)

---

**MaxiPC - Réparation et montage de PC à Lannion**
