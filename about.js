// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = navMenu.classList.contains('active');
            
            if (isActive) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            } else {
                navMenu.classList.add('active');
                navToggle.classList.add('active');
                document.body.classList.add('nav-open');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }

    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.goal-card, .vm-card, .service-item, .floating-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Counter animation for hero stats
    const counters = document.querySelectorAll('.stat-number');
    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = counter.textContent.replace(/\d+/, target);
                clearInterval(timer);
            } else {
                counter.textContent = counter.textContent.replace(/\d+/, Math.floor(current));
            }
        }, 20);
    };

    // Trigger counter animation when hero section is visible
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background img');
        
        if (heroBackground) {
            const speed = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${speed}px)`;
        }
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});

// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }

    .goal-card,
    .vm-card,
    .service-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }

    .goal-card.animate-in,
    .vm-card.animate-in,
    .service-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .floating-card {
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.8s ease;
    }

    .floating-card.animate-in {
        opacity: 1;
        transform: scale(1);
    }

    body:not(.loaded) {
        overflow: hidden;
    }

    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--white);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    body:not(.loaded)::after {
        content: '';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        border: 3px solid var(--primary-light);
        border-top: 3px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 10000;
    }

    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }

    /* Mobile Navigation Styles */
    @media (max-width: 768px) {
        body.nav-open {
            overflow: hidden;
        }

        .nav-menu {
            display: none;
            position: fixed;
            top: 0;
            right: -100%;
            width: 100%;
            height: 100vh;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 251, 0.98) 100%);
            backdrop-filter: blur(25px);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2rem 0;
            transition: right 0.3s ease-in-out;
            z-index: 1001;
            border-top: 1px solid rgba(79, 195, 247, 0.1);
            overflow-y: auto;
            padding-top: 100px;
        }

        .nav-menu.active {
            display: flex;
            right: 0;
            animation: slideInDown 0.4s ease-out;
        }

        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .nav-menu li {
            margin: 1rem 0;
        }

        .nav-menu a {
            width: calc(100% - 2rem);
            text-align: center;
            padding: 1.2rem 1.5rem;
            border-radius: 12px;
            margin: 0.1rem 1rem;
            font-weight: 600;
            font-size: 1.1rem;
            color: var(--text-dark);
            background: rgba(255, 255, 255, 0.7);
            border: 1px solid rgba(79, 195, 247, 0.1);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 50px;
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
        }

        .nav-menu a:hover {
            background: linear-gradient(135deg, rgba(79, 195, 247, 0.15) 0%, rgba(129, 212, 250, 0.1) 100%);
            color: var(--primary-color);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(79, 195, 247, 0.2);
            border-color: rgba(79, 195, 247, 0.3);
        }

        .nav-toggle.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }

        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }

        .nav-toggle.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(style);
