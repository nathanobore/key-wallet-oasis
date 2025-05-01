
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Bitcoin, ArrowUp, ArrowDown } from "lucide-react";
import { Badge } from "./ui/badge";
import { Cryptocurrency } from "@/types/models";

// Mock data for popular cryptocurrencies from Binance
const mockCryptocurrencies: Cryptocurrency[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    logo: "bitcoin",
    balance: 0.0215,
    usdPrice: 42356.78,
    change24h: 1.45
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    logo: "ethereum",
    balance: 1.25,
    usdPrice: 2356.12,
    change24h: -0.82
  },
  {
    symbol: "BNB",
    name: "Binance Coin",
    logo: "bnb",
    balance: 5.5,
    usdPrice: 324.56,
    change24h: 2.34
  },
  {
    symbol: "USDT",
    name: "Tether",
    logo: "usdt",
    balance: 350.25,
    usdPrice: 1.0,
    change24h: 0.01
  },
  {
    symbol: "SOL",
    name: "Solana",
    logo: "solana",
    balance: 12.75,
    usdPrice: 98.76,
    change24h: 4.52
  },
  {
    symbol: "ADA",
    name: "Cardano",
    logo: "cardano",
    balance: 240.5,
    usdPrice: 0.45,
    change24h: -1.23
  },
  {
    symbol: "XRP",
    name: "Ripple",
    logo: "xrp",
    balance: 450.0,
    usdPrice: 0.65,
    change24h: 0.98
  }
];

export function CryptocurrencyList() {
  const [cryptocurrencies] = useState<Cryptocurrency[]>(mockCryptocurrencies);

  // Function to calculate total USD value
  const calculateUsdValue = (crypto: Cryptocurrency): number => {
    return crypto.balance * crypto.usdPrice;
  };

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bitcoin className="mr-2 h-5 w-5 text-yellow-500" />
          Cryptocurrencies
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Current Price</TableHead>
              <TableHead>24h Change</TableHead>
              <TableHead className="text-right">Value (USD)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cryptocurrencies.map((crypto) => (
              <TableRow key={crypto.symbol}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Bitcoin className="mr-2 h-5 w-5 text-yellow-500" />
                    <div>
                      <div>{crypto.name}</div>
                      <div className="text-sm text-muted-foreground">{crypto.symbol}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{crypto.balance.toFixed(4)} {crypto.symbol}</TableCell>
                <TableCell>${crypto.usdPrice.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {crypto.change24h > 0 ? (
                      <>
                        <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                        <span className="text-green-500">{crypto.change24h.toFixed(2)}%</span>
                      </>
                    ) : (
                      <>
                        <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                        <span className="text-red-500">{Math.abs(crypto.change24h).toFixed(2)}%</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">${calculateUsdValue(crypto).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
