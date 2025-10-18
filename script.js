document.addEventListener('DOMContentLoaded', () => {

    
    // Automatic Age Calculation
    const birthDate = new Date(2006, 6, 23);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const ageElement = document.getElementById('age-text');
    ageElement.innerHTML = age + " Jahre";

    // Custom cursor
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (mediaQuery.matches) {
        const cursorDot = document.querySelector('.custom-cursor-dot');
        const hoverElements = document.querySelectorAll('a, button');

        document.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
        });

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('grow');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('grow');
            });
        });
    }

});