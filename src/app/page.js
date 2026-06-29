import HeroSection from "@/components/modules/home/HeroSection";
import CategoriesListServer from "@/components/modules/home/CategoriesListServer";
import SocialPromote from "@/components/modules/home/SocialPromote";
import YourComments from "@/components/modules/home/YourComments";
import LastProducts from "@/components/modules/home/LastProducts";
import FreeProducts from "@/components/modules/home/FreeProducts";

export default function HomePage() {
  return (
    <main className="flex flex-col gap-6">
      <HeroSection />
      <LastProducts />
      <CategoriesListServer />
      <FreeProducts />
      <SocialPromote />
      <YourComments />
    </main>
  );
}
