import { cx } from "@/lib/utils";

/**
 * The LIS crest: drawn as inline SVG so it stays crisp at any size, prints well,
 * and can be recoloured by the theme. Replace with a scanned logo by dropping
 * public/crest.svg in and setting `logo.override` in content/site.json.
 */
export function Crest({ size = 76, className }: { size?: number; className?: string }) {
  const id = "crest-arc";
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" className={cx("shrink-0", className)} role="img" aria-label="Leaders International School crest">
      <defs>
        <path id={id} d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
        <linearGradient id="crest-navy" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0d4b93" />
          <stop offset="0.55" stopColor="#00275c" />
          <stop offset="1" stopColor="#02132c" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="url(#crest-navy)" />
      <circle cx="60" cy="60" r="57" fill="none" stroke="#fdcb24" strokeWidth="1.6" />
      <circle cx="60" cy="60" r="35.5" fill="#f5f8fc" />
      <circle cx="60" cy="60" r="35.5" fill="none" stroke="#fdcb24" strokeWidth="1.4" />
      <text fill="#fdcb24" style={{ fontFamily: "var(--font-display, Poppins, sans-serif)", fontSize: 8.6, fontWeight: 700, letterSpacing: "1.4px" }}>
        <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
          LEADERS INTERNATIONAL SCHOOL
        </textPath>
      </text>
      {/* laurel */}
      <g stroke="#7ba5db" strokeWidth="1.7" fill="none" opacity=".9">
        <path d="M31 74c-6-8-7-19-2-27" />
        <path d="M89 74c6-8 7-19 2-27" />
      </g>
      <g fill="#adc8ea" opacity=".9">
        <ellipse cx="28.5" cy="60" rx="3.4" ry="1.7" transform="rotate(-28 28.5 60)" />
        <ellipse cx="27.6" cy="68" rx="3.4" ry="1.7" transform="rotate(-14 27.6 68)" />
        <ellipse cx="91.5" cy="60" rx="3.4" ry="1.7" transform="rotate(28 91.5 60)" />
        <ellipse cx="92.4" cy="68" rx="3.4" ry="1.7" transform="rotate(14 92.4 68)" />
      </g>
      {/* torch + flame */}
      <path d="M60 30c4.5 5.2 6.8 8.7 6.8 11.8A6.8 6.8 0 0 1 53.2 42c0-3.2 2.3-6.7 6.8-12z" fill="#fdcb24" />
      <path d="M60 36.4c2 2.6 2.9 4.2 2.9 5.6a2.9 2.9 0 1 1-5.8 0c0-1.4.9-3 2.9-5.6z" fill="#fff" opacity=".85" />
      <rect x="57.6" y="43" width="4.8" height="4" rx="1.2" fill="#0d3c7c" />
      <path d="M58.2 47h3.6l1 17h-5.6z" fill="#0d3c7c" />
      {/* open book */}
      <path d="M60 70.5c-4-3-9-4-14-3.4v12.6c5-.6 10 .4 14 3.4 4-3 9-4 14-3.4V67.1c-5-.6-10 .4-14 3.4z" fill="#0d3c7c" />
      <path d="M60 70.5v12.6" stroke="#f5f8fc" strokeWidth="1.4" />
      <path d="M49.5 72.5h7M63.5 72.5h7M49.5 76h6M64.5 76h6" stroke="#adc8ea" strokeWidth="1.1" />
      {/* motto banner */}
      <path d="M22 88h76l-6 6 6 6H22l6-6z" fill="#fdcb24" />
      <text x="60" y="95.6" textAnchor="middle" fill="#02132c" style={{ fontFamily: "var(--font-display, Poppins, sans-serif)", fontSize: 7.4, fontWeight: 700, letterSpacing: ".4px" }}>
        LEARN TODAY · LEAD TOMORROW
      </text>
    </svg>
  );
}
