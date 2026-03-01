/* ===================== */
/* ANIMATIONS MODULE     */
/* ===================== */

/**
 * Animations Module
 * Handles scroll animations, fade-ins, and visual effects
 */

(function() {
    'use strict';

    /* ===================== */
    /* INTERSECTION OBSERVER */
    /* ===================== */

    // Fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                // Optionally unobserve after animation
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    function initScrollAnimations() {
        const animatableElements = document.querySelectorAll(
            '.feature-card, .service-card, .pricing-card, .reason-card, ' +
            '.why-card, .stat-card, .faq-item, .info-card, .zone-card, ' +
            '.review-card, .google-review-card, .shop-product-card'
        );

        animatableElements.forEach(el => {
            el.classList.add('fade-in-element');
            fadeInObserver.observe(el);
        });
    }

    /* ===================== */
    /* SCROLL TO TOP         */
    /* ===================== */

    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Retour en haut de page');
    scrollToTopBtn.style.display = 'none';
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ===================== */
    /* LOADING ANIMATIONS    */
    /* ===================== */

    // Remove loading skeletons when content is loaded
    function removeSkeletons() {
        const skeletons = document.querySelectorAll('.skeleton');
        skeletons.forEach(skeleton => {
            setTimeout(() => {
                skeleton.classList.remove('skeleton');
            }, 500);
        });
    }

    /* ===================== */
    /* INITIALIZE            */
    /* ===================== */

    function init() {
        initScrollAnimations();
        
        // Remove skeletons after page load
        if (document.readyState === 'complete') {
            removeSkeletons();
        } else {
            window.addEventListener('load', removeSkeletons);
        }
    }

    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

/* ===================== */
/* CSS FOR ANIMATIONS    */
/* ===================== */

// Add CSS dynamically for fade-in animations
const style = document.createElement('style');
style.textContent = `
    .fade-in-element {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .fade-in-visible {
        opacity: 1;
        transform: translateY(0);
    }

    .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .scroll-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }

    .scroll-to-top:focus {
        outline: 2px solid white;
        outline-offset: 2px;
    }

    @media (max-width: 768px) {
        .scroll-to-top {
            bottom: 80px;
            right: 16px;
            width: 45px;
            height: 45px;
            font-size: 1rem;
        }
    }
`;
document.head.appendChild(style);
