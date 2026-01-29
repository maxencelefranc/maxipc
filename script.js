/* ===================== */
/* ENHANCED NAVIGATION    */
/* ===================== */

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Update active nav link based on current page
function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

updateActiveNav();

/* ===================== */
/* EMAILJS CONFIGURATION */
/* ===================== */

// Initialize EmailJS when document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with Public Key
    if (typeof emailjs !== 'undefined') {
        emailjs.init({
            publicKey: 'c4iw2Wxz3QnEZYi7S'
        });
        console.log('EmailJS initialized successfully');
    }
});

/* ===================== */
/* CONTACT FORM          */
/* ===================== */

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        console.log('Form submitted');
        
        // Disable submit button to prevent double submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Envoi en cours...';
        
        // Get form data
        const formData = new FormData(contactForm);
        const templateParams = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            phone: formData.get('phone') || 'Non fourni',
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        console.log('Sending with params:', templateParams);

        // Send email using EmailJS
        emailjs.send('service_m3logoe', 'template_bqxnfpb', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Show success message
                formMessage.textContent = '✓ Message envoyé avec succès! Nous vous répondrons dans les 24 heures.';
                formMessage.classList.remove('error');
                formMessage.classList.add('success');
                formMessage.style.display = 'block';

                // Reset form
                contactForm.reset();

                // Hide message after 5 seconds
                setTimeout(function() {
                    formMessage.style.display = 'none';
                    formMessage.classList.remove('success');
                }, 5000);

                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                
            }, function(error) {
                console.error('FAILED...', error);
                
                // Show detailed error
                let errorMsg = '✗ Erreur lors de l\'envoi: ';
                if (error.text) {
                    errorMsg += error.text;
                } else {
                    errorMsg += 'Veuillez vérifier votre connexion internet.';
                }
                
                formMessage.textContent = errorMsg;
                formMessage.classList.remove('success');
                formMessage.classList.add('error');
                formMessage.style.display = 'block';

                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
    });
}

/* ===================== */
/* SMOOTH SCROLLING      */
/* ===================== */

// Add smooth scroll behavior for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ===================== */
/* ADVANCED ANIMATIONS    */
/* ===================== */

// Smooth scroll and parallax effects
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `slideInUp 0.8s ease-out both`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply animation to cards and sections on scroll
document.querySelectorAll('.feature-card, .service-card, .reason-card, .info-card, .faq-item, .intro .container, .cta-section .container').forEach(el => {
    observer.observe(el);
});

// Cursor effect (optional modern touch)
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.feature-card, .service-card, .reason-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        // Only apply light effect on hover
        if (e.clientX > rect.left && e.clientX < rect.right &&
            e.clientY > rect.top && e.clientY < rect.bottom) {
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        } else {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        }
    });
});

// Hero parallax tilt (icon + content)
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const within = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
    const icon = document.querySelector('.hero-image i');
    const content = document.querySelector('.hero-content');
    if (!icon || !content) return;

    if (within) {
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const rotateY = x * 10; // tilt horizontally
        const rotateX = -y * 10; // tilt vertically
        icon.style.transform = `translateZ(0) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        content.style.transform = `translate3d(${x * 10}px, ${y * 8}px, 0)`;
    } else {
        icon.style.transform = 'translateZ(0) rotateY(0deg) rotateX(0deg)';
        content.style.transform = 'translate3d(0,0,0)';
    }
});

/* ===================== */
/* FORM VALIDATION       */
/* ===================== */

function validateEmail(email) {
    const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return re.test(email);
}

if (contactForm) {
    const emailInput = document.getElementById('email');
    
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            if (emailInput.value && !validateEmail(emailInput.value)) {
                emailInput.style.borderColor = '#ef4444';
            } else {
                emailInput.style.borderColor = '#ddd';
            }
        });
    }
}

/* ===================== */
/* PHONE LINK            */
/* ===================== */

// Make phone numbers clickable on mobile
function initPhoneLinks() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    if (!phoneLinks) return;

    phoneLinks.forEach(link => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            link.style.cursor = 'pointer';
        }
    });
}

initPhoneLinks();

/* ===================== */
/* PERFORMANCE TIPS      */
/* ===================== */

// Lazy load images (if using images in future)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ===================== */
/* UTILITY FUNCTIONS     */
/* ===================== */

// Get URL parameter
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ''])[1].replace(/\+/g, '%20'));
}

// Track form submissions (Google Analytics compatible)
function trackEvent(eventName, eventData) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    console.log('Event tracked:', eventName, eventData);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    console.log('MaxPC website loaded successfully');
    
    // Update navigation based on auth status
    await updateNavbar();
    
    // Additional initialization code can go here
    // - Load user preferences
    // - Initialize third-party scripts
    // - Set up analytics
});

/* ===================== */
/* AUTHENTICATION STATE  */
/* ===================== */

// Update navbar based on auth state
async function updateNavbar() {
    const navMenu = document.getElementById('navMenu');
    if (!navMenu) return;

    try {
        const user = await supabaseAuth.getCurrentUser();
        
        // Find if auth links already exist
        let authContainer = document.querySelector('.nav-auth-links');
        
        if (user) {
            // User is logged in
            if (!authContainer) {
                authContainer = document.createElement('li');
                authContainer.className = 'nav-auth-links';
                navMenu.appendChild(authContainer);
            }
            
            authContainer.innerHTML = `
                <a href="my-reservations.html" style="color: #667eea; font-weight: 600;">
                    <i class="fas fa-clipboard-list"></i> Mes réservations
                </a>
                <span style="margin: 0 8px;">|</span>
                <a href="#" onclick="handleLogout(event)" style="color: #f44336;">
                    <i class="fas fa-sign-out-alt"></i> Déconnexion
                </a>
            `;
        } else {
            // User is not logged in
            if (authContainer) {
                authContainer.remove();
            }
            
            // Add login link if not already there
            const existingLoginLink = navMenu.querySelector('a[href="auth.html"]');
            if (!existingLoginLink) {
                const loginLi = document.createElement('li');
                loginLi.innerHTML = '<a href="auth.html" style="color: #667eea; font-weight: 600;"><i class="fas fa-sign-in-alt"></i> Connexion</a>';
                navMenu.insertBefore(loginLi, navMenu.querySelector('.cta-button')?.parentElement || null);
            }
        }
    } catch (error) {
        console.error('Error updating navbar:', error);
    }
}

// Handle logout
async function handleLogout(e) {
    e.preventDefault();
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        await supabaseAuth.signOut();
        window.location.href = 'index.html';
    }
}

/* ===================== */
/* TERMINAL CODE ANIMATION */
/* ===================== */

class TerminalCodeAnimation {
    constructor() {
        this.canvas = document.getElementById('heroCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.time = 0;
        this.characters = [];
        this.codeSnippets = [
            '$ sudo maxipc-diagnostics.sh',
            '> Initializing system scan...',
            'CPU: [████████░░] 78% - Intel i7-12700K',
            'RAM: [██████░░░░] 64% - 16GB DDR5',
            'GPU: [█████████░] 92% - RTX 4090',
            'Storage: [███████░░░] 72% - 1TB NVMe',
            'Temperature: 45°C [OK]',
            'Network: Gigabit Ethernet [Active]',
            '> Performance optimization',
            '> Cache cleared ✓',
            '> Drivers updated ✓',
            '> System ready for deployment',
            '$ maxipc-status: SUCCESS',
            '> Ready to serve',
            '> Analyzing performance metrics...',
            'GPU Memory: [██████████] 100% optimized',
            'CPU Frequency: [████████░░] 3.8 GHz',
            'Disk I/O: [█████████░] 85% - 520 MB/s',
            'RAM Speed: DDR5 6400MHz',
            '> Security check passed',
            '> All drivers verified ✓',
            '> System status: EXCELLENT',
            '$ maxipc-reboot --safe',
            '> Rebooting in safe mode...',
            '> Session saved',
            '$ _'
        ];
        this.displayedCode = [];
        this.charIndex = 0;
        this.snippetIndex = 0;
        this.lineCreationTime = 0;
        this.init();
    }

    init() {
        if (!this.canvas) return;
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.animate();
    }

    resizeCanvas() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    animate = () => {
        this.time += 1;
        
        // Clear canvas
        this.ctx.fillStyle = '#0a0a14';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw background grid
        this.drawBackgroundGrid();

        // Add new characters periodically
        if (this.time % 2 === 0) {
            this.addCharacter();
        }

        // Draw all active characters
        this.drawCharacters();

        // Draw cursor
        this.drawCursor();

        requestAnimationFrame(this.animate);
    }

    addCharacter() {
        if (this.snippetIndex >= this.codeSnippets.length) {
            this.snippetIndex = 0;
            this.charIndex = 0;
            return;
        }

        const currentSnippet = this.codeSnippets[this.snippetIndex];
        
        if (this.charIndex < currentSnippet.length) {
            const char = currentSnippet[this.charIndex];
            const lineNum = this.snippetIndex;
            const charPosInLine = this.charIndex;

            // Get color based on character type
            let color = '#4facfe';
            if (char === '(' || char === ')' || char === '[' || char === ']' || char === '{' || char === '}') {
                color = '#667eea';
            } else if (char.match(/[0-9]/)) {
                color = '#f093fb';
            } else if (char === '_' || char === '>' || char === ':' || char === '$' || char === '-') {
                color = '#764ba2';
            } else if (char === '✓' || char === 'O' || char === 'K') {
                color = '#4ade80';
            }

            this.displayedCode.push({
                char: char,
                x: 30 + charPosInLine * 11,
                y: 100 + lineNum * 28,
                color: color,
                glowIntensity: Math.random() * 0.5 + 0.5,
                lineNum: lineNum,
                charPosInLine: charPosInLine
            });

            this.charIndex++;
        } else {
            // Move to next line after delay
            if (this.lineCreationTime === 0) {
                this.lineCreationTime = this.time;
            }
            if (this.time - this.lineCreationTime > 100) {
                this.charIndex = 0;
                this.snippetIndex++;
                this.lineCreationTime = 0;
            }
        }
    }

    drawCharacters() {
        this.ctx.font = 'bold 14px "Courier New", monospace';
        this.ctx.textBaseline = 'middle';

        // Only delete old lines after screen is full (10+ lines visible)
        if (this.time % 5 === 0 && this.displayedCode.length > 400) {
            // Find oldest line number currently on screen
            const minLineNum = Math.min(...this.displayedCode.map(c => c.lineNum));
            
            // Only start deleting the very oldest line to keep screen scrolling
            const charsToDelete = this.displayedCode
                .filter(char => char.lineNum === minLineNum)
                .sort((a, b) => a.charPosInLine - b.charPosInLine);
            
            if (charsToDelete.length > 0) {
                // Remove first character from oldest line (left to right deletion)
                const idx = this.displayedCode.indexOf(charsToDelete[0]);
                if (idx !== -1) {
                    this.displayedCode.splice(idx, 1);
                }
            }
        }

        // Draw all characters at full opacity
        this.displayedCode.forEach((charObj) => {
            // Draw glow
            this.ctx.globalAlpha = charObj.glowIntensity * 0.5;
            this.ctx.fillStyle = charObj.color;
            this.ctx.shadowColor = charObj.color;
            this.ctx.shadowBlur = 12;
            this.ctx.fillText(charObj.char, charObj.x, charObj.y);

            // Draw main character at full opacity
            this.ctx.globalAlpha = 1;
            this.ctx.fillStyle = charObj.color;
            this.ctx.shadowBlur = 0;
            this.ctx.fillText(charObj.char, charObj.x, charObj.y);

            // Random scan line glitch
            if (Math.random() < 0.015) {
                this.ctx.globalAlpha = 0.2;
                this.ctx.fillStyle = '#ffffff';
                this.ctx.fillText(charObj.char, charObj.x + (Math.random() - 0.5) * 2, charObj.y + (Math.random() - 0.5) * 2);
            }

            this.ctx.globalAlpha = 1;
        });
    }

    drawCursor() {
        // Calculate cursor position
        const lastCharObj = this.displayedCode[this.displayedCode.length - 1];
        if (!lastCharObj) return;

        const cursorX = lastCharObj.x + 12;
        const cursorY = lastCharObj.y;

        // Blinking cursor
        if (Math.floor(this.time / 20) % 2 === 0) {
            this.ctx.globalAlpha = 0.8;
            this.ctx.fillStyle = '#4facfe';
            this.ctx.shadowColor = '#4facfe';
            this.ctx.shadowBlur = 10;
            this.ctx.fillRect(cursorX, cursorY - 8, 2, 16);
            this.ctx.shadowBlur = 0;
        }
    }

    drawBackgroundGrid() {
        // Subtle horizontal scan lines
        this.ctx.strokeStyle = '#4facfe10';
        this.ctx.lineWidth = 1;

        for (let y = 0; y < this.canvas.height; y += 2) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }

        // Vertical accent lines
        this.ctx.strokeStyle = '#667eea08';
        for (let x = 0; x < this.canvas.width; x += 150) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }

        // Top glow
        const topGradient = this.ctx.createLinearGradient(0, 0, 0, 200);
        topGradient.addColorStop(0, '#4facfe50');
        topGradient.addColorStop(1, '#4facfe00');
        this.ctx.fillStyle = topGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, 200);

        // Bottom glow
        const bottomGradient = this.ctx.createLinearGradient(0, this.canvas.height - 200, 0, this.canvas.height);
        bottomGradient.addColorStop(0, '#764ba200');
        bottomGradient.addColorStop(1, '#764ba240');
        this.ctx.fillStyle = bottomGradient;
        this.ctx.fillRect(0, this.canvas.height - 200, this.canvas.width, 200);

        // Left accent
        const leftGradient = this.ctx.createLinearGradient(0, 0, 100, 0);
        leftGradient.addColorStop(0, '#667eea30');
        leftGradient.addColorStop(1, '#667eea00');
        this.ctx.fillStyle = leftGradient;
        this.ctx.fillRect(0, 0, 100, this.canvas.height);

        // Right accent
        const rightGradient = this.ctx.createLinearGradient(this.canvas.width - 100, 0, this.canvas.width, 0);
        rightGradient.addColorStop(0, '#667eea00');
        rightGradient.addColorStop(1, '#667eea30');
        this.ctx.fillStyle = rightGradient;
        this.ctx.fillRect(this.canvas.width - 100, 0, 100, this.canvas.height);
    }
}

// Initialize terminal animation
let terminalAnimation = null;
function initializeTerminalAnimation() {
    const canvas = document.getElementById('heroCanvas');
    if (canvas && !terminalAnimation) {
        terminalAnimation = new TerminalCodeAnimation();
    }
}

/* ===================== */
/* SHOP FEATURE          */
/* ===================== */

const defaultShopProducts = [
    { id: 1, name: 'SSD NVMe 1TB PCIe 4.0', category: 'pieces', price: 119.9, desc: 'Samsung 980 Pro / 7 000 Mo/s, idéal OS et jeux', meta: 'Rapide', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80' },
    { id: 2, name: 'Kit RAM 32GB DDR5 6000', category: 'pieces', price: 149.0, desc: 'Dual channel optimisé Ryzen/Intel, CL36', meta: 'Upgrade perf', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80' },
    { id: 3, name: 'Carte graphique RTX 4070', category: 'pieces', price: 599.0, desc: '1440p ultra, DLSS 3 et ray tracing', meta: 'Gaming', image: 'https://images.unsplash.com/photo-1587202372775-98927f78b34b?auto=format&fit=crop&w=800&q=80' },
    { id: 4, name: 'Nettoyage thermique + repaste', category: 'services', price: 59.0, desc: 'Démontage, dépoussiérage complet et pâte thermique haute perf.', meta: 'Atelier', image: 'https://images.unsplash.com/photo-1587613864521-681376e8c43e?auto=format&fit=crop&w=800&q=80' },
    { id: 5, name: 'Installation Windows + pilotes', category: 'services', price: 79.0, desc: 'Réinstallation propre, drivers, sécurité et mises à jour', meta: 'Service', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80' },
    { id: 6, name: 'Pack Upgrade Gaming', category: 'packs', price: 299.0, desc: 'SSD 1TB + optimisation Windows + param tuning', meta: 'Pack rapide', image: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?auto=format&fit=crop&w=800&q=80' },
    { id: 7, name: 'Pack Silence & Refroidissement', category: 'packs', price: 189.0, desc: 'Ventirad tour + courbe ventilateurs + nettoyage', meta: 'Silence', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
    { id: 8, name: 'Sauvegarde + clonage SSD', category: 'services', price: 69.0, desc: 'Clone disque vers SSD sans perte, vérification intégrité', meta: 'Sécurité', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80' },
    { id: 9, name: 'Routeur Wi-Fi 6 maison', category: 'pieces', price: 139.0, desc: 'Couverture stable, QoS jeux/visio, config sécurisée', meta: 'Réseau', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80' },
    { id: 10, name: 'PC reconditionné i5 / GTX 1660', category: 'pcs', price: 549.0, desc: 'Tour prête à l\'emploi, Windows 11, SSD 512 Go, garantie 6 mois atelier', meta: 'Prêt à l\'emploi', condition: 'Reconditionné A', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80', specs: 'Intel Core i5 | GTX 1660 6GB | 16GB DDR4 | SSD NVMe 512GB | Windows 11 Pro' }
];

let shopProducts = [];
let shopCart = [];

function formatPrice(amount) {
    return amount.toFixed(2).replace('.', ',') + ' €';
}

async function loadShopProducts() {
    try {
        const response = await fetch('shop-products.json');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('Invalid product format');
        return data;
    } catch (err) {
        console.warn('Produit distant indisponible, utilisation du fallback local', err);
        return defaultShopProducts;
    }
}

function renderProducts(productsToRender) {
    const grid = document.getElementById('shopGrid');
    if (!grid) return;

    grid.innerHTML = productsToRender.map((p) => `
        <div class="product-card" data-id="${p.id}">
            ${p.image ? `<img class="product-thumb" src="${p.image}" alt="${p.name}">` : ''}
            <div class="product-header">
                <p class="product-name">${p.name}</p>
                <span class="price-chip">${formatPrice(p.price)}</span>
            </div>
            <p class="product-desc">${p.desc}</p>
            <div class="product-meta">
                ${p.meta ? `<span class="chip">${p.meta}</span>` : ''}
                <span class="chip">${p.category}</span>
                ${p.condition ? `<span class="chip">${p.condition}</span>` : ''}
            </div>
            <div class="product-actions">
                <small>Installation possible en atelier ou sur site</small>
                <div style="display:flex; gap:8px;">
                    <button class="ghost-btn view-details" data-id="${p.id}">Détails</button>
                    <button class="add-to-cart" data-id="${p.id}">Ajouter</button>
                </div>
            </div>
        </div>
    `).join('');
}

function updateCart() {
    const cartList = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartSend = document.getElementById('cartSend');
    if (!cartList || !cartTotal) return;

    if (shopCart.length === 0) {
        cartList.innerHTML = '<p class="cart-note">Votre panier est vide pour l\'instant.</p>';
        cartTotal.textContent = '0 €';
        if (cartSend) {
            cartSend.classList.add('disabled');
            cartSend.setAttribute('aria-disabled', 'true');
            cartSend.removeAttribute('href');
        }
        return;
    }

    const grouped = {};
    shopCart.forEach((item) => {
        if (!grouped[item.id]) grouped[item.id] = { ...item, qty: 0 };
        grouped[item.id].qty += 1;
    });

    const lines = Object.values(grouped).map((item) => {
        const linePrice = item.price * item.qty;
        return `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <div class="cart-note">${item.qty} x ${formatPrice(item.price)}</div>
                </div>
                <div>
                    <span>${formatPrice(linePrice)}</span>
                    <button class="remove-item" data-id="${item.id}" aria-label="Supprimer l'article">✕</button>
                </div>
            </div>
        `;
    });

    const total = shopCart.reduce((sum, item) => sum + item.price, 0);
    cartList.innerHTML = lines.join('');
    cartTotal.textContent = formatPrice(total);

    if (cartSend) {
        const summary = buildCartSummary(Object.values(grouped), total);
        cartSend.href = 'reservation.html?cart=' + encodeURIComponent(summary);
        cartSend.classList.remove('disabled');
        cartSend.setAttribute('aria-disabled', 'false');
    }
}

function buildCartSummary(items, total) {
    const lines = ['Sélection boutique :'];
    items.forEach((item) => {
        lines.push(`- ${item.qty} x ${item.name} (${formatPrice(item.price)})`);
    });
    lines.push(`Total estimé : ${formatPrice(total)}`);
    lines.push('Installation / configuration : à confirmer lors de la réservation.');
    return lines.join('\n');
}

function bindShopEvents() {
    const grid = document.getElementById('shopGrid');
    const filters = document.querySelectorAll('#shopFilters .filter-btn');
    const cartList = document.getElementById('cartItems');
    const clearBtn = document.getElementById('cartClear');
    ensureProductModal();

    if (grid) {
        grid.addEventListener('click', (e) => {
            const addBtn = e.target.closest('.add-to-cart');
            if (addBtn) {
                const productId = Number(addBtn.dataset.id);
                const product = shopProducts.find((p) => p.id === productId);
                if (!product) return;
                shopCart.push(product);
                updateCart();
                addBtn.textContent = 'Ajouté';
                setTimeout(() => { addBtn.textContent = 'Ajouter'; }, 1000);
                return;
            }

            const detailBtn = e.target.closest('.view-details');
            if (detailBtn) {
                const productId = Number(detailBtn.dataset.id);
                const product = shopProducts.find((p) => p.id === productId);
                if (product) openProductModal(product);
            }
        });
    }

    filters.forEach((filterBtn) => {
        filterBtn.addEventListener('click', () => {
            filters.forEach((b) => b.classList.remove('active'));
            filterBtn.classList.add('active');
            const key = filterBtn.dataset.filter;
            if (key === 'all') {
                renderProducts(shopProducts);
            } else {
                renderProducts(shopProducts.filter((p) => p.category === key));
            }
        });
    });

    if (cartList) {
        cartList.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('.remove-item');
            if (!removeBtn) return;
            const productId = Number(removeBtn.dataset.id);
            const index = shopCart.findIndex((p) => p.id === productId);
            if (index !== -1) {
                shopCart.splice(index, 1);
                updateCart();
            }
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            shopCart = [];
            updateCart();
        });
    }
}

// Product modal helpers
let productModal = null;

function ensureProductModal() {
    if (productModal) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'product-modal hidden';
    wrapper.setAttribute('role', 'dialog');
    wrapper.setAttribute('aria-modal', 'true');
    wrapper.innerHTML = `
        <div class="modal-card" role="document">
            <button class="close-btn" aria-label="Fermer">✕</button>
            <img class="modal-image" alt="Produit" />
            <div class="modal-body">
                <div class="product-header" style="margin-bottom:6px;">
                    <p class="product-name" id="modalName"></p>
                    <span class="modal-price" id="modalPrice"></span>
                </div>
                <div class="modal-meta" id="modalMeta"></div>
                <p class="product-desc" id="modalDesc"></p>
                <ul class="spec-list" id="modalSpecList"></ul>
                <div class="modal-actions">
                    <button class="add-to-cart" id="modalAdd">Ajouter au panier</button>
                    <button class="ghost-btn" id="modalClose">Fermer</button>
                </div>
            </div>
        </div>`;
    document.body.appendChild(wrapper);
    productModal = wrapper;

    wrapper.addEventListener('click', (e) => {
        if (e.target === wrapper) closeProductModal();
    });
    wrapper.querySelector('.close-btn').addEventListener('click', closeProductModal);
    wrapper.querySelector('#modalClose').addEventListener('click', closeProductModal);
    wrapper.querySelector('#modalAdd').addEventListener('click', () => {
        const id = Number(wrapper.dataset.productId);
        const product = shopProducts.find((p) => p.id === id);
        if (!product) return;
        shopCart.push(product);
        updateCart();
        closeProductModal();
    });

    document.addEventListener('keydown', (e) => {
        if (productModal.classList.contains('hidden')) return;
        if (e.key === 'Escape') closeProductModal();
    });
}

function openProductModal(product) {
    if (!productModal) ensureProductModal();
    lastFocusedElement = document.activeElement;
    productModal.dataset.productId = product.id;
    const img = productModal.querySelector('.modal-image');
    img.src = product.image || '';
    img.alt = product.name;
    img.style.display = product.image ? 'block' : 'none';
    productModal.querySelector('#modalName').textContent = product.name;
    productModal.querySelector('#modalPrice').textContent = formatPrice(product.price);
    productModal.querySelector('#modalDesc').textContent = product.desc || '';
    const specList = productModal.querySelector('#modalSpecList');
    specList.innerHTML = '';
    if (product.specs) {
        const parts = Array.isArray(product.specs) ? product.specs : String(product.specs).split('|');
        parts.map(s => s.trim()).filter(Boolean).forEach((s) => {
            const li = document.createElement('li');
            li.textContent = s;
            specList.appendChild(li);
        });
    }
    const meta = productModal.querySelector('#modalMeta');
    meta.innerHTML = '';
    if (product.meta) meta.innerHTML += `<span class="meta-pill">${product.meta}</span>`;
    meta.innerHTML += `<span class="meta-pill">${product.category}</span>`;
    if (product.condition) meta.innerHTML += `<span class="meta-pill">${product.condition}</span>`;
    productModal.classList.remove('hidden');
    const firstBtn = productModal.querySelector('#modalAdd');
    if (firstBtn) firstBtn.focus();
}

function closeProductModal() {
    if (productModal) productModal.classList.add('hidden');
    if (lastFocusedElement && lastFocusedElement.focus) {
        lastFocusedElement.focus();
    }
}

let lastFocusedElement = null;

function initializeShopFeature() {
    const grid = document.getElementById('shopGrid');
    if (!grid) return;
    loadShopProducts().then((data) => {
        shopProducts = data;
        renderProducts(shopProducts);
        updateCart();
        bindShopEvents();
    });
}

function prefillReservationFromCart() {
    if (!window.location.pathname.endsWith('reservation.html')) return;
    const cartText = getURLParameter('cart');
    if (!cartText || cartText === 'undefined') return;
    const descriptionField = document.getElementById('description');
    const serviceField = document.getElementById('service');
    if (descriptionField) {
        descriptionField.value = cartText;
    }
    if (serviceField && !serviceField.value) {
        serviceField.value = 'installation';
    }
}

function runAppInit() {
    initializeTerminalAnimation();
    initializeShopFeature();
    prefillReservationFromCart();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAppInit);
} else {
    runAppInit();
}

/* ===================== */
/* DEBUG MODE            */
/* ===================== */

// Enable debug mode with ?debug=true in URL
if (getURLParameter('debug') === 'true') {
    console.log('DEBUG MODE ENABLED');
    console.log('Form ID:', contactForm ? 'Found' : 'Not found');
    console.log('Navigation:', document.querySelector('.navbar') ? 'Found' : 'Not found');
    console.log('Circuit Animation:', circuitController ? 'Running' : 'Not initialized');
}
