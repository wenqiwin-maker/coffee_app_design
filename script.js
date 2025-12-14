// BeanQuest Case Study - Simple Animations

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initSmoothScroll();
});

// Fade in elements on scroll
function initScrollAnimations() {
    const elements = document.querySelectorAll(
        '.split-layout, .center-content, .features-grid, .prototype-showcase, ' +
        '.iteration-summary, .learnings, .stat-card, .feature-card, .result-card'
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
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}
