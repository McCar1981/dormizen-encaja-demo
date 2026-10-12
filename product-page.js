"use strict";
let productGalleryIndex = 0;
let pdpHasReviewedConfig = false;
let productSummaryQuote = null;
function escapeProductText(value){return String(value).replace(/[&<>"']/g,(c)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);}
function getSelectedAccessories(){return (currentDetails?.accessories || []).filter(a=>selectedAccessoryIds.has(a.id));}
function accessoryIllustration(accessory){
  const protector=accessory.id.includes("protector");
  return '<div class="pdp-accessory-thumb" aria-hidden="true"><svg viewBox="0 0 100 100"><rect x="15" y="24" width="70" height="52" rx="'+(protector?3:14)+'" stroke="currentColor"/>'+ (protector?'<path d="M25 24v52M75 24v52M15 35h70M15 65h70" stroke="currentColor" stroke-dasharray="3 4"/>':'<path d="M24 39q26-14 52 0M24 61q26 14 52 0" stroke="currentColor"/>')+'</svg></div>';
}
function renderProductDetails(product){
  const data=currentDetails;
  $("#product-detail").dataset.category=product.category;
  pdpHasReviewedConfig=false;
  $("#pdp-title").textContent=product.name;
  $("#pdp-mobile-name").textContent=product.name;
  $("#pdp-breadcrumb-name").textContent=product.name;
  $("#pdp-category-link").textContent=categoryNames[product.category];
  $("#pdp-category-link").dataset.filter=product.category;
  $("#pdp-kicker").textContent=categoryNames[product.category]+" · FICHA DEMOSTRATIVA";
  $("#pdp-description").textContent=data.intro;
  $("#pdp-highlights").innerHTML=data.highlights.map(t=>'<li>'+escapeProductText(t)+'</li>').join("");
  $("#pdp-specs").innerHTML=data.specs.map(([k,v])=>'<tr><th scope="row">'+escapeProductText(k)+'</th><td>'+escapeProductText(v)+'</td></tr>').join("");
  $("#pdp-delivery").textContent=data.deliveryNote;
  $("#pdp-care").textContent=data.care;
  $("#pdp-related-grid").innerHTML=data.related.map(productById).filter(Boolean).map(productCard).join("");
  $("#pdp-cross-grid").innerHTML=data.accessories.map(a=>'<article class="cross-card">'+accessoryIllustration(a)+'<small>ILUSTRACIÓN DE CONCEPTO · ACCESORIO FICTICIO</small><h3>'+escapeProductText(a.name)+'</h3><p>'+escapeProductText(a.description)+'</p><strong>'+money.format(a.price)+' <small>Precio ilustrativo · IVA incluido</small></strong><label><input type="checkbox" data-accessory="'+a.id+'"> Incluir en mi selección</label></article>').join("");
  $("#pdp-thumbnails").innerHTML=data.gallery.map((g,index)=>'<button type="button" data-gallery="'+index+'" aria-label="'+escapeProductText(g.label)+'" aria-pressed="false"><img src="'+g.src+'" alt=""></button>').join("")+'<button type="button" data-gallery="measures" aria-label="Ver medidas de la configuración de ejemplo" aria-pressed="false"><span aria-hidden="true">↔</span><span>Medidas</span></button>';
  const hasModel=product.category!=="colchones";
  $("#pdp-gallery-viewer").hidden=!hasModel;
  $("#pdp-gallery-viewer").textContent=product.category==="sofas"?"Explorar sofá 3D de muestra ↗":"Explorar sillón 3D de muestra ↗";
  $("#pdp-3d-note").textContent=hasModel?"El modelo 3D es una muestra de terceros, ajena a DormiZen y a estas fotografías. No reproduce esta configuración"+(product.category==="relax"?" ni un mecanismo relax.":"."):"3D del colchón pendiente: para mostrarlo habría que crear u obtener el modelo aprobado de cada referencia real.";
  selectProductGallery(0);
}
function selectProductGallery(index){
  productGalleryIndex=index;
  const measures=index==="measures";
  $("#pdp-main-image").hidden=measures;
  $("#pdp-measure-diagram").hidden=!measures;
  $("#pdp-zoom").hidden=measures;
  if(measures){
    updateProductDiagram(dimensions());
    $("#pdp-media-caption").textContent="Diagrama 2D de la configuración de ejemplo. No es un plano técnico, un modelo 3D ni una medida validada de DormiZen.";
  }else{
    const photo=currentDetails.gallery[Number(index)];
    $("#pdp-main-image").src=photo.src;
    $("#pdp-main-image").alt=photo.alt;
    $("#pdp-main-image").classList.toggle("is-room",currentProduct.category==="colchones");
    $("#pdp-media-caption").textContent=photo.label+". Las fotos no son ángulos ni variantes del producto ficticio.";
  }
  $$("#pdp-thumbnails [data-gallery]").forEach(button=>{const active=button.dataset.gallery===String(index);button.classList.toggle("active",active);button.setAttribute("aria-pressed",String(active));});
}
function updateProductDiagram(dim){
  let shape='<rect x="145" y="93" width="350" height="222" rx="14" fill="#e7e2df" stroke="#5e5b58" stroke-width="2"/><path d="M159 122h322M159 285h322" stroke="#aaa19b"/>';
  if(currentProduct.category==="sofas")shape='<rect x="130" y="119" width="380" height="154" rx="12" fill="#d8ccc9" stroke="#6b6060" stroke-width="2"/><rect x="145" y="115" width="350" height="38" rx="8" fill="#c8b6b2" stroke="#6b6060"/><path d="M260 153v104M380 153v104" stroke="#6b6060"/><rect x="130" y="155" width="30" height="102" rx="6" fill="#c8b6b2"/><rect x="480" y="155" width="30" height="102" rx="6" fill="#c8b6b2"/>';
  if(currentProduct.category==="relax")shape='<rect x="216" y="82" width="208" height="230" rx="15" fill="#dacdaf" stroke="#6b6556" stroke-width="2"/><rect x="235" y="83" width="170" height="45" rx="8" fill="#c9b68e" stroke="#6b6556"/><path d="M235 213h170M235 251h170" stroke="#6b6556"/><rect x="235" y="251" width="170" height="60" rx="6" fill="#d0bd94" stroke="#6b6556"/>';
  $("#pdp-measure-diagram").innerHTML='<svg viewBox="0 0 640 420" role="img" aria-label="Diagrama 2D de ejemplo: '+dim.width+' por '+dim.depth+' centímetros"><defs><marker id="measure-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse"><path d="M7 1L1 4l6 3" fill="none" stroke="#ed1c24"/></marker></defs><text x="320" y="35" text-anchor="middle" fill="#555" font-family="Arial" font-size="13">CONFIGURACIÓN ACTUAL · EJEMPLO</text>'+shape+'<path d="M140 348h360" stroke="#ed1c24" marker-start="url(#measure-arrow)" marker-end="url(#measure-arrow)"/><text x="320" y="376" text-anchor="middle" fill="#171717" font-family="Arial" font-size="19">'+dim.width+' cm</text><path d="M548 98v210" stroke="#ed1c24" marker-start="url(#measure-arrow)" marker-end="url(#measure-arrow)"/><text x="575" y="211" text-anchor="middle" fill="#171717" font-family="Arial" font-size="17" transform="rotate(90 575 211)">'+dim.depth+' cm</text><text x="320" y="405" text-anchor="middle" fill="#777" font-family="Arial" font-size="11">Medidas ilustrativas · verificar producto y embalajes reales</text></svg>';
}
function updateProductSummary(quote){
  productSummaryQuote=quote;
  $("#pdp-price").textContent=money.format(quote.item);
  $("#pdp-fact-size").textContent=quote.dim.width+" × "+quote.dim.depth+" cm";
  $("#pdp-fact-delivery").textContent=quote.postcode.status==="ok"?(quote.postcode.local?"7–12 días":"12–20 días"):"Por confirmar";
  $("#pdp-cross-total").textContent=money.format(quote.complementTotal);
  $("#pdp-mobile-price").textContent=quote.total===null?money.format(quote.item+quote.complementTotal):money.format(quote.total);
  $("#pdp-mobile-label").textContent=quote.total===null?"Selección · transporte pendiente":quote.ready?"Total ilustrativo · IVA incluido":"Total ilustrativo · revisa Encaja";
  $("#pdp-mobile-buy").textContent=pdpHasReviewedConfig?(quote.ready?"Añadir al carrito":"Revisar Encaja"):"Ver opciones";
  if(productGalleryIndex==="measures") updateProductDiagram(quote.dim);
}
function activateProductPage(id,fromRoute){
  $("#inicio").hidden=true;$("#product-detail").hidden=false;
  document.body.classList.add("product-view");
  setFilter(currentProduct.category);
  document.title=currentProduct.name+" · DormiZen Encaja · Prototipo";
  if(!fromRoute && location.hash!=="#producto/"+id)history.pushState({product:id},"","#producto/"+id);
  window.scrollTo({top:0,behavior:"instant"});
  $("#pdp-title").focus({preventScroll:true});
}
function showHomePage(){
  if(!$("#product-detail") || $("#product-detail").hidden)return;
  $("#product-detail").hidden=true;$("#inicio").hidden=false;
  document.body.classList.remove("product-view");
  document.title="DormiZen Encaja · Prototipo conceptual";
}
function scrollProductConfig(){
  $("#config-panel").scrollIntoView({behavior:"smooth",block:"start"});
}
function handleProductRoute(){
  const match=/^#producto\/([a-z]+)$/.exec(location.hash);
  if(match){
    if(!productById(match[1])){showHomePage();history.replaceState({},"","#catalogo");return;}
    if(!$("#product-detail").hidden && currentProduct?.id===match[1])return;
    openConfig(match[1],true);
  }else showHomePage();
}
$("#pdp-thumbnails").addEventListener("click",event=>{const button=event.target.closest("[data-gallery]");if(button)selectProductGallery(button.dataset.gallery==="measures"?"measures":Number(button.dataset.gallery));});
$("#pdp-gallery-viewer").addEventListener("click",()=>open3DViewer(currentProduct.category==="sofas"?"sofa":"chair"));
$("#pdp-zoom").addEventListener("click",()=>{const image=$("#pdp-main-image");$("#pdp-zoom-image").src=image.src;$("#pdp-zoom-image").alt=image.alt;$("#pdp-zoom-caption").textContent=$("#pdp-media-caption").textContent;openModal("photo-panel");});
$("#pdp-cross-grid").addEventListener("change",event=>{const input=event.target.closest("[data-accessory]");if(!input)return;if(input.checked)selectedAccessoryIds.add(input.dataset.accessory);else selectedAccessoryIds.delete(input.dataset.accessory);updateQuote();});
document.addEventListener("click",event=>{if(event.target.closest("[data-scroll-config]"))scrollProductConfig();});
window.addEventListener("hashchange",handleProductRoute);window.addEventListener("popstate",handleProductRoute);
handleProductRoute();
$("#pdp-mobile-buy").addEventListener("click",()=>{if(!pdpHasReviewedConfig || !currentQuote){pdpHasReviewedConfig=true;if(productSummaryQuote)updateProductSummary(productSummaryQuote);scrollProductConfig();}else $("#add-to-cart").click();});
const productConfigObserver=new IntersectionObserver(entries=>{if(window.innerWidth<=820 && !$("#product-detail").hidden && entries.some(e=>e.isIntersecting)){pdpHasReviewedConfig=true;if(productSummaryQuote)updateProductSummary(productSummaryQuote);}},{rootMargin:"-160px 0px -80px 0px",threshold:0.05});
productConfigObserver.observe($("#config-panel"));
