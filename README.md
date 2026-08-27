# Naturelle Spa — landing page

Landing estática de Naturelle Spa construida con Vite, HTML semántico, CSS nativo y módulos ES6. La implementación preserva el inventario documentado, mejora progresivamente sin ocultar el contenido esencial y excluye datos o activos sin autorización.

## Inicio rápido

```bash
npm install
npm run dev
```

Para validar una entrega:

```bash
npm test
npm run build
npm run preview
```

## Fuentes de verdad

| Tema | Archivo |
|---|---|
| Identidad, voz y límites | `docs/01-identidad-digital-naturelle-spa.md` |
| Servicios y contenido suministrado | `docs/02-especificacion-diseno-web-naturelle-spa.md` |
| UX/UI y arquitectura | `docs/03-design.md` |
| Avance y bloqueadores | `docs/04-next-tasks.md` |
| Inventario canónico en código | `src/data/treatments.js` |

`npm run generate` optimiza las galerías a AVIF/WebP y produce `index.html` y `src/data/treatments.public.js` desde el inventario canónico. No edites esos archivos generados a mano.

## Estructura

```text
public/                     Activos públicos autorizados
scripts/generate.mjs        Generación de HTML y datos públicos
src/data/                   Contenido estructurado
src/index.template.html     HTML fuente
src/scripts/                Mejoras progresivas
src/styles/                 CSS por capas
tests/unit/                 Pruebas de catálogo y consulta
```

## Límites de publicación

- WhatsApp usa `6692384867` con `+52` como supuesto editable de México en `src/data/site.js`.
- Los precios autorizados se muestran en MXN; Cuerpo Esculpido no publica un precio individual no proporcionado.
- La ubicación usa el enlace oficial de Google Maps; dirección textual y horarios permanecen ausentes.
- La atención es exclusivamente con cita previa vía WhatsApp.
- No se publican resultados, testimonios ni fotografías corporales sin consentimiento.
- `imagenes/media-1784008566520.jpg` está excluido del pipeline público.
