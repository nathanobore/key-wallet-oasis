
import { Sidebar } from "./Sidebar";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { toast } = useToast();
  
  useEffect(() => {
    toast({
      title: "Welcome to KeyWallet",
      description: "Manage your crypto keys and transactions securely",
    });
  }, [toast]);
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}
