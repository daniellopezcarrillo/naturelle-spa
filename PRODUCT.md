# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Personas adultas interesadas en bienestar y estética facial o corporal (reafirmación, moldeado, reducción de medidas, textura y luminosidad de la piel). La comunicación puede priorizar una sensibilidad femenina sin excluir otros géneros. Llegan desde redes sociales o búsqueda local, mayormente en móvil, para entender qué tratamiento corresponde a su objetivo, cuánto dura, cuánto cuesta, y pedir cita.

## Product Purpose

Landing de una sola página para Naturelle Spa: presentar los 11 tratamientos faciales y corporales con datos claros (técnica, duración, precio en MXN, paquetes) y convertir a una solicitud de valoración o cita por WhatsApp. Éxito = la persona encuentra su tratamiento y abre WhatsApp con un mensaje preparado.

## Positioning

"Où la technologie et la nature s'unissent": tecnología estética (radiofrecuencia, cavitación 40K, vacuunterapia, lipoláser, infrarrojos, maderoterapia, martillo frío) aplicada con cuidado natural, protocolos por objetivo y seguimiento personalizado. Premium sin pretensión, tecnológica sin parecer clínica.

## Operating Context

- Atención exclusivamente con cita previa vía WhatsApp (+52 669 238 4867, supuesto editable de México).
- Ubicación solo vía enlace de Google Maps; no se publica dirección textual ni horarios.
- Redes: Facebook e Instagram (@_naturellespa_).
- El formulario construye un mensaje local de WhatsApp; no guarda datos.

## Capabilities and Constraints

- Sitio estático Vite (HTML/CSS/JS vanilla) generado desde `src/index.template.html` y `src/data/*` por `scripts/generate.mjs`; imágenes optimizadas a WebP/AVIF por `scripts/optimize-images.mjs`; tests en `tests/unit`.
- Funciones a preservar: filtro por objetivo, detalle progresivo de tratamiento, preparar cita, formulario a WhatsApp, FAQ, enlaces de contacto, menú móvil.
- Contenido comercial y copy aprobado se conservan tal cual; el rediseño cambia estructura, orden y presentación (confirmado 2026-11-17).
- Pendientes sin inventar: dirección textual, horarios, políticas de anticipo/cancelación, métodos de pago, aviso de privacidad, fotografías propias.

## Brand Commitments

- Nombre "Naturelle Spa", eslogan en francés con traducción de apoyo.
- Logo oficial exacto: `public/images/brand/naturelle-spa-logo-official.png`, símbolo `naturelle-spa-mark.png`, favicon; no redibujar ni recolorear.
- Paleta (oliva #A3A17C, oliva profundo #5E6248, marfil #F7F5EF, arena #E3DDCF, carbón #282A24, salvia #C5C8AE) y tipografías Cormorant Garamond + Manrope se mantienen (confirmado por el usuario).
- Voz elegante, serena, profesional y cercana; verbos como "ayuda", "favorece"; sin garantías, absolutos, emojis ni urgencia falsa.
- Movimiento: desde 2026-11-17 el usuario reemplazó la regla "movimiento nunca protagonista" — la experiencia de scroll con animación 3D (GSAP ScrollTrigger + CSS 3D) es ahora protagonista; cada card, carrusel y objeto se anima al hacer scroll. Sigue obligatorio `prefers-reduced-motion` y ningún contenido depende de la animación.

## Evidence on Hand

- 11 tratamientos con precios, duración y paquetes en `src/data/treatments.js`; FAQ en `src/data/faq.js`.
- Imágenes ilustrativas generadas y aprobadas: 11 de tratamientos (`public/images/generated/gallery/treatments/`), 3 faciales, 2 corporales, hero botánico.
- No existen testimonios, resultados antes/después autorizados, fotografías reales del espacio ni certificaciones: no fabricarlos.

## Product Principles

1. Claridad comercial primero: técnica, duración y precio legibles sin interacción.
2. Realismo: beneficios potenciales, nunca promesas de resultado.
3. Un solo camino de acción: valoración o cita por WhatsApp.
4. La experiencia visual es memorable, pero el contenido sigue siendo accesible sin ella.

## Accessibility & Inclusion

WCAG 2.2 AA; texto de cuerpo ≥16px en móvil; `prefers-reduced-motion` desactiva el movimiento 3D sin ocultar contenido; navegación por teclado completa en carrusel, filtros y diálogos.
