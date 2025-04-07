import { ReactNode } from "react";
import AppHeader from "./AppHeader";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      <main className="flex-1 p-3 sm:p-4 md:p-6 max-w-7xl mx-auto w-full">
        {children}
      </main>
      <footer className="py-3 px-4 sm:py-4 sm:px-6 text-center text-xs sm:text-sm text-muted-foreground border-t border-border">
        <p> 2025 LAVIA. This app does not provide medical advice.</p>
      </footer>
    </div>
  );
};

export default AppLayout;
