// Clock
function updateClock(){
  const clock = document.getElementById('clock');
  const now = new Date();
  let h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
  h = h<10?'0'+h:h; m = m<10?'0'+m:m; s = s<10?'0'+s:s;
  clock.textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock,1000); updateClock();

// Accordion
document.querySelectorAll('.accordion-header').forEach(header=>{
  header.addEventListener('click',()=>{
    const content = header.nextElementSibling;
    const arrow = header.querySelector('.accordion-arrow');
    const isOpen = content.classList.contains('open');
    document.querySelectorAll('.accordion-content.open').forEach(c=>{
      if(c!==content){ 
        c.classList.remove('open'); 
        c.previousElementSibling.querySelector('.accordion-arrow').classList.remove('open'); 
      }
    });
    if(isOpen){ content.classList.remove('open'); arrow.classList.remove('open'); }
    else{ content.classList.add('open'); arrow.classList.add('open'); }
  });
  header.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); header.click(); } });
});

// Fundo animado
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

window.addEventListener('resize',()=>{ w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; });

const particles=[];
for(let i=0;i<100;i++){
  particles.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*2+1,speed:Math.random()*0.5+0.2, hue: Math.random()*360});
}

function draw(time){
  ctx.fillStyle = '#000';
  ctx.fillRect(0,0,w,h);

  particles.forEach(p=>{
    ctx.fillStyle = `hsl(${(p.hue + time*0.1)%360},80%,60%)`;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();

    p.y += p.speed;
    if(p.y>h){ p.y=0; p.x=Math.random()*w; }
  });

  requestAnimationFrame(()=>draw(time+1));
}
draw(0);

// Música
const music = new Audio('mice_on_venus.mp3'); // coloque o arquivo na mesma pasta
music.loop = true;
music.volume = 0.4;
music.play().catch(()=>{}); // evita erro se não houver interação
