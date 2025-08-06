// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }

  // Initialize all functions
  initHeaderScroll();
  initScrollProgress();
  initHamburgerMenu();
  initDynamicText();
  initCarousels();
  initStatsCounter();
  initBackToTop();
  initSmoothScrolling();
  initScrollAnimations();
  initParallax();
  initLazyLoading();
  initFormValidation();
  initPerformanceMonitoring();
  initAccessibility();
});


// Header Scroll Effect
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }

    // Hide header on scroll down, show on scroll up
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
  });
}

// Scroll Progress Bar
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress-bar');
  
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      
      progressBar.style.width = scrollPercent + '%';
    });
  }
}




 // Hamburger Menu JavaScript
        function initHamburgerMenu() {
            const hamburger = document.getElementById('hamburger-btn');
            const nav = document.getElementById('main-nav');
            
            if (hamburger && nav) {
                // Toggle menu on hamburger click
                hamburger.addEventListener('click', (e) => {
                    e.stopPropagation();
                    hamburger.classList.toggle('active');
                    nav.classList.toggle('active');
                    
                    // Toggle body scroll when menu is open
                    if (nav.classList.contains('active')) {
                        document.body.style.overflow = 'hidden';
                    } else {
                        document.body.style.overflow = '';
                    }
                });
                
                // Close menu when clicking a navigation link
                document.querySelectorAll('.main-nav a').forEach(link => {
                    link.addEventListener('click', () => {
                        hamburger.classList.remove('active');
                        nav.classList.remove('active');
                        document.body.style.overflow = '';
                    });
                });
                
                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
                        hamburger.classList.remove('active');
                        nav.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
                
                // Close menu on escape key
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        hamburger.classList.remove('active');
                        nav.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
                
                // Close menu on window resize if desktop
                window.addEventListener('resize', () => {
                    if (window.innerWidth > 991) {
                        hamburger.classList.remove('active');
                        nav.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                });
            }
        }




 document.addEventListener('DOMContentLoaded', () => {
    const dynamicText = document.querySelector('.dynamic-text');
    const secondaryText = document.querySelector('.dynamic-secondary-text');
    const subtitleText = document.querySelector('.subtitle-text');
    const circle = document.querySelector('.subtitle-circle');

    const titles = [
        'world-class education',
        'innovative learning',
        'global opportunities',
        'bright futures',
        'excellence in teaching',
        'cutting-edge research'
    ];

    const withText = [
        'with global recognition.',
        'with international partnerships.',
        'with career-driven outcomes.',
        'with real-world impact.',
        'with top-tier faculty.',
        'with future-ready skills.'
    ];

    const subtitles = [
        'Empowering your future through globally accredited degree programs.',
        'Shaping leaders for tomorrow\'s global workforce.',
        'Unlocking potential through academic excellence.',
        'Gain recognition that goes beyond borders.',
        'Your journey to success begins here.',
        'Internationally respected degrees, locally delivered.'
    ];

    let currentIndex = 0;

    const animateTextChange3D = (element, newText) => {
        element.classList.remove('rotate-in', 'rotate-out');
        element.classList.add('rotate-out');

        setTimeout(() => {
            element.textContent = newText;
            element.classList.remove('rotate-out');
            element.classList.add('rotate-in');

            setTimeout(() => {
                element.classList.remove('rotate-in');
            }, 600);
        }, 300);
    };

    const animateCircle = () => {
        if (circle) {
            circle.style.opacity = '0';
            circle.style.transform = 'translateX(-200%) scale(0.6)';
            setTimeout(() => {
                circle.style.transform = 'translateX(-50%) scale(1)';
                circle.style.opacity = '1';
            }, 300);
        }
    };

    if (dynamicText && secondaryText && subtitleText) {
        setTimeout(() => {
            setInterval(() => {
                currentIndex = (currentIndex + 1) % titles.length;

                animateCircle();

                animateTextChange3D(dynamicText, titles[currentIndex]);
                setTimeout(() => animateTextChange3D(secondaryText, withText[currentIndex]), 150);
                setTimeout(() => animateTextChange3D(subtitleText, subtitles[currentIndex]), 300);
            }, 6000);
        }, 2000);
    }
});




// Enhanced Carousel Functionality - Completely Fixed
        class Carousel {
            constructor(element) {
                this.carousel = element;
                this.container = element.querySelector('.carousel-container');
                this.images = element.querySelectorAll('.carousel-img');
                this.prevBtn = element.querySelector('.carousel-btn.prev');
                this.nextBtn = element.querySelector('.carousel-btn.next');
                this.dotsContainer = element.querySelector('.carousel-dots');
                this.counter = element.querySelector('.carousel-counter');
                
                this.currentIndex = 0;
                this.totalImages = this.images.length;
                this.autoSlideInterval = null;
                this.isTransitioning = false;
                
                if (this.totalImages === 0) return;
                
                this.init();
            }
            
            init() {
                this.createDots();
                this.updateCounter();
                this.bindEvents();
                this.startAutoSlide();
                this.updateCarousel();
            }
            
            createDots() {
                if (!this.dotsContainer) return;
                
                this.dotsContainer.innerHTML = '';
                for (let i = 0; i < this.totalImages; i++) {
                    const dot = document.createElement('span');
                    dot.className = 'dot';
                    if (i === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => this.goToSlide(i));
                    this.dotsContainer.appendChild(dot);
                }
                this.dots = this.dotsContainer.querySelectorAll('.dot');
            }
            
            updateCounter() {
                if (!this.counter) return;
                const current = this.counter.querySelector('.current');
                const total = this.counter.querySelector('.total');
                if (current) current.textContent = this.currentIndex + 1;
                if (total) total.textContent = this.totalImages;
            }
            
            updateCarousel() {
                if (this.isTransitioning) return;
                
                this.isTransitioning = true;
                
                // Update container position
                const translateX = -this.currentIndex * 100;
                this.container.style.transform = `translateX(${translateX}%)`;
                
                // Update active states
                this.images.forEach((img, index) => {
                    img.classList.toggle('active', index === this.currentIndex);
                });
                
                // Update dots
                if (this.dots) {
                    this.dots.forEach((dot, index) => {
                        dot.classList.toggle('active', index === this.currentIndex);
                    });
                }
                
                // Update counter
                this.updateCounter();
                
                // Reset transition flag after animation
                setTimeout(() => {
                    this.isTransitioning = false;
                }, 800);
            }
            
            nextSlide() {
                if (this.isTransitioning) return;
                this.currentIndex = (this.currentIndex + 1) % this.totalImages;
                this.updateCarousel();
            }
            
            prevSlide() {
                if (this.isTransitioning) return;
                this.currentIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
                this.updateCarousel();
            }
            
            goToSlide(index) {
                if (this.isTransitioning || index === this.currentIndex) return;
                this.currentIndex = index;
                this.updateCarousel();
            }
            
            startAutoSlide() {
                this.stopAutoSlide();
                this.autoSlideInterval = setInterval(() => {
                    this.nextSlide();
                }, 4000);
            }
            
            stopAutoSlide() {
                if (this.autoSlideInterval) {
                    clearInterval(this.autoSlideInterval);
                    this.autoSlideInterval = null;
                }
            }
            
            bindEvents() {
                // Button navigation
                if (this.prevBtn) {
                    this.prevBtn.addEventListener('click', () => {
                        this.prevSlide();
                        this.restartAutoSlide();
                    });
                }
                
                if (this.nextBtn) {
                    this.nextBtn.addEventListener('click', () => {
                        this.nextSlide();
                        this.restartAutoSlide();
                    });
                }
                
                // Pause on hover
                this.carousel.addEventListener('mouseenter', () => {
                    this.stopAutoSlide();
                });
                
                this.carousel.addEventListener('mouseleave', () => {
                    this.startAutoSlide();
                });
                
                // Touch support
                this.setupTouchEvents();
                
                // Keyboard support
                this.carousel.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') {
                        this.prevSlide();
                        this.restartAutoSlide();
                    } else if (e.key === 'ArrowRight') {
                        this.nextSlide();
                        this.restartAutoSlide();
                    }
                });
                
                // Make carousel focusable for keyboard navigation
                this.carousel.setAttribute('tabindex', '0');
            }
            
            setupTouchEvents() {
                let startX = 0;
                let startY = 0;
                let endX = 0;
                let endY = 0;
                
                this.carousel.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    startY = e.touches[0].clientY;
                    this.stopAutoSlide();
                }, { passive: true });
                
                this.carousel.addEventListener('touchmove', (e) => {
                    endX = e.touches[0].clientX;
                    endY = e.touches[0].clientY;
                }, { passive: true });
                
                this.carousel.addEventListener('touchend', () => {
                    const threshold = 50;
                    const diffX = startX - endX;
                    const diffY = Math.abs(startY - endY);
                    
                    // Only trigger if horizontal swipe is more significant than vertical
                    if (Math.abs(diffX) > threshold && Math.abs(diffX) > diffY) {
                        if (diffX > 0) {
                            this.nextSlide();
                        } else {
                            this.prevSlide();
                        }
                    }
                    
                    this.restartAutoSlide();
                }, { passive: true });
            }
            
            restartAutoSlide() {
                this.stopAutoSlide();
                setTimeout(() => {
                    this.startAutoSlide();
                }, 3000);
            }
            
            destroy() {
                this.stopAutoSlide();
                // Remove event listeners if needed
            }
        }
        
        // Initialize all carousels when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            const carousels = document.querySelectorAll('.carousel');
            const carouselInstances = [];
            
            carousels.forEach(carousel => {
                const instance = new Carousel(carousel);
                carouselInstances.push(instance);
            });
            
            // Store instances globally if needed for debugging
            window.carouselInstances = carouselInstances;
            
            console.log(`Initialized ${carouselInstances.length} carousels`);
        });
        
        // Handle page visibility change to pause/resume auto-slide
        document.addEventListener('visibilitychange', () => {
            if (window.carouselInstances) {
                window.carouselInstances.forEach(instance => {
                    if (document.hidden) {
                        instance.stopAutoSlide();
                    } else {
                        instance.startAutoSlide();
                    }
                });
            }
        });

// Fixed Stats Counter Animation
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const animateCounter = (element) => {
    // Get the target value from the element or its parent .stat-item
    let targetStr = element.getAttribute('data-count');
    let suffix = '';
    
    // If no data-count on the element, check parent .stat-item
    if (!targetStr) {
      const parentStatItem = element.closest('.stat-item');
      if (parentStatItem) {
        targetStr = parentStatItem.getAttribute('data-count');
        suffix = parentStatItem.getAttribute('data-suffix') || '';
      }
    }
    
    const target = parseInt(targetStr, 10);
    
    // Check if target is a valid number
    if (isNaN(target) || target === null || target === undefined) {
      console.error('Invalid data-count value:', targetStr, 'on element:', element);
      element.textContent = '0';
      return;
    }
    
    const duration = 2000;
    const startTime = performance.now();
    let current = 0;

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      current = Math.floor(easeOutCubic * target);
      
      // Special formatting based on the target value
      let formattedNumber;
      if (target === 2023) {
        formattedNumber = current.toString() + suffix;
      } else {
        formattedNumber = current.toLocaleString() + suffix;
      }
      
      element.textContent = formattedNumber;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Ensure final value is exact with proper suffix
        if (target === 2023) {
          element.textContent = target.toString() + suffix;
        } else {
          element.textContent = target.toLocaleString() + suffix;
        }
      }
    };
    
    requestAnimationFrame(updateCounter);
  };

  // Intersection Observer for triggering animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        animateCounter(entry.target);
      }
    });
  }, { 
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
  });

  statNumbers.forEach(stat => {
    // Validate data-count attribute exists (either on element or parent)
    let dataCount = stat.getAttribute('data-count');
    if (!dataCount) {
      const parentStatItem = stat.closest('.stat-item');
      dataCount = parentStatItem?.getAttribute('data-count');
    }
    
    if (!dataCount) {
      console.error('Missing data-count attribute on element and parent:', stat);
      stat.textContent = '0';
      return;
    }
    
    observer.observe(stat);
  });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        
        // Start counter animation when stat-item comes into view
        if (entry.target.classList.contains('stat-item')) {
          if (!entry.target.hasAttribute('data-animated')) {
            const numberElement = entry.target.querySelector('.stat-number');
            if (numberElement && !numberElement.classList.contains('animated')) {
              // Trigger the counter animation
              const event = new Event('counterTrigger');
              numberElement.dispatchEvent(event);
            }
            entry.target.setAttribute('data-animated', 'true');
          }
        }
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe elements
  document.querySelectorAll('.about-block, .stat-item').forEach(block => {
    observer.observe(block);
  });
}

// Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Calculate offset for fixed header
        const headerHeight = document.getElementById('header')?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const nav = document.querySelector('.main-nav');
        const hamburger = document.getElementById('hamburger-btn');
        if (nav && nav.classList.contains('active')) {
          nav.classList.remove('active');
          if (hamburger) hamburger.classList.remove('active');
        }
      }
    });
  });
}

// Parallax Effect for Hero Section
function initParallax() {
  const hero = document.querySelector('.hero');
  
  if (hero) {
    window.addEventListener('scroll', debounce(() => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }, 10));
  }
}

// Lazy Loading for Images
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  if (images.length > 0) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
}

// Form Validation
function initFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      });
      
      if (isValid) {
        console.log('Form is valid and ready to submit');
        // Add your form submission logic here
      }
    });
  });
}

// Typing Effect for Hero Text
function initTypingEffect() {
  const typingElement = document.querySelector('.typing-text');
  
  if (typingElement) {
    const texts = [
      'world-class education',
      'innovative learning',
      'global opportunities',
      'bright futures'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;
    
    function type() {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }
      
      let speed = isDeleting ? deleteSpeed : typeSpeed;
      
      if (!isDeleting && charIndex === currentText.length) {
        speed = pauseTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
      
      setTimeout(type, speed);
    }
    
    type();
  }
}

// Performance Monitoring
function initPerformanceMonitoring() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      if (perfData) {
        console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
      }
    }, 0);
  });
}

// Accessibility Enhancements
function initAccessibility() {
  // Skip to main content link
  const skipLink = document.createElement('a');
  skipLink.className = 'skip-link';
  skipLink.href = '#main';
  skipLink.textContent = 'Skip to main content';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 1000;
    transition: top 0.3s;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add ARIA labels to interactive elements
  document.querySelectorAll('.carousel-btn').forEach((btn) => {
    btn.setAttribute('aria-label', btn.classList.contains('prev') ? 'Previous image' : 'Next image');
  });
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Error Handling
window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.error);
});

// Resize handler for responsiveness
window.addEventListener('resize', debounce(() => {
  // Recalculate carousel positions if needed
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => {
    const container = carousel.querySelector('.carousel-container');
    if (container) {
      const currentTransform = container.style.transform;
      container.style.transform = 'none';
      container.offsetHeight; // Trigger reflow
      container.style.transform = currentTransform;
    }
  });
}, 250));

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Export functions for external use if needed
window.CinecWebsite = {
  initCarousels,
  initDynamicText,
  initStatsCounter,
  initTypingEffect,
  initScrollAnimations
};