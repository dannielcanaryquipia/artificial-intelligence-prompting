import { useId } from "react";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  const gradientId = useId().replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="Prompting 101 logo"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#B45309" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${gradientId})`} />
      <path
        d="M9.5 21 16 16 9.5 11"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="18.5" y="14.2" width="4.6" height="3.6" rx="1.8" fill="#FFFFFF" />
    </svg>
  );
}