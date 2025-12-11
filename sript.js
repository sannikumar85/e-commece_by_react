// Loading Screen
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Button Animation
function animateButton(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'translateY(-5px) scale(1.05)';
    }, 100);
    setTimeout(() => {
        button.style.transform = '';
    }, 300);
}

// Add to Cart with Toast Notification
let cart = [];

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    showToast(`${productName} added to cart! - $${price}`);
}

// Toast Notification System
function showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i class="fa-solid fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add styles dynamically
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: linear-gradient(135deg, #2d3436, #000);
        color: white;
        padding: 15px 30px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.95rem;
        font-family: 'Poppins', sans-serif;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    // Remove toast
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 3000);
}

// Search Bar Placeholder Animation
const searchBar = document.getElementById('search-bar');
const placeholders = ['Search for products...', 'Find your style...', 'Discover new trends...', 'Tank tops, hoodies...'];
let placeholderIndex = 0;

function animatePlaceholder() {
    searchBar.style.opacity = '0.5';
    setTimeout(() => {
        searchBar.placeholder = placeholders[placeholderIndex];
        searchBar.style.opacity = '1';
        placeholderIndex = (placeholderIndex + 1) % placeholders.length;
    }, 200);
}

setInterval(animatePlaceholder, 3000);

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animations to product cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.border');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animate highlights
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach(highlight => {
        highlight.style.opacity = '0';
        highlight.style.transform = 'translateY(30px)';
        highlight.style.transition = 'all 0.6s ease';
        observer.observe(highlight);
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Product Card Hover Sound Effect (Optional visual feedback)
const productCards = document.querySelectorAll('.border');
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
});

// Parallax effect on hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.conatainer');
    const scrolled = window.scrollY;
    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// ========================================
// COUNTDOWN TIMER
// ========================================
function updateCountdown() {
    // Set the sale end date (7 days from now)
    const saleEndDate = new Date();
    saleEndDate.setDate(saleEndDate.getDate() + 7);
    saleEndDate.setHours(23, 59, 59, 999);
    
    const now = new Date().getTime();
    const distance = saleEndDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Initialize countdown
updateCountdown();
setInterval(updateCountdown, 1000);

// ========================================
// NEWSLETTER SUBSCRIPTION
// ========================================
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    
    // Show success toast
    showToast(`🎉 Welcome! ${email} has been subscribed successfully!`);
    
    // Clear input
    document.getElementById('newsletter-email').value = '';
    
    // Animate the button
    const btn = event.target.querySelector('button');
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Subscribed!';
    btn.style.background = 'linear-gradient(135deg, #00b894, #00cec9)';
    
    setTimeout(() => {
        btn.innerHTML = 'Subscribe <i class="fa-solid fa-paper-plane"></i>';
        btn.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a24)';
    }, 3000);
}

// ========================================
// CATEGORY FILTER
// ========================================
function filterCategory(category) {
    showToast(`Exploring ${category.charAt(0).toUpperCase() + category.slice(1)} collection...`);
    // Scroll to products section
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// ========================================
// ENHANCED ANIMATIONS
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Animate feature boxes
    const featureBoxes = document.querySelectorAll('.feature-box');
    featureBoxes.forEach((box, index) => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(30px)';
        box.style.transition = `all 0.6s ease ${index * 0.15}s`;
        observer.observe(box);
    });
    
    // Animate category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-50px)';
        card.style.transition = `all 0.8s ease ${index * 0.2}s`;
        observer.observe(card);
    });
    
    // Animate testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        card.style.transition = `all 0.6s ease ${index * 0.15}s`;
        observer.observe(card);
    });
    
    // Animate Instagram items
    const instaItems = document.querySelectorAll('.insta-item');
    instaItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });
});

// ========================================
// TYPING EFFECT FOR HERO
// ========================================
const heroTexts = ['Hot Summer!', 'Cool Winter!', 'Fresh Spring!', 'Cozy Autumn!'];
let heroTextIndex = 0;

function changeHeroText() {
    const heroSpan = document.querySelector('.top-text span');
    if (heroSpan) {
        heroSpan.style.opacity = '0';
        heroSpan.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroSpan.textContent = heroTexts[heroTextIndex];
            heroSpan.style.opacity = '1';
            heroSpan.style.transform = 'translateY(0)';
            heroTextIndex = (heroTextIndex + 1) % heroTexts.length;
        }, 500);
    }
}

// Change hero text every 4 seconds
setInterval(changeHeroText, 4000);

// ========================================
// MOUSE TRAIL EFFECT
// ========================================
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: linear-gradient(135deg, #ff6b6b, #feca57);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX - 5}px;
        top: ${e.clientY - 5}px;
        opacity: 0.7;
        transition: all 0.5s ease;
    `;
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.style.transform = 'scale(0)';
        trail.style.opacity = '0';
    }, 100);
    
    setTimeout(() => {
        trail.remove();
    }, 600);
});

console.log('%c SKG Fashion Store ', 'background: linear-gradient(135deg, #ff6b6b, #feca57); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
console.log('%c Welcome to SKG - Premium Fashion Store! ', 'color: #2d3436; font-size: 14px;');