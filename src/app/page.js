import CategoriesListServer from "@/components/home/CategoriesListServer";
import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  return (
    <main className="flex flex-col gap-22">
      <HeroSection />
      <CategoriesListServer />
    </main>
  );
}
