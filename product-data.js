"use strict";

// Contenido editorial exclusivo del prototipo. Los seis artículos, las
// especificaciones, opciones, accesorios y precios son ficticios. Las fotos
// oficiales muestran referencias de categoría; no son ángulos ni variantes
// de un mismo producto y no identifican el SKU descrito.
window.DormiZenProductDetails = {
  nube: {
    intro: "Un colchón de ejemplo para explorar el descanso a tu medida. Compara tamaños y sensaciones, revisa el espacio disponible y conoce el total ilustrativo de tu configuración antes de decidir.",
    highlights: ["Cuatro anchos y dos largos para comparar", "Sensación equilibrada o firme en la demo", "Precio actualizado al cambiar cada opción"],
    specs: [
      ["Tipo de ficha", "Especificaciones de ejemplo; artículo ficticio"],
      ["Medida base", "90 × 190 cm"],
      ["Anchos configurables", "90, 135, 150 y 180 cm"],
      ["Largos configurables", "190 y 200 cm"],
      ["Sensaciones", "Equilibrada o firme"],
      ["Regla de fabricación", "180 × 200 cm no disponible en esta demo"],
      ["Materiales y altura", "Pendientes de definir para un producto real"]
    ],
    gallery: [
      {src:"assets/cama001.jpg", alt:"Fotografía oficial de DormiZen de un dormitorio con cama; referencia visual de categoría, no del Colchón Nube ficticio", label:"Referencia visual de categoría · ambiente 1"},
      {src:"assets/cama002.jpg", alt:"Otra fotografía oficial de DormiZen de una cama; referencia visual distinta de categoría, no otro ángulo del mismo producto", label:"Referencia visual de categoría · ambiente 2"}
    ],
    related: ["origen", "aura"],
    accessories: [
      {id:"almohada-ejemplo", name:"Almohada de ejemplo", price:29, description:"Complemento ficticio para esta selección. La regla de asociación de la demo no acredita compatibilidad con un producto real."},
      {id:"protector-colchon-ejemplo", name:"Protector de colchón de ejemplo", price:39, description:"Accesorio ficticio con precio ilustrativo. Para una compra real habría que confirmar talla, materiales y ajuste."}
    ],
    deliveryNote: "Introduce tu código postal para calcular un transporte de ejemplo. La demo aplica 7–12 días laborables en la provincia de Valencia y 12–20 en otras provincias peninsulares admitidas. DormiZen debe confirmar cobertura, plazos y servicios reales.",
    care: "Guía de ejemplo: utiliza una base compatible y un protector de la medida adecuada. La ventilación, el giro y la limpieza dependerán de los materiales y de las instrucciones del producto real."
  },
  origen: {
    intro: "Una propuesta de colchón de ejemplo para una habitación donde el descanso tiene protagonismo. Prueba distintos tamaños, compara la sensación y comprueba las condiciones ilustrativas de fabricación y entrega.",
    highlights: ["Configuración de tamaño en un único recorrido", "Dos sensaciones para comparar", "Resumen visible de producto y transporte"],
    specs: [
      ["Tipo de ficha", "Especificaciones de ejemplo; artículo ficticio"],
      ["Medida base", "90 × 190 cm"],
      ["Anchos configurables", "90, 135, 150 y 180 cm"],
      ["Largos configurables", "190 y 200 cm"],
      ["Sensaciones", "Equilibrada o firme"],
      ["Regla de fabricación", "Todas las combinaciones de esta ficha están admitidas en la demo"],
      ["Materiales y altura", "Pendientes de definir para un producto real"]
    ],
    gallery: [
      {src:"assets/cama002.jpg", alt:"Fotografía oficial de DormiZen de una cama; referencia visual de categoría, no del Colchón Origen ficticio", label:"Referencia visual de categoría · ambiente 1"},
      {src:"assets/cama001.jpg", alt:"Fotografía oficial de DormiZen de otro ambiente de dormitorio; referencia de categoría, no otro ángulo del mismo producto", label:"Referencia visual de categoría · ambiente 2"}
    ],
    related: ["nube", "terra"],
    accessories: [
      {id:"protector-colchon-ejemplo", name:"Protector de colchón de ejemplo", price:39, description:"Accesorio ficticio con precio ilustrativo. Para una compra real habría que confirmar talla, materiales y ajuste."},
      {id:"almohada-ejemplo", name:"Almohada de ejemplo", price:29, description:"Complemento ficticio para esta selección. La regla de asociación de la demo no acredita compatibilidad con un producto real."}
    ],
    deliveryNote: "Introduce tu código postal para calcular un transporte de ejemplo. La demo aplica 7–12 días laborables en la provincia de Valencia y 12–20 en otras provincias peninsulares admitidas. DormiZen debe confirmar cobertura, plazos y servicios reales.",
    care: "Guía de ejemplo: comprueba la compatibilidad de la base y la medida del protector. Sigue las instrucciones del fabricante para limpieza y mantenimiento cuando se incorpore el producto real."
  },
  lino: {
    intro: "Un sofá de ejemplo pensado para explorar un salón contenido. Compara dos formatos, elige entre los tapizados ilustrativos y revisa el espacio de uso y acceso antes de añadirlo a tu selección.",
    highlights: ["Dos formatos admitidos en la demo", "Tres tapizados con precio visible", "Chequeo de ancho, fondo y acceso"],
    specs: [
      ["Tipo de ficha", "Especificaciones de ejemplo; artículo ficticio"],
      ["Formato base", "2 plazas · 180 × 95 cm"],
      ["Formato alternativo", "3 plazas · 220 × 95 cm"],
      ["Tapizados de ejemplo", "Lino arena, microfibra o tejido antimanchas"],
      ["Regla de fabricación", "Formato chaise de 260 cm no disponible en esta demo"],
      ["Acceso", "El cálculo simplificado no verifica giros, escaleras ni bultos reales"],
      ["Estructura y composición", "Pendientes de definir para un producto real"]
    ],
    gallery: [
      {src:"assets/sofa014.jpg", alt:"Fotografía oficial de DormiZen de un sofá; referencia visual de categoría, no del Sofá Lino ficticio", label:"Referencia visual de categoría · sofá 1"},
      {src:"assets/sofa024.jpg", alt:"Fotografía oficial de DormiZen de otro sofá; referencia visual distinta de categoría, no una variante del Sofá Lino", label:"Referencia visual de categoría · sofá 2"}
    ],
    related: ["esquina", "aura"],
    accessories: [
      {id:"cojines-ejemplo", name:"Pareja de cojines de ejemplo", price:35, description:"Accesorio ficticio para ilustrar una venta asociada. Colores, tamaño y composición no corresponden a un artículo real."},
      {id:"protector-sofa-ejemplo", name:"Protector de sofá de ejemplo", price:69, description:"Complemento ficticio con precio ilustrativo. La asociación de la demo requiere confirmar medidas y compatibilidad en una tienda real."}
    ],
    deliveryNote: "El total incluye el transporte ilustrativo calculado por código postal. Montaje, subida, retirada y condiciones de acceso deberán confirmarse antes de una venta real. La comprobación de ancho no certifica que el sofá pase por todo el recorrido.",
    care: "Guía de ejemplo: revisa la etiqueta del tejido antes de limpiar y evita aplicar productos sin comprobar sus instrucciones. La composición y las propiedades de cada tapizado deberán acreditarse en la ficha real."
  },
  esquina: {
    intro: "Un sofá de ejemplo para imaginar una zona de reunión más amplia. Explora formatos de dos plazas, tres plazas o chaise, compara tapizados y conoce cómo cambia el espacio necesario y el precio ilustrativo.",
    highlights: ["Tres formatos para comparar", "El fondo cambia al elegir chaise", "Complementos opcionales con precio visible"],
    specs: [
      ["Tipo de ficha", "Especificaciones de ejemplo; artículo ficticio"],
      ["Formato base", "2 plazas · 180 × 95 cm"],
      ["Formato 3 plazas", "220 × 95 cm"],
      ["Formato chaise", "260 × 160 cm"],
      ["Tapizados de ejemplo", "Lino arena, microfibra o tejido antimanchas"],
      ["Regla de fabricación", "Todas las combinaciones de esta ficha están admitidas en la demo"],
      ["Bultos y orientación", "Pendientes de confirmar para un producto real"]
    ],
    gallery: [
      {src:"assets/sofa024.jpg", alt:"Fotografía oficial de DormiZen de un sofá; referencia visual de categoría, no del Sofá Esquina ficticio", label:"Referencia visual de categoría · sofá 1"},
      {src:"assets/sofa014.jpg", alt:"Fotografía oficial de DormiZen de otro sofá; referencia visual distinta de categoría, no una variante del Sofá Esquina", label:"Referencia visual de categoría · sofá 2"}
    ],
    related: ["lino", "terra"],
    accessories: [
      {id:"cojines-ejemplo", name:"Pareja de cojines de ejemplo", price:35, description:"Accesorio ficticio para ilustrar una venta asociada. Colores, tamaño y composición no corresponden a un artículo real."},
      {id:"protector-sofa-ejemplo", name:"Protector de sofá de ejemplo", price:69, description:"Complemento ficticio con precio ilustrativo. La asociación de la demo requiere confirmar medidas y compatibilidad en una tienda real."}
    ],
    deliveryNote: "Comprueba el código postal para ver el transporte de ejemplo. El embalaje, los módulos, el montaje y el recorrido hasta la habitación deberán revisarse con datos reales; el chequeo simplificado de esta demo requiere verificación humana del acceso.",
    care: "Guía de ejemplo: consulta las instrucciones del tapizado antes de limpiar y verifica las propiedades del tejido elegido. La denominación antimanchas del configurador es ilustrativa y no acredita una prestación de un producto DormiZen."
  },
  aura: {
    intro: "Un sillón relax de ejemplo para crear un lugar de pausa. Compara mecanismo y acabado, mira el espacio necesario al desplegarse y revisa las reglas ilustrativas antes de completar tu selección.",
    highlights: ["Mecanismo manual o eléctrico en la demo", "Chequeo con el sillón desplegado", "Acabado y precio actualizados al elegir"],
    specs: [
      ["Tipo de ficha", "Especificaciones de ejemplo; artículo ficticio"],
      ["Manual desplegado", "82 × 165 cm"],
      ["Eléctrico desplegado", "85 × 175 cm"],
      ["Acabados de ejemplo", "Textil claro o piel"],
      ["Regla de fabricación", "Mecanismo eléctrico con piel no disponible en esta demo"],
      ["Alimentación eléctrica", "En un producto real habría que confirmar conexión y requisitos"],
      ["Mecanismo y materiales", "Pendientes de validar en un catálogo real"]
    ],
    gallery: [
      {src:"assets/relax004.jpg", alt:"Fotografía oficial de DormiZen de un sillón; referencia visual de categoría, no del Relax Aura ficticio", label:"Referencia visual de categoría · sillón 1"},
      {src:"assets/relax007.jpg", alt:"Fotografía oficial de DormiZen de otro sillón; referencia visual distinta de categoría, no una variante del Relax Aura", label:"Referencia visual de categoría · sillón 2"}
    ],
    related: ["terra", "lino"],
    accessories: [
      {id:"cojin-cervical-ejemplo", name:"Cojín de reposacabezas de ejemplo", price:29, description:"Complemento ficticio, sin función terapéutica atribuida. La regla de asociación de la demo no confirma el ajuste en un sillón real."},
      {id:"protector-relax-ejemplo", name:"Protector de sillón de ejemplo", price:39, description:"Accesorio ficticio con precio ilustrativo. Para una venta real se comprobarían tamaño, fijación y libertad de movimiento del mecanismo."}
    ],
    deliveryNote: "El código postal permite calcular entrega y transporte de ejemplo. Medidas embaladas, montaje y acceso deben confirmarse. El visor muestra un sillón 3D genérico ajeno a DormiZen, sin mecanismo relax y sin relación con esta configuración.",
    care: "Guía de ejemplo: sigue las instrucciones del fabricante para el mecanismo y el tapizado. En una ficha real se deberán indicar alimentación, uso y mantenimiento adecuados para el modelo concreto."
  },
  terra: {
    intro: "Un sillón relax de ejemplo para completar tu rincón de descanso. Explora un mecanismo manual o eléctrico, compara acabados y comprueba tanto el espacio de uso como el total ilustrativo de la selección.",
    highlights: ["Dos mecanismos y dos acabados de ejemplo", "Medidas desplegadas visibles", "Accesorios opcionales para comparar"],
    specs: [
      ["Tipo de ficha", "Especificaciones de ejemplo; artículo ficticio"],
      ["Manual desplegado", "82 × 165 cm"],
      ["Eléctrico desplegado", "85 × 175 cm"],
      ["Acabados de ejemplo", "Textil claro o piel"],
      ["Regla de fabricación", "Todas las combinaciones de esta ficha están admitidas en la demo"],
      ["Alimentación eléctrica", "En un producto real habría que confirmar conexión y requisitos"],
      ["Mecanismo y materiales", "Pendientes de validar en un catálogo real"]
    ],
    gallery: [
      {src:"assets/relax007.jpg", alt:"Fotografía oficial de DormiZen de un sillón; referencia visual de categoría, no del Relax Terra ficticio", label:"Referencia visual de categoría · sillón 1"},
      {src:"assets/relax004.jpg", alt:"Fotografía oficial de DormiZen de otro sillón; referencia visual distinta de categoría, no una variante del Relax Terra", label:"Referencia visual de categoría · sillón 2"}
    ],
    related: ["aura", "esquina"],
    accessories: [
      {id:"cojin-cervical-ejemplo", name:"Cojín de reposacabezas de ejemplo", price:29, description:"Complemento ficticio, sin función terapéutica atribuida. La regla de asociación de la demo no confirma el ajuste en un sillón real."},
      {id:"protector-relax-ejemplo", name:"Protector de sillón de ejemplo", price:39, description:"Accesorio ficticio con precio ilustrativo. Para una venta real se comprobarían tamaño, fijación y libertad de movimiento del mecanismo."}
    ],
    deliveryNote: "El código postal permite calcular entrega y transporte de ejemplo. Medidas embaladas, montaje y acceso deben confirmarse. El visor muestra un sillón 3D genérico ajeno a DormiZen, sin mecanismo relax y sin relación con esta configuración.",
    care: "Guía de ejemplo: verifica las instrucciones específicas del mecanismo y del acabado antes de limpiar o ajustar el sillón. Las condiciones de uso y mantenimiento deberán incorporarse con el producto real."
  }
};
