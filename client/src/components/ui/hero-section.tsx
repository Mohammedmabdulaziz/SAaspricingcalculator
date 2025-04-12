import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  onTryCalculator: () => void;
  onViewPricing: () => void;
};

export default function HeroSection({ onTryCalculator, onViewPricing }: HeroSectionProps) {
  return (
    <section className="pt-10 pb-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Calculate Your Perfect <span className="text-primary">SaaS Plan</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Find the perfect pricing plan for your needs with our interactive calculator. Pay only for what you use.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Button onClick={onTryCalculator} size="lg">
                Try the calculator
              </Button>
            </div>
            <div className="ml-3 inline-flex">
              <Button onClick={onViewPricing} variant="outline" size="lg">
                View pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
