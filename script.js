document.addEventListener('DOMContentLoaded', () => {

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

});