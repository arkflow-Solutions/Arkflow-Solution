"use client";

/**
 * ConvergenceField — the ambient background that replaces the retired
 * WebGL scenes. Channels entering from the edges, converging on one
 * point: the site's whole argument, drawn once, in about 1KB.
 *
 * Two animated properties, both CSS. No canvas, no per-frame JS,
 * no dependency.
 */
export function ConvergenceField() {
  return (
    <div className="af-herofield" aria-hidden>
      <svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
        <g className="af-hf-lines">
          {[
            "M60 120C360 120 620 260 900 350",
            "M60 260C340 260 640 300 900 350",
            "M60 400C340 400 640 380 900 350",
            "M60 540C360 540 620 440 900 350",
            "M1140 140C1020 200 960 280 900 350",
            "M1140 560C1020 500 960 420 900 350",
          ].map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g className="af-hf-nodes">
          {[
            [60, 120],
            [60, 260],
            [60, 400],
            [60, 540],
            [1140, 140],
            [1140, 560],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" />
          ))}
        </g>
        <circle className="af-hf-core" cx="900" cy="350" r="5" />
      </svg>
    </div>
  );
}
