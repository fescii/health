// About Page - Timeline Specific JavaScript
// Dedicated timeline functionality for the about page

// Main initialization function for modern timeline
function initModernTimeline() {
    if (document.querySelector('.modern-timeline-section')) {
        initTimelineExpansion();
        initTimelineControls();
        initTimelineAnimations();
    }
}

// Initialize timeline functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initModernTimeline();
});

// Initialize all timeline phases as expanded by default
function initTimelineExpansion() {
    const allPhaseCards = document.querySelectorAll('.phase-card');
    const allTimelinePhases = document.querySelectorAll('.timeline-phase');
    
    allPhaseCards.forEach(card => {
        card.classList.add('active');
    });
    
    allTimelinePhases.forEach(phase => {
        phase.classList.add('expanded');
    });
}

// Initialize timeline control buttons
function initTimelineControls() {
    const expandAllBtn = document.querySelector('.expand-all-btn');
    const collapseAllBtn = document.querySelector('.collapse-all-btn');
    
    if (expandAllBtn) {
        expandAllBtn.addEventListener('click', expandAllPhases);
    }
    
    if (collapseAllBtn) {
        collapseAllBtn.addEventListener('click', collapseAllPhases);
    }
}

// Enhanced phase toggle with smooth animations
function togglePhaseAnimated(header) {
    const phaseCard = header.closest('.phase-card');
    const toggleIcon = header.querySelector('.toggle-icon svg');
    const phasePhase = header.closest('.timeline-phase');
    const isActive = phaseCard.classList.contains('active');
    
    createRippleEffect(header);
    
    if (isActive) {
        phaseCard.classList.remove('active');
        if (toggleIcon) {
            toggleIcon.style.transform = 'rotate(0deg)';
        }
        phasePhase.classList.remove('expanded');
    } else {
        phaseCard.classList.add('active');
        if (toggleIcon) {
            toggleIcon.style.transform = 'rotate(180deg)';
        }
        phasePhase.classList.add('expanded');
    }
}

// Expand all phases with staggered animation
function expandAllPhases() {
    const phaseCards = document.querySelectorAll('.phase-card');
    const expandBtn = document.querySelector('.expand-all-btn');
    
    if (expandBtn) {
        createRippleEffect(expandBtn);
    }
    
    phaseCards.forEach((card, index) => {
        setTimeout(() => {
            const toggleIcon = card.querySelector('.toggle-icon svg');
            const phasePhase = card.closest('.timeline-phase');
            
            card.classList.add('active');
            
            if (toggleIcon) {
                toggleIcon.style.transform = 'rotate(180deg)';
            }
            
            phasePhase.classList.add('expanded');
        }, index * 100);
    });
}

// Collapse all phases with staggered animation
function collapseAllPhases() {
    const phaseCards = document.querySelectorAll('.phase-card');
    const collapseBtn = document.querySelector('.collapse-all-btn');
    
    if (collapseBtn) {
        createRippleEffect(collapseBtn);
    }
    
    phaseCards.forEach((card, index) => {
        setTimeout(() => {
            const toggleIcon = card.querySelector('.toggle-icon svg');
            const phasePhase = card.closest('.timeline-phase');
            
            card.classList.remove('active');
            
            if (toggleIcon) {
                toggleIcon.style.transform = 'rotate(0deg)';
            }
            
            phasePhase.classList.remove('expanded');
        }, index * 50);
    });
}

// Toggle task items within phases
function toggleTask(element) {
    createRippleEffect(element);
    
    if (element.classList.contains('active')) {
        element.classList.remove('active');
    } else {
        element.classList.add('active');
    }
}

// Initialize timeline animations and interactions
function initTimelineAnimations() {
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
    
    const timelinePhases = document.querySelectorAll('.timeline-phase');
    timelinePhases.forEach(phase => observer.observe(phase));
}

// Create ripple effect for button interactions
function createRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = rect.width / 2 - size / 2;
    const y = rect.height / 2 - size / 2;
    
    ripple.style.position = 'absolute';
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.background = 'rgba(102, 126, 234, 0.3)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '100';
    
    if (!document.getElementById('ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = '@keyframes ripple { to { transform: scale(4); opacity: 0; } }';
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
}

// Scroll to bottom of timeline
function scrollToBottom() {
    const timelineFooter = document.querySelector('.timeline-footer');
    if (timelineFooter) {
        timelineFooter.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Scroll to top of timeline
function scrollToTop() {
    const timelineSection = document.querySelector('.modern-timeline-section');
    if (timelineSection) {
        timelineSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
}

// Export functions for global access
window.initModernTimeline = initModernTimeline;
window.togglePhaseAnimated = togglePhaseAnimated;
window.expandAllPhases = expandAllPhases;
window.collapseAllPhases = collapseAllPhases;
window.toggleTask = toggleTask;
window.scrollToBottom = scrollToBottom;
window.scrollToTop = scrollToTop;
