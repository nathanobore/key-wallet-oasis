
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Account } from "@/types/models";
import { useState } from "react";
import { DollarSign, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock accounts data
const initialAccounts: Account[] = [
  {
    id: "acc1",
    name: "Main Account",
    balance: 2.58,
    currency: "ETH",
    keyId: "key1"
  },
  {
    id: "acc2",
    name: "Investment Fund",
    balance: 1.0,
    currency: "ETH",
    keyId: "key2"
  }
];

const AccountsPage = () => {
  const [accounts] = useState<Account[]>(initialAccounts);
  const { toast } = useToast();
  
  const handleAddAccount = () => {
    toast({
      title: "Coming soon",
      description: "This feature will be available in future updates.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
        <Button onClick={handleAddAccount}><Plus className="mr-2 h-4 w-4" /> Add Account</Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map(account => (
          <Card key={account.id}>
            <CardHeader>
              <CardTitle>{account.name}</CardTitle>
              <CardDescription>Linked to {account.keyId === "key1" ? "Main Wallet" : "Investment Account"}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{account.balance} {account.currency}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">View Details</Button>
              <Button>Send</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AccountsPage;
