import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginForm() {
  const { loginMutation } = useAuth();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: FormData) => {
    loginMutation.mutate({
      username: data.username,
      password: data.password,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={field.onChange} 
                    id="remember-me" 
                  />
                </FormControl>
                <FormLabel htmlFor="remember-me" className="text-sm font-normal">
                  Remember me
                </FormLabel>
              </FormItem>
            )}
          />
          
          <Button variant="link" className="p-0 h-auto text-sm" type="button">
            Forgot password?
          </Button>
        </div>
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign in
        </Button>
      </form>
    </Form>
  );
}
