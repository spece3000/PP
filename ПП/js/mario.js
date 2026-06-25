document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('showMario');
    const container = document.getElementById('mario-container');
    let isOpen = false;

    function fireParticles() {
        const colors = ['#E09916', '#FFCA67', '#ff6b6b', '#51cf66', '#ffa62d', '#a25afd', '#26ccff'];
        const particles = 40;

        for (let i = 0; i < particles; i++) {
            const el = document.createElement('div');
            el.style.width = Math.random() * 15 + 5 + 'px';
            el.style.height = el.style.width;
            el.style.background = colors[Math.floor(Math.random() * colors.length)];
            el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            el.style.position = 'fixed';
            el.style.pointerEvents = 'none';
            el.style.zIndex = 9999;
            el.style.left = (window.innerWidth / 2) + 'px';
            el.style.top = (window.innerHeight / 2) + 'px';
            document.body.appendChild(el);

            const angle = Math.random() * Math.PI * 2;
            const distance = 200 + Math.random() * 400;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            anime({
                targets: el,
                translateX: [0, tx],
                translateY: [0, ty],
                rotate: [0, Math.random() * 720],
                scale: [1, 0],
                opacity: [1, 0],
                duration: 1000 + Math.random() * 600,
                easing: 'easeOutQuad',
                complete: function() {
                    el.remove();
                }
            });
        }
    }

    btn.addEventListener('click', function() {
        if (isOpen) return;
        container.classList.add('active');
        isOpen = true;
        setTimeout(fireParticles, 100);
    });

    container.addEventListener('click', function(e) {
        if (e.target === container) {
            container.classList.remove('active');
            isOpen = false;
            const img = container.querySelector('img');
            img.style.animation = 'none';
            void img.offsetHeight;
            img.style.animation = 'slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && container.classList.contains('active')) {
            container.classList.remove('active');
            isOpen = false;
            const img = container.querySelector('img');
            img.style.animation = 'none';
            void img.offsetHeight;
            img.style.animation = 'slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
        }
    });
});