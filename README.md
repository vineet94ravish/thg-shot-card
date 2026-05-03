# THG Shot Card — Remotion Composition

Animated cinematic shot breakdown card for The Hoodie Guy.
**9:16 vertical** — renders as a 1080×1920 MP4, 10 seconds at 30fps.

## What it shows

An animated shot briefing card that reveals sequentially:
1. **SHOOT tag** — amber pill fades up
2. **Headline** — task title animates in
3. **Shot diagram** — camera / distance arrow / person boxes with animated arrow
4. **HOW TO DO IT steps** — Gear, Tripod Position, Height, Test Shot cards stagger in
5. **Tip block** — star callout at the end
6. **Progress bar** — amber bar tracks the full 10-second playback

## Gear upgrade from phone → cinema

The original draft used a Samsung S25 Ultra. This composition uses the **Sony FX3** (full-frame cinema camera) with a **35mm f/1.8 prime** and **S-Log3** colour profile — the recommended upgrade when shooting at a higher production level. Other strong options: Sony FX30, Blackmagic Pocket Cinema Camera 6K.

## Setup

```bash
cd thg-shot-card
npm install
```

## Preview in Remotion Studio

```bash
npm start
# Opens at http://localhost:3000
```

## Render to MP4

```bash
npm run render
# Outputs to out/shot-card.mp4
```

## Customise

All content is in `src/ShotCard.tsx`. To change:
- **Copy** — edit the string values in each `<StepCard>` and `<Headline>`
- **Timing** — adjust the `T` object frame numbers to speed up or slow down stagger
- **Colours** — edit the `COLORS` object at the top of `ShotCard.tsx`
- **Duration** — change `durationInFrames` in `src/Root.tsx`
- **Camera** — swap `Sony FX3` references in the diagram and step card

## Adapting for other shot cards

Each shot breakdown from the skill system can be turned into its own composition. Duplicate `ShotCard.tsx`, rename it (e.g. `OrbitArcCard.tsx`), update the content, and register a new `<Composition>` in `Root.tsx`.
