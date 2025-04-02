//import { gsap } from 'gsap';
//import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import config from './config.js';
import translations from './translations.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    handleConnection();
    // Initialize custom cursor
    initCursor();
    
    // Initialize navbar
    initNavbar();
    
    // Initialize skill bars animation
    initSkillBars();
    
    // Initialize portfolio filters
    initPortfolioFilters();
    
    // Initialize animations
    initAnimations();
    
    // Initialize form validation
    initContactForm();
});

function handleConnection() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isSlowConnection = connection ? (connection.effectiveType === 'slow-2g' || 
                                         connection.effectiveType === '2g' || 
                                         connection.saveData === true) : false;
    
    if (isSlowConnection || window.matchMedia("(max-width: 768px)").matches) {
        // Desativar animações pesadas
        config.enableParallaxEffects = false;
        config.animations.speedFast = 0;
        config.animations.speedMedium = 0;
        config.animations.speedSlow = 0;
        
        // Desativar vídeo de fundo
        const heroVideo = document.querySelector('.hero-video');
        if (heroVideo) {
            heroVideo.pause();
            heroVideo.remove();
        }
    }
}

function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!config.enableCustomCursor) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
        return;
    }
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        
        gsap.to(follower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3
        });
    });

    // Change cursor on hover over links and buttons
    const links = document.querySelectorAll('a, button, .service-card, .portfolio-item');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.borderColor = 'rgba(0,195,255,0)';
            cursor.style.mixBlendMode = 'normal';
            cursor.style.background = 'rgba(0,136,255,0.5)';
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.borderColor = 'rgba(0,195,255,1)';
            cursor.style.mixBlendMode = 'difference';
            cursor.style.background = 'var(--primary-blue)';
        });
    });
}

function initNavbar() {
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll('nav ul li a');
    const navList = document.querySelector('nav ul'); // Corrigido para navList
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }

    // Handle navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Impede a propagação do evento
        navList.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Alterna entre ícone de menu e X
        const icon = menuToggle.querySelector('i');
        if (navList.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
            document.body.style.overflow = '';
        }
    });
    
    // Fecha o menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            document.body.style.overflow = '';
        });
    });
    
    // Fecha o menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!navList.contains(e.target) && !menuToggle.contains(e.target)) {
            navList.classList.remove('active');
            menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            document.body.style.overflow = '';
        }
    });
    
    // Fecha o menu ao rolar
    window.addEventListener('scroll', () => {
        if (navList.classList.contains('active')) {
            navList.classList.remove('active');
            menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            document.body.style.overflow = '';
        }
    });
}

function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                
                // Animate the progress bar
                gsap.to(progressBar, {
                    width: width,
                    duration: 1.5,
                    ease: "power2.out"
                });
                
                // Unobserve after animation
                observer.unobserve(progressBar);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get filter value
            const filterValue = btn.getAttribute('data-filter');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    gsap.to(item, { scale: 1, opacity: 1, duration: 0.4 });
                } else if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    gsap.to(item, { scale: 1, opacity: 1, duration: 0.4 });
                } else {
                    gsap.to(item, { 
                        scale: 0.8, 
                        opacity: 0, 
                        duration: 0.4,
                        onComplete: () => {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

function initAnimations() {

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) {

        // Service cards animation
            gsap.from('.service-card', {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.services',
                start: 'top 70%'
            }
        });

        // Portfolio items animation
        gsap.from('.portfolio-item', {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.portfolio-grid',
                start: 'top 70%'
            }
        });
        
        // About section animation
        gsap.from('.about-image', {
            x: -100,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.about-content',
                start: 'top 70%'
            }
        });
        
        gsap.from('.about-text', {
            x: 100,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.about-content',
                start: 'top 70%'
            }
        });
    }

    // Contact section animation
    gsap.from('.contact-info, .contact-form', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        scrollTrigger: {
            trigger: '.contact-container',
            start: 'top 70%'
        }
    });
    if (!isMobile) {
        // Animate background shapes
        gsap.to('.shape-1', {
            rotation: 360,
            duration: 30,
            repeat: -1,
            ease: "none"
        });
        
        gsap.to('.shape-3', {
            rotation: -360,
            duration: 40,
            repeat: -1,
            ease: "none"
        });
    }
}    

function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        if (name.value.trim() === '') {
            showFormError(name, translations.formErrors.requiredName);
            return;
        }
        
        if (email.value.trim() === '') {
            showFormError(email, translations.formErrors.requiredEmail);
            return;
        }
        
        if (!isValidEmail(email.value)) {
            showFormError(email, translations.formErrors.invalidEmail);
            return;
        }
        
        if (message.value.trim() === '') {
            showFormError(message, translations.formErrors.requiredMessage);
            return;
        }
        
        // Display success message
        form.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <h3>${translations.formErrors.success}</h3>
                <p>${translations.formErrors.thankYou}</p>
            </div>
        `;
        
        // In a real application, you would send the form data to a server here
    });
    
    // Input focus effects
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
}

function showFormError(input, message) {
    const formGroup = input.parentElement;
    
    // Remove any existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error class and message
    formGroup.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerText = message;
    formGroup.appendChild(errorDiv);
    
    // Focus the input
    input.focus();
    
    // Remove error after 3 seconds
    setTimeout(() => {
        formGroup.classList.remove('error');
        errorDiv.remove();
    }, 3000);
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}