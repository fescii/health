// Coming Soon Page JavaScript
// Alkebulan Cohesion VPU - Soon Page Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
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

    // Initialize all functionality
    initCountdown();
    initEmailSignup();
    initProgressIndicator();
    initFloatingShapes();
    initScrollAnimations();
});

// Countdown Timer Functionality
function initCountdown() {
    const countdownTimer = document.getElementById('countdown-timer');
    if (!countdownTimer) return;

    // Set launch date to October 30th, 2025
    const launchDate = new Date('2025-11-31T23:59:59');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = launchDate.getTime() - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            // Countdown finished
            countdownTimer.innerHTML = '<div class="countdown-finished">🎉 We\'re Live! 🎉</div>';
        }
    }
    
    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Email Signup Functionality
function initEmailSignup() {
    const emailForm = document.getElementById('newsletter-form');
    if (!emailForm) return;

    emailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = document.getElementById('email-input');
        const email = emailInput.value.trim();
        
        if (validateEmail(email)) {
            // Simulate email submission
            showNotification('🎉 Thank you! You\'ll be notified when we launch!', 'success');
            emailInput.value = '';
            
            // Add some visual feedback
            const submitBtn = emailForm.querySelector('.notify-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '✓ Subscribed!';
            submitBtn.style.background = 'var(--action-linear)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'var(--accent-linear)';
            }, 3000);
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification-toast ${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="toast-close" onclick="closeNotification(this)">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

// Close notification
function closeNotification(element) {
    const notification = element.classList ? element : element.parentElement;
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentElement) {
            notification.parentElement.removeChild(notification);
        }
    }, 300);
}

// Progress Indicator
function initProgressIndicator() {
    const progressIndicator = document.querySelector('.progress-indicator');
    if (!progressIndicator) return;

    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = window.pageYOffset;
        const scrollPercentage = Math.min((scrollTop / scrollHeight) * 100, 100);
        
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = `${scrollPercentage}%`;
        }
        
        // Update progress text
        const progressText = progressIndicator.querySelector('.progress-text');
        if (progressText) {
            progressText.textContent = `Launch Progress: ${Math.round(scrollPercentage)}%`;
        }
    });
}

// Floating Shapes Animation Enhancement
function initFloatingShapes() {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        // Add random movement variation
        const randomDelay = Math.random() * 5;
        const randomDuration = 15 + Math.random() * 10;
        
        shape.style.animationDelay = `${randomDelay}s`;
        shape.style.animationDuration = `${randomDuration}s`;
        
        // Add hover effect
        shape.addEventListener('mouseenter', () => {
            shape.style.animationPlayState = 'paused';
            shape.style.transform = 'scale(1.2)';
        });
        
        shape.addEventListener('mouseleave', () => {
            shape.style.animationPlayState = 'running';
            shape.style.transform = 'scale(1)';
        });
    });
}

// Scroll Animations
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
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.vision-item, .feature-category, .social-link');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Add CSS for scroll animations
const scrollAnimationCSS = `
.vision-item, .feature-category, .social-link {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.vision-item.animate-in, .feature-category.animate-in, .social-link.animate-in {
    opacity: 1;
    transform: translateY(0);
}
`;

// Inject scroll animation CSS
const style = document.createElement('style');
style.textContent = scrollAnimationCSS;
document.head.appendChild(style);

// Smooth scroll for navigation links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
    // Close notifications with Escape key
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification-toast.show');
        notifications.forEach(notification => {
            closeNotification(notification);
        });
    }
});

// Preload important resources
function preloadResources() {
    const links = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    ];
    
    links.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();
