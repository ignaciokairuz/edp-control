# EDP Control · por Ignacio Kairuz

Revisión previa de Estados de Pago para contratistas mineros.
Publicado en https://ignaciokairuz.github.io/edp-control/

## Experiencia

Historia guiada → comparación → fuente → producto → una conversación con Ignacio.
La síntesis combina la progresión de B, la demostración de C y la contención de A.

- Entrada nueva: **Ver cómo funciona**. Entrada experta: **Ya preparo Estados de Pago → ver el ejemplo**.
- La guía explica trabajo, EDP, contrato/adenda/respaldos, USD 120 frente a USD 135 y la fuente. Se puede volver, salir o saltar al producto.
- La mini aplicación muestra ocho líneas y cuatro hallazgos preparados. Cada detalle abre una hoja completa en móvil o un panel en escritorio.
- Las fuentes de respaldo y adicional tienen pestañas para verificar documento, condición e índice. Cerrar/Escape restaura el foco al invocador.
- WhatsApp utiliza la marca oficial y un mensaje editable sin datos sensibles. No se envían mensajes automáticamente. La agenda es secundaria.
- Fotografía industrial real con crédito, usada como contexto. No representa clientes, el equipo ni a Ignacio. Falta un retrato autorizado del fundador; se usan sus iniciales.

## Alcance

`src/data/syntheticCase.ts` permanece como fixture ficticio. Las diferencias son **USD 225 para revisar**, **16 m³ para revisar**, un acta no encontrada **en el paquete** y una modificación aprobada no encontrada **en los archivos disponibles**. La persona decide qué corregir o consultar.

No hay análisis de archivos reales, motor contractual, aprobación, corrección o envío del EDP. Las líneas restantes dicen “Sin diferencias en los controles mostrados”. La utilidad y conversión aún requieren pruebas con usuarios.

El lector local de columnas anterior se conserva en el código y sus pruebas, pero no forma parte del nuevo recorrido público ni se incluye en su bundle.

## Desarrollo

```bash
npm ci
npm run dev -- --host 127.0.0.1
npm test
npm run lint
npm run build
```

React + TypeScript + Vite. Ruta base `/edp-control/`. Sin backend ni credenciales del ERP.
La navegación usa hashes para que los enlaces funcionen al recargar en GitHub Pages. Se conservan las entradas antiguas `#demo`, `#probar`, `#preguntas`, `#top`, `#detecta` y `#lector`.

## Código

- `CommercialPage.tsx`: historia, producto, contacto, FAQ y menú.
- `FindingComparison.tsx`: comparación y revisión humana; reutiliza el fixture existente.
- `ProductDialog.tsx`: hoja/panel, foco contenido, Escape y retorno al activador.
- `storySources.ts`: extractos obtenidos de los documentos del caso y vistas del índice.
- `storyFaq.ts`: ocho preguntas con revelado progresivo.
- `story.ts`: rutas y compatibilidad de enlaces.
- `contact.ts` / `ContactLink.tsx`: datos de contacto existentes y enlaces sin envío automático.
- `docs/ASSETS_LICENCIAS.md`: origen y derechos de fotografías, marca y tipografía.
- `docs/product-story.md`: estados, responsive, movimiento y revisión.

## Publicación

La rama `master` activa `.github/workflows/deploy.yml`: tests, lint, build y GitHub Pages. No se modifican permisos, dominios ni secretos.

Nunca incluir un EDP o contrato real de un cliente en este repositorio público. La primera prueba puede usar una plantilla vacía; tratamiento de datos, acceso, canal y eliminación se acuerdan antes del piloto.
