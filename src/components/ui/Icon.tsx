import type { SVGProps } from "react";

/**
 * Hand-drawn 24x24 icon set (stroke, currentColor) — no icon library needed,
 * so nothing is fetched at runtime. Add a key here and use it in the JSON content.
 */
const paths: Record<string, React.ReactNode> = {
  book: (<><path d="M4 5.5A2 2 0 0 1 6 3.5h5v15H6a2 2 0 0 0-2 2z" /><path d="M20 5.5a2 2 0 0 0-2-2h-5v15h5a2 2 0 0 1 2 2z" /><path d="M11 3.5v15" /></>),
  bulb: (<><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9V16h7v-2.1A6 6 0 0 0 12 3z" /><path d="M10.5 16.5 12 21l1.5-4.5" /></>),
  monitor: (<><rect x="2.5" y="4" width="19" height="12.5" rx="2" /><path d="M8.5 20h7M12 16.5V20" /></>),
  star: (<path d="M12 3.5l2.6 5.3 5.9.85-4.3 4.15 1.03 5.85L12 16.95 6.77 19.6 7.8 13.8 3.5 9.65l5.9-.85z" />),
  shield: (<><path d="M12 3l7.5 3v5.5c0 4.4-3 8.2-7.5 9.5-4.5-1.3-7.5-5.1-7.5-9.5V6z" /><path d="M9 11.8l2.2 2.2 4-4.2" /></>),
  globe: (<><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.2 3.6 8.5S14.4 18.1 12 20.5c-2.4-2.4-3.6-5.2-3.6-8.5S9.6 5.9 12 3.5z" /></>),
  clock: (<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.2V12l3.4 2.1" /></>),
  users: (<><circle cx="9" cy="8.5" r="3.2" /><path d="M3.5 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" /><path d="M16 5.6a3.2 3.2 0 0 1 0 6M17.6 19.5c0-2.4-.7-4-1.9-4.9" /></>),
  flask: (<><path d="M9 3.5h6M10.5 3.5v5.2L5.8 17a2.2 2.2 0 0 0 1.9 3.4h8.6a2.2 2.2 0 0 0 1.9-3.4l-4.7-8.3V3.5" /><path d="M7.6 14h8.8" /></>),
  heart: (<path d="M12 20s-7.5-4.3-7.5-9.4A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7.5 3c0 5.1-7.5 9.4-7.5 9.4z" />),
  trophy: (<><path d="M7 4h10v4.5a5 5 0 0 1-10 0z" /><path d="M7 5.5H4.5A2.5 2.5 0 0 0 7 9M17 5.5h2.5A2.5 2.5 0 0 1 17 9" /><path d="M12 13.5V17M8.5 20h7M9.5 17h5" /></>),
  bus: (<><rect x="3.5" y="5" width="17" height="11.5" rx="2.2" /><path d="M3.5 11h17M8 5v6M16 5v6" /><circle cx="7.5" cy="19" r="1.6" /><circle cx="16.5" cy="19" r="1.6" /></>),
  mic: (<><rect x="9.5" y="3" width="5" height="10" rx="2.5" /><path d="M6 11.5a6 6 0 0 0 12 0M12 17.5V21M9 21h6" /></>),
  music: (<><path d="M9 18V6.5l10-2V16" /><circle cx="6.5" cy="18" r="2.5" /><circle cx="16.5" cy="16" r="2.5" /></>),
  ball: (<><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5l3.2 2.3-1.2 3.8h-4l-1.2-3.8z" /><path d="M12 3.5v4M4.4 9.6l3.6 1.2M19.6 9.6 16 10.8M7 19.4l2.9-5.8M17 19.4l-2.9-5.8" /></>),
  waves: (<path d="M3 9c2.5-2.4 4.5-2.4 6 0s3.5 2.4 6 0M3 14c2.5-2.4 4.5-2.4 6 0s3.5 2.4 6 0M3 19c2.5-2.4 4.5-2.4 6 0s3.5 2.4 6 0" />),
  leaf: (<><path d="M5 19C4 12 8.5 5.5 19.5 4.5 20.5 15 14 20 5 19z" /><path d="M5.5 19.5C8 14 12 10.5 17 8.5" /></>),
  camera: (<><rect x="2.5" y="6.5" width="19" height="13" rx="2.5" /><path d="M8 6.5 9.6 4h4.8L16 6.5" /><circle cx="12" cy="13" r="3.6" /></>),
  cpu: (<><rect x="7" y="7" width="10" height="10" rx="2" /><path d="M10.5 10.5h3v3h-3z" /><path d="M12 3.5V7M12 17v3.5M3.5 12H7M17 12h3.5M7.5 4.5v0M16.5 4.5v0" /></>),
  target: (<><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.6" /><circle cx="12" cy="12" r="1.1" fill="currentColor" /></>),
  eye: (<><path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="3.1" /></>),
  compass: (<><circle cx="12" cy="12" r="8.5" /><path d="M14.8 9.2 13 13l-3.8 1.8L11 11z" /></>),
  mail: (<><rect x="2.5" y="5" width="19" height="14" rx="2.4" /><path d="m3.5 7 8.5 6 8.5-6" /></>),
  phone: (<path d="M6.5 3.5h3l1.4 3.6-2 1.4a10.6 10.6 0 0 0 4.6 4.6l1.4-2 3.6 1.4v3a2 2 0 0 1-2.2 2A14.8 14.8 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5z" />),
  pin: (<><path d="M12 21s6.5-6.1 6.5-10.4A6.5 6.5 0 0 0 5.5 10.6C5.5 14.9 12 21 12 21z" /><circle cx="12" cy="10.4" r="2.5" /></>),
  download: (<><path d="M12 3.5v11M7.5 10.5 12 15l4.5-4.5" /><path d="M4 17v2.5h16V17" /></>),
  file: (<><path d="M6 3.5h7.5L19 9v11.5H6z" /><path d="M13.5 3.5V9H19" /><path d="M8.6 13h6.8M8.6 16.4h4.8" /></>),
  image: (<><rect x="3" y="4.5" width="18" height="15" rx="2.4" /><circle cx="8.6" cy="9.8" r="1.7" /><path d="m4 16.5 4.6-4 3.4 3 3-2.6 4.9 4.2" /></>),
  calendar: (<><rect x="3.5" y="5.5" width="17" height="15" rx="2.4" /><path d="M3.5 10h17M8 3.5v4M16 3.5v4" /><path d="M7.5 13.5h3v3h-3z" fill="currentColor" opacity=".5" /></>),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  "chevron-down": <path d="m5.5 9 6.5 6.5L18.5 9" />,
  "chevron-right": <path d="m9 5.5 6.5 6.5L9 18.5" />,
  "arrow-right": <><path d="M4 12h15" /><path d="m13.5 6.5 5.5 5.5-5.5 5.5" /></>,
  "arrow-up-right": <><path d="M7 17 17 7" /><path d="M8.5 7H17v8.5" /></>,
  "arrow-left": <><path d="M20 12H5" /><path d="M10.5 6.5 5 12l5.5 5.5" /></>,
  menu: <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />,
  close: <path d="m5.5 5.5 13 13M18.5 5.5l-13 13" />,
  search: (<><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>),
  quote: (<><path d="M9.5 6.5C6.5 8 5 10.5 5 14c0 2.2 1.3 3.5 3 3.5S11 16.2 11 14.5 9.8 11.5 8 11.5c-.4 0-.8 0-1 .2.3-1.6 1.4-2.9 3-3.9z" /><path d="M19 6.5c-3 1.5-4.5 4-4.5 7.5 0 2.2 1.3 3.5 3 3.5s3-1.3 3-3-1.2-3-3-3c-.4 0-.8 0-1 .2.3-1.6 1.4-2.9 3-3.9z" /></>),
  play: <path d="M8 5.5 19 12 8 18.5z" />,
  edit: (<><path d="M4 20h4L19 9l-4-4L4 16z" /><path d="m14.5 5.5 4 4" /></>),
  receipt: (<><path d="M6 3.5h12v17l-3-1.8-3 1.8-3-1.8-3 1.8z" /><path d="M9 8h6M9 12h6" /></>),
  printer: (<><path d="M7 8.5V4h10v4.5" /><rect x="3.5" y="8.5" width="17" height="7.5" rx="2" /><path d="M7 16h10v4H7z" /></>),
  share: (<><circle cx="18" cy="6" r="2.6" /><circle cx="6" cy="12" r="2.6" /><circle cx="18" cy="18" r="2.6" /><path d="m8.4 10.8 7.2-3.6M8.4 13.2l7.2 3.6" /></>),
  external: (<><path d="M14 4h6v6" /><path d="m20 4-8.5 8.5" /><path d="M18.5 14v5.5A1 1 0 0 1 17.5 20.5H5.5a1 1 0 0 1-1-1V7.5A1 1 0 0 1 5.5 6.5H11" /></>),
  sparkles: (<><path d="M12 3.5l1.7 4.3L18 9.5l-4.3 1.7L12 15.5l-1.7-4.3L6 9.5l4.3-1.7z" /><path d="M18 15.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" /></>),
  lock: (<><rect x="4.5" y="10.5" width="15" height="10" rx="2.2" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /><path d="M12 14v3" /></>),
  facebook: <path d="M14.5 8.5H17V5.4h-2.7c-2.4 0-3.8 1.5-3.8 3.9v1.7H8v3.1h2.5V21h3.2v-6.9h2.4l.4-3.1h-2.8V9.7c0-.8.3-1.2.8-1.2z" />,
  instagram: (<><rect x="3.5" y="3.5" width="17" height="17" rx="4.6" /><circle cx="12" cy="12" r="3.9" /><circle cx="16.7" cy="7.4" r="1.05" fill="currentColor" /></>),
  youtube: (<><rect x="2.5" y="5" width="19" height="14" rx="4" /><path d="M10.3 9.2 15.4 12l-5.1 2.8z" /></>),
  whatsapp: (<><path d="M3.6 20.4 5 16.6A8 8 0 1 1 8 19.3z" /><path d="M9 9.6c0 3 2.4 5.4 5.4 5.4.6 0 1-.5 1-1l-1.4-.8-.9.9a4.6 4.6 0 0 1-2-2l.9-.9-.8-1.4c-.5 0-1 .4-1 1z" fill="currentColor" /></>),
  x: <path d="M4.5 4.5 19 19.5M19 4.5 4.5 19.5" />,
  award: (<><circle cx="12" cy="9.5" r="5.5" /><path d="m8.5 14 -1 6 4.5-2.2 4.5 2.2-1-6" /></>),
  building: (<><rect x="4.5" y="4" width="15" height="16" rx="1.8" /><path d="M8.5 8h3M12.5 8h3M8.5 12h3M12.5 12h3M8.5 16h3M12.5 16h3" /></>),
  graduation: (<><path d="M12 4.5 21.5 9 12 13.5 2.5 9z" /><path d="M6 11v4.5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V11" /></>),
};

export type IconName = keyof typeof paths;

export function Icon({
  name,
  size = 24,
  className,
  strokeWidth = 1.6,
  ...rest
}: { name: string; size?: number; strokeWidth?: number } & SVGProps<SVGSVGElement>) {
  const shape = paths[name] ?? paths.sparkles;
  const solid = ["star", "quote", "facebook", "youtube", "play", "heart", "ball", "leaf", "target"].includes(name);
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={solid ? "currentColor" : "none"}
      stroke={solid ? "none" : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {shape}
    </svg>
  );
}
