/**
 * VARSHA MAKEUP ARTISTRY - PREMIUM JAVASCRIPT
 * Complete functionality with Spinner Integration
 */

// ==================== PREMIUM SPINNER FUNCTIONALITY ====================

const PremiumSpinner = {
    wrapper: null,

    init: function () {
        this.wrapper = document.getElementById('premiumSpinner');
        
        // Ensure spinner shows for exactly 2 seconds for the typing effect
        const hideSpinner = () => this.hide();
        setTimeout(hideSpinner, 2000);
    },

    show: function () {
        if (this.wrapper) {
            this.wrapper.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    },

    hide: function () {
        if (this.wrapper) {
            setTimeout(() => {
                this.wrapper.classList.add('hidden');
                document.body.style.overflow = ''; // Reset overflow
            }, 100); // Shorter transition delay for faster feel
        }
    },

    toggle: function () {
        if (this.wrapper) {
            this.wrapper.classList.toggle('hidden');
        }
    },

    updatePhrase: function (text) {
        const phrase = this.wrapper?.querySelector('.loading-phrase');
        if (phrase) {
            phrase.textContent = text;
        }
    }
};

// ==================== NAVBAR FUNCTIONALITY ====================

const NavBar = {
    navbar: null,
    navMenu: null,
    hamburger: null,
    lastScrollTop: 0,

    init: function () {
        this.navbar = document.getElementById('navbar');
        this.navMenu = document.getElementById('navMenu');
        this.hamburger = document.querySelector('.hamburger');

        if (!this.navbar) return;

        window.addEventListener('scroll', () => this.handleScroll());
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close menu when link clicked
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
    },

    handleScroll: function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        this.updateActiveLink();
    },

    updateActiveLink: function () {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                });
                document.querySelector(`.nav-menu a[href="#${sectionId}"]`)?.classList.add('active');
            }
        });
    },

    toggleMobileMenu: function () {
        if (this.navMenu && this.hamburger) {
            this.navMenu.classList.toggle('open');
            this.hamburger.classList.toggle('open');
        }
    },

    closeMobileMenu: function () {
        if (this.navMenu && this.hamburger) {
            this.navMenu.classList.remove('open');
            this.hamburger.classList.remove('open');
        }
    }
};

// ==================== BANNER FUNCTIONALITY ====================

function closeBanner() {
    const banner = document.getElementById('festiveBanner');
    if (banner) {
        banner.style.animation = 'slideUp 0.4s ease forwards';
        setTimeout(() => banner.remove(), 400);
    }
}

// ==================== POPUP FUNCTIONALITY ====================

function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.add('active');
    }
}

function closePopup() {
    const popup = document.getElementById('limitedSeatsPopup');
    if (popup) {
        popup.classList.remove('active');
    }
}

function closeExitPopup() {
    const popup = document.getElementById('exitPopup');
    if (popup) {
        popup.classList.remove('active');
    }
}

// Show exit intent popup
document.addEventListener('mouseleave', function (event) {
    if (event.clientY <= 0) {
        const exitPopup = document.getElementById('exitPopup');
        if (exitPopup && !exitPopup.classList.contains('active')) {
            openPopup('exitPopup');
        }
    }
});

// ==================== SCROLL-TO FUNCTIONALITY ====================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        NavBar.closeMobileMenu();
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ==================== BACK TO TOP BUTTON ====================

const BackToTopButton = {
    button: null,

    init: function () {
        this.button = document.getElementById('backToTop');
        if (!this.button) return;

        window.addEventListener('scroll', () => this.handleScroll());
        this.button.addEventListener('click', scrollToTop);
    },

    handleScroll: function () {
        if (window.pageYOffset > 300) {
            this.button?.classList.add('visible');
        } else {
            this.button?.classList.remove('visible');
        }
    }
};

// ==================== PORTFOLIO FILTERING ====================

const Portfolio = {
    grid: null,
    filterBtns: null,
    items: null,

    init: function () {
        this.grid = document.getElementById('portfolioGrid');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.items = document.querySelectorAll('.portfolio-item');

        if (!this.filterBtns.length) return;

        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.filterPortfolio(e));
        });
    },

    filterPortfolio: function (e) {
        const filterValue = e.target.getAttribute('data-filter');

        // Update active button
        this.filterBtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Filter items with animation
        this.items.forEach(item => {
            const category = item.getAttribute('data-category');

            if (filterValue === 'all' || category === filterValue) {
                item.classList.remove('hidden', 'fade-out');
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = '';
                    item.style.opacity = '1';
                }, 10);
            } else {
                item.classList.add('fade-out');
                setTimeout(() => {
                    item.classList.add('hidden');
                    item.classList.remove('fade-out');
                }, 300);
            }
        });
    }
};

// ==================== TESTIMONIALS SLIDER ====================

const Testimonials = {
    slider: null,
    cards: null,
    currentIndex: 0,

    init: function () {
        this.slider = document.getElementById('testimonialsSlider');
        this.cards = document.querySelectorAll('.testimonial-card');

        if (!this.cards.length) return;

        this.showSlide(0);

        // Auto-advance slides
        setInterval(() => {
            this.nextSlide();
        }, 6000);
    },

    showSlide: function (index) {
        this.cards.forEach(card => card.classList.remove('active'));

        if (index >= this.cards.length) {
            this.currentIndex = 0;
        } else if (index < 0) {
            this.currentIndex = this.cards.length - 1;
        } else {
            this.currentIndex = index;
        }

        this.cards[this.currentIndex].classList.add('active');
    },

    nextSlide: function () {
        this.showSlide(this.currentIndex + 1);
    },

    prevSlide: function () {
        this.showSlide(this.currentIndex - 1);
    }
};

function nextTestimonial() {
    Testimonials.nextSlide();
}

function prevTestimonial() {
    Testimonials.prevSlide();
}

// ==================== BOOKING FORM SUBMISSION ====================

const BookingForm = {
    form: null,

    init: function () {
        this.form = document.getElementById('bookingForm');
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    handleSubmit: function (e) {
        e.preventDefault();

        const formData = {
            fullName: document.getElementById('fullName')?.value || '',
            phone: document.getElementById('phone')?.value || '',
            email: document.getElementById('email')?.value || '',
            eventDate: document.getElementById('eventDate')?.value || '',
            serviceType: document.getElementById('serviceType')?.value || '',
            eventLocation: document.getElementById('eventLocation')?.value || '',
            timeSlot: document.getElementById('timeSlot')?.value || '',
            message: document.getElementById('message')?.value || ''
        };

        // Show spinner
        PremiumSpinner.show();
        PremiumSpinner.updatePhrase('Sending your enquiry...');

        // Simulate form processing
        setTimeout(() => {
            this.sendViaWhatsApp(formData);
        }, 800);
    },

    sendViaWhatsApp: function (data) {
        const message = `
Hello! I'm interested in booking your services.

*Personal Details:*
Name: ${data.fullName}
Phone: ${data.phone}
Email: ${data.email}

*Event Details:*
Service: ${data.serviceType}
Date: ${data.eventDate}
Location: ${data.eventLocation}
Preferred Time: ${data.timeSlot}

*Additional Details:*
${data.message}

Looking forward to hearing from you!
    `.trim();

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/919943848512?text=${encodedMessage}`;

        // Hide spinner and open WhatsApp
        PremiumSpinner.hide();
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            this.form.reset();
        }, 500);
    }
};

function openWhatsApp(type) {
    PremiumSpinner.show();
    PremiumSpinner.updatePhrase('Opening WhatsApp...');

    const messages = {
        'bridal-makeup': 'Hi Varsha, I\'m interested in your bridal makeup services. Could you provide more details?',
        'hd-makeup': 'Hi Varsha, I\'d like to know more about your HD makeup services.',
        'saree-draping': 'Hi Varsha, I\'m interested in your saree draping services.',
        'course': 'Hi Varsha, I\'m interested in enrolling in your professional makeup course. Can I get more information?',
        'special-offer': 'Hi Varsha, I saw your special offer. I\'d like to book a bridal makeup package.',
        'bridal-course': 'Hi Varsha, I\'m interested in your professional bridal makeup course.',
        'cosmetology-course': 'Hi Varsha, Tell me more about your complete cosmetology course.',
        'hd-masterclass': 'Hi Varsha, I\'m interested in your HD makeup masterclass.'
    };

    const messageText = messages[type] || 'Hi Varsha, I\'d like to know more about your services.';
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/919943848512?text=${encodedMessage}`;

    setTimeout(() => {
        PremiumSpinner.hide();
        window.open(whatsappUrl, '_blank');
    }, 600);
}

// ==================== INTERSECTION OBSERVER FOR REVEALS ====================

const RevealElements = {
    observer: null,

    init: function () {
        const options = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);

        document.querySelectorAll('.reveal').forEach(el => {
            this.observer.observe(el);
        });
    }
};

// ==================== SMOOTH SCROLLING ==================== 

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    PremiumSpinner.init();
    NavBar.init();
    BackToTopButton.init();
    Portfolio.init();
    Testimonials.init();
    BookingForm.init();
    RevealElements.init();

    console.log('✨ Varsha Makeup Artistry - Premium Site Loaded');
});

// ==================== UTILITY FUNCTIONS ====================

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    NavBar.toggleMobileMenu();
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
    NavBar.closeMobileMenu();
}

/**
 * Format phone number
 */
function formatPhoneNumber(phone) {
    return phone.replace(/\D/g, '').slice(-10);
}

/**
 * Validate email
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Get current date in YYYY-MM-DD format
 */
function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

/**
 * Set minimum date to today for event date input
 */
function setMinEventDate() {
    const eventDateInput = document.getElementById('eventDate');
    if (eventDateInput) {
        eventDateInput.min = getTodayDate();
    }
}

// Set minimum event date on load
window.addEventListener('load', setMinEventDate);

/**
 * Handle form validation
 */
function validateBookingForm() {
    const fullName = document.getElementById('fullName')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const eventDate = document.getElementById('eventDate')?.value;
    const serviceType = document.getElementById('serviceType')?.value;
    const eventLocation = document.getElementById('eventLocation')?.value.trim();

    if (!fullName || fullName.length < 3) {
        alert('Please enter a valid full name (at least 3 characters)');
        return false;
    }

    if (!phone || phone.length < 10) {
        alert('Please enter a valid phone number');
        return false;
    }

    if (!eventDate) {
        alert('Please select an event date');
        return false;
    }

    if (!serviceType) {
        alert('Please select a service type');
        return false;
    }

    if (!eventLocation || eventLocation.length < 3) {
        alert('Please enter event location');
        return false;
    }

    return true;
}

/**
 * Log page performance metrics
 */
function logPerformanceMetrics() {
    setTimeout(() => {
        if (window.performance) {
            const navEntries = performance.getEntriesByType('navigation');
            if (navEntries.length > 0) {
                console.log(`📊 Page Load Time: ${Math.round(navEntries[0].loadEventEnd)}ms`);
            } else if (window.performance.timing) {
                const timing = window.performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                if (loadTime > 0) console.log(`📊 Page Load Time: ${loadTime}ms`);
            }
        }
    }, 0);
}

window.addEventListener('load', logPerformanceMetrics);

/**
 * Handle images lazy loading
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}