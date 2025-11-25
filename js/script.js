// ==============================
// RELOGIO
// ==============================
function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();

    let h = now.getHours().toString().padStart(2, "0");
    let m = now.getMinutes().toString().padStart(2, "0");
    let s = now.getSeconds().toString().padStart(2, "0");

    clock.textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();


// ==============================
// ACCORDION
// ==============================
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const arrow = header.querySelector('.accordion-arrow');
        const isOpen = content.classList.contains('open');

        // Fecha outros
        document.querySelectorAll('.accordion-content.open').forEach(c => {
            if (c !== content) {
                c.classList.remove('open');
                c.previousElementSibling.querySelector('.accordion-arrow').classList.remove('open');
            }
        });

        // Abre/fecha atual
        if (isOpen) {
            content.classList.remove('open');
            arrow.classList.remove('open');
        } else {
            content.classList.add('open');
            arrow.classList.add('open');
        }
    });

    // Acessibilidade
    header.addEventListener('keydown', e => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            header.click();
        }
    });
});


// ==============================
// MÚSICA — AUTOPLAY COM PERMISSÃO
// ==============================
const bgMusic = document.getElementById("bg-music");
let musicStarted = false;

function startMusic() {
    if (!musicStarted) {
        bgMusic.volume = 0.35;
        bgMusic.play().catch(err => console.log("Autoplay bloqueado:", err));
        musicStarted = true;
    }
}

document.addEventListener("click", startMusic);
document.addEventListener("keydown", startMusic);


// ==============================
// FUNDO ANIMADO (Canvas)
// ==============================
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
});

// Partículas coloridas estilo vaporwave
const particles = [];
for (let i = 0; i < 150; i++) {
    particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.2
    });
}

function drawBackground(time) {
    ctx.clearRect(0, 0, w, h);

    // Ondas fluidas horizontais
    for (let i = 0; i < h; i += 4) {
        let grad = ctx.createLinearGradient(0, i, w, i + 4);

        grad.addColorStop(0, `hsl(${(i + time * 0.08) % 360}, 80%, 55%)`);
        grad.addColorStop(1, `hsl(${(i + time * 0.08 + 60) % 360}, 80%, 55%)`);

        ctx.fillStyle = grad;

        ctx.beginPath();
        for (let x = 0; x < w; x += 5) {
            const y = i + Math.sin((x * 0.01) + (time * 0.003) + (i * 0.05)) * 10;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fill();
    }

    // Partículas brilhando
    particles.forEach(p => {
        ctx.fillStyle = `hsl(${(p.x + p.y + time * 0.08) % 360}, 75%, 65%)`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        p.y += p.speed;
        if (p.y > h) p.y = 0;
    });

    requestAnimationFrame(() => drawBackground(time + 1));
}

drawBackground(0);


// ==============================
// Hover nos apps (extra)
// ==============================
document.querySelectorAll(".accordion-header").forEach(app => {
    app.addEventListener("mouseenter", () => {
        app.style.transform = "scale(1.04)";
        app.style.transition = "0.25s";
    });

    app.addEventListener("mouseleave", () => {
        app.style.transform = "scale(1)";
    });
});
