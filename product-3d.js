"use strict";
window.DormiZen3D=(()=>{
 const frame=document.querySelector('#pdp-3d-frame');
 const viewer=document.querySelector('#pdp-model');
 const status=document.querySelector('#pdp-3d-status');
 let modulePromise=null,active=false,currentModel=null,loadTimer=null;
 const defaultOrbit='20deg 75deg 105%';
 function message(text,error=false){status.textContent=text;status.hidden=!text;status.classList.toggle('is-error',error);}
 function hide(){active=false;frame.hidden=true;viewer.autoRotate=false;if(loadTimer)clearTimeout(loadTimer);}
 async function ensureViewer(){
  if(!modulePromise)modulePromise=import('./vendor/model-viewer.min.js').then(()=>customElements.whenDefined('model-viewer'));
  return modulePromise;
 }
 function sync(){
  if(!active||!viewer.loaded||!viewer.model||!currentModel||currentDetails.model3d!==currentModel)return;
  const color=currentProductVisual().hex||currentModel.color;
  for(const material of viewer.model.materials){
   if(!/upholstery|^fabric|^piping|^seam/i.test(material.name))continue;
   if(color)material.pbrMetallicRoughness.setBaseColorFactor(color);
   const roughness=currentProduct.category==='sofas'?({arena:.9,micro:.96,anti:.76}[selected.fabric]||.9):(selected.finish==='piel'?.58:.92);
   material.pbrMetallicRoughness.setRoughnessFactor(roughness);
   material.pbrMetallicRoughness.setMetallicFactor(0);
  }
  // La geometría corresponde a la foto base. Los anchos actualizan precio y esquema 2D.
 }
 async function show(model){
  if(!model)return;
  active=true;currentModel=model;frame.hidden=false;
  if(viewer.src===model.src && viewer.loaded){viewer.style.visibility='visible';message('');sync();return;}
  viewer.style.visibility='hidden';message('Cargando el producto 3D…');
  try{
   await ensureViewer();
   if(!active||currentModel!==model||currentDetails.model3d!==model)return;
   viewer.alt='Reconstrucción 3D orientativa de '+currentProduct.name+'; no es un modelo aprobado del fabricante';
   viewer.cameraOrbit=defaultOrbit;viewer.cameraTarget='auto auto auto';
   viewer.autoRotate=false;
   if(viewer.src!==model.src)viewer.src=model.src; else
   if(viewer.loaded){viewer.style.visibility='visible';sync();message('');}
   if(loadTimer)clearTimeout(loadTimer);
   loadTimer=setTimeout(()=>{if(active&&!viewer.loaded)message('El modelo está tardando en cargar. Puedes seguir utilizando las fotos y la ficha.',true);},20000);
  }catch(error){modulePromise=null;message('No se pudo cargar el visor. Sigue explorando las fotografías del producto.',true);}
 }
 viewer.addEventListener('load',()=>{if(loadTimer)clearTimeout(loadTimer);if(active){viewer.style.visibility='visible';sync();message('');}});
 viewer.addEventListener('error',()=>{if(loadTimer)clearTimeout(loadTimer);if(active)message('No se pudo cargar este modelo. Puedes utilizar las fotos de esta misma ficha.',true);});
 document.querySelector('#pdp-3d-reset').addEventListener('click',()=>{viewer.cameraOrbit=defaultOrbit;viewer.cameraTarget='auto auto auto';viewer.fieldOfView='auto';if(typeof viewer.jumpCameraToGoal==='function')viewer.jumpCameraToGoal();});
 function zoom(factor){if(!viewer.loaded)return;const orbit=viewer.getCameraOrbit();viewer.cameraOrbit=orbit.theta+'rad '+orbit.phi+'rad '+orbit.radius*factor+'m';}
 document.querySelector('#pdp-3d-zoom-in').addEventListener('click',()=>zoom(.8));
 document.querySelector('#pdp-3d-zoom-out').addEventListener('click',()=>zoom(1.25));
 const fullscreen=document.querySelector('#pdp-3d-fullscreen');
 fullscreen.hidden=typeof frame.requestFullscreen!=='function';
 fullscreen.addEventListener('click',()=>{if(document.fullscreenElement)document.exitFullscreen();else frame.requestFullscreen().catch(()=>{});});

 return {show,hide,sync};
})();
