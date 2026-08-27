# Contrato de UX/UI y arquitectura web — Naturelle Spa

Este documento es la **fuente canónica de implementación** para la landing de Naturelle Spa. Traduce la identidad y el contenido aprobado en una experiencia editorial botánica contemporánea, mobile-first y orientada a citas por WhatsApp. Los precios MXN, beneficios, teléfono y ubicación enlazada fueron autorizados por el usuario; los valores todavía no proporcionados permanecen ocultos o se aclaran sin inventarlos.

## Ruta rápida para implementación

1. Usar `01-identidad-digital-naturelle-spa.md` para identidad, voz y límites de marca.
2. Usar `02-especificacion-diseno-web-naturelle-spa.md` para alcance, inventario de servicios, precios y contenido suministrado.
3. Implementar estructura, componentes, estados y calidad según este documento.
4. Usar `04-next-tasks.md` para dependencias, validaciones y salida a producción.

### Autoridad documental

| Tema | Fuente de verdad | Regla |
|---|---|---|
| Identidad, voz y uso de marca | `docs/01-identidad-digital-naturelle-spa.md` | No duplicar ni reinterpretar la promesa o el tono |
| Servicios, precios, duración y textos suministrados | `docs/02-especificacion-diseno-web-naturelle-spa.md` | Copiar literalmente; conservar los **TBD** y validaciones |
| UX, UI, arquitectura frontend y criterios técnicos | `docs/03-design.md` | Este documento decide la implementación |
| Secuencia de trabajo y bloqueadores | `docs/04-next-tasks.md` | No marcar tareas sin evidencia |

Si aparece un conflicto, se detiene la publicación del dato afectado. El implementador no elige una versión por conveniencia.

## Decisión ejecutiva

Construir una landing estática con **Vite, HTML5 semántico, CSS moderno y JavaScript ES6+ por módulos**, sin framework de UI ni router. La información esencial debe existir en el HTML; JavaScript mejora navegación, filtros, acordeones y generación del enlace a WhatsApp, pero no debe ser requisito para descubrir servicios y datos disponibles.

| Decisión | Valor | Consecuencia |
|---|---|---|
| Modo de la superficie | Persuadir | La oferta, la orientación y el CTA deben ser comprensibles en el primer viewport |
| Variación visual | Alta, controlada (`7/10`) | Asimetría editorial y ritmo; no una cuadrícula de tarjetas repetidas |
| Movimiento | Moderado (`4/10`) | Solo orienta, revela o confirma; nunca retrasa contenido |
| Densidad | Baja (`3/10`) | Bloques breves, aire intencional y lectura rápida |
| Conversión | WhatsApp contextual | El sitio inicia una conversación; no confirma citas |
| Entrega inicial | Una página | Arquitectura preparada para separar rutas en fase 2 |

### Estado de preparación

La implementación funcional está construida con identidad oficial, catálogo, detalles, precios MXN, galerías ilustrativas, WhatsApp y ubicación enlazada. La publicación final todavía requiere resolver políticas legales y cualquier dato operativo adicional que el negocio quiera mostrar.

## Tesis de experiencia

### Trabajo de la persona visitante

La persona llega con uno de dos estados:

- **Objetivo conocido:** quiere relacionar una zona o necesidad con un tratamiento y consultar disponibilidad.
- **Necesita orientación:** quiere entender el enfoque, el protocolo y pedir una valoración sin elegir un tratamiento incorrecto.

### Resultado y prueba

El éxito primario es abrir WhatsApp con un mensaje claro y contextual. La confianza se construye con información verificable: técnicas y precios suministrados, protocolo explicado con prudencia, fotografías reales autorizadas y datos operativos confirmados. Resultados, testimonios y afirmaciones no validadas no se sustituyen por material sintético.

### Secuencia narrativa

```text
Reconocer la oferta
→ elegir un objetivo o pedir orientación
→ comparar tratamientos con información concreta
→ entender filosofía, tecnología y protocolo
→ resolver dudas y límites
→ iniciar una conversación contextual
→ consultar ubicación y datos operativos confirmados
```

Esta secuencia reemplaza una navegación centrada en una lista extensa de servicios. La selección por objetivo reduce carga cognitiva, pero nunca oculta el inventario completo.

## Arquitectura de información

```text
SiteHeader
└─ main
   ├─ HeroSection                    # oferta + diferencia + CTA
   ├─ TrustStrip                     # hechos confirmados, no sellos inventados
   ├─ GoalSelector                   # orientación por objetivo/zona
   ├─ TreatmentCatalog               # 10 tratamientos corporales
   ├─ FacialFeature                  # Juventud Radiante
   ├─ PhilosophySection              # tecnología + cuidado natural
   ├─ TechnologySection              # solo contenido técnico validado
   ├─ ProtocolSection                # valoración → selección → sesiones → evolución
   ├─ ResultsSection?                # oculta sin material y consentimiento
   ├─ TestimonialsSection?           # oculta sin testimonios autorizados
   ├─ FaqSection                     # solo respuestas aprobadas
   ├─ BookingSection                 # formulario local → WhatsApp
   └─ ContactSection                 # solo datos operativos confirmados
SiteFooter
MobileWhatsAppAction?                # móvil; no tapa contenido ni controles
```

### Navegación

Orden recomendado: `Tratamientos · Experiencia · Tecnología · Preguntas · Contacto · Reservar`.

- Los enlaces apuntan a identificadores estables y desplazan el foco al destino.
- El header puede volverse compacto al desplazarse, sin saltos de layout.
- En móvil, el menú es un diálogo o panel con cierre explícito, tecla `Escape`, retorno de foco y bloqueo de scroll solo mientras está abierto.
- El CTA flotante móvil es condicional: se habilita únicamente si no compite con el CTA visible ni reduce el área útil.

## Plano de secciones

| Sección | Responsabilidad | Contenido obligatorio | Interacción/estado | Criterio de salida |
|---|---|---|---|---|
| Header | Orientar y sostener acceso a la acción | Marca, navegación, CTA | inicial, compacto, menú abierto/cerrado | Teclado, foco y retorno de foco correctos |
| Hero | Explicar oferta y diferencia en segundos | H1, apoyo, CTA primario, acceso a tratamientos | imagen cargando/error; CTA disponible sin JS | Oferta y acción legibles a 320 px |
| Confianza | Resumir hechos verificables | Máximo 3 afirmaciones confirmadas | sin carrusel automático | Cero certificaciones o cifras inventadas |
| Selector | Reducir el inventario por objetivo/zona | Opciones canónicas de `docs/02...` | sin selección, seleccionado, sin coincidencias | Todos los tratamientos siguen accesibles |
| Catálogo | Permitir comparar y actuar | 10 corporales del inventario oficial | completo, filtrado, detalle seleccionado | Nombre, técnica, duración, precios MXN, CTA |
| Detalle | Explicar antes de pedir cita | 10 corporales + 1 facial | seleccionado por hash; todos visibles sin JS | Qué es, duración disponible, inclusión, tecnologías, beneficios, precios y WhatsApp |
| Galerías | Apoyar la lectura de tratamientos corporales y faciales | 2 imágenes corporales + 2 faciales | carga diferida | Etiquetas de categoría y técnica; transparencia documentada internamente |
| Facial | Dar jerarquía al servicio facial existente | Juventud Radiante y datos suministrados | contenido validado/pendiente | No publicar beneficios no aprobados |
| Filosofía | Explicar el equilibrio de marca | Tecnología estética + cuidado natural | estática | No duplicar el hero |
| Tecnología | Aclarar técnicas sin tono médico | Lista suministrada; explicación validada | disponible/oculta por contenido | Ocultar descripciones pendientes |
| Protocolo | Mostrar orden y acompañamiento | Cuatro pasos documentados | estática | No fingir expediente o evaluación clínica |
| Resultados | Aportar evidencia real | Casos autorizados y metadatos | ausente, disponible | No renderizar placeholder público |
| Testimonios | Aportar prueba social real | Testimonios autorizados | ausente, disponible | No renderizar texto sintético |
| FAQ | Resolver dudas aprobadas | Preguntas y respuestas validadas | cerrado, abierto | Botones reales y `aria-expanded` |
| Reservación | Construir el mensaje de consulta | Campos de `docs/02...` | vacío, inválido, válido, redirección | No afirmar cita confirmada ni guardar datos |
| Contacto | Facilitar visita/contacto | Dirección, horarios, teléfono y mapa confirmados | parcial/oculto | Ningún dato de ejemplo visible |
| Footer | Cerrar navegación y obligaciones | Marca, enlaces, redes y legal aprobado | estático | Enlaces vacíos u opciones TBD no se muestran |

## Componentes y responsabilidades

```text
PageShell
├─ SiteHeader
│  ├─ BrandLink
│  ├─ PrimaryNavigation
│  └─ MobileNavigationDialog
├─ MainContent
│  ├─ HeroSection
│  ├─ TrustStrip
│  ├─ GoalSelector
│  ├─ TreatmentCatalog
│  │  ├─ TreatmentFilterSummary
│  │  └─ TreatmentEntry × 10
│  ├─ FacialFeature
│  ├─ PhilosophySection
│  ├─ TechnologySection
│  ├─ ProtocolSteps
│  ├─ ResultsSection?
│  ├─ TestimonialsSection?
│  ├─ FaqAccordion
│  ├─ BookingSection
│  │  └─ WhatsAppForm
│  └─ ContactSection
├─ SiteFooter
└─ MobileWhatsAppAction?
```

### Límites de responsabilidad

- `GoalSelector` solo actualiza el filtro y su anuncio accesible; no modifica el inventario.
- `TreatmentCatalog` renderiza desde una única fuente de datos y conserva el orden editorial.
- `TreatmentEntry` presenta contenido y emite la intención de consulta; no construye URLs.
- `WhatsAppForm` valida campos locales y entrega un objeto de intención.
- Un único módulo `whatsapp.js` compone y codifica `wa.me`; no recibe ni persiste datos sensibles.
- Menú y FAQ usan controles nativos primero; el módulo JS solo gestiona comportamiento adicional.
- Las secciones condicionales no dejan títulos, huecos ni enlaces cuando no tienen contenido autorizado.

## Modelo de contenido y datos

El inventario, relaciones del selector, textos, duraciones y precios canónicos viven en la sección 6 de `docs/02-especificacion-diseno-web-naturelle-spa.md`. La implementación los transcribe una sola vez a `src/data/treatments.js`.

```js
{
  slug,
  type,              // "body" | "facial"
  category,
  goals: [],
  zones: [],
  name,
  technicalName,
  description,
  duration,
  individualPrice,
  packages: [{ sessions, price }],
  image: null,
  benefits: [],
  disclaimer,
  publicationStatus // "approved" | "needs-review"
}
```

### Reglas no delegables al implementador

1. `zones` usa exactamente: `Rostro`, `Abdomen`, `Brazos`, `Piernas`, `Silueta completa`, `Firmeza y textura`.
2. No se infieren relaciones por coincidencias de texto; se copian las relaciones de `docs/02...`.
3. Importes y paquetes se conservan como datos suministrados; moneda confirmada: MXN.
4. `Cuerpo Esculpido` conserva precio individual no proporcionado y publica únicamente su paquete de 4 sesiones.
5. `Juventud Radiante` conserva duración no proporcionada; los beneficios suministrados están autorizados y la frecuencia se determina según valoración.
6. Los datos no aprobados no se reemplazan con ejemplos públicos. En desarrollo pueden mostrarse únicamente como anotación interna fuera de la interfaz final.
7. El mensaje de WhatsApp usa el nombre comercial exacto y `encodeURIComponent`.

## Estados e interacción

| Componente | Estados mínimos | Respuesta esperada |
|---|---|---|
| Navegación | reposo, header compacto, menú abierto/cerrado | Sin cambio de layout; foco gestionado |
| Selector | sin filtro, foco, seleccionado, sin coincidencias | Selección evidente sin depender del color; anuncio en región `aria-live` |
| Tratamiento | resumen, detalle abierto/cerrado, filtrado | El control expone `aria-expanded`; el contenido esencial existe en HTML |
| FAQ | cerrado, abierto, foco | Una respuesta asociada por `aria-controls`; teclado nativo |
| Formulario | inicial, campo inválido, válido, envío a WhatsApp | Error junto al campo, resumen opcional, foco en primer error |
| Imagen | reservada, cargando, cargada, error | Dimensiones evitan CLS; fallback no inventa evidencia |
| Contenido condicional | no autorizado, autorizado | Ausencia completa o sección completa; nunca placeholder público |

### Mensajes de WhatsApp

Usar literalmente las plantillas de `docs/02...`. Abrir WhatsApp es una salida del sitio, no una confirmación de reservación. El número nacional autorizado es `6692384867`; `src/data/site.js` aplica `+52` como supuesto editable de México. La atención es exclusivamente con cita previa vía WhatsApp.

## Sistema visual

### Dirección

**Editorial botánico contemporáneo:** tipografía serif para momentos de marca, sans serif para decisión e información, oliva profundo para acciones, marfil como campo principal y curvas del isotipo como gramática de recorte y separación. La expresión debe sentirse premium y serena, no clínica, rústica ni genérica.

### Estrategia cromática

Estrategia **restringida**: neutrales cálidos con oliva profundo como única acción dominante. El oliva claro funciona como identidad y superficie, no como texto pequeño sin contraste verificado.

```css
:root {
  --color-brand: #a3a17c;
  --color-brand-strong: #5e6248;
  --color-bg: #f7f5ef;
  --color-bg-alt: #e3ddcf;
  --color-surface: #ffffff;
  --color-text: #282a24;
  --color-text-muted: #6f7168;
  --color-sage: #c5c8ae;
  --color-border: rgba(94, 98, 72, 0.18);

  --font-heading: "Cormorant Garamond", Georgia, serif;
  --font-body: "Manrope", Arial, sans-serif;

  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2rem;
  --space-5: 3rem;
  --space-6: 4.5rem;
  --space-7: 7rem;

  --container-copy: 42rem;
  --container-content: 72rem;
  --container-wide: 80rem;
  --gutter: clamp(1rem, 4vw, 3rem);
  --section-space: clamp(4.5rem, 10vw, 9rem);

  --radius-sm: 0;
  --radius-md: 0.75rem;
  --radius-lg: 1.5rem;
  --border-hairline: 1px;

  --motion-fast: 180ms;
  --motion-normal: 320ms;
  --motion-slow: 650ms;
  --ease-naturelle: cubic-bezier(0.22, 1, 0.36, 1);
}
```

Los colores son valores digitales de trabajo hasta contrastarlos con el archivo maestro del logo. Antes de producción se verifican combinaciones reales contra WCAG 2.2 AA.

### Tipografía y composición

- H1: `clamp(2.75rem, 7vw, 5.75rem)`; una sola idea, máximo aproximado de 10–12 palabras.
- H2: `clamp(2.15rem, 5vw, 4rem)`; apertura clara de sección.
- Cuerpo: mínimo `1rem`, ancho legible máximo `65–75ch`.
- Etiquetas: mínimo `0.75rem`; no usar mayúsculas sostenidas en párrafos.
- El hero combina bloque editorial y medio orgánico; no debe parecer una tarjeta grande.
- El catálogo alterna índice, regla, contenido y medio; no repite 10 contenedores flotantes idénticos.
- La asimetría nunca altera el orden lógico del DOM ni hace depender la lectura de posiciones absolutas.
- Sombras solo para elevación funcional; divisores y campos de color llevan el ritmo principal.

### Movimiento

Permitido: revelado breve, línea dibujada, cambio de color, máscara o escala máxima `1.03`. Prohibido: scroll bloqueado, cursor personalizado, parallax excesivo, texto rotatorio, rebotes, animación constante o contenido que aparece tarde. Con `prefers-reduced-motion: reduce`, las transiciones no esenciales se eliminan.

## Estrategia de imágenes y activos existentes

### Auditoría de `imagenes/`

| Activo | Evidencia verificable | Decisión de uso |
|---|---|---|
| `imagenes/logo.jpg` | Logotipo oficial exacto confirmado por el usuario | Preservar sin redibujar ni sustituir; usar los derivados oficiales entregados |
| `public/images/brand/naturelle-spa-logo-official.png` | Lockup oficial con fondo tratado | Navegación, hero y footer |
| `public/images/brand/naturelle-spa-mark.png` y `public/favicon.png` | Símbolo y favicon derivados entregados | Menú móvil y favicon |
| `public/images/generated/gallery/body/*` | Dos escenas generadas de apoyo corporal | Publicar como apoyo visual; mantener la transparencia en documentación interna, sin caption visible obligatorio |
| `public/images/generated/gallery/facial/*` | Dos escenas generadas de apoyo facial | Publicar como apoyo visual; mantener la transparencia en documentación interna, sin caption visible obligatorio |

### Reglas de producción

- Hero y contenido editorial priorizan fotografía propia del espacio, aparatología, manos, textiles y detalles con autorización.
- Las imágenes corporales existentes no sirven como hero ni decoración genérica.
- Antes/después, testimonios, instalaciones, personal y certificaciones no se generan ni se simulan.
- Texturas abstractas, patrones, iconos e ilustración corporal sí pueden producirse si no aparentan evidencia real.
- Cada asset público requiere propietario, consentimiento/licencia, propósito, texto alternativo o `alt=""`, dimensiones y variantes AVIF/WebP.
- Presupuesto del hero/LCP: ideal ≤250 KB; dimensiones reservadas y `fetchpriority="high"` solo para el recurso LCP.
- Fuera del primer viewport: `loading="lazy"`, `decoding="async"`, `srcset` y `sizes` coherentes.

### Convención futura de nombres

```text
brand-logo-horizontal.svg
brand-logo-mark.svg
hero-treatment-space-1280.avif
philosophy-hands-treatment-960.webp
technology-radiofrequency-640.webp
result-<case-id>-before-960.webp
result-<case-id>-after-960.webp
```

Los nombres de resultados solo se usan después de aprobar el caso y su documentación.

## Responsive

Los breakpoints son consecuencias del contenido, no dispositivos objetivo rígidos.

| Rango de prueba | Comportamiento esperado |
|---|---|
| 320–479 px | Una columna; navegación modal; CTA de ancho útil; tablas convertidas en listas legibles; sin scroll horizontal |
| 480–767 px | Una columna amplia; selector con wrap; medios 4:5; controles táctiles ≥44 × 44 px |
| 768–1023 px | Alternancia de dos columnas cuando el contenido lo permite; catálogo conserva lectura lineal |
| 1024–1279 px | Hero y secciones editoriales en composición asimétrica; navegación completa |
| ≥1280 px | Contenido limitado por `--container-wide`; no expandir párrafos ni imágenes sin propósito |

- Verificar 320, 375, 768, 1024, 1280 y 1440 px.
- A 200% de zoom, contenido y controles permanecen accesibles sin superposición.
- Hover es mejora; toda acción funciona con tacto y teclado.
- Ningún CTA flotante cubre el último elemento enfocable, banners legales o controles del navegador móvil.

## Accesibilidad

Objetivo: WCAG 2.2 AA.

- Landmarks correctos; un solo H1 y jerarquía sin saltos arbitrarios.
- Enlace “Saltar al contenido” visible al foco.
- Foco contrastante y consistente en todos los controles.
- Nombre, rol y estado accesibles para menú, selector, detalles y FAQ.
- Errores de formulario descritos en texto; color nunca es la única señal.
- Áreas táctiles de al menos 44 × 44 px cuando sea viable.
- Texto alternativo describe propósito, no apariencia; imágenes decorativas usan `alt=""`.
- No usar información sensible en `alt`, nombres de archivo, analítica o parámetros de URL.
- Probar teclado, lector de pantalla, zoom 200%, alto contraste y movimiento reducido.

## SEO, privacidad y rendimiento

### SEO

- Un H1 y títulos/descripciones únicos con datos reales.
- `canonical`, Open Graph, Twitter Cards, `robots.txt` y `sitemap.xml` solo cuando dominio y URL estén confirmados.
- JSON-LD `HealthAndBeautyBusiness` incluye solo nombre, teléfono asumido `+52`, mapa y redes confirmadas; dirección textual y horarios siguen ausentes.
- `sameAs` puede usar las dos redes confirmadas.
- `FAQPage` solo refleja preguntas y respuestas visibles.
- No crear páginas locales, reseñas, ratings ni disponibilidad ficticios.

### Privacidad

- La fase 1 no envía formularios a un servidor: construye un mensaje local y abre WhatsApp.
- No solicitar información de salud, fotografías, diagnósticos ni datos sensibles.
- Analítica solo después de elegir herramienta, base/consentimiento y política; no enviar nombres, teléfonos ni texto del mensaje.
- No incluir el comprobante de pago de `imagenes/` en builds, repositorios públicos ni metadatos.

### Presupuestos

| Métrica | Objetivo |
|---|---:|
| LCP p75 | ≤2.5 s |
| INP p75 | ≤200 ms |
| CLS p75 | ≤0.1 |
| Lighthouse Performance | ≥90 |
| Lighthouse Accessibility | ≥95 |
| Lighthouse SEO | ≥95 |
| JavaScript inicial propio | ≤80 KB comprimido |
| CSS inicial propio | ≤60 KB comprimido |
| Imagen LCP | ideal ≤250 KB |

Cargar fuentes con `font-display: swap`, preferir pesos estrictamente usados y evitar dependencias de animación/carrusel. GSAP, Swiper o librerías equivalentes requieren una necesidad concreta y medición; no forman parte del stack inicial.

## Arquitectura técnica propuesta

### Stack asumido

- Node.js LTS y npm para tooling.
- Vite vanilla como servidor de desarrollo y build estático.
- HTML semántico en `index.html`.
- CSS nativo por capas y tokens; sin Tailwind ni CSS-in-JS.
- JavaScript ES6+ por módulos; sin React/Vue/Svelte.
- Datos locales en módulos JS; sin CMS ni backend en fase 1.
- Pruebas ligeras de unidad para filtros/WhatsApp y pruebas de navegador para flujos críticos cuando se implemente.

### Estructura futura — no crear durante esta fase documental

```text
naturelle-spa/
├─ index.html
├─ package.json
├─ vite.config.js
├─ README.md
├─ public/
│  ├─ favicon.svg
│  ├─ robots.txt
│  ├─ sitemap.xml
│  └─ assets/
│     ├─ brand/
│     ├─ images/
│     │  ├─ hero/
│     │  ├─ treatments/
│     │  ├─ technology/
│     │  └─ results/
│     └─ icons/
├─ src/
│  ├─ styles/
│  │  ├─ tokens.css
│  │  ├─ reset.css
│  │  ├─ base.css
│  │  ├─ layout.css
│  │  ├─ components.css
│  │  ├─ sections.css
│  │  └─ utilities.css
│  ├─ scripts/
│  │  ├─ main.js
│  │  ├─ navigation.js
│  │  ├─ goal-selector.js
│  │  ├─ disclosure.js
│  │  ├─ whatsapp.js
│  │  └─ analytics.js
│  ├─ data/
│  │  ├─ treatments.js
│  │  ├─ faq.js
│  │  └─ site.js
│  └─ assets/
│     └─ generated/
├─ tests/
│  ├─ unit/
│  └─ e2e/
└─ docs/
   ├─ 01-identidad-digital-naturelle-spa.md
   ├─ 02-especificacion-diseno-web-naturelle-spa.md
   ├─ 03-design.md
   └─ 04-next-tasks.md
```

`analytics.js` puede existir como adaptador vacío durante desarrollo; no debe cargar terceros sin decisión y consentimiento. `public/assets/results/` permanece vacío mientras no haya casos autorizados.

## Criterios de aceptación para iniciar y cerrar implementación

### Base funcional

- [ ] El contenido esencial y los 11 tratamientos son descubribles sin JavaScript.
- [ ] Selector, catálogo y WhatsApp consumen una única fuente de datos.
- [ ] El mensaje contextual contiene el nombre exacto y no confirma una cita.
- [ ] Secciones sin contenido autorizado no dejan huecos ni enlaces.
- [ ] No hay datos operativos inventados ni valores **TBD** expuestos como reales.

### Experiencia y marca

- [ ] El primer viewport explica oferta, diferencia y acción.
- [ ] El catálogo evita una cuadrícula repetitiva de tarjetas.
- [ ] La identidad se reconoce por composición, tipografía, oliva y forma, no solo por el logo.
- [ ] Solo un CTA domina visualmente cada viewport.
- [ ] Movimiento, densidad y variación respetan `4/10`, `3/10` y `7/10`.

### Calidad

- [ ] No existe scroll horizontal a 320 px ni superposición a 200% de zoom.
- [ ] Navegación, selector, FAQ y formulario funcionan con teclado y tacto.
- [ ] Foco, contraste, nombres accesibles, errores y reduced motion fueron verificados.
- [ ] No se publican activos sensibles o sin consentimiento.
- [ ] Core Web Vitals y presupuestos se cumplen o existe una excepción documentada.
- [ ] SEO/schema contienen exclusivamente datos visibles y confirmados.

## Decisiones pendientes y bloqueadores de publicación

| Decisión | Responsable | Impacto |
|---|---|---|
| Confirmar que `+52` es el código internacional definitivo | Negocio | No bloquea la versión actual; se corrige en un único token de `site.js` |
| Dirección textual y horarios | Negocio | El mapa oficial ya funciona; bloquea únicamente schema local completo |
| Moneda de precios | Negocio | Bloquea publicación inequívoca de importes |
| Fuente vectorial y variantes de impresión | Negocio/diseño | No bloquea la web; limita producción futura |
| Beneficios, frecuencia facial y lenguaje técnico | Responsable del servicio | Bloquea contenido sensible de tratamientos/tecnología |
| Aviso de privacidad, cancelación, anticipo y uso de imágenes | Negocio/legal | Bloquea formularios, analítica y evidencia pública |
| Consentimiento y metadatos de fotografías corporales existentes | Negocio | Bloquea resultados/antes-después |
| Dominio, hosting y analítica | Negocio/implementación | Bloquea SEO final, medición y despliegue |

## Próximo paso

Validar la experiencia construida con el negocio, confirmar el supuesto internacional `+52` y completar políticas legales. Mantener dirección textual y horarios fuera de la interfaz hasta recibirlos.
