# Design QA · simplificación radical

Fecha: 2026-10-02. Resultado: **passed** para el alcance visual y funcional revisado. No quedan P0/P1/P2 observados. Es una revisión de diseño e implementación, no una prueba de comprensión con clientes ni una certificación de accesibilidad.

## Fuente de verdad y comparación

Fuente: brief del usuario «RADICAL SIMPLIFICATION PASS» y capturas de la web existente antes de editar. Esta tarea transforma la jerarquía; no pretende clonar la composición anterior.

Evidencia, en el workspace de la conversación `/workspace/scratch/89b9a964f8bc/`:

- `01_EDP_Antes_Simplificacion.jpg`: hero previo, Chrome 1363 × 936.
- `02_EDP_Producto_Antes.jpg`: producto anterior.
- `03_EDP_Simplificado_Escritorio.jpg`: nuevo hero, mismo Chrome 1363 × 936, inicio y sin diálogo.
- `04_EDP_Simplificado_Movil.jpg`: póster completo, iframe 390 × 844; scrollbar nativo deja 375 px de contenido.
- `05_EDP_Fuente_Opcional.jpg`: fuente móvil de precio, hoja abierta, contexto visible.
- `06_EDP_Contacto_Simple.jpg`: prueba, fotografía, contacto y WhatsApp.

Las capturas anterior y nueva de escritorio se inspeccionaron juntas en la misma entrada de comparación. Las vistas móvil y fuente se inspeccionaron además por legibilidad y contención. El screenshot de fuente constituye el pase enfocado de evidencia; no se construyeron imágenes falsas del producto.

También se comprobó el viewport 1440 × 900 con iframe real (1425 px de contenido por scrollbar), 768 × 1024 y 320 × 844. Los dos últimos usaron páginas QA temporales retiradas antes de publicar. Misma app, fuentes y assets; ninguna mutación de DOM para simular estados.

## Comparación visual

| Superficie | Resultado |
|---|---|
| Jerarquía | El precio concreto deja de ocupar el hero por defecto. Documentos → proceso → cuatro salidas explica el alcance antes de abrir un ejemplo. No hay tutorial obligatorio. |
| Fuentes | IBM Plex Sans existente. Título de 64 px máximo en escritorio, 32 px móvil, 29 px en 320. Definición breve del EDP de 12 px; fuentes documentales de 19 px móvil. No truncamiento observado. |
| Espaciado/layout | Tres etapas horizontales en escritorio, inputs 2 × 2 y etapas apiladas en móvil. Márgenes 24 px en 390, 20 px en 320. Las cuatro salidas y el aviso ficticio caben en 390 × 844. Sin superposiciones observadas. |
| Responsive | Contenido sin desborde horizontal en 390, 768, 1440 y 320 tras corregir el ancho mínimo del body. Producto lateral en escritorio, hoja inferior bajo 700 px. |
| Color/superficies | Papel #f3efe8, grafito #151a20, cobre #9a562c, texto secundario #5d6670. Sin gradientes, vidrios, ilustraciones AI o sombras decorativas. Documento y proceso mantienen un tratamiento industrial sobrio. |
| Fotografía | Asset Pexels existente, nítido a su tamaño y con crop contextual. Está junto al comienzo de prueba, no sustituye la explicación. Crédito indica expresamente que no es nuestro equipo. No se inventa un retrato. |
| Iconos | Lucide existente, stroke consistente, etiquetas visibles para inputs y estados. WhatsApp usa SVG oficial existente; es la excepción deliberada de icono sin label visual, con nombre accesible. |
| Copy | Cuatro momentos, cero FAQ comercial, cero menú, cero agenda secundaria, cero claims de precio/ahorro medido/AI ejecutada. Cantidades y límites conservan el fixture. |
| Atajos visuales | No hay arte CSS/SVG que suplante fotografías ni avatars ficticios. El producto es la UI interactiva real de esta demo; sus resultados son preparados y se declaran como tales. |

## Hallazgos corregidos

| Severidad | Evidencia/impacto | Corrección y verificación |
|---|---|---|
| P2 · navegación | El primer efecto desplazaba la página al hero y dejaba el encabezado fuera de la vista. | `CommercialPage`: el arranque sin hash conserva posición inicial; inicio explícito vuelve a top 0. Nueva captura 03 muestra encabezado completo; móvil 04 también. |
| P2 · tipografía | La definición breve de EDP tenía 10 px en móvil y era demasiado pequeña para reconocer qué documento es. | `index.css`: 12 px, wrap natural. Captura 04 muestra «Trabajo + importe a cobrar» legible dentro del documento. |
| P2 · responsive | En un viewport 320 con scrollbar, body min-width 320 producía scrollWidth 320 > clientWidth 305. | Se retiró el ancho mínimo global. Comprobación DOM posterior: 305 = 305; screenshot sin scrollbar horizontal. Hoja de respaldo sin desborde propio. |

## Interacciones y accesibilidad revisadas

- Cuatro hallazgos del póster abren sólo el ejemplo solicitado: precio 120/135 y diferencia 225; cantidad 128/112 y diferencia 16; respaldo ausente en el paquete; cambio en borrador y confirmación humana.
- Precio abre Adenda 01 · pág. 1 · ítem 01, resaltando fecha y USD 135. Cantidad, respaldo y cambio conservan sus referencias del fixture.
- Pestañas de respaldo: condición → paquete con ArrowRight; selección, tabpanel y foco actualizados. Cambio muestra solicitud en borrador y aprobación sin completar.
- «Volver al ejemplo» devuelve foco a «Ver fuente». Tab desde el último control vuelve a Cerrar. Escape cierra y restaura foco al hallazgo invocador.
- «Ver producto» lleva directamente al producto. Selección desktop cambia el panel lateral; tap móvil abre hoja. No se exige pasar por la demo para llegar al contacto.
- «¿Cómo funciona?» revela sólo la honestidad de la simulación; privacidad abre/cierra con teclado y restaura foco.
- WhatsApp conserva `wa.me`, mensaje editable sin datos sensibles, nombre «Escribir por WhatsApp», tooltip y marca oficial. 80 px desktop / 68 px móvil. Se inspeccionó el destino, sin enviar un mensaje de prueba.
- Filas del póster ≥44 px, foco visible, estados con texto, lectura ordenada, fuente legible. CSS de reduced motion elimina toda animación y transición. No se hizo auditoría completa de lector de pantalla o zoom del navegador.
- Consola revisada: los errores observados pertenecían a una extensión de Chrome; no se observaron errores del dominio de la app durante el flujo.

## Validación técnica

11 tests del caso, fuentes y navegación pasaron. Lint, TypeScript y build pasaron. `git diff --check` sin problemas. El deploy usa el workflow existente de GitHub Pages, con los mismos checks en CI.

## Revisión comercial heurística

| Momento | Evaluación | Razón |
|---|---|---|
| Entender | strong | Inputs, acción y salida nombrados y conectados en un visual; no depende de un párrafo. Falta medir comprensión en cinco segundos con personas. |
| Ver el producto | strong | Una interfaz concreta con cuatro marcas y acceso a evidencia. Mantiene decisión humana y límites del paquete. |
| Empezar | acceptable | Un EDP y tres mensajes reducen esfuerzo percibido. Precio y utilidad todavía no están validados. |
| Contacto | strong | Una pregunta y un icono reconocido; acceso directo a Ignacio, sin formulario ni CTA competidor. Conversión aún no medida. |

Siguiente prueba: mostrar cinco segundos a alguien nuevo y preguntar «¿Qué hace?». Éxito esperado: «Le doy el EDP y los papeles. Me muestra qué no cierra.» Registrar respuesta literal, no puntuar por gusto visual.
