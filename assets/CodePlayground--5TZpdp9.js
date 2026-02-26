const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/EditorPanel-CWuxeL5k.js","assets/index-B_BAhOpn.js","assets/index-CO3H5L8Z.css","assets/code-xml-CPNjWkGo.js","assets/PreviewPanel-D-i8Pvsf.js","assets/eye-Bb68d8LN.js","assets/SavedProjectsPanel-PnyJoXXk.js"])))=>i.map(i=>d[i]);
import{c as A,r as t,j as e,D as Y,e as ie,P as q,N as V,F as B,m as J,_ as M}from"./index-B_BAhOpn.js";import{C as de}from"./code-OyqpweSW.js";import{E as ce,S as le}from"./smartphone-DOuncNmo.js";import{E as me}from"./eye-Bb68d8LN.js";import{P as ue}from"./play-C_H-nv-3.js";import{R as K}from"./rotate-ccw-CoVDebrk.js";const pe=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],xe=A("monitor",pe);const he=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]],H=A("save",he);const be=[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],fe=A("settings",be);const ge=[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]],W=A("share-2",ge);const ye=[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",ry:"2",key:"76otgf"}],["line",{x1:"12",x2:"12.01",y1:"18",y2:"18",key:"1dp563"}]],ve=A("tablet",ye),we=t.memo(function({onRun:c,onSave:l,onShare:p,onDownload:h,onReset:x,onLoadTemplate:g,autoRun:j,onAutoRunToggle:a,viewMode:k,onViewModeChange:S,templates:y=[],label:P="Code Editor",isMobile:v=!1,showPreview:C=!1,onTogglePreview:m}){return e.jsxs("div",{className:"bg-card border-b border-border px-2 md:px-4 py-2 md:py-3 flex justify-between items-center",children:[e.jsxs("div",{className:"flex items-center space-x-2 md:space-x-4",children:[e.jsxs("h1",{className:"text-lg md:text-xl font-bold text-foreground flex items-center",children:[e.jsx(de,{className:"w-4 h-4 md:w-6 md:h-6 mr-2 text-primary"}),e.jsx("span",{className:"hidden sm:inline",children:P})]}),!v&&e.jsxs("select",{onChange:b=>{if(b.target.value&&g){const f=y.find(r=>r.name===b.target.value);f&&g(f),b.target.value=""}},className:"px-3 py-1 bg-background border border-border rounded text-sm focus:ring-2 focus:ring-primary focus:border-transparent",children:[e.jsx("option",{value:"",children:"Load Template"}),y.map(b=>e.jsx("option",{value:b.name,children:b.name},b.name))]})]}),e.jsxs("div",{className:"flex items-center space-x-1 md:space-x-2",children:[v&&e.jsx("button",{onClick:m,className:`p-2 rounded ${C?"bg-primary text-primary-foreground":"bg-secondary text-secondary-foreground"}`,title:C?"Show Editor":"Show Preview",children:C?e.jsx(ce,{className:"w-4 h-4"}):e.jsx(me,{className:"w-4 h-4"})}),e.jsxs("label",{className:"flex items-center space-x-1 md:space-x-2 text-xs md:text-sm",children:[e.jsx("input",{type:"checkbox",checked:j,onChange:b=>a?.(b.target.checked),className:"rounded"}),e.jsx("span",{className:"hidden md:inline",children:"Auto-run"})]}),!v&&e.jsxs("div",{className:"flex border border-border rounded overflow-hidden",children:[e.jsx("button",{onClick:()=>S?.("desktop"),className:`p-2 ${k==="desktop"?"bg-primary text-primary-foreground":"bg-secondary text-secondary-foreground"}`,title:"Desktop View",children:e.jsx(xe,{className:"w-4 h-4"})}),e.jsx("button",{onClick:()=>S?.("tablet"),className:`p-2 border-l border-border ${k==="tablet"?"bg-primary text-primary-foreground":"bg-secondary text-secondary-foreground"}`,title:"Tablet View",children:e.jsx(ve,{className:"w-4 h-4"})}),e.jsx("button",{onClick:()=>S?.("mobile"),className:`p-2 border-l border-border ${k==="mobile"?"bg-primary text-primary-foreground":"bg-secondary text-secondary-foreground"}`,title:"Mobile View",children:e.jsx(le,{className:"w-4 h-4"})})]}),e.jsxs("button",{onClick:c,className:"px-2 md:px-3 py-1 md:py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center text-xs md:text-sm",title:"Run Code (F5)",children:[e.jsx(ue,{className:"w-3 h-3 md:w-4 md:h-4 mr-1"}),e.jsx("span",{className:"hidden sm:inline",children:"Run"})]}),!v&&e.jsxs(e.Fragment,{children:[e.jsxs("button",{onClick:l,className:"px-2 md:px-3 py-1 md:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center text-xs md:text-sm",title:"Save Project (Ctrl+S)",children:[e.jsx(H,{className:"w-3 h-3 md:w-4 md:h-4 mr-1"}),e.jsx("span",{className:"hidden sm:inline",children:"Save"})]}),e.jsxs("button",{onClick:p,className:"px-2 md:px-3 py-1 md:py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors flex items-center text-xs md:text-sm",title:"Share Project",children:[e.jsx(W,{className:"w-3 h-3 md:w-4 md:h-4 mr-1"}),e.jsx("span",{className:"hidden sm:inline",children:"Share"})]}),e.jsxs("button",{onClick:h,className:"px-2 md:px-3 py-1 md:py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors flex items-center text-xs md:text-sm",title:"Export as HTML",children:[e.jsx(Y,{className:"w-3 h-3 md:w-4 md:h-4 mr-1"}),e.jsx("span",{className:"hidden sm:inline",children:"Export"})]}),e.jsxs("button",{onClick:x,className:"px-2 md:px-3 py-1 md:py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors flex items-center text-xs md:text-sm",title:"Reset Code",children:[e.jsx(K,{className:"w-3 h-3 md:w-4 md:h-4 mr-1"}),e.jsx("span",{className:"hidden sm:inline",children:"Reset"})]})]}),v&&e.jsx("div",{className:"relative",children:e.jsxs("details",{className:"relative",children:[e.jsx("summary",{className:"p-2 bg-secondary text-secondary-foreground rounded cursor-pointer list-none",children:e.jsx(fe,{className:"w-4 h-4"})}),e.jsxs("div",{className:"absolute right-0 top-full mt-1 bg-card border border-border rounded shadow-lg p-2 space-y-2 z-10 min-w-[120px]",children:[e.jsxs("button",{onClick:l,className:"w-full px-2 py-1 text-left hover:bg-accent rounded text-sm flex items-center",children:[e.jsx(H,{className:"w-3 h-3 mr-2"}),"Save"]}),e.jsxs("button",{onClick:p,className:"w-full px-2 py-1 text-left hover:bg-accent rounded text-sm flex items-center",children:[e.jsx(W,{className:"w-3 h-3 mr-2"}),"Share"]}),e.jsxs("button",{onClick:h,className:"w-full px-2 py-1 text-left hover:bg-accent rounded text-sm flex items-center",children:[e.jsx(Y,{className:"w-3 h-3 mr-2"}),"Export"]}),e.jsxs("button",{onClick:x,className:"w-full px-2 py-1 text-left hover:bg-accent rounded text-sm flex items-center",children:[e.jsx(K,{className:"w-3 h-3 mr-2"}),"Reset"]})]})]})})]})]})}),je=(d,c,l,p,h,x,g,j,a)=>{const k=t.useCallback(r=>{if(!r.current)return;const n=`
            <html>
                <head>
                    <style>${c}</style>
                </head>
                <body>
                    ${d.replace(/<\/body>.*$/s,"")}
                    <script>
                        try {
                            ${l}
                        } catch (error) {
                            console.error('JavaScript Error:', error);
                            document.body.innerHTML += '<div style="color: red; padding: 10px; background: #ffe6e6; border-radius: 5px; margin: 10px;"><strong>JavaScript Error:</strong> ' + error.message + '</div>';
                        }
                    <\/script>
                </body>
            </html>
        `,s=r.current;s.srcdoc=n},[d,c,l]),S=t.useCallback(()=>{const r=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Playground Project</title>
    <style>
${c}
    </style>
</head>
<body>
${d.replace(/^.*<body[^>]*>|<\/body>.*$/gs,"")}
    <script>
${l}
    <\/script>
</body>
</html>`,n=new Blob([r],{type:"text/html"}),s=URL.createObjectURL(n),L=document.createElement("a");L.href=s,L.download="playground-project.html",L.click(),URL.revokeObjectURL(s),a({title:"Success",description:"Project downloaded as HTML file"})},[d,c,l,a]),y=t.useCallback(()=>{const r=prompt("Enter project name:");if(!r)return;const n={id:Date.now(),name:r,html:d,css:c,js:l,createdAt:new Date().toISOString()},s=[...g,n];j(s),localStorage.setItem("codePlaygroundProjects",JSON.stringify(s)),a({title:"Success",description:`Project "${r}" saved successfully`})},[d,c,l,g,j,a]),P=t.useCallback(r=>{p(r.html),h(r.css),x(r.js),a({title:"Success",description:`Project "${r.name}" loaded`})},[p,h,x,a]),v=t.useCallback(r=>{if(!confirm("Are you sure you want to delete this project?"))return;const n=g.filter(s=>s.id!==r);j(n),localStorage.setItem("codePlaygroundProjects",JSON.stringify(n)),a({title:"Success",description:"Project deleted"})},[g,j,a]),C=t.useCallback(()=>{confirm("Are you sure you want to reset all code? This will clear your current work.")&&(p(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Playground</title>
</head>
<body>
    <h1>Welcome to Code Playground!</h1>
    <p>Start coding and see your changes in real-time.</p>
</body>
</html>`),h(`/* CSS Styles */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 20px;
    background: #f4f4f4;
}

h1 {
    color: #333;
    text-align: center;
}`),x(`// JavaScript Code
// Add your JavaScript here`),a({title:"Code Reset",description:"All code has been reset to default"}))},[p,h,x,a]),m=t.useCallback(async()=>{const r={html:d,css:c,js:l};try{const n=btoa(JSON.stringify(r)),s=`${window.location.origin}${window.location.pathname}#share=${n}`;await navigator.clipboard.writeText(s),a({title:"Success",description:"Share link copied to clipboard"})}catch(n){console.error("shareCode error:",n),a({title:"Error",description:"Failed to create share link",variant:"destructive"})}},[d,c,l,a]),b=t.useCallback(r=>{p(r.html),h(r.css),x(r.js),a({title:"Template Loaded",description:`"${r.name}" template loaded successfully`})},[p,h,x,a]),f=t.useCallback(()=>{const r=window.location.hash;if(r.startsWith("#share="))try{const n=r.substring(7),s=JSON.parse(atob(n));p(s.html||d),h(s.css||c),x(s.js||l),a({title:"Shared Code Loaded",description:"Code has been loaded from share link"})}catch(n){console.error("Failed to load shared code:",n),a({title:"Error",description:"Failed to load shared code",variant:"destructive"})}},[d,c,l,p,h,x,a]);return{runCode:k,downloadProject:S,saveProject:y,loadProject:P,deleteProject:v,resetCode:C,shareCode:m,loadTemplate:b,loadSharedCode:f}},ke=[{name:"Animated Card",html:`<div class="container">
    <div class="card">
        <h2>Animated Card</h2>
        <p>Hover me for a cool effect!</p>
        <button>Click Me</button>
    </div>
</div>`,css:`.container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(45deg, #ff9a9e, #fecfef);
}

.card {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
}

.card:hover {
    transform: translateY(-10px) rotate(2deg);
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

button {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    margin-top: 1rem;
    transition: transform 0.2s;
}

button:hover {
    transform: scale(1.05);
}`,js:`document.querySelector('button').addEventListener('click', function() {
    this.textContent = this.textContent === 'Click Me' ? 'Clicked!' : 'Click Me';
});`},{name:"Interactive Button",html:`<div class="button-container">
    <button class="glow-btn">Glow Button</button>
    <button class="ripple-btn">Ripple Effect</button>
    <button class="bounce-btn">Bounce</button>
</div>`,css:`.button-container {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #1a1a1a;
    flex-wrap: wrap;
}

.glow-btn {
    background: #00ff88;
    color: #000;
    border: none;
    padding: 15px 30px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: bold;
}

.glow-btn:hover {
    box-shadow: 0 0 20px #00ff88, 0 0 40px #00ff88;
}

.ripple-btn {
    background: #ff4757;
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 50px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    animation: ripple-effect 0.6s ease-out;
    pointer-events: none;
}

@keyframes ripple-effect {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.bounce-btn {
    background: #3742fa;
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 5px;
    cursor: pointer;
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-30px); }
    60% { transform: translateY(-15px); }
}`,js:`// Add ripple effect
document.querySelector('.ripple-btn').addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
});`},{name:"CSS Grid Layout",html:`<div class="grid-container">
    <header class="header">Header</header>
    <nav class="nav">Navigation</nav>
    <main class="main">
        <h2>Main Content</h2>
        <p>This is a CSS Grid layout example.</p>
    </main>
    <aside class="sidebar">
        <h3>Sidebar</h3>
        <ul>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
        </ul>
    </aside>
    <footer class="footer">Footer</footer>
</div>`,css:`.grid-container {
    display: grid;
    grid-template-areas:
        "header header header"
        "nav main sidebar"
        "footer footer footer";
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    gap: 10px;
    padding: 10px;
    background: #f0f2f5;
}

.header {
    grid-area: header;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 20px;
    text-align: center;
    border-radius: 10px;
}

.nav {
    grid-area: nav;
    background: #e3f2fd;
    padding: 20px;
    border-radius: 10px;
}

.main {
    grid-area: main;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.sidebar {
    grid-area: sidebar;
    background: #f3e5f5;
    padding: 20px;
    border-radius: 10px;
}

.footer {
    grid-area: footer;
    background: #333;
    color: white;
    padding: 20px;
    text-align: center;
    border-radius: 10px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    padding: 5px 0;
    cursor: pointer;
}

li:hover {
    color: #667eea;
}`,js:`// Add interactive navigation
document.querySelectorAll('.sidebar li').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelector('.main h2').textContent = 'Clicked: ' + this.textContent;
    });
});

// Add dynamic content
document.addEventListener('DOMContentLoaded', function() {
    const main = document.querySelector('.main');
    const button = document.createElement('button');
    button.textContent = 'Add Dynamic Content';
    button.style.cssText = 'margin-top: 20px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;';
    
    button.addEventListener('click', function() {
        const p = document.createElement('p');
        p.textContent = 'Dynamic content added at ' + new Date().toLocaleTimeString();
        p.style.cssText = 'background: #f0f8ff; padding: 10px; border-radius: 5px; margin-top: 10px;';
        main.appendChild(p);
    });
    
    main.appendChild(button);
});`}],G=t.lazy(()=>M(()=>import("./EditorPanel-CWuxeL5k.js"),__vite__mapDeps([0,1,2,3]))),X=t.lazy(()=>M(()=>import("./PreviewPanel-D-i8Pvsf.js"),__vite__mapDeps([4,1,2,5]))),Ce=t.lazy(()=>M(()=>import("./SavedProjectsPanel-PnyJoXXk.js"),__vite__mapDeps([6,1,2]))),Se="codePlaygroundProjects",Ne=800,Ee=768,O={html:`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Playground</title>
</head>
<body>
    <h1>Welcome to Code Playground!</h1>
    <p>Start coding and see your changes in real-time.</p>
    
    <div class="card">
        <h2>Interactive Demo</h2>
        <button onclick="changeColor()" aria-label="Change demo box color">Click me!</button>
        <div id="demo-box" role="presentation"></div>
    </div>
</body>
</html>`,css:`/* CSS Styles */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    min-height: 100vh;
    line-height: 1.6;
}

h1 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

p {
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 30px;
}

.card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 30px;
    max-width: 500px;
    margin: 0 auto;
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.card h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #fff;
}

button {
    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 16px;
    transition: transform 0.2s, box-shadow 0.2s;
    display: block;
    margin: 0 auto 20px;
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

button:focus {
    outline: 2px solid #fff;
    outline-offset: 2px;
}

#demo-box {
    width: 100px;
    height: 100px;
    background: #ff6b6b;
    margin: 0 auto;
    border-radius: 10px;
    transition: all 0.3s ease;
}`,js:`// JavaScript Code
function changeColor() {
    const box = document.getElementById('demo-box');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    box.style.backgroundColor = randomColor;
    box.style.transform = 'scale(1.1) rotate(10deg)';
    
    setTimeout(() => {
        box.style.transform = 'scale(1) rotate(0deg)';
    }, 200);
}

// Add some interactivity with error handling
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Add click effects to all buttons
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            });
        });
    } catch (error) {
        console.error('Error initializing button effects:', error);
    }
});`},De=()=>{const{toast:d}=ie(),[c,l]=t.useState(O.html),[p,h]=t.useState(O.css),[x,g]=t.useState(O.js),[j,a]=t.useState("html"),[k,S]=t.useState("desktop"),[y,P]=t.useState(!0),[v,C]=t.useState([]),[m,b]=t.useState(!1),[f,r]=t.useState(!1),[n,s]=t.useState(!1),[L,i]=t.useState(null),E=t.useRef(null),R=t.useRef(null),F=t.useCallback(()=>{b(window.innerWidth<Ee)},[]),{runCode:N,downloadProject:Q,saveProject:_,loadProject:Z,deleteProject:ee,resetCode:$,shareCode:te,loadTemplate:I,loadSharedCode:U}=je(c,p,x,l,h,g,v,C,d);t.useEffect(()=>{(async()=>{s(!0);try{const D=localStorage.getItem(Se);D&&C(JSON.parse(D)),await U(),F()}catch(D){console.error("Failed to initialize app:",D),i("Failed to load saved projects"),d({title:"Loading Error",description:"Failed to load saved projects",variant:"destructive"})}finally{s(!1)}})();let o;const w=()=>{clearTimeout(o),o=setTimeout(F,150)};return window.addEventListener("resize",w),()=>{window.removeEventListener("resize",w),clearTimeout(o)}},[U,F,d]),t.useEffect(()=>{if(y)return R.current&&clearTimeout(R.current),R.current=setTimeout(()=>{try{N(E),i(null)}catch(u){console.error("Auto-run failed:",u),i("Failed to run code automatically")}},Ne),()=>{R.current&&clearTimeout(R.current)}},[c,p,x,y,N]),t.useEffect(()=>{const u=async o=>{if(!(o.target.tagName==="TEXTAREA"||o.target.tagName==="INPUT"))if(o.ctrlKey||o.metaKey)switch(o.key.toLowerCase()){case"s":o.preventDefault();try{await _(),i(null)}catch(w){console.error("Save failed:",w),i("Failed to save project")}break;case"enter":if(o.shiftKey){o.preventDefault();try{N(E),i(null)}catch(w){console.error("Run failed:",w),i("Failed to run code")}}break;case"r":if(o.shiftKey){o.preventDefault();try{$(),i(null)}catch(w){console.error("Reset failed:",w),i("Failed to reset code")}}break}else if(o.key==="F5"){o.preventDefault();try{N(E),i(null)}catch(w){console.error("Run failed:",w),i("Failed to run code")}}else o.key==="Escape"&&m&&f&&r(!1)};return window.addEventListener("keydown",u),()=>window.removeEventListener("keydown",u)},[_,N,$,m,f]);const z=t.useCallback(async()=>{try{await N(E),i(null)}catch(u){console.error("Run failed:",u),i("Failed to run code")}},[N]),re=t.useCallback(async u=>{try{await I(u),i(null),d({title:"Template Loaded",description:`Loaded ${u.name} template successfully`})}catch(o){console.error("Template load failed:",o),i("Failed to load template")}},[I,d]),ae=t.useCallback(async()=>{try{await _(),i(null)}catch(u){console.error("Save failed:",u),i("Failed to save project")}},[_]),oe=t.useCallback(()=>{r(u=>!u),!f&&m&&y&&setTimeout(()=>z(),100)},[f,m,y,z]),ne=t.useMemo(()=>`flex-1 flex overflow-hidden min-h-[400px] md:min-h-[600px] rounded-lg border border-border shadow-lg bg-card ${m?"flex-col":""}`,[m]),T=()=>e.jsxs("div",{className:"flex items-center justify-center h-64",children:[e.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-primary"}),e.jsx("span",{className:"ml-2 text-muted-foreground",children:"Loading..."})]}),se=({error:u,onDismiss:o})=>u?e.jsxs(J.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},className:"mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center justify-between",children:[e.jsx("span",{className:"text-destructive text-sm",children:u}),e.jsx("button",{onClick:o,className:"text-destructive hover:text-destructive/80 ml-2","aria-label":"Dismiss error",children:"×"})]}):null;return n?e.jsxs(q,{className:"min-h-screen bg-background",children:[e.jsx(V,{}),e.jsx("main",{className:"flex-1 container mx-auto px-2 py-4 md:py-8 max-w-[95vw]",children:e.jsx(T,{})}),e.jsx(B,{})]}):e.jsxs(q,{className:"min-h-screen bg-background",children:[e.jsx(V,{}),e.jsx("main",{className:"flex-1 container mx-auto px-2 py-4 md:py-8 max-w-[95vw]",children:e.jsxs("div",{className:"mt-16 h-full flex flex-col max-w-none mx-auto",children:[e.jsxs(J.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:"mb-4 md:mb-8 text-center",children:[e.jsx("h1",{className:"text-2xl md:text-4xl font-bold",children:"Code Playground"}),e.jsx("p",{className:"text-muted-foreground mt-2 text-sm md:text-base",children:"Write HTML, CSS, and JavaScript with live preview"}),e.jsx("div",{className:"text-xs text-muted-foreground mt-1",children:"Shortcuts: Ctrl+S (Save) • Shift+Ctrl+Enter (Run) • F5 (Run) • Shift+Ctrl+R (Reset)"})]}),e.jsx(se,{error:L,onDismiss:()=>i(null)}),e.jsxs("div",{className:"flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-12rem)]",children:[e.jsx(we,{onRun:z,onSave:ae,onShare:te,onDownload:Q,onReset:$,onLoadTemplate:re,autoRun:y,onAutoRunToggle:P,viewMode:k,onViewModeChange:S,templates:ke,label:"Code Playground",isMobile:m,showPreview:f,onTogglePreview:oe}),e.jsx("div",{className:ne,children:m?e.jsxs(e.Fragment,{children:[!f&&e.jsx(t.Suspense,{fallback:e.jsx(T,{}),children:e.jsx(G,{activeTab:j,onTabChange:a,html:c,css:p,js:x,onHtmlChange:l,onCssChange:h,onJsChange:g,isMobile:m})}),f&&e.jsx(t.Suspense,{fallback:e.jsx(T,{}),children:e.jsx(X,{viewMode:k,iframeRef:E,isMobile:m})})]}):e.jsxs(e.Fragment,{children:[e.jsx(t.Suspense,{fallback:e.jsx(T,{}),children:e.jsx(G,{activeTab:j,onTabChange:a,html:c,css:p,js:x,onHtmlChange:l,onCssChange:h,onJsChange:g,isMobile:m})}),e.jsx(t.Suspense,{fallback:e.jsx(T,{}),children:e.jsx(X,{viewMode:k,iframeRef:E,isMobile:m})})]})}),e.jsx(t.Suspense,{fallback:e.jsx(T,{}),children:e.jsx(Ce,{savedProjects:v,onLoadProject:Z,onDeleteProject:ee,isMobile:m})})]})]})}),e.jsx(B,{})]})};export{De as CodePlayground,De as default};
