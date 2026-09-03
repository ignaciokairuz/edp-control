# EDP Control — Kairuz Mining Systems

Sitio de demo comercial para **EDP Control**: precontrol de Estados de Pago para contratistas mineros.

No es una landing genérica. El centro del sitio es una demo operativa: un paquete sintético (EDP, contrato, adenda y evidencias) se contrasta y muestra excepciones con trazabilidad.

**Owner:** Ignacio Kairuz  
**Producto:** Precontrol de Estados de Pago para contratistas mineros  
**URL prevista:** https://ignaciokairuz.github.io/edp-control/

## Objetivo

Permitir que un Contract Manager, CFO o responsable de facturación entienda en menos de un minuto:

1. qué problema se atiende;
2. qué archivos usa el producto;
3. qué chequeos hace;
4. qué output genera;
5. por qué eso puede reducir reenvíos;
6. cómo se implementaría;
7. qué hace falta para un piloto;
8. cuál es el siguiente paso.

La promesa no es aprobar un Estado de Pago. Es detectar inconsistencias **antes** de enviarlo.

## Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Lucide React
- SheetJS (`xlsx`) para lectura local de XLSX/CSV

Sin backend, Firebase, Supabase ni API keys. Todo corre como sitio estático.

## Ejecutar en local

```bash
npm install
npm run dev
```

El `base` de Vite es `/edp-control/`. En desarrollo el sitio queda en:

`http://localhost:5173/edp-control/`

## Build

```bash
npm run build
npm run preview
```

El preview también usa `/edp-control/`.

## Deploy en GitHub Pages

1. Crear el repositorio `edp-control` en la cuenta de GitHub.
2. Publicar esta rama como `main`.
3. En el repositorio: **Settings → Pages → Source = GitHub Actions**.
4. El workflow `.github/workflows/deploy.yml` hace checkout, `npm ci`, `npm run build` y publica `dist`.

No usar `BrowserRouter`. Es una sola página con anclas.

## Estructura

```
src/
  data/demoEdp.ts      Caso sintético (28 líneas, 5 excepciones)
  data/contact.ts      Email, WhatsApp, LinkedIn, agenda
  lib/analytics.ts     trackEvent (console.debug / gtag si existe)
  lib/parseSpreadsheet.ts
  components/          Navbar, Hero, demo, implementación, formulario, etc.
```

## Cómo editar los datos sintéticos

El caso vive en `src/data/demoEdp.ts`.

- `synthetic: true` debe permanecer.
- Empresas, montos y cláusulas son ficticios: Andes Servicios Industriales S.A., Proyecto Cordillera Norte, Contrato OS-184.
- No usar nombres reales de proveedores, CUIT reales ni contratos de operadoras.

Para cambiar hallazgos, editá `exceptions` y el `flag` de `lines`. El resumen (`summary`) debe seguir coincidiendo: 28 revisadas, 23 OK, 3 corregibles, 2 a revisión.

## Cómo cambiar contactos

Editá `src/data/contact.ts`. El formulario de discovery construye el texto y abre WhatsApp o email con `encodeURIComponent`. No envía datos solo.

## Privacidad

Los archivos cargados en el mapeo de plantilla se leen **en el navegador**. No hay upload a servidor ni persistencia en `localStorage`. El botón **Eliminar archivo** limpia el estado de la sesión.

## Alcance de la demo

La demo ilustra un workflow plausible. No afirma que todas las empresas trabajen igual, ni que exista un gap en todos los ERP/portales. El piloto existe para medir si hay reglas específicas fuera del sistema actual y si automatizarlas vale el costo.

## Cómo adaptar el primer EDP real

La demo no intenta adivinar un contrato. Cuando llegue el primer paquete anonimizado:

1. Reemplazar o ampliar `src/data/demoEdp.ts` con líneas, reglas y excepciones del caso real (mantener `synthetic: true` hasta que el cliente autorice otro tratamiento).
2. Ajustar el mapeo de columnas en `src/lib/parseSpreadsheet.ts` si la plantilla usa encabezados distintos.
3. Reconstruir sólo las cláusulas necesarias para precio, unidad, acumulado, vigencia de adendas y evidencia esperada.
4. Correr el piloto en paralelo al circuito oficial y medir tiempo, observaciones preventibles y excepciones que siguen pidiendo una persona.

## Disclaimer

Proyecto independiente. No afiliado ni respaldado por ninguna operadora minera, plataforma de procurement u organismo público mencionado como referencia.

Las plataformas empresariales pueden absorber partes de estos workflows. El objetivo del piloto es identificar qué validaciones específicas permanecen fuera del sistema existente y si automatizarlas genera valor suficiente.
