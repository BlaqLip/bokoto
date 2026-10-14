(function () {
  function initTheme() {
    const light=document.getElementById('btn-light'),dark=document.getElementById('btn-dark');
    function set(theme){document.body.classList.toggle('dark',theme==='dark');document.body.classList.toggle('light',theme!=='dark');[[light,'light'],[dark,'dark']].forEach(([b,t])=>{if(b){b.classList.toggle('active',theme===t);b.setAttribute('aria-pressed',String(theme===t));}});try{localStorage.setItem('theme',theme);}catch{}}
    let saved;try{saved=localStorage.getItem('theme');}catch{}
    set(saved==='dark'?'dark':'light');light?.addEventListener('click',()=>set('light'));dark?.addEventListener('click',()=>set('dark'));
  }
  function initGallery(items){
    const host=document.getElementById('slidesContainer'),dots=document.getElementById('dotsContainer'),count=document.getElementById('galleryCount');
    if(!host||!items?.length)return;
    let current=0;host.replaceChildren();dots?.replaceChildren();
    const slides=items.map((item,i)=>{const slide=document.createElement('div');slide.className='slide';const image=document.createElement('img');image.src=item.img;image.alt=item.title;image.className='slide-img';image.loading=i===0?'eager':'lazy';image.decoding='async';const caption=document.createElement('div');caption.className='slide-caption';const title=document.createElement('h2');title.textContent=item.title;const desc=document.createElement('p');desc.textContent=item.desc;caption.append(title,desc);slide.append(image,caption);host.append(slide);return slide;});
    const buttons=items.map((item,i)=>{const button=document.createElement('button');button.type='button';button.className='dot';button.setAttribute('aria-label','Photograph '+(i+1)+': '+item.title);button.addEventListener('click',()=>show(i));dots?.append(button);return button;});
    function show(i){current=(i+items.length)%items.length;slides.forEach((slide,n)=>{slide.classList.toggle('active',n===current);slide.setAttribute('aria-hidden',String(n!==current));});buttons.forEach((button,n)=>{button.classList.toggle('active',n===current);button.setAttribute('aria-pressed',String(n===current));});if(count)count.textContent='Photograph '+(current+1)+' of '+items.length;}
    document.getElementById('prevArrow')?.addEventListener('click',()=>show(current-1));document.getElementById('nextArrow')?.addEventListener('click',()=>show(current+1));
    host.closest('.slider-container')?.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();show(current+(e.key==='ArrowLeft'?-1:1));}});
    let start;host.addEventListener('touchstart',e=>{start={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY};},{passive:true});host.addEventListener('touchend',e=>{if(!start)return;const dx=start.x-e.changedTouches[0].clientX,dy=start.y-e.changedTouches[0].clientY;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))show(current+(dx>0?1:-1));start=null;},{passive:true});show(0);
  }
  window.Bokoto={initTheme,initGallery};document.addEventListener('DOMContentLoaded',initTheme);
})();
