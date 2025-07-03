document.addEventListener('DOMContentLoaded', function() {
    // Progress Bar functionality - Fixed
    const progressBar = document.getElementById('progress-bar');
    const nav = document.getElementById('main-nav');
    
    function updateProgressBar() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = Math.min((winScroll / height) * 100, 100);
        progressBar.style.width = scrolled + '%';
        
        // Update navigation background opacity based on scroll
        if (winScroll > 50) {
            nav.style.backgroundColor = `rgba(255, 255, 253, 0.95)`;
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.backgroundColor = `rgba(255, 255, 253, 0.8)`;
            nav.style.boxShadow = 'none';
        }
    }
    
    window.addEventListener('scroll', updateProgressBar);
    // Initial call to set progress bar
    updateProgressBar();
    
    // Fixed smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a, .hero-cta a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navHeight = nav.offsetHeight;
                    const offsetTop = targetElement.offsetTop - navHeight - 20;
                    window.scrollTo({
                        top: Math.max(0, offsetTop),
                        behavior: 'smooth'
                    });
                    
                    // Visual feedback
                    this.style.color = 'var(--color-primary)';
                    setTimeout(() => {
                        this.style.color = '';
                    }, 500);
                }
            }
        });
    });
    
    // Fixed strategy cards interactive functionality
    const strategyCards = document.querySelectorAll('.strategy-card');
    
    strategyCards.forEach(card => {
        const details = card.querySelector('.strategy-details');
        
        if (details) {
            // Initially hide details
            details.style.display = 'none';
            details.style.opacity = '0';
            details.style.transition = 'all 0.3s ease';
            
            card.addEventListener('click', function(e) {
                e.preventDefault();
                const isExpanded = details.style.display === 'block';
                
                // Close all other strategy details
                strategyCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        const otherDetails = otherCard.querySelector('.strategy-details');
                        if (otherDetails) {
                            otherDetails.style.display = 'none';
                            otherDetails.style.opacity = '0';
                            otherCard.classList.remove('expanded');
                        }
                    }
                });
                
                // Toggle current card with smooth animation
                if (isExpanded) {
                    details.style.opacity = '0';
                    setTimeout(() => {
                        details.style.display = 'none';
                    }, 300);
                    card.classList.remove('expanded');
                } else {
                    details.style.display = 'block';
                    setTimeout(() => {
                        details.style.opacity = '1';
                    }, 10);
                    card.classList.add('expanded');
                }
            });
            
            // Add keyboard support
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
            
            // Make cards focusable
            card.setAttribute('tabindex', '0');
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.stat-card, .advantage-card, .strategy-card, .case-study-card, .tool-card, .faq-item');
    animatedElements.forEach(el => observer.observe(el));
    
    // Add animation classes
    const style = document.createElement('style');
    style.textContent = `
        .stat-card, .advantage-card, .strategy-card, .case-study-card, .tool-card, .faq-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .strategy-card.expanded {
            transform: translateY(-4px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            border-color: #ff0000;
        }
        
        .strategy-card.expanded::before {
            transform: scaleX(1);
        }
        
        .timeline-phase {
            opacity: 0;
            transform: translateX(-50px);
            transition: all 0.8s ease;
        }
        
        .timeline-phase:nth-child(even) {
            transform: translateX(50px);
        }
        
        .timeline-phase.animate-in {
            opacity: 1;
            transform: translateX(0);
        }
        
        /* Staggered animation delays */
        .stat-card:nth-child(1) { transition-delay: 0.1s; }
        .stat-card:nth-child(2) { transition-delay: 0.2s; }
        .stat-card:nth-child(3) { transition-delay: 0.3s; }
        .stat-card:nth-child(4) { transition-delay: 0.4s; }
        
        .strategy-card:nth-child(1) { transition-delay: 0.1s; }
        .strategy-card:nth-child(2) { transition-delay: 0.2s; }
        .strategy-card:nth-child(3) { transition-delay: 0.3s; }
        .strategy-card:nth-child(4) { transition-delay: 0.4s; }
        .strategy-card:nth-child(5) { transition-delay: 0.5s; }
        .strategy-card:nth-child(6) { transition-delay: 0.6s; }
        
        @media (prefers-reduced-motion: reduce) {
            .stat-card, .advantage-card, .strategy-card, .case-study-card, .tool-card, .faq-item, .timeline-phase {
                opacity: 1;
                transform: none;
                transition: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Timeline phases animation
    const timelinePhases = document.querySelectorAll('.timeline-phase');
    timelinePhases.forEach(phase => observer.observe(phase));
    
    // Enhanced strategy calculator with better visual feedback
    function createStrategyCalculator() {
        const calculatorHTML = `
            <div class="strategy-calculator" id="strategy-calculator">
                <h3>Strategy Effectiveness Calculator</h3>
                <p>Estimate your potential traffic increase based on your current metrics:</p>
                
                <div class="calculator-inputs">
                    <div class="input-group">
                        <label for="current-traffic">Current Monthly Website Traffic:</label>
                        <input type="number" id="current-traffic" placeholder="e.g., 10000" min="0">
                    </div>
                    
                    <div class="input-group">
                        <label for="selected-strategy">Select Strategy:</label>
                        <select id="selected-strategy">
                            <option value="89">Problem-Solution Hook (89% increase)</option>
                            <option value="156">Behind-the-Scenes (156% increase)</option>
                            <option value="234">Quick Tip Cliffhanger (234% increase)</option>
                            <option value="278">Before/After Transformation (278% increase)</option>
                            <option value="312">Tutorial Teaser (312% increase)</option>
                            <option value="356">Exclusive Discount (356% increase)</option>
                        </select>
                    </div>
                    
                    <button class="btn btn--primary" id="calculate-btn" onclick="calculateResults()">Calculate Potential</button>
                </div>
                
                <div class="calculator-results" id="calculator-results" style="display: none;">
                    <h4>🎯 Projected Results:</h4>
                    <div class="result-grid">
                        <div class="result-item">
                            <span class="result-label">New Monthly Traffic:</span>
                            <span class="result-value" id="new-traffic">0</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">Additional Visitors:</span>
                            <span class="result-value" id="additional-traffic">0</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">Percentage Increase:</span>
                            <span class="result-value" id="percentage-increase">0%</span>
                        </div>
                    </div>
                    <div class="success-message">
                        <p>✅ Calculation complete! These projections are based on real campaign data.</p>
                    </div>
                </div>
            </div>
        `;
        
        // Add calculator after strategies section
        const strategiesSection = document.querySelector('.strategies');
        if (strategiesSection) {
            strategiesSection.insertAdjacentHTML('beforeend', calculatorHTML);
        }
        
        // Add calculator styles
        const calculatorStyle = document.createElement('style');
        calculatorStyle.textContent = `
            .strategy-calculator {
                background: var(--color-surface);
                border: 2px solid var(--color-card-border);
                border-radius: var(--radius-lg);
                padding: var(--space-24);
                margin-top: var(--space-32);
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
                box-shadow: var(--shadow-md);
            }
            
            .strategy-calculator h3 {
                text-align: center;
                margin-bottom: var(--space-16);
                color: var(--color-text);
            }
            
            .calculator-inputs {
                display: flex;
                flex-direction: column;
                gap: var(--space-16);
            }
            
            .input-group {
                display: flex;
                flex-direction: column;
                gap: var(--space-8);
            }
            
            .input-group label {
                font-weight: var(--font-weight-medium);
                color: var(--color-text);
            }
            
            .input-group input,
            .input-group select {
                padding: var(--space-12);
                border: 1px solid var(--color-border);
                border-radius: var(--radius-base);
                font-size: var(--font-size-base);
                background: var(--color-background);
                color: var(--color-text);
                transition: border-color 0.3s ease;
            }
            
            .input-group input:focus,
            .input-group select:focus {
                border-color: var(--color-primary);
                outline: none;
            }
            
            #calculate-btn {
                margin-top: var(--space-8);
                transition: all 0.3s ease;
            }
            
            #calculate-btn:hover {
                transform: translateY(-2px);
            }
            
            #calculate-btn.calculating {
                background: var(--color-secondary);
                color: var(--color-text);
                cursor: not-allowed;
            }
            
            .calculator-results {
                margin-top: var(--space-24);
                padding: var(--space-16);
                background: var(--color-background);
                border-radius: var(--radius-base);
                border-left: 4px solid #ff0000;
                animation: slideIn 0.5s ease;
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .result-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: var(--space-16);
                margin-top: var(--space-16);
            }
            
            .result-item {
                text-align: center;
                padding: var(--space-16);
                background: var(--color-surface);
                border-radius: var(--radius-base);
                border: 1px solid var(--color-card-border);
                transition: transform 0.3s ease;
            }
            
            .result-item:hover {
                transform: translateY(-2px);
            }
            
            .result-label {
                display: block;
                font-size: var(--font-size-sm);
                color: var(--color-text-secondary);
                margin-bottom: var(--space-8);
            }
            
            .result-value {
                display: block;
                font-size: var(--font-size-xl);
                font-weight: var(--font-weight-bold);
                color: #ff0000;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            }
            
            .success-message {
                margin-top: var(--space-16);
                padding: var(--space-12);
                background: rgba(var(--color-success-rgb), 0.1);
                border-radius: var(--radius-base);
                border: 1px solid rgba(var(--color-success-rgb), 0.3);
            }
            
            .success-message p {
                margin: 0;
                color: var(--color-success);
                font-size: var(--font-size-sm);
                text-align: center;
            }
            
            @media (max-width: 768px) {
                .result-grid {
                    grid-template-columns: 1fr;
                }
                
                .strategy-calculator {
                    margin-left: var(--space-16);
                    margin-right: var(--space-16);
                }
            }
        `;
        document.head.appendChild(calculatorStyle);
    }
    
    // Enhanced global calculate function with visual feedback
    window.calculateResults = function() {
        const currentTraffic = parseInt(document.getElementById('current-traffic').value);
        const selectedStrategy = parseInt(document.getElementById('selected-strategy').value);
        const resultsDiv = document.getElementById('calculator-results');
        const calculateBtn = document.getElementById('calculate-btn');
        
        if (!currentTraffic || currentTraffic <= 0) {
            alert('Please enter a valid current traffic number');
            document.getElementById('current-traffic').focus();
            return;
        }
        
        // Visual feedback during calculation
        calculateBtn.textContent = 'Calculating...';
        calculateBtn.classList.add('calculating');
        calculateBtn.disabled = true;
        
        setTimeout(() => {
            const increaseMultiplier = selectedStrategy / 100;
            const additionalTraffic = Math.round(currentTraffic * increaseMultiplier);
            const newTraffic = currentTraffic + additionalTraffic;
            
            document.getElementById('new-traffic').textContent = newTraffic.toLocaleString();
            document.getElementById('additional-traffic').textContent = additionalTraffic.toLocaleString();
            document.getElementById('percentage-increase').textContent = selectedStrategy + '%';
            
            resultsDiv.style.display = 'block';
            resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Reset button
            calculateBtn.textContent = 'Calculate Potential';
            calculateBtn.classList.remove('calculating');
            calculateBtn.disabled = false;
        }, 1000);
    };
    
    // Initialize calculator
    createStrategyCalculator();
    
    // Add copy-to-clipboard functionality for key statistics
    const keyStats = document.querySelectorAll('.stat-number, .advantage-stat, .metric-value');
    
    keyStats.forEach(stat => {
        stat.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                showCopyFeedback(this);
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showCopyFeedback(this);
            });
        });
        
        // Add visual hint that stats are clickable
        stat.style.cursor = 'pointer';
        stat.title = 'Click to copy';
    });
    
    function showCopyFeedback(element) {
        const originalText = element.textContent;
        const originalColor = element.style.color;
        
        element.textContent = 'Copied!';
        element.style.color = 'var(--color-success)';
        
        setTimeout(() => {
            element.textContent = originalText;
            element.style.color = originalColor || '#ff0000';
        }, 1000);
    }
    
    // Performance optimization: Lazy load images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        imageObserver.observe(img);
    });
    
    // Add reading time estimator
    function calculateReadingTime() {
        const content = document.body.innerText;
        const words = content.split(/\s+/).length;
        const readingTime = Math.ceil(words / 200); // Average reading speed
        
        const readingTimeHTML = `
            <div class="reading-time">
                <small>📖 ${readingTime} minute read</small>
            </div>
        `;
        
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.insertAdjacentHTML('beforeend', readingTimeHTML);
        }
        
        // Add reading time styles
        const readingTimeStyle = document.createElement('style');
        readingTimeStyle.textContent = `
            .reading-time {
                margin-top: var(--space-16);
                text-align: center;
                opacity: 0.7;
            }
            
            .reading-time small {
                font-size: var(--font-size-sm);
                color: var(--color-text-secondary);
            }
        `;
        document.head.appendChild(readingTimeStyle);
    }
    
    // Initialize reading time
    calculateReadingTime();
    
    // Enhanced mobile menu functionality
    function setupMobileMenu() {
        const navContainer = document.querySelector('.main-nav .container');
        const navLinks = document.querySelector('.nav-links');
        
        if (window.innerWidth <= 768) {
            const menuToggle = document.createElement('button');
            menuToggle.innerHTML = '☰';
            menuToggle.className = 'menu-toggle';
            menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
            
            const toggleStyle = document.createElement('style');
            toggleStyle.textContent = `
                .menu-toggle {
                    display: none;
                    background: none;
                    border: none;
                    font-size: var(--font-size-xl);
                    color: var(--color-text);
                    cursor: pointer;
                    padding: var(--space-8);
                    transition: color 0.3s ease;
                }
                
                .menu-toggle:hover {
                    color: var(--color-primary);
                }
                
                @media (max-width: 768px) {
                    .menu-toggle {
                        display: block;
                    }
                    
                    .nav-links {
                        display: none;
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: var(--color-surface);
                        flex-direction: column;
                        padding: var(--space-16);
                        border-top: 1px solid var(--color-border);
                        box-shadow: var(--shadow-md);
                        z-index: 1000;
                    }
                    
                    .nav-links.active {
                        display: flex;
                    }
                }
            `;
            document.head.appendChild(toggleStyle);
            
            navContainer.appendChild(menuToggle);
            
            menuToggle.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                this.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
            });
            
            // Close menu when clicking on links
            navLinks.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '☰';
            });
        }
    }
    
    // Initialize mobile menu
    setupMobileMenu();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.remove('active');
            navLinks.style.display = '';
        }
    });
    
    console.log('YouTube Shorts Traffic Guide initialized successfully!');
});