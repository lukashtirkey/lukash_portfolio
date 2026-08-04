/* ==========================================================================
   Lukash Tirkey - Interactive Portfolio Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initPrintTriggers();
    initClipboardCopy();
    initScrollAnimations();
    initContactForm();
    initDynamicDates();
});

/**
 * 1. Dark/Light Theme Manager
 */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
        htmlElement.setAttribute('data-theme', 'light');
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
    }
    
    // Toggle event listener
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        let newTheme = 'dark';
        
        if (currentTheme === 'dark') {
            newTheme = 'light';
        }
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add a temporary transition class to prevent layout flashes during load but allow smooth toggling
        document.body.style.transition = 'background 0.3s ease, color 0.3s ease';
    });
}

/**
 * 2. Mobile Navigation Toggle
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });
}

/**
 * 3. Print Resume Triggers
 */
function initPrintTriggers() {
    const printBtnHeader = document.getElementById('print-resume-btn');
    const printBtnHero = document.getElementById('hero-print-btn');
    
    const triggerPrint = () => {
        window.print();
    };
    
    if (printBtnHeader) printBtnHeader.addEventListener('click', triggerPrint);
    if (printBtnHero) printBtnHero.addEventListener('click', triggerPrint);
}

/**
 * 4. Click to Copy Contact Card Details
 */
function initClipboardCopy() {
    const copyCards = document.querySelectorAll('.contact-card[data-copy-val]');
    
    copyCards.forEach(card => {
        card.addEventListener('click', async () => {
            const val = card.getAttribute('data-copy-val');
            const indicator = card.querySelector('.copy-indicator');
            const originalText = indicator.textContent;
            
            try {
                await navigator.clipboard.writeText(val);
                
                // Success visual state
                card.classList.add('copied');
                indicator.textContent = 'Copied!';
                
                setTimeout(() => {
                    card.classList.remove('copied');
                    indicator.textContent = originalText;
                }, 2000);
                
            } catch (err) {
                console.error('Failed to copy text: ', err);
                indicator.textContent = 'Failed to copy';
                setTimeout(() => {
                    indicator.textContent = originalText;
                }, 2000);
            }
        });
    });
}

/**
 * 5. IntersectionObserver for Reveal Animations & Skill Bars & Active Navigation
 */
function initScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    const skillBars = document.querySelectorAll('.skill-progress');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Config for standard element entry reveals
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Trigger only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    reveals.forEach(el => revealObserver.observe(el));
    
    // Observer for skill progress bar loading
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-level');
                        bar.style.width = targetWidth;
                    });
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        skillsObserver.observe(skillsSection);
    }
    
    // Observer for updating active link in navbar
    const activeSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-20% 0px -60% 0px' // Capture sections currently dominating viewport
    });
    
    sections.forEach(sec => activeSectionObserver.observe(sec));
}

/**
 * 6. Contact Form Verification & Mock Submission
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const statusDiv = document.getElementById('form-status');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('form-name');
        const emailInput = document.getElementById('form-email');
        const subjectInput = document.getElementById('form-subject');
        const messageInput = document.getElementById('form-message');
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnHTML = submitBtn.innerHTML;
        
        // Disable submit buttons
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
        
        statusDiv.className = 'form-status';
        statusDiv.style.display = 'none';
        
        // Mocking network delay
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHTML;
            
            // Generate success message
            statusDiv.classList.add('success');
            statusDiv.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${nameInput.value}</strong>! Your message has been sent. I will get back to you shortly.`;
            statusDiv.style.display = 'block';
            
            // Reset form fields
            form.reset();
        }, 1500);
    });
}

/**
 * 7. Set Dynamic Dates (e.g. current year in footer)
 */
function initDynamicDates() {
    const footerYear = document.getElementById('footer-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
}
