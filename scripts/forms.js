/* ===================== */
/* FORMS MODULE          */
/* ===================== */

/**
 * Forms Module
 * Handles contact forms, reservations, and EmailJS integration
 */

(function() {
    'use strict';

    /* ===================== */
    /* EMAILJS CONFIGURATION */
    /* ===================== */

    // Initialize EmailJS when document is ready
    function initEmailJS() {
        if (typeof emailjs !== 'undefined') {
            emailjs.init({
                publicKey: 'c4iw2Wxz3QnEZYi7S'
            });
            console.log('EmailJS initialized successfully');
        }
    }

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
            submitButton.setAttribute('aria-busy', 'true');
            
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
                    formMessage.setAttribute('role', 'status');
                    formMessage.setAttribute('aria-live', 'polite');

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
                    submitButton.removeAttribute('aria-busy');
                    
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
                    formMessage.setAttribute('role', 'alert');
                    formMessage.setAttribute('aria-live', 'assertive');

                    // Re-enable submit button
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    submitButton.removeAttribute('aria-busy');
                });
        });
    }

    /* ===================== */
    /* FORM VALIDATION       */
    /* ===================== */

    // Add real-time validation feedback
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('invalid')) {
                    validateField(this);
                }
            });
        });
    });

    function validateField(field) {
        const isValid = field.checkValidity();
        
        if (!isValid) {
            field.classList.add('invalid');
            field.setAttribute('aria-invalid', 'true');
        } else {
            field.classList.remove('invalid');
            field.removeAttribute('aria-invalid');
        }
    }

    // Initialize EmailJS
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEmailJS);
    } else {
        initEmailJS();
    }

})();
