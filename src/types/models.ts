
export interface Transaction {
  id: string;
  type: 'incoming' | 'outgoing';
  amount: number;
  currency: string;
  timestamp: Date;
  address: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface WalletKey {
  id: string;
  name: string;
  privateKey: string;
  publicKey: string;
  createdAt: Date;
  lastUsed?: Date;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
  currency: string;
  keyId?: string;
}

export interface Contact {
  id: string;
  name: string;
  publicKey: string;
}
