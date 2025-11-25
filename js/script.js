/* ===== CLOCK ===== */
function updateClock() {
  const clock = document.getElementById('clock');
  const now = new Date();
  let h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
  h = h < 10 ? '0'+h : h;
  m = m < 10 ? '0'+m : m;
  s = s < 10 ? '0'+s : s;
  clock.textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

/* ===== ACCORDION ===== */
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    const arrow = header.querySelector('.accordion-arrow');
    const isOpen = content.classList.contains('open');

    // Fecha todos os outros
    document.querySelectorAll('.accordion-content.open').forEach(c => {
      if (c !== content) {
        c.classList.remove('open');
        c.previousElementSibling.querySelector('.accordion-arrow').classList.remove('open');
      }
    });

    // Alterna o estado
    if (isOpen) {
      content.classList.remove('open');
      arrow.classList.remove('open');
    } else {
      content.classList.add('open');
      arrow.classList.add('open');
    }
  });
  // Suporte a teclado
  header.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      header.click();
    }
  });
});

/* ===== CANVAS DE FUNDO ===== */
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

let mouse = { x: w/2, y: h/2 };
window.addEventListener('resize', () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; });
window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

const particles = [];
for(let i=0;i<150;i++){
  particles.push({
    x: Math.random()*w,
    y: Math.random()*h,
    r: Math.random()*2+1,
    speed: Math.random()*0.5+0.2
  });
}

function drawBackground(time){
  ctx.clearRect(0,0,w,h);

  // Ondas simples tipo fluid
  for(let i=0;i<h;i+=4){
    const grad = ctx.createLinearGradient(0,i,w,i+4);
    const color1 = `hsl(${(i+time*0.05)%360},80%,50%)`;
    const color2 = `hsl(${(i+time*0.05+40)%360},80%,50%)`;
    grad.addColorStop(0,color1);
    grad.addColorStop(1,color2);
    ctx.fillStyle = grad;
    ctx.beginPath();
    for(let x=0;x<w;x+=5){
      const y = i + Math.sin((x*0.01) + (time*0.002) + (i*0.05)) * 10;
      ctx.lineTo(x,y);
    }
    ctx.lineTo(w,h);
    ctx.lineTo(0,h);
    ctx.closePath();
    ctx.fill();
  }

  // Partículas
  particles.forEach(p => {
    const hue = (p.x + p.y + time*0.05) % 360;
    ctx.fillStyle = `hsl(${hue},80%,60%)`;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();

    p.y += p.speed;
    if(p.y>h) p.y = 0;
  });

  requestAnimationFrame(()=>drawBackground(time+1));
}
drawBackground(0);

/* ===== MÚSICA (MICE ON VENUS) ===== */
// Container já no HTML: <div id="music-container"></div>
const musicContainer = document.getElementById('music-container');

const audio = new Audio('musicas/mice-on-venus.mp3'); // caminho da música
audio.loop = true;
audio.volume = 0.5;
audio.play().catch(()=>{}); // autoplay pode ser bloqueado dependendo do navegador

const albumImg = document.createElement('img');
albumImg.src = 'musicas/mice-on-venus-cover.png'; // logo do álbum
albumImg.alt = 'Mice on Venus';

const musicTitle = document.createElement('span');
musicTitle.textContent = 'Mice on Venus';

musicContainer.appendChild(albumImg);
musicContainer.appendChild(musicTitle);
