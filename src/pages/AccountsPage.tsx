import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Account } from "@/types/models";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { CryptoIcon } from "@/components/CryptoIcon";

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

// Updated rates based on the current prices in CryptocurrencyList
const getUsdValue = (amount: number, currency: string) => {
  const rates: Record<string, number> = {
    "BTC": 78654.32,
    "ETH": 4320.87,
    "BNB": 687.45,
    "USDT": 1.0,
    "SOL": 243.67,
    "ADA": 0.98,
    "XRP": 1.23
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
                  <CryptoIcon 
                    symbol={account.currency} 
                    className={`h-5 w-5 ${
                      account.currency === "BTC" ? "text-yellow-500" : 
                      account.currency === "ETH" ? "text-blue-500" : 
                      account.currency === "USDT" ? "text-green-500" : 
                      account.currency === "SOL" ? "text-purple-500" :
                      account.currency === "BNB" ? "text-yellow-500" : 
                      "text-gray-500"
                    }`} 
                  />
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
