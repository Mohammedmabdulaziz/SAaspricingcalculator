import { useAuth } from "@/hooks/use-auth";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/ui/hero-section";
import PricingCalculator from "@/components/ui/pricing/calculator";
import PricingTiers from "@/components/ui/pricing/pricing-tiers";
import FeatureComparison from "@/components/ui/pricing/feature-comparison";
import CallToAction from "@/components/ui/call-to-action";
import { useRef } from "react";

export default function HomePage() {
  const { user } = useAuth();
  const calculatorRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  
  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection
          onTryCalculator={scrollToCalculator}
          onViewPricing={scrollToPricing}
        />
        
        <div ref={calculatorRef}>
          <PricingCalculator />
        </div>
        
        <div ref={pricingRef}>
          <PricingTiers />
        </div>
        
        <FeatureComparison />
        
        <CallToAction />
      </main>
      
      <Footer />
    </div>
  );
}
