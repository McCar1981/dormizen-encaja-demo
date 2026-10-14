"use strict";
const referenceSamples={
 sofa:{src:'assets/models/GlamVelvetSofa.glb',name:'GlamVelvetSofa',credit:'Sofá de muestra © 2021 Wayfair, LLC; Eric Chadwick. <a href="https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/GlamVelvetSofa" target="_blank" rel="noopener noreferrer">Origen</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>. Modelo ajeno a DormiZen.'},
 chair:{src:'assets/models/SheenChair.glb',name:'SheenChair',credit:'Sillón de muestra © 2020 Wayfair, LLC; Eric Chadwick. <a href="https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/SheenChair" target="_blank" rel="noopener noreferrer">Origen</a> · <a href="https://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener noreferrer">CC0 1.0</a>. Sillón genérico sin mecanismo relax; ajeno a DormiZen.'}
};
let referenceViewer=null,referenceKey='sofa',referenceModule=null;
const status=document.querySelector('#reference-status');
function statusMessage(text){status.textContent=text;status.hidden=!text;}
async function selectReference(key){
 const sample=referenceSamples[key];if(!sample)return;referenceKey=key;
 document.querySelectorAll('[data-model]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.model===key)));
 document.querySelector('#reference-credit').innerHTML=sample.credit;document.querySelector('#reference-variants').hidden=true;statusMessage('Cargando '+(key==='sofa'?'sofá':'sillón')+' 3D…');
 try{
  if(!referenceModule)referenceModule=import('./vendor/model-viewer.min.js').then(()=>customElements.whenDefined('model-viewer'));
  await referenceModule;if(referenceKey!==key)return;
  const next=document.createElement('model-viewer');next.id='reference-model';
  for(const [name,value] of Object.entries({'camera-controls':'','disable-pan':'','touch-action':'pan-y','shadow-intensity':'1','shadow-softness':'.8','environment-image':'neutral','exposure':'1','camera-orbit':'25deg 75deg 105%','interaction-prompt':'none','loading':'eager','alt':'Modelo realista '+sample.name+' de terceros, no DormiZen'}))next.setAttribute(name,value);
  next.addEventListener('load',()=>{if(referenceViewer!==next)return;statusMessage('');const variants=next.availableVariants||[];document.querySelector('#reference-variants').hidden=!variants.length;document.querySelector('#reference-color').replaceChildren(...['Acabado original',...variants].map((name,index)=>{const o=document.createElement('option');o.textContent=name;o.value=index===0?'':name;return o;}));});
  next.addEventListener('error',()=>{if(referenceViewer===next)statusMessage('No se pudo cargar el modelo 3D en este dispositivo.');});
  document.querySelector('#reference-model').replaceWith(next);referenceViewer=next;next.src=sample.src;
 }catch(e){referenceModule=null;statusMessage('No se pudo cargar el visor 3D.');}
}
document.querySelectorAll('[data-model]').forEach(button=>button.addEventListener('click',()=>selectReference(button.dataset.model)));
document.querySelector('#reference-color').addEventListener('change',e=>{if(referenceViewer?.loaded)referenceViewer.variantName=e.target.value||null;});
document.querySelector('#reference-reset').addEventListener('click',()=>{if(referenceViewer){referenceViewer.cameraOrbit='25deg 75deg 105%';referenceViewer.cameraTarget='auto auto auto';referenceViewer.fieldOfView='auto';referenceViewer.jumpCameraToGoal();}});
function zoom(factor){if(!referenceViewer?.loaded)return;const o=referenceViewer.getCameraOrbit();referenceViewer.cameraOrbit=o.theta+'rad '+o.phi+'rad '+o.radius*factor+'m';}
document.querySelector('#reference-zoom-in').addEventListener('click',()=>zoom(.8));document.querySelector('#reference-zoom-out').addEventListener('click',()=>zoom(1.25));
selectReference(new URLSearchParams(location.search).get('modelo')==='chair'?'chair':'sofa');
