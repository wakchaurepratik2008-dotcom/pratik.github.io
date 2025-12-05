document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    const themeToggle = document.querySelector('.theme-toggle');
    const indicator = document.querySelector('.indicator');
    let activeNavItem = document.querySelector('.nav-item.active');

    // Initialize theme from localStorage or prefered color scheme
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 
                          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    // Toggle theme between light and dark
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    }

    // Update theme icon based on current theme
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Update indicator position
    function updateIndicator(element) {
        if (!element) return;
        
        const navRect = element.getBoundingClientRect();
        const navLinksRect = document.querySelector('.nav-links').getBoundingClientRect();
        
        indicator.style.opacity = '1';
        indicator.style.transform = `translateY(${navRect.top - navLinksRect.top}px)`;
        indicator.style.height = `${navRect.height}px`;
    }

    // Handle navigation
    function handleNavigation(item) {
        // Update active nav item
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        activeNavItem = item;
        
        // Get target section
        const targetSection = item.getAttribute('data-section');
        
        // Animate section transition
        sections.forEach(section => {
            if (section.id === targetSection) {
                section.style.display = 'block';
                setTimeout(() => section.classList.add('active'), 10);
            } else {
                section.classList.remove('active');
                setTimeout(() => {
                    if (!section.classList.contains('active')) {
                        section.style.display = 'none';
                    }
                }, 300);
            }
        });
        
        // Update indicator
        updateIndicator(item);
        
        // Save to localStorage
        localStorage.setItem('activeSection', targetSection);
    }

    // Initialize
    function init() {
        // Set initial theme
        initTheme();
        
        // Set up event listeners
        navItems.forEach(item => {
            item.addEventListener('click', () => handleNavigation(item));
        });
        
        themeToggle.addEventListener('click', toggleTheme);
        
        // Initialize active section
        const savedSection = localStorage.getItem('activeSection');
        let initialNavItem;
        
        if (savedSection) {
            initialNavItem = document.querySelector(`.nav-item[data-section="${savedSection}"]`);
        } else {
            initialNavItem = document.querySelector('.nav-item');
        }
        
        if (initialNavItem) {
            handleNavigation(initialNavItem);
        }
        
        // Initial indicator position
        setTimeout(() => updateIndicator(activeNavItem), 100);
        
        // Add animation delay to cards
        document.querySelectorAll('.card, .skill-card, .project-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    // Initialize the app
    init();
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (activeNavItem) {
                updateIndicator(activeNavItem);
            }
        }, 250);
    });
        sections.forEach(section => section.classList.remove('active'));
        
        // Add active class to saved section and corresponding nav item
        document.getElementById(savedSection).classList.add('active');
        document.querySelector(`.nav-item[data-section="${savedSection}"]`).classList.add('active');
    } else {
        // Default to first section if no saved section
        sections[0].classList.add('active');
        navItems[0].classList.add('active');
    }

    // Add animation to skill bars on scroll
    const skillCards = document.querySelectorAll('.skill-card');
    
    const animateOnScroll = () => {
        skillCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial check in case skills are already in viewport
    window.addEventListener('load', animateOnScroll);
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Smooth scroll to top when clicking on the profile
    const profile = document.querySelector('.profile');
    if (profile) {
        profile.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
