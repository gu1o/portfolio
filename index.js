document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // --- troca de tema (dark/light mode) ---
    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        htmlElement.setAttribute('data-theme', savedTheme);
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // --- menu mobile ---
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active', isActive);
            // prevenir scroll quando menu aberto
            document.body.style.overflow = isActive ? 'hidden' : '';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // --- validação dos campos do form ---
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const inputs = contactForm.querySelectorAll('input[required], textarea[required]');

            inputs.forEach(input => {
                const formGroup = input.parentElement;
                const isEmail = input.type === 'email';
                const isEmpty = !input.value.trim();
                const isInvalidEmail = isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);

                if (isEmpty || isInvalidEmail) {
                    formGroup.classList.add('error');
                    isValid = false;
                } else {
                    formGroup.classList.remove('error');
                }
            });

            if (isValid) {
                const btn = contactForm.querySelector('.submit-btn');
                const originalText = btn.textContent;
                
                btn.disabled = true;
                btn.textContent = 'Enviando...';

                setTimeout(() => {
                    contactForm.reset();
                    btn.disabled = false;
                    btn.textContent = originalText;
                    showToast();
                }, 1500);
            }
        });

        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                input.parentElement.classList.remove('error');
            });
        });
    }

    function showToast() {
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 4000);
    }

    // inicar o tema
    initTheme();
});
