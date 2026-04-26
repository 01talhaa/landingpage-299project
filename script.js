/* ============================================
   LEXBD LANDING PAGE - JAVASCRIPT
   ============================================ */

// ============================================
// STICKY NAVBAR
// ============================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ============================================
// STATS COUNTER ANIMATION
// ============================================

const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
};

const statsSection = document.getElementById('stats');
let statsAnimated = false;

const observeStats = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            document.querySelectorAll('.stat-number[data-target]').forEach(stat => {
                const target = parseInt(stat.dataset.target);
                animateCounter(stat, target);
            });
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    observeStats.observe(statsSection);
}

// ============================================
// SCROLL ANIMATIONS - FADE IN & SLIDE UP
// ============================================

const observeElements = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Observe section headers
document.querySelectorAll('.section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observeElements.observe(el);
});

// ============================================
// TAB SWITCHING
// ============================================

const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.dataset.tab;
        
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Set first tab as active on load
if (tabButtons.length > 0) {
    tabButtons[0].classList.add('active');
    if (tabPanes.length > 0) {
        tabPanes[0].classList.add('active');
    }
}

// ============================================
// SUMMARY TOGGLE (Structured/Brief)
// ============================================

const toggleButtons = document.querySelectorAll('.toggle-btn');

toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        const toggleType = button.dataset.toggle;
        
        // Remove active from all toggle buttons
        toggleButtons.forEach(btn => btn.classList.remove('active'));
        
        // Hide all summary outputs
        document.querySelectorAll('.summary-output').forEach(output => {
            output.style.display = 'none';
        });
        
        // Add active to clicked button
        button.classList.add('active');
        
        // Show corresponding output
        if (toggleType === 'structured') {
            document.querySelector('.structured-summary').style.display = 'block';
        } else if (toggleType === 'brief') {
            document.querySelector('.brief-summary').style.display = 'block';
        }
    });
});

// Set first toggle as active
if (toggleButtons.length > 0) {
    toggleButtons[0].classList.add('active');
}

// ============================================
// COPY TO CLIPBOARD BUTTONS
// ============================================

const copyButtons = document.querySelectorAll('.copy-btn');

copyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const citationText = button.previousElementSibling.textContent;
        
        navigator.clipboard.writeText(citationText).then(() => {
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Copy failed:', err);
        });
    });
});

// ============================================
// FAQ ACCORDION
// ============================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('open');
            }
        });
        
        // Toggle current item
        item.classList.toggle('open');
    });
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

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

// ============================================
// INTERSECTION OBSERVER FOR STAGGER ANIMATIONS
// ============================================

const observeStagger = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll('.feature-card, .category-card, .tech-card');
            children.forEach((child, index) => {
                child.style.opacity = '0';
                child.style.transform = 'translateY(20px)';
                child.style.animation = `slideInUp 0.6s ease-out ${index * 0.1}s forwards`;
            });
            observeStagger.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.features-grid, .categories-grid, .tech-grid').forEach(grid => {
    observeStagger.observe(grid);
});

// ============================================
// BUTTON CLICK HANDLERS (for future integration)
// ============================================

document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', (e) => {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
        ripple.style.animation = 'rippleEffect 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
    
    // Tab key for FAQ navigation
    if (e.key === 'Tab') {
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('keydown', (evt) => {
                if (evt.key === 'Enter' || evt.key === ' ') {
                    evt.preventDefault();
                    question.click();
                }
            });
        });
    }
});

// ============================================
// PRELOAD IMAGES & OPTIMIZE PERFORMANCE
// ============================================

// Lazy load images if any (for future content)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// ACCESSIBILITY - FOCUS MANAGEMENT
// ============================================

// Add focus visible styles
const focusVisibleStyle = document.createElement('style');
focusVisibleStyle.textContent = `
    *:focus-visible {
        outline: 2px solid #06b6d4;
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusVisibleStyle);

// ============================================
// PERFORMANCE - DEBOUNCE SCROLL EVENTS
// ============================================

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

const debouncedScroll = debounce(() => {
    // Handle scroll events
}, 100);

window.addEventListener('scroll', debouncedScroll, { passive: true });

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ============================================
// DEMO CHAT ANIMATION
// ============================================

const chatMessages = document.querySelector('.chat-messages');
if (chatMessages) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation to chat messages when they come into view
                const messages = entry.target.querySelectorAll('.message');
                messages.forEach((msg, index) => {
                    msg.style.animation = `fadeIn 0.5s ease-out ${index * 0.2}s forwards`;
                    msg.style.opacity = '0';
                });
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(chatMessages);
}

// ============================================
// RESPONSIVE MOBILE OPTIMIZATION
// ============================================

// Handle touch events for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swiped left - could close mobile menu
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

// ============================================
// DARK MODE (Already implemented via CSS, but can add toggle if needed)
// ============================================

// The page is dark by default. If you want to add a dark/light mode toggle:
// function toggleDarkMode() {
//     document.body.classList.toggle('light-mode');
//     localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
// }

// // Check saved preference
// if (localStorage.getItem('theme') === 'light') {
//     document.body.classList.add('light-mode');
// }

// ============================================
// ANALYTICS (Placeholder for future integration)
// ============================================

// Track clicks on main CTAs
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', () => {
        // Track event (e.g., with Google Analytics)
        console.log('Primary CTA clicked');
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cta_click', {
                'button_type': 'primary'
            });
        }
    });
});

// ============================================
// INITIALIZATION
// ============================================

console.log('LexBD Landing Page Loaded Successfully ✓');
