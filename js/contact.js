// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Validate required fields
            if (!data.name || !data.email || !data.phone || !data.message) {
                showAlert('Please fill in all required fields.', 'error');
                return;
            }

            // Validate email format
            if (!isValidEmail(data.email)) {
                showAlert('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            submitBtn.innerHTML = `
                <span>Sending...</span>
                <svg class="spinner" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 2v4"/>
                    <path d="M12 18v4"/>
                    <path d="M4.93 4.93l2.83 2.83"/>
                    <path d="M16.24 16.24l2.83 2.83"/>
                    <path d="M2 12h4"/>
                    <path d="M18 12h4"/>
                    <path d="M4.93 19.07l2.83-2.83"/>
                    <path d="M16.24 7.76l2.83-2.83"/>
                </svg>
            `;
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Reset form
                contactForm.reset();

                // Show success message
                showAlert('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');

                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;

                // For demo purposes, you can replace this with actual form submission
                console.log('Form data:', data);

            }, 2000);
        });
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show alert messages
    function showAlert(message, type) {
        // Remove existing alerts
        const existingAlert = document.querySelector('.form-alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        // Create alert element
        const alert = document.createElement('div');
        alert.className = `form-alert ${type}`;
        alert.innerHTML = `
            <div class="alert-content">
                <span class="alert-icon">
                    ${type === 'success' ?
                '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>' :
                '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>'
            }
                </span>
                <span class="alert-message">${message}</span>
                <button class="alert-close" onclick="this.parentElement.parentElement.remove()">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        `;

        // Insert alert before form
        contactForm.parentNode.insertBefore(alert, contactForm);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }

    // Add CSS for alerts
    const alertStyles = `
        <style>
        .form-alert {
            margin-bottom: 2rem;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            font-family: var(--font-text);
            animation: slideDown 0.3s ease;
        }
        
        .form-alert.success {
            background: rgba(34, 197, 94, 0.1);
            border: 1px solid rgba(34, 197, 94, 0.3);
            color: #22c55e;
        }
        
        .form-alert.error {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: #ef4444;
        }
        
        .alert-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .alert-icon {
            flex-shrink: 0;
        }
        
        .alert-icon svg {
            width: 20px;
            height: 20px;
        }
        
        .alert-message {
            flex-grow: 1;
            font-weight: 500;
        }
        
        .alert-close {
            background: none;
            border: none;
            color: currentColor;
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 4px;
            transition: background-color 0.2s ease;
            flex-shrink: 0;
        }
        
        .alert-close:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        
        .alert-close svg {
            width: 16px;
            height: 16px;
        }
        
        .spinner {
            animation: spin 1s linear infinite;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', alertStyles);

    // Form field enhancements
    const formInputs = contactForm ? contactForm.querySelectorAll('input, textarea, select') : [];

    formInputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });

        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');

            // Format as: +254 XXX XXX XXX
            if (value.startsWith('254')) {
                value = value.substring(3);
            } else if (value.startsWith('0')) {
                value = value.substring(1);
            }

            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `+254 ${value}`;
                } else if (value.length <= 6) {
                    value = `+254 ${value.substring(0, 3)} ${value.substring(3)}`;
                } else {
                    value = `+254 ${value.substring(0, 3)} ${value.substring(3, 6)} ${value.substring(6, 9)}`;
                }
            }

            e.target.value = value;
        });
    }

    // Smooth scroll to form if coming from a link
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('scroll') === 'form') {
        const formSection = document.querySelector('.contact-form-section');
        if (formSection) {
            formSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
});

// Emergency contact functions
function callEmergency() {
    if (confirm('This will call our 24/7 emergency line. Continue?')) {
        window.location.href = 'tel:+254123456789';
    }
}

function openWhatsApp() {
    const message = encodeURIComponent('Hello Diasync International team, I need medical assistance.');
    window.open(`https://wa.me/254123456789?text=${message}`, '_blank');
}

// Export functions for use in HTML
window.callEmergency = callEmergency;
window.openWhatsApp = openWhatsApp;
