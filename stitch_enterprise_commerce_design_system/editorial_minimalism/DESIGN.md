---
name: Editorial Minimalism
colors:
  surface: '#fdf8f8'
  surface-dim: '#ddd9d8'
  surface-bright: '#fdf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3f2'
  surface-container: '#f1edec'
  surface-container-high: '#ebe7e6'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#444748'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#615e58'
  on-secondary: '#ffffff'
  secondary-container: '#e7e2d9'
  on-secondary-container: '#67645d'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1c1b1a'
  on-tertiary-container: '#868382'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e7e2da'
  secondary-fixed-dim: '#cbc6be'
  on-secondary-fixed: '#1d1b17'
  on-secondary-fixed-variant: '#494641'
  tertiary-fixed: '#e6e2df'
  tertiary-fixed-dim: '#cac6c4'
  on-tertiary-fixed: '#1c1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#fdf8f7'
  on-background: '#1c1b1b'
  surface-variant: '#e6e2e0'
typography:
  display:
    fontFamily: Inter
    fontSize: 72px
    fontWeight: '600'
    lineHeight: 76px
    letterSpacing: -0.04em
  display-mobile:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 52px
    letterSpacing: -0.03em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  gutter: 24px
  md: 32px
  margin: 40px
  lg: 64px
  xl: 128px
---

## Brand & Style

The design system embodies **Editorial Minimalism** and **Quiet Luxury**, built specifically for high-end enterprise e-commerce platforms, back-office command centers, and delivery logistics consoles. It treats complex enterprise tools with the aesthetic reverence and restraint of an architectural monograph or high-fashion editorial print. 

The target audience comprises discerning enterprise operators, luxury merchants, fulfillment directors, and affluent global consumers who value intentionality, typographic clarity, and cognitive calm over claustrophobic dashboard density. The interface evokes effortless authority, serene precision, and timeless tactile discipline. 

Visual density is managed via generous whitespace, delicate warm neutral layering, and disciplined black typography rather than hyper-saturated alert ribbons or heavy divider grids. Full bi-directional parity is built directly into the aesthetic DNA: whether viewed in English LTR or Arabic RTL, typographic proportion, balance, and structural elegance remain pristine.

## Colors

The color palette is anchored on architectural warm alabaster neutrals paired with stark monochrome black and muted warm taupe-greys. This avoids the sterile, clinical fatigue of pure cold whites while elevating visual comfort during prolonged back-office workflows.

- **Canvas & Surface Tiering:** The root canvas is `--surface` (`#fdf8f8`). Elevated surfaces utilize warm tiered containers (`#ffffff` through `#f1edec` and `#e5e2e1`) to organize information visually without relying on heavy borders.
- **Monochrome Dominance:** Primary interaction surfaces, key metrics, and architectural typography rely on deep black (`#000000` / `#1c1b1b`), producing supreme editorial contrast.
- **Secondary & Metatones:** Secondary actions and metadata employ warm stone greys (`#615e58`) and soft outline tints (`#c4c7c7`), maintaining optical hierarchy without competing with primary inventory and transactional data.
- **State & Accents:** Critical notifications and inventory shortages map to `#ba1a1a` on softened rose-tinted containers (`#ffdad6`), ensuring high-priority visibility while preserving palette cohesion.

## Typography

The typographic system relies on **Inter**, handled with an architectural and editorial cadence. It establishes a strong typographic hierarchy through pronounced tracking shifts and disciplined vertical proportional spacing.

- **Architectural Display & Headlines:** Large sizes (`display`, `headline-lg`) feature tight negative tracking (`-0.04em` to `-0.03em`) and disciplined line heights, creating a sculptural presence for headline catalog items, financial totals, and dashboard summaries.
- **Editorial Body Prose:** Body copy uses open line heights (`1.6`) and neutral tracking to support sustained scanning of enterprise tables, manifests, logistics waybills, and order logs.
- **Labels & Micro-data:** Captions, taxonomy tags, and table header labels use small, uppercase treatments with expanded tracking (`+0.05em`), immediately distinguishing metadata from core narrative and operational inputs.
- **Bi-directional / RTL Typography:** When rendering Arabic, letter spacing adjustments must reset to normal tracking (`letter-spacing: 0`) to preserve the natural ligature flow of Arabic typography, while matching equivalent visual baseline weights.

## Layout & Spacing

The layout philosophy balances a disciplined 12-column fixed grid with an airy, editorial vertical flow. Content is grouped into breathable zones rather than edge-to-edge packed data clusters.

- **The Breathable Canvas:** High-level section margins enforce generous white space (`64px` to `128px`), isolating administrative operational modules and e-commerce hero showcases.
- **Grid Discipline:** 
  - **Desktop (>=1200px):** 12-column grid with a `24px` gutter and minimum `40px` exterior margins. Critical reading content is restricted to centered 8-column spans to optimize scannability.
  - **Tablet (768px - 1199px):** 8-column grid with `16px` gutters and `24px` margins. Sidebars collapse to responsive overlay drawers.
  - **Mobile (<768px):** 4-column layout with `12px` gutters and `16px` margins. Multi-column inventory tables convert into modular stacked cards.
- **Bi-directional Flow (RTL):** All structural horizontal alignments, flex direction vectors, margins, and padding utilize CSS Logical Properties (`margin-inline-start`, `padding-inline-end`) ensuring seamless switching between Latin and Arabic views without broken spatial balances.

## Elevation & Depth

Visual depth is achieved through **Tonal Layering** and **Soft Ambient Shadows** rather than sharp border framing.

- **Surface Tonal Stacking:** Surfaces step through nuanced warm tones (`--surface` at base level 0, `--surface-container-low` for secondary modules, and pure `--surface-container-lowest` `#ffffff` for floating interaction canvases). 
- **Ambient Shadow Character:** Shadows emulate diffuse natural ambient gallery lighting. They are rendered with expansive blur radii (30px to 60px) and ultra-low opacity (2% to 4%) tinted with rich black (`rgba(0, 0, 0, 0.03)`), eliminating synthetic gray borders.
- **Subtle Perimeter Boundaries:** When separation is required for form validation or accessible contrast against lighter surfaces, ultra-thin 1px outlines (`#c4c7c7`) are deployed without additional hard shadow offsets.

## Shapes

The shape system employs an intentional architectural scale designed to transition smoothly from precise, compact interaction controls to soft, humanely proportioned content containers:

- **Controls & Form Elements:** Standard interactive widgets (buttons, text fields, dropdown selectors) employ a crisp, refined **7px** corner radius (`rounded-[7px]`), balancing structured enterprise precision with ergonomic tactile softness.
- **Mid-Tier Containers:** Sub-panels, dropdown menus, flyout popovers, and table cards leverage **12px** corner rounding (`rounded-md` / 12px) to softly distinguish grouped metadata.
- **Hero Containers & Modals:** Major cards, dialog boxes, and media display banners adopt a generous **16px** corner radius (`rounded-lg` / 16px), creating a relaxed frame for imagery and complex workflows.
- **Pill Tags & Status Nodes:** Context chips and status indicators use full pill curvature (`rounded-full` / 9999px).

## Components

### Buttons
- **Primary:** Solid monochrome black (`#000000`) fill with crisp white (`#ffffff`) text, 7px border radius, and comfortable inner padding (`12px 24px` for standard, `8px 16px` for compact table actions). Hover transitions to subtle deep charcoal (`#1c1b1b`).
- **Secondary:** Surface container (`#e7e2d9` or `#f1edec`) with `#1c1b1b` label, zero external shadow, and a 7px radius.
- **Ghost/Tertiary:** Transparent background with `#1c1b1b` text and subtle underline on hover; designed for inline table actions and non-destructive navigations.

### Input Fields & Controls
- **Text Inputs & Dropdowns:** Flat background fill (`#f7f3f2`) with a subtle 1px border (`#c4c7c7`) and 7px radius. Padding is a structured `12px 16px`. Active/focus transitions outline directly to bold monochrome black (`#000000`) with a 1px ring offset.
- **Checkboxes & Radios:** Minimalist 16px boxes with a 4px inner radius (checkbox) or circle (radio). Active state is solid `#000000` with a sharp `#ffffff` check icon.

### Cards & Content Surface Panels
- Constructed using `#ffffff` (`surface-container-lowest`) resting upon the `#fdf8f8` base canvas.
- 16px corner radius, generous internal padding (`32px` standard, `20px` compact admin), and a soft ambient shadow (`0 20px 40px rgba(0, 0, 0, 0.02)`).

### Chips & Badges
- Status and attribute badges use small pill shapes (`rounded-full`) with a height of 24px and padding of `0 12px`.
- Rendered with muted contextual fills (`#f1edec` for draft, `#ffdad6` with `#93000a` text for error or cancellation, and `#e7e2d9` for active enterprise orders).

### Lists & Data Tables
- Rows feature generous vertical breathing room (`16px to 20px` vertical cell padding).
- Delimited solely by 1px subtle baseline borders (`#ebe7e6`), ensuring dense sku collections and shipping registries remain light and effortless to scan.
- Hover states softly tint the row background with `#f7f3f2`.

### Modal Sheets & Waybills
- Centered dialogs with a strict 16px corner radius, maximum width constraints (ranging from 560px for prompt dialogs to 960px for full logistics manifests), and deep ambient backdrop diffusion (`rgba(28, 27, 27, 0.4)` with 8px blur).