# EDP Control · por Ignacio Kairuz

Revisión previa de Estados de Pago para contratistas mineros.
Publicado en https://ignaciokairuz.github.io/edp-control/

## Experiencia

Una página, cuatro momentos: entender → ver el producto → empezar con un EDP → conversar.

- El primer visual muestra Estado de Pago, contrato/orden, adendas y respaldos → EDP Control, «Revisa y compara» → cuatro cosas para mirar.
- No hay recorrido obligatorio. Cada hallazgo abre un ejemplo breve y su fuente cuando se pide.
- La mini aplicación muestra ocho líneas y cuatro hallazgos preparados. En escritorio la selección cambia la comparación lateral; en móvil abre una hoja pequeña.
- La fuente conserva documento, página/cláusula y resaltado. Las pestañas de respaldo y adicional permiten comprobar también el índice. Cerrar/Escape devuelve el foco al invocador.
- «Empezamos con un EDP» presenta tres garantías de alcance y una foto real de contexto. La foto no representa nuestro equipo, clientes ni al fundador.
- El contacto principal es la marca oficial de WhatsApp con nombre accesible «Escribir por WhatsApp». El mensaje se prepara sin datos sensibles y no se envía automáticamente.
- El espacio del precio piloto está reservado, oculto hasta contar con un precio y alcance validados. No hay precio inventado ni promesa de ahorro medido.

## Alcance

`src/data/syntheticCase.ts` permanece como fixture ficticio. Las diferencias son **USD 225 para revisar**, **16 m³ para revisar**, un acta no encontrada **en el paquete** y una modificación aprobada no encontrada **en los archivos disponibles**. La persona decide qué corregir o consultar.

La demo no recibe ni analiza archivos reales. No aprueba, corrige ni envía el EDP. Las cuatro líneas restantes se agrupan bajo «sin diferencias en estos controles». «¿Cómo funciona?» revela el alcance de la simulación cuando se solicita. La comprensión y utilidad comercial siguen pendientes de pruebas con usuarios.

El lector local y la historia anterior se conservan en el código donde aún sirven a pruebas y compatibilidad, pero no forman parte del recorrido público.

## Desarrollo

```bash
npm ci
npm run dev
npm test
npm run lint
npm run build
```

React + TypeScript + Vite. Ruta base `/edp-control/`. Sin backend ni credenciales del ERP. El servidor de desarrollo admite `terminal.local` para la vista previa local.

Los hashes permiten enlaces directos y recarga en GitHub Pages. `#demo` y `#detecta` llevan al producto; `#probar`, `#lector` y `#resumen`, al inicio de prueba. Los enlaces antiguos de hallazgos abren el ejemplo correspondiente; `#fuente` abre la adenda. Los enlaces a la explicación anterior regresan al póster.

## Código

- `CommercialPage.tsx`: póster, producto, prueba, contacto y ejemplos opcionales.
- `compactFindings.ts`: presentación breve de los cuatro hallazgos ficticios.
- `ProductDialog.tsx`: diálogo/hoja, foco contenido, Escape y retorno al activador.
- `storySources.ts` / `FindingComparison.tsx`: extractos del caso y resaltados.
- `story.ts`: destinos actuales y compatibilidad de enlaces.
- `contact.ts` / `ContactLink.tsx`: contacto existente y enlaces sin envío automático.
- `docs/ASSETS_LICENCIAS.md`: origen y derechos de fotografía, marca y tipografía.
- `docs/product-story.md`: copy, estados, responsive y movimiento.
- `design-qa.md`: revisión visual y funcional de esta simplificación.

## Publicación

La rama `master` activa `.github/workflows/deploy.yml`: tests, lint, build y GitHub Pages. No se modifican permisos, dominios ni secretos.

Nunca incluir un EDP o contrato real de un cliente en este repositorio público. La primera prueba puede usar una plantilla vacía; tratamiento de datos, acceso, canal y eliminación se acuerdan antes del piloto.
