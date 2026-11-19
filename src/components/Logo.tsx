import Image from "next/image";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src="/logo-ao.png"
        alt="Abigail Ola Monogram"
        width={72}
        height={48}
        className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 hover:scale-105"
        priority
      />
      {showText && (
        <span className="font-display text-[20px] sm:text-[24px] md:text-[26px] font-bold tracking-tight text-[var(--forest-deep)] leading-none select-none">
          Abigail <span className="font-normal text-[var(--sage)]">Ola</span>
        </span>
      )}
    </span>
  );
}
