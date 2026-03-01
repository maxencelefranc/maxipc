# 🚀 Guide Rapide - Utiliser les Composants MaxiPC

Bienvenue! Ce guide vous montre comment utiliser la nouvelle bibliothèque de composants.

---

## ⚡ Démarrage Rapide

### 1. Les CSS à importer

Chaque page HTML doit importer:
```html
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="styles/variables.css">
<link rel="stylesheet" href="styles/base.css">
<link rel="stylesheet" href="styles/components.css">
```

### 2. Les Composants Principaux

| Composant | Classe | Usage |
|-----------|--------|-------|
| Bouton | `.btn .btn-primary` | `<a href="#" class="btn btn-primary">Cliquez</a>` |
| Carte | `.card` | `<div class="card"><div class="card-body">...` |
| Grille | `.grid .grid-auto` | `<div class="grid grid-auto">...` |
| Badge | `.badge .badge-primary` | `<span class="badge badge-primary">Tag</span>` |
| Icône | `.icon .icon-lg` | `<div class="icon icon-lg"><i class="fas fa-...">` |
| Alerte | `.alert .alert-info` | `<div class="alert alert-info">Message` |
| Entrée | `.input` | `<input type="text" class="input">` |

---

## 🎨 Boutons

### Variantes

```html
<!-- Couleurs -->
<button class="btn btn-primary">Primaire</button>
<button class="btn btn-secondary">Secondaire</button>
<button class="btn btn-accent">Accent</button>
<button class="btn btn-ghost">Ghost (transparent)</button>

<!-- Tailles -->
<button class="btn btn-primary btn-sm">Petit</button>
<button class="btn btn-primary">Normal</button>
<button class="btn btn-primary btn-lg">Grand</button>

<!-- Spécial -->
<button class="btn btn-primary btn-full">Largeur 100%</button>
<a href="#" class="btn btn-primary">Lien styled</a>
```

### Exemple Réel
```html
<div class="mb-3">
  <a href="contact.html" class="btn btn-primary">Demander un devis</a>
  <a href="reservation.html" class="btn btn-secondary">Réserver</a>
</div>
```

---

## 🃏 Cartes

### Structure Standard

```html
<div class="card">
  <div class="card-body">
    <h3>Titre</h3>
    <p>Contenu...</p>
  </div>
</div>
```

### Variantes

```html
<!-- Avec header/footer -->
<div class="card">
  <div class="card-header">
    <h3>Titre</h3>
  </div>
  <div class="card-body">Contenu</div>
  <div class="card-footer">
    <a href="#">Lien</a>
  </div>
</div>

<!-- Avec gradient -->
<div class="card card-gradient">
  <div class="card-body">Contenu special</div>
</div>

<!-- Highlight -->
<div class="card card-highlight">
  <div class="card-body">Important!</div>
</div>
```

### Exemple Réel - Card avec Icône
```html
<div class="card card-gradient">
  <div class="card-body text-center">
    <div class="icon icon-lg icon-primary mb-3">
      <i class="fas fa-tools"></i>
    </div>
    <h3>Dépannage Rapide</h3>
    <p>Service express en moins de 24h</p>
  </div>
</div>
```

---

## 📊 Grilles

### Types

```html
<!-- Auto-responsive -->
<div class="grid grid-auto gap-3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- 2 colonnes -->
<div class="grid grid-2 gap-3">
  <!-- ... -->
</div>

<!-- 3 colonnes -->
<div class="grid grid-3 gap-3">
  <!-- ... -->
</div>

<!-- 4 colonnes -->
<div class="grid grid-4 gap-3">
  <!-- ... -->
</div>

<!-- 1 colonne (full width) -->
<div class="grid grid-1 gap-3">
  <!-- ... -->
</div>
```

### Espacements

```html
<!-- gap: espacement entre items -->
<div class="grid grid-auto gap-2">  <!-- petit gap -->
<div class="grid grid-auto gap-3">  <!-- medium gap -->
<div class="grid grid-auto gap-4">  <!-- large gap -->
```

### Exemple Réel
```html
<section class="services-section">
  <div class="container">
    <h2>Nos Services</h2>
    <div class="grid grid-auto gap-4">
      <div class="card card-gradient"><!-- Service 1 --></div>
      <div class="card card-gradient"><!-- Service 2 --></div>
      <div class="card card-gradient"><!-- Service 3 --></div>
    </div>
  </div>
</section>
```

---

## 🏷️ Badges

### Variantes

```html
<!-- Couleurs -->
<span class="badge badge-primary">Primaire</span>
<span class="badge badge-secondary">Secondaire</span>
<span class="badge badge-accent">Accent</span>
<span class="badge badge-ghost">Ghost</span>

<!-- Tailles -->
<span class="badge badge-primary badge-sm">Petit</span>
<span class="badge badge-primary">Normal</span>
<span class="badge badge-primary badge-lg">Grand</span>

<!-- Avec icône -->
<span class="badge badge-primary">
  <i class="fas fa-star"></i> Recommandé
</span>
```

### Exemple Réel
```html
<div class="card">
  <div class="card-body">
    <span class="badge badge-accent mb-2">⭐ FEATURED</span>
    <h3>Pack Premium</h3>
    <p>Service complet avec garantie</p>
  </div>
</div>
```

---

## 🎯 Icônes

### Classes

```html
<!-- Tailles -->
<div class="icon icon-sm"><i class="fas fa-star"></i></div>
<div class="icon"><i class="fas fa-star"></i></div>
<div class="icon icon-lg"><i class="fas fa-star"></i></div>

<!-- Couleurs -->
<div class="icon icon-primary"><i class="fas fa-star"></i></div>
<div class="icon icon-secondary"><i class="fas fa-star"></i></div>
<div class="icon icon-accent"><i class="fas fa-star"></i></div>
<div class="icon icon-outline"><i class="fas fa-star"></i></div>
```

### Exemple Réel
```html
<div class="flex align-center gap-3">
  <div class="icon icon-lg icon-primary">
    <i class="fas fa-phone"></i>
  </div>
  <div>
    <h4>Téléphone</h4>
    <p>+33 6 82 18 67 91</p>
  </div>
</div>
```

---

## 📝 Formulaires

### Inputs

```html
<!-- Simple input -->
<input type="text" class="input" placeholder="Votre nom">

<!-- Avec groupe -->
<div class="input-group">
  <label for="email" class="input-label">Email *</label>
  <input type="email" id="email" class="input" required>
</div>

<!-- Select -->
<select class="input">
  <option>Choisir...</option>
  <option>Option 1</option>
</select>

<!-- Textarea -->
<textarea class="input" rows="5"></textarea>

<!-- States -->
<input type="text" class="input input-error" placeholder="Erreur">
<input type="text" class="input input-success" placeholder="Succès">
```

### Exemple Complet
```html
<form class="contact-form">
  <div class="input-group">
    <label for="name" class="input-label">Nom *</label>
    <input type="text" id="name" class="input" required>
  </div>

  <div class="input-group">
    <label for="email" class="input-label">Email *</label>
    <input type="email" id="email" class="input" required>
  </div>

  <div class="input-group">
    <label for="message" class="input-label">Message *</label>
    <textarea id="message" class="input" rows="5" required></textarea>
  </div>

  <button type="submit" class="btn btn-primary btn-full">Envoyer</button>
</form>
```

---

## ⚠️ Alertes

### Types

```html
<!-- Info -->
<div class="alert alert-info">
  Information importante
</div>

<!-- Succès -->
<div class="alert alert-success">
  ✓ Opération réussie!
</div>

<!-- Erreur -->
<div class="alert alert-error">
  ✗ Une erreur s'est produite
</div>

<!-- Avertissement -->
<div class="alert alert-warning">
  ⚠ Attention!
</div>
```

### Avec Icônes
```html
<div class="alert alert-success">
  <i class="fas fa-check-circle"></i> 
  Message de succès
</div>
```

---

## 🎛️ Utilitaires

### Spacing

```html
<!-- Margin -->
<div class="mt-1">Margin top petit</div>
<div class="mt-2">Margin top medium</div>
<div class="mt-3">Margin top large</div>
<div class="mt-4">Margin top XL</div>
<div class="mt-5">Margin top XXL</div>

<!-- Padding -->
<div class="p-2">Padding 2</div>
<div class="p-3">Padding 3</div>
<div class="p-4">Padding 4</div>

<!-- Margin bottom, left, right: mb-*, ml-*, mr-* -->
<div class="mb-3">Margin bottom</div>
```

### Text

```html
<!-- Alignment -->
<p class="text-left">Left</p>
<p class="text-center">Center</p>
<p class="text-right">Right</p>

<!-- Sizes -->
<p class="text-sm">Small text</p>
<p class="text-base">Base text</p>
<p class="text-lg">Large text</p>
<p class="text-xl">XL text</p>
<p class="text-2xl">2XL text</p>

<!-- Weight -->
<p class="font-bold">Bold</p>
<p class="font-semibold">Semibold</p>
<p class="font-normal">Normal</p>

<!-- Colors -->
<p class="text-primary">Primary color</p>
<p class="text-secondary">Secondary color</p>
<p class="text-success">Success green</p>
<p class="text-error">Error red</p>
```

### Flex Utilities

```html
<!-- Flex -->
<div class="flex">Horizontal layout</div>
<div class="flex flex-column">Vertical layout</div>

<!-- Alignment -->
<div class="flex align-center">Vertical center</div>
<div class="flex flex-space-between">Space between items</div>

<!-- Gap -->
<div class="flex gap-2">Items avec gap petit</div>
<div class="flex gap-3">Items avec gap medium</div>
<div class="flex gap-4">Items avec gap large</div>
```

---

## 🔗 Ressources

### Fichiers à Consulter

1. **styles/components.css** - Définitions complètes des composants
2. **COMPONENTS-GUIDE.md** - Documentation détaillée (420 lignes)
3. **components/showcase.html** - Galerie interactive
4. **OPTIMIZATIONS.md** - Guide des optimisations

### Exemples Live

Consultez:
- [apropos.html](apropos.html) - Cartes + Badges
- [contact.html](contact.html) - Formulaires + Grilles
- [services.html](services.html) - Cards avec Icônes
- [components/showcase.html](components/showcase.html) - Tous les composants

---

## ⚡ Tips & Tricks

### 1. Réutiliser une Card
```html
<!-- Copier-coller cette structure -->
<div class="card card-gradient">
  <div class="card-body text-center">
    <div class="icon icon-lg icon-primary mb-3">
      <i class="fas fa-something"></i>
    </div>
    <h3>Titre</h3>
    <p>Description</p>
  </div>
</div>
```

### 2. Grille avec Cards
```html
<div class="grid grid-auto gap-4">
  <div class="card">...card 1...</div>
  <div class="card">...card 2...</div>
  <div class="card">...card 3...</div>
</div>
```

### 3. Section avec Titre + Grille
```html
<section class="section">
  <div class="container">
    <h2 class="text-center mb-4">Notre Section</h2>
    <div class="grid grid-3 gap-4">
      <div class="card">...item 1...</div>
      <div class="card">...item 2...</div>
      <div class="card">...item 3...</div>
    </div>
  </div>
</section>
```

---

## ✅ Checklist avant Deploy

- ✅ Importer tous les CSS modulaires
- ✅ Utiliser `.btn` pour tous les boutons
- ✅ Utiliser `.card` pour les conteneurs
- ✅ Utiliser `.grid` pour les layouts
- ✅ Utiliser `.badge` pour les tags
- ✅ Utiliser `.icon` pour les icônes
- ✅ Utiliser `.alert` pour les messages
- ✅ Tester sur mobile (responsive)
- ✅ Vérifier tous les liens
- ✅ Valider le HTML

---

## 🆘 Problèmes Courants

### Les styles ne s'appliquent pas
✅ Vérifiez que les 4 CSS sont importées en ordre:
1. styles.css (main)
2. styles/variables.css
3. styles/base.css
4. styles/components.css

### Les couleurs ne correspondent pas
✅ Utilisez les classes prédéfinies: `primary`, `secondary`, `accent`, `ghost`

### La grille n'est pas responsive
✅ Utilisez `.grid-auto` pour une grille responsive automatique

### Les boutons ne sont pas visibles
✅ Assurez-vous d'utiliser la classe `.btn` + une couleur (`.btn-primary`, etc.)

---

## 📞 Questions?

Consultez la **COMPONENTS-GUIDE.md** pour plus de détails!

**Bon développement! 🚀**
