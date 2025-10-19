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

        let slideWidth = 0;
        const computeSlideWidth = () => {
            const carouselEl = track.parentElement; // .carousel
            slideWidth = (carouselEl && carouselEl.clientWidth) || (slides[0] && slides[0].clientWidth) || 0;
        };
        const applyTransform = (offset = 0) => {
            track.style.transform = `translateX(${-(currentIndex * slideWidth) + offset}px)`;
        };
        const updateButtons = () => {
            if (prevBtn) prevBtn.disabled = currentIndex === 0;
            if (nextBtn) nextBtn.disabled = currentIndex === slides.length - 1;
        };
        const update = () => {
            computeSlideWidth();
            applyTransform(0);
            updateButtons();
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

        // Swipe/drag support (pointer events)
        let isPointerDown = false;
        let startX = 0;
        let lastDeltaX = 0;
        const threshold = 0.2; // fraction of slide width to trigger navigation
        const maxRubber = 60; // px of edge rubber banding

        const onPointerDown = (e) => {
            if (!e.isPrimary) return;
            isPointerDown = true;
            startX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
            lastDeltaX = 0;
            track.style.transition = 'none';
        };
        const onPointerMove = (e) => {
            if (!isPointerDown) return;
            const currentX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
            let deltaX = currentX - startX;
            lastDeltaX = deltaX;
            // rubber band at edges
            const atStart = currentIndex === 0 && deltaX > 0;
            const atEnd = currentIndex === slides.length - 1 && deltaX < 0;
            if (atStart || atEnd) {
                const dir = deltaX < 0 ? -1 : 1;
                deltaX = dir * Math.min(Math.abs(deltaX) ** 0.85, maxRubber);
            }
            applyTransform(deltaX);
        };
        const onPointerUp = () => {
            if (!isPointerDown) return;
            isPointerDown = false;
            track.style.transition = '';
            const movedEnough = Math.abs(lastDeltaX) > slideWidth * threshold;
            if (movedEnough) {
                if (lastDeltaX < 0 && currentIndex < slides.length - 1) currentIndex += 1;
                if (lastDeltaX > 0 && currentIndex > 0) currentIndex -= 1;
            }
            applyTransform(0);
            updateButtons();
        };

        // Pointer events (covers mouse, touch, pen)
        const carouselEl = track.parentElement;
        if (window.PointerEvent) {
            carouselEl.addEventListener('pointerdown', onPointerDown, { passive: true });
            window.addEventListener('pointermove', onPointerMove, { passive: true });
            window.addEventListener('pointerup', onPointerUp, { passive: true });
            window.addEventListener('pointercancel', onPointerUp, { passive: true });
        } else {
            // Fallback to touch events
            carouselEl.addEventListener('touchstart', onPointerDown, { passive: true });
            window.addEventListener('touchmove', onPointerMove, { passive: true });
            window.addEventListener('touchend', onPointerUp, { passive: true });
            window.addEventListener('touchcancel', onPointerUp, { passive: true });
        }

        // Initial alignment
        update();
    }
});