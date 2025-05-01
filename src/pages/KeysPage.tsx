
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyUtils } from "@/services/KeyUtils";
import { WalletKey } from "@/types/models";
import { KeyRound, Eye, EyeOff, Copy, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for keys
const initialKeys: WalletKey[] = [
  {
    id: "key1",
    name: "Main Wallet",
    privateKey: KeyUtils.generatePrivateKey(),
    publicKey: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "key2",
    name: "Investment Account",
    privateKey: KeyUtils.generatePrivateKey(),
    publicKey: "0x8282205aB0d783F14B021546d824EC09A9168829",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    lastUsed: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  }
];

const KeysPage = () => {
  const [keys, setKeys] = useState<WalletKey[]>(initialKeys);
  const [newKeyName, setNewKeyName] = useState("");
  const [showPrivateKey, setShowPrivateKey] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  const togglePrivateKeyVisibility = (id: string) => {
    setShowPrivateKey(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: `${type} has been copied to your clipboard.`,
      });
    });
  };
  
  const handleCreateKey = () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Error",
        description: "Please provide a name for your new key.",
        variant: "destructive",
      });
      return;
    }
    
    const privateKey = KeyUtils.generatePrivateKey();
    const publicKey = KeyUtils.derivePublicKey(privateKey);
    
    const newKey: WalletKey = {
      id: `key${keys.length + 1}`,
      name: newKeyName,
      privateKey,
      publicKey,
      createdAt: new Date(),
    };
    
    setKeys(prev => [...prev, newKey]);
    setNewKeyName("");
    
    toast({
      title: "Key created",
      description: `Your new key "${newKeyName}" has been created successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Key Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Create New Key</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Key</DialogTitle>
              <DialogDescription>
                Generate a new cryptographic key pair for your wallet.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Key Name</Label>
                <Input 
                  id="name" 
                  placeholder="My Key Name" 
                  value={newKeyName} 
                  onChange={(e) => setNewKeyName(e.target.value)} 
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateKey}>Create Key</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {keys.map(key => (
          <Card key={key.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <KeyRound className="mr-2 h-5 w-5 text-primary" />
                {key.name}
              </CardTitle>
              <CardDescription>
                Created {formatDate(key.createdAt)}
                {key.lastUsed && ` • Last used ${formatDate(key.lastUsed)}`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Public Key</Label>
                <div className="flex items-center">
                  <div className="flex-1 overflow-hidden text-ellipsis bg-gray-50 p-2 rounded-md border text-sm">
                    {key.publicKey}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => copyToClipboard(key.publicKey, "Public key")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Private Key</Label>
                <div className="flex items-center">
                  <div className="flex-1 overflow-hidden text-ellipsis bg-gray-50 p-2 rounded-md border text-sm">
                    {showPrivateKey[key.id] ? key.privateKey : "••••••••••••••••••••••••••••••••"}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => togglePrivateKeyVisibility(key.id)}
                  >
                    {showPrivateKey[key.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  {showPrivateKey[key.id] && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => copyToClipboard(key.privateKey, "Private key")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Export Key</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KeysPage;
