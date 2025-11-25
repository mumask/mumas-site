const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let paused = false;
const pauseBtn = document.getElementById('pauseBtn');
pauseBtn.addEventListener('click', () => {
    paused = !paused;
    pauseBtn.textContent = paused ? 'Resume' : 'Pause';
});

// Pontos do fundo animado
const points = [];
const numPointsX = 25;
const numPointsY = 15;
const spacingX = width / (numPointsX - 1);
const spacingY = height / (numPointsY - 1);

// Inicializa os pontos
for (let y = 0; y < numPointsY; y++) {
    for (let x = 0; x < numPointsX; x++) {
        points.push({
            x: x * spacingX,
            y: y * spacingY,
            baseX: x * spacingX,
            baseY: y * spacingY,
            angle: Math.random() * Math.PI * 2,
            speed: 0.01 + Math.random() * 0.02,
            amplitude: 5 + Math.random() * 10
        });
    }
}

// Desenha linhas conectando os pontos
function drawLines() {
    for (let y = 0; y < numPointsY - 1; y++) {
        for (let x = 0; x < numPointsX - 1; x++) {
            const p1 = points[y * numPointsX + x];
            const p2 = points[y * numPointsX + x + 1];
            const p3 = points[(y + 1) * numPointsX + x];

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(0,150,255,0.4)';
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.strokeStyle = 'rgba(0,150,255,0.4)';
            ctx.stroke();
        }
    }
}

// Atualiza posição dos pontos
function updatePoints() {
    points.forEach(p => {
        p.angle += p.speed;
        p.x = p.baseX + Math.sin(p.angle) * p.amplitude;
        p.y = p.baseY + Math.cos(p.angle) * p.amplitude;
    });
}

function animate() {
    if (!paused) {
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(0, 0, width, height);

        updatePoints();
        drawLines();
    }

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});
