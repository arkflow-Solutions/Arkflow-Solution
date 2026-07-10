"use client";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  X,
  MessageSquare,
  Filter,
  Users,
  Clock,
  BarChart3,
  ShieldCheck,
  CalendarCheck,
  Receipt,
  BellRing,
  Workflow,
  Globe,
  Phone,
  RefreshCw,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackageDashboard } from "@/components/home/package-dashboard";
import { accents, packageDetails, packageDetailOrder } from "@/lib/content";

const iconMap = {
  MessageSquare, Filter, Users, Clock, BarChart3, ShieldCheck,
  CalendarCheck, Receipt, BellRing, Workflow, Globe, Phone,
  RefreshCw, UserCheck,
} as const;

const ease = [0.22, 1, 0.36, 1] as const;

type DetailId = keyof typeof packageDetails;

/**
 * PackagePanel — the in-place "Explore" experience as a SHARED STAGE.
 *
 * The panel opens inline, directly beneath the row of package cards
 * (not as a floating modal). The cards stay visible above it and the
 * selected one stays highlighted. Switching tiers cross-fades the
 * content inside the same panel — it never collapses and reopens.
 * Driven entirely by packageDetails so all three tiers reuse one
 * component. All facts canonical.
 */
export function PackagePanel({
  openId,
  onClose,
  onSwitch,
}: {
  openId: DetailId | null;
  onClose: () => void;
  onSwitch: (id: DetailId) => void;
}) {
  const reduce = useReducedMotion();
  const detail = openId ? packageDetails[openId] : null;
  const accent = detail
    ? accents[detail.accent as keyof typeof accents].hex
    : "#3B82F6";

  return (
    <AnimatePresence initial={false}>
      {detail && (
        <motion.div
          key="stage"
          className="overflow-hidden"
          initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
          animate={
            reduce
              ? { opacity: 1 }
              : { height: "auto", opacity: 1 }
          }
          exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.55, ease }}
        >
          <motion.div
            role="region"
            aria-label={`${detail.name} details`}
            className="relative mt-8 overflow-hidden rounded-[20px] border border-white/10 bg-surface/80 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl"
            initial={reduce ? false : { y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.05, ease }}
          >
            {/* accent top rule */}
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[3px]"
              style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
            />
            {/* ambient tier glow */}
            <span
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
              style={{ background: `radial-gradient(circle, ${accent}, transparent 65%)` }}
            />

            {/* Tier switcher + close */}
            <div className="flex items-center justify-between border-b border-white/8 px-6 py-4 md:px-8">
              <div className="flex gap-1.5">
                {packageDetailOrder.map((id) => {
                  const active = id === openId;
                  const a = accents[packageDetails[id].accent as keyof typeof accents].hex;
                  return (
                    <button
                      key={id}
                      onClick={() => onSwitch(id)}
                      className="relative rounded-full px-3.5 py-1.5 font-mono text-eyebrow uppercase transition-colors"
                      style={{ color: active ? "#fff" : "rgba(209,213,219,0.6)" }}
                    >
                      {active && (
                        <motion.span
                          layoutId="tier-pill"
                          className="absolute inset-0 -z-10 rounded-full"
                          style={{ background: `${a}22`, border: `1px solid ${a}66` }}
                          transition={{ duration: 0.4, ease }}
                        />
                      )}
                      {packageDetails[id].name.replace("ArkFlow ", "")}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={onClose}
                aria-label="Close details"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-platinum transition-colors hover:bg-white/5 hover:text-white"
              >
                <X size={16} aria-hidden />
              </button>
            </div>

            {/* Cross-fading body — key on openId so switching animates */}
            <AnimatePresence mode="wait">
              <motion.div
                key={openId}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease }}
                className="p-6 md:p-10"
              >
                {/* Hero: copy left, conceptual visual right */}
                <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="font-mono text-eyebrow uppercase" style={{ color: accent }}>
                        {detail.name}
                      </p>
                      {"badge" in detail && detail.badge && (
                        <span
                          className="rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink"
                          style={{ background: accent }}
                        >
                          {detail.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 text-heading font-semibold">
                      {detail.headline}
                    </h3>
                    <p className="mt-4 max-w-prose text-body text-[color:var(--text-secondary)]">
                      {detail.description}
                    </p>

                    {/* Price + facts */}
                    <div className="mt-8 flex items-baseline gap-2">
                      <span className="text-display font-semibold">{detail.price}</span>
                      <span className="text-body text-[color:var(--text-tertiary)]">{detail.priceUnit}</span>
                    </div>
                    <ul className="mt-5 space-y-2.5">
                      {[detail.implementationFee, detail.minimumTerm, detail.guaranteeShort].map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-small text-[color:var(--text-secondary)]">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="mt-8">
                      <Button href="/contact" size="large" withArrow>
                        Book Your Free Discovery Call
                      </Button>
                      <p className="mt-3 font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                        No obligation · 30-minute strategy session
                      </p>
                    </div>
                  </div>

                  {/* Conceptual product visual (device frame) */}
                  <motion.div
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.1, ease }}
                  >
                    <PackageDashboard variant={detail.dashboard} accent={accent} />
                  </motion.div>
                </div>

                {/* Feature grid */}
                <div className="mt-14 border-t border-white/8 pt-10">
                  <p className="font-mono text-eyebrow uppercase text-[color:var(--text-tertiary)]">
                    Included systems
                  </p>
                  <div className="mt-6 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
                    {detail.features.map((f, i) => {
                      const Icon = iconMap[f.icon as keyof typeof iconMap] ?? MessageSquare;
                      return (
                        <motion.div
                          key={f.title}
                          className="flex gap-3.5"
                          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.15 + i * 0.05, ease }}
                        >
                          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.03]">
                            <Icon size={17} style={{ color: accent }} aria-hidden />
                          </span>
                          <div>
                            <h4 className="text-body font-medium text-white">{f.title}</h4>
                            <p className="mt-1 text-small text-[color:var(--text-secondary)]">{f.body}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
