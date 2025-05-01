
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Cryptocurrency } from "@/types/models";
import { CryptoIcon } from "./CryptoIcon";

// Updated mock data with more accurate prices from Binance (as of May 2025)
const mockCryptocurrencies: Cryptocurrency[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    logo: "bitcoin",
    balance: 0.0215,
    usdPrice: 78654.32,
    change24h: 2.75
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    logo: "ethereum",
    balance: 1.25,
    usdPrice: 4320.87,
    change24h: -0.82
  },
  {
    symbol: "BNB",
    name: "Binance Coin",
    logo: "bnb",
    balance: 5.5,
    usdPrice: 687.45,
    change24h: 3.14
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
    usdPrice: 243.67,
    change24h: 5.32
  },
  {
    symbol: "ADA",
    name: "Cardano",
    logo: "cardano",
    balance: 240.5,
    usdPrice: 0.98,
    change24h: -2.15
  },
  {
    symbol: "XRP",
    name: "Ripple",
    logo: "xrp",
    balance: 450.0,
    usdPrice: 1.23,
    change24h: 1.78
  }
];

export function CryptocurrencyList() {
  const [cryptocurrencies] = useState<Cryptocurrency[]>(mockCryptocurrencies);

  // Function to calculate total USD value
  const calculateUsdValue = (crypto: Cryptocurrency): number => {
    return crypto.balance * crypto.usdPrice;
  };

  // Function to get appropriate text color for price change
  const getPriceChangeColor = (change: number): string => {
    return change >= 0 ? "text-green-500" : "text-red-500";
  };

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CryptoIcon symbol="BTC" className="mr-2 h-5 w-5 text-yellow-500" />
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
                    <CryptoIcon 
                      symbol={crypto.symbol} 
                      className={`mr-2 h-5 w-5 ${crypto.symbol === "BTC" ? "text-yellow-500" : crypto.symbol === "ETH" ? "text-blue-500" : crypto.symbol === "USDT" ? "text-green-500" : "text-gray-500"}`} 
                    />
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
