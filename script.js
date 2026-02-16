// ========== Hamburger Menu Toggle ==========
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    const navLinks = nav ? nav.querySelectorAll('a') : [];
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });
});

// ========== Smooth Scroll Navigation with Fade Effect ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        
        if (target && href !== '#') {
            e.preventDefault();
            
            // Add subtle fade effect
            document.body.style.transition = 'opacity 0.15s ease';
            document.body.style.opacity = '0.95';
            
            setTimeout(() => {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                document.body.style.opacity = '1';
            }, 100);
        }
    });
});

// ========== Intersection Observer for Scroll Animations ==========
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all scroll-animate elements
    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Trigger fade-in animation on initial load
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach(el => {
        void el.offsetWidth;
    });
}

// Initialize scroll animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}

// ========== Contact Form Validation & Submission ==========
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const formMessage = document.getElementById('formMessage');

            formMessage.textContent = '';
            formMessage.className = 'form-message';

            if (!name) {
                showFormError('Please enter your name', formMessage);
                return;
            }

            if (!isValidEmail(email)) {
                showFormError('Please enter a valid email address', formMessage);
                return;
            }

            if (!message || message.length < 10) {
                showFormError('Message must be at least 10 characters long', formMessage);
                return;
            }

            submitForm(name, email, message, formMessage);
        });
    }
});

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showFormError(message, element) {
    element.textContent = message;
    element.className = 'form-message error';
}

// Show success message
function showFormSuccess(message, element) {
    element.textContent = message;
    element.className = 'form-message success';
}

// Submit form
function submitForm(name, email, message, formMessage) {
    const submitBtn = document.querySelector('.contact-form button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Create FormData object for file upload support (if needed in future)
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    // Send to PHP endpoint
    fetch('api/send_message.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showFormSuccess(data.message, formMessage);
            document.getElementById('contactForm').reset();
            
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 5000);
        } else {
            showFormError(data.error || 'Failed to send message. Please try again.', formMessage);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showFormError('Network error. Please try again or email directly to isholegg@gmail.com', formMessage);
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    });
}

// ========== Track user scrolling for header animation ==========
let pageScrollY = 0;
const headerElement = document.querySelector('.header');

if (headerElement) {
    window.addEventListener('scroll', () => {
        pageScrollY = window.scrollY;
        
        if (pageScrollY > 10) {
            headerElement.style.boxShadow = '0 5px 20px rgba(88, 166, 255, 0.1)';
        } else {
            headerElement.style.boxShadow = 'none';
        }
    }, { passive: true });
}
