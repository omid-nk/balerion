import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="w-24">
      <Image
        src="/images/logo/logo-balerion.png"
        alt="Balerion Logo"
        width={100}
        height={50}
        className="h-auto w-auto"
      />
    </Link>
  );
}
