import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";

export default function PricingTiers() {
  const { user } = useAuth();
  
  const getStartedHref = user ? "/dashboard" : "/auth?tab=register";
  const contactSalesHref = user ? "/dashboard" : "/auth?tab=register";
  
  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">Pricing Plans</h2>
          <p className="mt-4 text-lg text-gray-500">Choose the perfect plan for your needs</p>
        </div>
        
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:max-w-5xl lg:mx-auto xl:max-w-none xl:mx-0">
          {/* Starter Plan */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transform transition-transform">
            <div className="p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Starter</h3>
              <p className="mt-2 text-sm text-gray-500">Perfect for individuals and small teams</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">$29</span>
                <span className="text-base font-medium text-gray-500">/mo</span>
              </p>
              <Link href={getStartedHref}>
                <Button variant="outline" className="mt-8 w-full border-primary text-primary hover:bg-primary-50">
                  Get started
                </Button>
              </Link>
            </div>
            <div className="pt-6 pb-8 px-6">
              <h4 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h4>
              <ul className="mt-6 space-y-4">
                <li className="flex space-x-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-500">Up to 5 users</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-500">20 GB storage</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-500">10,000 API calls/day</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-500">Basic reporting</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-500">Email support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Professional Plan */}
          <div className="bg-white border border-primary-200 rounded-lg shadow-lg divide-y divide-gray-200 relative hover:-translate-y-1 transform transition-transform">
            <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
              <div className="inline-block px-4 py-1 text-sm font-semibold bg-primary text-white rounded-full">
                Most Popular
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Professional</h3>
              <p className="mt-2 text-sm text-gray-500">For growing businesses and teams</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">$79</span>
                <span className="text-base font-medium text-gray-500">/mo</span>
              </p>
              <Link href={getStartedHref}>
                <Button variant="default" className="mt-8 w-full">
                  Get started
                </Button>
              </Link>
            </div>
            <div className="pt-6 pb-8 px-6">
              <h4 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h4>
              <ul className="mt-6 space-y-4">
                <li className="flex space-x-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-500">Up to 20 users</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-500">100 GB storage</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-500">100,000 API calls/day</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-500">Advanced analytics</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-500">Priority email & chat support</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-500">SSO authentication</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1 transform transition-transform">
            <div className="p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Enterprise</h3>
              <p className="mt-2 text-sm text-gray-500">Tailored solutions for large organizations</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">$299</span>
                <span className="text-base font-medium text-gray-500">/mo</span>
              </p>
              <Link href={contactSalesHref}>
                <Button variant="outline" className="mt-8 w-full border-primary text-primary hover:bg-primary-50">
                  Contact sales
                </Button>
              </Link>
            </div>
            <div className="pt-6 pb-8 px-6">
              <h4 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h4>
              <ul className="mt-6 space-y-4">
                <li className="flex space-x-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-500">Unlimited users</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-500">1 TB storage</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-500">1,000,000 API calls/day</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-500">Custom reporting</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-500">24/7 phone & email support</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-500">Dedicated account manager</span>
                </li>
                <li className="flex space-x-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-500">Custom integrations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
