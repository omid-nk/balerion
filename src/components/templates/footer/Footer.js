import FooterAbout from "./components/FooterAbout";
import FooterLinks from "./components/FooterLinks";
import FooterContact from "./components/FooterContact";
import FooterNewsletter from "./components/FooterNewsletter";
import FooterNamads from "./components/FooterNamads";
import FooterBottom from "./components/FooterBottom";

export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-16 mb-8 overflow-hidden rounded-3xl">
      <div className="mx-auto max-w-7xl sm:px-6 pt-12 pb-2">
        {/* MAIN GRID */}
        <div className="grid gap-12 lg:grid-cols-2 lg:divide-x lg:divide-white/10">
          {/* LEFT SIDE */}
          <div className="space-y-10 px-4">
            <FooterAbout />
            <FooterLinks />
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-10 px-4">
            <FooterNewsletter />
            <FooterContact />
            <FooterNamads />
          </div>
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
}
