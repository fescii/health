// Coming Soon Page JavaScript
// Alkebulan Cohesion VPU - Soon Page Functionality

document.addEventListener('DOMContentLoaded', function () {
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

    // Initialize all functionality
    initCountdown();
    initEmailSignup();
    initFloatingShapes();
    initScrollAnimations();
    initVideoPlayer();
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

    emailForm.addEventListener('submit', function (e) {
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
document.addEventListener('click', function (e) {
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
document.addEventListener('keydown', function (e) {
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

// Video Player Functionality
function initVideoPlayer() {
    const video = document.getElementById('vpuVideo');
    const videoOverlay = document.getElementById('videoOverlay');
    const playButton = document.getElementById('playButton');
    const videoControls = document.getElementById('videoControls');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progressBar = document.getElementById('progressBar');
    const progressSlider = document.getElementById('progressSlider');
    const timeDisplay = document.getElementById('timeDisplay');
    const volumeBtn = document.getElementById('volumeBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');

    if (!video) return;

    let isPlaying = false;
    let isMuted = false;
    let controlsTimeout;
    let userHasInteracted = false; // Track if user has interacted with video

    // Format time display
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Update time display
    function updateTimeDisplay() {
        const currentTime = video.currentTime;
        const duration = video.duration || 0;
        timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
    }

    // Update progress bar
    function updateProgress() {
        if (!isDragging && video.duration && !isNaN(video.duration)) {
            const progress = (video.currentTime / video.duration) * 100;
            progressBar.style.width = `${progress}%`;
            progressBar.style.background = 'var(--accent-linear)';
            progressSlider.value = progress;
        }
        updateTimeDisplay();
    }

    // Play video
    function playVideo() {
        video.play()
            .then(() => {
                isPlaying = true;
                hasAutoPlayed = true; // Mark as manually played
                videoOverlay.classList.add('hidden');
                updatePlayPauseButton();
                showControlsTemporarily();
            })
            .catch(error => {
                console.error('Error playing video:', error);
            });
    }

    // Manual play video (triggered by user interaction)
    function playVideoManual() {
        userHasInteracted = true;

        // Unmute video for manual play
        if (video.muted) {
            video.muted = false;
            isMuted = false;
            updateVolumeButton();
        }

        playVideo();
    }

    // Pause video
    function pauseVideo() {
        video.pause();
        isPlaying = false;
        updatePlayPauseButton();
        showControls();
    }

    // Toggle play/pause
    function togglePlayPause() {
        if (!userHasInteracted) {
            userHasInteracted = true;
            // First user interaction - unmute if muted
            if (video.muted) {
                video.muted = false;
                isMuted = false;
                updateVolumeButton();
            }
        }

        if (isPlaying) {
            pauseVideo();
        } else {
            playVideo();
        }
    }

    // Update play/pause button icons
    function updatePlayPauseButton() {
        const playIcon = playPauseBtn.querySelector('.play-icon');
        const pauseIcon = playPauseBtn.querySelector('.pause-icon');

        if (isPlaying) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    }

    // Show controls temporarily
    function showControlsTemporarily() {
        showControls();
        clearTimeout(controlsTimeout);
        controlsTimeout = setTimeout(() => {
            if (isPlaying) {
                hideControls();
            }
        }, 3000);
    }

    // Show controls
    function showControls() {
        videoControls.classList.add('show');
    }

    // Hide controls
    function hideControls() {
        videoControls.classList.remove('show');
    }

    // Toggle mute
    function toggleMute() {
        isMuted = !isMuted;
        video.muted = isMuted;
        updateVolumeButton();
    }

    // Update volume button icon
    function updateVolumeButton() {
        const volumeIcon = volumeBtn.querySelector('.volume-icon');
        const muteIcon = volumeBtn.querySelector('.mute-icon');

        if (isMuted || video.volume === 0) {
            volumeIcon.style.display = 'none';
            muteIcon.style.display = 'block';
        } else {
            volumeIcon.style.display = 'block';
            muteIcon.style.display = 'none';
        }
    }

    // Toggle fullscreen
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            video.requestFullscreen().catch(err => {
                console.error('Error attempting to enable fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }

    // Seek video
    function seekVideo(percentage) {
        if (video.duration && !isNaN(video.duration)) {
            const seekTime = (percentage / 100) * video.duration;
            video.currentTime = seekTime;
        }
    }

    // Event Listeners

    // Main play button (overlay)
    playButton.addEventListener('click', playVideoManual);
    videoOverlay.addEventListener('click', playVideoManual);

    // Control buttons
    playPauseBtn.addEventListener('click', togglePlayPause);
    volumeBtn.addEventListener('click', toggleMute);
    fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Direct video click to play/pause with sound
    video.addEventListener('click', (e) => {
        // Prevent event from bubbling to overlay
        e.stopPropagation();
        togglePlayPause();
    });

    // Progress slider
    progressSlider.addEventListener('input', (e) => {
        seekVideo(e.target.value);
    });

    // Handle progress slider dragging
    progressSlider.addEventListener('change', (e) => {
        seekVideo(e.target.value);
    });

    // Prevent video time updates while user is dragging slider
    let isDragging = false;

    progressSlider.addEventListener('mousedown', () => {
        isDragging = true;
    });

    progressSlider.addEventListener('mouseup', () => {
        isDragging = false;
    });

    progressSlider.addEventListener('touchstart', () => {
        isDragging = true;
    });

    progressSlider.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Add click-to-seek functionality for progress bar container
    const progressContainer = document.querySelector('.progress-container');
    if (progressContainer) {
        progressContainer.addEventListener('click', (e) => {
            if (e.target === progressContainer || e.target.classList.contains('progress-track')) {
                const rect = progressContainer.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percentage = (clickX / rect.width) * 100;
                seekVideo(Math.max(0, Math.min(100, percentage)));
            }
        });
    }

    // Video events
    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', () => {
        updateTimeDisplay();
        // Initialize progress slider max value
        progressSlider.max = 100;
        progressSlider.value = 0;
        // Initialize progress bar styling
        progressBar.style.background = 'var(--accent-linear)';
        progressBar.style.width = '0%';
    });
    video.addEventListener('loadeddata', () => {
        // Video data is loaded, seeking should work now
        console.log('Video data loaded, duration:', video.duration);
    });
    video.addEventListener('play', () => {
        isPlaying = true;
        updatePlayPauseButton();
        videoOverlay.classList.add('hidden');
    });
    video.addEventListener('pause', () => {
        isPlaying = false;
        updatePlayPauseButton();
    });
    video.addEventListener('ended', () => {
        isPlaying = false;
        updatePlayPauseButton();
        videoOverlay.classList.remove('hidden');
        showControls();
    });

    // Mouse movement for controls
    video.addEventListener('mousemove', () => {
        if (isPlaying) {
            showControlsTemporarily();
        }
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (document.activeElement.tagName === 'INPUT') return;

        switch (e.code) {
            case 'Space':
                e.preventDefault();
                togglePlayPause();
                break;
            case 'KeyM':
                toggleMute();
                break;
            case 'KeyF':
                toggleFullscreen();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                video.currentTime = Math.max(0, video.currentTime - 10);
                break;
            case 'ArrowRight':
                e.preventDefault();
                video.currentTime = Math.min(video.duration, video.currentTime + 10);
                break;
        }
    });

    // Initialize video player state
    updatePlayPauseButton();
    updateVolumeButton();

    // Set default volume
    video.volume = 0.8;

    // Preload video metadata
    video.load();

    // Viewport-based autoplay functionality
    let hasAutoPlayed = false;
    let isScrolling = false;
    let scrollTimeout;

    // Intersection Observer for viewport detection
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAutoPlayed && !isScrolling) {
                // Video is in viewport, attempt autoplay
                video.muted = true; // Ensure muted for autoplay policy
                updateVolumeButton();

                video.play()
                    .then(() => {
                        isPlaying = true;
                        hasAutoPlayed = true;
                        videoOverlay.classList.add('hidden');
                        updatePlayPauseButton();
                        showControlsTemporarily();
                    })
                    .catch(error => {
                        console.log('Autoplay prevented:', error);
                        // Autoplay was prevented, show overlay for manual play
                        videoOverlay.classList.remove('hidden');
                    });
            } else if (!entry.isIntersecting && isPlaying) {
                // Video is out of viewport, pause it
                pauseVideo();
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of video is visible
    });

    // Start observing the video element
    observer.observe(video);

    // Scroll detection to pause video during scrolling
    let lastScrollY = window.scrollY;

    function handleScroll() {
        const currentScrollY = window.scrollY;
        const scrollDelta = Math.abs(currentScrollY - lastScrollY);

        // If significant scroll movement detected
        if (scrollDelta > 10) {
            isScrolling = true;

            // Pause video if playing
            if (isPlaying) {
                pauseVideo();
            }

            // Clear existing timeout
            clearTimeout(scrollTimeout);

            // Set timeout to resume autoplay after scrolling stops
            scrollTimeout = setTimeout(() => {
                isScrolling = false;

                // Check if video is still in viewport and resume if needed
                const videoRect = video.getBoundingClientRect();
                const isInViewport = videoRect.top < window.innerHeight &&
                    videoRect.bottom > 0 &&
                    videoRect.left < window.innerWidth &&
                    videoRect.right > 0;

                if (isInViewport && !isPlaying && hasAutoPlayed) {
                    // Resume autoplay after scroll stops
                    // Keep muted unless user has interacted
                    if (!userHasInteracted) {
                        video.muted = true;
                    }

                    video.play()
                        .then(() => {
                            isPlaying = true;
                            updatePlayPauseButton();
                            showControlsTemporarily();
                        })
                        .catch(error => {
                            console.log('Resume play prevented:', error);
                        });
                }
            }, 150); // Resume after 150ms of no scrolling
        }

        lastScrollY = currentScrollY;
    }

    // Throttled scroll listener
    let scrollThrottle = false;
    window.addEventListener('scroll', () => {
        if (!scrollThrottle) {
            requestAnimationFrame(() => {
                handleScroll();
                scrollThrottle = false;
            });
            scrollThrottle = true;
        }
    });

    // Handle visibility change (tab switching)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isPlaying) {
            pauseVideo();
        }
    });
}
