# 🚀 Guide d'Installation Rapide - MaxiPC v2.0

## ⚡ Installation en 5 Minutes

### Étape 1 : Vérifier la Structure ✅

Assurez-vous que vous avez bien ces nouveaux fichiers :

```
✅ scripts/navigation.js
✅ scripts/forms.js
✅ scripts/animations.js
✅ scripts/reviews.js
✅ styles/variables.css
✅ styles/base.css
✅ styles/reviews.css
✅ styles/styles-modular.css
```

### Étape 2 : Configurer Google Analytics 📊

**index.html** (ligne ~27) :
```html
<!-- Remplacer XXXXXXXXXX par votre ID GA4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-VOTRE-ID-ICI"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-VOTRE-ID-ICI'); <!-- Ici aussi ! -->
</script>
```

**Où trouver votre ID ?**
1. Aller sur [analytics.google.com](https://analytics.google.com)
2. Créer une propriété GA4
3. Copier l'ID (format: G-XXXXXXXXXX)

### Étape 3 : Tester Localement 🧪

```bash
# Option 1 : Python
python -m http.server 8000

# Option 2 : Node.js
npx http-server

# Option 3 : VS Code
# Installer l'extension "Live Server" et clic droit > Open with Live Server
```

Ouvrir : http://localhost:8000

### Étape 4 : Vérifier le Fonctionnement ✓

#### Test Navigation
- [ ] Cliquer sur le menu hamburger (mobile)
- [ ] Vérifier que le menu se ferme en cliquant dehors
- [ ] Tester la touche Escape
- [ ] Vérifier que la page active est highlightée

#### Test Formulaire
- [ ] Aller sur contact.html
- [ ] Remplir le formulaire
- [ ] Vérifier que le message s'envoie
- [ ] Vérifier le message de succès/erreur

#### Test Avis Clients
- [ ] Scroll jusqu'à la section "Avis clients"
- [ ] Vérifier que les 4 avis s'affichent
- [ ] Vérifier les étoiles et animations

#### Test Animations
- [ ] Scroll sur la page d'accueil
- [ ] Vérifier le fade-in des cartes
- [ ] Vérifier le bouton "Retour en haut"

### Étape 5 : Appliquer aux Autres Pages 📄

```powershell
# Windows PowerShell
cd "C:\Users\User\OneDrive\DEV\Projets\MaxiPc"
.\tools\apply-optimizations.ps1
```

Ce script va :
- ✅ Ajouter `defer` aux scripts
- ✅ Ajouter Google Analytics
- ✅ Ajouter `loading="lazy"` aux images

---

## 🔧 Configuration Avancée

### Activer les Modules CSS (Optionnel)

**Dans chaque page HTML**, remplacer :
```html
<link rel="stylesheet" href="styles.css">
```

Par :
```html
<link rel="stylesheet" href="styles/styles-modular.css">
<link rel="stylesheet" href="styles.css">
```

### Ajouter Structured Data

**Dans index.html**, avant `</head>` :
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "MaxiPC",
  "telephone": "+33682186791",
  "email": "lefrancmaxence8@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Pontivy",
    "addressCountry": "FR"
  }
}
</script>
```

Voir `structured-data-snippets.html` pour plus d'exemples.

---

## 🧪 Tests de Validation

### 1. Test Lighthouse

```bash
# Installer Lighthouse
npm install -g lighthouse

# Lancer l'audit
lighthouse http://localhost:8000 --view

# Ou en ligne
# https://pagespeed.web.dev/
```

**Objectifs :**
- Performance : > 90
- Accessibility : > 95
- Best Practices : > 95
- SEO : > 95

### 2. Test Accessibilité

**Extensions Chrome :**
- [axe DevTools](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)
- [WAVE](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)

**Test Clavier :**
1. Utiliser uniquement Tab, Enter, Escape
2. Vérifier que tout est accessible
3. Vérifier le focus visible

### 3. Test Responsive

**Dans Chrome DevTools :**
1. F12 > Toggle Device Toolbar (Ctrl+Shift+M)
2. Tester :
   - iPhone SE (375x667)
   - iPad (768x1024)
   - Desktop (1920x1080)

---

## 📊 Monitoring

### Google Analytics

**Tableaux de bord à créer :**
1. **Conversions**
   - Réservations
   - Formulaires de contact
   - Clics téléphone

2. **Comportement**
   - Pages vues
   - Temps sur page
   - Taux de rebond

3. **Acquisition**
   - Sources de trafic
   - Recherche organique
   - Réseaux sociaux

### Google Search Console

**À vérifier régulièrement :**
- Core Web Vitals
- Erreurs d'indexation
- Performances de recherche
- Liens entrants

---

## ⚠️ Troubleshooting

### Les scripts ne se chargent pas
```html
<!-- Vérifier que le defer est bien là -->
<script src="scripts/navigation.js" defer></script>

<!-- Vérifier les chemins -->
<!-- Si dans un sous-dossier, ajuster : -->
<script src="../scripts/navigation.js" defer></script>
```

### EmailJS ne fonctionne pas
```javascript
// Vérifier la clé publique dans forms.js
emailjs.init({
    publicKey: 'c4iw2Wxz3QnEZYi7S' // Vérifier que c'est la bonne
});

// Vérifier les IDs de service et template
emailjs.send('service_m3logoe', 'template_bqxnfpb', ...)
```

### Les avis ne s'affichent pas
```javascript
// Vérifier dans la console (F12)
console.log('Reviews loaded'); // Doit apparaître

// Vérifier que l'élément existe
<div id="googleReviewsList"></div>
```

### Lighthouse score bas
1. **Performance :** Minifier CSS/JS, optimiser images
2. **Accessibility :** Vérifier contrastes, ARIA
3. **SEO :** Ajouter structured data
4. **Best Practices :** Enlever les console.log

---

## 📦 Déploiement sur GitHub Pages

### 1. Commit des changements
```bash
git add .
git commit -m "✨ v2.0: Performance, Accessibilité, Analytics"
git push origin main
```

### 2. Vérifier le déploiement
- Attendre 2-3 minutes
- Aller sur https://maxencelefranc.github.io/maxipc/
- Tester toutes les fonctionnalités

### 3. Vérifier Google Analytics
- Aller sur [analytics.google.com](https://analytics.google.com)
- Temps réel > Vue d'ensemble
- Vérifier que les visites sont trackées

---

## ✅ Checklist Post-Installation

- [ ] Google Analytics configuré et testé
- [ ] Scripts modulaires chargés correctement
- [ ] Avis clients s'affichent
- [ ] Formulaire de contact fonctionne
- [ ] Navigation clavier OK
- [ ] Lighthouse > 90/95/95/95
- [ ] Tests sur mobile réel
- [ ] Déployé sur GitHub Pages
- [ ] Google Search Console vérifié

---

## 🎉 C'est Terminé !

Votre site MaxiPC est maintenant :
- ⚡ **Plus rapide** (lazy loading, defer)
- ♿ **Plus accessible** (ARIA complet)
- 📊 **Trackable** (Google Analytics)
- 💬 **Plus crédible** (avis clients)
- 🎨 **Mieux organisé** (modules)

### Ressources Utiles
- 📖 [OPTIMIZATIONS.md](OPTIMIZATIONS.md) - Guide complet
- ✅ [LIGHTHOUSE-CHECKLIST.md](LIGHTHOUSE-CHECKLIST.md) - Audit
- 📊 [RAPPORT-OPTIMISATIONS.md](RAPPORT-OPTIMISATIONS.md) - Rapport détaillé
- 🔧 [structured-data-snippets.html](structured-data-snippets.html) - SEO

### Support
Questions ? 📧 lefrancmaxence8@gmail.com

---

**Version :** 2.0  
**Date :** Mars 2026  
**Temps d'installation :** ~5-10 minutes
