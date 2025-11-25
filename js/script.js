// Relógio
function updateClock() {
  const clock = document.getElementById('clock');
  const now = new Date();
  let h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
  h = h<10?'0'+h:h; m=m<10?'0'+m:m; s=s<10?'0'+s:s;
  clock.textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// Accordion
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    const arrow = header.querySelector('.accordion-arrow');
    const isOpen = content.classList.contains('open');
    document.querySelectorAll('.accordion-content.open').forEach(c => {
      if(c !== content){ c.classList.remove('open'); c.previousElementSibling.querySelector('.accordion-arrow').classList.remove('open'); }
    });
    if(isOpen){ content.classList.remove('open'); arrow.classList.remove('open'); }
    else{ content.classList.add('open'); arrow.classList.add('open'); }
  });
  header.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){ e.preventDefault(); header.click(); } });
});

// Fundo animado
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

let mouse = {x: w/2, y: h/2};
window.addEventListener('resize', () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; });
window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

const particles = [];
for(let i=0;i<150;i++){
  particles.push({x:Math.random()*w, y:Math.random()*h, r:Math.random()*2+1, speed:Math.random()*0.5+0.2});
}

function drawFluid(time){
  ctx.clearRect(0,0,w,h);

  // Ondas simples
  for(let i=0;i<h;i+=4){
    const grad=ctx.createLinearGradient(0,i,w,i+4);
    const color1=`hsl(${(i+time*0.05)%360},80%,50%)`;
    const color2=`hsl(${(i+time*0.05+40)%360},80%,50%)`;
    grad.addColorStop(0,color1);
    grad.addColorStop(1,color2);
    ctx.fillStyle=grad;
    ctx.beginPath();
    for(let x=0;x<w;x+=5){
      const y=i+Math.sin((x*0.01)+(time*0.002)+(i*0.05))*10;
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
    if(p.y > h) p.y = 0;
  });

  requestAnimationFrame(() => drawFluid(time+1));
}
drawFluid(0);
