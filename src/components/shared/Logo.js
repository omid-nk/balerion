import Image from "next/image";
import Link from "next/link";

export default function Logo({ width = 100, height = 80, className = "w-28" }) {
  return (
    <Link href="/" className={`block h-fit ${className}`}>
      <Image
        src="/images/logo/balerion.png"
        alt="Balerion"
        width={width}
        height={height}
        priority
      />
    </Link>
  );
}
