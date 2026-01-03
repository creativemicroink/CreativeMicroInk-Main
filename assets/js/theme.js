/**
 * CreativeMicroInk Theme JavaScript
 * 
 * @package CreativeMicroInk
 * @version 1.0.0
 */

(function() {
    'use strict';

    // Wait for DOM to be loaded
    document.addEventListener('DOMContentLoaded', function() {
        initTheme();
    });

    /**
     * Initialize theme functionality
     */
    function initTheme() {
        initSmoothScrolling();
        initMobileMenu();
        initGalleryLightbox();
        initFormValidation();
        initScrollAnimations();
        initAccessibility();
    }

    /**
     * Smooth scrolling for anchor links
     */
    function initSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').slice(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Mobile menu functionality
     */
    function initMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mainNavigation = document.querySelector('.main-navigation');
        
        if (mobileMenuToggle && mainNavigation) {
            mobileMenuToggle.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                this.setAttribute('aria-expanded', !isExpanded);
                mainNavigation.classList.toggle('is-open');
                document.body.classList.toggle('menu-open');
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!mainNavigation.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    mainNavigation.classList.remove('is-open');
                    document.body.classList.remove('menu-open');
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && mainNavigation.classList.contains('is-open')) {
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    mainNavigation.classList.remove('is-open');
                    document.body.classList.remove('menu-open');
                    mobileMenuToggle.focus();
                }
            });
        }
    }

    /**
     * Simple gallery lightbox functionality
     */
    function initGalleryLightbox() {
        const galleryImages = document.querySelectorAll('.gallery-item img, .wp-block-gallery img');
        
        galleryImages.forEach(function(image) {
            image.addEventListener('click', function(e) {
                e.preventDefault();
                openLightbox(this.src, this.alt);
            });
            
            // Make images keyboard accessible
            image.setAttribute('tabindex', '0');
            image.setAttribute('role', 'button');
            image.setAttribute('aria-label', 'View full size image: ' + image.alt);
            
            image.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(this.src, this.alt);
                }
            });
        });
    }

    /**
     * Open lightbox modal
     */
    function openLightbox(imageSrc, imageAlt) {
        // Create lightbox if it doesn't exist
        let lightbox = document.querySelector('.lightbox');
        
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-backdrop">
                    <div class="lightbox-container">
                        <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
                        <img class="lightbox-image" src="" alt="">
                    </div>
                </div>
            `;
            document.body.appendChild(lightbox);
            
            // Add lightbox styles
            const lightboxStyles = document.createElement('style');
            lightboxStyles.textContent = `
                .lightbox {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 9999;
                    display: none;
                }
                .lightbox-backdrop {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                }
                .lightbox-container {
                    position: relative;
                    max-width: 90vw;
                    max-height: 90vh;
                }
                .lightbox-image {
                    max-width: 100%;
                    max-height: 90vh;
                    border-radius: 8px;
                }
                .lightbox-close {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    padding: 0.5rem;
                    line-height: 1;
                }
                .lightbox-close:hover {
                    opacity: 0.7;
                }
                .lightbox.is-open {
                    display: block;
                }
            `;
            document.head.appendChild(lightboxStyles);
        }
        
        // Set image source and show lightbox
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const lightboxClose = lightbox.querySelector('.lightbox-close');
        
        lightboxImage.src = imageSrc;
        lightboxImage.alt = imageAlt;
        lightbox.classList.add('is-open');
        document.body.classList.add('lightbox-open');
        
        // Focus management
        lightboxClose.focus();
        
        // Close lightbox functionality
        function closeLightbox() {
            lightbox.classList.remove('is-open');
            document.body.classList.remove('lightbox-open');
        }
        
        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox-backdrop').addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });
        
        // Close on escape
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
                closeLightbox();
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    }

    /**
     * Form validation for contact and booking forms
     */
    function initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(function(form) {
            form.addEventListener('submit', function(e) {
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(function(field) {
                    if (!field.value.trim()) {
                        isValid = false;
                        addFieldError(field, 'This field is required');
                    } else {
                        removeFieldError(field);
                        
                        // Email validation
                        if (field.type === 'email' && !isValidEmail(field.value)) {
                            isValid = false;
                            addFieldError(field, 'Please enter a valid email address');
                        }
                        
                        // Phone validation
                        if (field.type === 'tel' && !isValidPhone(field.value)) {
                            isValid = false;
                            addFieldError(field, 'Please enter a valid phone number');
                        }
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                    const firstError = form.querySelector('.field-error');
                    if (firstError) {
                        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        firstError.focus();
                    }
                }
            });
        });
    }

    /**
     * Add error message to form field
     */
    function addFieldError(field, message) {
        removeFieldError(field);
        
        field.classList.add('field-error');
        field.setAttribute('aria-invalid', 'true');
        
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.setAttribute('role', 'alert');
        
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }

    /**
     * Remove error message from form field
     */
    function removeFieldError(field) {
        field.classList.remove('field-error');
        field.removeAttribute('aria-invalid');
        
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    /**
     * Email validation
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Phone validation
     */
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    /**
     * Scroll animations using Intersection Observer
     */
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .gallery-item');
        
        if (animatedElements.length === 0) return;
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(function(element) {
            observer.observe(element);
        });
        
        // Add CSS for animations
        const animationStyles = document.createElement('style');
        animationStyles.textContent = `
            .service-card,
            .testimonial-card,
            .gallery-item {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            .service-card.animate-in,
            .testimonial-card.animate-in,
            .gallery-item.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(animationStyles);
    }

    /**
     * Accessibility improvements
     */
    function initAccessibility() {
        // Skip to content link
        if (!document.querySelector('.skip-link')) {
            const skipLink = document.createElement('a');
            skipLink.href = '#primary';
            skipLink.textContent = 'Skip to content';
            skipLink.className = 'skip-link screen-reader-text';
            document.body.insertBefore(skipLink, document.body.firstChild);
            
            // Add skip link styles
            const skipLinkStyles = document.createElement('style');
            skipLinkStyles.textContent = `
                .skip-link {
                    position: absolute;
                    left: -9999px;
                    top: 6px;
                    z-index: 999999;
                    padding: 8px 16px;
                    background: var(--color-text-dark, #2D2D2D);
                    color: var(--color-white, #FFFFFF);
                    text-decoration: none;
                    border-radius: 4px;
                }
                .skip-link:focus {
                    left: 6px;
                }
            `;
            document.head.appendChild(skipLinkStyles);
        }
        
        // Improve focus visibility
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('user-is-tabbing');
            }
        });
        
        document.addEventListener('mousedown', function() {
            document.body.classList.remove('user-is-tabbing');
        });
    }

    /**
     * Utility function to debounce events
     */
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            
            if (callNow) func.apply(context, args);
        };
    }

    /**
     * Lazy loading images
     */
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(function(img) {
                imageObserver.observe(img);
            });
        }
    }

})();