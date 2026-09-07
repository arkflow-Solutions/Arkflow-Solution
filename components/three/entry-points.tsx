"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { ENTRY_POINTS } from "@/lib/vehicle-geometry";

const BLUE = "#1A3CFF";
/** An opportunity in flight. */
const FLOW = "#BFD2FF";
/** Revenue leaving. Canonical amber, used for loss and nothing else. */
const LEAK = "#D97706";

/** The system at the centre. Hoisted: this used to be allocated per
 *  pulse per frame, which is garbage on a 60fps loop. */
const CORE = new THREE.Vector3(0, 0.8, 0);

/**
 * The customer entry points — the doors an enquiry actually arrives
 * through: Website, WhatsApp, Instagram, Google, Phone, Email. Each
 * sits in a ring with a line running inward, and a pulse travelling
 * that line IS one opportunity moving through the business.
 *
 * WHAT THIS SCENE MEANS (Phase 3E hero correction).
 *
 * It previously showed every pulse reaching the centre — many ways in,
 * one system they feed. True, but it was the wrong half of the story:
 * the homepage opens by claiming the business is LEAKING revenue, and
 * the hero showed nothing being lost. The literal version of that
 * argument (LeakFlow) was rendered only on devices too weak for WebGL,
 * so the visitors who got the cinematic scene got the abstract one and
 * the visitors on a low-end phone got the meaningful one. Backwards.
 *
 * Now some opportunities do not make it. They travel their line, reach
 * an unattended handover, stall, turn amber and fall away. `seal`
 * closes those handovers: at 0 the gaps are open and revenue drops out
 * of frame; at 1 every opportunity completes in blue.
 *
 * That is the whole argument of the site, told in the first eight
 * seconds, with no terminology required:
 *
 *   enquiries arrive → they move → some get stuck → the connected
 *   system keeps them moving.
 *
 * No new scene, no new canvas, no new dependency — the same geometry,
 * given a meaning.
 */
export function EntryPoints({
  connect = 0,
  fade = 1,
  seal = 0,
  lite = false,
}: {
  /** 0 = disconnected, 1 = fully flowing into the vehicle. */
  connect?: number;
  /** Overall opacity, used to retire the ring as the camera closes in. */
  fade?: number;
  /**
   * 0 = handovers unattended, opportunities fall out.
   * 1 = handovers closed, every opportunity reaches the system.
   * Same parameter name and meaning as the Throughline's `seal`, so the
   * hero and the rest of the page speak about loss in one vocabulary.
   */
  seal?: number;
  /**
   * Phone profile. Six nodes instead of nine, and no drei <Html>
   * labels — those are real DOM elements repositioned every frame,
   * which is the single most expensive thing in this scene on mobile.
   */
  lite?: boolean;
}) {
  const pulses = useRef<THREE.Group>(null);

  const nodes = useMemo(
    () =>
      (lite ? ENTRY_POINTS.filter((_, i) => i % 3 !== 2) : ENTRY_POINTS).map(
        (e, i) => {
          const x = Math.cos(e.angle) * e.radius;
          const z = Math.sin(e.angle) * e.radius;
          return {
            ...e,
            pos: new THREE.Vector3(x, e.y, z),
            /* Deterministic, so the composition never reshuffles between
               renders and nothing random runs during SSR.

               A third of the doors leak: 3 of 9 on desktop, 2 of 6 on
               the phone profile. Tuned down from a half, which read as a
               broken business rather than a leaking one — the claim is
               that revenue escapes through gaps, not that nothing works.
               It also stopped Website, the capability this page points
               at, from being the most visible failure in the scene. */
            leaks: (i * 5 + 2) % 7 < 2,
            /** How far along its line the opportunity gets before it stalls. */
            gap: 0.34 + ((i * 3) % 4) * 0.09,
          };
        }
      ),
    [lite]
  );

  /** One geometry for every inbound line — a single draw call. */
  const lines = useMemo(() => {
    const pts: number[] = [];
    nodes.forEach((n) => {
      pts.push(n.pos.x, n.pos.y, n.pos.z, 0, 0.8, 0);
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, [nodes]);

  useFrame(({ clock }) => {
    if (!pulses.current || connect < 0.02) return;
    const t = clock.getElapsedTime();
    pulses.current.children.forEach((child, i) => {
      const n = nodes[i];
      const m = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      // Each opportunity runs door → system on its own offset phase.
      const p = ((t * 0.32 + i * 0.11) % 1) * connect;

      /* A closing handover moves the stall point outward, so sealing
         reads as the gap being repaired rather than as the loss simply
         being hidden. At seal = 1 the stall point is the system itself
         and nothing is lost. */
      const gap = n.leaks ? n.gap + (1 - n.gap) * seal : 1;

      if (p <= gap) {
        // In flight, and still on the line.
        child.position.lerpVectors(n.pos, CORE, p);
        m.color.set(FLOW);
        m.opacity = Math.sin(p * Math.PI) * connect * fade;
        return;
      }

      /* Past the handover nobody owns. It stops where it stopped, turns
         amber and drops out of the line — the visitor sees revenue
         leave rather than merely fade. */
      const fall = (p - gap) / (1 - gap);
      child.position.lerpVectors(n.pos, CORE, gap);
      child.position.y -= fall * fall * 1.3;
      m.color.set(LEAK);
      m.opacity = (1 - fall) * Math.sin(gap * Math.PI) * connect * fade;
    });
  });

  return (
    <group>
      <lineSegments geometry={lines}>
        <lineBasicMaterial
          color={BLUE}
          transparent
          opacity={(0.06 + connect * 0.34) * fade}
        />
      </lineSegments>

      {nodes.map((n) => (
        <group key={n.label} position={n.pos}>
          <mesh>
            <octahedronGeometry args={[0.11, 0]} />
            <meshBasicMaterial
              color={BLUE}
              transparent
              opacity={(0.4 + connect * 0.6) * fade}
            />
          </mesh>
          {!lite && fade > 0.25 && (
            <Html
              center
              distanceFactor={11}
              position={[0, 0.34, 0]}
              style={{ pointerEvents: "none" }}
            >
              <span className="af-entry-label" style={{ opacity: fade }}>
                {n.label}
              </span>
            </Html>
          )}
        </group>
      ))}

      <group ref={pulses}>
        {nodes.map((n) => (
          <mesh key={`p-${n.label}`} position={n.pos}>
            <sphereGeometry args={[0.055, 6, 6]} />
            <meshBasicMaterial color="#BFD2FF" transparent opacity={0} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
