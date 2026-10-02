# Simplificación implementada · EDP Control

2 de octubre de 2026. Una página tipo póster, sin otra dirección visual ni recorrido obligatorio.

## Cuatro momentos y copy

| Momento | Copy y contenido visible |
|---|---|
| Entender · `#inicio` | «Para contratistas mineros». «Encontramos lo que no cierra antes de que lo mandes.» Le das: Estado de Pago — Trabajo + importe a cobrar; Contrato / Orden; Adendas; Respaldos. EDP Control — Revisa y compara. Recibís: 4 cosas para mirar — Precio distinto; Cantidad distinta; Falta respaldo; Cambio para confirmar. «Caso ficticio. Tu equipo decide.» |
| Ver el producto · `#producto` | «Así lo ves.» EDP Agosto 2026, 8 líneas · 4 para mirar. Cuatro filas y una comparación. Las otras cuatro líneas están agrupadas en una revelación opcional. |
| Empezar · `#probar` | «Empezamos con un EDP.» «Si realmente te ahorra trabajo, seguimos.» No reemplaza tu ERP para probarlo. Partimos de tus archivos y controles. Tu equipo sigue tomando la decisión. Una fotografía acreditada de contexto. |
| Contacto · `#contacto` | «¿Querés ver si sirve para tu proceso?» «Lo vemos con Ignacio Kairuz.» Icono oficial WhatsApp, sin otro CTA de venta. |

El encabezado sólo tiene la marca y «Ver producto». Se retiraron menú, tutorial de cinco pasos, resumen adicional, FAQ comercial y agenda secundaria. La privacidad sigue disponible en el pie.

## Ejemplos opcionales

| Hallazgo | Comparación | Límite / siguiente paso humano |
|---|---|---|
| Precio distinto | EDP USD 120 por día · 15 días ↔ Adenda 01 USD 135 por día · desde 01/08 | USD 225 para revisar en 15 días. |
| Cantidad distinta | EDP 128 m³ ↔ Acta de avance 112 m³ | Hay 16 m³ para revisar. |
| Falta respaldo | Informe + fotos ↔ Acta de aceptación requerida | No aparece el acta requerida en este paquete. |
| Cambio para confirmar | 2 turnos adicionales ↔ Solicitud de cambio en borrador | No encontramos una modificación aprobada en los archivos disponibles. Confirmar con Contratos. |

Todos ofrecen «Ver fuente». La fuente muestra documento, página/ítem/cláusula, texto resaltado y motivo. «Vos revisás. Tu equipo decide.» permanece junto al hallazgo. Respaldo y cambio tienen pestañas de documentos/condición/paquete. «Volver al ejemplo» devuelve el foco a «Ver fuente»; Cerrar o Escape devuelve el foco al activador original.

«¿Cómo funciona?» es una revelación pequeña bajo el producto: «Esta demo muestra comparaciones y fuentes preparadas de un caso ficticio. No recibe ni analiza tus archivos.» No se atribuye a IA un procesamiento que la demo no realiza.

## Responsive

390 × 844 primero: margen 24 px, inputs en dos columnas con etiquetas, proceso central y flechas verticales, cuatro filas de salida de al menos 44 px. El póster completo entra en ese viewport. Sin tablas horizontales. La comparación de producto se abre en una hoja inferior a pedido; la fuente se lee con 19 px y puede desplazarse dentro de la hoja.

Escritorio: inputs, proceso y salidas en tres columnas con flechas horizontales. Producto en dos columnas: lista y comparación EDP ↔ fuente. Los ejemplos opcionales abren un diálogo centrado de hasta 560 px. No se estira el móvil.

WhatsApp: icono circular de 68 px en contacto móvil, 80 px en escritorio, `aria-label="Escribir por WhatsApp"`, tooltip «WhatsApp». En móvil, el flotante de 64 px sólo puede aparecer después de pasar el producto y antes de que el contacto esté visible; se oculta con un diálogo abierto y respeta safe area. Esta regla no afirma comprensión medida. Enlaces `wa.me` existentes con mensaje editable: «Hola Ignacio. Vi EDP Control y quiero ver si puede servir para nuestro proceso de Estados de Pago.»

El slot del precio está en la prueba, junto a alcance y esfuerzo, pero permanece oculto. Sólo se activa cuando precio y alcance del piloto estén validados.

## Movimiento y accesibilidad

| Transición | Trigger | Duración / curva | Movimiento y propósito | Reduced motion |
|---|---|---|---|---|
| Abrir ejemplo/fuente en móvil | Tap en hallazgo o fuente | 180 ms, cubic-bezier(.2,.8,.2,1) | Hoja desde abajo: lleva el detalle al pulgar sin cambiar de página. | Aparición inmediata. |
| Abrir diálogo en escritorio | Click/Enter en hallazgo o fuente | 160 ms ease-out | Revelado breve, sin recorrido narrativo. | Aparición inmediata. |
| Cambiar fila, pestaña o volver al ejemplo | Click o teclado | Inmediato | Sólo cambia el contenido solicitado; no hay animación decorativa. | Igual. |
| Ir al producto/inicio | Enlace | Inmediato | Ancla nativa; sin scroll hijacking. | Igual. |
| Estado hover de WhatsApp | Puntero | 120 ms ease-out | Fondo del control indica interacción. | Inmediato. |

`prefers-reduced-motion: reduce` elimina animaciones/transiciones. Orden de lectura lógico, iconos con etiquetas, estados con texto y foco visible. Diálogos nativos `showModal`, Escape, Tab/Shift+Tab contenido y retorno de foco. Pestañas con flechas/Home/End, roving tabindex y `tabpanel`. No se certifica conformidad WCAG a partir del build.

## Inventario de implementación

React: `CommercialPage`, `InputOutput`, `ProductView`, `CompactComparison`, `FindingSheet`, `ProductDialog`, `ContactLink`, privacidad existente. Tokens: papel cálido, superficie blanca, grafito, cobre, borde y estado revisión; IBM Plex Sans, escala existente simplificada. Assets: fotografía Pexels acreditada y marca oficial WhatsApp, existentes y licenciados. No se crea un retrato falso de Ignacio.

Simulado: caso, líneas, diferencias, índices, fuentes y montos preparados. No se agregan uploads, análisis de documentos reales, aprobación o envío automático.

## Próxima comprobación con personas

Mostrar el póster cinco segundos y preguntar «¿Qué hace?». Después: «Mostrame qué harías ahora», «¿Qué encontró?», «¿Por qué creés ese hallazgo?», «¿Qué archivos le darías?» y «¿Qué tuviste que corregir en el último Estado de Pago?». Registrar palabras y acciones; no preguntar si les gusta ni presentar comprensión/conversión como validadas.
