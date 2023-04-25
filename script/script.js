// BUTTONS ANIMATION

const buttonsAnimation = document.querySelectorAll('#btn-animation');

buttonsAnimation.forEach(el => {
    el.addEventListener('click', function (e) {
        const
            size = Math.max(this.offsetWidth, this.offsetHeight),
            x = e.offsetX - size / 2,
            y = e.offsetY - size / 2,
            wave = document.createElement('span');

        // New wave
        wave.className = 'wave'
        wave.style.cssText = `width: ${size}px; height: ${size}px; top: ${y}px; left: ${x}px;`
        this.appendChild(wave);

        // Remove element
        setTimeout(() => wave.remove(), 500);
    })
});