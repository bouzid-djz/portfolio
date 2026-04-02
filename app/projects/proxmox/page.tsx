export default function ProxmoxPage() {
  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Proxmox VE — Infrastructure Virtualisée | Quentin SILVA</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; scroll-padding-top: 72px; }
    :root {
      --background: #121212; --foreground: #eeeeee; --card: #030303;
      --border: #161616; --muted: #0b0b0b; --muted-foreground: #8f8f8f;
      --primary: #7ef473; --primary-foreground: #0b0b0b; --radius: 0.625rem;
      --font-sans: 'Geist', 'Helvetica Neue', sans-serif;
      --font-mono: 'Geist Mono', 'Courier New', monospace;
      --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
      --text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
      --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
      --text-lg: clamp(1.125rem, 1rem + 0.75vw, 1.5rem);
      --text-xl: clamp(1.5rem, 1.2rem + 1.25vw, 2.25rem);
      --text-2xl: clamp(2rem, 1.2rem + 2.5vw, 3.5rem);
      --sp-1:.25rem;--sp-2:.5rem;--sp-3:.75rem;--sp-4:1rem;--sp-5:1.25rem;
      --sp-6:1.5rem;--sp-8:2rem;--sp-10:2.5rem;--sp-12:3rem;--sp-16:4rem;--sp-20:5rem;
      --shadow-sm:0 1px 3px rgba(0,0,0,.6);--shadow-md:0 4px 16px rgba(0,0,0,.7);
      --shadow-lg:0 12px 40px rgba(0,0,0,.8);--transition:150ms cubic-bezier(.4,0,.2,1);
      --content:1100px;
    }
    body { font-family:var(--font-sans); font-size:var(--text-base); color:var(--foreground); background-color:var(--background); line-height:1.6; min-height:100dvh; background-image:linear-gradient(to right,#80808012 1px,transparent 1px),linear-gradient(to bottom,#80808012 1px,transparent 1px); background-size:24px 24px; }
    img{display:block;max-width:100%;height:auto;}
    button{cursor:pointer;background:none;border:none;font:inherit;color:inherit;}
    a,button{transition:color var(--transition),background var(--transition),border-color var(--transition),opacity var(--transition);}
    ::selection{background:rgba(126,244,115,.2);color:var(--foreground);}
    :focus-visible{outline:2px solid var(--primary);outline-offset:3px;border-radius:var(--radius);}
    .container{max-width:var(--content);margin-inline:auto;padding-inline:var(--sp-6);}
    .navbar{position:sticky;top:0;z-index:100;background:color-mix(in oklab,var(--background) 88%,transparent);backdrop-filter:blur(14px);border-bottom:1px solid var(--border);padding:var(--sp-4) 0;}
    .navbar .container{display:flex;align-items:center;justify-content:space-between;}
    .nav-logo{display:flex;align-items:center;gap:var(--sp-3);text-decoration:none;color:var(--foreground);font-weight:600;font-size:var(--text-sm);}
    .nav-logo-icon{width:32px;height:32px;background:var(--primary);border-radius:var(--radius);display:flex;align-items:center;justify-content:center;}
    .nav-logo-icon svg{color:var(--primary-foreground);}
    .nav-right{display:flex;align-items:center;gap:var(--sp-3);}
    .nav-back{display:flex;align-items:center;gap:var(--sp-2);font-size:var(--text-sm);color:var(--muted-foreground);text-decoration:none;padding:var(--sp-2) var(--sp-3);border:1px solid var(--border);border-radius:var(--radius);}
    .nav-back:hover{border-color:var(--primary);color:var(--primary);}
    .nav-tag{font-size:var(--text-xs);font-family:var(--font-mono);color:var(--primary);border:1px solid rgba(126,244,115,.3);padding:var(--sp-1) var(--sp-3);border-radius:var(--radius);background:rgba(126,244,115,.06);}
    .progress-bar{position:fixed;top:0;left:0;width:100%;height:2px;background:rgba(126,244,115,.1);z-index:200;}
    .progress-fill{height:100%;background:var(--primary);transition:width .1s linear;width:0%;}
    .hero{padding:var(--sp-20) 0 var(--sp-16);}
    .hero-eyebrow{display:flex;align-items:center;gap:var(--sp-2);margin-bottom:var(--sp-5);flex-wrap:wrap;}
    .chip{display:inline-flex;align-items:center;gap:var(--sp-1);padding:2px var(--sp-3);border-radius:var(--radius);font-size:var(--text-xs);font-family:var(--font-mono);border:1px solid var(--border);background:var(--muted);color:var(--muted-foreground);}
    .chip.green{border-color:rgba(126,244,115,.4);background:rgba(126,244,115,.08);color:var(--primary);}
    .chip.orange{border-color:rgba(240,81,0,.4);background:rgba(240,81,0,.08);color:#f05100;}
    .chip.blue{border-color:rgba(20,71,230,.5);background:rgba(20,71,230,.1);color:#4d8fff;}
    .chip.purple{border-color:rgba(172,75,255,.4);background:rgba(172,75,255,.08);color:#ac4bff;}
    .chip.cyan{border-color:rgba(0,187,127,.4);background:rgba(0,187,127,.08);color:#00bb7f;}
    .chip::before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor;opacity:.8;}
    .hero h1{font-size:var(--text-2xl);font-weight:700;line-height:1.1;letter-spacing:-.03em;margin-bottom:var(--sp-5);}
    .hero h1 .accent{color:var(--primary);}
    .hero-desc{font-size:var(--text-base);color:var(--muted-foreground);max-width:68ch;line-height:1.7;margin-bottom:var(--sp-10);}
    .hero-stats{display:flex;gap:var(--sp-10);flex-wrap:wrap;}
    .stat{display:flex;flex-direction:column;gap:var(--sp-1);}
    .stat-value{font-size:var(--text-xl);font-weight:700;font-family:var(--font-mono);color:var(--primary);line-height:1;}
    .stat-label{font-size:var(--text-xs);color:var(--muted-foreground);text-transform:uppercase;letter-spacing:.1em;font-family:var(--font-mono);}
    .divider{border:none;border-top:1px solid var(--border);margin:0;}
    .section{padding:var(--sp-16) 0;}
    .section+.section{border-top:1px solid var(--border);}
    .section-head{display:flex;align-items:center;gap:var(--sp-3);margin-bottom:var(--sp-8);}
    .section-head h2{font-size:var(--text-sm);font-weight:600;text-transform:uppercase;letter-spacing:.12em;font-family:var(--font-mono);color:var(--muted-foreground);}
    .section-head::before{content:"";flex-shrink:0;width:20px;height:1px;background:var(--primary);}
    .card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:var(--sp-6);box-shadow:var(--shadow-sm);transition:border-color var(--transition),box-shadow var(--transition);}
    .card:hover{border-color:rgba(126,244,115,.25);box-shadow:var(--shadow-md);}
    .card h3{font-size:var(--text-sm);font-weight:600;margin-bottom:var(--sp-3);}
    .card p,.card li{font-size:var(--text-sm);color:var(--muted-foreground);line-height:1.65;}
    .card ul{list-style:none;display:flex;flex-direction:column;gap:var(--sp-2);}
    .card ul li{display:flex;gap:var(--sp-2);align-items:baseline;}
    .card ul li::before{content:"\u2192";color:var(--primary);font-size:var(--text-xs);flex-shrink:0;font-family:var(--font-mono);}
    .schema-box{border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow-md);}
    .schema-caption{padding:var(--sp-3) var(--sp-5);background:var(--card);border-top:1px solid var(--border);font-size:var(--text-xs);color:var(--muted-foreground);font-family:var(--font-mono);display:flex;align-items:center;gap:var(--sp-2);}
    .schema-caption::before{content:"//";color:var(--primary);}
    .svc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(250px,100%),1fr));gap:var(--sp-4);}
    .svc-card{background:var(--card);border:1px solid var(--border);border-radius:var(--radius);padding:var(--sp-5);transition:border-color var(--transition),transform var(--transition),box-shadow var(--transition);}
    .svc-card:hover{border-color:rgba(126,244,115,.3);box-shadow:var(--shadow-md);transform:translateY(-2px);}
    .svc-icon{font-size:1.5rem;width:44px;height:44px;display:flex;align-items:center;justify-content:center;border-radius:var(--radius);border:1px solid var(--border);background:var(--muted);margin-bottom:var(--sp-4);}
    .svc-card h4{font-size:var(--text-sm);font-weight:600;margin-bottom:var(--sp-2);}
    .svc-card p{font-size:var(--text-xs);color:var(--muted-foreground);line-height:1.5;}
    .timeline{display:flex;flex-direction:column;gap:0;}
    .tl-item{display:grid;grid-template-columns:120px 1px 1fr;gap:0 var(--sp-6);padding-bottom:var(--sp-8);}
    .tl-item:last-child{padding-bottom:0;}
    .tl-date{font-size:var(--text-xs);font-family:var(--font-mono);color:var(--muted-foreground);padding-top:2px;text-align:right;}
    .tl-line{position:relative;}
    .tl-line::before{content:"";position:absolute;top:8px;left:50%;transform:translateX(-50%);width:8px;height:8px;border-radius:50%;background:var(--primary);box-shadow:0 0 0 3px rgba(126,244,115,.15);}
    .tl-line::after{content:"";position:absolute;top:16px;bottom:-2rem;left:50%;transform:translateX(-50%);width:1px;background:var(--border);}
    .tl-item:last-child .tl-line::after{display:none;}
    .tl-content h4{font-size:var(--text-sm);font-weight:600;margin-bottom:var(--sp-2);}
    .tl-content p{font-size:var(--text-xs);color:var(--muted-foreground);line-height:1.6;}
    .net-table{width:100%;border-collapse:collapse;font-size:var(--text-xs);font-family:var(--font-mono);}
    .net-table th{text-align:left;padding:var(--sp-3) var(--sp-4);border-bottom:1px solid var(--border);color:var(--muted-foreground);font-weight:500;text-transform:uppercase;letter-spacing:.08em;}
    .net-table td{padding:var(--sp-3) var(--sp-4);border-bottom:1px solid rgba(22,22,22,.8);color:var(--foreground);}
    .net-table tr:last-child td{border-bottom:none;}
    .net-table tr:hover td{background:rgba(126,244,115,.03);}
    .td-mono{font-family:var(--font-mono);color:var(--primary);}
    .challenge-list{display:flex;flex-direction:column;gap:var(--sp-4);}
    .challenge{display:flex;gap:var(--sp-4);padding:var(--sp-5);background:var(--card);border:1px solid var(--border);border-radius:var(--radius);}
    .challenge-num{font-family:var(--font-mono);font-size:var(--text-xl);font-weight:700;color:rgba(126,244,115,.15);line-height:1;flex-shrink:0;min-width:2ch;}
    .challenge h4{font-size:var(--text-sm);font-weight:600;margin-bottom:var(--sp-2);}
    .challenge p{font-size:var(--text-xs);color:var(--muted-foreground);line-height:1.6;}
    .comp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(200px,100%),1fr));gap:var(--sp-3);}
    .comp-item{display:flex;align-items:center;gap:var(--sp-3);padding:var(--sp-3) var(--sp-4);background:var(--card);border:1px solid var(--border);border-radius:var(--radius);font-size:var(--text-xs);}
    .comp-dot{width:6px;height:6px;border-radius:50%;background:var(--primary);flex-shrink:0;}
    .footer{border-top:1px solid var(--border);padding:var(--sp-8) 0;margin-top:var(--sp-8);}
    .footer .container{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:var(--sp-4);}
    .footer p{font-size:var(--text-xs);color:var(--muted-foreground);font-family:var(--font-mono);}
    .btn-back{display:inline-flex;align-items:center;gap:var(--sp-2);padding:var(--sp-3) var(--sp-5);border-radius:var(--radius);font-size:var(--text-sm);font-weight:500;text-decoration:none;border:1px solid var(--border);color:var(--muted-foreground);transition:all var(--transition);}
    .btn-back:hover{border-color:var(--primary);color:var(--primary);}
    .reveal{opacity:0;transform:translateY(18px);transition:opacity .6s ease,transform .6s ease;}
    .reveal.in{opacity:1;transform:translateY(0);}
    @media(max-width:640px){.tl-item{grid-template-columns:80px 1px 1fr;gap:0 var(--sp-3);}.hero-stats{gap:var(--sp-6);}.net-table th:nth-child(3),.net-table td:nth-child(3){display:none;}}
    @media(max-width:768px){.ctx-grid{grid-template-columns:1fr!important;}}
  </style>
</head>
<body>
<div class="progress-bar"><div class="progress-fill" id="pf"></div></div>
<nav class="navbar">
  <div class="container">
    <a href="/" class="nav-logo">
      <div class="nav-logo-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
      Quentin SILVA
    </a>
    <div class="nav-right">
      <span class="nav-tag">projet / proxmox</span>
      <a href="/" class="nav-back"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Retour au portfolio</a>
    </div>
  </div>
</nav>
<main>
  <div class="container">
    <section class="hero">
      <div class="hero-eyebrow">
        <span class="chip orange">Infrastructure</span>
        <span class="chip green">Proxmox VE</span>
        <span class="chip blue">Active Directory</span>
        <span class="chip cyan">TrueNAS</span>
        <span class="chip">Projet de cours &mdash; BTS SIO SISR</span>
      </div>
      <h1>Infrastructure<br><span class="accent">Virtualis&eacute;e</span><br>sous Proxmox</h1>
      <p class="hero-desc">Conception et d&eacute;ploiement complet d&rsquo;une infrastructure d&rsquo;entreprise simul&eacute;e sur Proxmox VE : contr&ocirc;leur de domaine Active Directory, serveur de fichiers TrueNAS, segmentation r&eacute;seau par VLAN, et services Ubuntu (DNS, DHCP, web). Enti&egrave;rement document&eacute;.</p>
      <div class="hero-stats">
        <div class="stat"><span class="stat-value">6</span><span class="stat-label">VMs d&eacute;ploy&eacute;es</span></div>
        <div class="stat"><span class="stat-value">4</span><span class="stat-label">VLANs</span></div>
        <div class="stat"><span class="stat-value">3</span><span class="stat-label">Services actifs</span></div>
        <div class="stat"><span class="stat-value">100%</span><span class="stat-label">Document&eacute;</span></div>
      </div>
    </section>
    <hr class="divider">
    <section class="section reveal">
      <div class="section-head"><h2>Contexte</h2></div>
      <div class="ctx-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:var(--sp-5);">
        <div class="card"><h3>Objectif p&eacute;dagogique</h3><p>Ce projet de deuxi&egrave;me ann&eacute;e de BTS SIO option SISR avait pour objectif de concevoir et d&eacute;ployer une infrastructure r&eacute;seau compl&egrave;te et fonctionnelle, simulant un environnement d&rsquo;entreprise r&eacute;el sur un hyperviseur.</p></div>
        <div class="card"><h3>Choix technologiques</h3><ul><li>Proxmox VE pour la virtualisation (open-source, type&nbsp;1)</li><li>Windows Server&nbsp;2022 pour l&rsquo;Active Directory</li><li>TrueNAS SCALE pour le stockage r&eacute;seau (NAS/SMB)</li><li>Ubuntu Server pour les services r&eacute;seau</li></ul></div>
      </div>
    </section>
    <section class="section reveal">
      <div class="section-head"><h2>Sch&eacute;ma r&eacute;seau</h2></div>
      <div class="schema-box">
        <svg viewBox="0 0 900 420" xmlns="http://www.w3.org/2000/svg" style="background:#030303;width:100%;display:block;">
          <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#8f8f8f"/></marker></defs>
          <rect x="20" y="30" width="860" height="360" rx="10" fill="none" stroke="#161616" stroke-width="1.5" stroke-dasharray="6,4"/>
          <text x="40" y="55" fill="#8f8f8f" font-family="monospace" font-size="11">PROXMOX VE HOST &mdash; 192.168.1.0/24</text>
          <rect x="50" y="70" width="180" height="280" rx="8" fill="#0d0d0d" stroke="#7ef47330" stroke-width="1"/>
          <text x="140" y="93" fill="#7ef473" font-family="monospace" font-size="10" text-anchor="middle">VLAN 10</text>
          <text x="140" y="108" fill="#8f8f8f" font-family="monospace" font-size="9" text-anchor="middle">10.0.10.0/24</text>
          <rect x="70" y="125" width="140" height="60" rx="6" fill="#161616" stroke="#4d8fff40"/>
          <text x="140" y="148" fill="#4d8fff" font-family="monospace" font-size="10" text-anchor="middle">Windows Server</text>
          <text x="140" y="162" fill="#8f8f8f" font-family="monospace" font-size="9" text-anchor="middle">AD / DNS / DHCP</text>
          <text x="140" y="175" fill="#8f8f8f" font-family="monospace" font-size="9" text-anchor="middle">10.0.10.10</text>
          <rect x="70" y="205" width="140" height="50" rx="6" fill="#161616" stroke="#16161650"/>
          <text x="140" y="225" fill="#eeeeee" font-family="monospace" font-size="9" text-anchor="middle">Client Windows 10</text>
          <text x="140" y="240" fill="#8f8f8f" font-family="monospace" font-size="9" text-anchor="middle">10.0.10.20 (DHCP)</text>
          <text x="140" y="290" fill="#8f8f8f" font-family="monospace" font-size="9" text-anchor="middle">Administration</text>
          <rect x="250" y="70" width="180" height="280" rx="8" fill="#0d0d0d" stroke="#f0510030" stroke-width="1"/>
          <text x="340" y="93" fill="#f05100" font-family="monospace" font-size="10" text-anchor="middle">VLAN 20</text>
          <text x="340" y="108" fill="#8f8f8f" font-family="monospace" font-size="9" text-anchor="middle">10.0.20.0/24</text>
          <rect x="270" y="125" width="140" height="60" rx="6" fill="#161616" stroke="#00bb7f40"/>
          <text x="340" y="148" fill="#00bb7f" font-family="monospace" font-size="10" text-anchor="middle">TrueNAS SCALE</text>
          <text x="340" y="162" fill="#8f8f8f" font-family="monospace" font-size="9" text-anchor="middle">NAS / SMB / iSCSI</text>
          <text x="340" y="175" fill="#8f8f8f" font-family="monospace" font-size="9" text-anchor="middle">10.0.20.10</text>
          <text x="340" y="290" fill="#8f8f8f" font-family="monospace" font-size="9" text-anchor="middle">Stockage</text>
          <rect x="450" y="70" width="180" height="280" rx="8" fill="#0d0d0d" stroke="#ac4bff30" stroke-width="1"/>
          <text x="540" y="93" fill="#ac4bff" font-family="monospace" font-size="10" text-anchor="middle">VLAN 30</text>
          <text x="540" y="108" fill="#8f8f8f" font-family="monospace" font-size="9" text-anchor="middle">10.0.30.0/24</text>
          <rect x="470" y="125" width="140" height="60" rx="6" fill="#161616" stroke="#f0510040"/>
          <text x="540" y="148" fill="#f05100" font-family="monospace" font-size="10" text-anchor="middle">Ubuntu Server</text>
          <text x="540" y="162" fill="#8f8f8f" font-family="monospace" font-size="9" text-anchor="middle">Apache / PHP</text>
          <text x="540" y="175" fill="#8f8f8f" font-family="monospace" font-size="9" text-anchor="middle">10.0.30.10</text>
          <text x="540" y="290" fill="#8f8f8f" font-family="monospace" font-size="9" text-anchor="middle">Services web</text>
          <rect x="650" y="70" width="200" height="280" rx="8" fill="#0d0d0d" stroke="#8f8f8f20" stroke-width="1"/>
          <text x="750" y="93" fill="#8f8f8f" font-family="monospace" font-size="10" text-anchor="middle">VLAN 99 (Mgmt)</text>
          <text x="750" y="108" fill="#8f8f8f" font-family="monospace" font-size="9" text-anchor="middle">192.168.1.0/24</text>
          <rect x="670" y="125" width="160" height="60" rx="6" fill="#161616" stroke="#7ef47340"/>
          <text x="750" y="148" fill="#7ef473" font-family="monospace" font-size="10" text-anchor="middle">pfSense / Pare-feu</text>
          <text x="750" y="162" fill="#8f8f8f" font-family="monospace" font-size="9" text-anchor="middle">Inter-VLAN routing</text>
          <text x="750" y="175" fill="#8f8f8f" font-family="monospace" font-size="9" text-anchor="middle">192.168.1.1</text>
          <text x="750" y="290" fill="#8f8f8f" font-family="monospace" font-size="9" text-anchor="middle">S&eacute;curit&eacute; / Routage</text>
          <line x1="230" y1="200" x2="250" y2="200" stroke="#8f8f8f" stroke-width="1" marker-end="url(#arr)"/>
          <line x1="430" y1="200" x2="450" y2="200" stroke="#8f8f8f" stroke-width="1" marker-end="url(#arr)"/>
          <line x1="630" y1="200" x2="650" y2="200" stroke="#8f8f8f" stroke-width="1" marker-end="url(#arr)"/>
        </svg>
        <div class="schema-caption">Sch&eacute;ma logique de l&rsquo;infrastructure &mdash; 4 VLANs segment&eacute;s sous Proxmox VE</div>
      </div>
    </section>
    <section class="section reveal">
      <div class="section-head"><h2>Services d&eacute;ploy&eacute;s</h2></div>
      <div class="svc-grid">
        <div class="svc-card"><div class="svc-icon">&#128419;</div><h4>Active Directory</h4><p>Contr&ocirc;leur de domaine Windows Server 2022. Gestion des utilisateurs, groupes, GPO et authentification centralis&eacute;e (LDAP/Kerberos).</p></div>
        <div class="svc-card"><div class="svc-icon">&#128450;</div><h4>TrueNAS SCALE</h4><p>Serveur NAS avec partages SMB pour les dossiers utilisateurs, iSCSI pour le stockage en bloc, et snapshots ZFS automatiques.</p></div>
        <div class="svc-card"><div class="svc-icon">&#127760;</div><h4>DNS / DHCP</h4><p>R&eacute;solution de noms interne int&eacute;gr&eacute;e &agrave; l&rsquo;AD. Distribution automatique des adresses IP sur les VLANs via le service DHCP du contr&ocirc;leur de domaine.</p></div>
        <div class="svc-card"><div class="svc-icon">&#128274;</div><h4>pfSense</h4><p>Pare-feu et routeur inter-VLAN. R&egrave;gles de filtrage entre segments, NAT, et isolation du trafic entre VLANs.</p></div>
        <div class="svc-card"><div class="svc-icon">&#128230;</div><h4>Proxmox VE</h4><p>Hyperviseur de type 1 g&eacute;rant l&rsquo;ensemble des VMs. Interface web d&rsquo;administration, gestion des bridges r&eacute;seau virtuels et snapshots.</p></div>
        <div class="svc-card"><div class="svc-icon">&#128187;</div><h4>Apache / Ubuntu</h4><p>Serveur web Ubuntu sur VLAN d&eacute;di&eacute;. H&eacute;bergement de services internes accessibles uniquement depuis le r&eacute;seau d&rsquo;entreprise.</p></div>
      </div>
    </section>
    <section class="section reveal">
      <div class="section-head"><h2>Plan d&rsquo;adressage r&eacute;seau</h2></div>
      <div class="card" style="padding:0;overflow:hidden;">
        <table class="net-table">
          <thead><tr><th>VLAN</th><th>R&ocirc;le</th><th>Sous-r&eacute;seau</th><th>Passerelle</th><th>Services</th></tr></thead>
          <tbody>
            <tr><td class="td-mono">VLAN 10</td><td>Administration</td><td class="td-mono">10.0.10.0/24</td><td class="td-mono">10.0.10.1</td><td>AD, DNS, DHCP, Client Windows</td></tr>
            <tr><td class="td-mono">VLAN 20</td><td>Stockage</td><td class="td-mono">10.0.20.0/24</td><td class="td-mono">10.0.20.1</td><td>TrueNAS (SMB, iSCSI)</td></tr>
            <tr><td class="td-mono">VLAN 30</td><td>Services web</td><td class="td-mono">10.0.30.0/24</td><td class="td-mono">10.0.30.1</td><td>Apache, PHP (Ubuntu)</td></tr>
            <tr><td class="td-mono">VLAN 99</td><td>Management</td><td class="td-mono">192.168.1.0/24</td><td class="td-mono">192.168.1.1</td><td>Proxmox host, pfSense WAN</td></tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="section reveal">
      <div class="section-head"><h2>D&eacute;roulement du projet</h2></div>
      <div class="timeline">
        <div class="tl-item"><div class="tl-date">Phase 1</div><div class="tl-line"></div><div class="tl-content"><h4>Analyse &amp; conception</h4><p>D&eacute;finition des besoins, choix des technologies, &eacute;laboration du sch&eacute;ma r&eacute;seau et du plan d&rsquo;adressage IP. R&eacute;daction du cahier des charges.</p></div></div>
        <div class="tl-item"><div class="tl-date">Phase 2</div><div class="tl-line"></div><div class="tl-content"><h4>Installation Proxmox &amp; r&eacute;seau</h4><p>Installation de Proxmox VE sur le serveur physique. Configuration des bridges r&eacute;seau virtuels (vmbr) et cr&eacute;ation des VLANs. D&eacute;ploiement de pfSense comme routeur inter-VLAN.</p></div></div>
        <div class="tl-item"><div class="tl-date">Phase 3</div><div class="tl-line"></div><div class="tl-content"><h4>D&eacute;ploiement Active Directory</h4><p>Installation de Windows Server 2022, promotion en contr&ocirc;leur de domaine, configuration DNS et DHCP int&eacute;gr&eacute;s, cr&eacute;ation des OU, utilisateurs et GPO.</p></div></div>
        <div class="tl-item"><div class="tl-date">Phase 4</div><div class="tl-line"></div><div class="tl-content"><h4>TrueNAS &amp; services Ubuntu</h4><p>D&eacute;ploiement de TrueNAS SCALE avec configuration des pools ZFS, partages SMB et snapshots. Installation du serveur Ubuntu avec Apache pour les services internes.</p></div></div>
        <div class="tl-item"><div class="tl-date">Phase 5</div><div class="tl-line"></div><div class="tl-content"><h4>Tests &amp; documentation</h4><p>Tests de connectivit&eacute; inter-VLAN, v&eacute;rification des r&egrave;gles de filtrage pfSense, jonction des postes clients au domaine AD. R&eacute;daction de la documentation compl&egrave;te.</p></div></div>
      </div>
    </section>
    <section class="section reveal">
      <div class="section-head"><h2>D&eacute;fis rencontr&eacute;s</h2></div>
      <div class="challenge-list">
        <div class="challenge"><div class="challenge-num">01</div><div><h4>Routage inter-VLAN sous Proxmox</h4><p>La configuration des bridges r&eacute;seau virtuels (vmbr) avec taggage VLAN 802.1Q dans Proxmox n&eacute;cessite une compr&eacute;hension fine de la pile r&eacute;seau Linux. J&rsquo;ai d&ucirc; comprendre le fonctionnement du module kernel 8021q et la diff&eacute;rence entre bridges Linux natifs et OVS avant d&rsquo;obtenir un routage fonctionnel.</p></div></div>
        <div class="challenge"><div class="challenge-num">02</div><div><h4>Int&eacute;gration TrueNAS &rarr; Active Directory</h4><p>La jonction de TrueNAS au domaine AD pour l&rsquo;authentification unifi&eacute;e (Kerberos + Winbind) a n&eacute;cessit&eacute; une synchronisation pr&eacute;cise du temps (NTP) entre les VMs et une configuration DNS coh&eacute;rente.</p></div></div>
        <div class="challenge"><div class="challenge-num">03</div><div><h4>Allocation des ressources</h4><p>G&eacute;rer 6 VMs simultan&eacute;es sur un seul h&ocirc;te physique avec des ressources limit&eacute;es a demand&eacute; une optimisation fine des allocations RAM/CPU. Windows Server 2022 et TrueNAS sont particuli&egrave;rement gourmands, ce qui a conduit &agrave; privil&eacute;gier l&rsquo;allocation dynamique de m&eacute;moire (ballooning).</p></div></div>
      </div>
    </section>
    <section class="section reveal">
      <div class="section-head"><h2>Comp&eacute;tences mobilis&eacute;es</h2></div>
      <div class="comp-grid">
        <div class="comp-item"><span class="comp-dot"></span>Virtualisation (Proxmox VE)</div>
        <div class="comp-item"><span class="comp-dot"></span>Segmentation VLAN 802.1Q</div>
        <div class="comp-item"><span class="comp-dot"></span>Active Directory &amp; GPO</div>
        <div class="comp-item"><span class="comp-dot"></span>DNS / DHCP int&eacute;gr&eacute;s AD</div>
        <div class="comp-item"><span class="comp-dot"></span>Stockage NAS (TrueNAS / ZFS)</div>
        <div class="comp-item"><span class="comp-dot"></span>Pare-feu pfSense</div>
        <div class="comp-item"><span class="comp-dot"></span>Administration Linux (Ubuntu)</div>
        <div class="comp-item"><span class="comp-dot"></span>Routage inter-VLAN</div>
        <div class="comp-item"><span class="comp-dot"></span>Documentation technique</div>
        <div class="comp-item"><span class="comp-dot"></span>Gestion de projet</div>
      </div>
    </section>
  </div>
</main>
<footer class="footer">
  <div class="container">
    <p>&copy; 2026 Quentin SILVA &mdash; Portfolio BTS SIO SISR</p>
    <a href="/" class="btn-back"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Retour au portfolio</a>
  </div>
</footer>
<script>
  window.addEventListener('scroll',()=>{const h=document.documentElement;document.getElementById('pf').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';});
  const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target);}});},{threshold:.07});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
</script>
</body>
</html>`

  return (
    <html>
      <body
        dangerouslySetInnerHTML={{ __html: html }}
        suppressHydrationWarning
      />
    </html>
  )
}
