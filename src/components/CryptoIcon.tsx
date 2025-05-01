
import React from "react";
import { 
  Bitcoin, 
  Coins,
  DollarSign
} from "lucide-react";

interface CryptoIconProps {
  symbol: string;
  className?: string;
  size?: number;
}

export function CryptoIcon({ symbol, className = "", size = 24 }: CryptoIconProps) {
  // Return the appropriate icon based on the cryptocurrency symbol
  switch (symbol) {
    case "BTC":
      return <Bitcoin className={className} size={size} />;
    case "USDT":
      return <DollarSign className={className} size={size} />;
    default:
      return <Coins className={className} size={size} />;
  }
}
