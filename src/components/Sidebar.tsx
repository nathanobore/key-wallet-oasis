
import { Wallet, Key, KeyRound, CreditCard, DollarSign, User, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const menuItems = [
    { title: "Dashboard", path: "/", icon: <Wallet className="w-5 h-5" /> },
    { title: "Keys", path: "/keys", icon: <KeyRound className="w-5 h-5" /> },
    { title: "Transactions", path: "/transactions", icon: <CreditCard className="w-5 h-5" /> },
    { title: "Accounts", path: "/accounts", icon: <User className="w-5 h-5" /> },
    { title: "Contacts", path: "/contacts", icon: <Users className="w-5 h-5" /> },
  ];

  return (
    <div className={cn(
      "flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && <h1 className="text-xl font-bold text-primary-600">KeyWallet</h1>}
        <button 
          className="p-1 rounded-md hover:bg-gray-100"
          onClick={() => setCollapsed(prev => !prev)}
        >
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>
      <div className="flex flex-col flex-1 py-4 overflow-y-auto">
        <nav className="flex-1">
          <ul className="px-2 space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={cn(
                    "flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-primary-100 group",
                    location.pathname === item.path ? "bg-primary-100 text-primary" : ""
                  )}
                >
                  <span className={cn(
                    "text-gray-500 group-hover:text-primary",
                    location.pathname === item.path ? "text-primary" : ""
                  )}>
                    {item.icon}
                  </span>
                  {!collapsed && <span className="ml-3">{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="p-4 border-t">
        <div className={cn(
          "flex items-center p-3 rounded-md bg-primary-100",
          collapsed && "justify-center"
        )}>
          <DollarSign className="w-5 h-5 text-primary" />
          {!collapsed && <span className="ml-3 text-sm font-medium">Pro Version</span>}
        </div>
      </div>
    </div>
  );
}
