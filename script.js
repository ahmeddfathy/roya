// Hero Carousel Functionality
class HeroCarousel {
  constructor() {
    this.slides = document.querySelectorAll(".carousel-slide");
    this.indicators = document.querySelectorAll(".indicator");
    this.prevBtn = document.querySelector(".prev-btn");
    this.nextBtn = document.querySelector(".next-btn");
    this.currentSlide = 0;
    this.slideInterval = null;

    this.init();
  }

  init() {
    // Add event listeners
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    // Add indicator listeners
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => this.goToSlide(index));
    });

    // Auto-play carousel
    this.startAutoPlay();

    // Pause on hover
    const carousel = document.querySelector(".hero-carousel");
    carousel.addEventListener("mouseenter", () => this.stopAutoPlay());
    carousel.addEventListener("mouseleave", () => this.startAutoPlay());

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.nextSlide();
      if (e.key === "ArrowRight") this.prevSlide();
    });
  }

  goToSlide(slideIndex) {
    // Remove active classes
    this.slides[this.currentSlide].classList.remove("active");
    this.indicators[this.currentSlide].classList.remove("active");

    // Update current slide
    this.currentSlide = slideIndex;

    // Add active classes
    this.slides[this.currentSlide].classList.add("active");
    this.indicators[this.currentSlide].classList.add("active");
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevIndex);
  }

  startAutoPlay() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoPlay() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new HeroCarousel();
});

// Smooth scrolling for navigation links with header offset
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 2px 20px rgba(79, 195, 247, 0.1)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "none";
  }
});

// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  
  const isActive = navMenu.classList.contains("active");
  
  if (isActive) {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
    document.body.classList.remove("nav-open");
  } else {
    navMenu.classList.add("active");
    navToggle.classList.add("active");
    document.body.classList.add("nav-open");
  }

});

// Close mobile menu when clicking on links
const navLinks = document.querySelectorAll(".nav-menu a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
    document.body.classList.remove("nav-open");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
    document.body.classList.remove("nav-open");
  }
});

// Close mobile menu on window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
    document.body.classList.remove("nav-open");
    // Reset dropdown states
    document.querySelectorAll(".dropdown").forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
    document.querySelectorAll(".dropdown-submenu").forEach((submenu) => {
      submenu.classList.remove("active");
    });
  }
});

// Mobile dropdown functionality
function initMobileDropdowns() {
  const dropdowns = document.querySelectorAll(".dropdown");
  const submenus = document.querySelectorAll(".dropdown-submenu");

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    if (toggle) {
      toggle.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          dropdown.classList.toggle("active");

          // Close other dropdowns
          dropdowns.forEach((otherDropdown) => {
            if (otherDropdown !== dropdown) {
              otherDropdown.classList.remove("active");
            }
          });
        }
      });
    }
  });

  submenus.forEach((submenu) => {
    const toggle = submenu.querySelector(".submenu-toggle");
    if (toggle) {
      toggle.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          submenu.classList.toggle("active");

          // Close other submenus
          submenus.forEach((otherSubmenu) => {
            if (otherSubmenu !== submenu) {
              otherSubmenu.classList.remove("active");
            }
          });
        }
      });
    }
  });
}

// Initialize mobile dropdowns
initMobileDropdowns();

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };

    updateCounter();
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");

      // Trigger counter animation when stats section is visible
      if (entry.target.classList.contains("stats")) {
        animateCounters();
      }
    }
  });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Add animation classes to CSS
const style = document.createElement("style");
style.textContent = `
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    section.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .service-card, .sector-card, .stat-item {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .animate .service-card, .animate .sector-card, .animate .stat-item {
        opacity: 1;
        transform: translateY(0);
    }
    
    .animate .service-card:nth-child(1) { transition-delay: 0.1s; }
    .animate .service-card:nth-child(2) { transition-delay: 0.2s; }
    .animate .service-card:nth-child(3) { transition-delay: 0.3s; }
    .animate .service-card:nth-child(4) { transition-delay: 0.4s; }
    .animate .service-card:nth-child(5) { transition-delay: 0.5s; }
    .animate .service-card:nth-child(6) { transition-delay: 0.6s; }
    
    .animate .sector-card:nth-child(1) { transition-delay: 0.1s; }
    .animate .sector-card:nth-child(2) { transition-delay: 0.2s; }
    .animate .sector-card:nth-child(3) { transition-delay: 0.3s; }
    .animate .sector-card:nth-child(4) { transition-delay: 0.4s; }
    .animate .sector-card:nth-child(5) { transition-delay: 0.5s; }
    .animate .sector-card:nth-child(6) { transition-delay: 0.6s; }
    
    .animate .stat-item:nth-child(1) { transition-delay: 0.1s; }
    .animate .stat-item:nth-child(2) { transition-delay: 0.2s; }
    .animate .stat-item:nth-child(3) { transition-delay: 0.3s; }
    .animate .stat-item:nth-child(4) { transition-delay: 0.4s; }
    
    /* Mobile Navigation Styles */
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            right: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: right 0.3s ease;
        }
        
        .nav-menu.active {
            right: 0;
        }
        
        .nav-menu li {
            margin: 1rem 0;
        }
        
        .nav-menu a {
            font-size: 1.2rem;
            padding: 1rem;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
    
    @media (max-width: 480px) {
        .nav-menu {
            top: 60px;
            height: calc(100vh - 60px);
        }
    }
    
    @media (max-width: 360px) {
        .nav-menu {
            top: 55px;
            height: calc(100vh - 55px);
        }
    }
    
    /* Floating Animation */
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .hero-image {
        animation: float 3s ease-in-out infinite;
    }
    
    /* Gradient Text Animation */
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    .highlight {
        background: linear-gradient(45deg, #4FC3F7, #29B6F6, #81D4FA, #4FC3F7);
        background-size: 300% 300%;
        animation: gradientShift 3s ease infinite;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
`;

document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");

  if (hero && heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
  }
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Add hover effects for cards
document.querySelectorAll(".service-card, .sector-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Add click ripple effect for buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple effect styles
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

document.head.appendChild(rippleStyle);

