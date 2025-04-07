import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Calendar,
  BarChart3,
  Settings,
  Info,
  Menu, 
  X,
  BellRing
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import UserNav from "./UserNav";

const AppHeader = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: BarChart3 },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Resources', href: '/resources', icon: Info },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const renderNavigationItems = () => (
    <>
      {navigation.map((item) => (
        <Button
          key={item.name}
          variant={isActive(item.href) ? "secondary" : "ghost"}
          className="flex items-center gap-2"
          asChild
        >
          <Link to={item.href}>
            <item.icon size={18} />
            <span>{item.name}</span>
          </Link>
        </Button>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center gap-2">
        {isMobile && (
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] sm:w-[300px]">
              <div className="flex flex-col gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pcos-teal to-pcos-lavender flex items-center justify-center text-white font-bold">
                    LA
                  </div>
                  <h1 className="font-bold text-xl text-foreground">LAVIA</h1>
                </div>
                <nav className="flex flex-col gap-2">
                  {navigation.map((item) => (
                    <Button
                      key={item.name}
                      variant={isActive(item.href) ? "secondary" : "ghost"}
                      className="flex items-center justify-start gap-2"
                      asChild
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link to={item.href}>
                        <item.icon size={18} />
                        <span>{item.name}</span>
                      </Link>
                    </Button>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        )}
        
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pcos-teal to-pcos-lavender flex items-center justify-center text-white font-bold">
            LA
          </div>
          <h1 className="font-bold text-xl text-foreground hidden sm:block">LAVIA</h1>
        </div>
      </div>
      
      {!isMobile && (
        <nav className="hidden md:flex items-center gap-2">
          {renderNavigationItems()}
        </nav>
      )}
      
      <div className="flex items-center gap-2">
        <Button 
          variant={isActive('/settings') ? "secondary" : "ghost"} 
          size="icon"
          asChild
          className="md:hidden"
        >
          <Link to="/settings">
            <Settings size={20} />
          </Link>
        </Button>

        <UserNav />
      </div>
    </header>
  );
};

export default AppHeader;
