import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowRight, ArrowDown, Check, ChevronDown, ChevronLeft, ChevronRight, Crosshair, Instagram, Menu, X, Swords, Paintbrush, ShieldCheck, Upload, ZoomIn, MoveHorizontal, Download, MapPin, Mail, ImagePlus, PackageCheck, Sparkles } from 'lucide-react';
import './styles.css';

const image = (name) => `/images/${name}.jpg`;

function Mark({ className = '' }) {
  return <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="m32 4 7 16-7 38-7-38Z" fill="currentColor"/><path d="m5 17 19 8 8 33-19-21Zm54 0-19 8-8 33 19-21Z" fill="currentColor"/><path d="M23 15h18v4H23z" fill="currentColor"/></svg>;
}

const services = [
  { number: '01', name: 'UNIDADES', desc: 'Un ejército con identidad. Escuadras listas para conquistar la mesa.', img: 'squad', tag: 'COHESIÓN EN CADA FILA', position: 'center' },
  { number: '02', name: 'PERSONAJES', desc: 'El protagonismo que tus héroes merecen, hasta en el último detalle.', img: 'detail', tag: 'CADA HÉROE, UNA HISTORIA', position: '50% 38%' },
  { number: '03', name: 'VEHÍCULOS', desc: 'Blindajes, desgaste y potencia. Máquinas con historia de batalla.', img: 'patrol', tag: 'PRESENCIA EN EL CAMPO', position: 'left' },
  { number: '04', name: 'BASES', desc: 'El universo bajo sus pies. Texturas y escenarios a su medida.', img: 'character', tag: 'LA HISTORIA EMPIEZA AQUÍ', position: '50% 69%' },
];
const works = [
  { title: 'Hijos del Emperador', subtitle: 'Personaje · Acabado avanzado', category: 'Personajes', img: 'detail', position: 'center' },
  { title: 'La fuerza del Imperio', subtitle: 'Unidad · Esquema de ejército', category: 'Unidades', img: 'squad', position: 'center' },
  { title: 'Entre sombras y acero', subtitle: 'Personaje · Acabado intermedio', category: 'Personajes', img: 'painted', position: 'center' },
  { title: 'Runas de otro mundo', subtitle: 'Base escénica · Aeldari', category: 'Bases', img: 'character', position: '50% 65%' },
  { title: 'Preparados para la batalla', subtitle: 'Fuerza de combate · Vehículos y tropas', category: 'Vehículos', img: 'patrol', position: 'center' },
];
const levels = [
  { name: 'BÁSICO', alias: 'Battle Ready', number: 'I', desc: 'Tu ejército listo para entrar en batalla.', items: ['Colores base limpios y uniformes', 'Sombras con lavados', 'Detalles esenciales y base texturizada', 'Barniz de protección'], className: 'basic' },
  { name: 'INTERMEDIO', alias: 'Parade Ready', number: 'II', desc: 'Ese detalle que hace mirar dos veces.', items: ['Todo lo incluido en Básico', 'Luces en aristas y más profundidad', 'Rostros, lentes y detalles definidos', 'Base decorada con más elementos'], className: 'intermediate', featured: true },
  { name: 'AVANZADO', alias: 'Display', number: 'III', desc: 'Una pieza que merece su propia vitrina.', items: ['Todo lo incluido en Intermedio', 'Transiciones y luces de mayor precisión', 'Efectos, desgaste y detalles a medida', 'Base escénica y composición'], className: 'advanced' },
];
const questions = [
  ['¿Cuánto tarda un encargo?', 'El plazo depende de la cantidad de miniaturas, su tamaño y el nivel de acabado. Al revisar tu proyecto acordamos una fecha de inicio y un plazo de entrega, que quedan incluidos en el presupuesto.'],
  ['¿Cómo les hago llegar mis miniaturas?', 'Podemos coordinar una entrega en Santiago o la recepción por encomienda. Antes de enviar, acordamos los datos de recepción y te orientamos para proteger cada figura con un embalaje adecuado.'],
  ['¿Realizan envíos a otras regiones?', 'Sí, podemos coordinar envíos dentro de Chile. El transporte y su costo se acuerdan por separado en la cotización. Las figuras se protegen individualmente para el viaje de vuelta.'],
  ['¿Las figuras tienen que estar montadas?', 'Puedes entregar tus miniaturas montadas o en matriz. El montaje, la limpieza de líneas de molde y la imprimación se evalúan al preparar el presupuesto. Algunas piezas se pintan por separado para llegar a todos los detalles.'],
  ['¿Cómo funcionan los pagos?', 'El presupuesto detalla el valor, el anticipo necesario para reservar y el saldo previo a la entrega. Acordamos estas condiciones antes de empezar; cualquier cambio de alcance se revisa contigo.'],
  ['¿Pueden seguir mi esquema de color?', 'Sí. Adjunta fotografías, paletas o referencias y cuéntanos qué quieres conservar. También podemos ayudarte a definir una identidad de color coherente para todo tu ejército.'],
];

function App() {
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState('Todos');
  const [lightbox, setLightbox] = useState(null);
  const [slider, setSlider] = useState(52);
  const [level, setLevel] = useState('Intermedio');
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [request, setRequest] = useState(null);
  const [preparing, setPreparing] = useState(false);
  const [social, setSocial] = useState(null);
  const closeRef = useRef(null);
  const previousFocus = useRef(null);
  const visibleWorks = works.filter(w => filter === 'Todos' || w.category === filter);

  useEffect(() => {
    if (!lightbox && !social) return;
    previousFocus.current = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    function keydown(e) {
      if (e.key === 'Escape') { setLightbox(null); setSocial(null); }
      if (lightbox && e.key === 'ArrowRight') setLightbox(works[(works.indexOf(lightbox) + 1) % works.length]);
      if (lightbox && e.key === 'ArrowLeft') setLightbox(works[(works.indexOf(lightbox) - 1 + works.length) % works.length]);
      if (e.key === 'Tab') {
        const focusable = [...document.querySelectorAll('.modal button, .modal a')];
        const first = focusable[0], last = focusable.at(-1);
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    }
    window.addEventListener('keydown', keydown);
    return () => { document.body.style.overflow = oldOverflow; window.removeEventListener('keydown', keydown); previousFocus.current?.focus(); };
  }, [lightbox, social]);

  function chooseLevel(name) { setLevel(name[0] + name.slice(1).toLowerCase()); setSubmitted(false); }
  function addFiles(selected) {
    const incoming = [...selected];
    if (incoming.some(f => !['image/jpeg', 'image/png', 'image/webp'].includes(f.type) || f.size > 5 * 1024 * 1024)) { setFileError('Usa imágenes JPG, PNG o WEBP de hasta 5 MB cada una.'); return; }
    if (files.length + incoming.length > 5) { setFileError('Puedes adjuntar hasta 5 fotografías.'); return; }
    setFiles([...files, ...incoming]); setFileError(''); setSubmitted(false);
  }
  async function submit(e) {
    e.preventDefault(); setPreparing(true);
    try {
      const data = Object.fromEntries(new FormData(e.currentTarget));
      delete data.photos;
      const photos = await Promise.all(files.map(f => new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve({ nombre: f.name, contenido: reader.result }); reader.onerror = reject; reader.readAsDataURL(f); })));
      const prepared = { estudio: 'Forja Oscura', fecha: new Date().toISOString(), ...data, fotos: photos };
      setRequest(prepared); setSubmitted(true);
    } catch { setFileError('No pudimos leer una de las imágenes. Vuelve a adjuntarla.'); }
    finally { setPreparing(false); }
  }
  function downloadRequest() {
    const url = URL.createObjectURL(new Blob([JSON.stringify(request, null, 2)], { type: 'application/json' }));
    const a = document.createElement('a'); a.href = url; a.download = 'cotizacion-forja-oscura.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return <>
    <a className="skip-link" href="#contenido">Ir al contenido</a>
    <header className="header">
      <a className="brand" href="#inicio" aria-label="Forja Oscura, inicio"><Mark /><span>FORJA <b>OSCURA</b><small>MINIATURE PAINTING STUDIO</small></span></a>
      <nav id="mobile-navigation" className={menu ? 'nav open' : 'nav'} aria-label="Navegación principal">
        {[['Servicios', 'servicios'], ['Acabados', 'acabados'], ['Galería', 'galeria'], ['El proceso', 'proceso']].map(([title, id]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{title}</a>)}
        <a className="nav-mobile-contact" href="#contacto" onClick={() => setMenu(false)}>Cotizar mi proyecto <ArrowUpRight size={17}/></a>
      </nav>
      <a className="header-cta" href="#contacto">HABLEMOS DE TU EJÉRCITO <ArrowUpRight size={16}/></a>
      <button className="menu-toggle" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="mobile-navigation" aria-label={menu ? 'Cerrar menú' : 'Abrir menú'}>{menu ? <X/> : <Menu/>}</button>
    </header>

    <main id="contenido">
      <section className="hero" id="inicio">
        <div className="hero-art" role="img" aria-label="Guerrero del Imperio con armadura y espada en un campo de batalla"/>
        <div className="hero-grid"/>
        <div className="hero-content container">
          <div className="eyebrow"><span className="red-line"/> PINTURA DE MINIATURAS · WARHAMMER 40,000</div>
          <h1>DALE VIDA<br/>A TU <span>EJÉRCITO.</span></h1>
          <p>De plástico a leyenda. Pintamos cada miniatura con<br className="desktop-break"/> la dedicación que tu universo merece.</p>
          <div className="hero-actions"><a className="button button-primary" href="#contacto">COTIZAR MIS MINIATURAS <ArrowUpRight size={20}/></a><a className="text-link" href="#galeria">Explorar la galería <ArrowRight size={17}/></a></div>
          <div className="hero-features"><span><Paintbrush size={16}/> Pintado a mano</span><span><Crosshair size={16}/> A tu medida</span><span><PackageCheck size={16}/> Envíos a todo Chile</span></div>
        </div>
        <div className="hero-side">EN EL OSCURO FUTURO, CADA DETALLE CUENTA.</div>
        <button className="hero-featured" onClick={() => setLightbox(works[0])}><img src={image('detail')} alt="Miniatura terminada en armadura púrpura y oro"/><span><small>DEL TALLER A LA MESA</small><strong>El detalle hace la leyenda.</strong><em>Ver de cerca <ArrowUpRight size={14}/></em></span><ZoomIn size={18}/></button>
        <div className="hero-bottom container"><span>PARA QUIENES VEN MÁS QUE UNA MINIATURA.</span><a href="#servicios">DESCUBRE LA FORJA <ArrowDown size={16}/></a></div>
      </section>

      <div className="manifesto"><span>HECHO A MANO.</span><Mark/><span>PENSADO PARA LA BATALLA.</span><Mark/><span>PINTADO PARA DESTACAR.</span><Mark/><span className="manifesto-extra">FORJADO CON PASIÓN.</span></div>

      <section className="section container services" id="servicios">
        <div className="section-heading"><div><div className="eyebrow"><span className="red-line"/> 01 / EL TALLER</div><h2>TÚ IMAGINAS.<br/>NOSOTROS <span>LO PINTAMOS.</span></h2></div><p>Desde tu primera escuadra hasta esa pieza<br className="desktop-break"/> que se lleva todas las miradas. Cada proyecto<br className="desktop-break"/> tiene su lugar en nuestra mesa.</p></div>
        <div className="service-grid">{services.map(s => <a className="service-card" href="#contacto" key={s.name} onClick={() => { const select = document.querySelector('[name="tipo"]'); if (select) select.value = s.name === 'BASES' ? 'Bases y escenografía' : s.name[0] + s.name.slice(1).toLowerCase(); }}><div className={`service-photo service-${s.name.toLowerCase()}`}><img loading="lazy" src={image(s.img)} alt={`Pintura de ${s.name.toLowerCase()} Warhammer`} style={{ objectPosition: s.position }}/><span className="service-no">{s.number}</span><span className="service-tag">{s.tag}</span></div><div className="service-info"><h3>{s.name}<ArrowUpRight size={22}/></h3><p>{s.desc}</p></div></a>)}</div>
        <div className="service-note"><ShieldCheck size={18}/><span>Tu ejército, tu identidad. Trabajamos con tu esquema de color o creamos uno contigo.</span><span className="note-end">CADA DETALLE IMPORTA.</span></div>
      </section>

      <section className="levels-section section" id="acabados"><div className="container">
        <div className="section-heading"><div><div className="eyebrow"><span className="red-line"/> 02 / ELIGE TU ACABADO</div><h2>TRES NIVELES.<br/>LA MISMA <span>DEDICACIÓN.</span></h2></div><p>Una escuadra para jugar. Un héroe para exhibir.<br/>Encuentra el acabado que encaja con tu proyecto.<br/><small>Presupuesto personalizado según cada miniatura.</small></p></div>
        <div className="level-grid">{levels.map(l => <article className={`level-card ${l.featured ? 'featured' : ''}`} key={l.name}>{l.featured && <div className="level-popular"><Sparkles size={13}/> EL EQUILIBRIO PERFECTO</div>}<div className={`level-photo ${l.className}`}><img src={image('painted')} alt={`Referencia de miniatura para acabado ${l.name.toLowerCase()}`} loading="lazy"/><span className="level-roman">{l.number}</span></div><div className="level-info"><div className="level-title"><h3>{l.name}</h3><span>{l.alias}</span></div><p>{l.desc}</p><ul>{l.items.map(i => <li key={i}><Check size={14}/>{i}</li>)}</ul><a className={`button ${l.featured ? 'button-primary' : 'button-outline'}`} href="#contacto" onClick={() => chooseLevel(l.name)}>ELEGIR {l.name} <ArrowUpRight size={16}/></a></div></article>)}</div>
        <p className="level-caption">Una misma miniatura como referencia visual. El alcance de cada acabado se acuerda para tu proyecto.</p>
      </div></section>

      <section className="section container gallery" id="galeria">
        <div className="section-heading"><div><div className="eyebrow"><span className="red-line"/> 03 / LA GALERÍA</div><h2>EL DETALLE<br/>MARCA LA <span>DIFERENCIA.</span></h2></div><p>Acércate. Hay una historia en cada pincelada.<br/><span className="small-icon-text"><ZoomIn size={15}/> Haz clic en una imagen para explorar los detalles.</span></p></div>
        <div className="gallery-toolbar"><div className="filters" role="group" aria-label="Filtrar galería">{['Todos', 'Unidades', 'Personajes', 'Vehículos', 'Bases'].map(f => <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f} className={filter === f ? 'active' : ''}>{f}{filter === f && <span/>}</button>)}</div><span className="gallery-count">{String(visibleWorks.length).padStart(2, '0')} PROYECTOS / INSPIRACIÓN</span></div>
        <div className={`gallery-grid ${filter !== 'Todos' ? 'is-filtered' : ''}`}>{visibleWorks.map((w) => <button className={`gallery-item gallery-${w.img}`} key={w.title} onClick={() => setLightbox(w)}><img src={image(w.img)} loading="lazy" alt={w.title} style={{ objectPosition: w.position }}/><span className="gallery-zoom"><ZoomIn size={19}/></span><span className="gallery-description"><strong>{w.title}</strong><small>{w.subtitle}</small></span></button>)}</div>
      </section>

      <section className="comparison-section"><div className="container comparison-layout"><div className="comparison-copy"><div className="eyebrow"><span className="red-line"/> 04 / LA TRANSFORMACIÓN</div><h2>DEL PLÁSTICO<br/>A LA <span>LEYENDA.</span></h2><p>Un mismo guerrero. Una nueva historia.<br/>Descubre lo que el color, la luz y un pincel<br className="desktop-break"/> pueden hacer por tus miniaturas.</p><div className="drag-hint"><MoveHorizontal size={25}/><span>DESLIZA PARA VER<br/><b>LA TRANSFORMACIÓN</b></span></div><a className="text-link" href="#contacto">Imagina lo que podemos hacer con las tuyas <ArrowUpRight size={18}/></a></div><div><div className="comparison" style={{ '--split': `${slider}%` }}><img className="comparison-after" src={image('painted')} alt="Miniatura pintada con armadura, telas y efectos de color"/><div className="comparison-before"><img src={image('painted')} alt="Vista simulada de la miniatura con imprimación gris"/></div><span className="comparison-label before-label">ANTES</span><span className="comparison-label after-label">DESPUÉS</span><div className="comparison-divider"><span><ChevronLeft size={19}/><ChevronRight size={19}/></span></div><input type="range" min="0" max="100" value={slider} onChange={e => setSlider(Number(e.target.value))} aria-label="Comparar antes y después de la pintura" aria-valuetext={`${slider}% de vista de imprimación`}/></div><p className="comparison-caption">Vista de imprimación recreada digitalmente para comparar el efecto del color.</p></div></div></section>

      <section className="section container process" id="proceso"><div className="section-heading"><div><div className="eyebrow"><span className="red-line"/> 05 / ASÍ TRABAJAMOS</div><h2>UN PLAN CLARO.<br/>UN RESULTADO <span>ÉPICO.</span></h2></div><p>Tú eliges el destino de tu ejército.<br/>Te acompañamos en cada paso del camino.</p></div><div className="process-grid">{[
        ['01', 'CUÉNTANOS TU IDEA', 'Envíanos fotografías, la cantidad de figuras y tus referencias de color.', ImagePlus],
        ['02', 'DEFINIMOS EL PLAN', 'Acordamos el acabado, el presupuesto y los plazos de tu proyecto.', Crosshair],
        ['03', 'RECIBIMOS TUS FIGURAS', 'Coordinamos la entrega o el envío de tus miniaturas al taller.', PackageCheck],
        ['04', 'EL PINCEL EN ACCIÓN', 'Damos vida a tu ejército y compartimos avances del proceso.', Paintbrush],
        ['05', 'LISTO PARA LA BATALLA', 'Revisamos cada detalle y coordinamos la entrega de tus figuras.', Swords],
      ].map(([n, title, desc, Icon]) => <article className="process-step" key={n}><div className="step-top"><span>{n}</span><Icon size={23}/></div><h3>{title}</h3><p>{desc}</p></article>)}</div></section>

      <section className="faq-section section"><div className="container faq-layout"><div><div className="eyebrow"><span className="red-line"/> 06 / ANTES DE EMPEZAR</div><h2>RESOLVAMOS<br/>TUS <span>DUDAS.</span></h2><p>Todo gran proyecto empieza<br/>con una buena conversación.</p><a className="text-link" href="#contacto">Hablemos del tuyo <ArrowUpRight size={17}/></a></div><div className="faq-list">{questions.map(([q, a], i) => <details key={q} name="faq"><summary><span className="faq-num">0{i + 1}</span>{q}<ChevronDown size={19}/></summary><p>{a}</p></details>)}</div></div></section>

      <section className="section contact-section" id="contacto"><div className="container contact-layout"><div className="contact-copy"><div className="eyebrow"><span className="red-line"/> 07 / TU PRÓXIMO PROYECTO</div><h2>¿QUÉ VAMOS<br/>A <span>FORJAR?</span></h2><p>Ese ejército que imaginas empieza aquí.<br/>Cuéntanos tu idea y preparemos el siguiente paso.</p><div className="contact-promises"><span><Check size={17}/> Presupuesto personalizado, sin compromiso</span><span><Check size={17}/> Un esquema de color que habla de ti</span><span><Check size={17}/> Atención a cada miniatura, de principio a fin</span></div><div className="contact-art"><Mark/><span>NO SOLO PINTAMOS FIGURAS.<br/><b>DAMOS FORMA A TU UNIVERSO.</b></span></div><span className="location"><MapPin size={16}/> SANTIAGO, CHILE · ENVÍOS A TODO EL PAÍS</span></div>
        <form className="quote-form" onSubmit={submit} onChange={() => { if (submitted) setSubmitted(false); }}><div className="form-heading"><h3>HABLEMOS DE TUS MINIATURAS</h3><span>01 — EL COMIENZO</span></div><div className="form-row"><label>Tu nombre <span>*</span><input name="nombre" placeholder="¿Cómo te llamas?" autoComplete="name" required maxLength={100}/></label><label>Email de contacto <span>*</span><input name="contacto" placeholder="tu@email.com" type="email" autoComplete="email" required maxLength={180}/></label></div><div className="form-row quantity-row"><label>Cantidad de miniaturas <span>*</span><input name="cantidad" type="number" min="1" max="10000" placeholder="Ej. 10" required/></label><label>Tipo de miniatura <span>*</span><select name="tipo" defaultValue="" required><option value="" disabled>Selecciona el tipo</option><option>Unidades</option><option>Personajes</option><option>Vehículos</option><option>Bases y escenografía</option><option>Ejército mixto</option></select></label></div><fieldset><legend>Nivel de acabado <span>*</span></legend><div className="level-options">{['Básico', 'Intermedio', 'Avanzado'].map(l => <label key={l} className={level === l ? 'selected' : ''}><input type="radio" name="acabado" value={l} checked={level === l} onChange={() => setLevel(l)}/><span/>{l}</label>)}</div></fieldset><label>Cuéntanos tu idea<textarea name="idea" rows="3" maxLength={4000} placeholder="Facción, esquema de color, fecha ideal... Queremos conocer tu proyecto."/></label><div className="upload-area" onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); addFiles(e.dataTransfer.files); }}><Upload size={22}/><div><strong>Añade fotografías de referencia</strong><small>Arrastra tus imágenes o <span>selecciona archivos</span></small><em>JPG, PNG o WEBP · Máx. 5 imágenes de 5 MB</em></div><input type="file" name="photos" aria-label="Añadir fotografías de referencia" accept="image/jpeg,image/png,image/webp" multiple onChange={e => { addFiles(e.target.files); e.target.value = ''; }}/></div>{files.length > 0 && <ul className="file-list">{files.map((f, i) => <li key={`${f.name}-${i}`}><ImagePlus size={14}/><span>{f.name}</span><button type="button" aria-label={`Eliminar ${f.name}`} onClick={() => setFiles(files.filter((_, j) => j !== i))}><X size={14}/></button></li>)}</ul>}{fileError && <p className="form-error" role="alert">{fileError}</p>}<button className="button button-primary submit-button" type="submit" disabled={preparing}>{preparing ? 'PREPARANDO TU PROYECTO…' : 'PREPARAR MI COTIZACIÓN'}<ArrowUpRight size={20}/></button><p className="form-note"><ShieldCheck size={13}/> Tu información y fotografías se mantienen en este navegador.</p>{submitted && <div className="form-success" role="status"><Check size={22}/><div><strong>Tu proyecto está listo para compartir.</strong><p>Descarga tu solicitud con los datos y fotografías adjuntas. Aún no se ha enviado a un taller.</p><button type="button" onClick={downloadRequest}><Download size={15}/> Descargar solicitud</button></div></div>}</form>
      </div></section>
    </main>

    <footer className="footer"><div className="container footer-top"><a className="brand" href="#inicio"><Mark/><span>FORJA <b>OSCURA</b><small>MINIATURE PAINTING STUDIO</small></span></a><p>Tu ejército tiene una historia.<br/>Hagamos que se vea.</p><div className="footer-links"><a href="#servicios">Servicios</a><a href="#galeria">Galería</a><a href="#proceso">El proceso</a><a href="#contacto">Contacto</a></div><div className="social-links"><button aria-label="Instagram" onClick={() => setSocial('Instagram')}><Instagram size={19}/></button><a aria-label="Ir al contacto" href="#contacto"><Mail size={19}/></a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} FORJA OSCURA. CADA DETALLE CUENTA.</span><span>SANTIAGO, CHILE <span className="status-dot"/> HECHO CON PASIÓN</span><a href="#inicio">VOLVER ARRIBA <ArrowUpRight size={14}/></a></div><div className="container legal-note">Estudio independiente. Warhammer 40,000 y sus marcas pertenecen a Games Workshop. Imágenes de referencia de sus respectivos autores.</div></footer>

    {lightbox && <div className="modal-overlay" onClick={() => setLightbox(null)}><div className="modal lightbox" role="dialog" aria-modal="true" aria-labelledby="lightbox-title" onClick={e => e.stopPropagation()}><button ref={closeRef} className="modal-close" onClick={() => setLightbox(null)} aria-label="Cerrar imagen"><X/></button><img src={image(lightbox.img)} alt={lightbox.title}/><div className="lightbox-bottom"><div><h3 id="lightbox-title">{lightbox.title}</h3><p>{lightbox.subtitle}</p></div><div className="lightbox-nav"><button aria-label="Imagen anterior" onClick={() => setLightbox(works[(works.indexOf(lightbox) - 1 + works.length) % works.length])}><ChevronLeft/></button><span>{works.indexOf(lightbox) + 1} / {works.length}</span><button aria-label="Imagen siguiente" onClick={() => setLightbox(works[(works.indexOf(lightbox) + 1) % works.length])}><ChevronRight/></button></div></div></div></div>}
    {social && <div className="modal-overlay" onClick={() => setSocial(null)}><div className="modal social-modal" role="dialog" aria-modal="true" aria-labelledby="social-title" onClick={e => e.stopPropagation()}><button ref={closeRef} className="modal-close" onClick={() => setSocial(null)} aria-label="Cerrar"><X/></button><Instagram size={32}/><h3 id="social-title">LA FORJA, MÁS DE CERCA.</h3><p>El perfil de Instagram estará disponible próximamente. Mientras tanto, explora los detalles en nuestra galería.</p><a className="button button-primary" href="#galeria" onClick={() => setSocial(null)}>EXPLORAR GALERÍA <ArrowUpRight size={17}/></a></div></div>}
  </>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
