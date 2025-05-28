// Thealcohesion VPU - Interactive JavaScript

// Helper function to get CSS variable values
function getCSSVariable(variableName) {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year automatically
    const currentYear = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('.copyright-year');
    copyrightElements.forEach(element => {
        element.textContent = currentYear;
    });

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

    // Initialize modern timeline if on about page
    if (document.querySelector('.modern-timeline-section')) {
        initModernTimeline();
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

    // Timeline Collapsible Functionality
    initTimelineCollapsibles();
});

// Modern Timeline Functions
function initTimelineCollapsibles() {
    // Initialize both legacy and modern timeline functionality
    initLegacyTimelineCollapsibles();
    initModernTimelineInteractions();
}

function initLegacyTimelineCollapsibles() {
    // Initialize all collapsible buttons for legacy timeline
    const collapsibles = document.querySelectorAll('.collapsible1, .collapsible2, .collapsible3');
    
    collapsibles.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle active state
            this.classList.toggle('active');
            
            // Get the content element (next sibling)
            const content = this.nextElementSibling;
            
            if (content && content.classList.contains('content1')) {
                // Toggle content visibility with smooth animation
                if (content.style.maxHeight && content.style.maxHeight !== '0px') {
                    content.style.maxHeight = '0px';
                    content.style.opacity = '0';
                    content.style.padding = '0';
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.style.opacity = '1';
                    content.style.padding = '1rem';
                }
            }
        });
    });
    
    // Initialize all content areas as closed
    const contents = document.querySelectorAll('.content1');
    contents.forEach(content => {
        content.style.maxHeight = '0px';
        content.style.opacity = '0';
        content.style.padding = '0';
    });
}

function initModernTimelineInteractions() {
    // Modern timeline phase controls
    const phaseControls = document.querySelectorAll('.phase-control');
    const phases = document.querySelectorAll('.timeline-phase');
    
    phaseControls.forEach(control => {
        control.addEventListener('click', function() {
            const targetPhase = this.getAttribute('data-phase');
            
            // Remove active state from all controls and phases
            phaseControls.forEach(c => c.classList.remove('active'));
            phases.forEach(p => p.classList.remove('active'));
            
            // Add active state to clicked control
            this.classList.add('active');
            
            // Show target phase with animation
            const targetPhaseElement = document.querySelector(`[data-phase-content="${targetPhase}"]`);
            if (targetPhaseElement) {
                setTimeout(() => {
                    targetPhaseElement.classList.add('active');
                }, 100);
            }
            
            // Add ripple effect
            createRippleEffect(this, this.getBoundingClientRect());
        });
    });
    
    // Modern timeline card interactions
    const timelineCards = document.querySelectorAll('.timeline-card');
    timelineCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle expanded state
            this.classList.toggle('expanded');
            
            // Find expandable content
            const expandableContent = this.querySelector('.card-expandable');
            if (expandableContent) {
                if (this.classList.contains('expanded')) {
                    expandableContent.style.maxHeight = expandableContent.scrollHeight + 'px';
                    expandableContent.style.opacity = '1';
                } else {
                    expandableContent.style.maxHeight = '0px';
                    expandableContent.style.opacity = '0';
                }
            }
        });
        
        // Add hover effect with magnetic behavior
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
    
    // Initialize timeline animation on scroll
    initTimelineScrollAnimations();
}

function initTimelineScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger animation for child elements
                const children = entry.target.querySelectorAll('.timeline-card, .phase-marker, .task-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe timeline sections
    const timelineSections = document.querySelectorAll('.modern-timeline-section, .timeline-phase');
    timelineSections.forEach(section => observer.observe(section));
}

function createRippleEffect(element, rect) {
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = rect.width / 2 - size / 2;
    const y = rect.height / 2 - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: ${getCSSVariable('--accent-color')};
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        opacity: 0.3;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Modern timeline functionality moved to about.js

// Timeline functionality moved to about.js
