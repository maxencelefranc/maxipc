/* ===================== */
/* NAVIGATION & MENU     */
/* ===================== */

// Toggle mobile menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
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
/* CONTACT FORM          */
/* ===================== */

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone') || 'Non fourni',
            subject: formData.get('subject'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };

        try {
            // Log to console (in production, send to backend)
            console.log('Form data:', data);

            // Simulate sending to email service
            // In a real scenario, you'd send this to a backend/email service
            const emailContent = `
                Nouvelle demande de contact - MaxPC
                
                Nom: ${data.name}
                Email: ${data.email}
                Téléphone: ${data.phone}
                Sujet: ${data.subject}
                
                Message:
                ${data.message}
                
                ---
                Date d'envoi: ${new Date(data.timestamp).toLocaleString('fr-FR')}
            `;

            console.log('Email to send:', emailContent);

            // Show success message
            formMessage.textContent = '✓ Message envoyé avec succès! Nous vous répondrons dans les 24 heures.';
            formMessage.classList.add('success');
            formMessage.style.display = 'block';

            // Reset form
            contactForm.reset();

            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
                formMessage.classList.remove('success');
            }, 5000);

        } catch (error) {
            console.error('Error:', error);
            formMessage.textContent = '✗ Erreur lors de l\'envoi du message. Veuillez réessayer.';
            formMessage.classList.add('error');
            formMessage.style.display = 'block';
        }
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
/* SCROLL ANIMATIONS     */
/* ===================== */

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.feature-card, .service-card, .reason-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
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
document.addEventListener('DOMContentLoaded', () => {
    console.log('MaxPC website loaded successfully');
    
    // Additional initialization code can go here
    // - Load user preferences
    // - Initialize third-party scripts
    // - Set up analytics
});

/* ===================== */
/* DEBUG MODE            */
/* ===================== */

// Enable debug mode with ?debug=true in URL
if (getURLParameter('debug') === 'true') {
    console.log('DEBUG MODE ENABLED');
    console.log('Form ID:', contactForm ? 'Found' : 'Not found');
    console.log('Navigation:', document.querySelector('.navbar') ? 'Found' : 'Not found');
}
