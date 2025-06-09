class CarouselManager {
    constructor() {
        this.carousel = document.querySelector('.carousel');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.prevBtn = document.querySelector('.carousel-control.prev');
        this.nextBtn = document.querySelector('.carousel-control.next');
        this.indicatorsContainer = document.querySelector('.carousel-indicators');
        this.carouselContainer = document.querySelector('.carousel-container');
        
        this.currentSlide = 0;
        this.autoplayInterval = null;
        this.slideDuration = 5000;
        this.isTransitioning = false;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.init();
    }
    
    init() {
        this.createIndicators();
        this.setupEventListeners();
        this.startAutoplay();
    }
    
    createIndicators() {
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator');
            if (index === 0) indicator.classList.add('active');
            
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
            
            this.indicatorsContainer.appendChild(indicator);
        });
        
        this.indicators = document.querySelectorAll('.carousel-indicator');
    }
    
    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.goToSlide(this.currentSlide - 1));
        this.nextBtn.addEventListener('click', () => this.goToSlide(this.currentSlide + 1));
        
        this.carouselContainer.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.carouselContainer.addEventListener('mouseleave', () => this.startAutoplay());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.goToSlide(this.currentSlide - 1);
            } else if (e.key === 'ArrowRight') {
                this.goToSlide(this.currentSlide + 1);
            }
        });
        
        this.setupTouchEvents();
    }
    
    setupTouchEvents() {
        this.carouselContainer.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        });
        
        this.carouselContainer.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
    }
    
    goToSlide(slideIndex) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        this.currentSlide = slideIndex;
        
        if (this.currentSlide < 0) {
            this.currentSlide = this.slides.length - 1;
        } else if (this.currentSlide >= this.slides.length) {
            this.currentSlide = 0;
        }
        
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
        
        this.carousel.style.transform = `translateX(-${this.currentSlide * 20}%)`;
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
        
        this.resetAutoplay();
    }
    
    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.goToSlide(this.currentSlide + 1);
        }, this.slideDuration);
    }
    
    pauseAutoplay() {
        clearInterval(this.autoplayInterval);
    }
    
    resetAutoplay() {
        this.pauseAutoplay();
        this.startAutoplay();
    }
    
    handleSwipe() {
        const swipeThreshold = 50;
        if (this.touchEndX < this.touchStartX - swipeThreshold) {
            this.goToSlide(this.currentSlide + 1);
        } else if (this.touchEndX > this.touchStartX + swipeThreshold) {
            this.goToSlide(this.currentSlide - 1);
        }
    }
}

class MobileMenuManager {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.mobileNav = document.querySelector('.mobile-nav');
        this.init();
    }
    
    init() {
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
    }
    
    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.mobileNav.classList.toggle('active');
    }
    
    handleOutsideClick(e) {
        if (!this.mobileNav.contains(e.target) && !this.hamburger.contains(e.target)) {
            this.hamburger.classList.remove('active');
            this.mobileNav.classList.remove('active');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MobileMenuManager();
    new CarouselManager();
}); 