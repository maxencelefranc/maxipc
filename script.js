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

function injectMobileCallButton() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPage === 'admin.html') return;
    if (document.querySelector('.mobile-call-fab')) return;

    const button = document.createElement('a');
    button.className = 'mobile-call-fab';
    button.href = 'tel:+33682186791';
    button.setAttribute('aria-label', 'Appeler MaxiPC');
    button.innerHTML = '<i class="fas fa-phone"></i>';
    document.body.appendChild(button);
}

injectMobileCallButton();

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
    console.log('MaxiPC website loaded successfully');
    
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
/* HOLOGRAM 3D ANIMATION */
/* ===================== */

class HologramAnimation {
    constructor() {
        this.canvas = document.getElementById('heroCanvas');
        if (!this.canvas) return;
        
        // Three.js setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true });
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setClearColor(0x000f1f, 0.2);
        
        this.camera.position.z = 25;
        
        // Animation state
        this.time = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetMouseX = 0;
        this.targetMouseY = 0;
        
        // Create 3D PC model
        this.pcGroup = new THREE.Group();
        this.scene.add(this.pcGroup);
        this.createPC3DModel();
        
        // Add hologram effects
        this.addGlowEffect();
        
        // Handle resize
        window.addEventListener('resize', () => this.onWindowResize());
        
        // Start animation
        this.animate();
    }
    
    createPC3DModel() {
        // Load realistic PC model from GLB/glTF file
        if (!window.THREE || !window.THREE.GLTFLoader) {
            console.warn('GLTFLoader not available yet, using fallback');
            this.createPC3DModelFallback();
            return;
        }
        
        try {
            const loader = new THREE.GLTFLoader();
            
            // Load the gaming PC model
            const modelPath = 'Assets/gaming_desktop_pc.glb';
            
            loader.load(
                modelPath,
                (gltf) => {
                    const model = gltf.scene;
                    // Scale and position the model
                    model.scale.set(2.5, 2.5, 2.5);
                    model.position.y = -0.5;
                    
                    // Apply neon glow effect to all meshes
                    model.traverse((child) => {
                        if (child.isMesh && child.material) {
                            // Clone material if shared to avoid affecting other objects
                            if (Array.isArray(child.material)) {
                                child.material = child.material.map(m => m.clone());
                            } else {
                                child.material = child.material.clone();
                            }
                            
                            // Apply to all materials (array or single)
                            const materials = Array.isArray(child.material) ? child.material : [child.material];
                            materials.forEach(mat => {
                                mat.emissive = mat.emissive || new THREE.Color(0);
                                mat.emissive.setHex(0x003366);
                                mat.emissiveIntensity = 0.45;
                                // Only set metalness/roughness if material supports them
                                if (typeof mat.metalness !== 'undefined') mat.metalness = 0.8;
                                if (typeof mat.roughness !== 'undefined') mat.roughness = 0.3;
                                // For PhongMaterial, use shininess instead
                                if (typeof mat.shininess !== 'undefined') mat.shininess = 100;
                            });
                            
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });
                    
                    this.pcGroup.add(model);
                    this.pcModel = model;
                    console.log('✓ Modèle 3D PC chargé avec succès!');
                },
                (progress) => {
                    const loaded = (progress.loaded / progress.total * 100).toFixed(0);
                    console.log('Chargement modèle:', loaded + '%');
                },
                (error) => {
                    console.warn('Erreur chargement modèle:', error.message || error);
                    console.log('Utilisation du modèle géométrique fallback...');
                    this.createPC3DModelFallback();
                }
            );
        } catch (e) {
            console.error('Erreur création loader:', e);
            this.createPC3DModelFallback();
        }
    }
    
    createPC3DModelFallback() {
        // Fallback: Create a more detailed geometric PC if model loading fails
        // Main case - tall tower
        const caseGeo = new THREE.BoxGeometry(1, 3.5, 1);
        const caseMat = new THREE.MeshPhongMaterial({ 
            color: 0x1a1a1a,
            emissive: 0x003366,
            shininess: 100
        });
        const pcCase = new THREE.Mesh(caseGeo, caseMat);
        this.pcGroup.add(pcCase);
        
        // Front panel with details
        const panelGeo = new THREE.BoxGeometry(0.95, 3.4, 0.05);
        const panelMat = new THREE.MeshPhongMaterial({ 
            color: 0x0a0a0a,
            emissive: 0x004488,
            shininess: 100
        });
        const panel = new THREE.Mesh(panelGeo, panelMat);
        panel.position.z = 0.51;
        this.pcGroup.add(panel);
        
        // LED strip top
        const ledGeo = new THREE.BoxGeometry(0.9, 0.02, 0.8);
        const ledMat = new THREE.MeshPhongMaterial({ 
            color: 0x00ffff,
            emissive: 0x00ffff,
            emissiveIntensity: 0.8
        });
        const led = new THREE.Mesh(ledGeo, ledMat);
        led.position.set(0, 1.75, 0);
        this.pcGroup.add(led);
        
        // PSU (power supply) - bottom front
        const psuGeo = new THREE.BoxGeometry(0.85, 0.4, 0.8);
        const psuMat = new THREE.MeshPhongMaterial({ 
            color: 0x2a2a2a,
            emissive: 0x002244
        });
        const psu = new THREE.Mesh(psuGeo, psuMat);
        psu.position.y = -1.55;
        this.pcGroup.add(psu);
        
        // GPU (graphics card) - side mounted large
        const gpuGeo = new THREE.BoxGeometry(0.3, 1.4, 0.9);
        const gpuMat = new THREE.MeshPhongMaterial({ 
            color: 0x1a1a2e,
            emissive: 0x663399
        });
        const gpu = new THREE.Mesh(gpuGeo, gpuMat);
        gpu.position.set(0.4, 0.2, 0);
        this.pcGroup.add(gpu);
        
        // Front fans - 2x large fans
        const fanGroupTop = new THREE.Group();
        this.createFan(0.3, fanGroupTop);
        fanGroupTop.position.set(0, 0.8, 0.48);
        this.pcGroup.add(fanGroupTop);
        
        const fanGroupBottom = new THREE.Group();
        this.createFan(0.3, fanGroupBottom);
        fanGroupBottom.position.set(0, -0.5, 0.48);
        this.pcGroup.add(fanGroupBottom);
        
        // CPU cooler - tower in center back
        const cpuGeo = new THREE.CylinderGeometry(0.25, 0.25, 1.8, 16);
        const cpuMat = new THREE.MeshPhongMaterial({ 
            color: 0x333333,
            emissive: 0x0088ff
        });
        const cpu = new THREE.Mesh(cpuGeo, cpuMat);
        cpu.position.set(0, 0.3, -0.3);
        this.pcGroup.add(cpu);
        
        // Add glow wireframe outline
        const wireGeo = new THREE.BoxGeometry(1.02, 3.52, 1.02);
        const wireMat = new THREE.MeshPhongMaterial({ 
            wireframe: true,
            color: 0x00c8ff,
            emissive: 0x00ffff,
            emissiveIntensity: 0.6
        });
        const wireframe = new THREE.Mesh(wireGeo, wireMat);
        this.pcGroup.add(wireframe);
    }
    
    createFan(radius, parent) {
        // Fan blade circle
        const fanGeo = new THREE.CylinderGeometry(radius, radius, 0.05, 32);
        const fanMat = new THREE.MeshPhongMaterial({ 
            color: 0x00d4ff,
            emissive: 0x0088cc,
            emissiveIntensity: 0.5
        });
        const fan = new THREE.Mesh(fanGeo, fanMat);
        fan.rotation.x = Math.PI / 2;
        parent.add(fan);
        
        // Fan frame
        const frameGeo = new THREE.TorusGeometry(radius + 0.02, 0.02, 8, 32);
        const frameMat = new THREE.MeshPhongMaterial({ 
            color: 0x333333,
            emissive: 0x004488
        });
        const frame = new THREE.Mesh(frameGeo, frameMat);
        frame.rotation.x = Math.PI / 2;
        parent.add(frame);
    }
    
    addGlowEffect() {
        // Ambient light with cyan tint
        const ambientLight = new THREE.AmbientLight(0x00c8ff, 0.7);
        this.scene.add(ambientLight);
        
        // Point light (neon glow)
        const pointLight = new THREE.PointLight(0x00e5ff, 1.6, 24);
        pointLight.position.z = 3;
        this.scene.add(pointLight);
        
        // Directional light for definition
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
        dirLight.position.set(2, 2, 2);
        this.scene.add(dirLight);
    }
    
    createParticles() {}
    
    setupInteraction() {}
    
    onWindowResize() {
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    
    animate = () => {
        this.time += 0.016;
        
        // Left-right front movement (no orbit rotation)
        this.pcGroup.position.x = 3 + Math.sin(this.time * 0.5) * 0.5;
        this.pcGroup.rotation.y = 4.75 + Math.sin(this.time * 0.4) * 0.1;
        this.pcGroup.rotation.x = 0.25 + Math.sin(this.time * 0.3) * 0.5;
        this.pcGroup.rotation.z = Math.sin(this.time * 0.2) * 0.04;
        
        // Subtle glow pulse
        const glow = 0.6 + Math.sin(this.time * 2) * 0.15;
        this.pcGroup.children.forEach(child => {
            if (child.material && child.material.emissive) {
                child.material.emissiveIntensity = glow;
            }
        });
        
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate);
    }
}

// Initialize hologram animation
let hologramAnimation = null;
function initializeTerminalAnimation() {
    const canvas = document.getElementById('heroCanvas');
    if (canvas && !hologramAnimation) {
        hologramAnimation = new HologramAnimation();
    }
}

/* ===================== */
/* SHOP FEATURE          */
/* ===================== */

const defaultShopProducts = [
    { id: 1, name: 'SSD NVMe 1TB PCIe 4.0', category: 'pieces', price: 119.9, desc: 'Samsung 980 Pro / 7 000 Mo/s, idéal OS et jeux', meta: 'Rapide', image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=900&q=80' },
    { id: 2, name: 'Kit RAM 32GB DDR5 6000', category: 'pieces', price: 149.0, desc: 'Dual channel optimisé Ryzen/Intel, CL36', meta: 'Upgrade perf', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80' },
    { id: 3, name: 'Carte graphique RTX 4070', category: 'pieces', price: 599.0, desc: '1440p ultra, DLSS 3 et ray tracing', meta: 'Gaming', image: 'https://images.unsplash.com/photo-1587202372775-98927f78b34b?auto=format&fit=crop&w=900&q=80' },
    { id: 4, name: 'Nettoyage thermique + repaste', category: 'services', price: 59.0, desc: 'Démontage, dépoussiérage complet et pâte thermique haute perf.', meta: 'Atelier', image: 'https://images.unsplash.com/photo-1587613864521-681376e8c43e?auto=format&fit=crop&w=900&q=80' },
    { id: 5, name: 'Installation Windows + pilotes', category: 'services', price: 79.0, desc: 'Réinstallation propre, drivers, sécurité et mises à jour', meta: 'Service', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80' },
    { id: 6, name: 'Pack Upgrade Gaming', category: 'packs', price: 299.0, desc: 'SSD 1TB + optimisation Windows + param tuning', meta: 'Pack rapide', image: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?auto=format&fit=crop&w=900&q=80' },
    { id: 7, name: 'Pack Silence & Refroidissement', category: 'packs', price: 189.0, desc: 'Ventirad tour + courbe ventilateurs + nettoyage', meta: 'Silence', image: 'https://images.unsplash.com/photo-1585079542156-2755d9c6a9c9?auto=format&fit=crop&w=900&q=80' },
    { id: 8, name: 'Sauvegarde + clonage SSD', category: 'services', price: 69.0, desc: 'Clone disque vers SSD sans perte, vérification intégrité', meta: 'Sécurité', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80' },
    { id: 9, name: 'Routeur Wi-Fi 6 maison', category: 'pieces', price: 139.0, desc: 'Couverture stable, QoS jeux/visio, config sécurisée', meta: 'Réseau', image: 'https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&w=900&q=80' },
    { id: 10, name: 'PC reconditionné i5 / GTX 1660', category: 'pcs', price: 549.0, desc: 'Tour prête à l\'emploi, Windows 11, SSD 512 Go, garantie 6 mois atelier', meta: 'Prêt à l\'emploi', condition: 'Reconditionné A', badge: 'Reconditionné', status: 'Disponible', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80', specs: 'Intel Core i5 | GTX 1660 6GB | 16GB DDR4 | SSD NVMe 512GB | Windows 11 Pro' }
];

let shopProducts = [];
let shopCart = [];
let shopProductsSource = 'unknown';

function formatPrice(amount) {
    return amount.toFixed(2).replace('.', ',') + ' €';
}

async function loadShopProducts() {
    const supabaseClient = window.supabaseClient;
        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient
                    .from('site_content')
                    .select('*')
                    .order('key', { ascending: true });
                if (!error && Array.isArray(data)) {
                    shopProductsSource = 'supabase';
                    return data;
                }
            } catch (err) {
                console.warn('Chargement Supabase échoué, fallback JSON', err);
            }
        }

    try {
        const response = await fetch('data/shop-products.json');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('Invalid product format');
        shopProductsSource = 'json';
        return data;
    } catch (err) {
        console.warn('Produit distant indisponible, utilisation du fallback local', err);
        shopProductsSource = 'local';
        return defaultShopProducts;
    }
}

function renderProducts(productsToRender) {
    const grid = document.getElementById('shopGrid');
    if (!grid) return;

    grid.innerHTML = productsToRender.map((p) => `
        <div class="product-card ${p.status === 'Vendu' ? 'is-sold' : ''}" data-id="${p.id}">
            ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
            ${p.status ? `<span class="status-badge ${p.status === 'Vendu' ? 'is-sold' : 'is-available'}">${p.status}</span>` : ''}
            ${p.image
                ? `<img class="product-thumb" src="${p.image}" alt="${p.name}">`
                : `<div class="product-thumb placeholder"><i class="fas fa-desktop"></i></div>`}
            <div class="product-header">
                <p class="product-name">${p.name}</p>
                <span class="price-chip">${formatPrice(p.price)}</span>
            </div>
            <p class="product-desc">${p.desc}</p>
            <div class="product-meta">
                ${p.meta ? `<span class="chip">${p.meta}</span>` : ''}
                <span class="chip">${p.category}</span>
                ${p.condition ? `<span class="chip">${p.condition}</span>` : ''}
                ${p.status ? `<span class="chip">${p.status}</span>` : ''}
            </div>
            <div class="product-actions">
                <small>Installation possible en atelier ou sur site</small>
                <div class="product-action-buttons">
                    <button class="ghost-btn view-details" data-id="${p.id}" ${p.status === 'Vendu' ? 'disabled' : ''}>Détails</button>
                    <button class="add-to-cart" data-id="${p.id}" ${p.status === 'Vendu' ? 'disabled' : ''}>Ajouter</button>
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
                if (!product || product.status === 'Vendu') return;
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
                if (product && product.status !== 'Vendu') openProductModal(product);
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
            <button class="close-btn" aria-label="Fermer la fenêtre">✕</button>
            <img class="modal-image" alt="Produit" />
            <div class="modal-body">
                <div class="modal-head">
                    <div>
                        <p class="product-name" id="modalName"></p>
                        <div class="modal-meta" id="modalMeta"></div>
                    </div>
                    <span class="modal-price" id="modalPrice"></span>
                </div>
                <p class="product-desc" id="modalDesc"></p>
                <div class="modal-info-grid">
                    <div class="modal-info-item">
                        <span class="label">Disponibilité</span>
                        <strong id="modalAvailability">Disponible</strong>
                    </div>
                    <div class="modal-info-item">
                        <span class="label">Garantie</span>
                        <strong id="modalWarranty">Garantie atelier 3 mois</strong>
                    </div>
                </div>
                <p class="modal-spec-title">Caractéristiques</p>
                <ul class="spec-list" id="modalSpecList"></ul>
                <div class="modal-actions">
                    <button class="add-to-cart" id="modalAdd">Ajouter au panier</button>
                    <button class="btn btn-secondary" id="modalReserve">Réserver l'installation</button>
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
    wrapper.querySelector('#modalReserve').addEventListener('click', () => {
        const id = Number(wrapper.dataset.productId);
        const product = shopProducts.find((p) => p.id === id);
        if (!product) return;
        const summary = `Sélection boutique:\n- ${product.name} (${formatPrice(product.price)})`;
        window.location.href = `reservation.html?cart=${encodeURIComponent(summary)}`;
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
    const availability = productModal.querySelector('#modalAvailability');
    const warranty = productModal.querySelector('#modalWarranty');
    const isSold = product.status === 'Vendu';
    if (availability) availability.textContent = product.status || 'Disponible';
    if (warranty) {
        if (String(product.category || '').toLowerCase() === 'services') {
            warranty.textContent = 'Garantie intervention 30 jours';
        } else if (String(product.condition || '').toLowerCase().includes('reconditionné')) {
            warranty.textContent = 'Garantie atelier 6 mois';
        } else {
            warranty.textContent = 'Garantie atelier 3 mois';
        }
    }

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
    if (product.meta) meta.innerHTML += `<span class="chip">${product.meta}</span>`;
    if (product.badge) meta.innerHTML += `<span class="chip">${product.badge}</span>`;
    meta.innerHTML += `<span class="chip">${product.category}</span>`;
    if (product.condition) meta.innerHTML += `<span class="chip">${product.condition}</span>`;
    if (product.status) meta.innerHTML += `<span class="chip">${product.status}</span>`;

    const addBtn = productModal.querySelector('#modalAdd');
    const reserveBtn = productModal.querySelector('#modalReserve');
    if (addBtn) {
        addBtn.disabled = isSold;
        addBtn.textContent = isSold ? 'Produit indisponible' : 'Ajouter au panier';
    }
    if (reserveBtn) {
        reserveBtn.disabled = isSold;
    }

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

/* ===================== */
/* SITE CONTENT          */
/* ===================== */

async function loadSiteContent() {
    const supabaseClient = window.supabaseClient;
        if (!supabaseClient) return;
        try {
            const { data, error } = await supabaseClient
                .from('products')
                .select('*');
            if (error || !Array.isArray(data)) return;
            const contentMap = new Map(data.map((row) => [row.key, row.value]));
            document.querySelectorAll('[data-content-key]').forEach((el) => {
                const key = el.getAttribute('data-content-key');
                if (contentMap.has(key)) {
                    el.textContent = contentMap.get(key);
                }
            });
        } catch (err) {
            console.warn('Chargement contenu site échoué', err);
        }
}

/* ===================== */
/* ADMIN FEATURE         */
/* ===================== */

async function isAdminUser(user) {
    if (!user) return false;
    
    // Check email allowlist first
    const adminEmails = window.ADMIN_EMAILS || [];
    if (adminEmails.includes(user.email)) return true;
    
    // Check admin_users table
    const supabaseClient = window.supabaseClient;
    if (supabaseClient) {
        try {
            const { data, error } = await supabaseClient
                .from('admin_users')
                .select('user_id')
                .eq('user_id', user.id)
                .single();
            return !!data && !error;
        } catch (err) {
            console.warn('Admin check failed:', err);
            return false;
        }
    }
    
    return false;
}

async function initializeAdmin() {
    if (!window.supabaseAuth || !window.supabaseClient) return;

    let currentAdminUser = null;
    let editingContentKey = null;
    let isEditMode = false;
    let loginAttempts = 0;
    const MAX_ATTEMPTS = 5;
    let lastAttemptTime = 0;
    const ATTEMPT_LOCKOUT = 60000; // 60 secondes

    // Create small login icon if it doesn't exist
    if (!document.getElementById('adminLoginIcon')) {
        const icon = document.createElement('div');
        icon.id = 'adminLoginIcon';
        icon.className = 'admin-login-icon';
        icon.title = 'Connexion administrateur';
        icon.innerHTML = '<i class="fas fa-lock"></i>';
        document.body.appendChild(icon);
    }

    // Create admin page link if it doesn't exist
    if (!document.getElementById('adminPageIcon')) {
        const icon = document.createElement('div');
        icon.id = 'adminPageIcon';
        icon.className = 'admin-login-icon';
        icon.title = 'Page administrateur';
        icon.innerHTML = '<i class="fas fa-cog"></i>';
        icon.style.display = 'none';
        icon.style.cursor = 'pointer';
        icon.addEventListener('click', () => {
            window.location.href = 'admin.html';
        });
        document.body.appendChild(icon);
    }

    // Create edit mode button
    if (!document.getElementById('adminEditButton')) {
        const editBtn = document.createElement('div');
        editBtn.id = 'adminEditButton';
        editBtn.className = 'admin-login-icon';
        editBtn.style.bottom = '80px';
        editBtn.style.display = 'none';
        editBtn.title = 'Mode édition';
        editBtn.innerHTML = '<i class="fas fa-pen-fancy"></i>';
        document.body.appendChild(editBtn);
    }

    // Create login modal if it doesn't exist
    if (!document.getElementById('adminLoginModal')) {
        const modal = document.createElement('div');
        modal.id = 'adminLoginModal';
        modal.className = 'admin-login-modal';
        modal.innerHTML = `
            <div class="admin-login-modal-content">
                <h2 class="admin-login-modal-title">Accès administrateur</h2>
                <form class="admin-login-form" id="adminLoginForm">
                    <input type="email" placeholder="Email" id="adminEmail" required autocomplete="email">
                    <input type="password" placeholder="Mot de passe" id="adminPassword" required autocomplete="current-password">
                    <button type="submit" class="admin-login-btn">Connexion</button>
                    <div id="adminLoginError" style="color: #ff7a9c; font-size: 0.9rem; text-align: center; display: none;"></div>
                </form>
                <div id="adminUserInfo" style="display:none; text-align: center; padding-top: 16px;">
                    <div class="admin-user-info" style="justify-content: center; flex-direction: column; gap: 12px;">
                        <span id="adminEmailDisplay" style="color: var(--text-light); font-weight: 600;"></span>
                        <button type="button" class="admin-logout-btn" id="adminLogoutBtn" style="width: 100%;">Déconnexion</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Create edit modal
    if (!document.getElementById('editContentModal')) {
        const modal = document.createElement('div');
        modal.id = 'editContentModal';
        modal.className = 'edit-modal';
        modal.innerHTML = `
            <div class="edit-modal-content">
                <div class="edit-modal-header">
                    <h2 class="edit-modal-title" id="editModalTitle">Modifier</h2>
                </div>
                <textarea class="edit-modal-textarea" id="editModalTextarea" placeholder="Contenu..."></textarea>
                <div class="edit-modal-footer">
                    <button type="button" class="edit-modal-cancel" id="editModalCancel">Annuler</button>
                    <button type="button" class="edit-modal-save" id="editModalSave">Enregistrer</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    const icon = document.getElementById('adminLoginIcon');
    const PageBtn = document.getElementById('adminPageIcon');
    const editBtn = document.getElementById('adminEditButton');
    const modal = document.getElementById('adminLoginModal');
    const loginForm = document.getElementById('adminLoginForm');
    const loginError = document.getElementById('adminLoginError');
    const userInfo = document.getElementById('adminUserInfo');
    const emailDisplay = document.getElementById('adminEmailDisplay');
    const logoutBtn = document.getElementById('adminLogoutBtn');
    const editModal = document.getElementById('editContentModal');
    const editModalTitle = document.getElementById('editModalTitle');
    const editModalTextarea = document.getElementById('editModalTextarea');
    const editModalSave = document.getElementById('editModalSave');
    const editModalCancel = document.getElementById('editModalCancel');

    const closeLoginModal = () => {
        modal.classList.remove('show');
    };

    const showLoginModal = () => {
        modal.classList.add('show');
        document.getElementById('adminEmail').focus();
    };

    const toggleEditMode = () => {
        isEditMode = !isEditMode;
        
        if (isEditMode) {
            editBtn.classList.add('logged-in');
            editBtn.style.borderColor = '#ff7a9c';
            enableEditMode();
        } else {
            editBtn.classList.remove('logged-in');
            editBtn.style.borderColor = 'rgba(102, 126, 234, 0.3)';
            disableEditMode();
        }
    };

    const enableEditMode = () => {
        // Make content sections clickable
        document.querySelectorAll('[data-content-key]').forEach((el) => {
            el.style.cursor = 'pointer';
            el.style.padding = '4px 8px';
            el.style.borderRadius = '4px';
            el.style.transition = 'all 0.2s ease';
            el.style.backgroundColor = 'rgba(79, 172, 254, 0.08)';
            el.style.border = '1px dashed rgba(79, 172, 254, 0.3)';
            
            el.addEventListener('click', handleContentClick);
        });

        // Make products clickable
        document.querySelectorAll('.product-card').forEach((card) => {
            card.style.cursor = 'pointer';
            card.style.opacity = '0.8';
            card.style.transition = 'all 0.2s ease';
            card.addEventListener('click', handleProductClick);
        });
    };

    const disableEditMode = () => {
        // Remove edit styles from content
        document.querySelectorAll('[data-content-key]').forEach((el) => {
            el.style.cursor = 'default';
            el.style.padding = '';
            el.style.borderRadius = '';
            el.style.backgroundColor = '';
            el.style.border = '';
            el.removeEventListener('click', handleContentClick);
        });

        // Remove edit styles from products
        document.querySelectorAll('.product-card').forEach((card) => {
            card.style.cursor = 'default';
            card.style.opacity = '1';
            card.removeEventListener('click', handleProductClick);
        });
    };

    const handleContentClick = (e) => {
        e.stopPropagation();
        const el = e.target;
        const key = el.getAttribute('data-content-key');
        if (key) {
            openEditModal(key, el.textContent);
        }
    };

    const handleProductClick = async (e) => {
        e.stopPropagation();
        const card = e.currentTarget;
        const productId = card.dataset.productId;
        
        // Show options: Edit or Delete
        const choice = confirm('Éditer ce produit?\n\nAnnuler = Supprimer');
        
        if (choice) {
            // Edit
            const { data } = await window.supabaseClient.from('products').select('*').eq('id', productId).single();
            if (data) {
                openEditModal(productId, JSON.stringify(data, null, 2), 'product');
            }
        } else {
            // Delete
            const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer ce produit ?');
            if (confirmDelete) {
                await window.supabaseClient.from('products').delete().eq('id', productId);
                card.remove();
                const p = await loadShopProducts();
                shopProducts = p;
                renderProducts(shopProducts);
            }
        }
    };

    const openEditModal = (key, content, type = 'content') => {
        editingContentKey = key;
        editModalTitle.textContent = type === 'product' ? `Éditer produit` : `Éditer: ${key}`;
        editModalTextarea.value = content;
        editModal.classList.add('show');
        editModalTextarea.focus();
    };

    const closeEditModal = () => {
        editModal.classList.remove('show');
        editingContentKey = null;
    };

    const updateAdminUI = async (user) => {
        const isAdmin = user && (await isAdminUser(user));
        currentAdminUser = isAdmin ? user : null;

        if (isAdmin) {
            icon.classList.add('logged-in');
            icon.title = 'Vous êtes connecté';
            PageBtn.style.display = 'flex';
            loginForm.style.display = 'none';
            userInfo.style.display = 'block';
            emailDisplay.textContent = user.email;
            loginError.style.display = 'none';
            editBtn.style.display = 'flex';
            isEditMode = false;
            editBtn.classList.remove('logged-in');
        } else {
            icon.classList.remove('logged-in');
            icon.title = 'Connexion administrateur';
            PageBtn.style.display = 'none';
            loginForm.style.display = 'flex';
            userInfo.style.display = 'none';
            editBtn.style.display = 'none';
            disableEditMode();
            isEditMode = false;
        }
    };

    editModalSave.addEventListener('click', async () => {
        if (!editingContentKey) return;

        try {
            const content = editModalTextarea.value.trim();
            let isProduct = false;
            let productData = null;
            
            try {
                productData = JSON.parse(content);
                isProduct = true;
            } catch (e) {
                // Not JSON, treat as text content
            }

            if (isProduct) {
                const { error } = await window.supabaseClient
                    .from('products')
                    .update(productData)
                    .eq('id', editingContentKey);
                if (!error) {
                    const p = await loadShopProducts();
                    shopProducts = p;
                    renderProducts(shopProducts);
                }
            } else {
                await window.supabaseClient.from('site_content').upsert(
                    { key: editingContentKey, value: content, updated_at: new Date().toISOString() },
                    { onConflict: 'key' }
                );
                await loadSiteContent();
                const el = document.querySelector(`[data-content-key="${editingContentKey}"]`);
                if (el) el.textContent = content;
            }

            closeEditModal();
        } catch (err) {
            alert('Erreur lors de la sauvegarde: ' + err.message);
        }
    });

    editModalCancel.addEventListener('click', closeEditModal);
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) closeEditModal();
    });

    logoutBtn.addEventListener('click', async () => {
        await window.supabaseAuth.signOut();
        const user = await window.supabaseAuth.getCurrentUser();
        await updateAdminUI(user);
        closeLoginModal();
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Anti-brute-force
        const now = Date.now();
        if (loginAttempts >= MAX_ATTEMPTS && now - lastAttemptTime < ATTEMPT_LOCKOUT) {
            loginError.textContent = 'Trop de tentatives. Veuillez réessayer dans 1 minute.';
            loginError.style.display = 'block';
            return;
        }

        const email = document.getElementById('adminEmail').value.trim();
        const password = document.getElementById('adminPassword').value;

        try {
            let result = await window.supabaseAuth.signIn(email, password);

            if (!result.success) {
                result = await window.supabaseAuth.signUp(email, password);
                if (result.success) {
                    result = await window.supabaseAuth.signIn(email, password);
                }
            }

            if (!result.success) {
                loginAttempts++;
                lastAttemptTime = Date.now();
                loginError.textContent = 'Email ou mot de passe incorrect.';
                loginError.style.display = 'block';
                return;
            }

            const user = await window.supabaseAuth.getCurrentUser();
            const isAdmin = await isAdminUser(user);
            
            if (!isAdmin) {
                loginAttempts++;
                lastAttemptTime = Date.now();
                loginError.textContent = 'Accès refusé - Compte non autorisé.';
                loginError.style.display = 'block';
                await window.supabaseAuth.signOut();
                return;
            }

            loginAttempts = 0;
            loginForm.reset();
            await updateAdminUI(user);
        } catch (err) {
            loginError.textContent = 'Erreur: ' + err.message;
            loginError.style.display = 'block';
        }
    });

    // Toggle modal on icon click
    icon.addEventListener('click', () => {
        showLoginModal();
    });

    // Toggle edit mode on edit button click
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleEditMode();
    });

    // Close modal on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeLoginModal();
        }
    });

    // Check current user on load
    const user = await window.supabaseAuth.getCurrentUser();
    await updateAdminUI(user);
}

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function formatDate(value) {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('fr-FR');
}

function formatDateTime(dateValue, timeValue) {
    const date = formatDate(dateValue);
    const time = timeValue ? String(timeValue).slice(0, 5) : '';
    return time ? `${date} ${time}` : date;
}

function formatCreatedAt(value) {
    if (!value) return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '-';
    return date.toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' });
}

function renderAdminProducts(products) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    const addCard = document.getElementById('addProductCard');
    grid.innerHTML = '';
    if (addCard) grid.appendChild(addCard);

    if (!Array.isArray(products)) return;
    products.forEach((product) => {
        const card = document.createElement('div');
        card.className = 'product-card-admin';
        const statusClass = product.status === 'Vendu' ? 'cancelled' : '';
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; gap: 12px;">
                <strong>${escapeHtml(product.name)}</strong>
                <span class="status-pill ${statusClass}">${escapeHtml(product.status || 'Disponible')}</span>
            </div>
            <div style="color:#b0b0b0; font-size:0.85rem; margin-top: 6px;">${escapeHtml(product.category || '')}</div>
            <div style="margin-top: 10px; font-weight: 600; color: #fff;">${formatPrice(Number(product.price || 0))}</div>
            <div style="color:#b0b0b0; font-size:0.82rem; margin-top: 6px; line-height:1.4;">${escapeHtml((product.desc || '').slice(0, 120))}</div>
            <div class="product-actions">
                <button type="button" class="btn btn-secondary btn-small" data-product-action="edit" data-product-id="${escapeHtml(product.id)}">Modifier</button>
                <button type="button" class="btn btn-delete btn-small" data-product-action="delete" data-product-id="${escapeHtml(product.id)}">Supprimer</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function renderAdminContent(items) {
    const list = document.getElementById('contentList');
    if (!list) return;
    list.innerHTML = '';
    if (!Array.isArray(items)) return;
    items.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'content-card';
        card.innerHTML = `
            <div class="content-key">${escapeHtml(item.key)}</div>
            <div class="content-value">${escapeHtml(item.value)}</div>
        `;
        list.appendChild(card);
    });
}

function normalizeReviewItem(item = {}) {
    const ratingValue = Number(item.rating);
    return {
        author_name: String(item.author_name || '').trim(),
        rating: Number.isFinite(ratingValue) ? Math.max(1, Math.min(5, Math.round(ratingValue))) : 5,
        text: String(item.text || '').trim(),
        relative_time_description: '',
        time: item.time ? String(item.time) : null
    };
}

function normalizeReviewsPayload(payload = {}) {
    const reviews = Array.isArray(payload.reviews)
        ? payload.reviews
            .map((review) => normalizeReviewItem(review))
            .filter((review) => review.author_name)
        : [];

    const total = reviews.length;
    const ratingAverage = total
        ? Number((reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / total).toFixed(1))
        : 0;

    return {
        updated_at: payload.updated_at || new Date().toISOString(),
        source: 'manual',
        place: {
            name: payload?.place?.name || 'MaxiPC',
            rating: ratingAverage,
            user_ratings_total: total,
            google_maps_url: payload?.place?.google_maps_url || ''
        },
        write_review_url: payload?.write_review_url || '',
        reviews
    };
}

function createDefaultReviewsPayload() {
    return normalizeReviewsPayload({
        updated_at: new Date().toISOString(),
        source: 'manual',
        place: {
            name: 'MaxiPC',
            rating: 0,
            user_ratings_total: 0,
            google_maps_url: ''
        },
        write_review_url: '',
        reviews: []
    });
}

function normalizePromotionItem(item = {}) {
    const title = String(item.title || '').trim();
    const code = String(item.code || '').trim();
    const discountText = String(item.discount_text || '').trim();
    const description = String(item.description || '').trim();
    const startsAt = item.starts_at ? String(item.starts_at) : null;
    const endsAt = item.ends_at ? String(item.ends_at) : null;
    const active = item.active !== false;
    const type = String(item.type || 'custom').trim() || 'custom';
    const appliesTo = String(item.applies_to || 'all').trim() || 'all';
    const maxUsesRaw = Number(item.max_uses);
    const usedCountRaw = Number(item.used_count);
    const maxUses = Number.isFinite(maxUsesRaw) && maxUsesRaw > 0 ? Math.floor(maxUsesRaw) : null;
    const usedCount = Number.isFinite(usedCountRaw) && usedCountRaw >= 0 ? Math.floor(usedCountRaw) : 0;
    const autoDeactivate = item.auto_deactivate_on_limit !== false;

    return {
        title,
        code,
        discount_text: discountText,
        description,
        starts_at: startsAt,
        ends_at: endsAt,
        active,
        type,
        applies_to: appliesTo,
        max_uses: maxUses,
        used_count: usedCount,
        auto_deactivate_on_limit: autoDeactivate
    };
}

function normalizePromotionsPayload(payload = {}) {
    const promotions = Array.isArray(payload.promotions)
        ? payload.promotions
            .map((promotion) => normalizePromotionItem(promotion))
            .filter((promotion) => promotion.title || promotion.code)
        : [];

    return {
        updated_at: payload.updated_at || new Date().toISOString(),
        source: 'manual',
        promotions
    };
}

function createDefaultPromotionsPayload() {
    return normalizePromotionsPayload({
        updated_at: new Date().toISOString(),
        source: 'manual',
        promotions: []
    });
}

function renderReservationsTable(rows, tbody, emptyState) {
    if (!tbody || !emptyState) return;
    tbody.innerHTML = '';
    if (!Array.isArray(rows) || rows.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    emptyState.style.display = 'none';
    rows.forEach((row) => {
        const statusClass = row.status ? row.status.toLowerCase() : 'confirmed';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${escapeHtml(row.confirmation_number || row.id)}</td>
            <td>${escapeHtml(row.customer_name || '-')}</td>
            <td>${escapeHtml(row.customer_email || '-')}${row.customer_phone ? `<br>${escapeHtml(row.customer_phone)}` : ''}</td>
            <td>${escapeHtml(row.service || '-')}</td>
            <td>${formatDateTime(row.reservation_date, row.reservation_time)}</td>
            <td>
                <select class="status-select" data-type="reservation" data-id="${escapeHtml(row.id)}">
                    <option value="confirmed" ${row.status === 'confirmed' ? 'selected' : ''}>Confirmée</option>
                    <option value="in_progress" ${row.status === 'in_progress' ? 'selected' : ''}>En cours</option>
                    <option value="completed" ${row.status === 'completed' ? 'selected' : ''}>Terminée</option>
                    <option value="cancelled" ${row.status === 'cancelled' ? 'selected' : ''}>Annulée</option>
                </select>
            </td>
            <td>${formatCreatedAt(row.created_at)}</td>
            <td class="reservation-actions-cell">
                <button type="button" class="btn btn-delete btn-small reservation-delete-btn" data-reservation-action="delete" data-id="${escapeHtml(row.id)}" onclick="return window.__deleteReservationFromAdmin && window.__deleteReservationFromAdmin(event, '${escapeHtml(row.id)}')" aria-label="Supprimer la réservation">
                    <i class="fas fa-trash"></i>
                    <span>Supprimer</span>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function renderOrdersTable(rows, tbody, emptyState) {
    if (!tbody || !emptyState) return;
    tbody.innerHTML = '';
    if (!Array.isArray(rows) || rows.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    emptyState.style.display = 'none';
    rows.forEach((row) => {
        const statusClass = row.status ? row.status.toLowerCase() : 'pending';
        const detailsRaw = row.items_text || '-';
        const details = detailsRaw.replace(/\n+/g, ' | ').slice(0, 120);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${escapeHtml(row.reference || row.id)}</td>
            <td>${escapeHtml(row.customer_name || '-')}</td>
            <td>${escapeHtml(row.customer_email || '-')}${row.customer_phone ? `<br>${escapeHtml(row.customer_phone)}` : ''}</td>
            <td>${escapeHtml(details)}</td>
            <td>${formatCreatedAt(row.created_at)}</td>
            <td>
                <select class="status-select" data-type="order" data-id="${escapeHtml(row.id)}">
                    <option value="pending" ${row.status === 'pending' ? 'selected' : ''}>En attente</option>
                    <option value="processing" ${row.status === 'processing' ? 'selected' : ''}>En cours</option>
                    <option value="completed" ${row.status === 'completed' ? 'selected' : ''}>Terminée</option>
                    <option value="cancelled" ${row.status === 'cancelled' ? 'selected' : ''}>Annulée</option>
                </select>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function buildCsv(rows, columns) {
    const header = columns.map((col) => col.label).join(';');
    const lines = [header];
    rows.forEach((row) => {
        const values = columns.map((col) => {
            const raw = typeof col.value === 'function' ? col.value(row) : row[col.value];
            const safe = String(raw ?? '').replace(/\r?\n/g, ' ').replace(/"/g, '""');
            return `"${safe}"`;
        });
        lines.push(values.join(';'));
    });
    return lines.join('\n');
}

function downloadCsv(filename, content) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

async function loadAdminProducts() {
    const products = await loadShopProducts();
    adminProductsCache = Array.isArray(products) ? products : [];
    renderAdminProducts(adminProductsCache);
    const availableCount = adminProductsCache.filter((p) => p.status !== 'Vendu').length;
    const statProducts = document.getElementById('statProducts');
    const statAvailable = document.getElementById('statAvailable');
    if (statProducts) statProducts.textContent = adminProductsCache.length;
    if (statAvailable) statAvailable.textContent = availableCount;
}

async function loadAdminContent() {
    if (!window.supabaseClient) return;
    const { data } = await window.supabaseClient
        .from('site_content')
        .select('*')
        .order('key', { ascending: true });
    renderAdminContent(data || []);
    const statTexts = document.getElementById('statTexts');
    if (statTexts) statTexts.textContent = Array.isArray(data) ? data.length : 0;
}
    
    const loadAdminAvailability = async () => {
        if (!window.supabaseClient) return;

        const { data, error } = await window.supabaseClient
            .from('site_content')
            .select('key, value')
            .in('key', [
                'reservation.weekly_availability',
                'reservation.date_overrides',
                'reservation.daily_slots',
                'reservation.booked_slots',
                'reservation.purge_after_date'
            ]);

        if (error) {
            console.warn('Impossible de charger les disponibilités admin, affichage des valeurs par défaut.', error);
        }

        // Debug: log the raw response from Supabase when loading admin availability
        console.log('loadAdminAvailability response', { data, error });

        const map = new Map((Array.isArray(data) ? data : []).map((row) => [row.key, row.value]));

        // Debug: log the map created from site_content rows
        console.log('loadAdminAvailability map keys', Array.from(map.keys()));
        let weekly = {};
        let overrides = {};
        let daily_slots = {};
        let booked = {};

        try {
            weekly = JSON.parse(map.get('reservation.weekly_availability') || '{}');
        } catch {
            weekly = {};
        }

        try {
            overrides = JSON.parse(map.get('reservation.date_overrides') || '{}');
        } catch {
            overrides = {};
        }

        try {
            daily_slots = JSON.parse(map.get('reservation.daily_slots') || '{}');
        } catch {
            daily_slots = {};
        }

        try {
            booked = JSON.parse(map.get('reservation.booked_slots') || '{}');
        } catch {
            booked = {};
        }

        const purgeAfterDate = String(map.get('reservation.purge_after_date') || '').trim();
        availabilityPurgeCutoffDate = /^\d{4}-\d{2}-\d{2}$/.test(purgeAfterDate) ? purgeAfterDate : '';

        if (availabilityPurgeAfterDate) {
            availabilityPurgeAfterDate.value = availabilityPurgeCutoffDate;
        }

        fillAvailabilityForm(weekly, overrides, booked);
        dailyAvailability = daily_slots;
        if (typeof window.initCalendar === 'function') {
            try {
                window.initCalendar();
            } catch (err) {
                console.warn('Erreur lors de l\u0027appel de initCalendar()', err);
            }
        } else {
            console.warn('initCalendar() non défini au moment du chargement des disponibilit\u00e9s.');
        }
    };

let adminReservationsCache = [];
let adminOrdersCache = [];
let adminProductsCache = [];
let adminReviewsPayload = createDefaultReviewsPayload();
let adminPromotionsPayload = createDefaultPromotionsPayload();

async function loadAdminReservationsAndOrders() {
    if (!window.supabaseClient) return;
    const reservationsTable = document.getElementById('reservationsTableBody');
    const reservationsEmpty = document.getElementById('reservationsEmpty');
    const ordersTable = document.getElementById('ordersTableBody');
    const ordersEmpty = document.getElementById('ordersEmpty');

    const { data: reservations } = await window.supabaseClient
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false });

    const { data: orders } = await window.supabaseClient
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

    adminReservationsCache = reservations || [];
    adminOrdersCache = orders || [];
    renderReservationsTable(adminReservationsCache, reservationsTable, reservationsEmpty);
    renderOrdersTable(adminOrdersCache, ordersTable, ordersEmpty);

    const statReservations = document.getElementById('statReservations');
    const statOrders = document.getElementById('statOrders');
    if (statReservations) statReservations.textContent = adminReservationsCache.length;
    if (statOrders) statOrders.textContent = adminOrdersCache.length;
}

async function initializeAdminDashboardPage() {
    const adminApp = document.getElementById('adminApp');
    if (!adminApp || !window.supabaseAuth || !window.supabaseClient) return;

    const adminAuth = document.getElementById('adminAuth');
    const adminDashboard = document.getElementById('adminDashboard');
    const loginForm = document.getElementById('adminLoginForm');
    const adminMessage = document.getElementById('adminMessage');
    const adminSignOut = document.getElementById('adminSignOut');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const exportReservationsBtn = document.getElementById('exportReservationsBtn');
    const exportOrdersBtn = document.getElementById('exportOrdersBtn');
    const manualReservationForm = document.getElementById('adminManualReservationForm');
    const manualReservationSubmitBtn = document.getElementById('adminManualReservationSubmitBtn');
    const addReviewBtn = document.getElementById('addReviewBtn');
    const reviewsAdminList = document.getElementById('reviewsAdminList');
    const addPromotionBtn = document.getElementById('addPromotionBtn');
    const promotionsAdminList = document.getElementById('promotionsAdminList');
    const saveAvailabilityBtn = document.getElementById('saveAvailabilityBtn');
    const availabilityPresetWeekBtn = document.getElementById('availabilityPresetWeekBtn');
    const availabilityPresetClearBtn = document.getElementById('availabilityPresetClearBtn');
    const availabilityQuickStart = document.getElementById('availabilityQuickStart');
    const availabilityQuickEnd = document.getElementById('availabilityQuickEnd');
    const availabilityQuickStep = document.getElementById('availabilityQuickStep');
    const availabilityQuickApplyBtn = document.getElementById('availabilityQuickApplyBtn');
    const availabilityQuickClearDaysBtn = document.getElementById('availabilityQuickClearDaysBtn');
    const availabilityPurgeAfterDate = document.getElementById('availabilityPurgeAfterDate');
    const availabilityPurgeAfterDateBtn = document.getElementById('availabilityPurgeAfterDateBtn');
    const productsGrid = document.getElementById('productsGrid');
    const reservationsTable = document.getElementById('reservationsTableBody');
    const ordersTable = document.getElementById('ordersTableBody');
    const toastContainer = document.getElementById('adminToastContainer');
    const editModal = document.getElementById('editModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalInput = document.getElementById('modalInput');
    const modalSave = document.getElementById('modalSave');
    const modalCancel = document.getElementById('modalCancel');
    const closeModal = document.getElementById('closeModal');
    const modalContent = editModal ? editModal.querySelector('.modal-content') : null;
    let productEditorForm = document.getElementById('productEditorForm');
    if (!productEditorForm && modalContent && modalInput) {
        productEditorForm = document.createElement('div');
        productEditorForm.id = 'productEditorForm';
        productEditorForm.style.display = 'none';
        productEditorForm.style.marginBottom = '14px';
        modalContent.insertBefore(productEditorForm, modalInput);
    }
    let editingProductId = null;
    let productEditMode = false;
    let reviewEditMode = false;
    let promotionEditMode = false;
    let editingReviewIndex = null;
    let editingPromotionIndex = null;
    const availabilityWeekEditor = document.getElementById('availabilityWeekEditor');
    const availabilityOverrides = document.getElementById('availabilityOverrides');
    const availabilityBooked = document.getElementById('availabilityBooked');
    const DAY_CONFIG = [
        { day: 1, label: 'Lundi' },
        { day: 2, label: 'Mardi' },
        { day: 3, label: 'Mercredi' },
        { day: 4, label: 'Jeudi' },
        { day: 5, label: 'Vendredi' },
        { day: 6, label: 'Samedi' },
        { day: 0, label: 'Dimanche' }
    ];
    let availabilityState = {
        weekly: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
        overrides: {},
        booked: {}
    };

    const LEGACY_DEFAULTS_CUTOFF = new Date(2026, 4, 1);
    // Remove legacy prefilled hours so the editor is empty by default
    const LEGACY_DEFAULT_WEEKLY_AVAILABILITY = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: []
    };

    function normalizeLegacySlot(value) {
        return String(value || '').trim().replace(/h/gi, ':').replace(/[.]/g, ':').slice(0, 5);
    }

    function isOnOrAfterLegacyCutoffDateKey(dateKey) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(String(dateKey || ''))) return false;
        const [year, month, day] = String(dateKey).split('-').map(Number);
        return new Date(year, month - 1, day).getTime() >= LEGACY_DEFAULTS_CUTOFF.getTime();
    }

    function matchesLegacyWeeklySlots(dayOfWeek, slots) {
        const expected = LEGACY_DEFAULT_WEEKLY_AVAILABILITY[Number(dayOfWeek)] || [];
        if (!Array.isArray(slots)) return false;
        const normalized = slots.map((slot) => normalizeLegacySlot(slot)).filter(Boolean);
        if (normalized.length !== expected.length) return false;
        return normalized.every((slot, index) => slot === expected[index]);
    }

    function stripLegacyAvailabilityDefaults(weekly = {}, dailySlots = {}) {
        const sanitizedWeekly = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };

        Object.keys(sanitizedWeekly).forEach((day) => {
            const daySlots = Array.isArray(weekly[day]) ? weekly[day] : [];
            sanitizedWeekly[day] = matchesLegacyWeeklySlots(day, daySlots)
                ? []
                : daySlots.map((slot) => normalizeLegacySlot(slot)).filter(Boolean);
        });

        const sanitizedDailySlots = {};
        Object.entries(dailySlots || {}).forEach(([dateKey, slots]) => {
            if (isOnOrAfterLegacyCutoffDateKey(dateKey) && matchesLegacyWeeklySlots(new Date(dateKey).getDay(), slots)) {
                sanitizedDailySlots[dateKey] = [];
                return;
            }
            sanitizedDailySlots[dateKey] = Array.isArray(slots)
                ? slots.map((slot) => normalizeLegacySlot(slot)).filter(Boolean)
                : slots;
        });

        return {
            weekly: sanitizedWeekly,
            dailySlots: sanitizedDailySlots
        };
    }

    /* Duplicate definition removed — single `loadAdminAvailability` is defined earlier with debug logs. */

    const showMessage = (type, text) => {
        if (!adminMessage) return;
        adminMessage.textContent = text;
        adminMessage.className = `message show ${type}`;
    };

    const setDashboardVisible = (visible) => {
        if (adminAuth) adminAuth.style.display = visible ? 'none' : 'block';
        if (adminDashboard) adminDashboard.classList.toggle('show', visible);
        if (adminSignOut) adminSignOut.style.display = visible ? 'inline-flex' : 'none';
    };

    const canAccessAdmin = async (user) => {
        if (!user) return false;
        const adminEmails = window.ADMIN_EMAILS || [];
        if (adminEmails.includes(user.email)) return true;
        const { data } = await window.supabaseClient
            .from('admin_users')
            .select('user_id')
            .eq('user_id', user.id)
            .single();
        return !!data;
    };

    const setupTabs = () => {
        tabButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                tabButtons.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');
                document.querySelectorAll('.tab-content').forEach((content) => {
                    content.classList.toggle('active', content.id === `${tab}Tab`);
                });
            });
        });
    };

    const showToast = (message) => {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'admin-toast';
        toast.textContent = message;
        toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 4000);
    };

    window.__deleteReservationFromAdmin = async (event, reservationId) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        const id = String(reservationId || '').trim();
        if (!id) {
            showToast('Identifiant de réservation manquant.');
            return false;
        }

        const confirmed = confirm('Supprimer définitivement cette réservation ?');
        if (!confirmed) return false;

        showToast('Suppression en cours...');

        const { data, error } = await window.supabaseClient
            .from('reservations')
            .delete()
            .eq('id', id)
            .select('id');

        if (error) {
            const errorMessage = String(error.message || '');
            if (errorMessage.toLowerCase().includes('policy')) {
                showToast('Suppression refusée par la base. Applique la migration SQL admin puis réessaie.');
                return false;
            }
            showToast('Suppression impossible.');
            return false;
        }

        if (!Array.isArray(data) || data.length === 0) {
            showToast('La réservation n’a pas été supprimée.');
            return false;
        }

        showToast('Réservation supprimée.');
        await loadAdminReservationsAndOrders();
        return false;
    };

    const canUseBrowserNotification = () => typeof window !== 'undefined' && 'Notification' in window;

    const ensureNotificationPermission = async () => {
        if (!canUseBrowserNotification()) return false;
        if (Notification.permission === 'granted') return true;
        if (Notification.permission === 'denied') return false;
        try {
            const permission = await Notification.requestPermission();
            return permission === 'granted';
        } catch {
            return false;
        }
    };

    const notifyAdmin = async (title, message) => {
        showToast(message);
        const granted = await ensureNotificationPermission();
        if (!granted) return;
        new Notification(title, {
            body: message,
            icon: 'Assets/Logo.png'
        });
    };

    const setProductEditMode = (enabled) => {
        productEditMode = enabled;
        if (productEditorForm) productEditorForm.style.display = enabled ? 'grid' : 'none';
        if (modalInput) modalInput.style.display = enabled ? 'none' : 'block';
    };

    const setReviewEditMode = (enabled) => {
        reviewEditMode = enabled;
        if (productEditorForm) productEditorForm.style.display = enabled ? 'grid' : (productEditMode ? 'grid' : 'none');
        if (modalInput) modalInput.style.display = enabled ? 'none' : (productEditMode ? 'none' : 'block');
    };

    const setPromotionEditMode = (enabled) => {
        promotionEditMode = enabled;
        if (productEditorForm) productEditorForm.style.display = enabled ? 'grid' : (reviewEditMode || productEditMode ? 'grid' : 'none');
        if (modalInput) modalInput.style.display = enabled ? 'none' : (reviewEditMode || productEditMode ? 'none' : 'block');
    };

    const renderReviewsAdminList = () => {
        if (!reviewsAdminList) return;
        const reviews = Array.isArray(adminReviewsPayload?.reviews) ? adminReviewsPayload.reviews : [];

        if (!reviews.length) {
            reviewsAdminList.innerHTML = `
                <div class="content-card">
                    <div class="content-key">Aucun avis</div>
                    <div class="content-value">Ajoute ton premier avis client.</div>
                </div>
            `;
            return;
        }

        reviewsAdminList.innerHTML = reviews.map((review, index) => {
            const stars = '★'.repeat(Math.max(1, Math.min(5, Number(review.rating || 0))));
            return `
                <div class="content-card" data-review-index="${index}">
                    <div class="content-key">${escapeHtml(review.author_name)} • ${stars}</div>
                    <div class="content-value">${escapeHtml((review.text || '').slice(0, 220))}</div>
                    <div class="content-actions">
                        <button type="button" class="btn btn-secondary" data-review-action="edit" data-review-index="${index}">Modifier</button>
                        <button type="button" class="btn btn-delete" data-review-action="delete" data-review-index="${index}">Supprimer</button>
                    </div>
                </div>
            `;
        }).join('');
    };

    const renderReviewForm = (reviewData = {}) => {
        if (!productEditorForm) return;
        const safe = normalizeReviewItem(reviewData);
        const reviewDate = (() => {
            const base = safe.time ? new Date(safe.time) : new Date();
            const fallback = new Date();
            const date = Number.isNaN(base.getTime()) ? fallback : base;
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        })();

        productEditorForm.innerHTML = `
            <label style="display:flex; flex-direction:column; gap:6px; color:#fff; margin-bottom:10px;">
                <span>Auteur</span>
                <input id="reviewFieldAuthor" type="text" value="${escapeHtml(safe.author_name)}" style="padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:#131327; color:#fff;">
            </label>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:10px;">
                <label style="display:flex; flex-direction:column; gap:6px; color:#fff;">
                    <span>Note (1 à 5)</span>
                    <input id="reviewFieldRating" type="number" min="1" max="5" step="1" value="${safe.rating}" style="padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:#131327; color:#fff;">
                </label>
                <label style="display:flex; flex-direction:column; gap:6px; color:#fff;">
                    <span>Date de l'avis</span>
                    <input id="reviewFieldDate" type="date" value="${reviewDate}" style="padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:#131327; color:#fff;">
                </label>
            </div>
            <label style="display:flex; flex-direction:column; gap:6px; color:#fff; margin-bottom:10px;">
                <span>Avis</span>
                <textarea id="reviewFieldText" rows="5" style="padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:#131327; color:#fff; resize:vertical;">${escapeHtml(safe.text)}</textarea>
            </label>
        `;
    };

    const getReviewPayloadFromForm = () => {
        const author = document.getElementById('reviewFieldAuthor')?.value.trim() || '';
        const rating = Number(document.getElementById('reviewFieldRating')?.value || 0);
        const text = document.getElementById('reviewFieldText')?.value.trim() || '';
        const reviewDate = document.getElementById('reviewFieldDate')?.value || '';
        const dateIso = /^\d{4}-\d{2}-\d{2}$/.test(reviewDate)
            ? new Date(`${reviewDate}T12:00:00`).toISOString()
            : null;
        return normalizeReviewItem({
            author_name: author,
            rating,
            text,
            relative_time_description: '',
            time: dateIso
        });
    };

    const openReviewModal = (title, index, reviewData) => {
        if (!editModal || !modalTitle) return;
        editingReviewIndex = index;
        modalTitle.textContent = title;
        setProductEditMode(false);
        setReviewEditMode(true);
        renderReviewForm(reviewData || {});
        editModal.classList.add('show');
        const firstField = document.getElementById('reviewFieldAuthor');
        if (firstField) firstField.focus();
    };

    const closeReviewModal = () => {
        editingReviewIndex = null;
        setReviewEditMode(false);
    };

    const renderPromotionsAdminList = () => {
        if (!promotionsAdminList) return;
        const promotions = Array.isArray(adminPromotionsPayload?.promotions) ? adminPromotionsPayload.promotions : [];

        if (!promotions.length) {
            promotionsAdminList.innerHTML = `
                <div class="content-card">
                    <div class="content-key">Aucune promotion</div>
                    <div class="content-value">Ajoute ta première offre promotionnelle.</div>
                </div>
            `;
            return;
        }

        promotionsAdminList.innerHTML = promotions.map((promotion, index) => {
            const stateLabel = promotion.active ? 'Active' : 'Inactive';
            const periodLabel = [promotion.starts_at || '', promotion.ends_at || ''].filter(Boolean).join(' → ') || 'Sans date';
            const quotaLabel = Number.isFinite(Number(promotion.max_uses)) && Number(promotion.max_uses) > 0
                ? `${Math.max(0, Number(promotion.max_uses) - Number(promotion.used_count || 0))} restant(s) / ${Number(promotion.max_uses)}`
                : 'Sans limite';
            return `
                <div class="content-card" data-promotion-index="${index}">
                    <div class="content-key">${escapeHtml(promotion.code || 'Sans code')} • ${stateLabel} • ${escapeHtml(String(promotion.type || 'custom'))}</div>
                    <div class="content-value"><strong>${escapeHtml(promotion.title || 'Promotion')}</strong><br>${escapeHtml((promotion.discount_text || '').trim())}<br><span style="color:#b0b0b0; font-size:0.82rem;">${escapeHtml(periodLabel)} • ${escapeHtml(quotaLabel)}</span></div>
                    <div class="content-actions">
                        <button type="button" class="btn btn-secondary" data-promotion-action="edit" data-promotion-index="${index}">Modifier</button>
                        <button type="button" class="btn btn-delete" data-promotion-action="delete" data-promotion-index="${index}">Supprimer</button>
                    </div>
                </div>
            `;
        }).join('');
    };

    const renderPromotionForm = (promotionData = {}) => {
        if (!productEditorForm) return;
        const safe = normalizePromotionItem(promotionData);
        const startsAt = /^\d{4}-\d{2}-\d{2}$/.test(String(safe.starts_at || '')) ? safe.starts_at : '';
        const endsAt = /^\d{4}-\d{2}-\d{2}$/.test(String(safe.ends_at || '')) ? safe.ends_at : '';

        productEditorForm.innerHTML = `
            <label style="display:flex; flex-direction:column; gap:6px; color:#fff; margin-bottom:10px;">
                <span>Titre</span>
                <input id="promotionFieldTitle" type="text" value="${escapeHtml(safe.title)}" style="padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:#131327; color:#fff;">
            </label>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:10px;">
                <label style="display:flex; flex-direction:column; gap:6px; color:#fff;">
                    <span>Code promo</span>
                    <input id="promotionFieldCode" type="text" value="${escapeHtml(safe.code)}" style="padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:#131327; color:#fff;">
                </label>
                <label style="display:flex; flex-direction:column; gap:6px; color:#fff;">
                    <span>Réduction</span>
                    <input id="promotionFieldDiscount" type="text" value="${escapeHtml(safe.discount_text)}" placeholder="Ex: -10%" style="padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:#131327; color:#fff;">
                </label>
            </div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:10px;">
                <label style="display:flex; flex-direction:column; gap:6px; color:#fff;">
                    <span>Type</span>
                    <select id="promotionFieldType" style="padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:#131327; color:#fff;">
                        <option value="custom" ${safe.type === 'custom' ? 'selected' : ''}>Personnalisée</option>
                        <option value="first_n_clients" ${safe.type === 'first_n_clients' ? 'selected' : ''}>Premiers clients</option>
                        <option value="percentage" ${safe.type === 'percentage' ? 'selected' : ''}>Pourcentage</option>
                        <option value="amount" ${safe.type === 'amount' ? 'selected' : ''}>Montant fixe</option>
                        <option value="bundle" ${safe.type === 'bundle' ? 'selected' : ''}>Pack/Bundle</option>
                        <option value="free_service" ${safe.type === 'free_service' ? 'selected' : ''}>Service offert</option>
                        <option value="seasonal" ${safe.type === 'seasonal' ? 'selected' : ''}>Saisonnière</option>
                    </select>
                </label>
                <label style="display:flex; flex-direction:column; gap:6px; color:#fff;">
                    <span>Applicable à</span>
                    <select id="promotionFieldAppliesTo" style="padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:#131327; color:#fff;">
                        <option value="all" ${safe.applies_to === 'all' ? 'selected' : ''}>Tout</option>
                        <option value="services" ${safe.applies_to === 'services' ? 'selected' : ''}>Prestations</option>
                        <option value="shop" ${safe.applies_to === 'shop' ? 'selected' : ''}>Boutique</option>
                    </select>
                </label>
            </div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:10px;">
                <label style="display:flex; flex-direction:column; gap:6px; color:#fff;">
                    <span>Début</span>
                    <input id="promotionFieldStart" type="date" value="${startsAt}" style="padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:#131327; color:#fff;">
                </label>
                <label style="display:flex; flex-direction:column; gap:6px; color:#fff;">
                    <span>Fin</span>
                    <input id="promotionFieldEnd" type="date" value="${endsAt}" style="padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:#131327; color:#fff;">
                </label>
            </div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:10px;">
                <label style="display:flex; flex-direction:column; gap:6px; color:#fff;">
                    <span>Quota max (optionnel)</span>
                    <input id="promotionFieldMaxUses" type="number" min="1" value="${safe.max_uses || ''}" placeholder="Ex: 15" style="padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:#131327; color:#fff;">
                </label>
                <label style="display:flex; flex-direction:column; gap:6px; color:#fff;">
                    <span>Déjà utilisés</span>
                    <input id="promotionFieldUsedCount" type="number" min="0" value="${safe.used_count || 0}" style="padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:#131327; color:#fff;">
                </label>
            </div>
            <label style="display:flex; flex-direction:column; gap:6px; color:#fff; margin-bottom:10px;">
                <span>Description</span>
                <textarea id="promotionFieldDescription" rows="4" style="padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:#131327; color:#fff; resize:vertical;">${escapeHtml(safe.description)}</textarea>
            </label>
            <label style="display:inline-flex; align-items:center; gap:8px; color:#fff;">
                <input id="promotionFieldActive" type="checkbox" ${safe.active ? 'checked' : ''}> Promotion active
            </label>
            <label style="display:inline-flex; align-items:center; gap:8px; color:#fff; margin-left:16px;">
                <input id="promotionFieldAutoDeactivate" type="checkbox" ${safe.auto_deactivate_on_limit ? 'checked' : ''}> Désactiver auto à quota atteint
            </label>
        `;
    };

    const getPromotionPayloadFromForm = () => {
        const startRaw = document.getElementById('promotionFieldStart')?.value || '';
        const endRaw = document.getElementById('promotionFieldEnd')?.value || '';
        const maxUsesRaw = Number(document.getElementById('promotionFieldMaxUses')?.value || 0);
        const usedCountRaw = Number(document.getElementById('promotionFieldUsedCount')?.value || 0);
        return normalizePromotionItem({
            title: document.getElementById('promotionFieldTitle')?.value.trim() || '',
            code: document.getElementById('promotionFieldCode')?.value.trim() || '',
            discount_text: document.getElementById('promotionFieldDiscount')?.value.trim() || '',
            description: document.getElementById('promotionFieldDescription')?.value.trim() || '',
            starts_at: /^\d{4}-\d{2}-\d{2}$/.test(startRaw) ? startRaw : null,
            ends_at: /^\d{4}-\d{2}-\d{2}$/.test(endRaw) ? endRaw : null,
            active: Boolean(document.getElementById('promotionFieldActive')?.checked),
            type: document.getElementById('promotionFieldType')?.value || 'custom',
            applies_to: document.getElementById('promotionFieldAppliesTo')?.value || 'all',
            max_uses: Number.isFinite(maxUsesRaw) && maxUsesRaw > 0 ? Math.floor(maxUsesRaw) : null,
            used_count: Number.isFinite(usedCountRaw) && usedCountRaw >= 0 ? Math.floor(usedCountRaw) : 0,
            auto_deactivate_on_limit: Boolean(document.getElementById('promotionFieldAutoDeactivate')?.checked)
        });
    };

    const openPromotionModal = (title, index, promotionData) => {
        if (!editModal || !modalTitle) return;
        editingPromotionIndex = index;
        modalTitle.textContent = title;
        setProductEditMode(false);
        closeReviewModal();
        setPromotionEditMode(true);
        renderPromotionForm(promotionData || {});
        editModal.classList.add('show');
        const firstField = document.getElementById('promotionFieldTitle');
        if (firstField) firstField.focus();
    };

    const closePromotionModal = () => {
        editingPromotionIndex = null;
        setPromotionEditMode(false);
    };

    const savePromotionsToSiteContent = async () => {
        const normalized = normalizePromotionsPayload({
            ...adminPromotionsPayload,
            updated_at: new Date().toISOString()
        });

        const { error } = await window.supabaseClient
            .from('site_content')
            .upsert(
                {
                    key: 'shop.promotions_json',
                    value: JSON.stringify(normalized),
                    updated_at: new Date().toISOString()
                },
                { onConflict: 'key' }
            );

        if (error) return false;
        adminPromotionsPayload = normalized;
        return true;
    };

    const loadAdminPromotions = async () => {
        if (!window.supabaseClient) return;
        const { data } = await window.supabaseClient
            .from('site_content')
            .select('value')
            .eq('key', 'shop.promotions_json')
            .single();

        if (!data?.value) {
            adminPromotionsPayload = createDefaultPromotionsPayload();
            renderPromotionsAdminList();
            return;
        }

        try {
            const parsed = JSON.parse(data.value);
            adminPromotionsPayload = normalizePromotionsPayload(parsed);
        } catch {
            adminPromotionsPayload = createDefaultPromotionsPayload();
        }

        renderPromotionsAdminList();
    };

    const saveReviewsToSiteContent = async () => {
        const normalized = normalizeReviewsPayload({
            ...adminReviewsPayload,
            updated_at: new Date().toISOString()
        });

        const { error } = await window.supabaseClient
            .from('site_content')
            .upsert(
                {
                    key: 'homepage.reviews_json',
                    value: JSON.stringify(normalized),
                    updated_at: new Date().toISOString()
                },
                { onConflict: 'key' }
            );

        if (error) return false;
        adminReviewsPayload = normalized;
        return true;
    };

    const loadAdminReviews = async () => {
        if (!window.supabaseClient) return;
        const { data } = await window.supabaseClient
            .from('site_content')
            .select('value')
            .eq('key', 'homepage.reviews_json')
            .single();

        if (!data?.value) {
            adminReviewsPayload = createDefaultReviewsPayload();
            renderReviewsAdminList();
            return;
        }

        try {
            const parsed = JSON.parse(data.value);
            adminReviewsPayload = normalizeReviewsPayload(parsed);
        } catch {
            adminReviewsPayload = createDefaultReviewsPayload();
        }

        renderReviewsAdminList();
    };

    const updateProductImagePreview = (value) => {
        const preview = document.getElementById('productImagePreview');
        if (!preview) return;
        if (value) {
            preview.src = value;
            preview.style.display = 'block';
        } else {
            preview.removeAttribute('src');
            preview.style.display = 'none';
        }
    };

    const setProductImageValue = (value) => {
        const imageInput = document.getElementById('productFieldImage');
        if (imageInput) imageInput.value = value || '';
        updateProductImagePreview(value || '');
    };

    const readProductImageFile = (file) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            showToast('Le fichier doit être une image.');
            return;
        }
        if (file.size > 4 * 1024 * 1024) {
            showToast('Image trop lourde (max 4MB).');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const result = typeof reader.result === 'string' ? reader.result : '';
            setProductImageValue(result);
            showToast('Image chargée.');
        };
        reader.onerror = () => {
            showToast('Impossible de lire l’image.');
        };
        reader.readAsDataURL(file);
    };

    const bindProductImageUploader = () => {
        const picker = document.getElementById('productImageFile');
        const dropzone = document.getElementById('productImageDropzone');
        const chooseButton = document.getElementById('productImageChooseBtn');
        const imageInput = document.getElementById('productFieldImage');

        if (chooseButton && picker) {
            chooseButton.addEventListener('click', () => picker.click());
        }

        if (picker) {
            picker.addEventListener('change', () => {
                const file = picker.files && picker.files[0] ? picker.files[0] : null;
                readProductImageFile(file);
            });
        }

        if (imageInput) {
            imageInput.addEventListener('input', () => {
                updateProductImagePreview(imageInput.value.trim());
            });
        }

        if (dropzone) {
            dropzone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropzone.style.borderColor = 'rgba(240, 147, 251, 0.8)';
            });
            dropzone.addEventListener('dragleave', () => {
                dropzone.style.borderColor = 'rgba(240, 147, 251, 0.4)';
            });
            dropzone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropzone.style.borderColor = 'rgba(240, 147, 251, 0.4)';
                const file = e.dataTransfer?.files?.[0] || null;
                readProductImageFile(file);
            });
        }
    };

    const renderProductForm = (productData = {}) => {
        if (!productEditorForm) return;
        const safe = {
            name: productData.name || '',
            category: productData.category || 'pieces',
            price: Number(productData.price || 0),
            status: productData.status || 'Disponible',
            meta: productData.meta || '',
            image: productData.image || '',
            badge: productData.badge || '',
            condition: productData.condition || '',
            desc: productData.desc || '',
            specs: productData.specs || ''
        };

        productEditorForm.innerHTML = `
            <label style="display:flex; flex-direction:column; gap:6px; color:#fff; margin-bottom:10px;">
                <span>Nom du produit</span>
                <input id="productFieldName" type="text" value="${escapeHtml(safe.name)}" style="padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:#131327; color:#fff;">
            </label>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:10px;">
                <label style="display:flex; flex-direction:column; gap:6px; color:#fff;">
                    <span>Prix (€)</span>
                    <input id="productFieldPrice" type="number" min="0" step="0.01" value="${safe.price}" style="padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:#131327; color:#fff;">
                </label>
                <label style="display:flex; flex-direction:column; gap:6px; color:#fff;">
                    <span>Catégorie</span>
                    <select id="productFieldCategory" style="padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:#131327; color:#fff;">
                        <option value="pieces" ${safe.category === 'pieces' ? 'selected' : ''}>Pièces</option>
                        <option value="services" ${safe.category === 'services' ? 'selected' : ''}>Services</option>
                        <option value="packs" ${safe.category === 'packs' ? 'selected' : ''}>Packs</option>
                        <option value="pcs" ${safe.category === 'pcs' ? 'selected' : ''}>PC</option>
                    </select>
                </label>
            </div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:10px;">
                <label style="display:flex; flex-direction:column; gap:6px; color:#fff;">
                    <span>Statut</span>
                    <select id="productFieldStatus" style="padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:#131327; color:#fff;">
                        <option value="Disponible" ${safe.status === 'Disponible' ? 'selected' : ''}>Disponible</option>
                        <option value="Vendu" ${safe.status === 'Vendu' ? 'selected' : ''}>Vendu</option>
                    </select>
                </label>
                <label style="display:flex; flex-direction:column; gap:6px; color:#fff;">
                    <span>Label court (meta)</span>
                    <input id="productFieldMeta" type="text" value="${escapeHtml(safe.meta)}" style="padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:#131327; color:#fff;">
                </label>
            </div>
            <label style="display:flex; flex-direction:column; gap:6px; color:#fff; margin-bottom:10px;">
                <span>Image (URL)</span>
                <input id="productFieldImage" type="text" value="${escapeHtml(safe.image)}" style="padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:#131327; color:#fff;">
            </label>
            <div id="productImageDropzone" style="border:2px dashed rgba(240, 147, 251, 0.4); border-radius:10px; padding:12px; margin-bottom:10px; text-align:center; background:rgba(240,147,251,0.06);">
                <input id="productImageFile" type="file" accept="image/*" style="display:none;">
                <button id="productImageChooseBtn" type="button" class="btn btn-secondary" style="margin-bottom:8px;">Parcourir une image</button>
                <div style="font-size:0.85rem; color:#c8c8d8;">ou glissez-déposez ici (JPG/PNG/WebP, max 4MB)</div>
                <img id="productImagePreview" alt="Aperçu image" style="display:${safe.image ? 'block' : 'none'}; max-width:100%; max-height:170px; margin:10px auto 0; border-radius:10px; object-fit:cover;" src="${escapeHtml(safe.image)}">
            </div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:10px;">
                <label style="display:flex; flex-direction:column; gap:6px; color:#fff;">
                    <span>Badge</span>
                    <input id="productFieldBadge" type="text" value="${escapeHtml(safe.badge)}" style="padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:#131327; color:#fff;">
                </label>
                <label style="display:flex; flex-direction:column; gap:6px; color:#fff;">
                    <span>Condition</span>
                    <input id="productFieldCondition" type="text" value="${escapeHtml(safe.condition)}" style="padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:#131327; color:#fff;">
                </label>
            </div>
            <label style="display:flex; flex-direction:column; gap:6px; color:#fff; margin-bottom:10px;">
                <span>Description</span>
                <textarea id="productFieldDesc" rows="3" style="padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:#131327; color:#fff; resize:vertical;">${escapeHtml(safe.desc)}</textarea>
            </label>
            <label style="display:flex; flex-direction:column; gap:6px; color:#fff;">
                <span>Spécifications</span>
                <textarea id="productFieldSpecs" rows="3" style="padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:#131327; color:#fff; resize:vertical;">${escapeHtml(safe.specs)}</textarea>
            </label>
        `;

        bindProductImageUploader();
        updateProductImagePreview(safe.image);
    };

    const getProductPayloadFromForm = () => {
        const name = document.getElementById('productFieldName')?.value.trim() || '';
        const priceValue = document.getElementById('productFieldPrice')?.value;
        const price = Number(priceValue);
        return {
            name,
            price,
            category: document.getElementById('productFieldCategory')?.value || 'pieces',
            status: document.getElementById('productFieldStatus')?.value || 'Disponible',
            meta: document.getElementById('productFieldMeta')?.value.trim() || '',
            image: document.getElementById('productFieldImage')?.value.trim() || '',
            badge: document.getElementById('productFieldBadge')?.value.trim() || '',
            condition: document.getElementById('productFieldCondition')?.value.trim() || '',
            desc: document.getElementById('productFieldDesc')?.value.trim() || '',
            specs: document.getElementById('productFieldSpecs')?.value.trim() || ''
        };
    };

    const openProductModal = (title, productId, productData) => {
        if (!editModal || !modalTitle) return;
        editingProductId = productId;
        closeReviewModal();
        closePromotionModal();
        modalTitle.textContent = title;
        setProductEditMode(true);
        renderProductForm(productData);
        editModal.classList.add('show');
        const firstField = document.getElementById('productFieldName');
        if (firstField) firstField.focus();
    };

    const closeProductModal = () => {
        if (!editModal) return;
        editModal.classList.remove('show');
        setProductEditMode(false);
        closeReviewModal();
        closePromotionModal();
        editingProductId = null;
    };

    const loadDashboardData = async () => {
        await loadAdminProducts();
        await loadAdminContent();
        await loadAdminReviews();
        await loadAdminPromotions();
        await loadAdminReservationsAndOrders();
    };

    const isValidTime = (value) => /^([01]\d|2[0-3]):[0-5]\d$/.test(String(value || '').trim());

    const normalizeTime = (value) => {
        const raw = String(value || '').trim();
        if (!raw) return null;

        const cleaned = raw
            .replace(/h/gi, ':')
            .replace(/[.]/g, ':')
            .trim();

        const hhmm = cleaned.length >= 5 ? cleaned.slice(0, 5) : cleaned;
        if (isValidTime(hhmm)) return hhmm;
        return null;
    };

    const generateAdminReservationReference = () => {
        return `ADM-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    };

    const sortSlots = (slots) => [...new Set(slots)].sort((a, b) => a.localeCompare(b));

    const timeToMinutes = (value) => {
        const normalized = normalizeTime(value);
        if (!normalized) return null;
        const [hours, minutes] = normalized.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const minutesToTime = (minutesValue) => {
        const safe = Math.max(0, Math.min(1439, Number(minutesValue) || 0));
        const hours = String(Math.floor(safe / 60)).padStart(2, '0');
        const minutes = String(safe % 60).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const buildSlotsFromRange = (start, end, stepMinutes) => {
        const startMinutes = timeToMinutes(start);
        const endMinutes = timeToMinutes(end);
        const step = Number(stepMinutes);

        if (startMinutes === null || endMinutes === null) return null;
        if (!Number.isFinite(step) || step <= 0) return null;
        if (endMinutes < startMinutes) return null;

        const slots = [];
        for (let cursor = startMinutes; cursor <= endMinutes; cursor += step) {
            slots.push(minutesToTime(cursor));
            if (slots.length > 200) break;
        }
        return sortSlots(slots);
    };

    const getQuickSelectedDays = () => {
        return Array.from(document.querySelectorAll('[data-quick-day]'))
            .filter((input) => input instanceof HTMLInputElement && input.checked)
            .map((input) => input.getAttribute('data-quick-day'))
            .filter((value) => value !== null)
            .map((value) => String(value));
    };

    const parseTimesInput = (value) => {
        if (!value) return [];
        return sortSlots(
            value
                .split(',')
                .map((entry) => normalizeTime(entry))
                .filter(Boolean)
        );
    };

    const ensureWeeklyStructure = (weekly = {}) => {
        const result = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
        for (const day of Object.keys(result)) {
            result[day] = Array.isArray(weekly[day]) ? sortSlots(weekly[day].map((v) => normalizeTime(v)).filter(Boolean)) : [];
        }
        return result;
    };

    const renderAvailabilityWeekEditor = () => {
        if (!availabilityWeekEditor) return;

        availabilityWeekEditor.innerHTML = DAY_CONFIG.map(({ day, label }) => {
            const slots = availabilityState.weekly[String(day)] || [];
            const isClosed = slots.length === 0;
            const chips = slots.length
                ? slots.map((slot) => `<button type="button" class="availability-slot-chip" data-day="${day}" data-remove-slot="${slot}" title="Supprimer ${slot}">${slot} ✕</button>`).join('')
                : '<span class="availability-empty">Aucun créneau</span>';

            return `
                <div class="availability-day-card" data-day-card="${day}">
                    <div class="availability-day-head">
                        <span>${label}</span>
                        <label><input type="checkbox" data-day-close="${day}" ${isClosed ? 'checked' : ''}> Fermé</label>
                    </div>
                    <div class="availability-add-row">
                        <input type="time" data-day-time="${day}" step="3600">
                        <button type="button" class="btn btn-secondary" data-day-add="${day}">Ajouter</button>
                    </div>
                    <div class="availability-slots">${chips}</div>
                </div>
            `;
        }).join('');
    };

    window.fillAvailabilityForm = function(weekly = {}, overrides = {}, booked = {}) {
        availabilityState.weekly = ensureWeeklyStructure(weekly);
        availabilityState.overrides = overrides || {};
        availabilityState.booked = booked || {};
        
        renderAvailabilityWeekEditor();

        if (availabilityPurgeAfterDateBtn) {
            availabilityPurgeAfterDateBtn.addEventListener('click', async () => {
                const cutoff = String(availabilityPurgeAfterDate?.value || '').trim();

                // If input is empty, disable the purge cutoff
                if (!cutoff) {
                    availabilityPurgeCutoffDate = '';
                    // Persist empty cutoff if Supabase client is available
                    if (window.supabaseClient) {
                        try {
                            await window.supabaseClient
                                .from('site_content')
                                .upsert([{ key: 'reservation.purge_after_date', value: '', updated_at: new Date().toISOString() }], { onConflict: 'key' });
                        } catch (err) {
                            // ignore persistence errors; UI still reflects the change
                        }
                    }
                    initCalendar();
                    showToast('Coupure de suppression désactivée.');
                    return;
                }

                if (!/^\d{4}-\d{2}-\d{2}$/.test(cutoff)) {
                    showToast('Choisis une date valide.');
                    return;
                }

                availabilityPurgeCutoffDate = cutoff;

                let updatedDays = 0;

                Object.keys(dailyAvailability).forEach((dateKey) => {
                    if (dateKey > cutoff) {
                        if (Array.isArray(dailyAvailability[dateKey]) && dailyAvailability[dateKey].length > 0) {
                            updatedDays += 1;
                        }
                        delete dailyAvailability[dateKey];
                    }
                });

                Object.keys(availabilityState.overrides || {}).forEach((dateKey) => {
                    if (dateKey > cutoff) {
                        if (Array.isArray(availabilityState.overrides[dateKey]) && availabilityState.overrides[dateKey].length > 0) {
                            updatedDays += 1;
                        }
                        delete availabilityState.overrides[dateKey];
                    }
                });

                if (availabilityOverrides) {
                    availabilityOverrides.value = Object.keys(availabilityState.overrides).length
                        ? JSON.stringify(availabilityState.overrides, null, 2)
                        : '';
                }

                // Persist the cutoff date in Supabase if possible
                if (window.supabaseClient) {
                    try {
                        await window.supabaseClient
                            .from('site_content')
                            .upsert([{ key: 'reservation.purge_after_date', value: availabilityPurgeCutoffDate || '', updated_at: new Date().toISOString() }], { onConflict: 'key' });
                    } catch (err) {
                        // ignore persistence errors
                    }
                }

                initCalendar();
                showToast(updatedDays > 0
                    ? `Créneaux supprimés après ${cutoff} (coupure active).`
                    : `Coupure active après ${cutoff}.`);

            });
        }
    };

    setupTabs();

    // ===== CALENDAR INTERACTIVE =====
    let calendarState = {
        currentDate: new Date(),
        selectedDate: null
    };

    // Structure pour stocker les créneaux par date
    // Cela permet d'avoir des créneaux différents chaque semaine
    let dailyAvailability = {};
    let availabilityPurgeCutoffDate = '';

    const getDaySlotsFromDate = (dateStr) => {
        if (availabilityPurgeCutoffDate && dateStr > availabilityPurgeCutoffDate) {
            return [];
        }

        // Cherche d'abord dans les créneaux spécifiques à la date
        if (dateStr in dailyAvailability) {
            const slots = dailyAvailability[dateStr];
            // null = jour explicitement fermé, [] = aucun créneau
            return slots === null ? [] : slots;
        }
        
        // Sinon, utilise le modèle par jour de semaine
        const date = new Date(dateStr);
        const dayOfWeek = date.getDay();
        return availabilityState.weekly[dayOfWeek] || [];
    };

    const setDaySlots = (dateStr, slots) => {
        // null = jour fermé, [] ou undefined = utiliser les créneaux par défaut
        if (!slots || slots.length === 0) {
            // Marquer explicitement comme fermé avec null
            dailyAvailability[dateStr] = null;
        } else {
            dailyAvailability[dateStr] = slots;
        }
    };

    window.initCalendar = () => {
        const calendarGrid = document.getElementById('calendarGrid');
        const calendarTitle = document.getElementById('calendarTitle');
        const calendarPrevMonth = document.getElementById('calendarPrevMonth');
        const calendarNextMonth = document.getElementById('calendarNextMonth');
        const calendarToday = document.getElementById('calendarToday');
        const timeSlotModal = document.getElementById('timeSlotModal');
        const modalCloseBtn = document.getElementById('modalCloseBtn');
        const modalCancelBtn = document.getElementById('modalCancelBtn');
        const modalSaveBtn = document.getElementById('modalSaveBtn');
        const addSlotBtn = document.getElementById('addSlotBtn');
        const slotsList = document.getElementById('slotsList');
        const modalDayClosedCheckbox = document.getElementById('modalDayClosedCheckbox');
        const slotStartInput = document.getElementById('slotStartTime');
        const slotEndInput = document.getElementById('slotEndTime');
        const bulkSelectionModeToggle = document.getElementById('bulkSelectionModeToggle');
        const bulkSelectMonthBtn = document.getElementById('bulkSelectMonthBtn');
        const bulkMarkClosedBtn = document.getElementById('bulkMarkClosedBtn');
        const bulkClearSelectionBtn = document.getElementById('bulkClearSelectionBtn');
        const bulkSelectionCount = document.getElementById('bulkSelectionCount');
        const selectedBulkDates = new Set();
        let isBulkSelectionMode = false;

        if (!calendarGrid) return;

        const updateBulkSelectionStatus = () => {
            if (!bulkSelectionCount) return;
            const count = selectedBulkDates.size;
            bulkSelectionCount.textContent = count <= 1
                ? `${count} date sélectionnée`
                : `${count} dates sélectionnées`;
        };

        const clearBulkSelection = () => {
            selectedBulkDates.clear();
            updateBulkSelectionStatus();
        };

        const updateDayClosedInputsState = (isClosed) => {
            if (slotStartInput) slotStartInput.disabled = isClosed;
            if (slotEndInput) slotEndInput.disabled = isClosed;
            if (addSlotBtn) addSlotBtn.disabled = isClosed;
        };

        const renderCalendar = () => {
            const year = calendarState.currentDate.getFullYear();
            const month = calendarState.currentDate.getMonth();
            const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                               'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
            const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
            const today = new Date();

            calendarTitle.textContent = `${monthNames[month]} ${year}`;

            let html = '';

            weekDays.forEach((day) => {
                html += `<div class="calendar-weekday">${day}</div>`;
            });

            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const daysInPrevMonth = new Date(year, month, 0).getDate();

            for (let i = firstDay - 1; i >= 0; i--) {
                const day = daysInPrevMonth - i;
                html += `<div class="calendar-day other-month">${day}</div>`;
            }

            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(year, month, day);
                const dateStr = String(year).padStart(4, '0') + '-' + String(month + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
                const slots = getDaySlotsFromDate(dateStr);
                const hasSlots = slots && slots.length > 0;
                const isToday = date.toDateString() === today.toDateString();

                let classes = 'calendar-day';
                if (isToday) classes += ' today';
                if (hasSlots) classes += ' has-availability';
                if (selectedBulkDates.has(dateStr)) classes += ' bulk-selected';

                const slotCount = hasSlots ? slots.length : 0;

                html += `<div class="${classes}" data-date="${dateStr}">
                    <div class="calendar-day-content">
                        <span class="calendar-day-num">${day}</span>
                        ${slotCount > 0 ? `<span class="calendar-day-count">${slotCount} créneau${slotCount > 1 ? 'x' : ''}</span>` : ''}
                    </div>
                </div>`;
            }

            const totalCells = firstDay + daysInMonth;
            const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
            for (let day = 1; day <= remainingCells; day++) {
                html += `<div class="calendar-day other-month">${day}</div>`;
            }

            calendarGrid.innerHTML = html;

            calendarGrid.querySelectorAll('[data-date]').forEach((dayEl) => {
                dayEl.addEventListener('click', () => {
                    const dateStr = dayEl.dataset.date;
                    if (isBulkSelectionMode) {
                        if (selectedBulkDates.has(dateStr)) {
                            selectedBulkDates.delete(dateStr);
                        } else {
                            selectedBulkDates.add(dateStr);
                        }
                        updateBulkSelectionStatus();
                        renderCalendar();
                        return;
                    }
                    openTimeSlotModal(dateStr);
                });
            });
        };

        const openTimeSlotModal = (dateStr) => {
            calendarState.selectedDate = dateStr;
            const date = new Date(dateStr);
            const dateStr_formatted = date.toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            document.getElementById('modalDateTitle').textContent = dateStr_formatted;

            const isExplicitlyClosed = Object.prototype.hasOwnProperty.call(dailyAvailability, dateStr)
                && dailyAvailability[dateStr] === null;
            if (modalDayClosedCheckbox) {
                modalDayClosedCheckbox.checked = isExplicitlyClosed;
                updateDayClosedInputsState(isExplicitlyClosed);
            }
            
            // Load slots for this specific date
            const slots = getDaySlotsFromDate(dateStr);
            renderSlotsList(slots);
            
            // Clear inputs
            if (slotStartInput) slotStartInput.value = '';
            if (slotEndInput) slotEndInput.value = '';
            
            timeSlotModal.classList.add('active');
        };

        const renderSlotsList = (slots) => {
            if (!slots || slots.length === 0) {
                slotsList.innerHTML = '<p style="color: #a0a8b8; text-align: center; margin: 1rem 0;">Aucun créneau</p>';
                return;
            }
            
            slotsList.innerHTML = slots.map(slot => `
                <div class="slot-item" data-slot="${slot}">
                    <span>${slot}</span>
                    <i class="fas fa-trash" style="opacity: 0;"></i>
                </div>
            `).join('');
            
            // Attach remove handlers - Supprimer les anciens listeners
            const oldSlotItems = slotsList.querySelectorAll('.slot-item');
            oldSlotItems.forEach(item => {
                const newItem = item.cloneNode(true);
                item.parentNode.replaceChild(newItem, item);
            });
            
            slotsList.querySelectorAll('.slot-item').forEach(item => {
                item.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const slot = this.dataset.slot;
                    const currentSlots = getDaySlotsFromDate(calendarState.selectedDate) || [];
                    const updated = currentSlots.filter(s => s !== slot);
                    // Enregistrer explicitement en tant que jour fermé si tableau vide
                    setDaySlots(calendarState.selectedDate, updated);
                    // Recharger et réafficher
                    renderSlotsList(getDaySlotsFromDate(calendarState.selectedDate));
                });
            });
        };

        const closeTimeSlotModal = () => {
            timeSlotModal.classList.remove('active');
            calendarState.selectedDate = null;
            renderCalendar();
        };

        // Event listeners
        if (calendarPrevMonth) {
            calendarPrevMonth.addEventListener('click', () => {
                calendarState.currentDate.setMonth(calendarState.currentDate.getMonth() - 1);
                renderCalendar();
            });
        }

        if (calendarNextMonth) {
            calendarNextMonth.addEventListener('click', () => {
                calendarState.currentDate.setMonth(calendarState.currentDate.getMonth() + 1);
                renderCalendar();
            });
        }

        if (calendarToday) {
            calendarToday.addEventListener('click', () => {
                calendarState.currentDate = new Date();
                renderCalendar();
            });
        }

        if (bulkSelectionModeToggle) {
            bulkSelectionModeToggle.addEventListener('change', () => {
                isBulkSelectionMode = Boolean(bulkSelectionModeToggle.checked);
                if (!isBulkSelectionMode) {
                    clearBulkSelection();
                }
                renderCalendar();
            });
        }

        if (bulkSelectMonthBtn) {
            bulkSelectMonthBtn.addEventListener('click', () => {
                const year = calendarState.currentDate.getFullYear();
                const month = calendarState.currentDate.getMonth();
                const daysInMonth = new Date(year, month + 1, 0).getDate();

                for (let day = 1; day <= daysInMonth; day++) {
                    const dateStr = String(year).padStart(4, '0') + '-' + String(month + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
                    selectedBulkDates.add(dateStr);
                }

                if (bulkSelectionModeToggle && !bulkSelectionModeToggle.checked) {
                    bulkSelectionModeToggle.checked = true;
                    isBulkSelectionMode = true;
                }

                updateBulkSelectionStatus();
                renderCalendar();
            });
        }

        if (bulkMarkClosedBtn) {
            bulkMarkClosedBtn.addEventListener('click', () => {
                if (!selectedBulkDates.size) {
                    showToast('Aucune date sélectionnée.');
                    return;
                }

                selectedBulkDates.forEach((dateStr) => {
                    setDaySlots(dateStr, []);
                });

                const count = selectedBulkDates.size;
                clearBulkSelection();
                renderCalendar();
                showToast(count <= 1
                    ? '1 date marquée sans horaires.'
                    : `${count} dates marquées sans horaires.`);
            });
        }

        if (bulkClearSelectionBtn) {
            bulkClearSelectionBtn.addEventListener('click', () => {
                clearBulkSelection();
                renderCalendar();
            });
        }

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', closeTimeSlotModal);
        }

        if (modalCancelBtn) {
            modalCancelBtn.addEventListener('click', closeTimeSlotModal);
        }

        if (addSlotBtn && document.getElementById('slotStartTime')) {
            addSlotBtn.addEventListener('click', () => {
                if (modalDayClosedCheckbox?.checked) {
                    showToast('Ce jour est marqué sans horaire pour le moment.');
                    return;
                }

                const startTime = slotStartInput ? slotStartInput.value : '';
                const endTime = slotEndInput ? slotEndInput.value : '';
                
                if (!startTime || !endTime) {
                    if (!startTime) {
                        showToast('Veuillez entrer une heure.');
                        return;
                    }
                }

                if (endTime && startTime >= endTime) {
                    showToast("L'heure de fin doit être après l'heure de début.");
                    return;
                }

                const slots = endTime
                    ? buildSlotsFromRange(startTime, endTime, availabilityQuickStep?.value || '60') || []
                    : [startTime];

                if (!slots.length) {
                    showToast('Créneau invalide.');
                    return;
                }
                
                // Add new slots for this specific date
                const currentSlots = getDaySlotsFromDate(calendarState.selectedDate);
                const updated = [...new Set([...currentSlots, ...slots])].sort();
                setDaySlots(calendarState.selectedDate, updated);
                // Debug: show the updated dailyAvailability for this date
                console.log('setDaySlots', calendarState.selectedDate, updated, dailyAvailability[calendarState.selectedDate]);
                if (modalDayClosedCheckbox) {
                    modalDayClosedCheckbox.checked = false;
                    updateDayClosedInputsState(false);
                }
                
                renderSlotsList(updated);
                renderCalendar();
                if (slotStartInput) slotStartInput.value = '';
                if (slotEndInput) slotEndInput.value = '';
            });
        }

        if (modalDayClosedCheckbox) {
            modalDayClosedCheckbox.addEventListener('change', () => {
                if (!calendarState.selectedDate) return;
                if (modalDayClosedCheckbox.checked) {
                    setDaySlots(calendarState.selectedDate, []);
                    renderSlotsList([]);
                } else {
                    if (Object.prototype.hasOwnProperty.call(dailyAvailability, calendarState.selectedDate)
                        && dailyAvailability[calendarState.selectedDate] === null) {
                        delete dailyAvailability[calendarState.selectedDate];
                    }
                    renderSlotsList(getDaySlotsFromDate(calendarState.selectedDate));
                }
                updateDayClosedInputsState(modalDayClosedCheckbox.checked);
                renderCalendar();
            });
        }

        if (modalSaveBtn) {
            modalSaveBtn.addEventListener('click', closeTimeSlotModal);
        }

        // Close modal on overlay click
        timeSlotModal.addEventListener('click', (e) => {
            if (e.target === timeSlotModal) {
                closeTimeSlotModal();
            }
        });

        // Initial render
        updateBulkSelectionStatus();
        renderCalendar();
    };

    // Initialize calendar


    if (availabilityWeekEditor) {
        availabilityWeekEditor.addEventListener('click', (e) => {
            const addBtn = e.target.closest('[data-day-add]');
            if (addBtn) {
                const day = String(addBtn.dataset.dayAdd);
                const input = availabilityWeekEditor.querySelector(`[data-day-time="${day}"]`);
                const normalized = normalizeTime(input?.value);
                if (!normalized) {
                    showToast('Choisis une heure valide (HH:MM).');
                    return;
                }

                const closeToggle = availabilityWeekEditor.querySelector(`[data-day-close="${day}"]`);
                if (closeToggle?.checked) closeToggle.checked = false;

                availabilityState.weekly[day] = sortSlots([...(availabilityState.weekly[day] || []), normalized]);
                renderAvailabilityWeekEditor();
                return;
            }

            const removeBtn = e.target.closest('[data-remove-slot]');
            if (removeBtn) {
                const day = String(removeBtn.dataset.day);
                const slot = removeBtn.dataset.removeSlot;
                availabilityState.weekly[day] = (availabilityState.weekly[day] || []).filter((item) => item !== slot);
                renderAvailabilityWeekEditor();
            }
        });

        availabilityWeekEditor.addEventListener('change', (e) => {
            const closeToggle = e.target.closest('[data-day-close]');
            if (!closeToggle) return;
            const day = String(closeToggle.dataset.dayClose);
            if (closeToggle.checked) {
                availabilityState.weekly[day] = [];
            }
            renderAvailabilityWeekEditor();
        });
    }

    if (availabilityPresetWeekBtn) {
        availabilityPresetWeekBtn.addEventListener('click', () => {
            availabilityState.weekly = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
            renderAvailabilityWeekEditor();
            showToast('Semaine vidée.');
        });
    }

    if (availabilityPresetClearBtn) {
        availabilityPresetClearBtn.addEventListener('click', () => {
            availabilityState.weekly = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
            renderAvailabilityWeekEditor();
            showToast('Tous les créneaux ont été vidés.');
        });
    }

    if (availabilityQuickApplyBtn) {
        availabilityQuickApplyBtn.addEventListener('click', () => {
            const selectedDays = getQuickSelectedDays();
            if (!selectedDays.length) {
                showToast('Choisis au moins un jour.');
                return;
            }

            const slots = buildSlotsFromRange(
                availabilityQuickStart?.value,
                availabilityQuickEnd?.value,
                availabilityQuickStep?.value || '60'
            );

            if (!slots || !slots.length) {
                showToast('Créneau invalide (début/fin/pas).');
                return;
            }

            selectedDays.forEach((day) => {
                availabilityState.weekly[day] = slots;
            });

            renderAvailabilityWeekEditor();
            showToast(`Créneaux appliqués sur ${selectedDays.length} jour(s).`);
        });
    }

    if (availabilityQuickClearDaysBtn) {
        availabilityQuickClearDaysBtn.addEventListener('click', () => {
            const selectedDays = getQuickSelectedDays();
            if (!selectedDays.length) {
                showToast('Choisis au moins un jour.');
                return;
            }

            selectedDays.forEach((day) => {
                availabilityState.weekly[day] = [];
            });

            renderAvailabilityWeekEditor();
            showToast(`Jours vidés: ${selectedDays.length}.`);
        });
    }

    if (availabilityPurgeAfterDateBtn) {
        availabilityPurgeAfterDateBtn.addEventListener('click', () => {
            const cutoff = String(availabilityPurgeAfterDate?.value || '').trim();
            if (!/^\d{4}-\d{2}-\d{2}$/.test(cutoff)) {
                showToast('Choisis une date valide.');
                return;
            }

            availabilityPurgeCutoffDate = cutoff;

            let updatedDays = 0;

            Object.keys(dailyAvailability).forEach((dateKey) => {
                if (dateKey > cutoff) {
                    if (Array.isArray(dailyAvailability[dateKey]) && dailyAvailability[dateKey].length > 0) {
                        updatedDays += 1;
                    }
                    delete dailyAvailability[dateKey];
                }
            });

            Object.keys(availabilityState.overrides || {}).forEach((dateKey) => {
                if (dateKey > cutoff) {
                    if (Array.isArray(availabilityState.overrides[dateKey]) && availabilityState.overrides[dateKey].length > 0) {
                        updatedDays += 1;
                    }
                    delete availabilityState.overrides[dateKey];
                }
            });

            if (availabilityOverrides) {
                availabilityOverrides.value = Object.keys(availabilityState.overrides).length
                    ? JSON.stringify(availabilityState.overrides, null, 2)
                    : '';
            }

            initCalendar();
            showToast(updatedDays > 0
                ? `Créneaux supprimés après ${cutoff} (coupure active).`
                : `Coupure active après ${cutoff}.`);
        });
    }

    if (saveAvailabilityBtn) {
        saveAvailabilityBtn.addEventListener('click', async () => {
            if (!window.supabaseClient) return;

            let overrides = {};
            let booked = {};
            try {
                overrides = availabilityOverrides?.value.trim()
                    ? JSON.parse(availabilityOverrides.value)
                    : {};
            } catch {
                showToast('JSON des exceptions invalide.');
                return;
            }

            try {
                booked = availabilityBooked?.value.trim()
                    ? JSON.parse(availabilityBooked.value)
                    : {};
            } catch {
                showToast('JSON des créneaux bloqués invalide.');
                return;
            }

            const sanitizedWeekly = ensureWeeklyStructure(availabilityState.weekly);
            const sanitizedDailySlots = dailyAvailability || {};
            const now = new Date().toISOString();
            const payload = [
                { key: 'reservation.weekly_availability', value: JSON.stringify(sanitizedWeekly), updated_at: now },
                { key: 'reservation.date_overrides', value: JSON.stringify(overrides), updated_at: now },
                { key: 'reservation.daily_slots', value: JSON.stringify(sanitizedDailySlots), updated_at: now },
                { key: 'reservation.booked_slots', value: JSON.stringify(booked), updated_at: now },
                { key: 'reservation.purge_after_date', value: availabilityPurgeCutoffDate || '', updated_at: now }
            ];

            const saveErrors = [];
            for (const row of payload) {
                const { data, error } = await window.supabaseClient
                    .from('site_content')
                    .upsert(row, { onConflict: 'key' });

                // Log the full response for debugging (visible in browser console)
                console.log('site_content upsert result', { key: row.key, data, error });

                if (error) {
                    saveErrors.push(`${row.key}: ${error.message || 'erreur inconnue'}`);
                }
            }

            if (saveErrors.length > 0) {
                const errorMessage = saveErrors.join(' | ');
                console.error('Impossible d’enregistrer le planning.', errorMessage);
                const isSchemaProblem = /site_content|row-level security|permission|does not exist|relation/i.test(errorMessage);
                showToast(isSchemaProblem
                    ? `Impossible d’enregistrer le planning: ${errorMessage}`
                    : 'Impossible d’enregistrer le planning.');
                return;
            }

            await loadAdminAvailability();
            // Confirm reload in console
            console.log('loadAdminAvailability completed after save');
            showToast('Planning enregistré.');
        });
    }

    if (productsGrid) {
        productsGrid.addEventListener('click', async (e) => {
            const target = e.target;
            const addCard = target.closest('#addProductCard');
            if (addCard) {
                openProductModal('Ajouter un produit', 'new', {
                    name: '',
                    category: 'pieces',
                    price: 0,
                    desc: '',
                    meta: '',
                    image: '',
                    badge: '',
                    condition: '',
                    status: 'Disponible',
                    specs: ''
                });
                return;
            }

            const actionButton = target.closest('[data-product-action]');
            if (!actionButton) return;

            const action = actionButton.dataset.productAction;
            const productId = actionButton.dataset.productId;
            const product = adminProductsCache.find((item) => String(item.id) === String(productId));
            if (!product) return;

            if (action === 'delete') {
                if (shopProductsSource !== 'supabase') {
                    showToast('Suppression indisponible : produits chargés depuis le fallback (JSON).');
                    return;
                }

                const confirmed = confirm(`Supprimer le produit "${product.name}" ?`);
                if (!confirmed) return;

                const { data: deletedRows, error } = await window.supabaseClient
                    .from('products')
                    .delete()
                    .eq('id', productId)
                    .select('id');

                if (error) {
                    showToast('Suppression impossible.');
                    return;
                }

                if (!Array.isArray(deletedRows) || deletedRows.length === 0) {
                    showToast('Aucun produit supprimé (introuvable dans Supabase).');
                    return;
                }

                showToast('Produit supprimé.');
                await loadAdminProducts();
                return;
            }

            if (action === 'edit') {
                if (shopProductsSource !== 'supabase') {
                    showToast('Modification indisponible : produits chargés depuis le fallback (JSON).');
                    return;
                }
                openProductModal('Modifier le produit', product.id, product);
            }
        });
    }

    if (addReviewBtn) {
        addReviewBtn.addEventListener('click', () => {
            openReviewModal('Ajouter un avis', 'new', {
                author_name: '',
                rating: 5,
                text: '',
                relative_time_description: ''
            });
        });
    }

    if (reviewsAdminList) {
        reviewsAdminList.addEventListener('click', async (e) => {
            const actionButton = e.target.closest('[data-review-action]');
            if (!actionButton) return;

            const action = actionButton.dataset.reviewAction;
            const index = Number(actionButton.dataset.reviewIndex);
            const review = adminReviewsPayload.reviews[index];

            if (action === 'edit') {
                if (!review) return;
                openReviewModal('Modifier un avis', index, review);
                return;
            }

            if (action === 'delete') {
                if (!review) return;
                const confirmed = confirm('Supprimer cet avis ?');
                if (!confirmed) return;

                adminReviewsPayload.reviews.splice(index, 1);
                const saved = await saveReviewsToSiteContent();
                if (!saved) {
                    showToast('Suppression impossible.');
                    return;
                }

                renderReviewsAdminList();
                showToast('Avis supprimé.');
            }
        });
    }

    if (addPromotionBtn) {
        addPromotionBtn.addEventListener('click', () => {
            openPromotionModal('Ajouter une promotion', 'new', {
                title: '',
                code: '',
                discount_text: '',
                description: '',
                starts_at: null,
                ends_at: null,
                active: true,
                type: 'custom',
                applies_to: 'all',
                max_uses: null,
                used_count: 0,
                auto_deactivate_on_limit: true
            });
        });
    }

    if (promotionsAdminList) {
        promotionsAdminList.addEventListener('click', async (e) => {
            const actionButton = e.target.closest('[data-promotion-action]');
            if (!actionButton) return;

            const action = actionButton.dataset.promotionAction;
            const index = Number(actionButton.dataset.promotionIndex);
            const promotion = adminPromotionsPayload.promotions[index];

            if (action === 'edit') {
                if (!promotion) return;
                openPromotionModal('Modifier une promotion', index, promotion);
                return;
            }

            if (action === 'delete') {
                if (!promotion) return;
                const confirmed = confirm('Supprimer cette promotion ?');
                if (!confirmed) return;

                adminPromotionsPayload.promotions.splice(index, 1);
                const saved = await savePromotionsToSiteContent();
                if (!saved) {
                    showToast('Suppression impossible.');
                    return;
                }

                renderPromotionsAdminList();
                showToast('Promotion supprimée.');
            }
        });
    }

    if (modalSave) {
        modalSave.addEventListener('click', async () => {
            if (promotionEditMode) {
                const promotionPayload = getPromotionPayloadFromForm();
                if (!promotionPayload.title && !promotionPayload.code) {
                    showToast('Titre ou code promo requis.');
                    return;
                }

                const parsedPromotionIndex = Number(editingPromotionIndex);
                const isCreatingPromotion = editingPromotionIndex === 'new'
                    || !Number.isInteger(parsedPromotionIndex)
                    || parsedPromotionIndex < 0;

                if (isCreatingPromotion) {
                    adminPromotionsPayload.promotions.unshift(promotionPayload);
                } else {
                    adminPromotionsPayload.promotions[parsedPromotionIndex] = promotionPayload;
                }

                const saved = await savePromotionsToSiteContent();
                if (!saved) {
                    showToast('Enregistrement de la promotion impossible.');
                    return;
                }

                renderPromotionsAdminList();
                closeProductModal();
                showToast(isCreatingPromotion ? 'Promotion ajoutée.' : 'Promotion mise à jour.');
                return;
            }

            if (reviewEditMode) {
                const reviewPayload = getReviewPayloadFromForm();
                if (!reviewPayload.author_name) {
                    showToast("L'auteur de l'avis est requis.");
                    return;
                }
                if (!reviewPayload.time) {
                    showToast('Date de l’avis invalide.');
                    return;
                }

                const parsedReviewIndex = Number(editingReviewIndex);
                const isCreatingReview = editingReviewIndex === 'new'
                    || !Number.isInteger(parsedReviewIndex)
                    || parsedReviewIndex < 0;

                if (isCreatingReview) {
                    adminReviewsPayload.reviews.unshift(reviewPayload);
                } else {
                    adminReviewsPayload.reviews[parsedReviewIndex] = reviewPayload;
                }

                const saved = await saveReviewsToSiteContent();
                if (!saved) {
                    showToast('Enregistrement de l’avis impossible.');
                    return;
                }

                renderReviewsAdminList();
                closeProductModal();
                showToast(isCreatingReview ? 'Avis ajouté.' : 'Avis mis à jour.');
                return;
            }

            if (!editingProductId) return;
            let payload = null;
            if (productEditMode) {
                payload = getProductPayloadFromForm();
            } else if (modalInput) {
                try {
                    payload = JSON.parse(modalInput.value);
                } catch (error) {
                    showToast('JSON invalide. Vérifie la syntaxe.');
                    return;
                }
            }

            if (!payload?.name || Number.isNaN(Number(payload.price))) {
                showToast('Nom et prix valides sont requis.');
                return;
            }

            payload.price = Number(payload.price);
            payload.updated_at = new Date().toISOString();

            if (editingProductId === 'new') {
                delete payload.id;
                const { error } = await window.supabaseClient
                    .from('products')
                    .insert([payload]);

                if (error) {
                    showToast('Création impossible.');
                    return;
                }

                showToast('Produit ajouté.');
            } else {
                if (shopProductsSource !== 'supabase') {
                    showToast('Mise à jour indisponible : produit non géré dans Supabase.');
                    return;
                }

                delete payload.id;
                const { error } = await window.supabaseClient
                    .from('products')
                    .update(payload)
                    .eq('id', editingProductId);

                if (error) {
                    showToast('Mise à jour impossible.');
                    return;
                }

                showToast('Produit mis à jour.');
            }

            closeProductModal();
            await loadAdminProducts();
        });
    }

    if (modalCancel) modalCancel.addEventListener('click', closeProductModal);
    if (closeModal) closeModal.addEventListener('click', closeProductModal);
    if (editModal) {
        editModal.addEventListener('click', (e) => {
            if (e.target === editModal) closeProductModal();
        });
    }

    if (exportReservationsBtn) {
        exportReservationsBtn.addEventListener('click', () => {
            if (!adminReservationsCache.length) return;
            const csv = buildCsv(adminReservationsCache, [
                { label: 'Référence', value: (row) => row.confirmation_number || row.id },
                { label: 'Client', value: 'customer_name' },
                { label: 'Email', value: 'customer_email' },
                { label: 'Téléphone', value: 'customer_phone' },
                { label: 'Service', value: 'service' },
                { label: 'Date', value: (row) => formatDateTime(row.reservation_date, row.reservation_time) },
                { label: 'Statut', value: 'status' },
                { label: 'Créée', value: (row) => formatCreatedAt(row.created_at) }
            ]);
            downloadCsv('reservations.csv', csv);
        });
    }

    if (exportOrdersBtn) {
        exportOrdersBtn.addEventListener('click', () => {
            if (!adminOrdersCache.length) return;
            const csv = buildCsv(adminOrdersCache, [
                { label: 'Référence', value: (row) => row.reference || row.id },
                { label: 'Client', value: 'customer_name' },
                { label: 'Email', value: 'customer_email' },
                { label: 'Téléphone', value: 'customer_phone' },
                { label: 'Détails', value: 'items_text' },
                { label: 'Total', value: 'total_estimated' },
                { label: 'Statut', value: 'status' },
                { label: 'Créée', value: (row) => formatCreatedAt(row.created_at) }
            ]);
            downloadCsv('commandes.csv', csv);
        });
    }

    if (manualReservationForm) {
        manualReservationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!window.supabaseClient || !window.supabaseAuth) return;

            const customerName = document.getElementById('adminManualCustomerName')?.value.trim() || '';
            const customerEmail = document.getElementById('adminManualCustomerEmail')?.value.trim() || '';
            const customerPhone = document.getElementById('adminManualCustomerPhone')?.value.trim() || '';
            const service = document.getElementById('adminManualService')?.value.trim() || '';
            const reservationDate = document.getElementById('adminManualReservationDate')?.value.trim() || '';
            const reservationTimeRaw = document.getElementById('adminManualReservationTime')?.value.trim() || '';
            const reservationTime = normalizeTime(reservationTimeRaw);
            const description = document.getElementById('adminManualDescription')?.value.trim() || '';

            const normalizedService = service || 'autre';
            const missingRequiredFields = [];
            if (!customerName) missingRequiredFields.push('nom client');
            if (!reservationDate) missingRequiredFields.push('date');
            if (!reservationTimeRaw) missingRequiredFields.push('heure');

            if (missingRequiredFields.length > 0) {
                showToast(`Champs obligatoires manquants : ${missingRequiredFields.join(', ')}.`);
                return;
            }

            if (!reservationTime) {
                showToast('Heure invalide. Utilise le format HH:MM.');
                return;
            }

            if (!/^\d{4}-\d{2}-\d{2}$/.test(reservationDate)) {
                showToast('Date de réservation invalide.');
                return;
            }

            const currentUser = await window.supabaseAuth.getCurrentUser();
            if (!currentUser?.id) {
                showToast('Session admin invalide. Reconnectez-vous.');
                return;
            }

            if (manualReservationSubmitBtn) {
                manualReservationSubmitBtn.disabled = true;
            }

            try {
                const { data: existingSlot, error: existingError } = await window.supabaseClient
                    .from('reservations')
                    .select('id')
                    .eq('reservation_date', reservationDate)
                    .eq('reservation_time', reservationTime)
                    .in('status', ['confirmed', 'in_progress'])
                    .limit(1);

                if (existingError) {
                    showToast('Impossible de vérifier le créneau.');
                    return;
                }

                if (Array.isArray(existingSlot) && existingSlot.length > 0) {
                    showToast('Ce créneau est déjà réservé.');
                    return;
                }

                const fallbackId = Date.now();
                const safeEmail = customerEmail || `client-sans-email+${fallbackId}@maxipc.local`;
                const safePhone = customerPhone || '00000000';

                const payload = {
                    user_id: null,
                    service: normalizedService,
                    reservation_date: reservationDate,
                    reservation_time: reservationTime,
                    customer_name: customerName,
                    customer_email: safeEmail,
                    customer_phone: safePhone,
                    description,
                    confirmation_number: generateAdminReservationReference(),
                    status: 'confirmed',
                    created_at: new Date().toISOString()
                };

                const { error: insertError } = await window.supabaseClient
                    .from('reservations')
                    .insert([payload]);

                if (insertError) {
                    const errorMessage = String(insertError.message || '');
                    const notNullUserId = errorMessage.includes('null value in column "user_id"')
                        || errorMessage.includes('violates not-null constraint');
                    if (notNullUserId) {
                        showToast('Migration SQL requise: applique supabase/ADMIN_MANUAL_RESERVATIONS_MIGRATION.sql puis réessaie.');
                        return;
                    }
                    showToast('Ajout impossible: ' + (insertError.message || 'erreur inconnue'));
                    return;
                }

                manualReservationForm.reset();
                await loadAdminReservationsAndOrders();
                showToast('Réservation ajoutée. Le créneau est maintenant indisponible côté client.');
            } finally {
                if (manualReservationSubmitBtn) {
                    manualReservationSubmitBtn.disabled = false;
                }
            }
        });
    }

    if (reservationsTable) {
        reservationsTable.addEventListener('click', async (e) => {
            const actionBtn = e.target.closest('[data-reservation-action="delete"]');
            if (!actionBtn) return;
        });

        reservationsTable.addEventListener('change', async (e) => {
            const target = e.target;
            if (!target.classList.contains('status-select')) return;
            if (target.dataset.type !== 'reservation') return;
            const id = target.dataset.id;
            const status = target.value;
            await window.supabaseClient
                .from('reservations')
                .update({ status, updated_at: new Date().toISOString() })
                .eq('id', id);
            await loadAdminReservationsAndOrders();
        });
    }

    if (ordersTable) {
        ordersTable.addEventListener('change', async (e) => {
            const target = e.target;
            if (!target.classList.contains('status-select')) return;
            if (target.dataset.type !== 'order') return;
            const id = target.dataset.id;
            const status = target.value;
            await window.supabaseClient
                .from('orders')
                .update({ status, updated_at: new Date().toISOString() })
                .eq('id', id);
            await loadAdminReservationsAndOrders();
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('adminEmail')?.value.trim();
            const password = document.getElementById('adminPassword')?.value;
            if (!email || !password) return;

            const result = await window.supabaseAuth.signIn(email, password);
            if (!result.success) {
                showMessage('error', 'Email ou mot de passe incorrect.');
                return;
            }

            const user = await window.supabaseAuth.getCurrentUser();
            const isAdmin = await canAccessAdmin(user);
            if (!isAdmin) {
                await window.supabaseAuth.signOut();
                showMessage('error', 'Accès refusé - Compte non autorisé.');
                return;
            }

            showMessage('success', 'Connexion réussie.');
            setDashboardVisible(true);
            await loadDashboardData();
            await loadAdminAvailability();
        });
    }

    if (adminSignOut) {
        adminSignOut.addEventListener('click', async () => {
            await window.supabaseAuth.signOut();
            setDashboardVisible(false);
            showMessage('success', 'Déconnecté.');
        });
    }

    const currentUser = await window.supabaseAuth.getCurrentUser();
    if (await canAccessAdmin(currentUser)) {
        setDashboardVisible(true);
        await loadDashboardData();
        await loadAdminAvailability();
        let lastReservationTime = adminReservationsCache[0]?.created_at || null;
        let lastOrderTime = adminOrdersCache[0]?.created_at || null;
        setInterval(async () => {
            const { data: latestReservation } = await window.supabaseClient
                .from('reservations')
                .select('created_at')
                .order('created_at', { ascending: false })
                .limit(1);
            const { data: latestOrder } = await window.supabaseClient
                .from('orders')
                .select('created_at')
                .order('created_at', { ascending: false })
                .limit(1);

            const latestReservationTime = latestReservation?.[0]?.created_at || null;
            const latestOrderTime = latestOrder?.[0]?.created_at || null;

            if (latestReservationTime && latestReservationTime !== lastReservationTime) {
                lastReservationTime = latestReservationTime;
                await notifyAdmin('MaxiPC Admin', 'Nouvelle réservation reçue.');
                await loadAdminReservationsAndOrders();
            }

            if (latestOrderTime && latestOrderTime !== lastOrderTime) {
                lastOrderTime = latestOrderTime;
                await notifyAdmin('MaxiPC Admin', 'Nouvelle commande boutique reçue.');
                await loadAdminReservationsAndOrders();
            }
        }, 30000);
    } else {
        setDashboardVisible(false);
    }
}

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

async function initializeGoogleReviewsSection() {
    const section = document.getElementById('googleReviewsSection');
    if (!section) return;

    const ratingValue = document.getElementById('googleRatingValue');
    const ratingCount = document.getElementById('googleRatingCount');
    const updatedText = document.getElementById('googleReviewsUpdated');
    const writeLink = document.getElementById('googleReviewWriteLink');
    const list = document.getElementById('googleReviewsList');

    const toStars = (value) => {
        const rounded = Math.max(0, Math.min(5, Math.round(Number(value) || 0)));
        return '★'.repeat(rounded) + '☆'.repeat(5 - rounded);
    };

    const formatDate = (value) => {
        if (!value) return '';
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return '';
        return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const formatRelativeReviewAge = (value) => {
        if (!value) return '';
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) return '';

        const today = new Date();
        const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const startParsed = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
        let diffDays = Math.floor((startToday.getTime() - startParsed.getTime()) / 86400000);
        if (!Number.isFinite(diffDays) || diffDays < 0) diffDays = 0;

        if (diffDays === 0) return 'aujourd’hui';
        if (diffDays === 1) return 'il y a 1 jour';
        if (diffDays < 7) return `il y a ${diffDays} jours`;

        const weeks = Math.floor(diffDays / 7);
        if (weeks === 1) return 'il y a 1 semaine';
        if (weeks < 5) return `il y a ${weeks} semaines`;

        const months = Math.floor(diffDays / 30);
        if (months === 1) return 'il y a 1 mois';
        if (months < 12) return `il y a ${months} mois`;

        const years = Math.floor(diffDays / 365);
        if (years === 1) return 'il y a 1 an';
        return `il y a ${years} ans`;
    };

    try {
        let payload = null;

        if (window.supabaseClient) {
            const { data: reviewRow } = await window.supabaseClient
                .from('site_content')
                .select('value')
                .eq('key', 'homepage.reviews_json')
                .single();

            if (reviewRow?.value) {
                try {
                    payload = JSON.parse(reviewRow.value);
                } catch {
                    payload = null;
                }
            }
        }

        if (!payload) {
            const response = await fetch('data/reviews.json', { cache: 'no-store' });
            if (!response.ok) throw new Error('data/reviews.json introuvable');
            payload = await response.json();
        }

        const place = payload?.place || {};
        const reviews = Array.isArray(payload?.reviews) ? payload.reviews : [];

        if (ratingValue) {
            ratingValue.textContent = place.rating ? `${Number(place.rating).toFixed(1)} / 5` : '—';
        }

        if (ratingCount) {
            const count = Number(place.user_ratings_total || 0);
            ratingCount.textContent = count > 0 ? `${count} avis clients` : '';
        }

        if (updatedText) {
            const updateDate = payload?.updated_at || payload?.fetched_at || null;
            updatedText.textContent = updateDate
                ? `Dernière mise à jour : ${formatDate(updateDate)}`
                : 'Avis mis à jour manuellement';
        }

        if (writeLink) {
            if (payload?.write_review_url) {
                writeLink.href = payload.write_review_url;
                writeLink.style.display = '';
            } else {
                writeLink.style.display = 'none';
            }
        }

        if (list) {
            if (!reviews.length) {
                list.innerHTML = '<article class="google-review-card"><p class="google-review-text">Aucun avis pour le moment.</p></article>';
            } else {
                list.innerHTML = reviews.slice(0, 6).map((review) => `
                    <article class="google-review-card">
                        <div class="google-review-head">
                            <span class="google-review-author">${escapeHtml(review.author_name || 'Client')}</span>
                            <span class="google-review-stars">${toStars(review.rating)}</span>
                        </div>
                        <p class="google-review-date">${escapeHtml(formatRelativeReviewAge(review.time) || formatDate(review.time) || '')}</p>
                        <p class="google-review-text">${escapeHtml((review.text || '').slice(0, 320) || 'Avis client')}</p>
                    </article>
                `).join('');
            }
        }
    } catch (error) {
        if (updatedText) updatedText.textContent = 'Chargement des avis indisponible';
        if (ratingCount) ratingCount.textContent = 'Avis indisponibles pour le moment';
        if (list) {
            list.innerHTML = '<article class="google-review-card"><p class="google-review-text">Impossible de charger les avis pour le moment.</p></article>';
        }
        console.warn('Google reviews load failed', error);
    }
}

async function initializeTarifsPromotionsSection() {
    const section = document.getElementById('tarifsPromotionsSection');
    const container = document.getElementById('tarifsPromotionsList');
    if (!container) return;

    try {
        let payload = null;
        if (window.supabaseClient) {
            const { data } = await window.supabaseClient
                .from('site_content')
                .select('value')
                .eq('key', 'shop.promotions_json')
                .single();
            if (data?.value) {
                try {
                    payload = JSON.parse(data.value);
                } catch {
                    payload = null;
                }
            }
        }

        const normalized = normalizePromotionsPayload(payload || {});
        const today = new Date();
        const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        const activePromotions = normalized.promotions.filter((promo) => {
            if (!promo.active) return false;
            if (promo.starts_at && todayKey < promo.starts_at) return false;
            if (promo.ends_at && todayKey > promo.ends_at) return false;
            if (Number.isFinite(Number(promo.max_uses)) && Number(promo.max_uses) > 0) {
                if (Number(promo.used_count || 0) >= Number(promo.max_uses)) return false;
            }
            return true;
        });

        const servicePromotions = activePromotions.filter((promo) => promo.applies_to === 'all' || promo.applies_to === 'services');

        const parseDiscountSpec = (promo, basePrice) => {
            const text = String(promo.discount_text || '').trim();
            if (!text) return 0;

            const percentMatch = text.match(/(-?\d+(?:[.,]\d+)?)\s*%/);
            if (percentMatch) {
                const pct = Number(percentMatch[1].replace(',', '.'));
                if (Number.isFinite(pct) && pct > 0) {
                    return (basePrice * pct) / 100;
                }
            }

            const euroMatch = text.match(/(-?\d+(?:[.,]\d+)?)\s*(€|eur)/i);
            if (euroMatch) {
                const amount = Number(euroMatch[1].replace(',', '.'));
                if (Number.isFinite(amount) && amount > 0) {
                    return amount;
                }
            }

            return 0;
        };

        const bestDiscountForPrice = (basePrice) => {
            let best = { amount: 0, promo: null };
            servicePromotions.forEach((promo) => {
                const amount = parseDiscountSpec(promo, basePrice);
                if (amount > best.amount) {
                    best = { amount, promo };
                }
            });
            return best;
        };

        const formatEuro = (value) => `${Math.round(value)} €`;

        document.querySelectorAll('[data-base-price]').forEach((node) => {
            const basePrice = Number(node.getAttribute('data-base-price') || 0);
            if (!Number.isFinite(basePrice) || basePrice <= 0) return;

            const prefix = node.getAttribute('data-price-prefix') || 'À partir de ';
            const suffix = node.getAttribute('data-price-suffix') || '';
            const best = bestDiscountForPrice(basePrice);

            if (!best.promo || best.amount <= 0) {
                node.textContent = `${prefix}${formatEuro(basePrice)}${suffix}`;
                return;
            }

            const discounted = Math.max(0, basePrice - best.amount);
            node.innerHTML = `${prefix}<span style="text-decoration:line-through; opacity:0.65; margin-right:8px;">${formatEuro(basePrice)}</span><span style="color:var(--accent-color); font-weight:700;">${formatEuro(discounted)}</span>${suffix}`;
        });

        if (!activePromotions.length) {
            if (section) section.style.display = 'none';
            container.innerHTML = '';
            return;
        }

        if (section) section.style.display = '';

        container.innerHTML = activePromotions.map((promo) => {
            const hasQuota = Number.isFinite(Number(promo.max_uses)) && Number(promo.max_uses) > 0;
            const remaining = hasQuota ? Math.max(0, Number(promo.max_uses) - Number(promo.used_count || 0)) : null;
            const period = [promo.starts_at, promo.ends_at].filter(Boolean).join(' → ');
            const codeLine = promo.code ? `Code: ${escapeHtml(promo.code)}` : 'Sans code';
            const quotaLine = remaining === null ? 'Offre sans limite de quota' : `${remaining} place(s) restante(s)`;

            return `
                <article class="card" style="border:1px solid rgba(240,147,251,0.35); background:linear-gradient(135deg, rgba(240,147,251,0.12), rgba(79,172,254,0.12));">
                    <div class="badge badge-accent" style="margin-bottom:10px;">PROMOTION</div>
                    <h4 style="margin:0 0 8px; color:var(--text-light);">${escapeHtml(promo.title || 'Offre spéciale')}</h4>
                    <p style="margin:0 0 8px; color:var(--accent-color); font-weight:700;">${escapeHtml(promo.discount_text || '')}</p>
                    <p style="margin:0 0 8px; color:var(--text-muted);">${escapeHtml(promo.description || '')}</p>
                    <p style="margin:0; color:var(--text-light); font-size:0.92rem;"><strong>${codeLine}</strong></p>
                    <p style="margin:6px 0 0; color:var(--text-muted); font-size:0.86rem;">${escapeHtml(quotaLine)}${period ? ` • ${escapeHtml(period)}` : ''}</p>
                </article>
            `;
        }).join('');
    } catch (error) {
        if (section) section.style.display = 'none';
        container.innerHTML = '';
        console.warn('Promotions load failed', error);
    }
}

function runAppInit() {
    initializeTerminalAnimation();
    initializeShopFeature();
    prefillReservationFromCart();
    initializeGoogleReviewsSection();
    initializeTarifsPromotionsSection();
    loadSiteContent();
    initializeAdmin();
    initializeAdminDashboardPage();
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