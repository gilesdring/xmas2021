!function(){"use strict";const e=new(window.AudioContext||window.webkitAudioContext),t=e.createWaveShaper(),n=e.createDynamicsCompressor();n.connect(e.destination),t.connect(n);t.curve=(e=>{for(var t,n="number"==typeof e?e:50,s=44100,a=new Float32Array(s),i=Math.PI/180,r=0;r<s;++r)t=2*r/s-1,a[r]=(3+n)*t*20*i/(Math.PI+n*Math.abs(t));return a})(10),t.oversample="4x";const s="\n108:88:C8:4186.01\n107:87:B7:3951.07\n106:86:A#7:3729.31\n105:85:A7:3520.00\n104:84:G#7:3322.44\n103:83:G7:3135.96\n102:82:F#7:2959.96\n101:81:F7:2793.83\n100:80:E7:2637.02\n99:79:D#7:2489.02\n98:78:D7:2349.32\n97:77:C#7:2217.46\n96:76:C7:2093.00\n95:75:B6:1975.53\n94:74:A#6:1864.66\n93:73:A6:1760.00\n92:72:G#6:1661.22\n91:71:G6:1567.98\n90:70:F#6:1479.98\n89:69:F6:1396.91\n88:68:E6:1318.51\n87:67:D#6:1244.51\n86:66:D6:1174.66\n85:65:C#6:1108.73\n84:64:C6:1046.50\n83:63:B5:987.77\n82:62:A#5:932.33\n81:61:A5:880.00\n80:60:G#5:830.61\n79:59:G5:783.99\n78:58:F#5:739.99\n77:57:F5:698.46\n76:56:E5:659.26\n75:55:D#5:622.25\n74:54:D5:587.33\n73:53:C#5:554.37\n72:52:C5:523.25\n71:51:B4:493.88\n70:50:A#4:466.16\n69:49:A4:440.00\n68:48:G#4:415.30\n67:47:G4:392.00\n66:46:F#4:369.99\n65:45:F4:349.23\n64:44:E4:329.63\n63:43:D#4:311.13\n62:42:D4:293.66\n61:41:C#4:277.18\n60:40:C4:261.63\n59:39:B3:246.94\n58:38:A#3:233.08\n57:37:A3:220.00\n56:36:G#3:207.65\n55:35:G3:196.00\n54:34:F#3:185.00\n53:33:F3:174.61\n52:32:E3:164.81\n51:31:D#3:155.56\n50:30:D3:146.83\n49:29:C#3:138.59\n48:28:C3:130.81\n47:27:B2:123.47\n46:26:A#2:116.54\n45:25:A2:110.00\n44:24:G#2:103.83\n43:23:G2:98.00\n42:22:F#2:92.50\n41:21:F2:87.31\n40:20:E2:82.41\n39:19:D#2:77.78\n38:18:D2:73.42\n37:17:C#2:69.30\n36:16:C2:65.41\n35:15:B1:61.74\n34:14:A#1:58.27\n33:13:A1:55.00\n32:12:G#1:51.91\n31:11:G1:49.00\n30:10:F#1:46.25\n29:9:F1:43.65\n28:8:E1:41.20\n27:7:D#1:38.89\n26:6:D1:36.71\n25:5:C#1:34.65\n24:4:C1:32.70\n23:3:B0:30.87\n22:2:A#0:29.14\n21:1:A0:27.50\n".split("\n").filter((e=>e)).map((e=>e.split(":"))),a=s.reduce(((e,[t,n,s,a])=>({...e,[s]:a})),{});s.reduce(((e,[t,n,s,a])=>({...e,[n]:a})),{}),s.reduce(((e,[t,n,s,a])=>({...e,[t]:a})),{});const i=["C4","D4","C4","A3","F4","D4","C4","C4","D4","C4","D4","C4","F4","E4","A#3","C4","A#3","G3","E4","D4","C4","C4","D4","C4","D4","C4","G4","F4","C4","D4","C4","A3","F4","D4","C4","C4","D4","C4","D4","C4","F4","E4","A#3","C4","A#3","G3","E4","D4","C4","C4","D4","C4","D4","C4","G4","F4","D4","D4","F4","D4","C4","A3","C4","A#3","D4","C4","A#3","A3","G3","G3","C4","C4","E4","E4","E4","F4","F4","E4","D4","C4","A#3","G3","C4","D4","C4","A3","F4","D4","C4","C4","D4","C4","D4","C4","F4","E4","A#3","C4","A#3","G3","E4","D4","C4","C4","D4","C4","D4","C4","G4","F4"].map((e=>a[e])),r=[250,500,200,500,500,500,1500,300,200,300,200,500,500,2e3,250,500,200,500,500,500,1500,300,200,300,200,500,500,2e3,250,500,200,500,500,500,1500,300,200,300,200,500,500,2e3,250,500,200,500,500,500,1500,300,200,300,200,500,500,2e3,500,500,300,700,500,300,1200,500,500,500,500,2e3,500,500,500,500,500,500,1e3,500,500,500,500,500,300,1200,250,500,200,500,500,500,1500,300,200,300,200,500,500,2e3,250,500,200,500,500,500,1500,300,200,300,200,500,500,2e3];const h=function*(){let e=0;for(;;)yield[i[e%i.length],r[e%r.length]],e++}();let o=!1,l=1;function c(e){l=120/e}const g=()=>{if(!o)return;const[n,s]=h.next().value;(n=>{const s=e.currentTime,a=s+.5,i=e.createGain();i.gain.setValueAtTime(1e-4,s),i.gain.exponentialRampToValueAtTime(.1,s+.1),i.gain.exponentialRampToValueAtTime(1e-4,a),i.connect(t);const r=e.createOscillator();r.type="triangle",r.frequency.setValueAtTime(n,s),r.connect(i),r.start(s),r.stop(a)})(n);const a=new CustomEvent("playnote",{detail:{freq:n,duration:s}});window.dispatchEvent(a),setTimeout(g,s*l)};function*d(){let e=0;for(;;)yield sin(e),e+=10}class p{constructor({x:e,y:t,height:n,color:s,sprite:a,face:i}){this.color=s,this.x=e,this.y=t,this.height=n,this.baseHeight=380,this.aspect=.6,this.sprite=a,this.face=i,this.angleGen=d()}get scale(){return this.height*height/this.baseHeight}get width(){return this.height*this.aspect}get pos(){return{x:(this.x-this.width/2)*width,y:(this.y-this.height/2)*height}}animate(){this.animation=function*(){let e=0,t=0;for(;t<9;)yield e,t<6?e-=15:e+=30,t++}()}get armAngle(){return this.animation?this.animation.next().value:0}get headAngle(){return 10*this.angleGen.next().value}draw(){push(),translate(this.pos.x,this.pos.y),scale(this.scale),image(this.sprite.body,35,100),imageMode(CENTER),translate(100,90),rotate(this.headAngle),push(),scale(.17),image(this.face,0,0),pop(),image(this.sprite.hat,-35,-45),pop()}drawArms(){push(),translate(this.pos.x,this.pos.y),this.drawLeftArm(),this.drawRightArm(),pop()}drawLeftArm(){push(),scale(this.scale),translate(135,195),image(this.sprite.leftArm,0,0),pop()}drawRightArm(){push(),scale(this.scale),angleMode(DEGREES),translate(60,237),rotate(this.armAngle),image(this.sprite.rightArm,-15,-20),pop()}}class m{constructor({x:e,y:t,height:n,sprite:s,face:a}){this.x=e,this.y=t,this.height=n,this.baseHeight=200,this.aspect=1.5,this.sprite=s,this.face=a,this.angleGen=d()}get scale(){return this.height*height/this.baseHeight}get width(){return this.height*this.aspect}get pos(){return{x:(this.x-this.width/2)*width,y:(this.y-this.height/2)*height}}get headAngle(){return 10*this.angleGen.next().value}draw(){push(),translate(this.pos.x,this.pos.y),imageMode(CORNER),scale(this.scale),image(this.sprite.deerBody,0,100),translate(160,100),rotate(this.headAngle),image(this.sprite.deerAntler,-75,-100),push(),imageMode(CENTER),scale(.16),image(this.face,0,0),pop(),image(this.sprite.deerNose,-5,5),pop()}}const u=[];let C;function w(){return min(windowWidth,windowHeight)}const A={},D={};window.preload=function(){A.hat=loadImage("assets/hat.svg"),A.body=loadImage("assets/body.svg"),A.leftArm=loadImage("assets/left-hand.svg"),A.rightArm=loadImage("assets/right-hand.svg"),A.table=loadImage("assets/table.svg"),A.deerBody=loadImage("assets/deer-body.svg"),A.deerAntler=loadImage("assets/deer-antlers.svg"),A.deerNose=loadImage("assets/deer-nose.svg"),D.delia=loadImage("assets/delia.png"),D.martha=loadImage("assets/m.png"),D.giles=loadImage("assets/g.png"),D.bea=loadImage("assets/b.png"),D.rebecca=loadImage("assets/r.png")},window.setup=function(){const e=w();createCanvas(e,e),clear(),u.push(new p({x:.29,y:.5,height:.3,sprite:A,face:D.martha}),new p({x:.43,y:.5,height:.3,sprite:A,face:D.giles}),new p({x:.57,y:.5,height:.3,sprite:A,face:D.rebecca,faceScale:.2}),new p({x:.71,y:.5,height:.3,sprite:A,face:D.bea}));const t=function*(e){for(;;)yield Math.floor(Math.random()*e)}(u.length);window.addEventListener("playnote",(e=>u[t.next().value].animate())),C=new m({x:.3,y:.8,height:.2,sprite:A,face:D.delia}),clear()},window.draw=function(){clear(),u.forEach((e=>e.draw())),push(),imageMode(CENTER),translate(width/2,.61*height),scale(.8*width/A.table.width),image(A.table,0,0),pop(),u.forEach((e=>e.drawArms())),C.draw()},window.windowResized=function(){const e=w();resizeCanvas(e,e)};const f=document.querySelector("#sound-toggle"),y=document.querySelector("#speed-toggle");let E=!1,G=!1;const F=()=>E?(o=!1,e.suspend(),!1):(o=!0,e.resume(),setTimeout(g,1e3),!0),x=()=>{f.innerHTML=E?"Stop work":"Start work",y.innerHTML=G?"Slow down":"Work harder"};f.addEventListener("click",(()=>{E=F(),x()})),y.addEventListener("click",(()=>{G=G?(c(120),!1):(c(240),!0),x()})),x()}();
