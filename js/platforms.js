// Platforms Page JavaScript
// Thealcohesion VPU - Platforms Functionality

document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS (Animate On Scroll) for platforms page
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Note: Mobile Navigation Toggle is handled by script.js to avoid conflicts
    // No need to duplicate hamburger menu functionality here

    // Initialize platform interactions
    initPlatformCards();
    initPlatformAnimations();
    initPlatformSearch();
    initPlatformFilters();
});

// Platform Cards Interactive Effects
function initPlatformCards() {
    const platformCards = document.querySelectorAll('.platform-card');

    platformCards.forEach(card => {
        // Add hover effect with magnetic behavior
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.02)';

            // Animate feature tags
            const featureTags = this.querySelectorAll('.feature-tag');
            featureTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-2px)';
                    tag.style.background = 'var(--accent-color)';
                    tag.style.color = 'var(--white-color)';
                }, index * 50);
            });
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';

            // Reset feature tags
            const featureTags = this.querySelectorAll('.feature-tag');
            featureTags.forEach(tag => {
                tag.style.transform = 'translateY(0)';
                tag.style.background = 'var(--button-background)';
                tag.style.color = 'var(--text-color)';
            });
        });

        // Add click interaction
        card.addEventListener('click', function () {
            // Create ripple effect
            createRippleEffect(this);

            // Show platform details modal (if implemented)
            const platformName = this.querySelector('.platform-header h3').textContent;
            showPlatformDetails(platformName);
        });
    });
}

// Platform Cards Scroll Animations
function initPlatformAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Stagger animation for feature tags
                const featureTags = entry.target.querySelectorAll('.feature-tag');
                featureTags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe platform cards
    const platformCards = document.querySelectorAll('.platform-card');
    platformCards.forEach(card => observer.observe(card));

    // Observe stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => observer.observe(item));
}

// Platform Search Functionality
function initPlatformSearch() {
    const searchInput = document.getElementById('platform-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const platformCards = document.querySelectorAll('.platform-card');

        platformCards.forEach(card => {
            const platformName = card.querySelector('.platform-header h3').textContent.toLowerCase();
            const platformContent = card.querySelector('.platform-content p').textContent.toLowerCase();
            const featureTags = Array.from(card.querySelectorAll('.feature-tag')).map(tag => tag.textContent.toLowerCase());

            const matchesSearch = platformName.includes(searchTerm) ||
                platformContent.includes(searchTerm) ||
                featureTags.some(tag => tag.includes(searchTerm));

            if (matchesSearch) {
                card.style.display = 'block';
                card.classList.add('search-match');
            } else {
                card.style.display = 'none';
                card.classList.remove('search-match');
            }
        });

        // Update results counter
        updateSearchResults();
    });
}

// Platform Filter Functionality
function initPlatformFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filterType = this.getAttribute('data-filter');

            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter platform cards
            filterPlatforms(filterType);
        });
    });
}

// Filter platforms by type
function filterPlatforms(filterType) {
    const platformCards = document.querySelectorAll('.platform-card');

    platformCards.forEach(card => {
        if (filterType === 'all') {
            card.style.display = 'block';
            card.classList.add('filter-match');
        } else {
            const platformType = card.getAttribute('data-platform-type');
            if (platformType === filterType) {
                card.style.display = 'block';
                card.classList.add('filter-match');
            } else {
                card.style.display = 'none';
                card.classList.remove('filter-match');
            }
        }
    });

    // Update results counter
    updateSearchResults();
}

// Create ripple effect for interactions
function createRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = rect.width / 2 - size / 2;
    const y = rect.height / 2 - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: var(--accent-color);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        opacity: 0.3;
        z-index: 10;
    `;

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// Show platform details modal
function showPlatformDetails(platformName) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'platform-modal-overlay';
    modalOverlay.innerHTML = /*html*/ `
        <div class="platform-modal">
            <div class="platform-modal-header">
                <h3>${platformName}</h3>
                <button class="platform-modal-close">&times;</button>
            </div>
            <div class="platform-modal-content">
                <div class="platform-modal-features">
                    <p> We are working on this platform and shall be available when launching the Thealcohesion VPU.</p>
                    <p>For more information about ${platformName}:</p>
                </div>
                <div class="platform-modal-actions">
                    <a href="https://wa.me/254703538027?text=I%20am%20interested%20in%20the%20${encodeURIComponent(platformName)}%2C%20tell%20me%20more%20about%20it" class="platform-btn primary">Whatsapp</a>
                    <a href="tel:+254703538027" class="platform-btn secondary">Call us</a>
                </div>
            </div>
        </div>
    `;

    // Add modal styles
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--modal-overlay);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    document.body.appendChild(modalOverlay);

    // Show modal with animation
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
    }, 10);

    // Close modal functionality
    const closeBtn = modalOverlay.querySelector('.platform-modal-close');
    closeBtn.addEventListener('click', () => {
        modalOverlay.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modalOverlay);
        }, 300);
    });

    // Close on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modalOverlay);
            }, 300);
        }
    });
}

// Update search results counter
function updateSearchResults() {
    const visibleCards = document.querySelectorAll('.platform-card[style*="display: block"], .platform-card:not([style*="display: none"])');
    const resultsCounter = document.getElementById('results-counter');

    if (resultsCounter) {
        resultsCounter.textContent = `${visibleCards.length} platforms found`;
    }
}

// Smooth scroll for platform navigation
function scrollToPlatform(platformId) {
    const platform = document.getElementById(platformId);
    if (platform) {
        platform.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Platform statistics counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
        const duration = 2000; // 2 seconds
        const start = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * target);

            counter.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    });
}

// Initialize counter animation when stat items come into view
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe stat items for counter animation
document.addEventListener('DOMContentLoaded', () => {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        statObserver.observe(item);
    });
});

// Add CSS animations for platforms
const platformAnimationCSS = /*css*/ `
.platform-card, .stat-item {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.platform-card.animate-in, .stat-item.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.feature-tag {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.4s ease;
}

.feature-tag.animate-in {
    opacity: 1;
    transform: translateY(0);
}

@keyframes ripple {
    0% { transform: scale(0); opacity: 0.3; }
    100% { transform: scale(2); opacity: 0; }
}

.platform-modal {
    background: var(--background);
    border-radius: 20px;
    padding: 2rem;
    max-width: 600px;
    width: 90%;
    box-shadow: var(--modal-shadow);
    border: var(--border);
    transform: scale(0.9);
    transition: transform 0.3s ease;
}

.platform-modal-overlay[style*="opacity: 1"] .platform-modal {
    transform: scale(1);
}

.platform-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: var(--border);
}

.platform-modal-close {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: var(--text-color);
    transition: color 0.3s ease;
}

.platform-modal-close:hover {
    color: var(--accent-color);
}

.platform-modal-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

.platform-btn {
    padding: 7px 20px;
    border: none;
    border-radius: 15px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s ease;
}

.platform-btn.primary {
    background: var(--accent-linear);
    color: var(--white-color);
}

.platform-btn.secondary {
    background: var(--button-background);
    color: var(--text-color);
    border: var(--border);
}

.platform-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--box-shadow);
}
`;

// Inject platform animation CSS
const platformStyle = document.createElement('style');
platformStyle.textContent = platformAnimationCSS;
document.head.appendChild(platformStyle);
