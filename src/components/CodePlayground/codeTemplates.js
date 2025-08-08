export const codeTemplates = [
    {
        name: 'Animated Card',
        html: `<div class="container">
    <div class="card">
        <h2>Animated Card</h2>
        <p>Hover me for a cool effect!</p>
        <button>Click Me</button>
    </div>
</div>`,
        css: `.container {
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
}`,
        js: `document.querySelector('button').addEventListener('click', function() {
    this.textContent = this.textContent === 'Click Me' ? 'Clicked!' : 'Click Me';
});`
    },
    {
        name: 'Interactive Button',
        html: `<div class="button-container">
    <button class="glow-btn">Glow Button</button>
    <button class="ripple-btn">Ripple Effect</button>
    <button class="bounce-btn">Bounce</button>
</div>`,
        css: `.button-container {
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
}`,
        js: `// Add ripple effect
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
});`
    },
    {
        name: 'CSS Grid Layout',
        html: `<div class="grid-container">
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
</div>`,
        css: `.grid-container {
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
}`,
        js: `// Add interactive navigation
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
});`
    }
];
