# Administrador conceptual · DormiZen

Prototipo estático y navegable. No utiliza datos de DormiZen, no se autentica, no guarda cambios, no crea productos, no publica campañas y no está conectado a pedidos, anuncios, fabricación ni transporte. Los cambios de los formularios solo viven en memoria hasta recargar la página.

## Recorridos

- **Catálogo y reglas:** alta ficticia → reglas de precio y cobertura de ejemplo → previsualización y prechequeo de medidas.
- **Campañas:** titular, descuento y código ficticios → banner de ejemplo → contribución simplificada por un pedido hipotético.
- **Medición y equipo:** indicadores y roles propuestos, sin cifras reales.

La prueba de CP solo contiene dos prefijos como ejemplos, 28 y 46. El cálculo de acceso compara tres dimensiones simples; no verifica embalaje, giros, montaje o una entrega real. El resultado de margen no incluye impuestos ni comisiones y no es un resultado observado.

Las imágenes y el logo se reutilizan desde la carpeta superior del demo y tienen las advertencias de origen y derechos en ../ASSETS.md. La imagen del sofá, la cama o el sillón no representa el producto ficticio en el formulario.

## Arquitectura para la tienda real

Desarrollo a medida de la tienda, el backend y el administrador propio. El sistema compartirá catálogo, variantes, precios, inventario, pedidos, promociones y permisos mediante una API y una base de datos. El administrador real tendrá autenticación y roles; las validaciones de fabricación, disponibilidad, configuración, precio y entrega se ejecutarán en el servidor al configurar y antes del pago, y se registrarán con cada pedido.

El proyecto se entregará en 4–5 semanas desde el inicio acordado. El catálogo, las imágenes, las combinaciones y las tarifas deberán estar disponibles para cumplir el calendario. Las integraciones y el alcance final se cerrarán en la primera semana. GitHub Pages seguirá alojando exclusivamente estos prototipos estáticos; la tienda operativa necesitará alojamiento para el backend y la base de datos.

## Calendario de entrega

| Semana | Trabajo y resultado |
| --- | --- |
| 1 | Definición, UX/UI, catálogo y reglas aprobadas. |
| 2 | Fichas, variantes y gestión de catálogo en el administrador propio. |
| 3 | Carrito, checkout, pedidos, configuración y entrega por código postal. |
| 4 | Pruebas, SEO técnico, medición y preparación del lanzamiento. |
| 5, si se necesita | Ajustes, formación, lanzamiento y entrega final. |

El posicionamiento se prepara durante el desarrollo y se trabaja después del lanzamiento. El 3D solo se activará para referencias con modelos coincidentes y aprobados.
