// Formations Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    initializeFormations();
    addFormationAnimations();
    handleFormationSearch();
});

// Initialize formations functionality
function initializeFormations() {
    // Add click handlers for formation cards
    const formationCards = document.querySelectorAll('.formation-card');
    formationCards.forEach(card => {
        const toggleBtn = card.querySelector('.formation-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                const formationType = card.getAttribute('data-formation');
                toggleFormationDetails(formationType);
            });
        }
    });

    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// Toggle formation details visibility
function toggleFormationDetails(formationType) {
    const detailsElement = document.getElementById(`${formationType}-details`);
    const toggleBtn = document.querySelector(`[data-formation="${formationType}"] .formation-toggle`);

    if (!detailsElement || !toggleBtn) return;

    const isActive = detailsElement.classList.contains('active');

    // Close all other open details
    const allDetails = document.querySelectorAll('.formation-details');
    const allToggles = document.querySelectorAll('.formation-toggle');

    allDetails.forEach(detail => detail.classList.remove('active'));
    allToggles.forEach(toggle => {
        toggle.classList.remove('active');
        toggle.textContent = 'View Details';
    });

    // Toggle current details
    if (!isActive) {
        detailsElement.classList.add('active');
        toggleBtn.classList.add('active');
        toggleBtn.textContent = 'Hide Details';

        // Smooth scroll to the card
        setTimeout(() => {
            detailsElement.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 150);

        // Track analytics
        trackFormationView(formationType);
    }
}

// Add formation animations and interactions
function addFormationAnimations() {
    const formationCards = document.querySelectorAll('.formation-card');

    formationCards.forEach((card, index) => {
        // Add hover effects
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px)';
            addParallaxEffect(this);
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            removeParallaxEffect(this);
        });

        // Add stagger animation delay
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Animate stats on scroll
    observeStatsAnimation();
}

// Add parallax effect to formation cards
function addParallaxEffect(card) {
    const icon = card.querySelector('.formation-icon');
    if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        icon.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }
}

// Remove parallax effect
function removeParallaxEffect(card) {
    const icon = card.querySelector('.formation-icon');
    if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
    }
}

// Observe and animate stats
function observeStatsAnimation() {
    const statsSection = document.querySelector('.overview-stats');
    if (!statsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}

// Animate stat numbers
function animateStatNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        const isNumeric = !isNaN(parseInt(finalValue));

        if (isNumeric) {
            const finalNum = parseInt(finalValue);
            animateNumber(stat, 0, finalNum, 1500);
        } else {
            // For non-numeric values like "15+"
            const numPart = parseInt(finalValue);
            if (!isNaN(numPart)) {
                animateNumber(stat, 0, numPart, 1500, finalValue.replace(numPart.toString(), ''));
            }
        }
    });
}

// Animate number counting
function animateNumber(element, start, end, duration, suffix = '') {
    const startTime = performance.now();

    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);

        element.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = end + suffix;
        }
    }

    requestAnimationFrame(updateNumber);
}

// Handle formation search functionality
function handleFormationSearch() {
    // Create search functionality if needed
    const searchInput = document.getElementById('formation-search');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(filterFormations, 300));
    }
}

// Filter formations based on search
function filterFormations(searchTerm) {
    const formationCards = document.querySelectorAll('.formation-card');
    const term = searchTerm.toLowerCase();

    formationCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        const isMatch = title.includes(term) || description.includes(term);

        if (isMatch) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.3s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Handle keyboard navigation
function handleKeyboardNavigation(e) {
    if (e.key === 'Escape') {
        // Close all open formation details
        const allDetails = document.querySelectorAll('.formation-details.active');
        const allToggles = document.querySelectorAll('.formation-toggle.active');

        allDetails.forEach(detail => detail.classList.remove('active'));
        allToggles.forEach(toggle => {
            toggle.classList.remove('active');
            toggle.textContent = 'View Details';
        });
    }
}

// Track formation views for analytics
function trackFormationView(formationType) {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'formation_view', {
            'formation_type': formationType,
            'page_title': 'Formations'
        });
    }

    // Custom analytics
    console.log(`Formation viewed: ${formationType}`);
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add formation card interactions
function addFormationCardInteractions() {
    const formationCards = document.querySelectorAll('.formation-card');

    formationCards.forEach(card => {
        // Add ripple effect on click
        card.addEventListener('click', function (e) {
            if (e.target.classList.contains('formation-toggle')) return;

            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Initialize advanced interactions on load
document.addEventListener('DOMContentLoaded', function () {
    addFormationCardInteractions();

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .formation-card {
            position: relative;
            overflow: hidden;
        }
        
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(98, 55, 160, 0.3);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});

// Expose global function for HTML onclick handlers
window.toggleFormationDetails = toggleFormationDetails;