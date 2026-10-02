# Assets de EDP Control

Revisado 2 de octubre de 2026. Ninguna imagen de competidores se utiliza en el recorrido final.

| Asset | Autor/origen | Licencia y uso | Decisión |
|---|---|---|---|
| `assets/review.jpg` | ThisIsEngineering, [Pexels 3862135](https://www.pexels.com/photo/engineers-looking-at-blueprint-3862135/) | [Pexels License](https://www.pexels.com/license/): permite descarga, uso y modificación; no implica aval de personas o marcas | Incluida como contexto de revisión de documentos. No son Ignacio, su equipo ni clientes. |
| `assets/mine.jpg` | Enrique, [Pexels 15138925](https://www.pexels.com/photo/excavator-in-mine-15138925/) | [Pexels License](https://www.pexels.com/license/), mismas limitaciones | Incluida en franja industrial y hero A/C. No identifica una faena cliente ni país de operación de EDP Control. |
| Candidato de cantera no utilizado | omid roshan, [Unsplash jPrYQlp8bJ4](https://unsplash.com/photos/a-few-vehicles-in-a-quarry-jPrYQlp8bJ4) | [Unsplash License](https://unsplash.com/license), uso comercial permitido; descarga no accesible en esta sesión | Descartado. No se entrega un HTML de error como imagen. |
| Marca WhatsApp | [Meta Brand Resource Center](https://www.meta.com/brand/resources/whatsapp/whatsapp-brand/), paquete oficial WhatsApp-Brand-Resource-Center descargado | Recurso de marca, sujeto a las normas oficiales; no es un icono libre de Lucide | Se usa `Digital_Glyph_White_RGB_2026.svg` intacto sobre verde, con acceso WhatsApp identificable. Incluida la fuente exacta. |
| Iconos explicativos | Lucide, paquete local `lucide-react` | ISC, incluida con el paquete de entrega | SVG editables, 1.7 px, 20/24 px, con etiquetas visibles. |
| IBM Plex Sans | IBM, paquete `@fontsource/ibm-plex-sans` 5.3.0 | SIL Open Font License 1.1; texto de licencia incluido | Regular 400, Medium 500, Semibold 600. WOFF2 incluidos para prototipo autónomo. |
| Retrato Ignacio | No se encontró un retrato verificado disponible en las fuentes consultadas | Necesita fotografía real autorizada por Ignacio | Pendiente. Se usa nombre e iniciales, sin inventar rostro/equipo. |

Créditos de contexto visibles en los frames. El prototipo de contacto aclara que las personas de la fotografía no pertenecen a EDP Control. En producción preservar esta separación y no colocar testimonios o logos de clientes sobre stock.

No se generaron pseudo-fotografías de minería con IA. La licencia de stock no prueba ningún vínculo comercial. Si se reemplazan fotografías, actualizar este registro con autor, origen, licencia/autorización y fecha.


## Assets implementados

`src/assets/mine-640.webp` y `mine-1280.webp` derivan de la foto Pexels de Enrique. `review-640.webp` y `review-1280.webp` derivan de ThisIsEngineering. Se convierte formato y resolución sin cambiar su contenido. `srcSet`/`sizes` eligen el recurso según ancho. `WhatsApp_Official.svg` conserva la marca original sin reescribir sus paths. Las fuentes se sirven localmente desde los paquetes existentes.
