import { DollarSign, CreditCard, KeyRound, ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Transaction } from "@/types/models";
import { useState } from "react";
import { CryptocurrencyList } from "@/components/CryptocurrencyList";
import { CryptoIcon } from "@/components/CryptoIcon";

// Mock data for dashboard
const mockTransactions: Transaction[] = [
  {
    id: "tx1",
    type: "incoming",
    amount: 0.45,
    currency: "ETH",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    address: "0x1234...5678",
    status: "completed"
  },
  {
    id: "tx2",
    type: "outgoing",
    amount: 0.12,
    currency: "ETH",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    address: "0x8765...4321",
    status: "completed"
  },
  {
    id: "tx3",
    type: "incoming",
    amount: 1.25,
    currency: "ETH",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    address: "0x9876...1234",
    status: "completed"
  },
];

const Dashboard = () => {
  const { toast } = useToast();
  const [balance] = useState(3.58);
  const [keysCount] = useState(2);
  
  const handleCreateKey = () => {
    toast({
      title: "Creating new key",
      description: "Redirecting to key management...",
    });
  };
  
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }).format(date);
  };

  // Calculate the total USD value based on current ETH price
  const ethUsdPrice = 4320.87; // Updated ETH price
  const totalUsdValue = balance * ethUsdPrice;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button onClick={handleCreateKey}>Create New Key</Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{balance} ETH</div>
            <p className="text-xs text-muted-foreground">
              ~${totalUsdValue.toLocaleString(undefined, { maximumFractionDigits: 2 })} USD
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Keys</CardTitle>
            <KeyRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{keysCount}</div>
            <p className="text-xs text-muted-foreground">
              +0 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTransactions.length}</div>
            <p className="text-xs text-muted-foreground">
              +1 from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <CryptocurrencyList />
      
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Your recent crypto transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockTransactions.map(tx => (
              <div key={tx.id} className="flex items-center">
                <div className={`rounded-full p-2 ${tx.type === 'incoming' ? 'bg-green-100' : 'bg-red-100'}`}>
                  {tx.type === 'incoming' ? 
                    <ArrowDown className="h-4 w-4 text-green-600" /> : 
                    <ArrowUp className="h-4 w-4 text-red-500" />}
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {tx.type === 'incoming' ? 'Received' : 'Sent'} {tx.currency}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(tx.timestamp)}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  <span className={tx.type === 'incoming' ? 'text-green-500' : 'text-red-500'}>
                    {tx.type === 'incoming' ? '+' : '-'}{tx.amount} {tx.currency}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View All Transactions</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
