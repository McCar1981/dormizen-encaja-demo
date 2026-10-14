# Fuentes visuales y atribución

El logo y las seis fotografías usadas en tarjetas, portada, categorías y galerías de ficha son archivos locales descargados de dormizen.com el 11 de octubre de 2026 para esta propuesta. Las URL de origen son:

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

**Portada actual:** `assets/cama001.jpg` procede de la web de DormiZen y se muestra solo como referencia visual de categoría. No representa el producto ficticio ni el precio del configurador. `assets/hero.webp` fue una imagen generada para una versión anterior y ya no se muestra en el demo.


## Modelos 3D propios vinculados a la ficha

Desde el 14 de octubre de 2026, Lino, Esquina, Aura y Terra tienen un GLB propio, asociado solo a su referencia visual. Son reconstrucciones geométricas orientativas hechas en código (Three.js y GLTFExporter), con superficies acolchadas, costuras, patas y texturas procedimentales propias. No son imágenes planas giradas, no incrustan las fotografías y no son modelos de otros fabricantes. Las partes no visibles, las medidas y los materiales se aproximan y requieren validación con el producto físico antes de una tienda real.

| Modelo | Fotografía de referencia | Posición representada |
| --- | --- | --- |
| assets/models/Lino-concept.glb | assets/sofa014.jpg | Sofá de dos asientos y respaldo dividido |
| assets/models/Esquina-concept.glb | assets/sofa024.jpg | Chaise a la izquierda de la vista frontal |
| assets/models/Aura-concept.glb | assets/relax004.jpg | Reposapiés recogido; pie metálico de cuatro radios |
| assets/models/Terra-concept.glb | assets/relax007.jpg | Reposapiés abierto |

El visor carga únicamente el GLB asignado a la ficha. Permite giro, zoom, restablecer vista y ampliar. El cambio de color de los sofás recolorea el tapizado y conserva patas y estructura. Cambiar ancho actualiza el precio y el esquema 2D; la geometría 3D mantiene la forma de la referencia base. Los cambios de rugosidad del tejido son orientativos y no acreditan variantes fabricables. Los mecanismos relax no están animados. Los colchones no ofrecen 3D porque las fotografías disponibles muestran ambientes con camas, sin una referencia aislada suficiente del colchón.

## Archivo de modelos 3D de una versión anterior

El visor de muestra se ha retirado de la tienda el 12 de octubre de 2026. No existe un modelo aprobado que coincida con las fotos de cada ficha. Estos archivos no se cargan ni se ofrecen en la interfaz actual. Se conservan dos archivos GLB locales de [Khronos glTF Sample Assets](https://github.com/KhronosGroup/glTF-Sample-Assets). Ambos se presentan expresamente como **modelos de muestra ajenos a DormiZen**. No identifican ningún artículo, medida, mecanismo, opción ni precio de las fichas ilustrativas. Los archivos GLB no se han modificado.

| Archivo local | Origen exacto | Autoría y licencia |
| --- | --- | --- |
| assets/models/GlamVelvetSofa.glb | https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/GlamVelvetSofa/glTF-Binary/GlamVelvetSofa.glb | © 2021 Wayfair, LLC; Eric Chadwick. [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). [Licencia del modelo](https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/Models/GlamVelvetSofa/LICENSE.md). Es un modelo de un producto Wayfair, no DormiZen. |
| assets/models/SheenChair.glb | https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/SheenChair/glTF-Binary/SheenChair.glb | © 2020 Wayfair, LLC; Eric Chadwick. [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). [Licencia del modelo](https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/Models/SheenChair/LICENSE.md). Sillón genérico sin mecanismo relax. |

El componente local `vendor/model-viewer.min.js` procede de `@google/model-viewer@4.3.1`: https://cdn.jsdelivr.net/npm/@google/model-viewer@4.3.1/dist/model-viewer.min.js . Su licencia [Apache 2.0](https://github.com/google/model-viewer/blob/master/LICENSE) se conserva en `vendor/model-viewer.LICENSE.txt`. Los GLB de terceros no se importan en la versión actual. El componente model-viewer se importa de forma diferida al abrir uno de los cuatro modelos propios.

Ninguna reconstrucción del demo tiene aprobación comercial del fabricante. Para una tienda definitiva habría que obtener o producir modelos de cada producto real y confirmar sus derechos, medidas, materiales y comportamiento.

## Fichas y venta asociada del prototipo

Cada ficha usa exclusivamente la fotografía que tiene asignada, un recorte visual de esa misma imagen y un esquema 2D. Nunca incorpora la fotografía de otra referencia como ángulo de la ficha. Las imágenes originales no verifican el nombre, las medidas ni las opciones ficticias del catálogo. Las medidas 2D se dibujan en SVG con reglas ilustrativas del configurador; no son planos técnicos. Las cuatro reconstrucciones GLB del demo son volumétricas y orientativas, como se detalla arriba.

Las ilustraciones SVG de complementos son iconos de concepto creados en código. Los accesorios, sus precios y la asociación a cada familia son ejemplos ficticios; no existe compatibilidad real confirmada.
## Colores y telas: vista conceptual

Las fotos originales se conservan. Las nuevas vistas se generaron con imagegen integrado el 12 de octubre de 2026 para simular únicamente el color del tapizado sobre el mismo mueble. No acreditan variantes fabricables ni tonos comerciales. Se identifican como «Simulación de color» en la galería y se conservan en la selección del carrito.

| Vista | Foto fuente | Cambio simulado |
| --- | --- | --- |
| assets/variants/lino-gris.png | assets/sofa014.jpg | Rosa a gris piedra; mismo sofá frontal |
| assets/variants/esquina-antracita.png | assets/sofa024.jpg | Marfil a antracita; misma chaise y cámara |

Las muestras de lino, microfibra y tejido técnico son patrones CSS orientativos, no fotografías ni prestaciones de un proveedor. Cambiar el tejido afecta al precio de ejemplo y al resumen; no modifica la fotografía. La medida tampoco redimensiona la foto: cambia el esquema 2D.

### Prompt Lino gris (imagegen integrado)

Use case: precise-object-edit. Asset type: conceptual upholstery color variant for a furniture ecommerce prototype. Input image: sofa014.jpg is the edit target, not merely a style reference. Primary request: change ONLY the pink upholstered fabric of this exact sofa to a neutral stone gray, with subtle realistic woven fabric texture. Preserve the exact same sofa identity, silhouette, two seats, four back sections, sloped padded arms, cushion thickness, seams, proportions, shiny silver metal feet, frontal camera angle, image framing, original plain white background and cast ground shadow. Keep every geometry and photographic detail unchanged apart from fabric color. This is a color simulation, not a different model. No new modules, props, pillows, room, person, angle, labels, text, watermark or logo. Do not crop or recenter; maintain the original landscape composition and white opaque background.

### Prompt Esquina antracita (imagegen integrado)

Use case: precise-object-edit. Asset type: conceptual upholstery color variant for a furniture ecommerce prototype. Input image: sofa024.jpg is the edit target, not merely a style reference. Primary request: change ONLY the ivory/white upholstered surfaces of this exact chaise sofa to a deep neutral anthracite gray, with subtle realistic matte woven fabric texture. Preserve the exact same sofa identity, silhouette, chaise module on the viewer's LEFT, two seat sections on the right, raised back sections and cylindrical headrest, padded arms, seams, proportions, wood feet with original golden wood tone, three-quarter camera angle, image framing, plain opaque white background, lighting and soft cast ground shadows. Keep every geometry and photographic detail unchanged apart from upholstery color and its necessary tonal shading. This is a color simulation, not a different model. No new modules, props, pillows, room, person, angle, labels, text, watermark or logo. Do not crop or recenter; maintain the original landscape composition and white opaque background.
