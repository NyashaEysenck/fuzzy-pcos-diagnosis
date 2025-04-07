import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { symptomsAPI } from "@/lib/api";

interface CycleStats {
  averageCycleLength: number | null;
  lastPeriod: string | null;
  nextExpectedPeriod: string | null;
  fertilityWindow: string | null;
}

const CycleStatistics = () => {
  const [cycleStats, setCycleStats] = useState<CycleStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCycleStatistics = async () => {
      try {
        setIsLoading(true);
        const response = await symptomsAPI.getCycleStatistics();
        setCycleStats(response.data.data.cycleStats);
        setError(null);
      } catch (error: any) {
        console.error("Error fetching cycle statistics:", error);
        setError(error.response?.data?.message || "Failed to fetch cycle statistics");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load your cycle statistics.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCycleStatistics();
  }, [toast]);

  return (
    <Card className="pcos-card mt-6">
      <CardHeader>
        <CardTitle className="text-pcos-teal">Cycle Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-pcos-teal" />
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              Unable to load cycle statistics
            </p>
          </div>
        ) : !cycleStats || (!cycleStats.averageCycleLength && !cycleStats.lastPeriod) ? (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              No cycle data available yet. Log your period symptoms to see statistics.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Average Cycle Length</span>
              <span className="font-semibold">
                {cycleStats.averageCycleLength ? `${cycleStats.averageCycleLength} days` : "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Last Period</span>
              <span className="font-semibold">
                {cycleStats.lastPeriod || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Next Expected Period</span>
              <span className="font-semibold">
                {cycleStats.nextExpectedPeriod || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Fertility Window</span>
              <span className="font-semibold">
                {cycleStats.fertilityWindow || "N/A"}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CycleStatistics;
