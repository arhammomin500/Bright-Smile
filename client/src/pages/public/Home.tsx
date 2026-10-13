import { HeroSection } from './home/HeroSection';
import {
  WhyChooseUsSection,
  TreatmentsSection,
  TechnologySection,
  DoctorsSection,
  TestimonialsSection,
  FaqSection,
  BlogSection,
  MapContactSection,
} from './home/HomeSections';
import { usePageMeta } from '@/lib/usePageMeta';

export default function Home() {
  usePageMeta();
  return (
    <>
      <HeroSection />
      <WhyChooseUsSection />
      <TreatmentsSection />
      <TechnologySection />
      <DoctorsSection />
      <TestimonialsSection />
      <FaqSection />
      <BlogSection />
      <MapContactSection />
    </>
  );
}
