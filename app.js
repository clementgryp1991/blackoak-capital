(()=>{
if('scrollRestoration' in history)history.scrollRestoration='manual';if(!location.hash)window.scrollTo(0,0);
const D=document,H=D.documentElement,page=D.body.dataset.page||'home';
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const NAV=[['residential.html','Residential','residential'],['commercial.html','Commercial','commercial'],['over.html','Over Blackoak','over'],['heritage.html','Heritage','heritage'],['contact.html','Contact','contact']];
const logo='<span>Blackoak</span><span>Capital</span>';const sub={residential:'Residential',commercial:'Commercial'}[page];const hlogo=logo+(sub?`<small>${sub}</small>`:'');
D.getElementById('hdr').innerHTML=`<header class="nav ${D.body.dataset.dark?'dark':''}"><a href="index.html" class="logo mag" aria-label="Blackoak Capital home">${hlogo}</a>
<nav class="links">${NAV.map(n=>`<a class="ul ${n[2]==page?'on':''}" href="${n[0]}">${n[1]}</a>`).join('')}</nav>
<a class="pa ul" href="contact.html">Private access →</a><div class="lang"><a class="on" href="#">NL</a><a href="#" title="Binnenkort">FR</a><a href="#" title="Binnenkort">EN</a></div>
<button class="burger" aria-label="Menu"><i></i><i></i></button></header>
<div class="overlay"><a class="big" href="index.html">Home</a>${NAV.map(n=>`<a class="big" href="${n[0]}">${n[1]}</a>`).join('')}<p class="lbl">Private access → &nbsp; · &nbsp; NL / FR / EN</p></div>
<div class="curtain"></div><div class="cur"></div><div class="ring"><b>BEKIJK</b></div><div class="toast">Bedankt. We nemen snel contact met je op.</div>`;
D.getElementById('ftr').outerHTML=`<footer><div class="top"><a href="index.html" class="logo caps">${logo}</a><div class="fl">${NAV.map(n=>`<a class="ul" href="${n[0]}">${n[1]}</a>`).join('')}<a class="ul" href="contact.html">Private access</a></div><p class="lbl meta">Real estate.<br>Long term value.</p><p class="lbl meta">Sparrendreef 120 bus 21<br>8300 Knokke-Heist<br><a class="ul" href="mailto:clement.gryp@black-oak.be">clement.gryp@black-oak.be</a></p></div><div class="big">Blackoak</div><div class="bot"><span>© 2026 Black Oak Capital BV · BTW BE 0730.923.011 · Est. 2019</span><span>Vastgoed. Voor generaties.</span></div></footer>`;
const nav=D.querySelector('.nav');
D.querySelector('.burger').onclick=()=>D.body.classList.toggle('menu-open');
const onS=()=>nav.classList.toggle('scrolled',scrollY>60);addEventListener('scroll',onS,{passive:true});onS();
// form
const f=D.getElementById('cf');if(f){const T0=Date.now(),msg=D.getElementById('cf-msg');let sent=0;D.getElementById('ts').value=T0;f.onsubmit=async e=>{e.preventDefault();const say=x=>{msg.textContent=x};const d=new FormData(f);
 if(d.get('_honey')){f.reset();return}
 if(Date.now()-T0<4000){say('Even geduld: neem rustig de tijd om het formulier in te vullen.');return}
 if(sent>=2){say('Je bericht is al verstuurd. Dank je.');return}
 const n=(d.get('Naam')||'').trim(),em=(d.get('E-mail')||'').trim(),m=(d.get('Bericht')||'').trim();
 if(n.length<2||!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)||m.length<10){say('Vul je naam, een geldig e-mailadres en een bericht (minstens 10 tekens) in.');return}
 if((m.match(/https?:\/\//g)||[]).length>2){say('Je bericht bevat te veel links.');return}
 d.delete('_ts');d.delete('_honey');const b=f.querySelector('button');b.disabled=true;say('Bezig met versturen…');
 try{const r=await fetch('https://formsubmit.co/ajax/clement.gryp@black-oak.be',{method:'POST',headers:{Accept:'application/json'},body:d});const j=await r.json().catch(()=>({}));
  if(r.ok&&String(j.success)!=='false'){sent++;f.reset();say('');const t=D.querySelector('.toast');t.classList.add('on');setTimeout(()=>t.classList.remove('on'),3800)}else say('Versturen lukte niet. Mail ons gerust rechtstreeks: clement.gryp@black-oak.be')}
 catch(_){say('Versturen lukte niet. Mail ons gerust rechtstreeks: clement.gryp@black-oak.be')}b.disabled=false}};

// signature finish
D.querySelectorAll('.sf').forEach(sf=>{const z=sf.querySelector('.sf-zoom'),nm=sf.querySelector('.sf-name'),lp=sf.querySelector('.sf-loupe');const set=(m,n)=>{z.style.backgroundImage=`url(img/mat/${m}.jpg)`;nm.textContent=n;sf.querySelector('.sf-bg').style.backgroundImage=`url(img/mat/${m}.jpg)`;sf.querySelectorAll('[data-m]').forEach(e=>e.classList.toggle('on',e.dataset.m==m))};
 sf.querySelectorAll('[data-m]').forEach(e=>{e.addEventListener('mouseenter',()=>set(e.dataset.m,e.dataset.n));e.addEventListener('click',()=>set(e.dataset.m,e.dataset.n))});
 const mv=e=>{const R=lp.getBoundingClientRect(),p=e.touches?e.touches[0]:e;z.style.backgroundPosition=`${(p.clientX-R.left)/R.width*100}% ${(p.clientY-R.top)/R.height*100}%`};lp.addEventListener('mousemove',mv);lp.addEventListener('touchmove',mv,{passive:true});lp.addEventListener('click',()=>z.style.backgroundSize=z.style.backgroundSize=='320%'?'':'320%')});
// archive: show only with photos
D.querySelectorAll('.arch-sec').forEach(s=>{if(s.querySelector('.g-it'))s.hidden=false});
// lightbox
const lb=D.querySelector('.lb');if(lb){const li=lb.querySelector('img'),lc=lb.querySelector('p');D.querySelectorAll('.g-it').forEach(g=>g.onclick=()=>{li.src=g.dataset.src;li.alt=g.dataset.cap;lc.textContent=g.dataset.cap;lb.classList.add('on')});const cl=()=>lb.classList.remove('on');lb.onclick=e=>{if(e.target!==li)cl()};addEventListener('keydown',e=>{if(e.key=='Escape')cl()})}
// sepia -> colour
const sio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('clr'),500);sio.unobserve(e.target)}}),{threshold:.45});D.querySelectorAll('[data-sepia]').forEach(i=>sio.observe(i));
if(!window.gsap||RM){H.classList.remove('js');D.querySelector('.pre')?.remove();return}
gsap.registerPlugin(ScrollTrigger);ScrollTrigger.clearScrollMemory&&ScrollTrigger.clearScrollMemory('manual');
// lenis
let lenis;if(window.Lenis){lenis=new Lenis({lerp:.09});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0)}
const top0=()=>{if(location.hash)return;if(lenis)lenis.scrollTo(0,{immediate:true,force:true});window.scrollTo(0,0);onS()};top0();addEventListener('load',()=>{top0();setTimeout(top0,50)});addEventListener('beforeunload',()=>window.scrollTo(0,0));
// split headings into masked lines (per word)
D.querySelectorAll('[data-split]').forEach(el=>{el.innerHTML=el.innerHTML.split('<br>').map(l=>`<span class="line-m">${l.trim().split(' ').map(w=>`<span>${w}</span>`).join(' ')}</span>`).join('')});
const intro=()=>{
 gsap.utils.toArray('[data-split]').forEach(el=>{const w=el.querySelectorAll('.line-m>span');gsap.from(w,{yPercent:110,duration:1.2,ease:'expo.out',stagger:.06,scrollTrigger:{trigger:el,start:'top 88%'}})});
 gsap.utils.toArray('.rv').forEach(el=>gsap.to(el,{opacity:1,y:0,duration:1.1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%'}}));
 gsap.utils.toArray('.par').forEach(el=>gsap.fromTo(el,{yPercent:-6},{yPercent:6,ease:'none',scrollTrigger:{trigger:el.parentNode,start:'top bottom',end:'bottom top',scrub:true}}));
 const hb=D.querySelector('.hero .bg');if(hb){gsap.from(hb,{scale:1.18,duration:2.4,ease:'expo.out'});gsap.to(hb,{yPercent:14,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});gsap.to('.hero .inner',{yPercent:-40,opacity:0,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}})}
 D.querySelectorAll('.split .media img').forEach(i=>gsap.from(i,{scale:1.2,duration:2,ease:'expo.out'}));
 // sticky frame shrink
 D.querySelectorAll('.sticky-wrap').forEach(w=>{const fr=w.querySelector('.frame');gsap.fromTo(fr,{clipPath:'inset(0% 0% 0% 0% round 0px)'},{clipPath:'inset(12% 18% 12% 18% round 6px)',ease:'none',scrollTrigger:{trigger:w,start:'top top',end:'bottom bottom',scrub:true}});gsap.fromTo(w.querySelector('.cap'),{opacity:0,y:40},{opacity:1,y:0,scrollTrigger:{trigger:w,start:'30% top',end:'60% top',scrub:true}})});
 // statement word reveal
 D.querySelectorAll('.statement').forEach(s=>{s.innerHTML=s.textContent.trim().split(/\s+/).map(w=>`<span class="w">${w}</span>`).join(' ');gsap.to(s.querySelectorAll('.w'),{opacity:1,stagger:.1,ease:'none',scrollTrigger:{trigger:s,start:'top 80%',end:'bottom 45%',scrub:true}})});
 // counters
 D.querySelectorAll('[data-count]').forEach(el=>{const o={v:+el.dataset.from||0};gsap.to(o,{v:+el.dataset.count,duration:2,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 90%'},onUpdate:()=>el.textContent=Math.round(o.v)})});
 D.querySelectorAll('.sf-bg').forEach(b=>gsap.fromTo(b,{yPercent:-6},{yPercent:6,ease:'none',scrollTrigger:{trigger:b.parentNode,start:'top bottom',end:'bottom top',scrub:true}}));
 // timeline line
 D.querySelectorAll('.timeline').forEach(T=>{const tl=T.querySelector('.line i');if(tl)gsap.to(tl,{scaleY:1,ease:'none',scrollTrigger:{trigger:T,start:'top 70%',end:'bottom 60%',scrub:true}})});
};
// preloader (once per session)
const pre=D.querySelector('.pre');
if(pre&&!sessionStorage.bo){sessionStorage.bo=1;const c={v:0},cnt=pre.querySelector('.cnt');
 gsap.timeline({onComplete:()=>{pre.remove();top0();intro();ScrollTrigger.refresh()}})
 .to(pre.querySelectorAll('.logo span'),{y:0,duration:1,ease:'expo.out',stagger:.1})
 .to(c,{v:100,duration:1.2,ease:'power2.inOut',onUpdate:()=>{cnt.textContent=String(Math.round(c.v)).padStart(3,'0');pre.querySelector('.bar').style.width=c.v+'%'}},0)
 .to(pre,{yPercent:-100,duration:.9,ease:'expo.inOut'},'+=.15');
}else{pre?.remove();const cu=D.querySelector('.curtain');gsap.set(cu,{yPercent:0,visibility:'visible'});gsap.to(cu,{yPercent:-100,duration:.9,ease:'expo.inOut',onStart:()=>{top0();intro()},onComplete:()=>gsap.set(cu,{yPercent:100,visibility:'hidden'})})}
H.classList.remove('js');D.querySelectorAll('.rv').forEach(e=>gsap.set(e,{opacity:0,y:40}));
// page transitions
D.querySelectorAll('a[href$=".html"]').forEach(a=>a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey)return;e.preventDefault();D.body.classList.remove('menu-open');const cu=D.querySelector('.curtain');gsap.fromTo(cu,{yPercent:100,visibility:'visible'},{yPercent:0,duration:.7,ease:'expo.inOut',onComplete:()=>location.href=a.getAttribute('href')})}));
addEventListener('pageshow',e=>{if(e.persisted)gsap.set('.curtain',{yPercent:100,visibility:'hidden'})});
// cursor
if(matchMedia('(hover:hover) and (min-width:901px)').matches){const c=D.querySelector('.cur'),r=D.querySelector('.ring');const xc=gsap.quickTo(c,'x',{duration:.08}),yc=gsap.quickTo(c,'y',{duration:.08}),xr=gsap.quickTo(r,'x',{duration:.45,ease:'power3'}),yr=gsap.quickTo(r,'y',{duration:.45,ease:'power3'});
 addEventListener('mousemove',e=>{xc(e.clientX);yc(e.clientY);xr(e.clientX);yr(e.clientY)});
 D.querySelectorAll('.card').forEach(k=>{k.onmouseenter=()=>r.classList.add('big');k.onmouseleave=()=>r.classList.remove('big')});
 // magnetic
 D.querySelectorAll('.btn,.mag').forEach(b=>{b.addEventListener('mousemove',e=>{const R=b.getBoundingClientRect();gsap.to(b,{x:(e.clientX-R.left-R.width/2)*.3,y:(e.clientY-R.top-R.height/2)*.4,duration:.6,ease:'power3'})});b.addEventListener('mouseleave',()=>gsap.to(b,{x:0,y:0,duration:.8,ease:'elastic.out(1,.4)'}))});
}
})();
