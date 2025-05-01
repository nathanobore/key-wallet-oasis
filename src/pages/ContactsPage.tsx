
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Contact } from "@/types/models";
import { useState } from "react";
import { KeyUtils } from "@/services/KeyUtils";
import { Plus, Users, Send, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock contacts data
const initialContacts: Contact[] = [
  {
    id: "c1",
    name: "Alex Smith",
    publicKey: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
  },
  {
    id: "c2",
    name: "Jane Doe",
    publicKey: "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB"
  }
];

const ContactsPage = () => {
  const [contacts] = useState<Contact[]>(initialContacts);
  const { toast } = useToast();
  
  const handleAddContact = () => {
    toast({
      title: "Coming soon",
      description: "This feature will be available in future updates.",
    });
  };
  
  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Public key has been copied to your clipboard.",
      });
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
        <Button onClick={handleAddContact}><Plus className="mr-2 h-4 w-4" /> Add Contact</Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contacts.map(contact => (
          <Card key={contact.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-primary" />
                {contact.name}
              </CardTitle>
              <CardDescription>Contact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="text-sm text-muted-foreground w-full overflow-hidden text-ellipsis">
                  {KeyUtils.formatKeyForDisplay(contact.publicKey)}
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleCopyKey(contact.publicKey)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Transaction
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContactsPage;
