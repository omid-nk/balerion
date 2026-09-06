import CategoriesListServer from "@/components/home/CategoriesListServer";
import FreeProducts from "@/components/home/FreeProducts";
import HeroSection from "@/components/home/HeroSection";
import LastProducts from "@/components/home/LastProducts";
import SocialPromote from "@/components/home/SocialPromote";
import StudentComments from "@/components/home/StudentComments";

export default function Home() {
  return (
    <main className="flex flex-col gap-22">
      <HeroSection />
      <LastProducts />
      <CategoriesListServer />
      <FreeProducts />
      <SocialPromote />
      <StudentComments />
    </main>
  );
}
