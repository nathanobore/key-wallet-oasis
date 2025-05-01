
import Dashboard from "./Dashboard";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { user } = useAuth();
  
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name || "User"}</h1>
        <p className="text-gray-600 mt-1">Manage your crypto assets securely</p>
      </div>
      <Dashboard />
    </>
  );
};

export default Index;
