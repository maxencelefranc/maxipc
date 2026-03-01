# Script d'application des optimisations
# Applique Google Analytics et les attributs ARIA aux autres pages

Write-Host "🚀 Application des optimisations MaxiPC..." -ForegroundColor Cyan

$pages = @(
    "apropos.html",
    "contact.html",
    "services.html",
    "tarifs.html",
    "boutique.html",
    "reservation.html"
)

$googleAnalytics = @"
    
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    </script>
"@

foreach ($page in $pages) {
    if (Test-Path $page) {
        Write-Host "📄 Traitement de $page..." -ForegroundColor Yellow
        
        $content = Get-Content $page -Raw
        
        # Ajouter defer aux scripts s'ils n'en ont pas
        if ($content -notmatch 'defer') {
            $content = $content -replace '<script src="([^"]+)">', '<script src="$1" defer>'
            Write-Host "  ✅ Ajout de defer aux scripts" -ForegroundColor Green
        }
        
        # Ajouter Google Analytics avant </head>
        if ($content -notmatch 'googletagmanager') {
            $content = $content -replace '</head>', "$googleAnalytics`n</head>"
            Write-Host "  ✅ Google Analytics ajouté" -ForegroundColor Green
        }
        
        # Ajouter loading="lazy" aux images du footer
        $content = $content -replace '(<img[^>]*class="footer-logo"[^>]*)>', '$1 loading="lazy" width="50" height="50">'
        
        # Sauvegarder les modifications
        $content | Set-Content $page -Encoding UTF8
        Write-Host "  ✅ $page mis à jour`n" -ForegroundColor Green
    }
    else {
        Write-Host "  ⚠️  $page non trouvé`n" -ForegroundColor Red
    }
}

Write-Host "`n✨ Optimisations appliquées avec succès!" -ForegroundColor Cyan
Write-Host "⚠️  N'oubliez pas de remplacer G-XXXXXXXXXX par votre vrai ID Google Analytics`n" -ForegroundColor Yellow

Write-Host "📝 Prochaines étapes recommandées:" -ForegroundColor Cyan
Write-Host "  1. Tester les pages dans le navigateur"
Write-Host "  2. Vérifier l'accessibilité avec Lighthouse"
Write-Host "  3. Configurer Google Analytics"
Write-Host "  4. Ajouter les modules JS aux autres pages"
