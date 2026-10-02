# EDP Control · por Ignacio Kairuz

Sitio comercial independiente para explicar una revisión de Estados de Pago antes del envío.

Publicado en https://ignaciokairuz.github.io/edp-control/

## Qué funciona y qué se demuestra

- El ejemplo permite explorar cuatro hallazgos preparados y sus fragmentos de fuente, o recorrer una guía de seis pasos.
- El caso es completamente ficticio: ocho líneas, una orden de servicio, una adenda y respaldos. Está en `src/data/syntheticCase.ts`.
- La web **no analiza esos PDF ni ejecuta un motor contractual general**. No aprueba EDP ni autoriza a facturar.
- El lector opcional lee la primera hoja de un XLSX/CSV de hasta 5 MB, muestra columnas y diez filas de vista previa. No compara el contenido con contratos.
- El lector funciona en el navegador, sin backend ni persistencia. No envía archivos. Quitar el archivo o cerrar el lector limpia esa vista.
- Los enlaces de contacto preparan un borrador de WhatsApp/email, o abren la agenda existente. No envían mensajes ni adjuntan archivos automáticamente.

## Desarrollo y verificación

```bash
npm ci
npm run dev -- --host 127.0.0.1
npm test
npm run lint
npm run build
```

La ruta base es `/edp-control/`. React, TypeScript, Vite, Tailwind, Lucide y SheetJS. El lector se carga por separado; SheetJS se importa sólo al seleccionar una plantilla.

## Estructura

- `src/components/CommercialPage.tsx`: navegación, hero, ejemplo, guía, recorrido, alcance, prueba, FAQ, fundador y metodología.
- `src/components/FindingComparison.tsx`: comparación, fragmento relevante y revisión humana.
- `src/components/TemplateMapper.tsx`: lector local de columnas.
- `src/components/PrivacyModal.tsx` y `src/lib/privacy.ts`: diálogo nativo con foco contenido, Escape y retorno al activador.
- `src/data/contact.ts`: contactos públicos existentes.
- `src/data/syntheticCase.ts`: fixture ficticio y alcance de los controles.
- `src/lib/analytics.ts`: hooks opcionales de eventos, sin proveedor instalado. Un clic no demuestra que se envió un mensaje ni valida demanda.
- `tests/synthetic-case.test.mjs`: integridad de datos, cálculo de diferencias y límites del lector.

## Publicación

La rama `master` activa `.github/workflows/deploy.yml`. GitHub Actions instala dependencias, ejecuta tests y lint, construye y despliega `dist` en GitHub Pages. La publicación también contempla `main` si el repositorio cambia de rama.

## Documentación real y primera prueba

**Nunca reemplazar el fixture público por un contrato o EDP de un cliente.** La etiqueta `synthetic: true` no anonimiza datos ni protege la información incluida en un sitio público.

La primera conversación puede usar una plantilla vacía o datos ficticios. Antes de recibir datos reales se acuerdan alcance, autorización, canal, personas con acceso, procesamiento, proveedores, plazo de eliminación, precio y duración. El trabajo real se realiza en un entorno privado acordado, en paralelo al circuito oficial.

La prueba debe medir esfuerzo neto de preparación/revisión, marcas útiles y erróneas, problemas no detectados y vueltas observadas. El sitio no publica ahorros, precisión, clientes ni resultados de piloto sin evidencia.

## Referencias y límites

Las fuentes públicas de Vicuña describen revisión de EDP y cambios de presentación mediante Coupa. Debe confirmarse qué circuito aplica a cada contrato y qué trabajo queda fuera del sistema actual. Las referencias no son clientes ni endorsements. Si el proceso actual ya resuelve el trabajo, no se propone agregar una herramienta.
