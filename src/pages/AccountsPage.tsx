
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Account } from "@/types/models";
import { useState } from "react";
import { Bitcoin, Coins, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

// Mock accounts data with multiple currencies
const initialAccounts: Account[] = [
  {
    id: "acc1",
    name: "Main ETH Account",
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
  },
  {
    id: "acc3",
    name: "Bitcoin Wallet",
    balance: 0.0215,
    currency: "BTC",
    keyId: "key3"
  },
  {
    id: "acc4",
    name: "Binance Coin",
    balance: 5.5,
    currency: "BNB",
    keyId: "key4"
  },
  {
    id: "acc5",
    name: "Solana Wallet",
    balance: 12.75,
    currency: "SOL",
    keyId: "key5"
  },
  {
    id: "acc6",
    name: "USDT Reserve",
    balance: 350.25,
    currency: "USDT",
    keyId: "key6"
  }
];

// Helper function to get color and icon based on currency
const getCurrencyDetails = (currency: string) => {
  switch (currency) {
    case "BTC":
      return { color: "bg-yellow-100 text-yellow-600", icon: <Bitcoin className="h-5 w-5 text-yellow-500" /> };
    case "ETH":
      return { color: "bg-blue-100 text-blue-600", icon: <Coins className="h-5 w-5 text-blue-500" /> };
    case "BNB":
      return { color: "bg-yellow-100 text-yellow-600", icon: <Coins className="h-5 w-5 text-yellow-500" /> };
    case "USDT":
      return { color: "bg-green-100 text-green-600", icon: <Coins className="h-5 w-5 text-green-500" /> };
    case "SOL":
      return { color: "bg-purple-100 text-purple-600", icon: <Coins className="h-5 w-5 text-purple-500" /> };
    default:
      return { color: "bg-gray-100 text-gray-600", icon: <Coins className="h-5 w-5 text-gray-500" /> };
  }
};

// Helper to get USD value based on currency
const getUsdValue = (amount: number, currency: string) => {
  const rates: Record<string, number> = {
    "BTC": 42356.78,
    "ETH": 2356.12,
    "BNB": 324.56,
    "USDT": 1.0,
    "SOL": 98.76,
    "ADA": 0.45,
    "XRP": 0.65
  };
  
  return amount * (rates[currency] || 0);
};

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
        {accounts.map(account => {
          const { color, icon } = getCurrencyDetails(account.currency);
          const usdValue = getUsdValue(account.balance, account.currency);
          
          return (
            <Card key={account.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{account.name}</CardTitle>
                  <Badge variant="outline">{account.currency}</Badge>
                </div>
                <CardDescription>Linked to {account.keyId.replace('key', 'Wallet #')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  {icon}
                  <span className="text-2xl font-bold">{account.balance} {account.currency}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  ~${usdValue.toLocaleString(undefined, { maximumFractionDigits: 2 })} USD
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">View Details</Button>
                <Button>Send</Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AccountsPage;
