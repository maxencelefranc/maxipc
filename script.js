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

function formatPrice(amount) {
    return amount.toFixed(2).replace('.', ',') + ' €';
}

async function loadShopProducts() {
    const supabaseClient = window.supabaseClient;
    if (supabaseClient) {
        try {
            const { data, error } = await supabaseClient
                .from('products')
                .select('*')
                .order('id', { ascending: true });
            if (!error && Array.isArray(data) && data.length) {
                return data;
            }
        } catch (err) {
            console.warn('Chargement Supabase échoué, fallback JSON', err);
        }
    }

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
    if (product.meta) meta.innerHTML += `<span class="chip">${product.meta}</span>`;
    if (product.badge) meta.innerHTML += `<span class="chip">${product.badge}</span>`;
    meta.innerHTML += `<span class="chip">${product.category}</span>`;
    if (product.condition) meta.innerHTML += `<span class="chip">${product.condition}</span>`;
    if (product.status) meta.innerHTML += `<span class="chip">${product.status}</span>`;
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
            .from('site_content')
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

async function loadAdminProducts() {
    // Placeholder - will be replaced by initializeAdmin
}

async function loadAdminContent() {
    // Placeholder - will be replaced by initializeAdmin
}

async function isAdminUser(user) {
    if (!user || !window.supabaseClient) return false;
    const { data } = await window.supabaseClient.from('admin_users').select('*').eq('user_id', user.id).single();
    return !!data;
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

function runAppInit() {
    initializeTerminalAnimation();
    initializeShopFeature();
    prefillReservationFromCart();
    loadSiteContent();
    initializeAdmin();
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