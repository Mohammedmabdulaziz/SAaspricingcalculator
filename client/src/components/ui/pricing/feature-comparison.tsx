import { Check, X } from "lucide-react";

export default function FeatureComparison() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">Feature Comparison</h2>
          <p className="mt-4 text-lg text-gray-500">Compare plans to find the perfect fit</p>
        </div>
        
        <div className="mt-10 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th scope="col" className="py-3 pl-4 pr-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  Feature
                </th>
                <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  Starter
                </th>
                <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-primary uppercase tracking-wider bg-primary-50">
                  Professional
                </th>
                <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 bg-white">
                  Users
                </td>
                <td className="px-3 py-4 text-sm text-center text-gray-500 bg-white">
                  Up to 5
                </td>
                <td className="px-3 py-4 text-sm text-center text-gray-900 bg-primary-50">
                  Up to 20
                </td>
                <td className="px-3 py-4 text-sm text-center text-gray-500 bg-white">
                  Unlimited
                </td>
              </tr>
              <tr>
                <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 bg-gray-50">
                  Storage
                </td>
                <td className="px-3 py-4 text-sm text-center text-gray-500 bg-gray-50">
                  20 GB
                </td>
                <td className="px-3 py-4 text-sm text-center text-gray-900 bg-primary-50">
                  100 GB
                </td>
                <td className="px-3 py-4 text-sm text-center text-gray-500 bg-gray-50">
                  1 TB
                </td>
              </tr>
              <tr>
                <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 bg-white">
                  API Calls
                </td>
                <td className="px-3 py-4 text-sm text-center text-gray-500 bg-white">
                  10,000/day
                </td>
                <td className="px-3 py-4 text-sm text-center text-gray-900 bg-primary-50">
                  100,000/day
                </td>
                <td className="px-3 py-4 text-sm text-center text-gray-500 bg-white">
                  1,000,000/day
                </td>
              </tr>
              <tr>
                <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 bg-gray-50">
                  Analytics
                </td>
                <td className="px-3 py-4 text-sm text-center text-gray-500 bg-gray-50">
                  Basic
                </td>
                <td className="px-3 py-4 text-sm text-center text-gray-900 bg-primary-50">
                  Advanced
                </td>
                <td className="px-3 py-4 text-sm text-center text-gray-500 bg-gray-50">
                  Custom
                </td>
              </tr>
              <tr>
                <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 bg-white">
                  Support
                </td>
                <td className="px-3 py-4 text-sm text-center text-gray-500 bg-white">
                  Email
                </td>
                <td className="px-3 py-4 text-sm text-center text-gray-900 bg-primary-50">
                  Priority email & chat
                </td>
                <td className="px-3 py-4 text-sm text-center text-gray-500 bg-white">
                  24/7 phone & email
                </td>
              </tr>
              <tr>
                <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 bg-gray-50">
                  SSO Authentication
                </td>
                <td className="px-3 py-4 text-center bg-gray-50">
                  <X className="h-5 w-5 text-red-400 mx-auto" />
                </td>
                <td className="px-3 py-4 text-center bg-primary-50">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
                <td className="px-3 py-4 text-center bg-gray-50">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 bg-white">
                  Custom Integrations
                </td>
                <td className="px-3 py-4 text-center bg-white">
                  <X className="h-5 w-5 text-red-400 mx-auto" />
                </td>
                <td className="px-3 py-4 text-center bg-primary-50">
                  <X className="h-5 w-5 text-red-400 mx-auto" />
                </td>
                <td className="px-3 py-4 text-center bg-white">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 bg-gray-50">
                  Dedicated Account Manager
                </td>
                <td className="px-3 py-4 text-center bg-gray-50">
                  <X className="h-5 w-5 text-red-400 mx-auto" />
                </td>
                <td className="px-3 py-4 text-center bg-primary-50">
                  <X className="h-5 w-5 text-red-400 mx-auto" />
                </td>
                <td className="px-3 py-4 text-center bg-gray-50">
                  <Check className="h-5 w-5 text-green-500 mx-auto" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
