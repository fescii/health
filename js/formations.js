// Formations Page JavaScript
// Thealcohesion VPU - Formations Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) for formations page
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Initialize formations interactions
    initFormationCards();
    initFormationAnimations();
    initFormationHierarchy();
    initFormationSearch();
});

// Formation Cards Interactive Effects
function initFormationCards() {
    const formationCards = document.querySelectorAll('.formation-card');
    
    formationCards.forEach(card => {
        // Add hover effect with magnetic behavior
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            // Animate formation type badge
            const formationType = this.querySelector('.formation-type');
            if (formationType) {
                formationType.style.transform = 'scale(1.05)';
                formationType.style.boxShadow = 'var(--box-shadow)';
            }

            // Animate list items
            const listItems = this.querySelectorAll('.formation-content ul li');
            listItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateX(5px)';
                    item.style.background = 'rgba(98, 55, 160, 0.05)';
                }, index * 50);
            });
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Reset formation type badge
            const formationType = this.querySelector('.formation-type');
            if (formationType) {
                formationType.style.transform = 'scale(1)';
                formationType.style.boxShadow = 'none';
            }

            // Reset list items
            const listItems = this.querySelectorAll('.formation-content ul li');
            listItems.forEach(item => {
                item.style.transform = 'translateX(0)';
                item.style.background = 'transparent';
            });
        });

        // Add click interaction with ripple effect
        card.addEventListener('click', function(e) {
            // Create ripple effect
            createRippleEffect(this, e);
            
            // Show formation details modal (if implemented)
            const formationName = this.querySelector('.formation-header h3').textContent;
            showFormationDetails(formationName);
        });

        // Add keyboard accessibility
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Make cards focusable
        card.setAttribute('tabindex', '0');
    });
}

// Formation Cards Scroll Animations
function initFormationAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger animation for formation type badges
                const formationType = entry.target.querySelector('.formation-type');
                if (formationType) {
                    setTimeout(() => {
                        formationType.style.opacity = '1';
                        formationType.style.transform = 'translateY(0)';
                    }, 200);
                }

                // Stagger animation for list items
                const listItems = entry.target.querySelectorAll('.formation-content ul li');
                listItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 300 + (index * 100));
                });
            }
        });
    }, observerOptions);
    
    // Observe formation cards
    const formationCards = document.querySelectorAll('.formation-card');
    formationCards.forEach(card => observer.observe(card));
    
    // Observe section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => observer.observe(header));
}

// Formation Hierarchy Information
function initFormationHierarchy() {
    const hierarchyBox = document.querySelector('.formation-hierarchy');
    if (hierarchyBox) {
        // Add interactive behavior to hierarchy info
        hierarchyBox.addEventListener('click', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = 'var(--modal-shadow)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'var(--box-shadow)';
            }, 200);
        });
    }
}

// Formation Search Functionality
function initFormationSearch() {
    // Add search functionality if search input exists
    const searchInput = document.querySelector('.formation-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterFormations(searchTerm);
        });
    }
}

// Filter formations by search term
function filterFormations(searchTerm) {
    const formationCards = document.querySelectorAll('.formation-card');
    let visibleCount = 0;
    
    formationCards.forEach(card => {
        const formationName = card.querySelector('.formation-header h3').textContent.toLowerCase();
        const formationContent = card.querySelector('.formation-content').textContent.toLowerCase();
        
        if (formationName.includes(searchTerm) || formationContent.includes(searchTerm)) {
            card.style.display = 'flex';
            card.classList.add('animate-in');
            visibleCount++;
        } else {
            card.style.display = 'none';
            card.classList.remove('animate-in');
        }
    });
    
    // Update search results indicator
    updateSearchResults(visibleCount, searchTerm);
}

// Create ripple effect for interactions
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    // Calculate click position relative to element
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(98, 55, 160, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: formationRipple 0.6s ease-out;
        pointer-events: none;
        z-index: 10;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Show formation details modal
function showFormationDetails(formationName) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'formation-modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--modal-background);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'formation-modal';
    modal.innerHTML = `
        <div class="formation-modal-header">
            <h3>${formationName}</h3>
            <button class="formation-modal-close">&times;</button>
        </div>
        <div class="formation-modal-content">
            <p>Detailed information about ${formationName} would be displayed here.</p>
            <p>This includes organizational structure, responsibilities, and reporting relationships.</p>
        </div>
        <div class="formation-modal-actions">
            <button class="formation-btn primary">View Structure</button>
            <button class="formation-btn secondary">Contact Formation</button>
        </div>
    `;
    
    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);
    
    // Show modal with animation
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
    }, 10);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.formation-modal-close');
    const closeModal = () => {
        modalOverlay.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(modalOverlay);
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
    
    // Keyboard accessibility
    document.addEventListener('keydown', function escKeyHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escKeyHandler);
        }
    });
}

// Update search results counter
function updateSearchResults(count, searchTerm) {
    let resultsIndicator = document.querySelector('.formation-search-results');
    
    if (!resultsIndicator) {
        resultsIndicator = document.createElement('div');
        resultsIndicator.className = 'formation-search-results';
        resultsIndicator.style.cssText = `
            text-align: center;
            padding: 1rem;
            color: var(--gray-color);
            font-style: italic;
        `;
        
        const searchContainer = document.querySelector('.formation-search').parentNode;
        searchContainer.appendChild(resultsIndicator);
    }
    
    if (searchTerm) {
        resultsIndicator.textContent = `Found ${count} formation${count !== 1 ? 's' : ''} matching "${searchTerm}"`;
        resultsIndicator.style.display = 'block';
    } else {
        resultsIndicator.style.display = 'none';
    }
}

// Smooth scroll for formation navigation
function scrollToFormation(formationId) {
    const element = document.getElementById(formationId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Highlight the target formation temporarily
        element.style.background = 'rgba(98, 55, 160, 0.1)';
        setTimeout(() => {
            element.style.background = '';
        }, 2000);
    }
}

// Formation card expand/collapse functionality
function initFormationExpansion() {
    const expandableCards = document.querySelectorAll('.formation-card[data-expandable]');
    
    expandableCards.forEach(card => {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'formation-expand-btn';
        toggleBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
        toggleBtn.style.cssText = `
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: var(--accent-color);
            color: var(--white-color);
            border: none;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            cursor: pointer;
            transition: transform 0.3s ease;
        `;
        
        card.appendChild(toggleBtn);
        
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            card.classList.toggle('expanded');
            
            if (card.classList.contains('expanded')) {
                this.style.transform = 'rotate(180deg)';
                // Show additional content
                showExpandedContent(card);
            } else {
                this.style.transform = 'rotate(0deg)';
                // Hide additional content
                hideExpandedContent(card);
            }
        });
    });
}

// Add CSS animations for formations
const formationAnimationCSS = `
@keyframes formationRipple {
    0% { transform: scale(0); opacity: 0.3; }
    100% { transform: scale(2); opacity: 0; }
}

.formation-modal {
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

.formation-modal-overlay[style*="opacity: 1"] .formation-modal {
    transform: scale(1);
}

.formation-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: var(--border);
}

.formation-modal-close {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: var(--text-color);
    transition: color 0.3s ease;
}

.formation-modal-close:hover {
    color: var(--accent-color);
}

.formation-modal-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

.formation-btn {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.formation-btn.primary {
    background: var(--accent-linear);
    color: var(--white-color);
}

.formation-btn.secondary {
    background: var(--button-background);
    color: var(--text-color);
    border: var(--border);
}

.formation-btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--box-shadow);
}

.formation-type {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.4s ease;
}

.formation-content ul li {
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
}

.section-header {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.section-header.animate-in {
    opacity: 1;
    transform: translateY(0);
}
`;

// Inject formation animation CSS
const formationStyle = document.createElement('style');
formationStyle.textContent = formationAnimationCSS;
document.head.appendChild(formationStyle);
