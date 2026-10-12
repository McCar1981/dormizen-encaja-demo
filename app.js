"use strict";

const products = [
  { id:"nube", category:"colchones", name:"Colchón Nube", base:479, art:0, badge:"DESCANSO", description:"Acabado claro · firmeza a elegir", featured:"Una propuesta versátil para empezar." },
  { id:"origen", category:"colchones", name:"Colchón Origen", base:649, art:1, badge:"A MEDIDA", description:"Perfil alto · opciones de tamaño", featured:"Con más presencia y confort." },
  { id:"lino", category:"sofas", name:"Sofá Lino", base:749, art:2, badge:"SALÓN", description:"Silueta compacta · tapizado a elegir", featured:"Pensado para salones contenidos." },
  { id:"esquina", category:"sofas", name:"Sofá Esquina", base:1290, art:3, badge:"MODULAR", description:"Asientos generosos · tapizado a elegir", featured:"Una zona para reunirse." },
  { id:"aura", category:"relax", name:"Relax Aura", base:690, art:4, badge:"RELAX", description:"Reposapiés · mecanismo a elegir", featured:"Pausa cómoda, formato ligero." },
  { id:"terra", category:"relax", name:"Relax Terra", base:890, art:5, badge:"RELAX", description:"Acabado cálido · mecanismo a elegir", featured:"Presencia clásica, gesto actual." }
];
const categoryNames = {colchones:"Colchones",sofas:"Sofás",relax:"Sillones relax"};
const optionSets = {
  colchones:[
    {key:"width",label:"Ancho del colchón",choices:[{value:"90",label:"90 cm",extra:0},{value:"135",label:"135 cm",extra:90},{value:"150",label:"150 cm",extra:150},{value:"180",label:"180 cm",extra:240}]},
    {key:"length",label:"Largo",choices:[{value:"190",label:"190 cm",extra:0},{value:"200",label:"200 cm",extra:65}]},
    {key:"feel",label:"Sensación",choices:[{value:"media",label:"Equilibrada",extra:0},{value:"firme",label:"Firme",extra:35}]}
  ],
  sofas:[
    {key:"format",label:"Formato",choices:[{value:"180",label:"2 plazas · 180 cm",extra:0},{value:"220",label:"3 plazas · 220 cm",extra:210},{value:"260",label:"Chaise · 260 cm",extra:440}]},
    {key:"fabric",label:"Tapizado",choices:[{value:"arena",label:"Lino arena",extra:0},{value:"micro",label:"Microfibra",extra:85},{value:"anti",label:"Tejido antimanchas",extra:160}]}
  ],
  relax:[
    {key:"motion",label:"Mecanismo",choices:[{value:"manual",label:"Manual",extra:0},{value:"electric",label:"Eléctrico",extra:245}]},
    {key:"finish",label:"Acabado",choices:[{value:"textil",label:"Textil claro",extra:0},{value:"piel",label:"Piel",extra:225}]}
  ]
};
const money = new Intl.NumberFormat("es-ES",{style:"currency",currency:"EUR",maximumFractionDigits:0});
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
let activeModal = null;
let priorFocus = null;
let currentProduct = null;
let selected = {};
let currentQuote = null;
let cart = [];
let currentFilter = "all";
let currentDetails = null;
let selectedAccessoryIds = new Set();

const viewerModels = {
  sofa:{
    src:"assets/models/GlamVelvetSofa.glb",
    alt:"Modelo 3D de sofá de muestra GlamVelvetSofa, ajeno a DormiZen",
    credit:'<strong>Sofá 3D de muestra · GlamVelvetSofa.</strong> © 2021 Wayfair, LLC; Eric Chadwick. <a href="https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/GlamVelvetSofa" target="_blank" rel="noopener noreferrer">Origen</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>. Archivo original sin modificaciones. Es un modelo de un artículo Wayfair, ajeno a DormiZen.'
  },
  chair:{
    src:"assets/models/SheenChair.glb",
    alt:"Modelo 3D de sillón de muestra SheenChair, ajeno a DormiZen y sin mecanismo relax",
    credit:'<strong>Sillón 3D de muestra · SheenChair.</strong> © 2020 Wayfair, LLC; Eric Chadwick. <a href="https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/SheenChair" target="_blank" rel="noopener noreferrer">Origen</a> · <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener noreferrer">CC0 1.0</a>. Es un sillón genérico, sin mecanismo relax y ajeno a DormiZen.'
  }
};
let selectedViewerModel = "sofa";
let viewerModulePromise = null;
let viewerInitialized = false;
let viewerLoadTimer = null;


function productById(id){return products.find((p) => p.id === id);}
function artClass(p){return "product-art art-" + p.art;}
function productCard(p){
  const caveat=p.category==="colchones"?"Foto oficial de ambiente. El colchón, sus opciones y precio son ficticios.":"Foto oficial de referencia. Producto, opciones y precio ficticios.";
  return '<article class="product-card"><a class="product-image" href="#producto/'+p.id+'" data-open-product="'+p.id+'" aria-label="Ver ficha de '+p.name+'"><div class="'+artClass(p)+'" role="img" aria-label="Referencia visual de categoría, no del producto ficticio"></div><span class="product-label">'+p.badge+'</span><span class="photo-label">FOTO OFICIAL · REFERENCIA DE CATEGORÍA</span></a><div class="product-info"><span class="product-category">'+categoryNames[p.category]+' · CONCEPTO</span><h3><a href="#producto/'+p.id+'" data-open-product="'+p.id+'">'+p.name+'</a></h3><p>'+p.description+'</p><div class="product-bottom"><div class="product-price"><small>Desde · precio ilustrativo</small><strong>'+money.format(p.base)+'</strong></div><button type="button" data-open-product="'+p.id+'">Ver ficha ↗</button></div><p class="product-disclosure">'+caveat+'</p></div></article>';
}
function renderProducts(){
  const list=currentFilter==="all"?products:products.filter((p)=>p.category===currentFilter);
  $("#catalog-grid").innerHTML=list.map(productCard).join("");
}
function setFilter(filter){
  currentFilter = filter;
  $$(".filter").forEach((button) => {
    const active = button.dataset.filter === filter;
    button.classList.toggle("active",active);
    button.setAttribute("aria-pressed",String(active));
  });
  $$(".desktop-nav [data-filter],.mobile-quick-nav [data-filter]").forEach((link) => {
    const active = link.dataset.filter === filter;
    link.classList.toggle("is-active",active);
    if (active) link.setAttribute("aria-current","true");
    else link.removeAttribute("aria-current");
  });
  renderProducts();
}
function hideModal(restore){
  if (!activeModal) return;
  activeModal.hidden = true;
  activeModal = null;
  $("#overlay").hidden = true;
  document.body.classList.remove("modal-open");
  if (restore !== false && priorFocus && priorFocus.isConnected) priorFocus.focus();
}
function openModal(id){
  if (!activeModal) priorFocus = document.activeElement;
  else activeModal.hidden = true;
  activeModal = document.getElementById(id);
  activeModal.hidden = false;
  $("#overlay").hidden = false;
  document.body.classList.add("modal-open");
  const first = activeModal.querySelector("button, input");
  if (first) first.focus();
}
function renderOptions(){
  const sets = optionSets[currentProduct.category];
  $("#product-options").innerHTML = sets.map((group) => {
    const choices = group.choices.map((choice) =>
      '<button type="button" class="option-button' + (selected[group.key] === choice.value ? ' active' : '') + '" data-option="' + group.key + '" data-value="' + choice.value + '" aria-pressed="' + (selected[group.key] === choice.value) + '">' +
      choice.label + (choice.extra ? '<small>+' + money.format(choice.extra) + '</small>' : '<small>Incluido</small>') + '</button>'
    ).join("");
    return '<div class="config-group"><h3>' + group.label + '</h3><div class="option-row">' + choices + '</div></div>';
  }).join("");
}
function getChoice(key){
  const group = optionSets[currentProduct.category].find((g) => g.key === key);
  return group.choices.find((c) => c.value === selected[key]);
}
function dimensions(){
  if (currentProduct.category === "colchones") return {width:Number(selected.width),depth:Number(selected.length),pass:70,clearW:10,clearD:10,label:"Colchón " + selected.width + " × " + selected.length + " cm"};
  if (currentProduct.category === "sofas"){
    const width = Number(selected.format);
    const depth = width === 260 ? 160 : 95;
    return {width:width,depth:depth,pass:width === 260 ? 90 : 85,clearW:20,clearD:10,label:"Sofá " + width + " × " + depth + " cm"};
  }
  const electric = selected.motion === "electric";
  return {width:electric ? 85 : 82,depth:electric ? 175 : 165,pass:78,clearW:20,clearD:10,label:"Relax desplegado " + (electric ? 85 : 82) + " × " + (electric ? 175 : 165) + " cm"};
}
function manufacturable(){
  if (currentProduct.id === "nube" && selected.width === "180" && selected.length === "200") return false;
  if (currentProduct.id === "lino" && selected.format === "260") return false;
  if (currentProduct.id === "aura" && selected.motion === "electric" && selected.finish === "piel") return false;
  return true;
}
function postcodeState(cp){
  if (!/^\d{5}$/.test(cp)) return {status:"pending",detail:"Introduce 5 dígitos para ver la entrega de ejemplo."};
  const prefix = Number(cp.slice(0,2));
  if (prefix < 1 || prefix > 50 || [7,35,38].includes(prefix)) return {status:"bad",detail:"Fuera de la cobertura peninsular de este prototipo."};
  return {status:"ok",local:prefix === 46,detail:"Ejemplo peninsular: " + (prefix === 46 ? "7–12" : "12–20") + " días laborables."};
}
function readMeasure(id,min,max){
  const value = Number($(id).value);
  return Number.isFinite(value) && value >= min && value <= max ? value : null;
}
function fitRow(status,title,detail){
  const label = status === "ok" ? "✓" : status === "bad" ? "!" : "·";
  const className = status === "ok" ? "" : status === "bad" ? " bad" : " pending";
  return '<div class="fit-row' + className + '"><span class="fit-badge" aria-hidden="true">' + label + '</span><div><strong>' + title + '</strong><small>' + detail + '</small></div></div>';
}
function updateQuote(){
  if (!currentProduct) return;
  const dim = dimensions();
  const w = readMeasure("#room-width",50,1000);
  const d = readMeasure("#room-depth",50,1000);
  const pass = readMeasure("#door-width",40,300);
  const measured = w !== null && d !== null && pass !== null;
  const fits = measured && w >= dim.width + dim.clearW && d >= dim.depth + dim.clearD && pass >= dim.pass;
  const fabricated = manufacturable();
  const postcode = postcodeState($("#postcode").value.trim());
  const shipping = postcode.status === "ok" ? ({colchones:postcode.local ? 39 : 69,sofas:postcode.local ? 69 : 119,relax:postcode.local ? 59 : 89})[currentProduct.category] : null;
  const extras = optionSets[currentProduct.category].reduce((sum,group) => sum + getChoice(group.key).extra,0);
  const item = currentProduct.base + extras;
  const accessories = getSelectedAccessories();
  const complementTotal = accessories.reduce((sum,a)=>sum+a.price,0);
  const total = shipping === null ? null : item + shipping + complementTotal;
  let spaceDetail = "Completa las tres medidas con valores válidos.";
  if (measured) spaceDetail = fits ? dim.label + " · margen ilustrativo y paso mínimos cumplidos." : "Se requieren al menos " + (dim.width + dim.clearW) + " × " + (dim.depth + dim.clearD) + " cm libres y paso de " + dim.pass + " cm.";
  const fabricationDetail = fabricated ? "Combinación disponible en las reglas de esta demo." : "Esta combinación se ha marcado como no fabricable en la demo.";
  $("#fit-report").innerHTML =
    fitRow(!measured ? "pending" : fits ? "ok" : "bad","1 · Medidas y acceso",spaceDetail) +
    fitRow(fabricated ? "ok" : "bad","2 · Opción fabricable",fabricationDetail) +
    fitRow(postcode.status,"3 · Entrega por código postal",postcode.detail);
  $("#item-price").textContent = money.format(item);
  $("#shipping-price").textContent = shipping === null ? "Pendiente" : money.format(shipping);
  $("#complement-row").hidden = complementTotal === 0;
  $("#complement-price").textContent = money.format(complementTotal);
  $("#total-price").textContent = total === null ? "—" : money.format(total);
  const ready = fits && fabricated && postcode.status === "ok";
  $("#add-to-cart").disabled = !ready;
  $("#config-action-hint").textContent = ready ? "Total y entrega calculados solo para esta demostración." : "Revisa los avisos de Encaja para continuar.";
  currentQuote = ready ? {
    productId:currentProduct.id,name:currentProduct.name,art:currentProduct.art,
    options:optionSets[currentProduct.category].map((g) => getChoice(g.key).label).join(" · ") + (accessories.length ? " · Complementos: " + accessories.map(a=>a.name).join(", ") : ""),
    item:item,shipping:shipping,complements:complementTotal,total:total
  } : null;
  updateProductSummary({dim,item,shipping,total,complementTotal,ready,postcode});
}
function openConfig(id,fromRoute=false){
  currentProduct = productById(id);
  if (!currentProduct) return;
  if (activeModal) hideModal(false);
  currentDetails = window.DormiZenProductDetails[id];
  selectedAccessoryIds.clear();
  selected = Object.fromEntries(optionSets[currentProduct.category].map((g) => [g.key,g.choices[0].value]));
  $("#config-title").textContent = "Configura " + currentProduct.name;
  $("#config-product").innerHTML = '<div class="config-thumb ' + artClass(currentProduct) + '" role="img" aria-label="Fotografía oficial de referencia, no del producto ficticio"></div><div><span>' + categoryNames[currentProduct.category] + ' · EJEMPLO</span><h3>' + currentProduct.name + '</h3><p>' + currentProduct.featured + '</p></div>';
  $("#room-width").value = 300;
  $("#room-depth").value = 260;
  $("#door-width").value = 95;
  $("#postcode").value = "46800";
  renderOptions();
  renderProductDetails(currentProduct);
  updateQuote();
  activateProductPage(id,fromRoute);
}
function renderCart(){
  $("#cart-count").textContent = String(cart.length);
  $("#cart-total").textContent = money.format(cart.reduce((sum,item) => sum + item.total,0));
  $("#confirm-cart").disabled = cart.length === 0;
  if (!cart.length){
    $("#cart-items").innerHTML = '<div class="empty-cart"><div class="empty-cart-icon">◌</div><h3>Tu selección está vacía.</h3><p>Elige un producto y prueba cómo encaja.</p></div>';
    return;
  }
  $("#cart-items").innerHTML = cart.map((item,index) =>
    '<div class="cart-item"><div class="cart-thumb product-art art-' + item.art + '" role="img" aria-label="Fotografía oficial de referencia, no del producto ficticio"></div><div class="cart-item-main"><h3>' + item.name + '</h3><p>' + item.options + '</p><strong>' + money.format(item.total) + ' · total ilustrativo</strong><br><button type="button" class="cart-remove" data-remove="' + index + '">Quitar</button></div></div>'
  ).join("");
}
function showAdvisor(advice){
  const examples = {
    space:{title:"Aprovechar el espacio",text:"Puedes empezar por un sofá compacto y comprobar ancho, fondo y paso antes de decidir. El ejemplo de Sofá Lino permite probar ese recorrido.",id:"lino"},
    comfort:{title:"Máximo confort",text:"Prueba las medidas y sensaciones del Colchón Origen. El chequeo Encaja te enseña cómo quedaría esa elección en tu habitación.",id:"origen"},
    care:{title:"Fácil mantenimiento",text:"En esta simulación puedes comparar el acabado de microfibra del Sofá Esquina y revisar medidas y precio antes de añadirlo.",id:"esquina"}
  };
  const pick = examples[advice];
  if (!pick) return;
  $$("#advisor-options button").forEach((b) => b.classList.toggle("active",b.dataset.advice === advice));
  $("#advisor-response").innerHTML = '<div class="advisor-response-text"><strong>' + pick.title + '</strong><br>' + pick.text + '</div><button type="button" class="recommend-link" data-open-product="' + pick.id + '">Configurar el ejemplo recomendado ↗</button>';
}

function viewerStatus(message, error = false){
  $("#viewer-loading").hidden = !message || error;
  $("#viewer-error").hidden = !error;
  if (!error && message) $("#viewer-loading").textContent = message;
  if (error) $("#viewer-error").textContent = message;
}
function reset3DView(){
  const viewer = $("#sample-model");
  viewer.cameraOrbit = window.innerWidth <= 490 ? "30deg 70deg 105%" : window.innerWidth <= 760 ? "30deg 70deg 95%" : "30deg 70deg 82%";
  viewer.cameraTarget = "auto auto auto";
  viewer.fieldOfView = "auto";
  if (typeof viewer.jumpCameraToGoal === "function") viewer.jumpCameraToGoal();
}
function renderViewerVariants(){
  const wrap = $("#viewer-variants");
  const options = $("#viewer-variant-options");
  const viewer = $("#sample-model");
  options.replaceChildren();
  const variants = selectedViewerModel === "sofa" && Array.isArray(viewer.availableVariants) ? viewer.availableVariants : [];
  if (!variants.length){wrap.hidden = true;return;}
  const labels = {Black:"Negro",Champagne:"Champán",Gray:"Gris",Navy:"Azul marino","Pale Pink":"Rosa pálido"};
  variants.forEach((name) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.variant = name;
    button.textContent = labels[name] || name;
    button.setAttribute("aria-pressed","false");
    options.append(button);
  });
  wrap.hidden = false;
}
function createModelViewer(){
  const viewer = document.createElement("model-viewer");
  viewer.id = "sample-model";
  for (const [name,value] of Object.entries({
    "camera-controls":"","touch-action":"pan-y","disable-pan":"",
    "shadow-intensity":"0.9","shadow-softness":"0.8",
    "environment-image":"neutral","exposure":"1",
    "min-field-of-view":"20deg","loading":"eager",
    "interaction-prompt":"none"
  })) viewer.setAttribute(name,value);
  viewer.addEventListener("load",() => {
    if ($("#sample-model") !== viewer) return;
    if (viewerLoadTimer) clearTimeout(viewerLoadTimer);
    viewerLoadTimer = null;
    viewerStatus("");
    renderViewerVariants();
  });
  viewer.addEventListener("error",() => {
    if ($("#sample-model") !== viewer) return;
    if (viewerLoadTimer) clearTimeout(viewerLoadTimer);
    viewerLoadTimer = null;
    viewerStatus("No se pudo cargar este modelo 3D. Prueba otro modelo o vuelve al catálogo ilustrativo.",true);
  });
  return viewer;
}
function selectViewerModel(key){
  const model = viewerModels[key];
  if (!model) return;
  selectedViewerModel = key;
  $$("#viewer-panel [data-model]").forEach((button) => {
    const active = button.dataset.model === key;
    button.classList.toggle("active",active);
    button.setAttribute("aria-pressed",String(active));
  });
  $("#viewer-variants").hidden = true;
  $("#viewer-credit").innerHTML = model.credit;
  viewerStatus("Cargando " + (key === "sofa" ? "sofá" : "sillón") + " 3D de muestra…");
  const previous = $("#sample-model");
  const viewer = createModelViewer();
  previous.replaceWith(viewer);
  viewer.alt = model.alt;
  viewer.src = model.src;
  reset3DView();
  if (viewerLoadTimer) clearTimeout(viewerLoadTimer);
  viewerLoadTimer = setTimeout(() => {
    if (!$("#viewer-loading").hidden && selectedViewerModel === key){
      viewerStatus("Este modelo está tardando demasiado en cargar. Prueba de nuevo más tarde o sigue con el catálogo ilustrativo.",true);
    }
  },20000);
}
function open3DViewer(key = "sofa"){
  const requested = viewerModels[key] ? key : "sofa";
  openModal("viewer-panel");
  if (!viewerModulePromise) viewerModulePromise = import("./vendor/model-viewer.min.js");
  viewerModulePromise.then(() => customElements.whenDefined("model-viewer")).then(() => {
    if (!viewerInitialized){viewerInitialized = true;selectViewerModel(requested);}
    else if (selectedViewerModel !== requested) selectViewerModel(requested);
    else reset3DView();
  }).catch(() => {
    viewerModulePromise = null;
    viewerStatus("El visor 3D no se pudo cargar. El resto del prototipo sigue disponible.",true);
  });
}
$("#viewer-reset").addEventListener("click",reset3DView);

const quickExamples = {
  nube:{width:90,depth:190,pass:70,clearW:10,clearD:10,name:"colchón 90 × 190 cm"},
  lino:{width:180,depth:95,pass:85,clearW:20,clearD:10,name:"sofá 180 × 95 cm"},
  aura:{width:82,depth:165,pass:78,clearW:20,clearD:10,name:"sillón relax abierto 82 × 165 cm"}
};
function quickNumber(id,min,max){
  const raw = $(id).value.trim();
  if (!raw) return null;
  const value = Number(raw);
  return Number.isFinite(value) && value >= min && value <= max ? value : null;
}
function updateQuickFit(){
  const id = $("#quick-fit-product").value;
  const example = quickExamples[id];
  const width = quickNumber("#quick-fit-width",50,1000);
  const depth = quickNumber("#quick-fit-depth",50,1000);
  const door = quickNumber("#quick-fit-door",40,300);
  const postcode = postcodeState($("#quick-fit-postcode").value.trim());
  const spaceKnown = width !== null && depth !== null;
  const spaceOk = spaceKnown && width >= example.width + example.clearW && depth >= example.depth + example.clearD;
  const doorOk = door !== null && door >= example.pass;
  const allKnown = spaceKnown && door !== null && postcode.status !== "pending";
  const anyRisk = (spaceKnown && !spaceOk) || (door !== null && !doorOk) || postcode.status === "bad";
  const headline = anyRisk ? "Hay alertas que requieren revisión" : allKnown ? "Sin alertas en estas reglas de ejemplo" : "Completa los datos para ver posibles alertas";
  const spaceText = !spaceKnown ? "Espacio: introduce ancho y fondo válidos." : spaceOk ? "Espacio: sin alerta para este ejemplo." : "Espacio: se estiman al menos " + (example.width + example.clearW) + " × " + (example.depth + example.clearD) + " cm libres.";
  const accessText = door === null ? "Acceso: falta el paso más estrecho." : doorOk ? "Acceso: sin alerta con el paso indicado." : "Acceso: este ejemplo pide al menos " + example.pass + " cm de paso.";
  const shippingText = postcode.status === "ok" ? "Cobertura: código postal peninsular según reglas de ejemplo." : postcode.status === "bad" ? "Cobertura: fuera de las reglas de esta simulación." : "Cobertura: introduce un código postal de 5 dígitos.";
  const row = (text,state) => '<p class="' + state + '">' + text + '</p>';
  $("#quick-fit-result").innerHTML = '<strong>' + headline + ' · requiere verificación humana</strong>' +
    row(spaceText,!spaceKnown ? "review" : spaceOk ? "ok" : "risk") +
    row(accessText,door === null ? "review" : doorOk ? "ok" : "risk") +
    row(shippingText,postcode.status === "ok" ? "ok" : postcode.status === "bad" ? "risk" : "review");
  $("#quick-fit-continue").dataset.openProduct = id;
}
$("#quick-fit-product").addEventListener("change",updateQuickFit);
["#quick-fit-width","#quick-fit-depth","#quick-fit-door","#quick-fit-postcode"].forEach((id) => {
  $(id).addEventListener("input",() => {
    if (id === "#quick-fit-postcode") $(id).value = $(id).value.replace(/\D/g,"").slice(0,5);
    updateQuickFit();
  });
});
function copyQuickFitToConfig(){
  $("#room-width").value = $("#quick-fit-width").value;
  $("#room-depth").value = $("#quick-fit-depth").value;
  $("#door-width").value = $("#quick-fit-door").value;
  $("#postcode").value = $("#quick-fit-postcode").value;
  updateQuote();
}
updateQuickFit();
document.addEventListener("click",(event) => {
  const filter = event.target.closest("[data-filter]");
  if (filter){showHomePage();setFilter(filter.dataset.filter);return;}
  const homeLink = event.target.closest('a[href^="#"]');
  if(homeLink && ["#inicio","#catalogo","#como-funciona","#experiencias","#quick-fit"].includes(homeLink.getAttribute("href"))) showHomePage();
  const viewerEntry = event.target.closest("[data-open-viewer]");
  if (viewerEntry){open3DViewer(viewerEntry.dataset.openViewer);return;}
  const openProduct = event.target.closest("[data-open-product]");
  if (openProduct){event.preventDefault();openConfig(openProduct.dataset.openProduct);if (openProduct.hasAttribute("data-copy-fit")){copyQuickFitToConfig();scrollProductConfig();}return;}
  if (event.target.closest("[data-close]")){hideModal();return;}
  const remove = event.target.closest("[data-remove]");
  if (remove){cart.splice(Number(remove.dataset.remove),1);renderCart();return;}
  const advice = event.target.closest("[data-advice]");
  if (advice){showAdvisor(advice.dataset.advice);return;}
  const model = event.target.closest("#viewer-panel [data-model]");
  if (model){selectViewerModel(model.dataset.model);return;}
  const variant = event.target.closest("#viewer-variant-options [data-variant]");
  if (variant){
    $("#sample-model").variantName = variant.dataset.variant;
    $$("#viewer-variant-options button").forEach((button) => {
      const active = button === variant;
      button.classList.toggle("active",active);
      button.setAttribute("aria-pressed",String(active));
    });
  }
});
$("#product-options").addEventListener("click",(event) => {
  const button = event.target.closest("[data-option]");
  if (!button) return;
  selected[button.dataset.option] = button.dataset.value;
  renderOptions();
  updateQuote();
});
["#room-width","#room-depth","#door-width","#postcode"].forEach((id) => {
  $(id).addEventListener("input",() => {
    if (id === "#postcode") $("#postcode").value = $("#postcode").value.replace(/\D/g,"").slice(0,5);
    updateQuote();
  });
});
$("#cart-trigger").addEventListener("click",() => {renderCart();openModal("cart-panel");});
$("#open-viewer").addEventListener("click",() => open3DViewer("sofa"));
$("#open-advisor").addEventListener("click",() => openModal("advisor-panel"));
$("#add-to-cart").addEventListener("click",() => {
  updateQuote();
  if (!currentQuote) return;
  cart.push({...currentQuote});
  renderCart();
  openModal("cart-panel");
});
$("#confirm-cart").addEventListener("click",() => {
  if (!cart.length) return;
  cart = [];
  renderCart();
  openModal("success-panel");
});
$("#back-to-shop").addEventListener("click",() => {
  hideModal(false);
  showHomePage();
  setFilter("all");
  history.pushState({},"","#catalogo");
  document.getElementById("catalogo").scrollIntoView({behavior:"smooth"});
  document.querySelector("[data-filter=all]").focus();
});
$("#overlay").addEventListener("click",() => hideModal());
document.addEventListener("keydown",(event) => {
  if (!activeModal) return;
  if (event.key === "Escape"){hideModal();return;}
  if (event.key !== "Tab") return;
  const focusable = Array.from(activeModal.querySelectorAll('button:not([disabled]),input:not([disabled]),a[href]')).filter((el) => el.offsetParent !== null);
  if (!focusable.length) return;
  const first = focusable[0],last = focusable[focusable.length-1];
  if (event.shiftKey && document.activeElement === first){event.preventDefault();last.focus();}
  else if (!event.shiftKey && document.activeElement === last){event.preventDefault();first.focus();}
});
renderProducts();
renderCart();
