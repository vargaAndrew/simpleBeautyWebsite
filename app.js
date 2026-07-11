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
    link.addEventListener('click', closeMobileMenu);
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
