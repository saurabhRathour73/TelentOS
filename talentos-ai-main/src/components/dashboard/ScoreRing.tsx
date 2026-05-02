import { motion } from "framer-motion";

export default function ScoreRing({ value, size = 140, label }: { value: number; size?: number; label?: string }) {
  const r = (size - 20) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (Math.max(0, Math.min(100, value)) / 100) * c;
  const color = value >= 80 ? "hsl(var(--success))" : value >= 60 ? "hsl(var(--primary))" : "hsl(var(--warning))";
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} stroke="hsl(var(--secondary))" strokeWidth="12" fill="none" />
        <motion.circle
          cx={size/2} cy={size/2} r={r}
          stroke={color} strokeWidth="12" fill="none" strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: off }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="font-display text-3xl font-extrabold">{value}</div>
          {label && <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mt-0.5">{label}</div>}
        </div>
      </div>
    </div>
  );
}
