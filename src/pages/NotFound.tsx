
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Skull, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-apex-darkgray to-apex-black p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="text-9xl font-bold text-apex-red opacity-10">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Skull className="w-20 h-20 text-apex-red" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-apex-black mb-2">
              You've Wandered Into Predator Territory
            </h1>
            
            <div className="flex items-center justify-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <p className="text-amber-500 font-medium">Dangerous Area</p>
            </div>
            
            <p className="text-apex-darkgray/70 mb-6">
              The page you're looking for has either been eaten by a predator or doesn't exist. 
              Let's get you back to safety.
            </p>
            
            <div className="relative w-full h-24 bg-apex-lightgray/50 rounded-lg mb-6 overflow-hidden">
              <div className="absolute bottom-0 right-6">
                <div className="text-5xl transform translate-y-2">🦈</div>
              </div>
              <div className="absolute bottom-0 left-10">
                <div className="text-5xl transform -scale-x-100 translate-y-3">🐊</div>
              </div>
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                <div className="text-6xl">🔍</div>
              </div>
            </div>
            
            <div className="space-y-3 w-full">
              <Button asChild className="w-full gap-2">
                <a href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Return to Safe Ground
                </a>
              </Button>
              
              <Button asChild variant="outline" className="w-full">
                <a href="/plans">
                  Browse Predator Insurance
                </a>
              </Button>
            </div>
            
            <p className="text-xs text-apex-darkgray/50 mt-6">
              Current location: {location.pathname}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
