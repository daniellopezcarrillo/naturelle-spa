# Especificación de diseño y desarrollo web — Naturelle Spa

Esta especificación es la **fuente canónica de alcance, inventario de servicios y contenido suministrado** del sitio web de Naturelle Spa. La primera entrega será una **landing page premium, responsiva y orientada a conversión por WhatsApp**, preparada para evolucionar a un sitio multipágina sin rehacer sus fundamentos.

> **Cómo usarla:** aplicar la identidad de [`01-identidad-digital-naturelle-spa.md`](01-identidad-digital-naturelle-spa.md) y las decisiones de implementación de [`03-design.md`](03-design.md). Este documento conserva nombres, técnicas, duraciones, precios, relaciones del selector y textos pendientes de validación; el implementador no debe corregirlos ni completarlos por inferencia.

## 1. Resultado esperado

La web debe permitir que una persona:

1. Comprenda en pocos segundos qué ofrece Naturelle Spa.
2. Encuentre tratamientos según su objetivo o zona de interés.
3. Consulte descripción, duración y precios sin ambigüedad.
4. Conozca el protocolo y límites de los resultados.
5. Inicie una conversación de WhatsApp contextualizada.

### Indicadores de éxito

| Objetivo | Indicador medible |
|---|---|
| Conversión | Clics en CTA de WhatsApp por sesión |
| Descubrimiento | Interacciones con selector y catálogo |
| Confianza | Visitas a protocolo, FAQ, ubicación y resultados autorizados |
| Rendimiento | Core Web Vitals en rango “bueno” y Lighthouse según presupuestos |
| Calidad | Cero enlaces rotos, desbordamientos o bloqueos de navegación |

No se fija una tasa de conversión inicial sin datos de referencia. Debe configurarse analítica con consentimiento aplicable y establecer una línea base tras el lanzamiento.

## 2. Alcance

### Incluido en fase 1

- Landing page semántica de una sola página.
- Header, navegación y menú móvil.
- Hero editorial.
- Bloque de confianza.
- Selector por objetivo/zona.
- Catálogo completo de tratamientos corporales.
- Tratamiento facial destacado.
- Detalle seleccionable para los 10 tratamientos corporales y el facial.
- Galerías ilustrativas separadas para experiencia corporal y facial.
- Tecnología, protocolo, FAQ y reservación.
- Espacios condicionales para resultados y testimonios reales.
- Ubicación/contacto y footer.
- WhatsApp contextual por tratamiento.
- SEO técnico/local básico, datos estructurados y Open Graph.
- Accesibilidad WCAG 2.2 AA como objetivo.
- Optimización de rendimiento y movimiento reducido.

### Fuera de alcance en fase 1

- Pagos o agenda con disponibilidad en tiempo real.
- Inicio de sesión, expedientes o datos clínicos.
- Blog o CMS completo.
- Automatización de WhatsApp posterior al enlace inicial.
- Producción fotográfica y rediseño del logotipo.
- Traducciones completas a francés o inglés.
- Publicación de testimonios/resultados no proporcionados y autorizados.

### Evolución prevista

Fase 2: páginas individuales por servicio, categorías facial/corporal, promociones, contacto y contenido local por ciudad. Las URLs y componentes de fase 1 deben facilitar esa separación.

## 3. Usuarios y recorridos

### Recorrido principal: objetivo conocido

`Landing → Selector por objetivo → Tratamiento → Consultar tratamiento → WhatsApp con mensaje precargado`

### Recorrido secundario: necesita orientación

`Landing → Filosofía/protocolo → Solicitar valoración → WhatsApp con mensaje de valoración`

### Recorrido de confianza

`Landing → Tecnología/FAQ/resultados autorizados → Ubicación → Reservar`

### Reglas de conversión

- Debe existir un CTA primario visible en el hero, header y cierre de página.
- En móvil puede existir un acceso flotante a WhatsApp, sin ocultar contenido ni controles.
- Todo CTA de tratamiento debe incluir el nombre exacto del servicio en el mensaje.
- No abrir conversaciones con texto que afirme una reservación confirmada.
- Evitar múltiples botones visualmente primarios en la misma pantalla.

## 4. Arquitectura de información

```text
Inicio
├── Hero
├── Confianza
├── Selector por objetivo
├── Filosofía Naturelle
├── Tratamientos corporales
├── Juventud Radiante (facial)
├── Tecnología utilizada
├── Protocolo Naturelle
├── Resultados reales [condicional]
├── Testimonios [condicional]
├── Preguntas frecuentes
├── Reservación
├── Ubicación y contacto
└── Footer
```

### Navegación principal

`Tratamientos · Experiencia · Tecnología · Preguntas · Contacto · Reservar`

Los enlaces deben apuntar a identificadores estables, actualizar el foco de forma accesible y respetar `prefers-reduced-motion` al hacer scroll.

## 5. Sistema visual y tokens

Los tokens implementables, la estrategia cromática, la tipografía y el movimiento se centralizan en [`03-design.md`](03-design.md). Este documento conserva únicamente los requisitos de composición para evitar dos fuentes técnicas divergentes.

### Reglas de composición

- Usar asimetría, cambios de ritmo y divisores editoriales; no una sucesión de grids idénticos.
- Mantener una columna de lectura de `60–75ch` para textos largos.
- Usar fotografía e información como protagonistas, no decoraciones 3D.
- Evitar glassmorphism, blobs repetitivos y fondos degradados sin relación con la marca.

## 6. Especificación por sección

### 6.1 Header

**Contenido:** logo horizontal o isotipo, navegación, CTA “Reservar”.  
**Escritorio:** sticky; transparente solo si conserva contraste sobre el hero; al desplazarse adopta fondo marfil sólido o translúcido legible.  
**Móvil:** botón de menú con nombre accesible; panel de pantalla completa con navegación, WhatsApp, horario y redes, dejando los valores **TBD** ocultos hasta confirmación.  
**Comportamiento:** cerrar con Escape, clic exterior, selección de enlace o botón de cierre; gestionar foco y restaurarlo al disparador.

### 6.2 Hero editorial

**Etiqueta:** `Naturelle Spa · Tratamientos faciales y corporales`  
**H1:** `Tu belleza no necesita transformarse. Necesita ser revelada.`  
**Descripción:** `Tratamientos faciales y corporales donde la tecnología estética se une con el cuidado natural.`  
**CTA primario:** `Solicitar valoración`  
**CTA secundario:** `Explorar tratamientos`

Diseño dividido y asimétrico: texto + fotografía real con máscara orgánica derivada del isotipo. La imagen debe reservar dimensiones para evitar saltos de layout. Animación máxima: título revelado, imagen con fade/escala sutil y una línea orgánica; el contenido debe estar visible aunque JavaScript falle.

### 6.3 Bloque de confianza

Cuatro mensajes breves:

1. Tecnología estética.
2. Atención personalizada.
3. Protocolos por objetivo.
4. Reservación directa.

No declarar certificaciones, años de experiencia o garantías sin evidencia.

### 6.4 Selector por objetivo

**Pregunta:** `¿Qué deseas trabajar?`  
**Opciones iniciales:** Rostro, Abdomen, Brazos, Piernas, Silueta completa, Firmeza y textura.

| Opción | Tratamientos relacionados |
|---|---|
| Rostro | Juventud Radiante |
| Abdomen | Cintura de Ensueño; Cuerpo Esculpido; Silueta Luminosa; Figura en Equilibrio; Renueva tu Silueta |
| Brazos | Brazos de Seda; Reafirma tu Belleza |
| Piernas | Piernas Sin Imperfecciones; Curvas Definidas |
| Silueta completa | Esculpe y Reafirma; Renueva tu Silueta; Silueta Luminosa |
| Firmeza y textura | Reafirma tu Belleza; Brazos de Seda; Piernas Sin Imperfecciones; Esculpe y Reafirma |

> Las relaciones son una organización de UX derivada de las descripciones y deben validarse con Naturelle Spa antes de publicar.

**Implementación:** tabs o grupo de botones accesibles; estado seleccionado visible sin depender del color; actualización anunciada a lectores de pantalla; todos los tratamientos siguen disponibles sin JavaScript.

### 6.5 Filosofía Naturelle

**Título:** `Tecnología y naturaleza en equilibrio`  
Dos ejes: tecnología (aparatología, precisión y protocolos) y naturaleza (cuidado, armonía y seguimiento). Incluir fotografía real del espacio/equipo cuando esté disponible. Evitar lenguaje clínico si no corresponde.

### 6.6 Catálogo de tratamientos corporales

Organizar los 10 tratamientos corporales por objetivos: Moldear, Reafirmar, Reducir, Mejorar textura y Combinados. No usar tarjetas visualmente idénticas; el tratamiento facial se presenta por separado en la sección 6.7. El patrón editorial debe contener número, categoría, nombre comercial, nombre técnico, descripción, duración, precios, imagen opcional y CTA contextual.

Seleccionar `Ver tratamiento` lleva a un detalle generado desde la misma fuente de datos. El detalle incluye qué es, duración disponible, qué incluye, tecnología/materiales mencionados, beneficios suministrados, precios en MXN y CTA de cita por WhatsApp. Cuando la fuente no proporciona un valor —precio individual de Cuerpo Esculpido o duración de Juventud Radiante— la interfaz lo aclara sin inventarlo.

#### Inventario oficial de tratamientos

| Nombre comercial | Tratamiento | Descripción | Duración | Precio individual | Paquetes |
|---|---|---|---|---:|---|
| Reafirma tu Belleza | Radiofrecuencia Antiflacidez | Estimula colágeno y elastina para una piel más firme, tersa y luminosa. | 40 min | $350 | 8 sesiones $2,300; 10 sesiones $2,750 |
| Cintura de Ensueño | Cavitación 40K | Reducción de grasa localizada y definición de la silueta de forma progresiva. | 30 min | $400 | 8 sesiones $2,800 |
| Curvas Definidas | Vacuunterapia Moldeadora | Moldea el contorno corporal y mejora la textura de la piel. | 25–30 min | $300 | 8 sesiones $2,160 |
| Esculpe y Reafirma | Reductivo + Reafirmante | Tratamiento integral para reducir medidas y mejorar firmeza. | 60 min | $700 | 8 sesiones $4,000; 10 sesiones $4,800 |
| Brazos de Seda | Reafirmante de Brazos | Mejora la tonicidad y suavidad de la piel. | 40 min | $300 | 8 sesiones $2,080 |
| Piernas Sin Imperfecciones | Anticelulitis Intensivo | Ayuda a reducir celulitis y mejorar la circulación. | 60 min | $480 | 8 sesiones $3,200 |
| Figura en Equilibrio | Reductivo con Infrarrojos | Activa el metabolismo y mejora el tono corporal. | 45–50 min | $389 | 10 sesiones $3,400 |
| Renueva tu Silueta | Reductivo–Reafirmante con Infrarrojos | Transforma tu figura y revitaliza la piel. | 60 min | $600 | 6 sesiones $3,000; 8 sesiones $4,000; 10 sesiones $5,000 |
| Cuerpo Esculpido | Maderoterapia (Abdomen) | Moldeado natural y activación de la circulación. | 45–60 min | **TBD: no proporcionado** | 4 sesiones $1,450 |
| Silueta Luminosa | Lipoláser + Vacuunterapia | Tecnología que combina la acción del lipoláser para ayudar a reducir grasa localizada con la vacuunterapia moldeadora, favoreciendo el drenaje, la definición de la silueta y una piel más firme. | 45–50 min | $500 | 6 sesiones $2,520; 8 sesiones $3,200; 10 sesiones $3,900 |

**Reglas de contenido:**

- Conservar nombres, duraciones y precios hasta recibir cambios del negocio.
- Moneda confirmada por el usuario: MXN.
- Revisar con la persona responsable frases como “activa el metabolismo”, “reduce celulitis” y “transforma tu figura” para asegurar precisión y cumplimiento.
- Las promociones temporales no deben mezclarse con el precio base sin fecha de vigencia.

### 6.7 Tratamiento facial destacado

**Nombre:** Juventud Radiante  
**Tratamiento:** Radiofrecuencia Facial + Martillo Frío

**Descripción base:** rejuvenece la piel y busca una apariencia más firme, luminosa y saludable. El tratamiento estimula la producción natural de colágeno y se presenta como un efecto lifting sin cirugía; estas afirmaciones deben validarse profesionalmente antes de publicar.

**Beneficios suministrados:**

- Reafirma y tonifica la piel.
- Reduce líneas de expresión y arrugas.
- Estimula colágeno y elastina.
- Disminuye la flacidez facial.
- Cierra poros y mejora la textura.
- Desinflama y aporta luminosidad.
- Deja la piel más joven y saludable.

| Presentación | Precio |
|---|---:|
| Sesión individual | $400 |
| 6 sesiones | $2,100 |
| 10 sesiones | $3,300 |

**Duración:** **TBD: no proporcionada**.  
**Frecuencia suministrada originalmente:** cada 2 días. Antes de publicar, debe sustituirse o confirmarse tras valoración profesional; en la interfaz usar: `La frecuencia y el número de sesiones se determinan según valoración y necesidades de cada persona.`

### 6.8 Tecnología utilizada

Tecnologías: Radiofrecuencia, Cavitación 40K, Vacuunterapia, Lipoláser, Infrarrojos, Maderoterapia y Martillo frío.

Cada entrada debe incluir nombre, explicación breve, aplicación, tratamientos relacionados e imagen/ilustración autorizada. No presentar aparatología como médica ni realizar afirmaciones fisiológicas no verificadas. El contenido técnico final está **TBD** y requiere validación del negocio.

### 6.9 Protocolo Naturelle

1. **Valoración:** identificar objetivo, expectativas y condiciones relevantes.
2. **Selección:** recomendar un protocolo apropiado.
3. **Sesiones:** aplicar el tratamiento y registrar seguimiento.
4. **Evolución:** revisar avances y ajustar cuando corresponda.

La sección comunica orden y acompañamiento; no debe fingir evaluaciones clínicas o expedientes que el negocio no realice.

### 6.10 Resultados reales

Ocultar la sección hasta recibir material auténtico. Cada caso publicado requiere:

- Consentimiento verificable y alcance de uso.
- Fotografías comparables, sin edición engañosa.
- Tratamiento y número de sesiones.
- Fecha o periodo cuando sea pertinente.
- Aviso: `Los resultados pueden variar según las características de cada persona, hábitos, constancia y protocolo aplicado.`

### 6.11 Testimonios

Ocultar hasta recibir testimonios reales. Campos: nombre o iniciales autorizadas, tratamiento, opinión, fecha opcional y foto opcional. Nunca generar testimonios con IA ni usar texto de relleno presentado como real.

### 6.12 Preguntas frecuentes

Preguntas candidatas, cuyas respuestas son **TBD** y deben confirmarse:

- ¿Necesito valoración?
- ¿Cuántas sesiones necesito?
- ¿Los tratamientos son dolorosos?
- ¿Puedo combinar tratamientos?
- ¿Qué debo hacer antes y después de una sesión?
- ¿Qué contraindicaciones debo considerar?
- ¿Cómo puedo reservar?
- ¿Qué métodos de pago manejan?
- ¿Puedo cancelar o cambiar mi cita?

El acordeón debe usar botones reales, `aria-expanded`, relación con el panel y funcionamiento por teclado. Solo publicar `FAQPage` schema si las preguntas y respuestas aparecen visibles en la página.

### 6.13 Reservación

Primera versión: no recopilar datos en servidor. Usar un formulario breve que construya un mensaje y abra WhatsApp.

| Campo | Requerido | Regla |
|---|---:|---|
| Nombre | Sí | 2–80 caracteres |
| Teléfono | No | Solo si se habilita un canal adicional |
| Tratamiento de interés | Sí | Lista controlada + “Necesito orientación” |
| Día preferido | No | No implica disponibilidad |
| Horario preferido | No | No implica confirmación |
| Mensaje | No | Máximo razonable; no solicitar datos sensibles |

Mensaje por tratamiento:

```text
Hola, vi el tratamiento “[nombre del tratamiento]” en la página de Naturelle Spa y me gustaría consultar disponibilidad.
```

Mensaje de valoración:

```text
Hola, visité la página de Naturelle Spa y me gustaría solicitar una valoración para conocer el tratamiento más adecuado para mi objetivo.
```

El número nacional autorizado es `6692384867`. La implementación usa `+52` como supuesto editable de México y centraliza `countryCallingCode` en `src/data/site.js`; debe corregirse allí si el negocio confirma otro país. Escapar el mensaje con `encodeURIComponent`. Informar que enviar el mensaje no confirma la cita. La atención es exclusivamente con cita previa vía WhatsApp.

### 6.14 Ubicación y contacto

Ubicación oficial: [Google Maps](https://maps.app.goo.gl/HW6WUkGzCBzJ92oT6). Teléfono autorizado: `6692384867`. Atención exclusivamente con cita previa vía WhatsApp. Redes confirmadas: [Facebook](https://www.facebook.com/profile.php?id=61554747702834) e [Instagram](https://www.instagram.com/_naturellespa_/). La dirección textual y horarios no fueron proporcionados y permanecen ocultos; el enlace de mapa es la fuente operativa preferida.

### 6.15 Footer

Logo, frase de marca, enlaces principales, servicios destacados, horario, contacto, redes, aviso de privacidad y derechos reservados. No mostrar enlaces legales vacíos; el aviso de privacidad es **TBD**.

## 7. Componentes y estados

| Componente | Estados mínimos |
|---|---|
| Botón/enlace | default, hover, focus-visible, active, disabled |
| Navegación | actual, abierta/cerrada, scroll |
| Selector | default, selected, focus-visible |
| Tratamiento | default, expandido, filtrado |
| Acordeón FAQ | cerrado, abierto, focus-visible |
| Formulario | vacío, válido, inválido, listo para WhatsApp |
| Imagen | cargando, cargada, error con alternativa |

Todos los controles táctiles deben medir al menos `44 × 44px`. El foco nunca debe eliminarse sin reemplazo visible.

## 8. Diseño responsivo

Construir mobile-first con puntos de quiebre definidos por contenido, usando como referencias:

| Rango | Comportamiento |
|---|---|
| `< 480px` | Una columna, CTA ancho, selector desplazable o apilado, sin hover dependiente |
| `480–767px` | Una columna amplia; metadatos en pares cuando haya espacio |
| `768–1023px` | Dos columnas selectivas; navegación móvil o compacta según ajuste real |
| `1024–1279px` | Hero y secciones editoriales en dos columnas |
| `≥ 1280px` | Contenedor máximo, márgenes amplios y ritmo asimétrico |

Requisitos:

- Sin desbordamiento horizontal a `320px` de ancho.
- No ocultar contenido esencial en móvil.
- No depender de cursor o hover.
- Evitar reordenar visualmente contenido de forma distinta al DOM.
- Probar zoom de texto al 200% y orientación horizontal.

## 9. Movimiento

Permitido: fade, máscara, desplazamiento máximo `30px`, línea dibujada, cambio de color/escala hasta `1.03`. Duraciones entre `180ms` y `650ms`. Prohibidos: rebotes, glitch, partículas, scroll hijacking, animación continua, parallax excesivo y objetos 3D sin función.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

JavaScript debe usar `IntersectionObserver` para revelados y no registrar listeners de scroll de alta frecuencia sin necesidad.

## 10. Accesibilidad

Objetivo: WCAG 2.2 AA.

- HTML semántico: `header`, `nav`, `main`, `section`, `article`, `footer`.
- Un solo H1; jerarquía sin saltos arbitrarios.
- Enlace “Saltar al contenido”.
- Contraste AA validado en estados normal, hover, focus y disabled.
- Texto alternativo contextual; imágenes decorativas con `alt=""`.
- Formularios con `label`, instrucciones y errores asociados.
- Menú, selector, acordeones y diálogos operables por teclado.
- Foco visible y orden lógico.
- Regiones dinámicas anunciadas cuando cambie el catálogo.
- Objetivos táctiles de `44 × 44px`.
- Sin autoplay de audio o video.
- Soporte completo de movimiento reducido.
- Pruebas con teclado, lector de pantalla y zoom 200%.

## 11. SEO local y metadatos

### Metadatos iniciales

**Title:** `Naturelle Spa | Tratamientos Faciales y Corporales en [Ciudad]`  
**Description:** `Descubre tratamientos faciales y corporales en Naturelle Spa: radiofrecuencia, cavitación 40K, vacuunterapia, lipoláser, maderoterapia y protocolos personalizados en [Ciudad].`

`[Ciudad]` es **TBD**. No publicar el placeholder.

### Contenido y rastreo

- URL canónica y dominio final: **TBD**.
- `robots.txt` y `sitemap.xml` coherentes con el entorno de producción.
- Enlaces reales mediante `<a href>`; no navegación exclusivamente JavaScript.
- Open Graph/Twitter Card con imagen propia de `1200 × 630px`.
- Encabezados por intención; descripciones únicas.
- Imágenes con nombres descriptivos, `alt`, dimensiones y formatos modernos.
- Para fase 2, URLs legibles por tratamiento y ubicación sin contenido duplicado.

### Datos estructurados

Implementar JSON-LD con el tipo más específico válido según el negocio real, por ejemplo `HealthAndBeautyBusiness`/`LocalBusiness`, solo con datos confirmados:

- `name`, `url`, `telephone`, `image`, `logo`.
- `address`, `geo`, `openingHoursSpecification` cuando existan.
- `sameAs` con redes oficiales.
- Catálogo de servicios mediante `hasOfferCatalog` o `Service` cuando corresponda.
- `FAQPage` únicamente con contenido visible.
- `BreadcrumbList` solo en fase multipágina.

No incluir ratings, precios agregados, certificaciones o datos inventados.

## 12. Rendimiento y presupuestos

### Objetivos

| Métrica | Objetivo de campo en p75 |
|---|---:|
| LCP | ≤ 2.5 s |
| INP | ≤ 200 ms |
| CLS | ≤ 0.1 |

| Lighthouse móvil (entorno acordado) | Objetivo |
|---|---:|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | ≥ 95 |

### Presupuesto inicial

- HTML + CSS + JS propios comprimidos: idealmente ≤ `200 KB` transferidos.
- JavaScript inicial propio: ≤ `80 KB` comprimidos.
- Imagen LCP: ≤ `250 KB`, con variantes responsivas.
- Peso total inicial sin mapa: objetivo ≤ `1.5 MB`.
- Máximo dos familias tipográficas y solo pesos usados; preferir self-hosting y subset.
- Cero librerías de animación o carrusel salvo justificación medible.

### Implementación

- AVIF/WebP con `srcset`, `sizes`, ancho y alto.
- `loading="lazy"` fuera del primer viewport; no aplicar lazy a la imagen LCP.
- Preload selectivo de recurso LCP y fuentes críticas.
- CSS crítico pequeño; JS con `defer` o módulos.
- Mapa, analítica y terceros diferidos/consentidos.
- Sin video automático pesado ni dependencias para interacciones triviales.

## 13. Tecnología y estructura sugerida

La decisión canónica es una entrega estática con Vite, HTML5 semántico, CSS nativo y JavaScript ES6+ por módulos, sin framework de UI ni SPA. La estructura completa y los límites de cada módulo están en [`03-design.md`](03-design.md).

Los datos de tratamientos deben mantenerse en una única fuente estructurada para evitar inconsistencias entre selector, catálogo y WhatsApp. Esta sección 6 sigue siendo la fuente editorial desde la cual se transcriben.

## 14. Privacidad, seguridad y cumplimiento

- No recopilar datos sensibles ni información de salud en el formulario inicial.
- Si se añade backend, usar HTTPS, validación de servidor, protección antiabuso, retención definida y consentimiento.
- No cargar rastreadores no esenciales antes del consentimiento cuando aplique.
- Mantener aviso de privacidad accesible; contenido legal **TBD**.
- Escapar y codificar entradas antes de crear URLs.
- Abrir enlaces externos con medidas seguras cuando se use nueva pestaña.
- Validar afirmaciones, contraindicaciones y terminología con la persona responsable y normativa local.

## 15. Analítica recomendada

Eventos mínimos, sin almacenar el contenido del mensaje:

- `cta_whatsapp_click` con ubicación y tratamiento.
- `treatment_filter_select`.
- `treatment_view`.
- `valuation_cta_click`.
- `directions_click`.
- `faq_open`.

La herramienta, identificadores, consentimiento y política de retención son **TBD**. No enviar nombre, teléfono ni texto libre a analítica.

## 16. Compatibilidad y pruebas

- Últimas dos versiones estables de Chrome, Edge, Firefox y Safari.
- Safari/iOS y Chrome/Android en dispositivos reales cuando sea posible.
- Anchos: 320, 375, 768, 1024, 1280 y 1440 px.
- Teclado, lector de pantalla, zoom 200%, modo de alto contraste cuando aplique.
- Con JavaScript deshabilitado: información y enlaces esenciales visibles.
- Con red lenta: reserva de espacio, placeholders no engañosos y CTA operativo.
- Verificar cada enlace de WhatsApp en móvil y escritorio.

## 17. Criterios de aceptación

### Marca y contenido

- [ ] La experiencia sigue la identidad “editorial botánico contemporáneo”.
- [ ] No parece una plantilla genérica ni utiliza efectos 3D decorativos.
- [ ] Nombres, descripciones, duraciones y precios coinciden con este documento.
- [ ] Ningún dato **TBD** aparece publicado como placeholder.
- [ ] No existen testimonios, resultados o promesas inventadas.
- [x] La moneda MXN, precios y beneficios suministrados fueron autorizados por el usuario.
- [ ] La duración facial no proporcionada y las políticas adicionales permanecen pendientes.

### Funcionalidad

- [ ] Navegación, menú, selector, FAQ y formulario funcionan con teclado y tacto.
- [ ] Cada CTA de tratamiento genera el mensaje de WhatsApp correcto.
- [ ] El envío a WhatsApp no se presenta como cita confirmada.
- [ ] El catálogo permanece accesible sin JavaScript.
- [ ] No existen enlaces rotos ni errores de consola.

### Responsive y accesibilidad

- [ ] No hay scroll horizontal a partir de 320px.
- [ ] El contenido conserva orden lógico y legibilidad en todos los rangos.
- [ ] Contraste, foco, labels, alt y objetivos táctiles cumplen WCAG 2.2 AA.
- [ ] `prefers-reduced-motion` elimina movimiento no esencial.
- [ ] Se completaron pruebas con teclado, zoom y lector de pantalla.

### SEO y rendimiento

- [ ] Title, description, canonical, Open Graph, robots y sitemap usan datos reales.
- [ ] JSON-LD valida y contiene solo información confirmada.
- [ ] LCP, INP y CLS cumplen objetivos en medición disponible.
- [ ] Lighthouse alcanza los objetivos acordados o cada excepción está documentada.
- [ ] Imágenes, fuentes y scripts respetan los presupuestos.

### Operación

- [ ] El negocio puede actualizar precios desde una única fuente.
- [ ] Dirección, horarios, redes, políticas y privacidad fueron proporcionados.
- [ ] Fotografías y casos publicados cuentan con autorización.
- [ ] Existe una persona responsable de revisar contenido y precios.

## 18. Datos pendientes y riesgos

| Pendiente/riesgo | Impacto | Acción requerida |
|---|---|---|
| Fuente vectorial no proporcionada | Limita impresión y escalado futuro | Conservar los raster oficiales exactos; solicitar vector solo para producción adicional |
| Dirección textual y horarios no proporcionados | Limita schema local completo | Usar el enlace oficial de Google Maps y no inventar horarios |
| `+52` asumido para WhatsApp | Puede requerir corrección si cambia el país confirmado | Editar `countryCallingCode` en `src/data/site.js` |
| Afirmaciones sobre beneficios | Riesgo reputacional/legal | Validación profesional y normativa |
| Fotografías propias ausentes | Riesgo de apariencia genérica | Planificar sesión fotográfica |
| Testimonios/resultados no entregados | Menor prueba social | Ocultar secciones hasta contar con evidencia |
| Políticas y privacidad ausentes | Riesgo operativo y legal | Redactar y aprobar documentos |
| Datos técnicos de aparatología | Contenido incompleto | Validar fichas y contraindicaciones |

## 19. Orden recomendado de implementación

1. Resolver datos **TBD** críticos y aprobar identidad.
2. Crear inventario estructurado de tratamientos.
3. Diseñar wireframes mobile-first y flujo de WhatsApp.
4. Producir sistema visual y prototipo de hero, catálogo y selector.
5. Implementar HTML semántico y contenido sin JavaScript.
6. Añadir interacciones progresivas, movimiento y analítica consentida.
7. Ejecutar pruebas de contenido, accesibilidad, responsive, SEO y rendimiento.
8. Validar con Naturelle Spa y publicar solo información confirmada.
