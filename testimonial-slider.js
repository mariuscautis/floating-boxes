document.addEventListener('DOMContentLoaded', function () {
    // Find all testimonial sections on the page
    const testimonialSections = document.querySelectorAll('.testimonials');
    
    // Initialize each slider independently
    testimonialSections.forEach(function(section, index) {
        initializeTestimonialSlider(section, index);
    });
    
    function initializeTestimonialSlider(section, sectionIndex) {
        const testimonialTrack = section.querySelector('.testimonials-row');
        const scrollbarBar = section.querySelector('.testimonials-scrollbar-bar');
        const scrollbarTrack = section.querySelector('.testimonials-scrollbar-track');
        const prevArrow = section.querySelector('.testimonial-nav-prev');
        const nextArrow = section.querySelector('.testimonial-nav-next');
        
        if (!testimonialTrack || !scrollbarBar || !scrollbarTrack) return;

        let direction = 1; // 1 = right, -1 = left
        let baseSpeed = 1.2;
        let currentSpeed = baseSpeed;
        const speedMultiplier = 15; // Changed to 20x as requested
        const boostDuration = 300; // 1.5 seconds as requested
        let boostTimeout;
        let animationFrame;
        let isPaused = false;
        let scrollPosition = 0;
        let isAnimating = false; // Track if we're in animation mode
        
        // Calculate the width of one complete set of items
        const testimonials = testimonialTrack.querySelectorAll('.testimonial');
        const totalItems = testimonials.length;
        const itemsPerSet = totalItems / 2; // Since we duplicate the items
        
        // Calculate item width and total width of one set
        let itemWidth = 0;
        let totalWidth = 0;
        
        function calculateDimensions() {
            if (testimonials[0]) {
                itemWidth = testimonials[0].offsetWidth + 70; // Include gap
                totalWidth = itemWidth * itemsPerSet;
            }
        }
        
        // Initialize dimensions
        calculateDimensions();
        
        // Update scrollbar position with smooth continuous movement
        function updateScrollbar() {
            if (totalWidth === 0) return;
            
            // Calculate progress based on actual scroll position (0 to 1)
            const progress = (scrollPosition % totalWidth) / totalWidth;
            
            // Move the scrollbar bar based on progress
            const trackWidth = scrollbarTrack.offsetWidth;
            const barWidth = scrollbarBar.offsetWidth;
            const maxPosition = trackWidth - barWidth;
            
            const barPosition = progress * maxPosition;
            scrollbarBar.style.transform = 'translateX(' + barPosition + 'px)';
        }
        
        // Function to sync SVG position with scroll
        function syncSvgWithScroll() {
            if (totalWidth === 0) return;
            
            const scrollRatio = scrollPosition / totalWidth;
            
            // Move SVG in opposite direction for parallax effect
            const svgOffset = scrollRatio * -800;
            // If you have SVG elements, uncomment and modify as needed
            // const wavySvg = section.querySelector('.wavy-svg');
            // if (wavySvg) wavySvg.style.transform = 'translateX(' + svgOffset + 'px)';
        }
        
        // Update testimonial transform and related elements
        function updateTestimonialTransform() {
            testimonialTrack.style.transform = 'translateX(-' + scrollPosition + 'px)';
            updateScrollbar();
            syncSvgWithScroll();
        }
        
        // Animation loop for continuous scrolling
        function animateTestimonials() {
            if (isPaused || isAnimating) return;
            
            scrollPosition += currentSpeed * direction;
            
            // Handle seamless looping
            if (scrollPosition >= totalWidth) {
                scrollPosition = 0;
            } else if (scrollPosition < 0) {
                scrollPosition = totalWidth - Math.abs(scrollPosition);
            }
            
            updateTestimonialTransform();
            animationFrame = requestAnimationFrame(animateTestimonials);
        }
        
        // Start/Stop functions
        function startTestimonials() {
            if (!animationFrame && !isAnimating) {
                isPaused = false;
                animateTestimonials();
            }
        }
        
        function stopTestimonials() {
            isPaused = true;
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
                animationFrame = null;
            }
        }
        
        // Animate to specific position
        function animateToPosition(targetPosition) {
            isAnimating = true;
            stopTestimonials();
            
            // Add animation classes
            testimonialTrack.classList.add('animating');
            scrollbarBar.classList.add('animating');
            
            // Normalize target position
            while (targetPosition < 0) targetPosition += totalWidth;
            while (targetPosition >= totalWidth) targetPosition -= totalWidth;
            
            // Update position
            scrollPosition = targetPosition;
            updateTestimonialTransform();
            
            // Remove animation classes and resume after animation
            setTimeout(function() {
                testimonialTrack.classList.remove('animating');
                scrollbarBar.classList.remove('animating');
                isAnimating = false;
                startTestimonials();
            }, 800); // Match CSS transition duration
        }
        
        // Enhanced boost scroll function for arrows
        function boostScroll(boostDirection) {
            if (isAnimating) return;
            
            direction = boostDirection;
            currentSpeed = baseSpeed * speedMultiplier;
            
            // Add visual feedback to arrows
            const activeArrow = boostDirection === 1 ? nextArrow : prevArrow;
            if (activeArrow) {
                activeArrow.classList.add('active');
            }
            
            clearTimeout(boostTimeout);
            boostTimeout = setTimeout(function() {
                currentSpeed = baseSpeed;
                // Remove visual feedback
                if (activeArrow) {
                    activeArrow.classList.remove('active');
                }
            }, boostDuration);
        }
        
        // Arrow click event listeners
        if (prevArrow) {
            prevArrow.addEventListener('click', function(e) {
                e.preventDefault();
                boostScroll(-1); // Boost scroll left
            });
        }
        
        if (nextArrow) {
            nextArrow.addEventListener('click', function(e) {
                e.preventDefault();
                boostScroll(1); // Boost scroll right
            });
        }
        
        // Event listeners for hover pause
        testimonialTrack.addEventListener('mouseenter', stopTestimonials);
        testimonialTrack.addEventListener('mouseleave', function() {
            if (!isAnimating) startTestimonials();
        });
        
        // Drag functionality
        let isDown = false;
        let startX;
        let startScrollPosition;
        let lastMoveTime = 0;
        let velocity = 0;

        testimonialTrack.addEventListener('mousedown', function(e) {
            if (isAnimating) return;
            isDown = true;
            testimonialTrack.classList.add('dragging');
            startX = e.pageX;
            startScrollPosition = scrollPosition;
            velocity = 0;
            lastMoveTime = Date.now();
            stopTestimonials();
            e.preventDefault();
        });

        testimonialTrack.addEventListener('mouseleave', function() {
            if (isDown) {
                isDown = false;
                testimonialTrack.classList.remove('dragging');
                if (!isAnimating) startTestimonials();
            }
        });

        testimonialTrack.addEventListener('mouseup', function() {
            if (isDown) {
                isDown = false;
                testimonialTrack.classList.remove('dragging');
                if (!isAnimating) startTestimonials();
            }
        });

        testimonialTrack.addEventListener('mousemove', function(e) {
            if (!isDown || isAnimating) return;
            e.preventDefault();
            
            const currentTime = Date.now();
            const x = e.pageX;
            const walk = (x - startX) * 1.5;
            
            // Calculate velocity for smoother interaction
            const timeDiff = currentTime - lastMoveTime;
            if (timeDiff > 0) {
                velocity = walk / timeDiff;
            }
            lastMoveTime = currentTime;
            
            // Update scroll position with wrapping
            scrollPosition = startScrollPosition - walk;
            while (scrollPosition < 0) scrollPosition += totalWidth;
            while (scrollPosition >= totalWidth) scrollPosition -= totalWidth;
            
            updateTestimonialTransform();
        });

        // Touch events for mobile support
        testimonialTrack.addEventListener('touchstart', function(e) {
            if (isAnimating) return;
            isDown = true;
            startX = e.touches[0].pageX;
            startScrollPosition = scrollPosition;
            velocity = 0;
            lastMoveTime = Date.now();
            stopTestimonials();
        }, { passive: true });

        testimonialTrack.addEventListener('touchend', function() {
            if (isDown) {
                isDown = false;
                if (!isAnimating) startTestimonials();
            }
        }, { passive: true });

        testimonialTrack.addEventListener('touchmove', function(e) {
            if (!isDown || isAnimating) return;
            
            const currentTime = Date.now();
            const x = e.touches[0].pageX;
            const walk = (x - startX) * 1.5;
            
            const timeDiff = currentTime - lastMoveTime;
            if (timeDiff > 0) {
                velocity = walk / timeDiff;
            }
            lastMoveTime = currentTime;
            
            scrollPosition = startScrollPosition - walk;
            while (scrollPosition < 0) scrollPosition += totalWidth;
            while (scrollPosition >= totalWidth) scrollPosition -= totalWidth;
            
            updateTestimonialTransform();
        }, { passive: true });

        // Scrollbar click functionality - ANIMATE to position
        scrollbarTrack.addEventListener('click', function(e) {
            if (isAnimating) return;
            
            const rect = scrollbarTrack.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = x / rect.width;
            
            // Calculate target position based on click position
            const targetPosition = percentage * totalWidth;
            
            // Animate to the target position
            animateToPosition(targetPosition);
        });

        // Prevent image drag
        const images = testimonialTrack.querySelectorAll('img, .testimonial');
        images.forEach(function(img) {
            img.addEventListener('dragstart', function(e) { e.preventDefault(); });
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            calculateDimensions();
            updateTestimonialTransform();
        });

        // Initialize
        testimonialTrack.style.cursor = 'grab';
        
        // Set initial position
        scrollPosition = 0;
        updateTestimonialTransform();
        startTestimonials();

        console.log('✅ Smooth testimonials slider initialized for section ' + sectionIndex);
        console.log('Total items: ' + totalItems + ', Items per set: ' + itemsPerSet);
    }
});