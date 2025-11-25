// ===== Clock =====
function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    let h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
    h = h < 10 ? '0'+h : h;
    m = m < 10 ? '0'+m : m;
    s = s < 10 ? '0'+s : s;
    clock.textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock,1000);
updateClock();

// ===== Accordion =====
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
  header.addEventListener('keydown', e=>{
    if(e.key==='Enter'||e.key===' '){ e.preventDefault(); header.click(); }
  });
});

// ===== Canvas Background =====
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

window.addEventListener('resize',()=>{ w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; });

const particles = [];
for(let i=0;i<150;i++){
  particles.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*2+1,speed:Math.random()*0.5+0.2});
}

function drawFluid(time){
  ctx.clearRect(0,0,w,h);
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

  particles.forEach(p=>{
    const hue=(p.x+p.y+time*0.05)%360;
    ctx.fillStyle=`hsl(${hue},80%,60%)`;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
    p.y+=p.speed;
    if(p.y>h) p.y=0;
  });
  requestAnimationFrame(()=>drawFluid(time+1));
}
drawFluid(0);

// ===== Música Mice on Venus =====
const audio = new Audio('https://archive.org/download/MiceOnVenus/MiceOnVenus.mp3');
audio.loop = true; audio.volume = 0.3;
audio.play().catch(e=>console.log("Música não pôde ser reproduzida automaticamente:",e));

const musicContainer = document.createElement('div');
musicContainer.id = 'music-container';
musicContainer.style = 'display:flex; align-items:center; gap:12px; position:fixed; bottom:16px; left:16px; background:rgba(0,0,0,0.7); padding:8px 12px; border-radius:10px; color:#fff; font-family:Arial,sans-serif;';

const musicCover = document.createElement('img');
musicCover.id = 'music-cover';
musicCover.src = 'https://i.ytimg.com/vi/T5-faDLv1Vs/hqdefault.jpg';
musicCover.style = 'width:40px; height:40px; border-radius:6px; object-fit:cover;';
musicContainer.appendChild(musicCover);

const musicTitle = document.createElement('span');
musicTitle.id = 'music-title';
musicTitle.textContent = 'Mice on Venus - C418';
musicContainer.appendChild(musicTitle);

document.body.appendChild(musicContainer);

// ===== Hover Animation nos Apps =====
document.querySelectorAll('.accordion-header').forEach(header=>{
  header.addEventListener('mouseenter', ()=>{
    const img = header.querySelector('img');
    img.style.transform = 'scale(1.2)';
    img.style.filter = 'drop-shadow(0 0 8px #ff8a00)';
  });
  header.addEventListener('mouseleave', ()=>{
    const img = header.querySelector('img');
    img.style.transform = 'scale(1)';
    img.style.filter = 'drop-shadow(0 0 1px black)';
  });
});
