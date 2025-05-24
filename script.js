// Thealcohesion VPU - Interactive JavaScript

// Helper function to get CSS variable values
function getCSSVariable(variableName) {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

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

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.background = getCSSVariable('--nav-background');
                navbar.style.boxShadow = getCSSVariable('--header-shadow');
            } else {
                navbar.style.background = getCSSVariable('--background');
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Countdown Timer
    function initCountdownTimer() {
        // Set the target date to October 30th, 2025
        const targetDate = new Date('2025-10-30T23:59:59');

        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');

        if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
            return;
        }

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance < 0) {
                // Timer has expired
                daysElement.textContent = '00';
                hoursElement.textContent = '00';
                minutesElement.textContent = '00';
                secondsElement.textContent = '00';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysElement.textContent = days.toString().padStart(2, '0');
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');

            // Add animation effect
            const timeUnits = document.querySelectorAll('.time-unit');
            timeUnits.forEach(unit => {
                unit.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    unit.style.transform = 'scale(1)';
                }, 100);
            });
        }

        // Update immediately and then every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Initialize countdown timer
    initCountdownTimer();

    // Interactive VPU Nodes
    function initInteractiveNodes() {
        const nodes = document.querySelectorAll('.node');
        const centerNode = document.querySelector('.node-center');

        nodes.forEach(node => {
            if (!node.classList.contains('node-center')) {
                node.addEventListener('mouseenter', function() {
                    // Create connection line effect
                    this.style.boxShadow = getCSSVariable('--modal-shadow');
                    if (centerNode) {
                        centerNode.style.boxShadow = getCSSVariable('--modal-shadow');
                    }
                });

                node.addEventListener('mouseleave', function() {
                    this.style.boxShadow = '';
                    if (centerNode) {
                        centerNode.style.boxShadow = '';
                    }
                });
            }
        });
    }

    initInteractiveNodes();

    // FAQ Accordion
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', function() {
                    const isActive = item.classList.contains('active');
                    
                    // Close all other FAQ items
                    faqItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                    });
                    
                    // Toggle current item
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    initFAQ();

    // Contact Form Handling
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const name = formData.get('name');
                const email = formData.get('email');
                const subject = formData.get('subject');
                const message = formData.get('message');

                // Basic validation
                if (!name || !email || !subject || !message) {
                    showNotification('Please fill in all fields', 'error');
                    return;
                }

                // Simulate form submission
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;

                setTimeout(() => {
                    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
                    this.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
            });
        }
    }

    initContactForm();

    // Notification System
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? getCSSVariable('--accent-color') : type === 'error' ? getCSSVariable('--error-color') : getCSSVariable('--tab-color')};
            color: ${getCSSVariable('--white-color')};
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: ${getCSSVariable('--modal-shadow')};
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
            font-weight: 500;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Smooth Scrolling for Navigation Links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    initSmoothScrolling();

    // Parallax Effect for Hero Section
    function initParallaxEffect() {
        const hero = document.querySelector('.hero');
        const floatingElements = document.querySelectorAll('.element');
        
        if (hero && floatingElements.length > 0) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                floatingElements.forEach((element, index) => {
                    const speed = 0.3 + (index * 0.1);
                    element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
                });
            });
        }
    }

    initParallaxEffect();

    // Typing Animation for Hero Title
    function initTypingAnimation() {
        const titleLines = document.querySelectorAll('.title-line');
        
        if (titleLines.length > 0) {
            titleLines.forEach((line, index) => {
                const text = line.textContent;
                line.textContent = '';
                line.style.opacity = '1';
                
                setTimeout(() => {
                    let charIndex = 0;
                    const typingInterval = setInterval(() => {
                        line.textContent += text[charIndex];
                        charIndex++;
                        
                        if (charIndex >= text.length) {
                            clearInterval(typingInterval);
                        }
                    }, 50);
                }, index * 1000);
            });
        }
    }

    // Uncomment to enable typing animation instead of slide-in
    // initTypingAnimation();

    // Stats Counter Animation
    function initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observerOptions = {
            threshold: 0.7,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const finalValue = element.textContent;
                    const isPercentage = finalValue.includes('%');
                    const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                    
                    let currentValue = 0;
                    const increment = numericValue / 50; // Animation duration
                    
                    const counter = setInterval(() => {
                        currentValue += increment;
                        
                        if (currentValue >= numericValue) {
                            element.textContent = finalValue;
                            clearInterval(counter);
                        } else {
                            const displayValue = Math.floor(currentValue);
                            element.textContent = isPercentage ? `${displayValue}%` : displayValue;
                        }
                    }, 40);
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);
        
        statNumbers.forEach(stat => observer.observe(stat));
    }

    initStatsCounter();

    // Button Click Animations
    function initButtonAnimations() {
        const buttons = document.querySelectorAll('.cta-primary, .cta-secondary');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: ${getCSSVariable('--button-background')};
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
        
        // Add ripple animation CSS
        if (!document.getElementById('ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    initButtonAnimations();

    // Add floating particles effect
    function createFloatingParticles() {
        const heroParticles = document.querySelector('.hero-particles');
        if (!heroParticles) return;

        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: ${Math.random() > 0.5 ? 'var(--accent-color)' : 'var(--alt-color)'};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.6 + 0.2};
                animation: floatParticle ${Math.random() * 10 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            heroParticles.appendChild(particle);
        }

        // Add particle animation CSS
        if (!document.getElementById('particle-animation')) {
            const style = document.createElement('style');
            style.id = 'particle-animation';
            style.textContent = `
                @keyframes floatParticle {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px) rotate(0deg);
                    }
                    33% {
                        transform: translateY(-30px) translateX(20px) rotate(120deg);
                    }
                    66% {
                        transform: translateY(20px) translateX(-15px) rotate(240deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    createFloatingParticles();

    // Console welcome message
    console.log(`
    🌍 Welcome to Thealcohesion VPU!
    
    "Build Alkebulan, build generations"
    Jenga Alkebulan, jenga vizazi
    
    Join our revolutionary digital ecosystem.
    `);
});

// Additional utility functions
window.alkebulancohesion = {
    // Scroll to top function
    scrollToTop: function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },
    
    // Get countdown time remaining
    getCountdownRemaining: function() {
        const days = document.getElementById('days')?.textContent || '00';
        const hours = document.getElementById('hours')?.textContent || '00';
        const minutes = document.getElementById('minutes')?.textContent || '00';
        const seconds = document.getElementById('seconds')?.textContent || '00';
        
        return {
            days: parseInt(days),
            hours: parseInt(hours),
            minutes: parseInt(minutes),
            seconds: parseInt(seconds)
        };
    },
    
    // Show custom notification
    showMessage: function(message, type = 'info') {
        // This would call the showNotification function defined above
        if (typeof showNotification === 'function') {
            showNotification(message, type);
        }
    }
};
