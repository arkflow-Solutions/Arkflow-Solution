"use client";

import { useMemo } from "react";
import { SceneShell, CameraRig } from "@/components/three/scene-shell";
import { SystemCore } from "@/components/three/system-core";
import { EntryPoints } from "@/components/three/entry-points";

/** Linear interpolation clamped to a scroll window. */
function seg(p: number, a: number, b: number) {
  if (p <= a) return 0;
  if (p >= b) return 1;
  return (p - a) / (b - a);
}

/** Smoothstep, so camera moves ease rather than ramp. */
const ease = (t: number) => t * t * (3 - 2 * t);

/**
 * Hero scroll story.
 *
 *   0.00–0.18   Doors scattered; enquiries arrive from everywhere
 *   0.14–0.42   The lines light and opportunities begin moving inward
 *   0.00–0.70   SOME DO NOT MAKE IT — they stall at an unattended
 *               handover, turn amber and fall out of the line
 *   0.36–0.62   Camera closes on the centre; the ring recedes
 *   0.58–0.86   The lattice assembles into the connected system
 *   0.70–0.92   The handovers close; every opportunity completes
 *
 * WHY THE LEAK IS HERE (Phase 3E hero correction).
 *
 * The page opens by telling a business owner their business is leaking
 * revenue. The hero used to show nothing being lost — every pulse
 * reached the centre — while the visual that actually showed loss
 * (LeakFlow) was rendered only as the non-WebGL fallback. The visitors
 * with the capable device got the abstract scene; the visitors on a
 * weak phone got the meaningful one.
 *
 * Now the capable device gets the argument. The order of the beats
 * matches the headline and the three scroll captions: enquiries arrive,
 * nobody is watching the handovers, that is where they stop — and only
 * at the very end, as the system assembles, do the gaps close. The
 * hero states the problem; the rest of the page answers it.
 *
 * NO VEHICLE HERE. A car rendered as the hero subject reads as a car
 * advertisement no matter what the headline says — solid body, rim
 * light, low three-quarter angle is literally the grammar of vehicle
 * photography. The car belongs in section 4, where it is introduced as
 * an analogy and has context around it.
 */
export default function HeroScene({
  progress,
  active,
  lite = false,
}: {
  progress: number;
  active: boolean;
  lite?: boolean;
}) {
  const connect = ease(seg(progress, 0.14, 0.42));
  const approach = ease(seg(progress, 0.36, 0.62));
  const separation = ease(seg(progress, 0.58, 0.86));
  const ringFade = 1 - ease(seg(progress, 0.44, 0.68));
  /* Held open for most of the hero: the loss is the point of the
     opening. It closes only as the system assembles, so the last thing
     the visitor sees before scene 02 is the promise, not the problem. */
  const seal = ease(seg(progress, 0.70, 0.92));

  const camera = useMemo(() => {
    // Wide establishing pose → close three-quarter on the vehicle.
    const from = { p: [8.6, 3.6, 10.4], t: [0, 1.4, 0] };
    const to = { p: [3.2, 1.9, 4.6], t: [0, 1.4, 0] };
    const mix = (a: number[], b: number[]) =>
      a.map((v, i) => v + (b[i] - v) * approach) as [number, number, number];
    return { position: mix(from.p, to.p), target: mix(from.t, to.t) };
  }, [approach]);

  // Slow idle rotation that stalls once the vehicle becomes the subject,
  // so the component reveal isn't fighting a moving target.
  const spin = (1 - approach) * progress * 0.9 - 0.35;

  return (
    <SceneShell active={active} lite={lite}>
      <CameraRig position={camera.position} target={camera.target} smooth={0.08} />
      <EntryPoints connect={connect} fade={ringFade} seal={seal} lite={lite} />
      <SystemCore assemble={separation} spin={spin} lite={lite} />
    </SceneShell>
  );
}
