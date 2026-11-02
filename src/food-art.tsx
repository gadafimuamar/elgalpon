import type { SVGProps } from "react";

interface FoodArtProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  bgColor?: string;
}

export function AlfajorMark({ size = 40, color = "#faedcd", bgColor, ...props }: FoodArtProps) {
  const r = size * 0.5;
  const cx = size * 0.5;
  const cy = size * 0.5;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      {/* Outer cocoa disc */}
      <circle cx={cx} cy={cy} r={r * 0.92} fill={bgColor ?? "#4a2c11"} />
      {/* Creamy inner ring */}
      <circle cx={cx} cy={cy} r={r * 0.72} fill={color} />
      {/* Dulce de leche blob */}
      <ellipse cx={cx - r * 0.12} cy={cy + r * 0.05} rx={r * 0.34} ry={r * 0.2} fill="#d4a373" opacity={0.95} />
      {/* Second blob */}
      <ellipse cx={cx + r * 0.18} cy={cy - r * 0.08} rx={r * 0.26} ry={r * 0.16} fill="#d4a373" opacity={0.85} />
      {/* Shine */}
      <ellipse cx={cx - r * 0.28} cy={cy - r * 0.3} rx={r * 0.12} ry={r * 0.05} fill="#fff8e8" opacity={0.7} />
      {/* Top cocoa nib */}
      <circle cx={cx + r * 0.05} cy={cy - r * 0.42} r={r * 0.05} fill="#4a2c11" />
    </svg>
  );
}

interface DishDecorProps extends SVGProps<SVGSVGElement> {
  opacity?: number;
}

export function DishDecor({ opacity = 0.12, ...props }: DishDecorProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
      style={{ display: "block", overflow: "visible" }}
    >
      <g opacity={opacity}>
        <circle cx={60} cy={60} r={40} fill="#7a4a21" />
        <circle cx={140} cy={70} r={36} fill="#4a2c11" />
        <circle cx={100} cy={140} r={44} fill="#7a4a21" />
        <circle cx={50} cy={140} r={28} fill="#4a2c11" />
        <ellipse cx={60} cy={60} rx={26} ry={14} fill="#d4a373" />
        <ellipse cx={140} cy={70} rx={22} ry={12} fill="#d4a373" />
        <ellipse cx={100} cy={140} rx={28} ry={15} fill="#d4a373" />
        <ellipse cx={50} cy={140} rx={18} ry={9} fill="#d4a373" />
      </g>
    </svg>
  );
}
