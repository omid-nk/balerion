import CategoriesListServer from "@/components/home/CategoriesListServer";
import HeroSection from "@/components/home/HeroSection";
import SocialPromote from "@/components/home/SocialPromote";
import StudentComments from "@/components/home/StudentComments";

export default function Home() {
  return (
    <main className="flex flex-col gap-22">
      <HeroSection />
      <CategoriesListServer />
      <SocialPromote />
      <StudentComments />
    </main>
  );
}
