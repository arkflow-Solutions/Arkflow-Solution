import { cn } from "@/lib/utils";
import type { CarPartId } from "@/lib/car-content";

/**
 * CarBlueprint — a side elevation of a vehicle drawn as a technical
 * blueprint. Seven addressable groups map to the seven parts of the
 * ArkFlow analogy (Partner Briefing §04).
 *
 * Deliberately NOT a three-quarter view: an elevation is what an
 * engineering drawing actually is, and it gives every one of the seven
 * parts unambiguous space of its own.
 *
 * No WebGL, no external asset, no <image>. Pure vector, one ambient
 * animation, everything else driven by the active part.
 */

export function CarBlueprint({
  active,
  className,
}: {
  active: CarPartId;
  className?: string;
}) {
  const part = (id: CarPartId) =>
    cn("bp-part", active === id && "bp-part--on");

  return (
    <svg
      viewBox="0 0 1000 480"
      className={cn("bp-svg", className)}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {/* ---------- measurement grid: the paper, not the drawing ---------- */}
      <g className="bp-grid">
        <path d="M60 152h880M60 232h880M60 312h880" />
        <path d="M180 128v300M420 128v300M660 128v300M900 128v300" />
      </g>

      {/* ---------- chassis: never highlighted, always legible ---------- */}
      <g className="bp-chassis">
        <path d="M170 344v-32c0-22 14-34 42-38h550c44 0 90 8 114 24 10 8 12 24 10 36v10" />
        <path d="M170 344h54M348 344h332M804 344h82" />
        <path d="M224 344a62 62 0 0 1 124 0M680 344a62 62 0 0 1 124 0" />
        <path d="M316 274c40-42 90-60 154-64h126c58 6 116 26 158 64" />
        <path d="M510 210l-6 64" />
        <path className="bp-crease" d="M220 306h630" />
        <path className="bp-datum" d="M60 440h880" />
      </g>

      {/* ---------- doors ---------- */}
      <g className={part("doors")} data-part="doors">
        <path className="bp-fill" d="M362 274h142v68H362zM504 274h160v68H504z" />
        <path d="M362 274v68M504 274v68M664 274v68" />
        <rect x="466" y="294" width="32" height="7" rx="3.5" />
        <rect x="624" y="294" width="32" height="7" rx="3.5" />
      </g>

      {/* ---------- engine ---------- */}
      <g className={part("engine")} data-part="engine">
        <path d="M754 274c42 0 92 8 118 24" />
        <rect className="bp-fill" x="798" y="300" width="62" height="34" rx="6" />
        <path d="M812 300v34M829 300v34M846 300v34" />
        <path d="M830 300v-12h20" />
      </g>

      {/* ---------- driver ---------- */}
      <g className={part("driver")} data-part="driver">
        <path d="M556 266v-40c0-8 6-14 14-14h10" />
        <path d="M554 262l48 6" />
        <ellipse cx="678" cy="250" rx="5" ry="14" />
        <path d="M674 260l-20 8" />
      </g>

      {/* ---------- wheels ---------- */}
      <g className={part("wheels")} data-part="wheels">
        {[286, 742].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy={352} r={56} />
            <circle cx={cx} cy={352} r={33} />
            <circle className="bp-solid" cx={cx} cy={352} r={6} />
            <path
              d={`M${cx} 331v-16M${cx} 373v16M${cx - 21} 352h-16M${cx + 21} 352h16`}
            />
          </g>
        ))}
      </g>

      {/* ---------- boot ---------- */}
      <g className={part("boot")} data-part="boot">
        <rect className="bp-fill" x="186" y="288" width="76" height="44" rx="5" />
        <path d="M186 308h76M224 288v44" />
        <path d="M198 288v-12h20" />
      </g>

      {/* ---------- dashboard ---------- */}
      <g className={part("dashboard")} data-part="dashboard">
        <path d="M700 264l48 10" />
        <circle cx="694" cy="254" r="8" />
        <path d="M694 254l6-5" />
        <path d="M712 260a15 15 0 0 1 13 7" />
      </g>

      {/* ---------- destination: the road, not a car part ---------- */}
      <g className={part("destination")} data-part="destination">
        <path className="bp-road" d="M20 408h920" />
        <path d="M886 408l104-13M886 408l104 13" />
        <path d="M916 402v12M944 404v8M966 405v6" />
      </g>

      {/* ---------- ambient flow: doors → engine → wheels → road ---------- */}
      <path
        className="bp-flow-guide"
        d="M212 274h550c44 0 90 8 114 24 10 8 12 24 10 36v14c0 28 24 50 62 58l42 4"
      />
      <path
        className="bp-flow"
        d="M212 274h550c44 0 90 8 114 24 10 8 12 24 10 36v14c0 28 24 50 62 58l42 4"
      />
    </svg>
  );
}
