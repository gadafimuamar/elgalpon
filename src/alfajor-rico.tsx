import type { SVGProps } from "react";

interface AlfajorRicoProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function AlfajorRico({ size, ...props }: AlfajorRicoProps) {
  // Si no se pasa size, usa un valor por defecto coherente con el contenedor
  const s = size ?? 220;
  const cx = s * 0.5;
  const cy = s * 0.48;

  return (
    <svg
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {/* sombra suave debajo */}
      <ellipse cx={cx} cy={cy + s * 0.32} rx={s * 0.32} ry={s * 0.06} fill="#000" opacity={0.18} />

      {/* disco exterior — chocolate oscuro rico */}
      <circle cx={cx} cy={cy} r={s * 0.42} fill="#2a1608" />
      <circle cx={cx} cy={cy} r={s * 0.40} fill="#3b200f" />
      <circle cx={cx} cy={cy} r={s * 0.38} fill="#4a2c11" />

      {/* textura de grano sutil en el borde */}
      <circle cx={cx} cy={cy} r={s * 0.37} fill="#4a2c11" opacity={0.55} />
      <circle cx={cx} cy={cy} r={s * 0.37} fill="#3b200f" opacity={0.25} />

      {/* segundo disco — masilla/capa interior más clara */}
      <circle cx={cx} cy={cy} r={s * 0.30} fill="#f3e7d3" />
      <circle cx={cx} cy={cy} r={s * 0.29} fill="#fbf3e2" />

      {/* capa de dulce de leche generosa — el "relleno" */}
      <ellipse cx={cx - s * 0.06} cy={cy + s * 0.02} rx={s * 0.20} ry={s * 0.13} fill="#d4a373" />
      <ellipse cx={cx + s * 0.10} cy={cy - s * 0.04} rx={s * 0.16} ry={s * 0.10} fill="#e0b17a" />
      <ellipse cx={cx + s * 0.05} cy={cy + s * 0.08} rx={s * 0.11} ry={s * 0.07} fill="#c79567" opacity={0.9} />

      {/* brillo Dulce de leche — parte superior iluminada */}
      <ellipse cx={cx - s * 0.10} cy={cy - s * 0.10} rx={s * 0.10} ry={s * 0.05} fill="#f3d6a0" opacity={0.85} />
      <ellipse cx={cx - s * 0.14} cy={cy - s * 0.13} rx={s * 0.05} ry={s * 0.02} fill="#fff6dc" opacity={0.95} />

      {/* brillo en el chocolate — reflejo superior izquierdo */}
      <path
        d={`M ${cx - s*0.32} ${cy - s*0.20} Q ${cx - s*0.18} ${cy - s*0.34} ${cx - s*0.02} ${cy - s*0.30}`}
        stroke="#7a4a21"
        strokeWidth={s * 0.015}
        strokeLinecap="round"
        opacity={0.6}
        fill="none"
      />
      <path
        d={`M ${cx - s*0.30} ${cy - s*0.16} Q ${cx - s*0.16} ${cy - s*0.28} ${cx + s*0.02} ${cy - s*0.24}`}
          stroke="#fff3d6"
          strokeWidth={s * 0.012}
          strokeLinecap="round"
          opacity={0.55}
          fill="none"
        />

      {/* migaja/cacao nibs sobre el chocolate */}
      <circle cx={cx - s * 0.18} cy={cy - s * 0.13} r={s * 0.018} fill="#2a1608" opacity={0.85} />
      <circle cx={cx - s * 0.10} cy={cy - s * 0.18} r={s * 0.015} fill="#2a1608" opacity={0.8} />
      <circle cx={cx - s * 0.22} cy={cy - s * 0.08} r={s * 0.014} fill="#2a1608" opacity={0.7} />
      <circle cx={cx - s * 0.14} cy={cy + s * 0.06} r={s * 0.012} fill="#2a1608" opacity={0.7} />
      <circle cx={cx - s * 0.26} cy={cy - s * 0.05} r={s * 0.010} fill="#2a1608" opacity={0.65} />
      <circle cx={cx - s * 0.20} cy={cy + s * 0.12} r={s * 0.011} fill="#2a1608" opacity={0.6} />
      <circle cx={cx - s * 0.06} cy={cy - s * 0.14} r={s * 0.009} fill="#2a1608" opacity={0.6} />
      <circle cx={cx - s * 0.24} cy={cy + s * 0.02} r={s * 0.008} fill="#2a1608" opacity={0.55} />

      {/* brillo detallado en el dulce de leche */}
      <ellipse cx={cx - s * 0.14} cy={cy - s * 0.04} rx={s * 0.05} ry={s * 0.018} fill="#fff0c9" opacity={0.7} />

      {/* micro brillo superior del chocolate */}
      <ellipse cx={cx - s * 0.26} cy={cy - s * 0.30} rx={s * 0.04} ry={s * 0.012} fill="#fff3d6" opacity={0.6} />

      {/* definición de borde sutil */}
      <circle cx={cx} cy={cy} r={s * 0.40} fill="none" stroke="#2a1608" strokeWidth={s * 0.004} opacity={0.5} />
    </svg>
  );
}

