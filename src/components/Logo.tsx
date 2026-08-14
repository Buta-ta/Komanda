import { Mark } from "./Mark";

export function Logo({
  className = "",
  invert = false,
  compact = false,
  size = 36,
}: {
  className?: string;
  invert?: boolean;
  compact?: boolean;
  size?: number;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Mark invert={invert} size={size} />
      {!compact && (
        <span className="font-display text-[1.35em] font-extrabold leading-none tracking-[-0.045em]">
          Komanda
        </span>
      )}
    </span>
  );
}
