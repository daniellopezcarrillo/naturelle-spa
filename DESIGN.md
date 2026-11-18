---
name: Naturelle Spa
description: Lino plegado. A length of ivory linen folded over an olive table; every section is a fold that opens with the scroll.
colors:
  olive-table: "#5e6248"
  olive-dark: "#343a2b"
  olive: "#a3a17c"
  sage: "#c5c8ae"
  linen: "#f7f5ef"
  linen-verso: "#efeadf"
  sand: "#e3ddcf"
  charcoal: "#282a24"
  charcoal-muted: "#55584e"
  on-table: "#ecebdf"
  field-paper: "#fbfaf6"
  field-stroke: "#6b6f55"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.5rem, 4.4vw, 4rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.3rem, 4.6vw, 3.9rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(1.5rem, 2.6vw, 2rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.02em"
  item-name:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.05
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  lede:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  data:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1.4
    fontFeature: "tnum"
  label:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 600
    letterSpacing: "0.08em"
rounded:
  hairline: "2px"
  cloth: "4px"
  field: "6px"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 4vw, 3rem)"
  section: "clamp(4rem, 9vw, 8rem)"
  cloth-width: "min(100%, 76rem)"
  panel-x-desktop: "3.5rem"
  panel-x-mobile: "1.4rem"
components:
  button-primary:
    backgroundColor: "{colors.olive-dark}"
    textColor: "{colors.linen}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.6rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.sage}"
    textColor: "{colors.olive-dark}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.olive-dark}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.6rem"
  button-ghost-hover:
    backgroundColor: "{colors.olive-dark}"
    textColor: "{colors.linen}"
  button-light:
    backgroundColor: "{colors.linen}"
    textColor: "{colors.olive-dark}"
    rounded: "{rounded.pill}"
    padding: "0.55rem 1.2rem"
  button-round:
    backgroundColor: "transparent"
    textColor: "{colors.linen}"
    rounded: "{rounded.pill}"
    size: "3rem"
  linen-panel:
    backgroundColor: "{colors.linen}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.cloth}"
    padding: "2.5rem 3.5rem 3rem"
  linen-verso:
    backgroundColor: "{colors.linen-verso}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.cloth}"
  goal-tag:
    backgroundColor: "{colors.linen-verso}"
    textColor: "{colors.charcoal}"
    padding: "1.1rem 1.1rem 1rem"
    height: "9.5rem"
  goal-tag-selected:
    backgroundColor: "{colors.olive-dark}"
    textColor: "{colors.linen}"
  field:
    backgroundColor: "{colors.field-paper}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.field}"
    padding: "0.8rem 1rem"
    height: "3.25rem"
---

# Design System: Naturelle Spa

> This file records the shipped "Lino plegado" world (branch `redesign/lino-plegado`). `docs/03-design.md` describes the superseded previous design and is not authoritative for new work.

## Overview

**Creative North Star: "Lino plegado"**

The page is one long length of ivory linen laid and folded over a deep olive table, like a cabin towel. The olive field is the ground everything sits on; every content block is a linen panel with a fine woven texture, and the panels are hinged to each other at visible creases. Scroll opens the folds in 3D: panels swing down from their top hinge, the treatment ledger rows unfold one by one, the facial "napkin" opens from its centre crease, the protocol pleats like an accordion and the image gallery is a rolled bolt of linen (a 3D cylinder) that turns with scroll, arrows, keys and drag.

The material vocabulary is textile and nothing else: weave texture, dashed stitch lines, fold shadows that fall below a hanging edge, reverse (verso) faces that are a shade darker and shaded from the crease, hanging fabric tags with an eyelet, and woven labels with a dog-eared corner sewn along a seam. Typography is a quiet high-contrast serif (Cormorant Garamond) in charcoal for anything that is a name or a promise, and a clean grotesque (Manrope) for data, prices and instructions. Density is calm on the cloth, generous on the table.

Everything is flat and fully visible by default. Motion is the protagonist when allowed, but it is layered on by JS inside `prefers-reduced-motion: no-preference`; with reduced motion or no JS the cloth lies flat and every word is readable.

**Key Characteristics:**
- Olive table ground (full-bleed) with linen panels capped at the cloth width.
- Fine weave texture on every linen surface; dashed stitch rules instead of solid dividers.
- Folds, not cards: panels join at creases and hinge open on scroll.
- Serif names and promises, sans data; prices always tabular.
- One interaction signature: the dye fill that floods a pill or tag from the pointer's entry point.

## Colors

A restrained, warm olive-and-linen palette from the brand book; colour comes from the materials (table, cloth, dye), never from added accents.

### Primary
- **Olive Table** (olive-table): the page ground (`html`, `body`), section backgrounds outside the cloth, the edges of the roll stage, the mobile menu. Also the italic emphasis colour inside linen headlines and the stroke colour for icons on cloth.
- **Dark Olive Dye** (olive-dark): primary pill buttons, selected tags, headlines on linen, the footer ground, the default focus ring on light surfaces.

### Secondary
- **Sage** (sage): the dye that floods a primary button on hover/focus, italic emphasis on the olive table, muted text on a selected tag, text selection.
- **Olive** (olive): used sparingly; the scrollbar thumb and the dashed seam that runs behind the technology labels.

### Neutral
- **Linen** (linen): the face of the cloth. Every panel, roll items, pleats, the FAQ strip, light buttons. Also the focus ring colour on the olive table.
- **Linen Verso** (linen-verso): the reverse face of a fold: the hero's tilted second fold, goal tags, ledger detail, even pleats, the creases between panels.
- **Sand** (sand): brand neutral, available for alternate grounds; the build currently shows it only through verso shading.
- **Charcoal** (charcoal): body text on linen.
- **Charcoal Muted** (charcoal-muted): ledes, secondary data, column heads, tag captions on linen.
- **On-Table Ivory** (on-table): body and lede text set directly on the olive table and on the footer.
- **Field Paper / Field Stroke** (field-paper, field-stroke): the only non-textile surface, inputs and the WhatsApp message preview in the booking sheet.

### Named Rules
**The Two Grounds Rule.** Text lives either on linen (charcoal family) or on the olive table (linen / on-table ivory). Never place charcoal text on olive or olive-table text on olive-dark.

**The Dye, Not Paint Rule.** Interactive colour change is a fill that floods from the pointer, using the component's own dye colour (sage or olive-dark). There is no separate "accent" hue.

## Typography

**Display Font:** Cormorant Garamond (with Georgia, serif), weights 400, 500, 500 italic, 600 self-hosted via Fontsource.
**Body Font:** Manrope (with Arial, sans-serif), weights 400, 500, 600.

**Character:** A soft, high-contrast garalde for names and promises against a precise, slightly technical grotesque for data. The serif carries the brand's French elegance; the sans carries price, duration and instructions without decoration.

### Hierarchy
- **Display** (500, clamp 2.5 to 4rem, line-height 1, -0.025em): the hero H1 only, charcoal-dark olive with the second sentence in italic olive-table.
- **Headline** (500, clamp 2.3 to 3.9rem, line-height 1, -0.02em): one per section. An italic `em` phrase may carry the emphasis colour.
- **Title** (500, clamp 1.5 to 2rem): philosophy axes, contact, pleat titles (pleats scale up to 2.5rem).
- **Item name** (500, 1.45 to 1.55rem, line-height 1.05): treatment names in ledger rows and mini rows, technology label names, FAQ questions (clamp 1.45 to 1.85rem), tag names.
- **Body** (400, 1rem, line-height 1.65, max 68ch): all running text.
- **Lede** (400, 1.0625rem, line-height 1.6, max 42ch, muted): the one paragraph under a section headline.
- **Data** (600, tabular numerals): prices, durations and package prices wherever they appear.
- **Label** (600, 0.78 to 0.8rem, 0.08em, uppercase): ledger column headers and subheads inside an opened treatment detail. Nothing else.
- **Step numeral** (Cormorant italic, 3.4rem, olive-table): protocol pleat numbers.

### Named Rules
**The Serif Names, Sans Numbers Rule.** Anything a person would say aloud as a name or promise is Cormorant; anything they would compare (price, minutes, sessions) is Manrope with tabular numerals.

**The Headline Stands Alone Rule.** Section headlines have no kicker, eyebrow or overline above them. The uppercase label role is reserved for table column heads and in-detail subheads.

## Layout

A full-bleed olive table with content laid on it at the cloth width (`spacing.cloth-width`, 76rem; the roll and header align to an 80rem frame). Horizontal page padding is the fluid gutter; vertical rhythm between independent sections is `spacing.section`.

Panels are composed as continuous cloth: a panel's bottom radius is 0 where the next fold hangs from it, and a 1.6rem **crease** strip (verso colour, shaded from the top, a dashed stitch at 55%) can join two panels so they read as one fabric. Panel inner padding steps 1.4rem (mobile) to 2.5rem (48rem) to 3.5rem (64rem).

Breakpoints actually used: 34rem (header CTA appears), 40rem, 48rem (two-column folds, five-across tags, four pleats), 60rem (desktop nav replaces the menu dialog), 64rem (hero two-column, pinned roll, full ledger grid, napkin side-by-side), 72rem.

Responsive behaviour: the ledger collapses from a seven-column table to a stacked row with labelled cells; goal tags go 2-up, then a 3+2 split, then 5-across; the roll is a horizontal snap strip until JS upgrades it to the 3D cylinder; pleats stack, then sit edge to edge in four columns.

## Elevation & Depth

Depth is physical: cloth hanging over a table edge. Shadows are always offset downward with a strong negative spread so they appear only below a hanging edge, never as a halo around a floating card. Verso faces carry their own shading from the crease. Real 3D (`perspective` on the section, `transform-origin` at the hinge) is applied by JS only.

### Shadow Vocabulary
- **Fold shadow** (`box-shadow: 0 2.5rem 3.75rem -2.5rem rgba(20, 22, 16, 0.65)`, token `--fold-shadow`): linen panels, the facial napkin face, the FAQ strip.
- **Hanging tag** (`box-shadow: 0 1.5rem 1.9rem -1.4rem rgba(20, 22, 16, 0.6)`): goal tags; a tighter variant for roll items.
- **Compact header** (`box-shadow: 0 1rem 1.5rem -1.25rem rgba(20, 22, 16, 0.75)`): header once scrolled past the hero.
- **Inner fold** (`box-shadow: inset 0 0.9rem 1rem -0.9rem rgba(40, 42, 36, 0.3)`): an opened ledger detail tucked under its row.
- **Verso shading** (`linear-gradient(rgba(40, 42, 36, 0.24), transparent 70%)` overlay): reverse faces; sideways at 0.14 on even pleats.

### Named Rules
**The Hanging Edge Rule.** A shadow exists only where cloth hangs or folds; it falls below the edge with negative spread. No all-around soft glow.

**The Flat Fallback Rule.** No 3D transform, rotation or hidden state lives in CSS defaults. JS adds them inside `matchMedia("(prefers-reduced-motion: no-preference)")`; without it the cloth is flat and visible.

## Shapes

Cloth is almost square: panels 4px, images and thumbnails 2px, the hairline inner stitch 2px. Hanging tags have a square top and 6px bottom corners with a 0.75rem eyelet ring. Technology labels are woven labels: a clipped dog-ear corner (1.1rem fold) with a darker underside triangle, alternating sides across the central seam on desktop. Interactive controls are the only round things: pills (999px) and 3rem circular buttons. Form fields use 6px.

The **stitch** is the recurring line: 1 to 1.5px dashed in olive at 0.3 to 0.6 alpha (ivory at 0.3 to 0.35 on the table) for row dividers, footers of folds, nav hover underlines, inner borders on roll items and labels. Solid rules appear only as the 1px top border of mini rows.

## Components

### Buttons
Tactile and quiet: a pill of dark dye that floods with a second dye from where the pointer entered.
- **Shape:** full pill (999px), min-height 3rem (small: 2.75rem), 1px border in the line colour.
- **Primary:** dark olive dye with linen text, 0.75rem 1.6rem padding, Manrope 600 0.95rem.
- **Hover / Focus:** a `clip-path: circle()` fill grows from the pointer coordinates (`--x`, `--y`, set by `fill.js` on pointerover/pointerout) to 145% over 0.75s with the Naturelle ease, and drains back toward the exit point; text colour swaps over 0.5s. Focus-visible shows the full fill plus a 2px outline at 4px offset. Active scales to 0.97.
- **Variants:** light (linen pill on the olive table, floods dark olive), ghost (transparent with dark olive line, floods dark olive), ghost-light (transparent with ivory line on the table, floods linen), small, and round (3rem circle with a 1.3rem 1.5-stroke line icon; roll arrows).

### Goal Tags (filter chips)
Hanging fabric labels: verso linen with weave, square top, 6px bottom corners, an eyelet ring near the top, a Cormorant name above a muted Manrope count, hanging-tag shadow. Hover, focus and `aria-pressed="true"` flood dark olive from the pointer; text turns linen and the caption and eyelet turn sage.

### Linen Panels (folds)
- **Corner Style:** 4px, squared on whichever edge is hinged to another fold.
- **Background:** linen with the weave; verso variant uses linen-verso plus crease shading.
- **Shadow Strategy:** fold shadow (see Elevation).
- **Internal Padding:** 1.4rem / 2.5rem / 3.5rem by breakpoint.

### Treatment Ledger
The price register. Rows divided by dashed stitches; each row is a full-width toggle (thumbnail, serif name, technique, duration, session price, packages, plus/minus mark) that floods a translucent sage dye on hover/focus. Opening reveals an inset verso detail (inner fold shadow) with uppercase subheads, dashed tag-list chips and a dashed price list; the plus icon's vertical bar scales to 0. On desktop the row is a seven-column table under uppercase column heads.

### Inputs / Fields
- **Style:** field-paper fill, 1px field-stroke border, 6px radius, min-height 3.25rem, 0.8rem 1rem padding, select uses a 1.5-stroke chevron.
- **Focus:** 2px dark olive outline at 2px offset, border turns dark olive.
- **Message preview:** same surface with a dashed border.

### Navigation
- **Header:** transparent over the olive table, linen text, Manrope 500 0.95rem links whose hover/focus draws a dashed underline from the left (0.5s). The brand is the bare official silhouette (`public/images/brand/naturelle-spa-silhouette.png`, a crop of the supplied mark without its fine caption line) drawn through its own alpha as a CSS mask in the text colour, with no tag, box or circle behind it, followed by "Naturelle Spa" in Cormorant 500. The same `.brand-mark` is used in the header, mobile menu and footer (client decision, 2026-11-17). Past the hero the header compacts: olive-table at 0.97 alpha with the compact shadow, logo shrinks. CTA is a small light pill (hidden under 34rem).
- **Mobile:** below 60rem a full-screen dialog on olive-table with weave; links in Cormorant 2.2rem separated by ivory dashed stitches, the bare silhouette mark, and the primary CTA.

### Image Roll (signature)
The gallery is a bolt of linen: 16 images framed on linen with a dashed inner stitch, arranged on a 3D cylinder (`rotateY(i * 360/n) translateZ(R)`, R = 2.75 item widths, slight -4deg tilt) inside a perspective stage that fades into the table at both sides. Scroll drives the angle (pinned on desktop); arrows, arrow keys and drag add a manual offset that snaps to the nearest item (0.9s, power3.out). The active caption is shown below in Cormorant. Without 3D it is a horizontal scroll-snap strip with captions overlaid.

### Folding Sections (signature motion)
GSAP ScrollTrigger over Lenis (lerp 0.1). Folds enter once by rotating from their top hinge (`rotationX` -50 to -90deg, opacity 0, 1 to 1.7s, `cubic-bezier(0.22, 1, 0.36, 1)`); hinged reverses (hero verso, goal result, philosophy axes, napkin, booking sheet, protocol pleats) are scrubbed to scroll. Only transform and opacity animate; `will-change` is applied only while a scrubbed section is on screen. FAQ answers drop open as a flap (`rotateX(-80deg)` to 0, 0.8s).

## Do's and Don'ts

### Do:
- **Do** put every content block on linen with the weave texture, at the cloth width, over the olive table.
- **Do** separate rows and fold edges with dashed stitch lines (1 to 1.5px, olive at 0.3 to 0.6 alpha).
- **Do** hinge new panels to existing ones (squared joining edge, optional crease strip) rather than floating them with a gap and an all-around shadow.
- **Do** give every pill, round button and tag the dye fill from the pointer (`.btn__fill`, wired by `fill.js`) and make focus-visible show the full fill.
- **Do** set prices and durations in Manrope 600 with tabular numerals.
- **Do** keep all 3D and hidden states in JS behind `prefers-reduced-motion: no-preference`; CSS defaults stay flat and visible.
- **Do** use `cubic-bezier(0.22, 1, 0.36, 1)` (`--ease-naturelle`) for every eased transition.

### Don't:
- **Don't** use soft all-around card shadows or floating cards; shadows fall only below a hanging edge.
- **Don't** place a kicker, eyebrow or overline above a headline.
- **Don't** introduce an accent hue outside the brand palette, or redraw the official logo and mark. The silhouette takes the surrounding text colour through its alpha mask; never put it back on a tag, box or circle.
- **Don't** animate layout properties; only transform, opacity, filter and clip-path.
- **Don't** make content depend on a fold being open; the flat state must carry every price and word.
- **Don't** use emoji or glyph characters as icons; icons are inline 1.4 to 1.5-stroke line SVGs.
