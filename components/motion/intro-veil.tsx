"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * IntroVeil — a 1-second breath before the page: ink, the wordmark,
 * then the site. Once per session; never under reduced motion.
 */
export function IntroVeil() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduce) return;
    try {
      if (sessionStorage.getItem("af-intro")) return;
      sessionStorage.setItem("af-intro", "1");
    } catch {
      /* storage unavailable — show once anyway */
    }
    setShow(true);
    const t = setTimeout(() => setShow(false), 1050);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <motion.p
            className="select-none text-2xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-white">ARK</span>
            <span className="text-blue">FLOW</span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
