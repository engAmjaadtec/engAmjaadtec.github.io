// ===== Elements =====
const navbar = document.querySelector('.navbar');
const navLinks = document.getElementById('nav-links');
const menuToggle = document.getElementById('menu-toggle');
const themeToggle = document.getElementById('theme-toggle');

// ===== Mobile Menu =====
function closeMenu() {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
}

menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    menuToggle.innerHTML = isOpen
        ? '<i class="fas fa-xmark"></i>'
        : '<i class="fas fa-bars"></i>';
});

// ===== Smooth Scrolling for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return; // placeholder links are handled below
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            closeMenu();
        }
    });
});

// ===== Placeholder Links (href="#") =====
// Project links you haven't filled in yet show "coming soon".
document.querySelectorAll('.project-links a[href="#"]').forEach(link => {
    link.classList.add('pending');
    link.setAttribute('aria-disabled', 'true');
    link.setAttribute('tabindex', '-1');
    link.insertAdjacentText('beforeend', ' (coming soon)');
});

// Contact links you haven't filled in yet (like LinkedIn) are hidden.
document.querySelectorAll('[data-hide-if-empty][href="#"]').forEach(link => {
    link.style.display = 'none';
});

// ===== Dark Mode =====
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';
    themeToggle.innerHTML = isDark
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

applyTheme(document.documentElement.getAttribute('data-theme') || 'light');

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try {
        localStorage.setItem('theme', next);
    } catch (e) {
        // Storage may be blocked; the theme still changes for this visit.
    }
});

// ===== Navbar Background Change on Scroll =====
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 100);
});

// ===== Scroll Reveal Animations =====
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach(item => revealObserver.observe(item));
} else {
    revealItems.forEach(item => item.classList.add('visible'));
}

// ===== Highlight the Current Section in the Menu =====
const sections = document.querySelectorAll('section[id]');
const menuLinks = document.querySelectorAll('.nav-links a');

if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                menuLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(section => sectionObserver.observe(section));
}

// ===== Footer Year =====
document.getElementById('year').textContent = new Date().getFullYear();

console.log('Portfolio loaded successfully!');
