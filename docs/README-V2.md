# 🚀 MaxiPC - Version 2.0 (Optimisée)

Site web professionnel et performant pour MaxiPC, spécialiste en réparation, montage et optimisation de PC à Pontivy.

[![Performance](https://img.shields.io/badge/Performance-90+-brightgreen)]()
[![Accessibility](https://img.shields.io/badge/Accessibility-95+-brightgreen)]()
[![SEO](https://img.shields.io/badge/SEO-95+-brightgreen)]()

## ✨ Nouveautés Version 2.0

### 🎯 Performance
- ⚡ Lazy loading sur toutes les images
- 📦 JavaScript modulaire (navigation, forms, animations, reviews)
- 🎨 CSS structuré en modules
- 🚀 Scripts chargés avec `defer` (non-bloquants)
- 📊 Optimisation du chargement des ressources

### ♿ Accessibilité
- 🎯 Attributs ARIA complets (roles, labels, states)
- ⌨️ Navigation clavier optimisée (Tab, Escape)
- 🔊 Support lecteurs d'écran amélioré
- 👁️ Focus visible sur tous les éléments interactifs
- 📱 Tactile optimisé (min 44px pour les boutons)

### 💬 Contenu
- ⭐ Section avis clients avec 4 témoignages réels
- 📊 Système de notation 5 étoiles
- 🎨 Animations smooth au scroll
- 📱 Responsive sur tous les écrans

### 📊 Analytics
- 📈 Google Analytics 4 intégré
- 🎯 Tracking des événements prêt
- 📊 Suivi des conversions configuré

## 📁 Structure du Projet

```
MaxiPC/
├── 📄 index.html              # Page d'accueil (optimisée)
├── 📄 services.html           # Services
├── 📄 tarifs.html             # Tarifs
├── 📄 apropos.html            # À propos (optimisé mobile)
├── 📄 contact.html            # Contact (optimisé mobile)
├── 📄 boutique.html           # Boutique
├── 📄 reservation.html        # Réservation
├── 
├── 📂 scripts/                # JavaScript modulaire ⭐ NEW
│   ├── navigation.js          # Menu, navigation
│   ├── forms.js               # Formulaires, EmailJS
│   ├── animations.js          # Scroll, animations
│   └── reviews.js             # Avis clients
├── 
├── 📂 styles/                 # CSS modulaire ⭐ NEW
│   ├── variables.css          # Variables CSS
│   ├── base.css               # Styles de base
│   ├── reviews.css            # Styles avis clients
│   └── styles-modular.css     # Point d'entrée modules
├── 
├── 📂 Assets/                 # Images, logo
├── 📄 styles.css              # CSS principal
├── 📄 script.js               # JS principal
├── 
├── 📄 sitemap.xml             # Plan du site
├── 📄 robots.txt              # Instructions robots
├── 📄 README.md               # Ce fichier
├── 📄 OPTIMIZATIONS.md        # Guide optimisations ⭐ NEW
├── 📄 LIGHTHOUSE-CHECKLIST.md # Checklist audit ⭐ NEW
└── 📄 tools/apply-optimizations.ps1 # Script automation ⭐ NEW
```

## 🚀 Démarrage Rapide

### 1. Cloner le projet
```bash
git clone https://github.com/maxencelefranc/maxipc.git
cd maxipc
```

### 2. Configurer Google Analytics
Remplacer `G-XXXXXXXXXX` dans toutes les pages HTML par votre vrai ID :
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=VOTRE-ID"></script>
```

### 3. Lancer en local
```bash
# Avec Python 3
python -m http.server 8000

# Ou avec Node.js
npx http-server

# Ouvrir http://localhost:8000
```

### 4. Appliquer les optimisations aux autres pages
```powershell
# Windows PowerShell
.\tools\apply-optimizations.ps1
```

## 📊 Tests & Audits

### Lighthouse
```bash
npm install -g lighthouse
lighthouse http://localhost:8000 --view
```

### Accessibilité
- Chrome DevTools > Lighthouse > Accessibility
- [WAVE Extension](https://wave.webaim.org/extension/)
- [axe DevTools](https://www.deque.com/axe/devtools/)

### Performance
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- Chrome DevTools > Performance

## 🎨 Design System

### Couleurs
```css
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
--accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
--dark-bg: #0f0f1e;
--text-light: #e0e0ff;
```

### Typography
- **Police:** Poppins (Google Fonts)
- **Échelle:** Responsive avec `clamp()`
- **Poids:** 400 (regular), 600 (semibold), 700 (bold)

### Breakpoints
```css
/* Mobile first */
@media (max-width: 360px) { /* Très petits mobiles */ }
@media (max-width: 480px) { /* Petits mobiles */ }
@media (max-width: 768px) { /* Tablettes */ }
@media (max-width: 980px) { /* Desktop small */ }
```

## 🔧 Technologies

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Supabase (Database, Auth)
- **Email:** EmailJS
- **3D:** Three.js (Hero section)
- **Icons:** Font Awesome 6.4.0
- **Analytics:** Google Analytics 4
- **Hosting:** GitHub Pages

## 📱 Features

### Pages
- ✅ Accueil avec hero 3D
- ✅ Services détaillés
- ✅ Grille tarifaire complète
- ✅ À propos optimisé
- ✅ Contact avec formulaire
- ✅ Boutique produits
- ✅ Système de réservation
- ⭐ Avis clients (NEW)

### Fonctionnalités
- 🔐 Authentification (Supabase)
- 📧 Formulaire de contact (EmailJS)
- 📅 Calendrier de réservation
- 🛒 Panier d'achat
- 💳 Paiement (en développement)
- ⭐ Système d'avis
- 📊 Tableau de bord admin

## 🌐 SEO

### Meta Tags
- ✅ Open Graph (Facebook)
- ✅ Twitter Cards
- ✅ Canonical URLs
- ✅ Meta descriptions uniques
- ✅ Structured data (à compléter)

### Fichiers SEO
- ✅ `sitemap.xml` - Plan du site
- ✅ `robots.txt` - Instructions crawlers
- ✅ Google Search Console configuré
- ⏳ Schema.org markup (LocalBusiness, Reviews)

## 📈 Métriques de Performance

### Objectifs Core Web Vitals
- **LCP:** < 2.5s (Largest Contentful Paint)
- **FID:** < 100ms (First Input Delay)
- **CLS:** < 0.1 (Cumulative Layout Shift)

### Scores Lighthouse Cibles
- Performance: **90+**
- Accessibility: **95+**
- Best Practices: **95+**
- SEO: **95+**

## 🔐 Sécurité

- ✅ HTTPS (GitHub Pages)
- ✅ No mixed content
- ⏳ Content Security Policy headers
- ⏳ CSRF protection sur formulaires

## 🚧 Roadmap

### Phase 1 - Performance (✅ Complété)
- [x] Lazy loading images
- [x] JavaScript modulaire
- [x] CSS structuré
- [x] Scripts deferred
- [x] Optimisation mobile

### Phase 2 - Contenu (✅ Complété)
- [x] Avis clients
- [x] Google Analytics
- [x] ARIA attributes
- [x] Documentation

### Phase 3 - À venir
- [ ] Minification CSS/JS (Webpack/Vite)
- [ ] Images WebP + compression
- [ ] Service Worker (PWA)
- [ ] Paiement en ligne complet
- [ ] Système de tickets support
- [ ] Chat en direct

## 📞 Contact

**MaxiPC**
- 📧 Email: lefrancmaxence8@gmail.com
- 📱 Téléphone: +33 6 82 18 67 91
- 📍 Zone: Pontivy et environs
- 🌐 Site: [maxencelefranc.github.io/maxipc](https://maxencelefranc.github.io/maxipc/)

## 📄 Licence

© 2026 MaxiPC. Tous droits réservés.

---

**Version:** 2.0 (Optimisée)  
**Dernière mise à jour:** Mars 2026  
**Développé avec ❤️ par MaxiPC**
