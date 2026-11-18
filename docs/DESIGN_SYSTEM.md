# Hindustan Garage Design System Specification
**Atelier Architectural Light Aesthetic & Multi-Brand Engineering Standards**
*Version 1.0.0 | Est. 1960, Prayagraj*

---

## 1. Aesthetic Thesis & Architectural Foundations

The design language of **Hindustan Garage & Speed Parts** rejects generic SaaS templates, medical clinic sterilities, and dark-mode neon gamer tropes. It is rooted in **Swiss International Typographic Style**, **Leica precision engineering**, and **Porsche Design technical documentation**.

### Design Principles
1. **Physicality & Calibration**: The interface feels like a machined drafting table or a precision mechanical blueprint. Every border, gauge, and telemetry stamp communicates real workshop tolerances.
2. **Warm Atelier Alabaster Tone**: Avoid pure clinical white (`#FFFFFF`) for background canvases. The foundation is a warm limestone/alabaster (`#F6F5F0`), providing tactile depth and anti-glare reading comfort.
3. **1-Pixel Hairlines**: Boundaries and data cells are separated by razor-thin, structural lines (`#DCD9D0`) rather than thick dropshadows or bulky borders.
4. **Dual-Bezel Enclosure**: Key focal elements (Bay cards, Depot cards, Wizard dockets) utilize a recessed double-bezel boundary (`border border-hairline-grid shadow-bezel`), conveying the presence of physical instrument bezels.
5. **Authentic Workshop Telemetry**: Every metric reflects actual mechanical operations ($\pm 0.05\text{mm}$, $\Delta E < 0.2$, $60^\circ\text{C}$ bake, $0.00^\circ$ toe/camber).

---

## 2. Color Palette & Semantic Tokens

```
================================================================================
PALETTE TOKEN          HEX CODE     ROLE & SEMANTIC PURPOSE
================================================================================
--canvas-alabaster     #F6F5F0      Base viewport limestone/alabaster canvas
--surface-white        #FFFFFF      Elevated module cards and floating dockets
--hairline-grid        #DCD9D0      Machined 1px technical divider hairlines
--ink-carbon           #111215      High-contrast deep carbon ink primary text
--ink-graphite         #52565E      Secondary technical specifications & prose
--ink-muted            #8C8F96      Tertiary micro-metadata & time stamps
--crimson              #B81D13      Coachbuilder Crimson — Primary institutional mark
--crimson-tint         #FDF2F0      Subtle crimson background fill for alerts/badges
--crimson-border       #F5C2BC      Border line for active crimson chips & tags
--cobalt               #0F4C81      Speed Parts Cobalt — B2B Wholesale Depot mark
--cobalt-tint          #F0F4F8      Ambient background fill for wholesale catalog
--cobalt-border        #BACCE0      Border line for genuine OEM parts cards
--status-emerald       #10B981      Live telemetry operational LED indicator
================================================================================
```

---

## 3. Typographic Hierarchy

The system pairs an authoritative, industrial condensed display font with clean geometric sans-serif for reading comfort, grounded by a monospaced tabular font for telemetry data.

| Role | Font Family | Size Range | Weight / Tracking | Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Architectural Headings** | Sans-Serif Display | 24px – 52px | Bold (700) / Tracking-Tighter (`-0.03em`) | Master H1/H2 headlines, Section titles |
| **Technical Nomenclature** | Monospace | 9px – 13px | Medium/Bold / Tracking-Spec (`+0.05em`) | Bay numbers, HSN codes, Coordinates, Specs |
| **Editorial Prose** | System Clean Sans | 14px – 18px | Normal (400) / Leading-Relaxed (`1.6`) | Descriptive overviews, Journal articles, FAQs |
| **Tabular Numbers** | Tabular Monospace | 24px – 48px | Bold (700) / `tabular-nums` | Mechanical Odometers, SLA turnaround clocks |

### Bilingual Typesetting
- **Devanagari Nomenclature**: Rendered in clean Hindi script alongside English terms (e.g. `ईसीएम एवं कंप्यूटर डायग्नोस्टिक्स / ECM Diagnostics`).
- **Devanagari Sizing**: Sized at $85\%$ relative em to harmonize visual optical weight with Latin capitals.

---

## 4. UI Components & Layout Geometry

### Double-Bezel Card Enclosure
```css
.double-bezel {
  border: 1px solid #DCD9D0;
  box-shadow: 
    0 1px 2px rgba(17, 18, 21, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border-radius: 4px;
}
```

### Radius Tokens
- `rounded-spec`: `4px` (Sharp, precision machined corner profile; avoids bubbly modern consumer app rounding).
- `rounded-pill`: `9999px` (Strictly reserved for filter chips, drag handles, and status beacons).
