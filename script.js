// BeanQuest Case Study - Interactions

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initSmoothScroll();
    initNavScrollEffects();
    initActiveSection();
    initMobileMenu();
});

// Fade in elements on scroll
function initScrollAnimations() {
    const elements = document.querySelectorAll(
        '.split-layout, .center-content, .features-grid, .prototype-showcase, ' +
        '.iteration-summary, .learnings, .stat-card, .feature-card, .result-card, ' +
        '.research-grid, .user-traits'
    );

    elements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => observer.observe(el));
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('.nav').offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Nav scroll effects: shadow and logo rotation
function initNavScrollEffects() {
    const nav = document.querySelector('.nav');
    const logo = document.querySelector('.nav-logo-icon');

    if (!nav || !logo) return;

    let ticking = false;

    function updateNav() {
        // Add shadow when scrolled
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Rotate logo based on scroll position
        const rotation = window.scrollY * 0.15;
        logo.style.transform = `rotate(${rotation}deg)`;

        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNav);
            ticking = true;
        }
    }, { passive: true });

    // Initial check
    updateNav();
}

// Track active section for nav highlighting
function initActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                // Remove active from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active to matching link
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-20% 0px -60% 0px'
    });

    sections.forEach(section => observer.observe(section));
}

// Mobile menu toggle
function initMobileMenu() {
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelectorAll('.nav-link');

    if (!nav || !toggle) return;

    toggle.addEventListener('click', function() {
        nav.classList.toggle('nav-open');
        document.body.style.overflow = nav.classList.contains('nav-open') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('nav-open');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    nav.addEventListener('click', function(e) {
        if (e.target === nav && nav.classList.contains('nav-open')) {
            nav.classList.remove('nav-open');
            document.body.style.overflow = '';
        }
    });
}
