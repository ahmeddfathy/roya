// Hero Carousel Functionality
class HeroCarousel {
  constructor() {
    this.slides = document.querySelectorAll(".carousel-slide");
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

    // Update current slide
    this.currentSlide = slideIndex;

    // Add active classes
    this.slides[this.currentSlide].classList.add("active");
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

// Improved Bootstrap Navbar Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Bootstrap Navbar Scroll Effect
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // Get navbar collapse element
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  // Handle dropdown clicks without closing navbar
  document.querySelectorAll('.dropdown-toggle').forEach(dropdownToggle => {
    dropdownToggle.addEventListener('click', function(e) {
      // Allow dropdown to function normally without closing navbar
      e.stopPropagation();
    });
  });
  
  // Only close navbar when clicking on non-dropdown nav links
  document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', function() {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });
  
  // Close navbar when clicking on dropdown items
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function() {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });
});

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
    
    /* Bootstrap Navbar Customization */
    .navbar {
        z-index: 1030;
    }
    
    .navbar-collapse {
        transition: all 0.3s ease;
    }
    
    @media (max-width: 991.98px) {
        .navbar-collapse {
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(15px);
            border-radius: 0 0 15px 15px;
            margin-top: 0.5rem;
            padding: 1rem;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
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

// EmailJS Integration for Index Page Forms
document.addEventListener('DOMContentLoaded', function() {
  try {
    if (typeof emailjs !== 'undefined') {
      emailjs.init("UeAvv9IeOGLLl8PCX");
    }
  } catch (error) {
    // EmailJS initialization failed
  }

  // Investment Form Handler - Removed as form was deleted

  // Contact Form Handler
  const contactIndexForm = document.getElementById('contactIndexForm');
  if (contactIndexForm) {
    contactIndexForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate form
      if (!validateIndexForm(this)) {
        showIndexNotification('يرجى تصحيح الأخطاء في النموذج قبل الإرسال', 'error');
        return;
      }
      
      const formData = new FormData(this);
      
      const templateParams = {
        to_name: 'فريق رؤية للبرمجة',
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        from_phone: formData.get('phone'),
        message: formData.get('message'),
        form_type: 'رسالة تواصل',
        reply_to: formData.get('email'),
        user_name: formData.get('name'),
        user_email: formData.get('email'),
        user_phone: formData.get('phone'),
        user_message: formData.get('message')
      };
      
      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
      submitBtn.disabled = true;
      
      // Check if EmailJS is available
      if (typeof emailjs === 'undefined') {
        showIndexNotification('خطأ في تحميل مكتبة الإرسال. يرجى إعادة تحميل الصفحة والمحاولة مرة أخرى.', 'error');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        return;
      }
      
      if (!emailjs) {
        showIndexNotification('EmailJS غير متاح. يرجى إعادة تحميل الصفحة.', 'error');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        return;
      }
      
      // Send email using EmailJS
      emailjs.send('service_cum9fyq', 'template_4lsf0eg', templateParams)
        .then((response) => {
          showIndexNotification('تم إرسال رسالتك بنجاح! سيتواصل معك فريقنا التقني قريباً.', 'success');
          this.reset();
        })
        .catch((error) => {
          let errorMessage = 'حدث خطأ في إرسال الرسالة. ';
          
          if (error.status === 400) {
            errorMessage += 'البيانات المدخلة غير صحيحة. يرجى التحقق من جميع الحقول.';
          } else if (error.status === 401) {
            errorMessage += 'خطأ في التوثيق. يرجى التواصل مع مطور الموقع.';
          } else if (error.status === 403) {
            errorMessage += 'غير مسموح بهذا الإجراء. يرجى التواصل معنا مباشرة.';
          } else if (error.status >= 500) {
            errorMessage += 'خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً.';
          } else {
            if (error.text) {
              errorMessage += `تفاصيل الخطأ: ${error.text}`;
            } else if (error.message) {
              errorMessage += `تفاصيل الخطأ: ${error.message}`;
            } else {
              errorMessage += 'يرجى التحقق من إعدادات EmailJS.';
            }
          }
          
          showIndexNotification(errorMessage, 'error');
        })
        .finally(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        });
    });
  }

  // Form validation function
  function validateIndexForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      const value = input.value.trim();
      
      if (!value) {
        isValid = false;
        input.style.borderColor = '#EF4444';
      } else if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          input.style.borderColor = '#EF4444';
        } else {
          input.style.borderColor = '';
        }
      } else if (input.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
          isValid = false;
          input.style.borderColor = '#EF4444';
        } else {
          input.style.borderColor = '';
        }
      } else {
        input.style.borderColor = '';
      }
    });

    return isValid;
  }

  // Notification system for index page
  function showIndexNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.index-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `index-notification notification-${type}`;
    let iconClass = 'info-circle';
    if (type === 'success') iconClass = 'check-circle';
    if (type === 'error') iconClass = 'exclamation-circle';

    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${iconClass}"></i>
        <span>${message}</span>
      </div>
      <button class="notification-close">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      hideIndexNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      hideIndexNotification(notification);
    });
  }

  function hideIndexNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }
});

// Add notification styles for index page
const indexNotificationStyle = document.createElement('style');
indexNotificationStyle.textContent = `
  .index-notification {
    position: fixed;
    top: 100px;
    right: 20px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    z-index: 10000;
    max-width: 400px;
    border-left: 4px solid var(--primary-color);
  }

  .index-notification.notification-success {
    border-left-color: #10B981;
  }

  .index-notification.notification-error {
    border-left-color: #EF4444;
  }

  .index-notification.show {
    transform: translateX(0);
  }

  .index-notification .notification-content {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    flex-grow: 1;
  }

  .index-notification .notification-content i {
    color: var(--primary-color);
    font-size: 1.2rem;
  }

  .index-notification.notification-success .notification-content i {
    color: #10B981;
  }

  .index-notification.notification-error .notification-content i {
    color: #EF4444;
  }

  .index-notification .notification-close {
    background: none;
    border: none;
    color: #6B7280;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .index-notification .notification-close:hover {
    background: #F3F4F6;
    color: #374151;
  }

  @media (max-width: 768px) {
    .index-notification {
      right: 10px;
      left: 10px;
      max-width: none;
      top: 90px;
    }
  }
`;

document.head.appendChild(indexNotificationStyle);
