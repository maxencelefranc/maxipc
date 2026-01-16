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

// Apply animation to cards on scroll
document.querySelectorAll('.feature-card, .service-card, .reason-card, .info-card, .faq-item').forEach(el => {
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
