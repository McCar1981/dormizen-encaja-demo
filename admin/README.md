# Administrador conceptual · DormiZen Encaja

Prototipo estático y navegable. No utiliza datos de DormiZen, no se autentica, no guarda cambios, no crea productos, no publica campañas y no está conectado a pedidos, anuncios, fabricación ni transporte. Los cambios de los formularios solo viven en memoria hasta recargar la página.

## Recorridos

- **Catálogo y Encaja:** alta ficticia → reglas de precio y cobertura de ejemplo → previsualización y prechequeo de medidas.
- **Campañas:** titular, descuento y código ficticios → banner de ejemplo → contribución simplificada por un pedido hipotético.
- **Medición y equipo:** indicadores y roles propuestos, sin cifras reales.

La prueba de CP solo contiene dos prefijos como ejemplos, 28 y 46. El cálculo de acceso compara tres dimensiones simples; no verifica embalaje, giros, montaje o una entrega real. El resultado de margen no incluye impuestos ni comisiones y no es un resultado observado.

Las imágenes y el logo se reutilizan desde la carpeta superior del demo y tienen las advertencias de origen y derechos en ../ASSETS.md. La imagen del sofá, la cama o el sillón no representa el producto ficticio en el formulario.

## Arquitectura para la tienda real

Recomendación preliminar: utilizar una plataforma de comercio con administración existente y desarrollar únicamente el módulo Encaja para las reglas de fabricación, precio y entrega. La opción que mejor encaja a priori es WooCommerce con un tema propio y un plugin propio; confirmar en descubrimiento con el volumen de catálogo, la operativa y el presupuesto. La validación de las reglas tendría que ocurrir en el servidor, tanto al configurar como al pasar por carrito y pago, y quedar registrada con cada pedido. GitHub Pages solo aloja esta maqueta estática.

Fuentes oficiales consultadas:
- WooCommerce: https://woocommerce.com/document/variable-product/
- WooCommerce: https://woocommerce.com/document/setting-up-shipping-zones/
- WooCommerce: https://woocommerce.com/document/managing-orders/
- WooCommerce: https://woocommerce.com/document/roles-capabilities/
- WooCommerce Store API: https://developer.woocommerce.com/docs/category/store-api
- Shopify, límites de variantes: https://help.shopify.com/en/manual/products/variants/add-variants
- PrestaShop, funciones del panel: https://docs.prestashop-project.org/v.8-documentation/user-guide
