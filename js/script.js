// Thealcohesion VPU - Interactive JavaScript

// Helper function to get CSS variable values
function getCSSVariable(variableName) {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

document.addEventListener('DOMContentLoaded', function () {
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
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
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
            link.addEventListener('click', function (e) {
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

    // Initialize Escape Rat Race FAB
    createEscapeRatRaceFAB();
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
        button.addEventListener('click', function () {
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
        control.addEventListener('click', function () {
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
        card.addEventListener('click', function () {
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
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', function () {
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

// Floating Action Button (FAB) for "Escape Rat Race"
function createEscapeRatRaceFAB() {
    // Create FAB button
    const fab = document.createElement('button');
    fab.className = 'escape-rat-race-fab';
    fab.setAttribute('aria-label', 'Escape Rat Race');
    fab.innerHTML = 'ESCAPE<br>RAT RACE';

    // Create modal with overlay structure
    const modal = document.createElement('div');
    modal.className = 'escape-rat-race-modal';
    modal.innerHTML = `
        <div class="overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>🚀 Escape the Rat Race</h2>
                <button class="modal-close" aria-label="Close modal">×</button>
            </div>
            <div class="modal-body">
                <p>In a bustling city, people rush by, consumed by the rat race, chasing success and wealth. But what is the true cost of this relentless pursuit? Amidst the chaos, one person sits overwhelmed at a desk, buried under papers and a glowing screen. This life, filled with competition and stress, breeds greed, envy, and anxiety.</p>
                
                <p>Is this the purpose of life? To be overwhelmed by the quest for a 'better life'? What if another way exists? A way to live meaningfully?</p>
                
                <h3>🌟 Introducing Thealcohesion</h3>
                <p>A community designed to redefine life's purpose. Here, success isn't just about personal gain; it's about serving humanity, self-development, and regenerating a better world. Thealcohesion isn't merely a concept; it's a movement uniting Thealcohesion Space Natives to unlock synergy and collaboration. Together, lives can be transformed into something truly worthwhile.</p>
                
                <h3>🎯 Building a Sustainable Future</h3>
                <p>Focusing on seven core areas – Leadership and Governance, Entrepreneurship, Health, Investment, Education, IT, and Research – Thealcohesion aims to build a sustainable future. By pooling resources, a new society can emerge, achieving shared goals through principles that help Thealcohesion Space Natives learn to manage activities that enhance their lives and the world, not for personal reward, but for the common good.</p>
                
                <h3>⚡ The Energy Currency</h3>
                <p>At the heart of Thealcohesion lies a new currency – The Energy. Unlike traditional money, this energy-based system is backed by the potential of its members, empowering them to contribute freely.</p>
                
                <h3>🌐 Thealcohesion VPU</h3>
                <p>To realize this vision, Thealcohesion VPU – a Virtual Pragmatic Universe platform – is being created. Here, members shall pool resources, build investments, share knowledge, and collaborate for the common good. The VPU shall enable secure transactions, business growth, and access to educational resources. It's not just a tool; it's a thriving ecosystem fostering growth, collaboration, and innovation.</p>
                
                <p>In Thealcohesion, every member plays a role in regenerating Thealcohesion Space. Lives are transformed as everyone works towards a shared goal: creating a world where life is truly worth living.</p>
                
                <p><strong>Join Thealcohesion. Be part of a movement redefining success. Together, a better world can be created, one step at a time.</strong></p>
                
                <p>For more information, follow our social media channels. <em><a href="careers.html" style="color: var(--primary-color); text-decoration: none; font-weight: bold;">Let US launch the solution together.</a></em></p>
            </div>
        </div>
    `;

    // Add to page
    document.body.appendChild(fab);
    document.body.appendChild(modal);

    // Add event listeners
    fab.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.overlay').addEventListener('click', closeModal);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
