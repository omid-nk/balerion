import Image from "next/image";

export default function FooterNamads() {
  return (
    <div className="mt-4 flex gap-0.5">
      <div className="bg-light p-1.5">
        <Image
          src="/images/namads/e-namad.png"
          alt="e-namad"
          width={60}
          height={60}
        />
      </div>

      <div className="bg-light p-1.5">
        <Image
          src="/images/namads/namad-zarinpal.png"
          alt="zarinpal"
          width={60}
          height={60}
        />
      </div>

      <div className="bg-light p-1.5">
        <Image
          src="/images/namads/namad-zibal.png"
          alt="zibal"
          width={60}
          height={60}
        />
      </div>
    </div>
  );
}
