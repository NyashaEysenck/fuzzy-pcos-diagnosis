import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, ClipboardList, Heart, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/providers/AuthProvider";
import SymptomsTracker from "@/components/dashboard/SymptomsTracker";
import SymptomHistory from "@/components/dashboard/SymptomHistory";
import PCOSAnalysis from "@/components/dashboard/PCOSAnalysis";
import { assessmentAPI } from "@/lib/api";

interface Assessment {
  _id: string;
  user: string;
  menstrualScore: number;
  hormonalScore: number;
  metabolicScore: number;
  overallRiskScore: number;
  riskCategory: string;
  recommendations: string[];
  createdAt: string;
  updatedAt: string;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchLatestAssessment = async () => {
      try {
        setIsLoading(true);
        const response = await assessmentAPI.getLatestAssessment();
        setAssessment(response.data.data.assessment);
        setError(null);
      } catch (error: any) {
        console.error("Error fetching assessment:", error);
        // Only show error if it's not a "no assessment found" error
        if (error.response?.status !== 404) {
          setError(error.response?.data?.message || "Failed to fetch assessment data");
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load your PCOS assessment data.",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestAssessment();
  }, [toast]);

  const handleSymptomLogged = () => {
    // Refresh the symptom history component when a new symptom is logged
    toast({
      title: "Dashboard Updated",
      description: "Your symptom history has been updated.",
    });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || "User"}! Track your symptoms and view insights.
          </p>
        </div>
        <div className="mt-2 md:mt-0">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            <span className="mr-1">💜</span> Fuzzy Logic Powered
          </span>
        </div>
      </div>

      {/* Feature Display Section */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-8">
        <Card 
          className="bg-slate-50 border-none shadow-sm hover:shadow transition-shadow duration-200 cursor-pointer"
          onClick={() => setActiveTab("symptoms")}
        >
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-purple-100 p-3 rounded-full">
                <ClipboardList className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg">Record Symptoms</h3>
              <p className="text-sm text-muted-foreground">Track changes over time</p>
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className="bg-slate-50 border-none shadow-sm hover:shadow transition-shadow duration-200 cursor-pointer"
          onClick={() => setActiveTab("analysis")}
        >
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-pink-100 p-3 rounded-full">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="font-semibold text-lg">Smart Analysis</h3>
              <p className="text-sm text-muted-foreground">Fuzzy logic assessment</p>
            </div>
          </CardContent>
        </Card>
        
        <Card 
          className="bg-slate-50 border-none shadow-sm hover:shadow transition-shadow duration-200 cursor-pointer"
          onClick={() => setActiveTab("overview")}
        >
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="bg-teal-100 p-3 rounded-full">
                <Lightbulb className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="font-semibold text-lg">Personalized Insights</h3>
              <p className="text-sm text-muted-foreground">Tailored recommendations</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium">PCOS Risk Score</CardTitle>
                  <CardDescription>Based on your latest assessment</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-pcos-teal" />
                  </div>
                ) : assessment ? (
                  <div className="text-center py-2">
                    <div className="text-3xl font-bold text-pcos-lavender">
                      {Math.round(assessment.overallRiskScore * 100)}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Risk Category: {assessment.riskCategory}
                    </p>
                    <Button 
                      variant="link" 
                      className="mt-2 text-pcos-teal p-0 h-auto"
                      onClick={() => setActiveTab("analysis")}
                    >
                      View detailed analysis
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">No assessment data available</p>
                    <Button 
                      variant="link" 
                      className="mt-2 text-pcos-teal p-0 h-auto"
                      onClick={() => setActiveTab("analysis")}
                    >
                      Take PCOS assessment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                <CardDescription>Track and manage your PCOS</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left" 
                  onClick={() => setActiveTab("symptoms")}
                >
                  Log today's symptoms
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  onClick={() => window.location.href = "/calendar"}
                >
                  View calendar
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  onClick={() => window.location.href = "/resources"}
                >
                  Browse resources
                </Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 lg:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Recommendations</CardTitle>
                <CardDescription>Personalized for your PCOS profile</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin text-pcos-teal" />
                  </div>
                ) : assessment && assessment.recommendations && assessment.recommendations.length > 0 ? (
                  <ul className="space-y-2 text-sm">
                    {assessment.recommendations.slice(0, 3).map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                    {assessment.recommendations.length > 3 && (
                      <Button 
                        variant="link" 
                        className="mt-1 text-pcos-teal p-0 h-auto"
                        onClick={() => setActiveTab("analysis")}
                      >
                        View all recommendations
                      </Button>
                    )}
                  </ul>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">
                      Complete your assessment to get personalized recommendations
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <SymptomHistory />
            <SymptomsTracker onSymptomLogged={handleSymptomLogged} />
          </div>
        </TabsContent>

        <TabsContent value="symptoms" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-1">
              <SymptomsTracker onSymptomLogged={handleSymptomLogged} />
            </div>
            <div className="md:col-span-2">
              <SymptomHistory />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <PCOSAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
