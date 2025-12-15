// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", e => {
            const targetId = link.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            const header = document.querySelector('header');
            const headerOffset = header ? header.offsetHeight : 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });
    });
    
    // Reveal animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(60px)';
        section.style.transition = '0.6s ease';
        observer.observe(section);
    });
    
    // Observe project cards and other elements
    document.querySelectorAll('.project-card, .certification-card, .timeline-item, .skill-category').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = '0.6s ease';
        observer.observe(item);
    });
    
    // Navbar background on scroll
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset || window.scrollY;
            
            if (currentScroll > 100) {
                header.style.background = 'rgba(15, 15, 26, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
            } else {
                header.style.background = 'rgba(15, 15, 26, 0.95)';
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            }
        });
    }
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('.section');
    const navLinksArray = document.querySelectorAll('.nav-links a');
    
    if (sections.length > 0 && navLinksArray.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.pageYOffset || window.scrollY;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollPosition >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
    
            navLinksArray.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            // For now, we'll just show an alert
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
            
            // You can integrate with email services like EmailJS, Formspree, etc.
            // Example with EmailJS:
            // emailjs.send('service_id', 'template_id', data)
            //     .then(() => alert('Message sent successfully!'))
            //     .catch(() => alert('Failed to send message. Please try again.'));
        });
    }
    
    // Typing effect for home section
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const originalText = typingElement.textContent.trim();
        if (originalText) {
            typingElement.textContent = '';
            let i = 0;
            
            function typeWriter() {
                if (i < originalText.length) {
                    typingElement.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            }
            
            // Start typing effect after a short delay
            setTimeout(typeWriter, 500);
        }
    }
    
    // Add parallax effect to home section
    const homeSection = document.querySelector('.home');
    if (homeSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset || window.scrollY;
            if (scrolled < window.innerHeight) {
                homeSection.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
    
    // Add counter animation for stats (if you add stats section)
    function animateCounter(element, target, duration = 2000) {
        if (!element) return;
        
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    // Make animateCounter available globally if needed
    window.animateCounter = animateCounter;
    
});

// Initialize animations on page load (fallback)
window.addEventListener('load', () => {
    // Ensure all sections are visible if IntersectionObserver didn't catch them
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        // Only set if still hidden (IntersectionObserver might have missed it)
        if (section.style.opacity === '0' || section.style.opacity === '') {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
});
