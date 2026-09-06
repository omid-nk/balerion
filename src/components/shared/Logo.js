import Image from "next/image";
import Link from "next/link";

export default function Logo({ width, height }) {
  return (
    <Link href="/" className={`block w-full`}>
      <Image
        src="/images/logo/balerion-logo.png"
        alt="Balerion"
        width={120}
        height={100}
        priority
        className="w-24 sm:w-26"
      />
    </Link>
  );
}
