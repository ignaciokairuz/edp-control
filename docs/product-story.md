# Síntesis implementada · EDP Control

2 de octubre de 2026. Diseño final del handoff: B → C con contención A, hero de producto dominante y fotografía de contexto. No se incorporan las otras dos exploraciones de hero al recorrido comercial.

## Estados

| URL | Estado y salida principal |
|---|---|
| `#inicio` | Promesa, comparación breve y foto. Ver cómo funciona; atajo experto. |
| `#como-funciona` | Definición de EDP y documento del caso. Siguiente. |
| `#fuentes` | Orden, adenda y respaldos. Comparar. |
| `#comparacion` | 120 ≠ 135; USD 225 para revisar. Abrir fuente. |
| `#fuente` | Hoja de Adenda 01; cerrar vuelve a comparación. Ver el producto. |
| `#demo` | Ocho líneas, cuatro para revisar; paquete y controles restantes disponibles. |
| `#precio`, `#cantidad`, `#respaldo`, `#adicional` | Detalle EDP ↔ fuente. Abrir evidencia; regresar a lista. |
| `#resumen` | Encontrá / Entendé / Decidí. Probar con un EDP. |
| `#probar` | Fundador, contexto real, icono oficial WhatsApp y agenda secundaria. |
| `#preguntas` | Ocho preguntas, una respuesta abierta por vez. |

Menú, paquete, controles restantes y fuente son diálogos, no nuevas propuestas. Los documentos y los hallazgos están preparados. Abrirlos no modifica ni resuelve el EDP.

## Responsive e interacción

Móvil: una columna, margen 24 px (20 a 320), comparación apilada, filas sin tabla horizontal, hojas completas. Escritorio: explicación y documento en paralelo; a 1280 px la comparación 120/135 se presenta lado a lado. Panel de fuente de hasta 680 px, lectura legible y cierre persistente.

El icono WhatsApp tiene 64 px, 80 px en contacto, nombre accesible “Escribir por WhatsApp”. Se reserva su espacio en el extremo derecho del footer, incluyendo safe area. No aparece en la historia ni mientras hay un panel abierto. En producto/FAQ aparece después de ver un hallazgo o una fuente; también está disponible al elegir contacto. Esta regla de presentación no mide comprensión.

Los hashes permiten Atrás/Adelante y recarga. Cambiar de pantalla enfoca el título. Los diálogos usan `showModal`, foco inicial, Tab/Shift+Tab contenido, Escape y restauración del invocador. Las pestañas usan flechas, Home/End, `aria-selected` y `tabpanel`. El FAQ usa `aria-expanded`/`aria-controls`. El lector y el formulario largo anteriores no forman parte de este recorrido.

## Movimiento

Documento: 260 ms, cubic-bezier(.2,.8,.2,1), entrada de 16 px. Comparación: 240 ms ease-out, cifras visibles. Fuente: 240 ms, hoja desde abajo o panel desde derecha; revela evidencia. Cambio de pestaña: 120 ms de opacidad. FAQ: 160 ms. WhatsApp: 120 ms de opacidad una sola vez. No hay autoavance, parallax, scroll hijacking ni falsa barra de análisis. `prefers-reduced-motion: reduce` elimina animación y transición manteniendo todo el contenido.

## Comprobación

Tests del fixture preservan montos, cantidades, referencias y límites. Tests de las fuentes verifican que cada cita exista en el paquete y que los resaltados pertenezcan al texto; se comprueba compatibilidad de rutas. TypeScript, lint y build son necesarios antes de publicar.

La revisión con usuarios sigue pendiente: prueba de cinco segundos, siguiente acción, diferencia encontrada, confianza en la fuente, archivos necesarios y último EDP corregido. No se presentan resultados comerciales o accesibilidad como medidos por un build.
