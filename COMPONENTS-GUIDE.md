# 🎨 Guide d'Utilisation - Bibliothèque de Composants MaxiPC

## 📦 Installation

### 1. Importer les fichiers CSS

```html
<!-- Dans votre <head> -->
<link rel="stylesheet" href="styles/variables.css">
<link rel="stylesheet" href="styles/base.css">
<link rel="stylesheet" href="styles/components.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

### 2. Visualiser les composants

Ouvrir `components/showcase.html` dans votre navigateur pour voir tous les composants disponibles.

---

## 🎯 Composants Disponibles

### 1. **Boutons** (`.btn`)

#### Variantes
```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-accent">Accent</button>
<button class="btn btn-ghost">Ghost</button>
```

#### Tailles
```html
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Normal</button>
<button class="btn btn-primary btn-lg">Large</button>
```

#### Modificateurs
```html
<button class="btn btn-primary btn-full">Pleine largeur</button>
<button class="btn btn-primary" disabled>Désactivé</button>
```

#### Avec Icônes
```html
<button class="btn btn-primary">
    <i class="fas fa-rocket"></i> Réserver
</button>
```

---

### 2. **Cartes** (`.card`)

#### Carte Complète
```html
<div class="card">
    <div class="card-header">
        <h4 class="card-title">Titre</h4>
        <p class="card-subtitle">Sous-titre</p>
    </div>
    <div class="card-body">
        <p>Contenu de la carte...</p>
    </div>
    <div class="card-footer">
        <button class="btn btn-sm btn-primary">Action</button>
        <span class="text-muted">Info</span>
    </div>
</div>
```

#### Variantes
```html
<div class="card card-gradient">Avec gradient</div>
<div class="card card-highlight">Mise en avant</div>
```

#### Carte Simple
```html
<div class="card">
    <h3>Service Dépannage</h3>
    <p>Réparation rapide de votre PC</p>
</div>
```

---

### 3. **Badges** (`.badge`)

#### Variantes
```html
<span class="badge badge-primary">Nouveau</span>
<span class="badge badge-secondary">Important</span>
<span class="badge badge-accent">Promo</span>
<span class="badge badge-outline">En stock</span>
```

#### Tailles
```html
<span class="badge badge-primary badge-sm">Small</span>
<span class="badge badge-primary">Normal</span>
<span class="badge badge-primary badge-lg">Large</span>
```

#### Utilisation
```html
<h3>
    Offre Spéciale 
    <span class="badge badge-secondary badge-sm">-20%</span>
</h3>
```

---

### 4. **Gradients**

#### Backgrounds
```html
<div class="gradient-primary">Background primary</div>
<div class="gradient-secondary">Background secondary</div>
<div class="gradient-accent">Background accent</div>
```

#### Textes
```html
<h1 class="gradient-text-primary">Titre Gradient</h1>
<h2 class="gradient-text-secondary">Sous-titre</h2>
<p class="gradient-text-accent">Texte accentué</p>
```

#### Exemple Combiné
```html
<div class="card gradient-primary" style="padding: 3rem;">
    <h2 class="text-center">Offre Premium</h2>
    <p class="text-center">À partir de 99€</p>
</div>
```

---

### 5. **Icônes** (`.icon`)

#### Base
```html
<div class="icon icon-primary">
    <i class="fas fa-star"></i>
</div>
```

#### Variantes
```html
<div class="icon icon-primary">
    <i class="fas fa-tools"></i>
</div>
<div class="icon icon-secondary">
    <i class="fas fa-heart"></i>
</div>
<div class="icon icon-accent">
    <i class="fas fa-rocket"></i>
</div>
<div class="icon icon-outline">
    <i class="fas fa-shield-alt"></i>
</div>
```

#### Tailles
```html
<div class="icon icon-primary icon-sm">...</div>
<div class="icon icon-primary">...</div>
<div class="icon icon-primary icon-lg">...</div>
```

#### Dans une Card
```html
<div class="card text-center">
    <div class="icon icon-primary" style="margin: 0 auto 1rem;">
        <i class="fas fa-laptop"></i>
    </div>
    <h3>Dépannage PC</h3>
    <p class="text-muted">Rapide et efficace</p>
</div>
```

---

### 6. **Formulaires** (`.input`)

#### Champ Simple
```html
<div class="input-group">
    <label class="input-label">Nom</label>
    <input type="text" class="input" placeholder="Votre nom">
</div>
```

#### Formulaire Complet
```html
<form>
    <div class="input-group">
        <label class="input-label">Email *</label>
        <input type="email" class="input" placeholder="votre@email.com" required>
    </div>

    <div class="input-group">
        <label class="input-label">Téléphone</label>
        <input type="tel" class="input" placeholder="+33 6 12 34 56 78">
    </div>

    <div class="input-group">
        <label class="input-label">Message *</label>
        <textarea class="input" rows="5" placeholder="Décrivez votre besoin..." required></textarea>
    </div>

    <button type="submit" class="btn btn-primary btn-full">Envoyer</button>
</form>
```

#### États
```html
<!-- Erreur -->
<input type="text" class="input input-error" value="Invalide">

<!-- Succès -->
<input type="text" class="input input-success" value="Valide">
```

---

### 7. **Alertes** (`.alert`)

#### Types
```html
<!-- Succès -->
<div class="alert alert-success">
    <i class="fas fa-check-circle"></i>
    <span>Message envoyé avec succès!</span>
</div>

<!-- Erreur -->
<div class="alert alert-error">
    <i class="fas fa-exclamation-circle"></i>
    <span>Une erreur s'est produite.</span>
</div>

<!-- Avertissement -->
<div class="alert alert-warning">
    <i class="fas fa-exclamation-triangle"></i>
    <span>Attention requise.</span>
</div>

<!-- Information -->
<div class="alert alert-info">
    <i class="fas fa-info-circle"></i>
    <span>Information importante.</span>
</div>
```

---

### 8. **Containers**

```html
<!-- Container standard (1200px max) -->
<div class="container">
    <h1>Contenu</h1>
</div>

<!-- Container small (800px max) -->
<div class="container-sm">
    <article>...</article>
</div>

<!-- Container large (1400px max) -->
<div class="container-lg">
    <section>...</section>
</div>

<!-- Container fluid (100% width) -->
<div class="container-fluid">
    <header>...</header>
</div>
```

---

### 9. **Grille** (`.grid`)

#### Grilles Fixes
```html
<!-- 2 colonnes -->
<div class="grid grid-2">
    <div class="card">Item 1</div>
    <div class="card">Item 2</div>
</div>

<!-- 3 colonnes -->
<div class="grid grid-3">
    <div class="card">Item 1</div>
    <div class="card">Item 2</div>
    <div class="card">Item 3</div>
</div>

<!-- 4 colonnes -->
<div class="grid grid-4">
    <div class="card">Item 1</div>
    <div class="card">Item 2</div>
    <div class="card">Item 3</div>
    <div class="card">Item 4</div>
</div>
```

#### Grille Auto (Responsive)
```html
<!-- S'adapte automatiquement (min 280px par colonne) -->
<div class="grid grid-auto">
    <div class="card">Service 1</div>
    <div class="card">Service 2</div>
    <div class="card">Service 3</div>
    <div class="card">Service 4</div>
</div>
```

---

### 10. **Classes Utilitaires**

#### Espacement
```html
<!-- Margin Top -->
<div class="mt-1">0.5rem top</div>
<div class="mt-2">1rem top</div>
<div class="mt-3">1.5rem top</div>
<div class="mt-4">2rem top</div>
<div class="mt-5">3rem top</div>

<!-- Margin Bottom -->
<div class="mb-2">1rem bottom</div>

<!-- Padding -->
<div class="p-3">1.5rem padding</div>
```

#### Texte
```html
<!-- Alignement -->
<p class="text-center">Centré</p>
<p class="text-left">Gauche</p>
<p class="text-right">Droite</p>

<!-- Couleurs -->
<p class="text-light">Texte clair</p>
<p class="text-muted">Texte grisé</p>

<!-- Tailles -->
<p class="text-sm">Petit</p>
<p class="text-base">Normal</p>
<p class="text-lg">Grand</p>
<p class="text-xl">Très grand</p>
<p class="text-2xl">Énorme</p>

<!-- Poids -->
<p class="font-normal">Normal</p>
<p class="font-semibold">Semi-gras</p>
<p class="font-bold">Gras</p>
```

---

## 📱 Responsive

### Breakpoints

```css
/* Mobile first par défaut */
/* < 480px : Très petits mobiles */
/* < 768px : Tablettes et mobiles */
/* > 768px : Desktop */
```

### Classes Responsive

```html
<!-- Masquer sur mobile -->
<div class="hide-mobile">Visible uniquement sur desktop</div>

<!-- Bouton pleine largeur sur mobile -->
<button class="btn btn-primary btn-full-mobile">
    Pleine largeur mobile
</button>
```

---

## 🎯 Exemples Complets

### Carte de Service

```html
<div class="card text-center">
    <div class="icon icon-primary" style="margin: 0 auto 1.5rem;">
        <i class="fas fa-tools"></i>
    </div>
    <h3 class="gradient-text-secondary">Dépannage PC</h3>
    <p class="text-muted mb-3">
        Diagnostic et réparation rapide de votre ordinateur
    </p>
    <div class="mb-3">
        <span class="badge badge-secondary">À partir de 40€</span>
    </div>
    <button class="btn btn-primary btn-full">
        <i class="fas fa-calendar-alt"></i> Réserver
    </button>
</div>
```

### Section Features

```html
<section class="container">
    <h2 class="text-center gradient-text-primary mb-5">Nos Atouts</h2>
    
    <div class="grid grid-3">
        <div class="card text-center">
            <div class="icon icon-accent" style="margin: 0 auto 1rem;">
                <i class="fas fa-bolt"></i>
            </div>
            <h3>Rapide</h3>
            <p class="text-muted">Intervention sous 24-48h</p>
        </div>
        
        <div class="card text-center">
            <div class="icon icon-secondary" style="margin: 0 auto 1rem;">
                <i class="fas fa-shield-alt"></i>
            </div>
            <h3>Garanti</h3>
            <p class="text-muted">Garantie sur tous les travaux</p>
        </div>
        
        <div class="card text-center">
            <div class="icon icon-primary" style="margin: 0 auto 1rem;">
                <i class="fas fa-star"></i>
            </div>
            <h3>Qualité</h3>
            <p class="text-muted">Expertise reconnue</p>
        </div>
    </div>
</section>
```

### Formulaire de Contact

```html
<div class="container-sm">
    <div class="card">
        <h2 class="gradient-text-secondary mb-4">Contactez-nous</h2>
        
        <form>
            <div class="input-group">
                <label class="input-label">Nom complet *</label>
                <input type="text" class="input" required>
            </div>

            <div class="input-group">
                <label class="input-label">Email *</label>
                <input type="email" class="input" required>
            </div>

            <div class="input-group">
                <label class="input-label">Message *</label>
                <textarea class="input" rows="5" required></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-full">
                <i class="fas fa-paper-plane"></i> Envoyer
            </button>
        </form>
    </div>
</div>
```

---

## 💡 Bonnes Pratiques

### 1. **Combiner les classes**
```html
<!-- ✅ Bon -->
<button class="btn btn-primary btn-full mb-3">
    Action
</button>

<!-- ❌ À éviter (styles inline) -->
<button class="btn btn-primary" style="width: 100%; margin-bottom: 1rem;">
    Action
</button>
```

### 2. **Utiliser les containers**
```html
<!-- ✅ Toujours envelopper dans un container -->
<section>
    <div class="container">
        <h2>Titre</h2>
        <div class="grid grid-3">...</div>
    </div>
</section>
```

### 3. **Responsive d'abord**
```html
<!-- La grille s'adapte automatiquement sur mobile -->
<div class="grid grid-auto">
    <!-- 3-4 colonnes sur desktop, 1 colonne sur mobile -->
</div>
```

### 4. **Accessibilité**
```html
<!-- Toujours des labels pour les inputs -->
<div class="input-group">
    <label class="input-label" for="email">Email</label>
    <input type="email" id="email" class="input" aria-required="true">
</div>

<!-- Attributs ARIA sur les boutons -->
<button class="btn btn-primary" aria-label="Réserver une intervention">
    Réserver
</button>
```

---

## 🚀 Migration depuis le CSS existant

### Remplacer les styles inline

**Avant:**
```html
<button style="background: linear-gradient(...); padding: 1rem 2rem;">
    Bouton
</button>
```

**Après:**
```html
<button class="btn btn-primary">
    Bouton
</button>
```

### Utiliser les composants

**Avant:**
```html
<div style="background: rgba(...); padding: 2rem; border-radius: 12px;">
    Contenu
</div>
```

**Après:**
```html
<div class="card">
    Contenu
</div>
```

---

## 📊 Personnalisation

### Modifier les variables CSS

Dans `styles/variables.css`:

```css
:root {
    /* Changer les couleurs */
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    
    /* Changer les espacements */
    --spacing-md: 1.5rem;
    
    /* Changer les bordures */
    --radius-lg: 16px;
}
```

### Créer de nouveaux composants

```css
/* Dans votre CSS custom */
.btn-custom {
    background: linear-gradient(135deg, #your-color 0%, #your-color-2 100%);
    /* Hérite de .btn */
}
```

---

## 📝 Support

**Questions?** Consultez:
- `components/showcase.html` - Démo visuelle
- `styles/components.css` - Code source
- `OPTIMIZATIONS.md` - Documentation complète

**Version:** 2.0  
**Dernière mise à jour:** Mars 2026
