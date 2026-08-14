export function Mark({
  invert = false,
  size = 36,
  className = "",
  pressed = false,
}: {
  invert?: boolean;
  size?: number;
  className?: string;
  pressed?: boolean;
}) {
  const bg = invert ? "#15110C" : "#FFD23F";
  const fg = invert ? "#FFD23F" : "#15110C";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      className={className}
      aria-hidden
      style={{
        transform: pressed ? "translateY(3px) scale(0.94)" : undefined,
        transformOrigin: "center bottom",
        transition: "transform .16s cubic-bezier(.2,.8,.2,1)",
      }}
    >
      <rect width="80" height="80" rx="22" fill={bg} />
      <path fill={fg} d="M26 18h12v20h12v-10L68 45.5 50 64V54H26V18Z" />
    </svg>
  );
}
