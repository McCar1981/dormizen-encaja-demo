# DormiZen Encaja · demo conceptual

Propuesta independiente de tienda online para presentar a DormiZen. **No es la tienda oficial y no realiza pedidos.**

- Seis nombres de producto, fichas, opciones, precios, plazos, reglas de fabricación y tarifas de transporte son **ejemplos ficticios**. Las fotos reales de las tarjetas solo ilustran las categorías; no representan esos artículos ni sus precios.
- Las seis fichas se abren como páginas completas con URL `#producto/nube`, `#producto/origen`, `#producto/lino`, `#producto/esquina`, `#producto/aura` y `#producto/terra`. Incluyen galería, ampliación, detalles, medidas 2D de ejemplo, configuración integrada y productos relacionados.
- El configurador comprueba medidas, un paso mínimo y códigos postales peninsulares mediante reglas de muestra. Los complementos ficticios seleccionados se suman al total y aparecen asociados al producto en el carrito.
- El carrito y la confirmación funcionan solo en la memoria del navegador. No se recogen datos personales ni se procesan pagos.
- El visor sí muestra geometría 3D real con giro y zoom en dos modelos de muestra ajenos a DormiZen (sofá y sillón genérico sin mecanismo relax). Las fichas y medidas reales necesitarían modelos aprobados. El asesor tiene respuestas predefinidas y no usa IA conectada.
- El logo y seis fotografías de referencia provienen de dormizen.com; la portada usa una de esas fotografías como referencia visual de categoría. Véase ASSETS.md para URL y atribución exactas. **Antes de usar estas fotos en una tienda comercial real, hay que confirmar con DormiZen y con los posibles fotógrafos o proveedores los derechos de uso.**
- La portada y el chequeo rápido permiten explorar las tres categorías y revisar espacio, paso y código postal. El resultado siempre requiere verificación humana; no puede certificar la entrada de un bulto real.
- `admin/` contiene un administrador conceptual navegable. No autentica, guarda, publica ni se conecta a sistemas reales.

## Abrir

Publicar la carpeta completa en GitHub Pages con sus subcarpetas assets/ y vendor/. Las rutas son relativas y no requieren compilación. Para previsualizarla en local, iniciar un servidor HTTP desde esta carpeta (por ejemplo, `python -m http.server 8000`) y visitar `http://localhost:8000/`. La importación JavaScript del visor 3D no funciona de forma fiable abriendo index.html como archivo local.

