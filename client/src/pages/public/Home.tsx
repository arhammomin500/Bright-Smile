import { HeroSection } from './home/HeroSection';
import {
  StatsSection,
  WhyChooseUsSection,
  TreatmentsSection,
  TechnologySection,
  DoctorsSection,
  BeforeAfterSection,
  TestimonialsSection,
  InsuranceSection,
  AwardsSection,
  FaqSection,
  BlogSection,
  MapContactSection,
} from './home/HomeSections';

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyChooseUsSection />
      <StatsSection />
      <TreatmentsSection />
      <TechnologySection />
      <DoctorsSection />
      <BeforeAfterSection />
      <TestimonialsSection />
      <InsuranceSection />
      <AwardsSection />
      <FaqSection />
      <BlogSection />
      <MapContactSection />
    </>
  );
}
