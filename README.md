<!-- markdownlint-disable MD022 MD031 MD032 MD034 MD040 -->

# MaxPC - Site Web Professionnel

Site web moderne et responsive pour MaxPC, micro-entreprise spécialisée dans la réparation, montage, optimisation et dépannage de PC à Lannion.

## 📋 Contenu du site

### Pages
- **Accueil (index.html)** : Hero section, présentation rapide, atouts clés
- **Services (services.html)** : Détail complet de tous les services proposés
- **À propos (apropos.html)** : Présentation du technicien, approche, zones d'intervention
- **Contact (contact.html)** : Formulaire de contact, informations, FAQ

### Menu de navigation
- Accueil
- Services
- À propos
- Contact (bouton CTA visible)

## 🎨 Design & Style

**Palette de couleurs :**
- Bleu primaire : #1e40af (professionnel, confiance)
- Bleu foncé : #1e3a8a
- Bleu clair : #3b82f6
- Gris : #64748b, #f1f5f9
- Blanc : #ffffff

**Typographie :**
- Police: Poppins (moderne, lisible)
- Responsive sur tous les appareils

**Icônes :**
- Font Awesome 6.4.0 (50+ icônes informatique)

## 📱 Responsive

- ✓ Desktop (1200px+)
- ✓ Tablette (769px - 1199px)
- ✓ Mobile (jusqu'à 768px)
- ✓ Petit mobile (jusqu'à 480px)

Menu hamburger automatique sur mobile.

## 🚀 Fonctionnalités

### Navigation
- Menu fixe en haut
- Navigation fluide entre pages
- Menu mobile hamburger
- Indicateur de page active
- Smooth scroll

### Formulaire de contact
- Validation côté client
- Champs: Nom, Email, Téléphone, Sujet, Message
- Message de confirmation après envoi
- Gestion des erreurs
- Console log des données (à connecter à email backend)

### CTA (Call-to-Action)
- Boutons visibles sur toutes les pages
- Lien vers formulaire de contact
- Boutons WhatsApp, Email, Téléphone

### Performance
- Lazy loading des images (prêt)
- Animation au scroll
- Transitions fluides
- Optimisé pour SEO

## 📂 Structure des fichiers

```
MaxiPc/
├── index.html          # Page d'accueil
├── services.html       # Services détaillés
├── apropos.html        # À propos du technicien
├── contact.html        # Formulaire de contact
├── styles.css          # Stylisation (complète et responsive)
├── script.js           # Interactions JavaScript
└── README.md           # Ce fichier
```

## 🔧 Installation & Utilisation

### Local
1. Télécharger ou cloner le dossier MaxiPc
2. Ouvrir `index.html` dans un navigateur
3. C'est tout! Le site fonctionne entièrement en statique

### Serveur (recommandé)
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js et http-server
npm install -g http-server
http-server

# Puis accéder à: http://localhost:8000
```

## 📋 SEO & Métadonnées

**Métadonnées présentes :**
- Meta description personnalisée par page
- Meta keywords
- Titre optimisé (MaxPC – Réparation et montage PC à Lannion)
- Structure hiérarchique des titres (H1, H2, H3)
- Semantic HTML5

## 📞 Informations de contact

À personnaliser dans les fichiers HTML :
- Email: maxence@maxpc.fr
- Téléphone: +33 6 26 45 38 49
- Zone: Lannion et environs

## 🔐 Formulaire de contact

**Options pour la mise en production :**

1. **Email (simple)**
   - Utiliser FormSubmit.co ou Formspree
   - Modifier l'attribut `action` du formulaire

2. **Backend custom (Node.js)**
   ```javascript
   // Exemple avec Express + Nodemailer
   ```

3. **CMS/Plateforme (simple)**
   - Netlify Forms
   - Vercel + API

4. **Service email (recommandé)**
   - Brevo (ex Sendinblue)
   - Mailgun

## 🎯 Call-to-Action (CTA)

- "Demandez un devis" (primaire)
- "Découvrir nos services"
- Présent sur chaque page
- Visible et contrastant

## 🌍 Intégrations futures

Pour améliorer le site :
- [ ] Google Maps (zone d'intervention)
- [ ] Google Analytics
- [ ] Avis clients (Google, Trustpilot)
- [ ] Blog pour SEO
- [ ] Portfolio de réparations avant/après
- [ ] Calendrier de disponibilité
- [ ] Chatbot pour assistance
- [ ] WhatsApp Business API

## ⭐ Avis clients (manuel)

Le site affiche les avis depuis le fichier `reviews.json`.

### Mise à jour des avis
- Ouvrir `reviews.json`
- Mettre à jour `updated_at`
- Ajuster `place.rating` et `place.user_ratings_total`
- Ajouter/modifier les objets dans `reviews`

### Affichage
- La page d'accueil lit `reviews.json`
- Aucun secret GitHub ni clé API n'est nécessaire

## 🔔 Notifications admin (email + SMS)

Les nouvelles réservations/commandes peuvent notifier le propriétaire via une fonction Supabase Edge `notify-owner`.

### Déploiement de la fonction

```bash
supabase functions deploy notify-owner --project-ref leuebqwdubzwkjhieqsk
```

### Secrets requis (Supabase)

```bash
supabase secrets set \
   RESEND_API_KEY=... \
   OWNER_EMAIL=... \
   NOTIFY_FROM_EMAIL="MaxiPC Notifications <noreply@ton-domaine.fr>" \
   TWILIO_ACCOUNT_SID=... \
   TWILIO_AUTH_TOKEN=... \
   TWILIO_FROM_PHONE=+1XXXXXXXXXX \
   OWNER_PHONE_E164=+33XXXXXXXXX
```

### Fonctionnement

- Lors d'une réservation, le site appelle `functions/v1/notify-owner`
- Lors d'une commande boutique, le site appelle aussi `functions/v1/notify-owner`
- La fonction envoie un e-mail (Resend) + un SMS (Twilio)

## 📊 Pages & Sections

### Accueil
1. **Hero** : Titre, sous-titre, CTA, image
2. **À propos** : Intro rapide
3. **Atouts** : 3 points clés avec icônes
4. **CTA** : Appel à action
5. **Footer** : Navigation, contact

### Services
1. **Header** : Titre page
2. **Services grid** : 6 services avec descriptions et bénéfices
3. **Tarifs CTA** : Invitation devis
4. **Footer**

### À propos
1. **Header** : Titre page
2. **À propos** : Bio du technicien, approche
3. **Zone d'intervention** : Lannion et environs
4. **Pourquoi MaxPC** : 6 raisons avec icônes
5. **CTA** : Demander devis
6. **Footer**

### Contact
1. **Header** : Titre page
2. **Formulaire** : 6 champs + bouton
3. **Infos** : 4 cartes (téléphone, email, zone, service)
4. **Social** : Boutons WhatsApp, Email, Téléphone
5. **FAQ** : 4 questions fréquentes
6. **Footer**

## 🛠️ Maintenance

### Mettre à jour les informations
- Email: Chercher `maxence@maxpc.fr`
- Téléphone: Chercher `+33626453849`
- Adresse: Chercher `Lannion`

### Ajouter une page
1. Dupliquer une page `.html`
2. Modifier le contenu
3. Ajouter le lien dans la nav
4. Mettre à jour les meta descriptions

## 📝 Checklist avant mise en ligne

- [ ] Vérifier tous les liens fonctionnent
- [ ] Tester sur mobile/tablette/desktop
- [ ] Vérifier le formulaire envoie les emails
- [ ] Ajouter Google Analytics
- [ ] Configurer Google Search Console
- [ ] Ajouter favicon
- [ ] Tester vitesse (PageSpeed Insights)
- [ ] Vérifier SEO (HubSpot, Yoast)
- [ ] Mettre à jour URLs réseaux sociaux
- [ ] Configurer domaine

## 📞 Support

Pour toute question sur le code ou le site :
- Vérifier les commentaires dans le code
- Consulter la documentation HTML/CSS
- Tester dans la console navigateur (F12)

---

**Créé pour MaxPC - Réparation de PC à Lannion**
*Site professionnel, moderne et responsive*
