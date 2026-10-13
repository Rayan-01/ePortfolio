'use strict';
const projects = [
 {id:'cleaning',title:'Dog Waste Cleaning Robot',category:'Autonomous robotics',filters:['robotics','vision'],art:'robot',caption:'PERCEPTION → NAVIGATION → CLEANING',short:'YOLO detection, depth-guided approach, ROS 2 navigation, and coordinated cleaning control.',tech:['ROS 2','Nav2','YOLO26n','Jetson'],summary:'A cleaning robot that combines visual detection, autonomous navigation, and a coordinated cleaning sequence.',details:['Trained YOLO26n on a custom image dataset and integrated detection on NVIDIA Jetson with OAK-D Pro colour and depth streams.','Integrated ROS 2/Nav2 waypoint navigation and A* planning with RPLidar S2 localization, wheel odometry, and BNO055 IMU heading fusion.','Implemented depth-guided target approach and brush-control sequences.','Built a web dashboard for camera/depth views, manual driving, saved waypoints, and RPM/IMU telemetry.'],insight:'This project brings model training, embedded hardware, sensor integration, navigation, and a usable control interface into one system.',links:[]},
 {id:'ultrasound',title:'Breast Ultrasound Lesion Classification',category:'Deep learning research',filters:['research','vision'],art:'ultrasound',caption:'REGIONAL VIEWS / SHARED ENCODER',short:'A comparison of full-image and mask-derived inputs for benign and malignant lesion classification.',tech:['PyTorch','EfficientNet-B0','Cross-validation'],summary:'Co-authored research examining how mask-derived regional views affect breast ultrasound lesion classification across three datasets.',details:['Compared full-image and regional input representations using a common EfficientNet-B0 framework.','Used BUS-BRA for source development and evaluated on BUSI-WHU and BUS-UCLM.','Evaluated representations with grouped cross-validation, ablation studies, calibration, and bootstrap uncertainty analysis.'],insight:'Regional inputs improved classification on the source dataset, but the benefit was not consistent across the two external datasets. Those datasets were inspected during development, and the task used already identified lesions with supplied masks.',links:[]},
 {id:'clustering',title:'LLM & Human–AI Research Clustering',category:'NLP & unsupervised learning',filters:['research'],art:'network',caption:'LANGUAGE MODELS / HUMAN–AI RESEARCH',short:'Using unsupervised learning to identify shared themes in language-model and human–AI interaction research.',tech:['TF-IDF','LSA','UMAP','K-means','HDBSCAN'],summary:'Co-authored an unsupervised analysis of arXiv abstracts to explore shared themes across LLM and human–AI interaction research.',details:['Built a balanced corpus of language-model and human–AI interaction papers, excluding records retrieved in both searches.','Combined TF-IDF, LSA, and UMAP with K-means and HDBSCAN clustering.','Evaluated stability and coherence and compared representation sensitivity using Doc2Vec.','Mapped 14 themes, including five shared clusters under a 70% domain-dominance threshold.'],insight:'Identified shared research themes across the two fields. The number of shared clusters depends on the chosen dominance threshold; thematic similarity alone does not demonstrate knowledge transfer.',links:[]},
 {id:'factory',title:'Autonomous Factory Robot',category:'Robotics & automation',filters:['robotics'],art:'factory',caption:'MAP / LOCALIZE / MOVE',short:'SLAM-based navigation and mobile control for industrial material transport.',tech:['ROS','Raspberry Pi','SLAM'],summary:'A mobile robot designed for industrial material transport with autonomous navigation and a manual-control option.',details:['Developed a ROS/Raspberry Pi system with SLAM navigation and real-time obstacle avoidance.','Implemented autonomous and manual control modes through a mobile app.','Added real-time monitoring for operational visibility.'],insight:'The project combines mapping, navigation, and an interface for operator control.',links:[]},
 {id:'crops',title:'Aerial Crop Yield Prediction',category:'Aerial computer vision',filters:['vision'],art:'crop',caption:'AERIAL IMAGERY / PANICLE DETECTION',short:'Using custom aerial datasets and YOLO detection to support rice yield prediction.',tech:['Drones','YOLO','Custom datasets'],summary:'A drone-based computer vision project focused on detecting rice panicles from aerial field footage.',details:['Captured aerial footage of rice fields and created a custom dataset.','Trained a YOLO model to detect rice panicles and support crop yield prediction.'],insight:'Connects aerial data collection with an agricultural computer vision task.',links:[]},
 {id:'drone',title:'Drone-Based Weapon Detection',category:'Real-time computer vision',filters:['vision'],art:'drone',caption:'LIVE FOOTAGE / CLOUD INFERENCE',short:'Live aerial video connected to cloud-deployed YOLO object detection.',tech:['YOLO','Cloud inference','Live streaming'],summary:'A drone-based system for real-time weapon detection in aerial footage.',details:['Built a computer vision system using YOLO object detection.','Deployed inference in the cloud and connected it to live video streams captured by a drone.'],insight:'The project connects an aerial video source with a real-time inference pipeline.',links:[]},
 {id:'assistant',title:'Smart Assistive System',category:'Assistive technology',filters:['robotics','vision','software'],art:'assist',caption:'SEE / INTERPRET / SPEAK',short:'Smart glasses and a smart stick combining perception, speech, obstacle alerts, and GPS.',tech:['Python','YOLO','Flask','Flutter','GPS'],summary:'Smart Blind Assistant: an assistive system combining smart glasses and a smart stick for people with visual impairments.',details:['Used YOLO to detect objects and sent object labels and confidence scores to a Flask API.','Developed a Flutter Android app that converted detection results to speech through Bluetooth earphones.','Integrated smart-stick buzzer alerts for obstacles within 30 cm and GPS location updates to a local server.'],insight:'Brings together computer vision, a backend interface, a mobile application, and embedded sensing.',links:[]},
 {id:'home',title:'IoT Smart Home System',category:'Embedded systems & interfaces',filters:['software'],art:'home',caption:'SENSING / CONTROL / MONITORING',short:'Connected home automation with environmental alerts and a Flutter control interface.',tech:['Arduino','NodeMCU','Flutter'],summary:'A smart home system designed around appliance control, access management, and environmental sensing.',details:['Integrated password-protected door access, gas and fire detection, buzzer alerts, and soil-moisture-based watering.','Built a Flutter app for remote appliance control and real-time safety and door-status updates.'],insight:'Combines embedded control logic with a mobile interface for everyday interaction.',links:[]},
 {id:'crowdfunding',title:'Crowdfunding Web Application',category:'Web application',filters:['software'],art:'web',caption:'PHP / MYSQL / WEB',short:'A web-based crowdfunding application backed by a relational database.',tech:['PHP','MySQL','HTML','CSS'],summary:'A web-based crowdfunding platform built using PHP and MySQL.',details:['Developed the platform with a PHP backend and MySQL database.','Created the user interface with HTML and CSS.'],insight:'A software project supporting the backend and interface skills used across my engineering work.',links:[]}
];

function svgArt(type){
 const open='<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g fill="none" stroke="#91b9b3" stroke-width="1.3">';
 const close='</g></svg>';
 const text=(x,y,t,fill='#91b9b3',size=9)=>`<text x="${x}" y="${y}" fill="${fill}" stroke="none" font-family="Segoe UI,Arial,sans-serif" font-size="${size}" letter-spacing="1">${t}</text>`;
 if(type==='robot')return open+'<path d="M40 175H320M40 175V65" stroke="#354e55" stroke-dasharray="3 5"/><rect x="142" y="103" width="75" height="50" rx="9" fill="#263f41"/><rect x="133" y="102" width="10" height="52" rx="4"/><rect x="217" y="102" width="10" height="52" rx="4"/><circle cx="178" cy="118" r="5"/><path d="M178 107V94M159 89Q178 71 197 89M146 76Q178 46 210 76"/><path d="M227 128H275V88H312" stroke="#c1f66c" stroke-width="2" stroke-dasharray="4 5"/><circle cx="312" cy="88" r="6" fill="#c1f66c" stroke="none"/><path d="M165 155V173M180 155V173M195 155V173"/>'+text(45,195,'SENSOR → CONTROL → ACTION')+close;
 if(type==='ultrasound')return open+'<rect x="45" y="67" width="117" height="104" rx="3"/><path d="M60 80L147 80L103 158Z" fill="#29434b" stroke="#5e7a7d"/><ellipse cx="104" cy="121" rx="22" ry="15" stroke="#c1f66c" stroke-width="2"/><ellipse cx="104" cy="121" rx="32" ry="25" stroke-dasharray="3 4"/><path d="M174 120H212M204 114L212 120L204 126"/><rect x="226" y="80" width="85" height="26" rx="3"/><rect x="226" y="118" width="85" height="26" rx="3"/><path d="M268 144V160"/>'+text(233,97,'GLOBAL',undefined,8)+text(233,135,'REGIONAL',undefined,8)+text(224,182,'SHARED ENCODER',undefined,8)+close;
 if(type==='network'){
  let s='';const pts=[];for(let k=0;k<28;k++){const group=k%4;const a=k*2.399;pts.push([83+(group%2)*153+Math.cos(a)*(18+k%5*6),86+Math.floor(group/2)*62+Math.sin(a)*(15+k%4*5)]);}
  pts.forEach(([x,y],i)=>{if(i<24){const q=pts[(i+4)%28];s+=`<path d="M${x} ${y}L${q[0]} ${q[1]}" stroke="#75a69e" opacity=".45"/>`;}});
  s+='<path d="M110 104L212 135M114 145L213 92" stroke="#c1f66c" stroke-dasharray="3 4"/>';
  pts.forEach(([x,y],i)=>s+=`<circle cx="${x}" cy="${y}" r="${3+i%3}" fill="${i%5===0?'#c1f66c':'#91bdac'}" stroke="none"/>`);
  return open+s+text(65,200,'LLM')+text(225,200,'HUMAN–AI')+close;
 }
 if(type==='factory')return open+'<path d="M44 170V68H310V170H44Z"/><path d="M70 68V105H126V68M195 68V116H240V68M44 137H95V170M264 170V136H310" stroke-width="5"/><path d="M72 153H145V112H165V142H214V150H286" stroke="#c1f66c" stroke-width="2" stroke-dasharray="4 5"/><rect x="61" y="142" width="21" height="21" rx="5" fill="#98c78b"/><circle cx="286" cy="150" r="6" fill="#c1f66c" stroke="none"/>'+text(44,196,'SLAM / OBSTACLE AVOIDANCE',undefined,8)+close;
 if(type==='crop'){
  let s='<path d="M55 80L287 67L318 171L39 177Z" fill="#233e36" stroke="#62897a"/>';
  for(let i=0;i<8;i++)s+=`<path d="M${55+i*30} ${80-i*1.7}L${39+i*35} ${177-i*.75}" stroke="#3e6456"/>`;
  [[103,115],[156,145],[217,110],[267,153]].forEach(([x,y])=>s+=`<rect x="${x-8}" y="${y-8}" width="16" height="16" stroke="#c1f66c"/><path d="M${x} ${y+4}V${y-5}M${x} ${y}L${x-3} ${y-3}M${x} ${y-2}L${x+3} ${y-5}"/>`);
  return open+s+text(59,202,'CUSTOM AERIAL DATASET',undefined,8)+close;
 }
 if(type==='drone')return open+'<path d="M107 84L151 115L107 145M204 84L160 115L204 145" stroke-width="3"/><ellipse cx="107" cy="84" rx="20" ry="8"/><ellipse cx="107" cy="145" rx="20" ry="8"/><ellipse cx="204" cy="84" rx="20" ry="8"/><ellipse cx="204" cy="145" rx="20" ry="8"/><rect x="142" y="101" width="26" height="27" rx="6" fill="#2a4949"/><path d="M217 114H248" stroke-dasharray="3 4"/><path d="M254 114Q250 100 263 99Q269 82 283 96Q300 95 299 111Q313 121 299 128H268Q251 129 254 114Z" stroke="#c1f66c"/>'+text(242,164,'INFERENCE',undefined,8)+close;
 if(type==='assist')return open+'<rect x="64" y="97" width="72" height="46" rx="16"/><rect x="162" y="97" width="72" height="46" rx="16"/><path d="M136 113Q149 103 162 113M64 112L52 100M234 112L246 100"/><rect x="169" y="105" width="58" height="33" stroke="#c1f66c" stroke-dasharray="3 3"/><path d="M262 105Q280 119 262 133M274 94Q305 119 274 144" stroke="#c1f66c"/>'+text(84,177,'OBJECT LABELS → SPEECH',undefined,8)+close;
 if(type==='home')return open+'<path d="M101 114L180 54L259 114M113 105V176H247V105"/><rect x="161" y="130" width="36" height="46"/><rect x="124" y="116" width="25" height="23"/><rect x="211" y="116" width="25" height="23"/><circle cx="180" cy="94" r="6" fill="#c1f66c" stroke="none"/><path d="M74 119H47V153H73M287 119H313V153H287" stroke-dasharray="3 4"/><circle cx="75" cy="153" r="5"/><circle cx="286" cy="153" r="5"/>'+text(115,202,'CONNECTED CONTROL',undefined,8)+close;
 return open+'<rect x="57" y="65" width="246" height="112" rx="4"/><path d="M57 86H303"/><circle cx="69" cy="75" r="2" fill="#c1f66c" stroke="none"/><circle cx="78" cy="75" r="2" fill="#456366" stroke="none"/><rect x="71" y="99" width="59" height="58" fill="#2b454a"/><rect x="146" y="102" width="141" height="7" rx="3" fill="#63918a" stroke="none"/><path d="M146 124H247M146 136H269" stroke="#63918a"/><rect x="146" y="148" width="54" height="14" rx="3" fill="#c1f66c" stroke="none"/>'+text(104,198,'APPLICATION / DATABASE',undefined,8)+close;
}

const projectOrder=['cleaning','factory','assistant','crops','drone','ultrasound','clustering','home','crowdfunding'];
projects.sort((a,b)=>projectOrder.indexOf(a.id)-projectOrder.indexOf(b.id));
const grid=document.querySelector('#project-grid');
projects.forEach(project=>{
 const button=document.createElement('button');button.className='project-card';button.type='button';button.dataset.id=project.id;button.setAttribute('aria-label',`Explore ${project.title}`);
 button.innerHTML=`<div class="project-art">${svgArt(project.art)}<span class="art-label">${project.caption}</span></div><span class="project-card-category">${project.category.toUpperCase()}<span class="arrow" aria-hidden="true">↗</span></span><h4>${project.title}</h4><p>${project.short}</p><span class="project-technologies">${project.tech.join(' · ')}</span>`;
 button.addEventListener('click',()=>openProject(project.id));grid.append(button);
});

const dialog=document.querySelector('#project-dialog');let dialogTrigger=null;
function openProject(id){
 const project=projects.find(p=>p.id===id);if(!project)return;
 dialogTrigger=document.activeElement;
 document.querySelector('#dialog-title').textContent=project.title;
 document.querySelector('#dialog-category').textContent=project.category.toUpperCase();
 document.querySelector('#dialog-summary').textContent=project.summary;
 document.querySelector('#dialog-methods-title').textContent=project.filters.includes('research')?'Research methods':'Implementation';
 const tags=document.querySelector('#dialog-tags');tags.replaceChildren();project.tech.forEach(t=>{const span=document.createElement('span');span.textContent=t;tags.append(span);});
 const details=document.querySelector('#dialog-details');details.replaceChildren();project.details.forEach(t=>{const li=document.createElement('li');li.textContent=t;details.append(li);});
 const insight=document.querySelector('#dialog-insight');insight.replaceChildren();const label=document.createElement('strong');label.textContent=project.filters.includes('research')?'FINDINGS & SCOPE':'ENGINEERING FOCUS';insight.append(label,document.createTextNode(project.insight));
 const links=document.querySelector('#dialog-links');links.replaceChildren();project.links.forEach(link=>{const a=document.createElement('a');a.href=link.href;a.target='_blank';a.rel='noopener';a.textContent=link.label+' ↗';links.append(a);});
 document.body.classList.add('dialog-open');dialog.showModal();document.querySelector('.dialog-close').focus();
}
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>openProject(button.dataset.project)));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');dialogTrigger?.focus();});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 const filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
 let count=0;document.querySelectorAll('.project-card').forEach(card=>{const p=projects.find(p=>p.id===card.dataset.id);card.hidden=filter!=='all'&&!p.filters.includes(filter);if(!card.hidden)count++;});
 document.querySelector('#project-count').textContent=`${count} ${count===1?'project':'projects'}`;
 document.querySelector('#filter-status').textContent=`${count} ${filter==='all'?'':filter+' '}projects shown.`;
}));
document.querySelector('#year').textContent=String(new Date().getFullYear());
document.querySelector('#copy-email').addEventListener('click',async()=>{
 const status=document.querySelector('#copy-status'),email='rayanalamsiam2000@gmail.com';
 let copied=false;
 try{await navigator.clipboard.writeText(email);copied=true;}catch{
  // Also support the user's double-click, local-file preview.
  const input=document.createElement('textarea'),focused=document.activeElement;
  input.value=email;input.setAttribute('readonly','');input.style.cssText='position:fixed;left:-9999px;top:0';document.body.append(input);input.select();
  try{copied=document.execCommand('copy');}catch{}finally{input.remove();focused?.focus();}
 }
 status.textContent=copied?'Email copied.':'Select the email address to copy it.';
 setTimeout(()=>status.textContent='',4000);
});
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('.site-header nav a').forEach(a=>{const active=a.getAttribute('href')==='#'+entry.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -55% 0px'});document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));}

// This is an interactive planning illustration, independent of the actual robot.
const canvas=document.querySelector('#route-canvas');const ctx=canvas.getContext('2d');
const cols=24,rows=17,cell=30,start=[3,13],obstacles=new Set();
const rectangle=(x,y,w,h)=>{for(let i=x;i<x+w;i++)for(let j=y;j<y+h;j++)obstacles.add(`${i},${j}`);};
rectangle(8,3,2,9);rectangle(14,8,6,2);rectangle(16,2,2,3);rectangle(3,4,3,2);
let route=[],destination=null,progress=0,animationId=null,explored=[];
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function planPath(goal){
 const key=p=>p.join(',');const open=[{p:start,g:0,f:Math.abs(start[0]-goal[0])+Math.abs(start[1]-goal[1])}];const parent=new Map(),cost=new Map([[key(start),0]]);const closed=new Set();explored=[];
 while(open.length){open.sort((a,b)=>a.f-b.f);const node=open.shift(),nk=key(node.p);if(closed.has(nk))continue;closed.add(nk);explored.push(node.p);
  if(nk===key(goal)){const path=[goal];let k=nk;while(parent.has(k)){const p=parent.get(k);path.unshift(p);k=key(p);}return path;}
  for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const p=[node.p[0]+dx,node.p[1]+dy],pk=key(p);if(p[0]<1||p[0]>=cols-1||p[1]<1||p[1]>=rows-1||obstacles.has(pk)||closed.has(pk))continue;const g=node.g+1;if(g<(cost.get(pk)??Infinity)){cost.set(pk,g);parent.set(pk,node.p);open.push({p,g,f:g+Math.abs(p[0]-goal[0])+Math.abs(p[1]-goal[1])});}}
 }return [];
}
const center=p=>[(p[0]+.5)*cell,(p[1]+.5)*cell];
function draw(){
 ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#0a1419';ctx.fillRect(0,0,canvas.width,canvas.height);
 ctx.strokeStyle='#20363e';ctx.lineWidth=.7;for(let x=0;x<=canvas.width;x+=cell){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,canvas.height);ctx.stroke();}for(let y=0;y<=canvas.height;y+=cell){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(canvas.width,y);ctx.stroke();}
 explored.forEach(p=>{ctx.fillStyle='rgba(160,189,140,.08)';ctx.fillRect(p[0]*cell+1,p[1]*cell+1,cell-2,cell-2);});
 obstacles.forEach(k=>{const [x,y]=k.split(',').map(Number);ctx.fillStyle='#3b5962';ctx.fillRect(x*cell+1,y*cell+1,cell-2,cell-2);});
 if(route.length){ctx.strokeStyle='#74d8c6';ctx.lineWidth=2;ctx.setLineDash([5,6]);ctx.beginPath();route.forEach((p,i)=>{const [x,y]=center(p);i?ctx.lineTo(x,y):ctx.moveTo(x,y);});ctx.stroke();ctx.setLineDash([]);}
 [[19,4,'A'],[20,13,'B']].forEach(([gx,gy,name])=>{const [x,y]=center([gx,gy]);ctx.strokeStyle='#51766d';ctx.lineWidth=1;ctx.beginPath();ctx.arc(x,y,13,0,Math.PI*2);ctx.stroke();ctx.fillStyle='#b6d9bb';ctx.font='13px Segoe UI';ctx.textAlign='center';ctx.fillText(name,x,y+5);});
 if(destination){const [x,y]=center(destination);ctx.strokeStyle='#74d8c6';ctx.beginPath();ctx.arc(x,y,17,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(x-5,y);ctx.lineTo(x+5,y);ctx.moveTo(x,y-5);ctx.lineTo(x,y+5);ctx.stroke();}
 let robot=center(start),angle=-Math.PI/2;if(route.length){const index=Math.min(Math.floor(progress),route.length-1),fraction=progress-index;const p=center(route[index]),q=center(route[Math.min(index+1,route.length-1)]);robot=[p[0]+(q[0]-p[0])*fraction,p[1]+(q[1]-p[1])*fraction];if(q[0]!==p[0]||q[1]!==p[1])angle=Math.atan2(q[1]-p[1],q[0]-p[0]);}
 ctx.save();ctx.translate(...robot);ctx.rotate(angle);ctx.fillStyle='#c1f66c';ctx.fillRect(-10,-9,20,18);ctx.fillStyle='#78a068';ctx.fillRect(-12,-13,24,3);ctx.fillRect(-12,10,24,3);ctx.fillStyle='#15271f';ctx.beginPath();ctx.moveTo(10,0);ctx.lineTo(1,-4);ctx.lineTo(1,4);ctx.fill();ctx.restore();
 const [sx,sy]=center(start);ctx.fillStyle='#97bbae';ctx.font='9px Segoe UI';ctx.textAlign='left';ctx.fillText('START',sx-13,sy+31);
}
function plan(goal){
 if(animationId)cancelAnimationFrame(animationId);destination=goal;progress=0;route=planPath(goal);
 const status=document.querySelector('#route-status');if(!route.length){status.textContent='No route found. Choose another open area.';draw();return;}
 if(route.length===1){status.textContent='You’re already at the start.';draw();return;}
 status.textContent=`Path found · ${route.length-1} grid steps · navigating`;let last=null;
 if(reducedMotion){progress=route.length-1;draw();status.textContent=`Destination reached · ${route.length-1} grid steps`;return;}
 function animate(time){if(last!==null)progress+=(Math.min(time-last,100))/160;last=time;if(progress>=route.length-1){progress=route.length-1;draw();status.textContent=`Destination reached · ${route.length-1} grid steps`;animationId=null;return;}draw();animationId=requestAnimationFrame(animate);}animationId=requestAnimationFrame(animate);
}
canvas.addEventListener('click',event=>{const r=canvas.getBoundingClientRect();const goal=[Math.floor((event.clientX-r.left)*canvas.width/r.width/cell),Math.floor((event.clientY-r.top)*canvas.height/r.height/cell)];if(obstacles.has(goal.join(','))||goal[0]<1||goal[0]>=cols-1||goal[1]<1||goal[1]>=rows-1){document.querySelector('#route-status').textContent='Choose an open area inside the map.';return;}plan(goal);});
document.querySelectorAll('.route-preset').forEach(b=>b.addEventListener('click',()=>plan(b.dataset.destination==='0'?[19,4]:[20,13])));
document.querySelector('#route-reset').addEventListener('click',()=>{if(animationId)cancelAnimationFrame(animationId);animationId=null;route=[];explored=[];destination=null;progress=0;document.querySelector('#route-status').textContent='Choose a destination. Find a path.';draw();});
draw();
