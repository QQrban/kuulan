import Hero from '@/components/main_page/hero/Hero';
import Skills from '@/components/main_page/skills/Skills';
import Categories from '@/components/main_page/categories/Categories';
import Benefits from '@/components/main_page/benefits/Benefits';
import BottomCTA from '@/components/main_page/bottom_cta/BottomCTA';
import Footer from '@/components/main_page/footer/Footer';

export default function MainPage() {
  return (
    <div>
      <Hero />
      <Skills />
      <Categories />
      <Benefits />
      <BottomCTA />
      <Footer />
    </div>
  );
}
