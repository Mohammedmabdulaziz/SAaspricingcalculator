import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActivePath = (path: string) => {
    return location === path;
  };
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <span className="text-primary-600 text-xl font-bold cursor-pointer">PriceCalc</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/">
                <a className={`${isActivePath("/") ? "border-primary-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  Pricing
                </a>
              </Link>
              <a href="#features" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Features
              </a>
              <a href="#about" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                About
              </a>
              <a href="#contact" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Contact
              </a>
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center">
                {user && (
                  <Link href="/dashboard">
                    <Button variant="outline" className="mr-2">Dashboard</Button>
                  </Link>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div>
                <Link href="/auth">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/auth?tab=register">
                  <Button variant="default" className="ml-2">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center sm:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="py-4">
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link href="/">
                      <a className={`${isActivePath("/") ? "bg-primary-50 border-primary-500 text-primary-700" : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`} onClick={() => setMobileMenuOpen(false)}>
                        Pricing
                      </a>
                    </Link>
                    <a href="#features" className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setMobileMenuOpen(false)}>
                      Features
                    </a>
                    <a href="#about" className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setMobileMenuOpen(false)}>
                      About
                    </a>
                    <a href="#contact" className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" onClick={() => setMobileMenuOpen(false)}>
                      Contact
                    </a>
                  </div>
                  
                  <div className="pt-4 pb-3 border-t border-gray-200">
                    {user ? (
                      <div className="space-y-1">
                        <p className="px-4 py-2 text-base font-medium text-gray-500">
                          Signed in as <span className="font-bold">{user.username}</span>
                        </p>
                        <Link href="/dashboard">
                          <a className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>
                            Dashboard
                          </a>
                        </Link>
                        <a href="#" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>
                          Settings
                        </a>
                        <button
                          onClick={() => {
                            handleLogout();
                            setMobileMenuOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                        >
                          Sign out
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-2 px-4">
                        <Link href="/auth">
                          <Button variant="outline" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                            Login
                          </Button>
                        </Link>
                        <Link href="/auth?tab=register">
                          <Button className="w-full" onClick={() => setMobileMenuOpen(false)}>
                            Sign up
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
