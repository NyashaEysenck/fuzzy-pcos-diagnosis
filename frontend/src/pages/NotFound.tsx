
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center pcos-gradient-bg">
      <div className="text-center bg-white p-8 rounded-xl shadow-md max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="h-16 w-16 rounded-full bg-pcos-lavender/20 flex items-center justify-center">
            <AlertCircle size={32} className="text-pcos-lavender" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-pcos-dark">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! We couldn't find the page you're looking for.</p>
        <Button asChild className="bg-pcos-teal hover:bg-pcos-teal/90">
          <a href="/">Return to Dashboard</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
