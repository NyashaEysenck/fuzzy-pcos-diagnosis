
import { useState } from "react";
import { 
  Bell, 
  User, 
  Shield, 
  Moon, 
  Sun,
  Monitor,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "@/providers/ThemeProvider";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  
  // Notification states
  const [resourceUpdates, setResourceUpdates] = useState(true);
  const [newsAndArticles, setNewsAndArticles] = useState(true);
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor size={18} /> Appearance
            </CardTitle>
            <CardDescription>
              Customize how LAVIA looks on your device
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm font-medium">Theme</p>
              <RadioGroup 
                value={theme} 
                onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light" className="flex items-center gap-2">
                    <Sun size={16} /> Light
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark" className="flex items-center gap-2">
                    <Moon size={16} /> Dark
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="system" />
                  <Label htmlFor="system" className="flex items-center gap-2">
                    <Monitor size={16} /> System
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell size={18} /> Notifications
            </CardTitle>
            <CardDescription>
              Control what notifications you receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="resource-updates">Resource updates</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when we add new resources
                </p>
              </div>
              <Switch
                id="resource-updates"
                checked={resourceUpdates}
                onCheckedChange={setResourceUpdates}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="news">News and articles</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about new articles
                </p>
              </div>
              <Switch
                id="news"
                checked={newsAndArticles}
                onCheckedChange={setNewsAndArticles}
              />
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info size={18} /> About LAVIA
            </CardTitle>
            <CardDescription>
              Application information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Version:</span> 1.0.0
            </p>
            <p className="text-sm">
              <span className="font-medium">Released:</span> April 2025
            </p>
            <p className="text-sm">
              <span className="font-medium">Technology:</span> This application uses fuzzy logic to provide personalized health insights.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button 
          className="bg-pcos-purple hover:bg-pcos-purple/90"
          onClick={handleSaveSettings}
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;
