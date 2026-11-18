# Hindustan Garage Motion & Animation System
**Hardware-Accelerated Engineering Choreography & Physics Specification**
*Version 1.0.0 | Est. 1960, Prayagraj*

---

## 1. Non-Negotiable Motion Principles

The animation system adheres to the **Ten Non-Negotiable Standards of UI Polish**:
1. **Sub-300ms UI Duration Budget**: Interactive actions (clicks, toggles, hover states) complete in $120\text{ms} - 280\text{ms}$. Only atmospheric page-level reveals extend to $600\text{ms} - 800\text{ms}$.
2. **GPU Composited Properties Only**: Never animate `width`, `height`, `top`, `left`, or `margin`. Animate exclusively via `transform` (`translate3d`, `scale`) and `opacity`.
3. **Zero Layout Thrashing Accordions**: Content height interpolation is executed using modern CSS Grid (`grid-template-rows: 0fr -> 1fr`), avoiding JavaScript `scrollHeight` measurements.
4. **Strict `prefers-reduced-motion` Enforcement**: All hooks and components listen to the system accessibility preference, instantly resolving to static, high-contrast layouts when reduced motion is preferred.
5. **No Touch Cursor Overhead**: The precision drafting cursor is strictly gated behind `@media (hover: hover) and (pointer: fine)` so mobile and tablet devices never mount or calculate mouse coordinates.

---

## 2. Calibrated Cubic-Bezier Curves

```
================================================================================
NAME               BEZIER VALUE                   USE CASE
================================================================================
Architectural Snap  cubic-bezier(0.16, 1, 0.3, 1) Masked headings, step tabs, card entrance
Structural Draw     cubic-bezier(0.22, 1, 0.36, 1) Hairline divider width expansion
Mechanical Rollup   easeOutQuint: 1-(1-x)^5      Odometers, numeral rollups
Haptic Press        cubic-bezier(0.23, 1, 0.32, 1) Button press-down scale(0.98)
Fluid Lerp Loop     lerp factor: 0.18            Precision drafting reticle cursor
================================================================================
```

---

## 3. Motion Archetypes & Component Architectures

### Archetype 1: Precision Drafting Reticle Cursor (`CustomCursor.tsx`)
- **Composition**:
  - `Center Dot`: Instant 4px carbon ink point (`translate3d(clientX, clientY, 0)`, 0ms lag).
  - `Trailing Reticle`: 28px hairline drafting ring, animated via a 60fps `requestAnimationFrame` lerp loop (`lerp factor: 0.18`).
- **Contextual State Morphs**:
  - `default`: 28px hairline ring with 2% carbon ink fill.
  - `pointer`: Expands to 48px with 4% Coachbuilder Crimson tint on interactive buttons/links.
  - `drag`: Morphs into a 96×32px pill displaying `◄ DRAG ►` over the Before/After repair bench.
  - `inspect`: Morphs into a camera/CAD viewfinder with 4 corner tick marks over diagnostic hotspot pins.
  - `cobalt`: Morphs with Speed Cobalt border and center pip over B2B catalog items.

### Archetype 2: Masked Typography Reveal (`MaskedHeading.tsx`)
- **Mechanism**: The target heading is nested within an `overflow: hidden` bounding box.
- **Transform**: `translate3d(0, 105%, 0)` translates smoothly to `translate3d(0, 0, 0)` over 650ms using `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Milestone Switch Transition**: When the user switches between timeline years (1960 $\to$ 1984 $\to$ 2012), the `key` updates, triggering an instantaneous masked re-reveal of the era title and headline.

### Archetype 3: Diagnostic Telemetry Decrypter (`TechnicalDecryptedText.tsx`)
- **Concept**: Emulates an OBD-II CAN-Bus scan tool or spectrometer locking onto clean diagnostic telemetry.
- **Algorithm**: A 25ms timer shuffles through a character bank (`0123456789ABCDEF/·_-[*]#`) while linearly resolving characters from left to right over 220ms–320ms.
- **Accessibility Guarantee**: Preserves native `aria-label={targetText}` so screen readers receive clean text immediately without auditory scramble confusion.

### Archetype 4: Tabular Mechanical Odometers (`Odometer.tsx`)
- **Algorithm**: Non-linear `1 - Math.pow(1 - progress, 5)` deceleration curve.
- **Typography**: Formatted with `tabular-nums` and Indian numeral grouping (`en-IN`: `48,500+`).
- **Use Cases**:
  - `66+` Years in Service
  - `48,500+` Vehicles Mastered
  - `18+` Cashless National Insurers
  - `100%` Genuine OEM Guarantee
  - `4,000+` SKUs On-Shelf (Speed Parts Depot)

### Archetype 5: Interactive Before/After Repair Slider (`BeforeAfterSlider.tsx`)
- **Sinuous Discovery Nudge**: On initial viewport intersection, executes a 900ms micro-oscillation ($50\% \to 55\% \to 47\% \to 50\%$) using a damped sine wave `Math.sin(progress * Math.PI * 2) * 5 * (1 - progress)` to intuitively signal interactivity to the visitor.
- **Zero-Shift 60fps Dragging**: Dual-layer container with clipping percentage bounds ($0\% - 100\%$) and 44px accessible touch pill.

### Archetype 6: Zero-Reflow Accordion (`FaqAccordion.tsx`)
- **Grid Technique**:
  ```css
  .accordion-content {
    display: grid;
    transition: grid-template-rows 300ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .accordion-content.is-open {
    grid-template-rows: 1fr;
  }
  .accordion-content.is-closed {
    grid-template-rows: 0fr;
  }
  ```
- **Inner Wrapper**: An inner `overflow-hidden` container allows smooth content expansion without recalculating layout dimensions or triggering browser reflows.
