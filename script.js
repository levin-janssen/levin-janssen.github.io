document.addEventListener('DOMContentLoaded', () => {
    
    
    // Automatic Age Calculation
    const birthDate = new Date(2006, 6, 23);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const ageElement = document.getElementById('age-text');
    ageElement.innerHTML = age + " Jahre";
    
    // Custom Cursor
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (mediaQuery.matches) {
        const cursorDot = document.querySelector('.custom-cursor-dot');
        const hoverElements = document.querySelectorAll('a, button');
        document.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            cursorDot.classList.remove('hidden');
        });

        document.addEventListener('mouseleave', () => {
            cursorDot.classList.add('hidden');
        });

        document.addEventListener('mouseout', (e) => {
            if (!e.relatedTarget) {
                cursorDot.classList.add('hidden');
            }
        });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) cursorDot.classList.add('hidden');
            else cursorDot.classList.remove('hidden');
        });

        window.addEventListener('blur', () => cursorDot.classList.add('hidden'));
        window.addEventListener('focus', () => cursorDot.classList.remove('hidden'));

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('grow');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('grow');
            });
        });
    }

    // Carousel logic
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track ? track.children : []);
    const prevBtn = document.querySelector('.carousel-button.prev');
    const nextBtn = document.querySelector('.carousel-button.next');

    if (track && slides.length) {
        let currentIndex = 0;

        const update = () => {
            const carouselEl = track.parentElement; // .carousel
            const slideWidth = (carouselEl && carouselEl.clientWidth) || (slides[0] && slides[0].clientWidth) || 0; // each slide is 100% of carousel width
            track.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
            // disable buttons at ends
            if (prevBtn) prevBtn.disabled = currentIndex === 0;
            if (nextBtn) nextBtn.disabled = currentIndex === slides.length - 1;
        };

        // Handle resize to keep slide aligned
        window.addEventListener('resize', update);

        if (prevBtn) prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex -= 1;
                update();
            }
        });
        if (nextBtn) nextBtn.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                currentIndex += 1;
                update();
            }
        });

        // Keyboard support when carousel focused
        const carousel = document.querySelector('.carousel');
        if (carousel) {
            carousel.setAttribute('tabindex', '0');
            carousel.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    prevBtn?.click();
                } else if (e.key === 'ArrowRight') {
                    nextBtn?.click();
                }
            });
        }

        // Initial alignment
        update();
    }
});