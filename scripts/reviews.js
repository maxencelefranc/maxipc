/* ===================== */
/* REVIEWS MODULE        */
/* ===================== */

/**
 * Reviews Module
 * Handles customer testimonials display
 */

(function() {
    'use strict';

    // Sample reviews data - Replace with real reviews
    const reviews = [
        {
            name: "Sophie M.",
            rating: 5,
            date: "Février 2026",
            comment: "Service impeccable ! Mon PC était très lent et Maxence a su identifier et résoudre le problème rapidement. Très professionnel et de bon conseil.",
            service: "Optimisation PC"
        },
        {
            name: "Pierre L.",
            rating: 5,
            date: "Janvier 2026",
            comment: "J'ai fait monter un PC gaming sur mesure. Le résultat dépasse mes attentes ! Configuration parfaite, câble management soigné, et explications claires. Je recommande vivement.",
            service: "Montage PC Gaming"
        },
        {
            name: "Marie D.",
            rating: 5,
            date: "Décembre 2025",
            comment: "Intervention rapide et efficace. Mon ordinateur ne démarrait plus, réparé en moins de 24h. Tarifs honnêtes et travail de qualité.",
            service: "Dépannage urgentNote: 5,
            date: "Novembre 2025",
            comment: "Excellent service client ! Maxence a pris le temps de m'expliquer le problème et les différentes solutions. Transparent sur les tarifs, je recommande.",
            service: "Conseil & Diagnostic"
        }
    ];

    /* ===================== */
    /* RENDER REVIEWS        */
    /* ===================== */

    function renderReviews() {
        const reviewsList = document.getElementById('googleReviewsList');
        if (!reviewsList) return;

        reviewsList.innerHTML = '';

        reviews.forEach((review, index) => {
            const reviewCard = document.createElement('article');
            reviewCard.className = 'google-review-card';
            reviewCard.setAttribute('role', 'article');
            reviewCard.style.animationDelay = `${index * 0.1}s`;

            const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

            reviewCard.innerHTML = `
                <div class="review-header">
                    <div class="review-avatar" aria-hidden="true">
                        ${review.name.charAt(0)}
                    </div>
                    <div class="review-info">
                        <h3 class="review-name">${review.name}</h3>
                        <div class="review-rating" role="img" aria-label="${review.rating} étoiles sur 5">
                            ${stars}
                        </div>
                    </div>
                </div>
                <div class="review-meta">
                    <span class="review-date">${review.date}</span>
                    <span class="review-service">${review.service}</span>
                </div>
                <p class="review-comment">${review.comment}</p>
            `;

            reviewsList.appendChild(reviewCard);
        });

        // Update the header
        const updatedElement = document.getElementById('googleReviewsUpdated');
        if (updatedElement) {
            updatedElement.textContent = `Basé sur ${reviews.length} avis`;
        }
    }

    /* ===================== */
    /* INITIALIZE            */
    /* ===================== */

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderReviews);
    } else {
        renderReviews();
    }

})();
