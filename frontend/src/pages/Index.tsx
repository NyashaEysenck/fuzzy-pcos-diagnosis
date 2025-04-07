
import { useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  // This is a mock authentication check - in a real app, you would check
  // if the user is actually authenticated
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <AppLayout>
      <Dashboard />
    </AppLayout>
  );
};

export default Index;
