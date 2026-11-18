---
version: 1
slug: "src-index-template-html"
primary_target: "src/index.template.html"
related_targets: ["index.html"]
---

## Scope

Landing única de Naturelle Spa (`src/index.template.html` → `index.html`). Modo: Persuade. Rediseño total de arquitectura y presentación; contenido, datos y funciones se conservan.

## Audience and action

Personas adultas que llegan desde redes, mayormente en móvil, buscando el tratamiento para su objetivo. Acción: abrir WhatsApp con un mensaje preparado. Prueba: precios, duración y paquetes reales; imágenes ilustrativas aprobadas.

## Direction contract

THESIS: La landing es un largo de lino marfil doblado sobre una mesa oliva, como toalla de cabina; cada sección es un doblez que se abre en 3D con el scroll. Rechaza el hero partido con tarjetas iguales debajo.

OWN-WORLD: Campo oliva profundo #5e6248 como mesa; paneles de lino #f7f5ef con trama fina; reversos arena/salvia con sombra de pliegue; Cormorant Garamond carbón para titulares, Manrope para datos; botones píldora oliva oscuro #343a2b; reglas de costura punteada; sin tarjetas con sombra suave ni etiquetas sobre titulares.

STORY: Ver la promesa y la acción → elegir objetivo → comparar en el doblez-registro de precios → recorrer el rollo de imágenes → entender el protocolo → preparar el mensaje de WhatsApp.

FIRST VIEWPORT: Fondo oliva; logo, nav y «Pedir cita» arriba. Un panel de lino de ~84vw entre 14vh y 60vh: H1 Cormorant ~5rem a la izquierda con botón WhatsApp; bodegón botánico a la derecha. Debajo, un segundo doblez inclinado ~34° muestra tres tratamientos con precio. Firma: los dobleces giran en su bisagra ligados al scroll; el carrusel es un rollo de lino (cilindro 3D) con las 16 imágenes que gira con el scroll y con flechas/deslizar.

FORM: Lino plegado, #1 de mi lista ordenada (ronda de re-sorteo 1; elegido por el usuario como IMPECCABLE’S PICK). seed:375c33a8a51dac28

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Motion grammar

GSAP ScrollTrigger + Lenis (inercia suave). Solo transform/opacity/filter/clip-path; ease cubic-bezier(0.22,1,0.36,1). Cada elemento entra una vez; los dobleces se scrubean. `prefers-reduced-motion`: todo plano y visible, sin rotaciones.

## Unresolved

Ninguno. El cliente aprobó el carrusel de vista previa por secciones (preview/lino-carrusel.html) el 2026-11-17 y pidió construir el prototipo funcional completo.
