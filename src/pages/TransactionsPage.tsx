
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Transaction } from "@/types/models";
import { ArrowUp, ArrowDown, Search, KeyRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock transaction data
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
  {
    id: "tx4",
    type: "outgoing",
    amount: 0.08,
    currency: "ETH",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
    address: "0x5432...9876",
    status: "completed"
  },
  {
    id: "tx5",
    type: "incoming",
    amount: 0.33,
    currency: "ETH",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120),
    address: "0x2468...1357",
    status: "completed"
  },
];

const TransactionsPage = () => {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const { toast } = useToast();
  
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    }).format(date);
  };
  
  const handleSendTransaction = () => {
    if (!amount || !address) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Transaction sent",
      description: `You sent ${amount} ETH to ${address}.`,
    });
    
    setAmount("");
    setAddress("");
  };
  
  const filteredTransactions = searchQuery
    ? transactions.filter(tx => 
        tx.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.amount.toString().includes(searchQuery)
      )
    : transactions;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button><ArrowUp className="mr-2 h-4 w-4" /> New Transaction</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Send Transaction</DialogTitle>
              <DialogDescription>
                Send cryptocurrency to another wallet address.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount (ETH)</Label>
                <Input 
                  id="amount" 
                  type="number" 
                  placeholder="0.00" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="key">From Key</Label>
                <Select defaultValue="key1">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a key" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="key1">Main Wallet</SelectItem>
                    <SelectItem value="key2">Investment Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Recipient Address</Label>
                <Input 
                  id="address" 
                  placeholder="0x..." 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSendTransaction}>Send</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex w-full max-w-sm items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search transactions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Transactions</SelectItem>
            <SelectItem value="incoming">Incoming</SelectItem>
            <SelectItem value="outgoing">Outgoing</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map(tx => (
                <div key={tx.id} className="flex items-center">
                  <div className={`rounded-full p-3 ${tx.type === 'incoming' ? 'bg-green-100' : 'bg-red-100'}`}>
                    {tx.type === 'incoming' ? 
                      <ArrowDown className="h-5 w-5 text-green-600" /> : 
                      <ArrowUp className="h-5 w-5 text-red-500" />}
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="font-medium">
                      {tx.type === 'incoming' ? 'Received from' : 'Sent to'} {tx.address}
                    </p>
                    <div className="flex items-center">
                      <KeyRound className="h-3 w-3 mr-1 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        {tx.id} • {formatDate(tx.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <div className={`font-medium text-right ${tx.type === 'incoming' ? 'transaction-positive' : 'transaction-negative'}`}>
                      {tx.type === 'incoming' ? '+' : '-'}{tx.amount} {tx.currency}
                    </div>
                    <p className="text-xs text-gray-500 text-right">
                      {tx.status}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No transactions found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;
