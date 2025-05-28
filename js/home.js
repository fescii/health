// Home Page Specific JavaScript

/**
 * Initialize all home page functionality
 */
function initHomePage() {
    initCountdownTimer();
    initParallaxEffect();
    createFloatingParticles();
    initButtonAnimations();
    initStatsCounter();
    initTypingAnimation();
    
    // Home specific console message
    console.log('%c🚀 Welcome to AO3 Landing Page! 🚀', 'color: #FFD700; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with passion for the future of decentralized computing', 'color: #00BFFF; font-size: 14px;');
}

/**
 * Initialize countdown timer
 */
function initCountdownTimer() {
    const targetDate = new Date('2025-11-31T23:59:59').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = '<div class="countdown-expired">🎉 Launch Time! 🎉</div>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const timeUnits = [
            { value: days, label: 'Days' },
            { value: hours, label: 'Hours' },
            { value: minutes, label: 'Minutes' },
            { value: seconds, label: 'Seconds' }
        ];

        const countdownHTML = timeUnits.map(unit => `
            <div class="time-unit">
                <span>${unit.value.toString().padStart(2, '0')}</span>
                <div class="unit">${unit.label}</div>
            </div>
        `).join('');

        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            countdownElement.innerHTML = countdownHTML;
            
            // Add animation class to updated units
            const units = countdownElement.querySelectorAll('.time-unit');
            units.forEach((unit, index) => {
                const currentValue = timeUnits[index].value;
                const displayValue = unit.querySelector('span').textContent;
                
                if (currentValue.toString().padStart(2, '0') !== displayValue) {
                    unit.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        unit.style.transform = 'scale(1)';
                    }, 200);
                }
            });
        }
    }

    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/**
 * Initialize parallax effect for hero section
 */
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const floatingElements = document.querySelectorAll('.element');

    if (!hero || !heroContent) return;

    function handleScroll() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const rateElements = scrolled * -0.3;

        // Parallax effect for hero background
        if (scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${rate}px)`;
            
            // Move floating elements at different rates
            floatingElements.forEach((element, index) => {
                const elementRate = rateElements * (0.5 + index * 0.2);
                element.style.transform = `translateY(${elementRate}px)`;
            });
        }
    }

    // Throttle scroll events for better performance
    let ticking = false;
    function scrollHandler() {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
            setTimeout(() => ticking = false, 16);
        }
    }

    window.addEventListener('scroll', scrollHandler, { passive: true });
}

/**
 * Create and animate floating particles
 */
function createFloatingParticles() {
    const heroParticles = document.querySelector('.hero-particles');
    if (!heroParticles) return;

    // Create additional particles dynamically
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 2-8px
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 6}s`;
        
        // Random animation duration
        particle.style.animationDuration = `${4 + Math.random() * 4}s`;
        
        heroParticles.appendChild(particle);
    }

    // Inject additional particle animation CSS
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            .hero-particles .particle {
                animation: float 6s ease-in-out infinite;
            }
            
            @keyframes particleFloat {
                0%, 100% {
                    transform: translateY(0px) scale(1);
                    opacity: 0.6;
                }
                50% {
                    transform: translateY(-30px) scale(1.2);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Initialize button animations and interactions
 */
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.cta-primary, .cta-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Remove existing ripple
            this.classList.remove('ripple');
            
            // Trigger ripple effect
            setTimeout(() => {
                this.classList.add('ripple');
            }, 10);
            
            // Remove ripple class after animation
            setTimeout(() => {
                this.classList.remove('ripple');
            }, 600);
        });

        // Add hover sound effect (optional)
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Initialize stats counter animation
 */
function initStatsCounter() {
    const statsElements = document.querySelectorAll('[data-count]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);

    statsElements.forEach(element => {
        observer.observe(element);
    });

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format number with commas for large numbers
            const formattedNumber = Math.floor(current).toLocaleString();
            element.textContent = formattedNumber + (element.getAttribute('data-suffix') || '');
        }, 16);
    }
}

/**
 * Initialize typing animation for hero title
 */
function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-effect');
    
    typingElements.forEach((element, index) => {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        let charIndex = 0;
        const typingSpeed = 50; // milliseconds per character
        const startDelay = index * 500; // stagger multiple elements
        
        setTimeout(() => {
            const typeWriter = setInterval(() => {
                if (charIndex < text.length) {
                    element.textContent += text.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(typeWriter);
                    // Add blinking cursor effect
                    element.classList.add('typing-complete');
                }
            }, typingSpeed);
        }, startDelay);
    });
}

/**
 * Initialize scroll-triggered animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.foundation-card, .benefit-card, .ethic-item');
    animateElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Account for fixed header
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Handle resize events for responsive behavior
 */
function handleResize() {
    // Recalculate parallax on resize
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = 'translateY(0)';
    }
    
    // Adjust particle positions
    const particles = document.querySelectorAll('.hero-particles .particle');
    particles.forEach(particle => {
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
    });
}

// Performance optimization: throttle resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 250);
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initHomePage();
    initScrollAnimations();
    initSmoothScrolling();
});

// Reinitialize on page visibility change (for countdown accuracy)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // Restart countdown when page becomes visible again
        initCountdownTimer();
    }
});

// Export functions for potential use in other scripts
window.HomePageModule = {
    initCountdownTimer,
    initParallaxEffect,
    createFloatingParticles,
    initButtonAnimations,
    initStatsCounter,
    initTypingAnimation
};
