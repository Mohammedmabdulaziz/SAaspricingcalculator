import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CallToAction() {
  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Ready to try PriceCalc?
        </h2>
        <p className="mt-4 text-lg leading-6 text-primary-100">
          Start your free 14-day trial today. No credit card required.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <Link href="/auth?tab=register">
              <Button variant="secondary" size="lg">
                Get started
              </Button>
            </Link>
          </div>
          <div className="ml-3 inline-flex">
            <Button variant="outline" className="bg-primary-700 text-white hover:bg-primary-800 hover:text-white border-primary-700" size="lg">
              Contact sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
