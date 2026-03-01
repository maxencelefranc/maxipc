# Checklist Audit Lighthouse - MaxiPC

## 🎯 Performance (Objectif: 90+)

### ✅ Fait
- [x] Lazy loading sur les images
- [x] Scripts avec attribut `defer`
- [x] Dimensions explicites des images (width/height)
- [x] Preconnect pour Google Fonts
- [x] Modules JavaScript séparés

### 📋 À faire
- [ ] **Minifier CSS/JS** - Utiliser un build tool (Webpack, Vite)
- [ ] **Optimiser les images** - Convertir en WebP, compresser
- [ ] **Activer la compression** - Gzip/Brotli sur le serveur
- [ ] **Mettre en cache les assets** - Headers Cache-Control
- [ ] **Réduire Three.js** - Ne charger que sur la page d'accueil
- [ ] **CDN** - Héberger les assets sur un CDN

### 🔍 À vérifier
```bash
# Test avec Lighthouse CLI
npm install -g lighthouse
lighthouse https://maxencelefranc.github.io/maxipc/ --view
```

---

## ♿ Accessibilité (Objectif: 95+)

### ✅ Fait
- [x] Attributs ARIA sur la navigation
- [x] `aria-label` sur les boutons
- [x] `aria-expanded` pour le menu
- [x] `aria-current="page"` pour la page active
- [x] `role` appropriés (navigation, menubar, button)
- [x] Focus visible amélioré
- [x] Navigation au clavier (Escape, Tab)

### 📋 À faire
- [ ] **Tester avec lecteur d'écran** - NVDA, JAWS, VoiceOver
- [ ] **Vérifier les contrastes** - Minimum 4.5:1 (texte normal)
- [ ] **Ajouter skip links** - "Aller au contenu principal"
- [ ] **Labels sur tous les champs** - Formulaires complets
- [ ] **Alt text descriptif** - Sur toutes les images significatives
- [ ] **Ordre de tabulation** - Logique et cohérent

### 🔍 Tests recommandés
- [ ] axe DevTools
- [ ] WAVE Extension
- [ ] Keyboard navigation complète
- [ ] Zoom 200% (lisibilité)

---

## 🔍 SEO (Objectif: 95+)

### ✅ Fait
- [x] Meta description sur toutes les pages
- [x] Balises Open Graph (og:)
- [x] Twitter Cards
- [x] Canonical URL
- [x] robots.txt
- [x] sitemap.xml
- [x] Google Search Console configuré

### 📋 À faire
- [ ] **Structured Data** - JSON-LD pour LocalBusiness, Reviews
- [ ] **Améliorer les meta descriptions** - Uniques, 150-160 caractères
- [ ] **Optimiser les titres** - H1 unique par page
- [ ] **Texte alternatif** - Descriptions riches en mots-clés
- [ ] **Schema.org markup** - Pour les avis, services, horaires
- [ ] **Améliorer la vitesse mobile** - Core Web Vitals

### 🔍 Structured Data JSON-LD
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "MaxiPC",
  "image": "https://maxencelefranc.github.io/maxipc/Assets/Logo.png",
  "@id": "https://maxencelefranc.github.io/maxipc/",
  "url": "https://maxencelefranc.github.io/maxipc/",
  "telephone": "+33682186791",
  "email": "lefrancmaxence8@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lannion",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.7325,
    "longitude": -3.4589
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "4"
  }
}
```

---

## 🏆 Best Practices (Objectif: 95+)

### ✅ Fait
- [x] HTTPS activé (GitHub Pages)
- [x] Pas de console.log en production (à nettoyer)
- [x] Images avec dimensions
- [x] Links avec `rel="noopener"` pour external

### 📋 À faire
- [ ] **Nettoyer console.log** - Retirer les logs de debug
- [ ] **Sécuriser les formulaires** - CSRF tokens
- [ ] **Content Security Policy** - Headers CSP
- [ ] **Permissions Policy** - Restreindre les APIs
- [ ] **HTTPS strict** - HSTS headers

---

## 📊 Core Web Vitals

### Métriques cibles
- **LCP** (Largest Contentful Paint): < 2.5s ✅
- **FID** (First Input Delay): < 100ms ✅
- **CLS** (Cumulative Layout Shift): < 0.1 ✅

### Outils de mesure
- Google Search Console (Rapport Core Web Vitals)
- PageSpeed Insights
- WebPageTest
- Chrome DevTools Lighthouse

---

## 🧪 Tests à effectuer

### Navigateurs
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (macOS/iOS)
- [ ] Samsung Internet (Android)

### Appareils
- [ ] Desktop (1920x1080, 1366x768)
- [ ] Tablette (iPad, Android)
- [ ] Mobile (iPhone, Android)
- [ ] Petit mobile (320px width)

### Connexions
- [ ] Fast 3G (simulation Chrome DevTools)
- [ ] Slow 3G
- [ ] Offline (PWA)

---

## 📝 Commandes utiles

```bash
# Audit Lighthouse complet
lighthouse https://maxencelefranc.github.io/maxipc/ \
  --output=html \
  --output-path=./lighthouse-report.html \
  --view

# Audit uniquement accessibilité
lighthouse https://maxencelefranc.github.io/maxipc/ \
  --only-categories=accessibility \
  --view

# Audit avec simulation mobile
lighthouse https://maxencelefranc.github.io/maxipc/ \
  --preset=mobile \
  --view

# Tester les Core Web Vitals
npx unlighthouse --site https://maxencelefranc.github.io/maxipc/
```

---

## 🎯 Score actuel vs Objectif

| Critère | Avant | Objectif | Après |
|---------|-------|----------|-------|
| Performance | ~75 | 90+ | ⏳ |
| Accessibilité | ~80 | 95+ | ⏳ |
| Best Practices | ~85 | 95+ | ⏳ |
| SEO | ~90 | 95+ | ⏳ |

---

**Note:** Effectuer l'audit après avoir appliqué toutes les optimisations et configuré Google Analytics.

**Date de création:** Mars 2026  
**Dernière mise à jour:** Mars 2026
