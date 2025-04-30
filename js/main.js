/**
 * Punnyam Charitable Trust - Main JavaScript
 * Version: 1.0.0
 *
 * This file contains all the JavaScript functionality for the Punnyam Charitable Trust website,
 * including component initialization, animations, and interactive features.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initNavbar();
    initEventCarousel();
    initAnimations();
    initFooter();
    
    /**
     * Navbar initialization
     * Loads the navbar from navbar.html and sets up event listeners
     */
    function initNavbar() {
        // Function to load the navbar
        const loadNavbar = async () => {
            try {
                const response = await fetch("../html/navbar.html");
                
                if (!response.ok) {
                    throw new Error(`Failed to load navbar: ${response.status} ${response.statusText}`);
                }
                
                const html = await response.text();
                document.getElementById("navbar-placeholder").innerHTML = html;
                
                // Initialize navbar components
                initializeNavbarComponents();
                
                // Add scroll event listener
                addScrollListener();
            } catch (error) {
                console.error("Error loading navbar:", error);
                
                // Fallback minimal navbar
                document.getElementById("navbar-placeholder").innerHTML = `
                    <nav class="navbar navbar-expand-lg navbar-dark">
                        <div class="container">
                            <a class="navbar-brand" href="../html/index.html">Punnyam Charitable Trust</a>
                            <a href="../html/donation.html" class="btn btn-warning text-white fw-bold ms-3">Donate Now</a>
                        </div>
                    </nav>
                `;
            }
        };
        
        // Function to initialize Bootstrap components
        const initializeNavbarComponents = () => {
            const navBar = document.querySelector('.navbar');
            if (navBar) {
                const navCollapse = new bootstrap.Collapse(navBar.querySelector('.collapse'), {
                    toggle: false
                });
                
                // Initialize dropdown menus
                const dropdowns = navBar.querySelectorAll('.dropdown-toggle');
                dropdowns.forEach(dropdown => {
                    new bootstrap.Dropdown(dropdown);
                });
            }
        };
        
        // Function to add scroll event listener
        const addScrollListener = () => {
            const navBar = document.querySelector('.navbar');
            if (navBar) {
                window.addEventListener('scroll', function() {
                    if (window.scrollY > 50) {
                        navBar.classList.add('scrolled');
                    } else {
                        navBar.classList.remove('scrolled');
                    }
                });
                
                // Trigger scroll event to set initial state
                window.dispatchEvent(new Event('scroll'));
            }
        };
        
        // Load the navbar
        loadNavbar();
    }
    
    /**
     * Event carousel initialization
     * Loads events from JSON and creates carousel items dynamically
     */
    function initEventCarousel() {
        const imageFolder = '../assets/events/images/';
        const carouselInner = document.getElementById('carouselInner');
        const carouselIndicators = document.getElementById('carouselIndicators');
        const upcomingEventsSection = document.getElementById('upcoming-events');
        
        if (!carouselInner || !upcomingEventsSection) return;
        
        // Load event images
        fetch('../json/events.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load events: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                // Create indicators and slides
                data.forEach((event, index) => {
                    // Create indicator
                    const indicator = document.createElement('button');
                    indicator.type = 'button';
                    indicator.setAttribute('data-bs-target', '#eventCarousel');
                    indicator.setAttribute('data-bs-slide-to', index.toString());
                    if (index === 0) indicator.classList.add('active');
                    indicator.setAttribute('aria-current', index === 0 ? 'true' : 'false');
                    indicator.setAttribute('aria-label', `Slide ${index + 1}`);
                    
                    // Create slide
                    const slide = document.createElement('div');
                    slide.classList.add('carousel-item');
                    if (index === 0) slide.classList.add('active');
                    
                    const img = document.createElement('img');
                    img.src = imageFolder + event.image;
                    img.classList.add('d-block', 'w-100');
                    img.alt = event.title;
                    
                    const caption = document.createElement('div');
                    caption.classList.add('carousel-caption', 'd-none', 'd-md-block');
                    
                    const title = document.createElement('h5');
                    title.textContent = event.title;
                    
                    const description = document.createElement('p');
                    description.textContent = event.description;
                    
                    caption.appendChild(title);
                    caption.appendChild(description);
                    slide.appendChild(img);
                    slide.appendChild(caption);
                    
                    carouselIndicators.appendChild(indicator);
                    carouselInner.appendChild(slide);
                });
            })
            .catch(error => {
                console.error('Error loading events:', error);
                upcomingEventsSection.style.display = 'none';
            });
    }
    
    /**
     * Initialize all animations
     * Sets up observers for scrolling animations
     */
    function initAnimations() {
        // Setup intersection observers for animations
        setupCounterObserver();
        setupHeroStatCounters();
        setupProgressObserver();
        setupCardEffects();
    }
    
    /**
     * Counter animation for mission values section
     * Uses IntersectionObserver to trigger animations when section is visible
     */
    function setupCounterObserver() {
        const counters = document.querySelectorAll('.counter');
        const missionValuesSection = document.querySelector('.mission-values');
        
        if (!missionValuesSection || counters.length === 0) return;
        
        const counterOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };
        
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => {
                        const updateCount = () => {
                            const target = +counter.getAttribute('data-target');
                            const count = +counter.innerText;
                            const increment = target / 100; // Animation speed

                            if (count < target) {
                                counter.innerText = Math.ceil(count + increment);
                                setTimeout(updateCount, 30);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCount();
                    });
                    
                    // Add animation classes to value cards
                    const valueCards = document.querySelectorAll('.value-card');
                    valueCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animated');
                        }, index * 200);
                    });
                    
                    counterObserver.unobserve(missionValuesSection);
                }
            });
        }, counterOptions);
        
        counterObserver.observe(missionValuesSection);
    }
    
    /**
     * Hero Stat Counter Animation
     * Animates the hero-stat-number elements when the hero section is visible
     */
    function setupHeroStatCounters() {
        const heroStatNumbers = document.querySelectorAll('.hero-stat-number');
        const heroSection = document.querySelector('.hero');
        
        if (!heroSection || heroStatNumbers.length === 0) return;
        
        const heroStatOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };
        
        const heroStatObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroStatNumbers.forEach(statNumber => {
                        // Extract the numeric part (removing the "+" sign)
                        const targetText = statNumber.innerText;
                        const targetValue = parseInt(targetText.replace(/\D/g, ''), 10);
                        
                        // Reset to zero for animation
                        statNumber.innerHTML = '0';
                        
                        // Animate to target value
                        const updateStat = () => {
                            const currentValue = parseInt(statNumber.innerText.replace(/\D/g, ''), 10);
                            const increment = Math.ceil(targetValue / 60); // Control animation speed
                            
                            if (currentValue < targetValue) {
                                statNumber.innerText = Math.min(currentValue + increment, targetValue) + 
                                    (targetText.includes('+') ? '+' : '');
                                setTimeout(updateStat, 30);
                            } else {
                                statNumber.innerText = targetText; // Ensure we end up with the exact original text
                            }
                        };
                        
                        // Start the animation with a slight delay for visual effect
                        setTimeout(updateStat, 300);
                    });
                    
                    // Only run once
                    heroStatObserver.unobserve(heroSection);
                }
            });
        }, heroStatOptions);
        
        heroStatObserver.observe(heroSection);
    }
    
    /**
     * Progress bar animations
     * Animates progress bars when they come into view
     */
    function setupProgressObserver() {
        const progressBars = document.querySelectorAll('.progress-bar');
        const aboutImpactSection = document.querySelector('.about-impact');
        
        if (!aboutImpactSection || progressBars.length === 0) return;
        
        const progressOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };
        
        const progressObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        progressBars.forEach(bar => {
                            const width = bar.style.width;
                            bar.style.width = '0';
                            setTimeout(() => {
                                bar.style.width = width;
                            }, 100);
                        });
                    }, 300);
                    
                    progressObserver.unobserve(aboutImpactSection);
                }
            });
        }, progressOptions);
        
        progressObserver.observe(aboutImpactSection);
    }
    
    /**
     * Counter card hover effects
     * Adds interactive effects to counter cards
     */
    function setupCardEffects() {
        const counterCards = document.querySelectorAll('.counter-card');
        counterCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('active');
            });
            card.addEventListener('mouseleave', function() {
                this.classList.remove('active');
            });
            card.addEventListener('touchstart', function() {
                this.classList.add('active');
            }, {passive: true});
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('active');
                }, 500);
            }, {passive: true});
        });
    }
    
    /**
     * Footer initialization
     * Loads the footer from footer.html
     */
    function initFooter() {
        const footerPlaceholder = document.getElementById("footer-placeholder");
        
        if (!footerPlaceholder) return;
        
        // Function to load the footer
        const loadFooter = async () => {
            try {
                const response = await fetch("../html/footer.html");
                
                if (!response.ok) {
                    throw new Error(`Failed to load footer: ${response.status} ${response.statusText}`);
                }
                
                const html = await response.text();
                footerPlaceholder.innerHTML = html;
                
                // Set current year in footer after it's loaded
                setCurrentYear();
            } catch (error) {
                console.error("Error loading footer:", error);
                
                // Fallback minimal footer
                document.getElementById("footer-placeholder").innerHTML = `
                    <footer class="footer bg-dark text-white py-3">
                        <div class="container text-center">
                            <p>Copyright &copy; <span id="current-year"></span> Punnyam Charitable Trust</p>
                        </div>
                    </footer>
                `;
                
                // Set current year in fallback footer
                setCurrentYear();
            }
        };
        
        // Load the footer
        loadFooter();
    }

    /**
     * Set the current year in the footer copyright
     */
    function setCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
}); 