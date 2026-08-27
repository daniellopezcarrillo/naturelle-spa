# Backlog de próximas tareas — Naturelle Spa

Backlog ordenado por dependencias. Cada tarea tiene un resultado verificable; no se debe marcar como terminada si depende de datos aún **TBD**. La arquitectura y los criterios de implementación están en [`03-design.md`](03-design.md); este archivo registra avance, no redefine decisiones.

## Prioridades y estados

- **P0:** bloquea publicación o identidad.
- **P1:** necesario para primera versión funcional.
- **P2:** mejora posterior o fase 2.

## Tareas

| ID | Prioridad | Fase | Responsable | Criterio de aceptación | Estado |
|---|---|---|---|---|---|
| ARCH-01 | P0 | Arquitectura | UX/frontend | Contrato canónico, stack, componentes, estados, estructura futura y criterios de calidad documentados en `03-design.md` | [x] |
| DATA-01 | P0 | Datos | Negocio | Confirmar URL canónica de Facebook e Instagram; usar enlaces sin tracking | [x] |
| DATA-02 | P0 | Datos | Negocio | Entregar dirección, ciudad/estado, CP, país, horarios, moneda, lada internacional y políticas | [ ] |
| BRAND-01 | P0 | Identidad | Negocio/diseño | Entregar logo maestro SVG/PNG, horizontal, isotipo, claro, monocromo y favicon; aprobar color final | [ ] |
| CONTENT-01 | P0 | Validación | Negocio/profesional | Revisar nombres, precios, duración, beneficios, frecuencia facial y lenguaje de aparatología; no quedan afirmaciones no aprobadas | [x] |
| LEGAL-01 | P0 | Cumplimiento | Negocio/legal | Aprobar aviso de privacidad, consentimiento de imágenes, cancelación, anticipo y uso de testimonios | [ ] |
| IMG-01 | P0 | Dirección de arte | Fotografía/diseño | Definir shot list, permisos, formatos, nombres y destino de cada asset | [ ] |
| IMG-01A | P0 | Privacidad | Negocio/frontend | Excluir el comprobante `imagenes/media-1784008566520.jpg` de todo asset/build público y documentar consentimiento/metadatos antes de usar fotografías corporales | [x] |
| IMG-02 | P1 | Producción | Fotografía | Capturar hero/espacio: cabina, recepción, texturas y ambiente en luz difusa | [ ] |
| IMG-03 | P1 | Producción | Fotografía | Capturar aparatología real y manos/procedimientos sin mostrar datos o rostros no autorizados | [ ] |
| IMG-04 | P1 | Producción | Diseño/IA | Generar texturas, patrones e ilustración corporal original; no crear resultados, personas o testimonios ficticios | [x] |
| IMG-05 | P1 | Optimización | Frontend | Exportar AVIF/WebP, variantes responsive, `alt`, dimensiones y peso LCP ≤250 KB | [x] |
| UX-01 | P0 | UX | Diseño | Crear wireframes mobile-first de hero, selector, catálogo, facial, booking y contacto | [x] |
| UX-02 | P1 | UX | Diseño | Validar flujo objetivo conocido y flujo de valoración con 3–4 personas o revisión del negocio | [ ] |
| UI-01 | P1 | UI | Diseño | Convertir tokens aprobados (colores, tipos, escala, radios, espaciado, movimiento 4/10) en guía implementable | [x] |
| DATA-03 | P1 | Contenido | Frontend | Crear único objeto JSON/JS para los 10 corporales + 1 facial, incluyendo `category`, `goal`, `zones`, precios/paquetes y campos TBD; selector, catálogo y WhatsApp deben derivar de él | [x] |
| WEB-00 | P1 | Implementación | Frontend | Crear scaffold Vite vanilla conforme a la estructura de `03-design.md`, sin copiar a `public/` activos sensibles o no autorizados | [x] |
| WEB-01 | P1 | Implementación | Frontend | Construir HTML semántico con contenido esencial visible sin JavaScript | [x] |
| WEB-02 | P1 | Implementación | Frontend | Implementar CSS mobile-first, composición editorial y responsive sin scroll horizontal a 320px | [x] |
| WEB-03 | P1 | Implementación | Frontend | Implementar navegación sticky, menú móvil, selector, catálogo y FAQ accesibles | [x] |
| WEB-04 | P1 | Conversión | Frontend | Generar mensajes WhatsApp codificados por tratamiento/valoración; no afirmar cita confirmada | [x] |
| SEO-01 | P1 | SEO | Frontend | Configurar title/description, canonical, OG/Twitter, robots y sitemap con datos confirmados | [ ] |
| SEO-02 | P1 | SEO | Frontend | Añadir JSON-LD con `HealthAndBeautyBusiness`/`LocalBusiness`, `sameAs`, servicios y FAQ visible | [x] |
| A11Y-01 | P1 | Calidad | QA | Verificar WCAG 2.2 AA: contraste, foco, labels, alt, teclado, lector, áreas 44px y reduced motion | [ ] |
| PERF-01 | P1 | Calidad | QA | Medir LCP/INP/CLS y Lighthouse; corregir hasta objetivos documentados o registrar excepción | [ ] |
| QA-01 | P1 | Calidad | QA | Probar Chrome/Edge/Firefox/Safari y anchos 320–1440px; verificar enlaces sociales y WhatsApp | [ ] |
| ANALYTICS-01 | P1 | Analítica | Negocio/frontend | Elegir herramienta, consentimiento y retención; medir CTA WhatsApp, selector, tratamiento, FAQ y direcciones sin PII | [ ] |
| DEPLOY-01 | P1 | Publicación | DevOps | Configurar dominio/HTTPS, hosting, redirects, robots, sitemap y revisión de producción | [ ] |
| DEPLOY-02 | P1 | Publicación | Negocio/QA | Ejecutar checklist de contenido real y aprobación final antes de anunciar URL | [ ] |
| P2-01 | P2 | Evolución | Producto | Crear páginas individuales por servicio, promociones, contacto local y contenido SEO por ciudad | [ ] |
| P2-02 | P2 | Evolución | Producto | Integrar agenda o pagos solo tras definir proveedor, privacidad y disponibilidad real | [ ] |

## Dependencias críticas

```text
ARCH-01 → WEB-00
             ↓
UX-01 → UI-01 → DATA-03 → WEB-01 → WEB-02 → WEB-03 → WEB-04
             ↑
IMG-01 + IMG-01A → IMG-02/03/04 → IMG-05
        ↓
SEO-01/02 + A11Y-01 + PERF-01 + QA-01
        ↓
ANALYTICS-01 → DEPLOY-01 → DEPLOY-02
```

`DATA-02`, `BRAND-01`, `CONTENT-01` y `LEGAL-01` pueden resolverse en paralelo al desarrollo, pero bloquean la publicación de los campos o capacidades afectados. No bloquean el scaffold ni el HTML base si los valores pendientes permanecen ocultos.

## Evidencia de implementación — 2026-07-25

- Vite genera una landing estática desde `src/index.template.html`.
- `src/data/treatments.js` conserva los 10 tratamientos corporales y el facial; el generador deriva HTML y un índice público mínimo para JavaScript.
- Cada tratamiento cuenta con detalle seleccionable de qué es, duración disponible, inclusión, tecnologías/materiales, beneficios, precios MXN y CTA contextual.
- El logo oficial exacto aparece en navegación, hero y footer; el favicon y símbolo entregados se preservan.
- Existen galerías separadas corporal/facial con cuatro assets generados, optimizados a AVIF/WebP; su carácter generado se conserva como nota de transparencia en la documentación interna, sin caption visible obligatorio.
- WhatsApp usa `6692384867` con `+52` como supuesto editable centralizado; la ubicación enlaza al Google Maps oficial y la atención se indica únicamente con cita previa.
- Menú móvil, filtro por zona, catálogo, FAQ nativa y preparación de mensajes se verificaron en navegador.
- La composición se revisó a `1440 × 1000`, `375 × 812` y `320 × 700`; a 320 px no existe desbordamiento horizontal.
- El hero usa un still life botánico original, sin personas ni evidencia clínica, optimizado a AVIF (82 859 bytes) y WebP (121 786 bytes).
- `npm test` completa 11 pruebas; `npm run build` termina correctamente.
- Con JavaScript desactivado, la hoja de estilos y las fuentes se cargan desde el HTML; a 320 y 375 px no hay desbordamiento, imágenes rotas ni pérdida del catálogo.
- El bundle se escaneó y no contiene comprobantes ni fotografías corporales históricas sin autorización; los precios MXN, teléfono y beneficios visibles corresponden a datos autorizados.

La web está implementada y lista para revisión del negocio en entorno local, pero no para publicación final mientras permanezcan los bloqueadores P0 y de despliegue.

## Definition of Done

- [ ] Datos de negocio y políticas restantes confirmados; ningún TBD visible.
- [x] Logo oficial y pack de imágenes autorizadas tienen versiones web optimizadas.
- [x] El comprobante de pago y cualquier fotografía sin consentimiento quedan fuera del build público.
- [x] La identidad editorial botánica y tokens aprobados se respetan en desktop y móvil.
- [x] Selector, catálogo, FAQ, navegación y WhatsApp funcionan con teclado y tacto.
- [x] No hay afirmaciones médicas, resultados antes/después ni testimonios inventados.
- [ ] SEO/schema contienen solo datos confirmados y enlaces sociales oficiales.
- [ ] Contraste, foco, alt, reduced motion y zoom 200% verificados.
- [ ] Lighthouse/Core Web Vitals cumplen objetivos o excepciones registradas.
- [ ] Producción usa HTTPS, dominio correcto, robots/sitemap y analítica consentida.
- [ ] Negocio aprueba contenido, imágenes y comportamiento final.

## Bloqueadores actuales

1. Falta confirmar si `+52` es el código internacional definitivo; está centralizado para corregirlo.
2. Falta dirección textual y horarios; el enlace oficial de Google Maps ya está integrado.
3. Falta logo vectorial y variantes de impresión; los raster oficiales ya están integrados.
4. Falta aviso de privacidad y políticas de anticipo/cancelación.
5. Falta material fotográfico propio si se desea reemplazar las galerías de apoyo visual.
6. Falta dominio/hosting y decisión de analítica.

## Próximo paso de publicación

1. Obtener dominio, dirección textual, horarios y políticas legales/operativas definitivas.
2. Confirmar el supuesto de código internacional `+52`.
3. Ejecutar revisión del negocio, pruebas con lector de pantalla/zoom y medición Lighthouse.
4. Configurar canonical, robots, sitemap, HTTPS y hosting con la URL definitiva.
5. Aprobar la versión de producción antes de anunciarla.
