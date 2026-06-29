import Image from "next/image";

export default function FooterNamads() {
  return (
    <div className="mt-6 flex gap-3">
      <div className="bg-light rounded-xl p-2">
        <Image
          src="/images/namads/e-namad.png"
          alt="e-namad"
          width={70}
          height={70}
        />
      </div>

      <div className="bg-light rounded-xl p-2">
        <Image
          src="/images/namads/namad-zarinpal.png"
          alt="zarinpal"
          width={70}
          height={70}
        />
      </div>

      <div className="bg-light rounded-xl p-2">
        <Image
          src="/images/namads/namad-zibal.png"
          alt="zibal"
          width={70}
          height={70}
        />
      </div>
    </div>
  );
}
