import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

// ─── Design tokens ────────────────────────────────────────────────────────────
const COLORS = {
  bg: "#0e0e0e",
  bgCard: "#161616",
  bgCardAlt: "#1c1c1c",
  surface: "#222222",
  border: "rgba(255,255,255,0.08)",
  borderStrong: "rgba(255,255,255,0.15)",
  textPrimary: "#f0f0ee",
  textSecondary: "#a0a09e",
  textTertiary: "#585856",
  accent: "#d4a855",         // warm gold
  accentBg: "rgba(212,168,85,0.12)",
  shootTag: "#d4a855",
  shootTagBg: "rgba(212,168,85,0.15)",
  diagBg: "#1a1a1a",
  diagBorder: "rgba(255,255,255,0.1)",
  cameraBox: "rgba(212,168,85,0.1)",
  personBox: "rgba(255,255,255,0.05)",
};

// ─── Shared easing ────────────────────────────────────────────────────────────
const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
const EASE_IN_OUT = Easing.bezier(0.45, 0, 0.55, 1);

// ─── Animation helpers ────────────────────────────────────────────────────────
function fadeUp(
  frame: number,
  startFrame: number,
  duration = 20,
  distance = 28
) {
  const f = frame - startFrame;
  const opacity = interpolate(f, [0, duration], [0, 1], {
    easing: EASE_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(f, [0, duration], [distance, 0], {
    easing: EASE_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { opacity, transform: `translateY(${translateY}px)` };
}

function slideRight(frame: number, startFrame: number, duration = 18) {
  const f = frame - startFrame;
  const scaleX = interpolate(f, [0, duration], [0, 1], {
    easing: EASE_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { transform: `scaleX(${scaleX})`, transformOrigin: "left center" };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** The amber SHOOT tag at the top */
const ShootTag: React.FC<{ frame: number; startFrame: number }> = ({
  frame,
  startFrame,
}) => {
  const style = fadeUp(frame, startFrame, 16);
  return (
    <div style={{ ...style }}>
      <div
        style={{
          display: "inline-block",
          background: COLORS.shootTagBg,
          border: `1px solid ${COLORS.shootTag}`,
          borderRadius: 6,
          padding: "6px 20px",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "0.12em",
          color: COLORS.shootTag,
          fontFamily: "system-ui, sans-serif",
          textTransform: "uppercase",
        }}
      >
        SHOOT
      </div>
    </div>
  );
};

/** Main headline */
const Headline: React.FC<{ frame: number; startFrame: number }> = ({
  frame,
  startFrame,
}) => {
  const style = fadeUp(frame, startFrame, 22, 32);
  return (
    <div
      style={{
        ...style,
        fontSize: 52,
        fontWeight: 700,
        color: COLORS.textPrimary,
        lineHeight: 1.2,
        fontFamily: "system-ui, sans-serif",
        marginTop: 24,
      }}
    >
      Set tripod 3m behind chair, shoulder height
    </div>
  );
};

/** Divider line that scales in */
const Divider: React.FC<{ frame: number; startFrame: number }> = ({
  frame,
  startFrame,
}) => {
  const style = slideRight(frame, startFrame);
  return (
    <div
      style={{
        ...style,
        height: 1,
        background: COLORS.border,
        marginTop: 40,
        marginBottom: 40,
      }}
    />
  );
};

/** Shot diagram block */
const ShotDiagram: React.FC<{ frame: number; startFrame: number }> = ({
  frame,
  startFrame,
}) => {
  const wrap = fadeUp(frame, startFrame, 24, 24);

  // Camera arrow animation
  const arrowProgress = interpolate(frame - (startFrame + 10), [0, 20], [0, 1], {
    easing: EASE_OUT,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ ...wrap }}>
      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: "0.1em",
          color: COLORS.textTertiary,
          textTransform: "uppercase",
          marginBottom: 20,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        SHOT DIAGRAM
      </div>

      <div
        style={{
          background: COLORS.diagBg,
          border: `1px solid ${COLORS.diagBorder}`,
          borderRadius: 16,
          padding: "36px 40px",
        }}
      >
        {/* Camera and person row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            fontFamily: "monospace",
          }}
        >
          {/* Camera box */}
          <div
            style={{
              background: COLORS.cameraBox,
              border: `1px solid ${COLORS.accent}`,
              borderRadius: 10,
              padding: "18px 24px",
              minWidth: 180,
            }}
          >
            <div
              style={{
                fontSize: 18,
                color: COLORS.textTertiary,
                marginBottom: 10,
                letterSpacing: "0.05em",
                fontFamily: "system-ui, sans-serif",
                fontWeight: 600,
              }}
            >
              CAMERA
            </div>
            <div style={{ fontSize: 22, color: COLORS.accent, marginBottom: 6, fontWeight: 700 }}>
              🎥
            </div>
            <div style={{ fontSize: 20, color: COLORS.textPrimary, lineHeight: 1.5 }}>
              Sony FX3
            </div>
            <div style={{ fontSize: 18, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              4K 30fps
            </div>
            <div style={{ fontSize: 18, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              35mm lens
            </div>
          </div>

          {/* Distance arrow */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0 16px",
              opacity: arrowProgress,
            }}
          >
            <div style={{ fontSize: 18, color: COLORS.textTertiary, marginBottom: 6, fontFamily: "system-ui" }}>3m</div>
            <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
              <div style={{ height: 2, flex: 1, background: COLORS.textTertiary }} />
              <div style={{ fontSize: 22, color: COLORS.textTertiary, marginLeft: 4 }}>▶</div>
            </div>
          </div>

          {/* Person box */}
          <div
            style={{
              background: COLORS.personBox,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 10,
              padding: "18px 24px",
              minWidth: 180,
            }}
          >
            <div
              style={{
                fontSize: 18,
                color: COLORS.textTertiary,
                marginBottom: 10,
                letterSpacing: "0.05em",
                fontFamily: "system-ui, sans-serif",
                fontWeight: 600,
              }}
            >
              PERSON
            </div>
            <div style={{ fontSize: 22, marginBottom: 6 }}>👤</div>
            <div style={{ fontSize: 20, color: COLORS.textPrimary, lineHeight: 1.5 }}>
              sits
            </div>
            <div style={{ fontSize: 18, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              facing
            </div>
            <div style={{ fontSize: 18, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              window
            </div>
          </div>
        </div>

        {/* Height label */}
        <div
          style={{
            marginTop: 28,
            fontSize: 20,
            color: COLORS.textTertiary,
            fontFamily: "monospace",
            borderTop: `1px solid ${COLORS.diagBorder}`,
            paddingTop: 20,
          }}
        >
          Height: tripod at shoulder height (~1.2m)
        </div>
      </div>
    </div>
  );
};

/** A single "how to do it" step card */
const StepCard: React.FC<{
  label: string;
  value: string;
  frame: number;
  startFrame: number;
}> = ({ label, value, frame, startFrame }) => {
  const style = fadeUp(frame, startFrame, 18, 20);
  return (
    <div
      style={{
        ...style,
        background: COLORS.bgCard,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 12,
        padding: "24px 28px",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: "0.09em",
          color: COLORS.textTertiary,
          textTransform: "uppercase",
          marginBottom: 10,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 28,
          color: COLORS.textPrimary,
          lineHeight: 1.5,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {value}
      </div>
    </div>
  );
};

/** The star tip block at the bottom */
const TipBlock: React.FC<{ frame: number; startFrame: number }> = ({
  frame,
  startFrame,
}) => {
  const style = fadeUp(frame, startFrame, 22, 24);
  return (
    <div
      style={{
        ...style,
        background: COLORS.bgCard,
        border: `1px solid ${COLORS.borderStrong}`,
        borderRadius: 12,
        padding: "28px 32px",
        display: "flex",
        gap: 20,
        alignItems: "flex-start",
      }}
    >
      <div style={{ fontSize: 32, flexShrink: 0, marginTop: 2 }}>★</div>
      <div
        style={{
          fontSize: 27,
          color: COLORS.textPrimary,
          lineHeight: 1.6,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Set it once and leave it. Don't touch the tripod again until you've
        finished all shots from this angle.
      </div>
    </div>
  );
};

/** Animated progress bar at the very top */
const ProgressBar: React.FC<{ frame: number; totalFrames: number }> = ({
  frame,
  totalFrames,
}) => {
  const progress = interpolate(frame, [0, totalFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: "rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          background: COLORS.accent,
          borderRadius: "0 2px 2px 0",
        }}
      />
    </div>
  );
};

// ─── Main composition ─────────────────────────────────────────────────────────
export const ShotCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Stagger timing constants (frames)
  const T = {
    tag: 0,
    headline: 10,
    divider1: 22,
    diagram: 32,
    sectionTitle: 80,
    divider2: 88,
    step1: 96,
    step2: 112,
    step3: 128,
    step4: 144,
    tip: 168,
  };

  // Section title "HOW TO DO IT"
  const sectionStyle = fadeUp(frame, T.sectionTitle, 18);

  return (
    <AbsoluteFill style={{ background: COLORS.bg, overflow: "hidden" }}>
      {/* Progress bar */}
      <ProgressBar frame={frame} totalFrames={durationInFrames} />

      {/* Scrollable content — we simulate scroll with translateY */}
      <Sequence from={0}>
        <AbsoluteFill
          style={{
            padding: "72px 72px 80px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* TAG */}
          <ShootTag frame={frame} startFrame={T.tag} />

          {/* HEADLINE */}
          <Headline frame={frame} startFrame={T.headline} />

          {/* DIVIDER 1 */}
          <Divider frame={frame} startFrame={T.divider1} />

          {/* SHOT DIAGRAM */}
          <ShotDiagram frame={frame} startFrame={T.diagram} />
        </AbsoluteFill>
      </Sequence>

      {/* Second screen — slides up from bottom after diagram settles */}
      <Sequence from={T.sectionTitle - 10}>
        <AbsoluteFill
          style={{
            padding: "72px 72px 80px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            overflow: "hidden",
          }}
        >
          {/* HOW TO DO IT label */}
          <div style={{ ...sectionStyle }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: COLORS.textTertiary,
                textTransform: "uppercase",
                marginBottom: 20,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              HOW TO DO IT
            </div>
          </div>

          {/* Step cards */}
          <StepCard
            label="GEAR"
            value="Sony FX3 with 35mm f/1.8 prime. 4K 25fps. S-Log3 colour profile. Tripod with fluid head."
            frame={frame}
            startFrame={T.step1}
          />
          <StepCard
            label="TRIPOD POSITION"
            value="3 metres directly behind the chair. Centre the subject in frame."
            frame={frame}
            startFrame={T.step2}
          />
          <StepCard
            label="HEIGHT"
            value="Camera at the subject's shoulder level when seated — roughly 1.1–1.2m off the ground."
            frame={frame}
            startFrame={T.step3}
          />
          <StepCard
            label="TEST SHOT"
            value="Record 3 seconds, play back. Window glow behind him? He's sharp? Good."
            frame={frame}
            startFrame={T.step4}
          />

          {/* TIP */}
          <TipBlock frame={frame} startFrame={T.tip} />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
