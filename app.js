const menu = document.querySelector('#mobile-menu'); //so its target the mobile-menu id element (#menas id)
const menuLinks = document.querySelector('.navbar__menu');

function closeMobileMenu() {
    menu.classList.remove('is-active');
    menuLinks.classList.remove('active');
}

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');//check whats mean toggle the classLists
    menuLinks.classList.toggle('active');
});

document.querySelectorAll('.navbar__links').forEach(link => {
    link.addEventListener('click', event => {
        const target = link.hash && document.querySelector(link.hash);

        closeMobileMenu();
        if (!target) return;

        event.preventDefault();

        const startY = window.scrollY;
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const endY = target.getBoundingClientRect().top + startY - navbarHeight;
        const duration = 2200; // milliseconds; increase this to scroll more slowly
        const startTime = performance.now();

        function animateScroll(currentTime) {
            const progress = Math.min((currentTime - startTime) / duration, 1);

            window.scrollTo(0, startY + (endY - startY) * progress);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        }

        requestAnimationFrame(animateScroll);
    });
});

// FAQ accordion behavior
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');
        btn.addEventListener('click', () => {
            const isOpen = item.classList.toggle('open');
            btn.setAttribute('aria-expanded', isOpen);
        });
    });
});

// Review carousel behavior
const reviewCarousel = document.querySelector('#reviews-carousel');

if (reviewCarousel) {
    const slides = [...reviewCarousel.querySelectorAll('.review-card')];
    const reviewSlides = reviewCarousel.querySelector('.reviews__slides');
    const status = reviewCarousel.querySelector('.reviews__status');
    const previousButton = reviewCarousel.querySelector('.reviews__previous');
    const nextButton = reviewCarousel.querySelector('.reviews__next');
    const autoplayButton = reviewCarousel.querySelector('.reviews__autoplay');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let currentIndex = 0;
    let autoplayTimer = null;
    let reviewResizeFrame = null;

    function updateReviewSlidesHeight() {
        if (!reviewSlides) return;

        let maxHeight = 0;

        slides.forEach(slide => {
            const wasHidden = slide.hidden;
            const originalStyle = slide.getAttribute('style');

            slide.hidden = false;
            slide.style.position = 'absolute';
            slide.style.top = '0';
            slide.style.left = '0';
            slide.style.width = '100%';
            slide.style.visibility = 'hidden';

            maxHeight = Math.max(maxHeight, slide.getBoundingClientRect().height);

            slide.hidden = wasHidden;
            if (originalStyle === null) {
                slide.removeAttribute('style');
            } else {
                slide.setAttribute('style', originalStyle);
            }
        });

        reviewSlides.style.setProperty('--review-slides-height', `${Math.ceil(maxHeight)}px`);
    }

    function showReview(index) {
        currentIndex = (index + slides.length) % slides.length; 

        slides.forEach((slide, slideIndex) => {
            slide.hidden = slideIndex !== currentIndex;
        });

        status.textContent = `${currentIndex + 1} / ${slides.length}`;
    }

    function stopAutoplay() {
        window.clearInterval(autoplayTimer);
        autoplayTimer = null;
        autoplayButton.textContent = 'Automatikus váltás indítása';
    }

    function startAutoplay() {
        if (prefersReducedMotion.matches || autoplayTimer) return;

        autoplayTimer = window.setInterval(() => {
            showReview(currentIndex + 1);
        }, 6000);

        autoplayButton.textContent = 'Automatikus váltás szüneteltetése';
    }

    previousButton.addEventListener('click', () => {
        stopAutoplay();
        showReview(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        stopAutoplay();
        showReview(currentIndex + 1);
    });

    autoplayButton.addEventListener('click', () => {
        if (autoplayTimer) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });

    window.addEventListener('resize', () => {
        window.cancelAnimationFrame(reviewResizeFrame);
        reviewResizeFrame = window.requestAnimationFrame(updateReviewSlidesHeight);
    });
    document.fonts.ready.then(updateReviewSlidesHeight);
    updateReviewSlidesHeight();
    showReview(0);
    startAutoplay();
}
