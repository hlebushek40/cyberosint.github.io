document.addEventListener('DOMContentLoaded', () => {
    // --- ПИШУЩАЯ МАШИНКА ДЛЯ HERO ЗАГОЛОВКА ---
    const heroTitleElement = document.getElementById('heroTitle');
    if (heroTitleElement) {
        const originalText = heroTitleElement.dataset.text || heroTitleElement.textContent;
        heroTitleElement.textContent = '';
        let i = 0;
        const speed = 75;

        function typeWriter() {
            if (i < originalText.length) {
                heroTitleElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        typeWriter();
    }

    // --- КНОПКА НАВЕРХ ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.onscroll = function() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            if (scrollToTopBtn) scrollToTopBtn.style.display = 'block';
        } else {
            if (scrollToTopBtn) scrollToTopBtn.style.display = 'none';
        }
    };

    if (scrollToTopBtn) {
        scrollToTopBtn.onclick = function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };
    }

    // --- ПОДСВЕТКА АКТИВНОЙ ССЫЛКИ В НАВИГАЦИИ ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));

                const activeLink = document.querySelector(`.nav-menu a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- НАЧАЛЬНАЯ АКТИВНАЯ ССЫЛКА ---
    const firstVisibleSection = document.elementFromPoint(100, 100);
    if (firstVisibleSection) {
        let currentSection = firstVisibleSection.closest('section[id]');
        if (currentSection) {
            const initialActiveLink = document.querySelector(`.nav-menu a[href="#${currentSection.id}"]`);
            if (initialActiveLink) {
                initialActiveLink.classList.add('active');
            }
        }
    }

    // --- ПОДСВЕТКА ЭЛЕМЕНТА ПРИ ПЕРЕХОДЕ ПО ССЫЛКЕ С # (ОСНОВНАЯ СТРАНИЦА) ---
    function highlightTargetElement() {
        const hash = window.location.hash;
        if (hash && hash.length > 1) {
            const targetId = hash.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                // Удаляем подсветку со всех элементов
                document.querySelectorAll('.js-highlight').forEach(el => {
                    el.classList.remove('js-highlight');
                });
                targetElement.classList.add('js-highlight');
                // Убираем подсветку через 3 секунды
                setTimeout(() => {
                    targetElement.classList.remove('js-highlight');
                }, 3000);
            }
        }
    }

    // Добавляем стили для подсветки
    const highlightStyle = document.createElement('style');
    highlightStyle.textContent = `
        .js-highlight {
            animation: highlightFlash 0.5s ease-in-out 3;
            box-shadow: 0 0 0 3px var(--primary-light);
            transition: box-shadow 0.3s ease;
        }
        @keyframes highlightFlash {
            0% { box-shadow: 0 0 0 0px var(--primary-light); }
            50% { box-shadow: 0 0 0 6px var(--primary-light); }
            100% { box-shadow: 0 0 0 0px var(--primary-light); }
        }
    `;
    document.head.appendChild(highlightStyle);

    // Вызываем при загрузке
    highlightTargetElement();

    // Вызываем при изменении хэша (нажатие на ссылки внутри страницы)
    window.addEventListener('hashchange', highlightTargetElement);

    // --- ОБРАБОТКА СТРАНИЦЫ diagrams-info.html ---
    if (window.location.pathname.endsWith('diagrams-info.html')) {
        const targetId = window.location.hash.substring(1);
        if (targetId) {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                element.classList.add('highlight');
                setTimeout(() => {
                    element.classList.remove('highlight');
                }, 3000);
            }
        }
    }
});