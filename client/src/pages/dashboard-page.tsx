import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { apiRequest } from "@/lib/queryClient";
import { PricingConfiguration } from "@shared/schema";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import PricingConfigCard from "@/components/dashboard/pricing-config-card";
import PricingCalculator from "@/components/ui/pricing/calculator";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, PlusCircle } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [configName, setConfigName] = useState("");
  const [currentConfig, setCurrentConfig] = useState<any>(null);
  
  // Fetch user's saved configurations
  const { 
    data: configurations, 
    isLoading, 
    error 
  } = useQuery<PricingConfiguration[]>({
    queryKey: ['/api/pricing-configurations'],
  });
  
  // Save configuration mutation
  const saveMutation = useMutation({
    mutationFn: async (data: { name: string; configuration: any }) => {
      const res = await apiRequest("POST", "/api/pricing-configurations", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/pricing-configurations'] });
      toast({
        title: "Configuration saved",
        description: "Your pricing configuration has been saved successfully.",
      });
      setDialogOpen(false);
      setConfigName("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to save configuration. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Delete configuration mutation
  const deleteMutation = useMutation({
    mutationFn: async (configId: number) => {
      await apiRequest("DELETE", `/api/pricing-configurations/${configId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/pricing-configurations'] });
      toast({
        title: "Configuration deleted",
        description: "Your pricing configuration has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete configuration. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  const handleSaveConfig = () => {
    if (!configName.trim()) {
      toast({
        title: "Error",
        description: "Please provide a name for your configuration.",
        variant: "destructive",
      });
      return;
    }
    
    saveMutation.mutate({
      name: configName,
      configuration: currentConfig
    });
  };
  
  const handleDeleteConfig = (configId: number) => {
    deleteMutation.mutate(configId);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {user?.username}!
            </h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Pricing Calculator</h2>
            <Separator className="my-4" />
            
            <PricingCalculator onConfigChange={setCurrentConfig} />
            
            <div className="mt-6 flex justify-end">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="default">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Save Configuration
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Save Configuration</DialogTitle>
                    <DialogDescription>
                      Give your pricing configuration a name to save it.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="config-name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="config-name"
                        value={configName}
                        onChange={(e) => setConfigName(e.target.value)}
                        className="col-span-3"
                        placeholder="e.g., My Business Plan"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" onClick={handleSaveConfig} disabled={saveMutation.isPending}>
                      {saveMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Save
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-4">Saved Configurations</h2>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <p className="text-red-500">Error loading your configurations. Please try again.</p>
            </div>
          ) : configurations && configurations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {configurations.map((config) => (
                <PricingConfigCard
                  key={config.id}
                  config={config}
                  onDelete={() => handleDeleteConfig(config.id)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <p className="text-gray-500">You don't have any saved configurations yet.</p>
              <p className="text-gray-500 mt-2">Use the calculator above to create and save your first configuration.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
