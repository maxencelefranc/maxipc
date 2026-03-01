# MaxPC Website

Site web professionnel pour MaxPC - Réparation et montage de PC à Lannion.

**URL**: [À mettre à jour après déploiement]

## 🌟 Caractéristiques

- 📱 **Responsive Design** - Fonctionne sur tous les appareils (mobile, tablette, desktop)
- 🎨 **Design Modern** - Palette bleu/gris/blanc, UI propre et professionnelle
- 🔧 **Facile à maintenir** - HTML/CSS/JavaScript pur (pas de dépendances)
- ⚡ **Performant** - Chargement rapide, optimisé pour SEO
- 📋 **Formulaire de contact** - Avec validation et confirmation
- 🎯 **CTA optimisé** - "Demandez un devis" visible sur toutes les pages

## 📂 Structure du projet

```
├── index.html           # Page d'accueil
├── services.html        # Services détaillés
├── apropos.html         # À propos du technicien
├── contact.html         # Formulaire de contact
├── styles.css           # Styles CSS (responsive)
├── script.js            # Interactions JavaScript
├── README.md            # Documentation complète
├── .gitignore           # Fichiers à ignorer
└── LICENSE              # Licence MIT
```

## 🚀 Démarrage rapide

### Local
```bash
# Cloner le repository
git clone https://github.com/votre-username/maxpc.git
cd maxpc

# Ouvrir dans le navigateur
# Option 1: Double-cliquer sur index.html
# Option 2: Lancer un serveur local
python -m http.server 8000
# Puis accéder à http://localhost:8000
```

### Déploiement

Le site est prêt pour être déployé sur plusieurs plateformes :

#### GitHub Pages (gratuit)
1. Aller à Settings → Pages
2. Sélectionner "Deploy from a branch"
3. Branch: `main`, Folder: `/ (root)`
4. Le site sera accessible à: `https://votre-username.github.io/maxpc`

#### Netlify (gratuit + custom domain)
1. Connecter le repository GitHub
2. Build command: (laisser vide)
3. Publish directory: (laisser vide)
4. Deploy!

#### Vercel (gratuit)
1. Importer le repository
2. Deploy automatique

## 📝 Configuration

Avant de mettre en ligne, personnaliser:

- **Email/Téléphone**: Dans tous les fichiers `.html`
  - Email: `maxence@maxpc.fr` → votre email
  - Téléphone: `+33626453849` → votre numéro

- **Adresse**: Ajouter votre adresse complète pour Google Maps

- **Favicon**: Ajouter `<link rel="icon" href="favicon.ico">` dans le `<head>`

- **Google Analytics**: Ajouter le script GA4 dans le `<head>`

## 🔧 Intégrations

### Formulaire de contact

Actuellement, le formulaire affiche un message de succès côté client. Pour envoyer des emails:

**Option 1: Formspree** (recommandé, gratuit)
```html
<form action="https://formspree.io/f/votre-form-id" method="POST">
  <!-- champs du formulaire -->
</form>
```

**Option 2: EmailJS** (JavaScript côté client)
```javascript
emailjs.init("votre-public-key");
emailjs.send("service_id", "template_id", formData);
```

**Option 3: Backend custom** (Node.js + Nodemailer)

## 📊 Optimisation SEO

Vérifié:
- ✅ Meta descriptions personnalisées
- ✅ Titre optimisé pour chaque page
- ✅ Structure HTML sémantique
- ✅ Mobile-friendly
- ✅ Fast loading times
- ✅ Internal linking

À ajouter pour SEO avancé:
- Google Search Console
- Google Analytics 4
- Sitemap.xml
- robots.txt
- Schema.org structured data

## 📱 Browsers Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 📄 Licence

MIT License - Voir le fichier LICENSE

## 📞 Support

Pour des questions ou améliorations, consultez la documentation dans README.md

---

**MaxPC - Réparation et montage de PC à Lannion**
Créé avec ❤️ pour les clients locaux
