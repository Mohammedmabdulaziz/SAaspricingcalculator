import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthPage() {
  const { user, isLoading } = useAuth();
  
  // Redirect to dashboard if user is already logged in
  if (user && !isLoading) {
    return <Redirect to="/dashboard" />;
  }
  
  return (
    <div className="min-h-screen flex">
      {/* Left Column - Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              <span className="text-primary">PriceCalc</span>
            </h1>
            <p className="text-gray-500 mt-2">Manage your SaaS pricing calculations</p>
          </div>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Right Column - Hero Image & Info */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-500 to-primary-800 text-white p-12 items-center justify-center">
        <div className="max-w-md">
          <h2 className="text-4xl font-bold mb-6">Calculate Your Perfect SaaS Plan</h2>
          <Separator className="my-6 bg-white/20" />
          <ul className="space-y-4">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Create custom pricing plans tailored to your needs</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Compare different pricing tiers and features</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Save and manage your pricing configurations</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Optimize your budget with usage-based pricing</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
