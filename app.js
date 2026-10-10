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
            const easedProgress = progress;

            window.scrollTo(0, startY + (endY - startY) * easedProgress);

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
