import { PricingConfiguration } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { 
  calculateTotalPrice, 
  getRecommendedTier 
} from "@/lib/pricing-utils";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2, Calendar, Users, Database, Repeat } from "lucide-react";

type PricingConfigCardProps = {
  config: PricingConfiguration;
  onDelete: () => void;
};

export default function PricingConfigCard({ config, onDelete }: PricingConfigCardProps) {
  const { name, configuration, createdAt } = config;
  const pricingConfig = configuration as any;
  const totalPrice = calculateTotalPrice(pricingConfig);
  const recommendedTier = getRecommendedTier(pricingConfig);
  const timeAgo = formatDistance(new Date(createdAt), new Date(), { addSuffix: true });
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge variant="secondary">{recommendedTier}</Badge>
        </div>
        <p className="text-gray-500 text-xs flex items-center mt-1">
          <Calendar className="h-3 w-3 mr-1" />
          Saved {timeAgo}
        </p>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="mb-4">
          <p className="text-2xl font-bold">
            ${totalPrice.toFixed(2)}
            <span className="text-sm font-normal text-gray-500">
              /{pricingConfig.billingCycle === 'monthly' ? 'mo' : 'yr'}
            </span>
          </p>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-gray-400" />
            <span>{pricingConfig.users} users</span>
          </div>
          <div className="flex items-center">
            <Database className="h-4 w-4 mr-2 text-gray-400" />
            <span>{pricingConfig.storage} GB storage</span>
          </div>
          <div className="flex items-center">
            <Repeat className="h-4 w-4 mr-2 text-gray-400" />
            <span>{pricingConfig.apiCalls.toLocaleString()} API calls/day</span>
          </div>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {pricingConfig.features.analytics && (
            <Badge variant="outline" className="text-xs">Analytics</Badge>
          )}
          {pricingConfig.features.support && (
            <Badge variant="outline" className="text-xs">Support</Badge>
          )}
          {pricingConfig.features.sso && (
            <Badge variant="outline" className="text-xs">SSO</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" className="ml-auto">
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the pricing configuration "{name}". This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
