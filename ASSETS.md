# Fuentes visuales y atribución

El logo y las seis fotografías usadas en tarjetas, portada y categorías son archivos locales descargados de dormizen.com el 11 de octubre de 2026 para esta propuesta. Las URL de origen son:

| Archivo local | Referencia en el demo | URL de origen |
| --- | --- | --- |
| assets/logoDormizen.png | Logotipo DormiZen | https://dormizen.com/images/logoDormizen.png |
| assets/cama001.jpg | Ambiente de cama para «Colchón Nube» ficticio | https://dormizen.com/images/cama001.jpg |
| assets/cama002.jpg | Ambiente de cama para «Colchón Origen» ficticio | https://dormizen.com/images/cama002.jpg |
| assets/sofa014.jpg | Sofá de referencia para «Sofá Lino» ficticio | https://dormizen.com/images/sofa014.jpg |
| assets/sofa024.jpg | Sofá de referencia para «Sofá Esquina» ficticio | https://dormizen.com/images/sofa024.jpg |
| assets/relax004.jpg | Sillón de referencia para «Relax Aura» ficticio | https://dormizen.com/images/relax004.jpg |
| assets/relax007.jpg | Sillón de referencia para «Relax Terra» ficticio | https://dormizen.com/images/relax007.jpg |

Las fotos cama001 y cama002 muestran camas completas y no un colchón aislado. Ninguna foto identifica el producto ficticio, la configuración ni el precio mostrados junto a ella. Las galerías de origen son https://dormizen.com/colchones.html, https://dormizen.com/sofas.html y https://dormizen.com/relax.html.

**Derechos:** las seis fotos seleccionadas no contienen avisos explícitos de autor, licencia o copyright en sus metadatos EXIF/XMP/IPTC, pero eso no acredita permiso de reutilización. Antes de publicar una tienda comercial definitiva, confirmar autorización de DormiZen y de los posibles autores o proveedores. La foto de sofá sofa001.jpg no se incorporó porque sus metadatos indican «Tarkett property - all rights reserved».

**Portada actual:** `assets/sofa014.jpg` procede de la web de DormiZen y se muestra solo como referencia visual de categoría. No representa el producto ficticio ni el precio del configurador. `assets/hero.webp` fue una imagen generada para una versión anterior y ya no se muestra en el demo.


## Modelos 3D y visor

El visor usa dos archivos GLB locales de [Khronos glTF Sample Assets](https://github.com/KhronosGroup/glTF-Sample-Assets). Ambos se presentan expresamente como **modelos de muestra ajenos a DormiZen**. No identifican ningún artículo, medida, mecanismo, opción ni precio de las fichas ilustrativas. Los archivos GLB no se han modificado.

| Archivo local | Origen exacto | Autoría y licencia |
| --- | --- | --- |
| assets/models/GlamVelvetSofa.glb | https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/GlamVelvetSofa/glTF-Binary/GlamVelvetSofa.glb | © 2021 Wayfair, LLC; Eric Chadwick. [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). [Licencia del modelo](https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/Models/GlamVelvetSofa/LICENSE.md). Es un modelo de un producto Wayfair, no DormiZen. |
| assets/models/SheenChair.glb | https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/SheenChair/glTF-Binary/SheenChair.glb | © 2020 Wayfair, LLC; Eric Chadwick. [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). [Licencia del modelo](https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/Models/SheenChair/LICENSE.md). Sillón genérico sin mecanismo relax. |

El componente local `vendor/model-viewer.min.js` procede de `@google/model-viewer@4.3.1`: https://cdn.jsdelivr.net/npm/@google/model-viewer@4.3.1/dist/model-viewer.min.js . Su licencia [Apache 2.0](https://github.com/google/model-viewer/blob/master/LICENSE) se conserva en `vendor/model-viewer.LICENSE.txt`. El GLB se carga al abrir el visor; el paquete también se importa entonces.

No hay modelo de colchón ni de mecanismo relax en esta demostración. Para una tienda definitiva habría que obtener o producir modelos de cada producto real y confirmar sus derechos, medidas, materiales y comportamiento.
