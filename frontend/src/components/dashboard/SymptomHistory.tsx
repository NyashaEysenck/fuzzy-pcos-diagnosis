import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { Loader2, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { symptomsAPI } from "@/lib/api";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { format, parseISO } from "date-fns";

interface SymptomData {
  _id: string;
  user: string;
  date: string;
  mood: number;
  painLevel: number;
  bloating: number;
  fatigue: number;
  acne: number;
  hairLoss: number;
  cravings: number;
  headache: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const SymptomHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [symptoms, setSymptoms] = useState<SymptomData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("7days");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(["mood", "pain"]);
  const { toast } = useToast();

  // Symptom display configuration
  const symptomConfig = {
    mood: { color: "#8884d8", label: "Mood" },
    pain: { color: "#ff7300", label: "Pain" },
    bloating: { color: "#4AC6B7", label: "Bloating" },
    fatigue: { color: "#ff0000", label: "Fatigue" },
    acne: { color: "#82ca9d", label: "Acne" },
    hairLoss: { color: "#8dd1e1", label: "Hair Loss" },
    cravings: { color: "#a4de6c", label: "Cravings" },
    headache: { color: "#d0ed57", label: "Headache" }
  };

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        setIsLoading(true);
        
        // Calculate date range based on selected timeRange
        const endDate = new Date();
        const startDate = new Date();
        
        switch (timeRange) {
          case "7days":
            startDate.setDate(endDate.getDate() - 7);
            break;
          case "30days":
            startDate.setDate(endDate.getDate() - 30);
            break;
          case "90days":
            startDate.setDate(endDate.getDate() - 90);
            break;
          default:
            startDate.setDate(endDate.getDate() - 7);
        }
        
        const response = await symptomsAPI.getSymptomsByDateRange(
          startDate.toISOString(),
          endDate.toISOString()
        );
        
        setSymptoms(response.data.data.symptoms);
        setError(null);
      } catch (error: any) {
        console.error("Error fetching symptoms:", error);
        setError(error.response?.data?.message || "Failed to fetch symptom data");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load your symptom history.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSymptoms();
  }, [timeRange, toast]);

  // Process data for charts
  const processedData = symptoms.map(symptom => {
    // Convert string severity values back to numeric values
    const severityToNumber = (severity: string | number | undefined): number => {
      // If it's already a number, return it
      if (typeof severity === 'number') return severity;
      
      if (!severity || severity === 'none' || severity === '') return 0;
      if (severity === 'mild') return 3;
      if (severity === 'moderate') return 6;
      if (severity === 'severe') return 9;
      return 0; // Default
    };

    // Parse notes field for additional symptom data that isn't in the model
    let moodValue = 5; // Default neutral mood
    let painValue = 0;
    let bloatingValue = 0;
    let headacheValue = 0;

    if (symptom.notes) {
      // Try to extract values from notes
      const moodMatch = symptom.notes.match(/Mood: (\d+)\/10/);
      if (moodMatch && moodMatch[1]) {
        moodValue = parseInt(moodMatch[1], 10);
      }

      const painMatch = symptom.notes.match(/Pain: (none|mild|moderate|severe)/i);
      if (painMatch && painMatch[1]) {
        painValue = severityToNumber(painMatch[1].toLowerCase());
      }

      const bloatingMatch = symptom.notes.match(/Bloating: (none|mild|moderate|severe)/i);
      if (bloatingMatch && bloatingMatch[1]) {
        bloatingValue = severityToNumber(bloatingMatch[1].toLowerCase());
      }

      const headacheMatch = symptom.notes.match(/Headache: (none|mild|moderate|severe)/i);
      if (headacheMatch && headacheMatch[1]) {
        headacheValue = severityToNumber(headacheMatch[1].toLowerCase());
      }
    }

    // Ensure proper date parsing and formatting
    let formattedDate = '';
    try {
      // Parse the date string to a Date object
      const dateObj = new Date(symptom.date);
      // Format the date as MMM d (e.g., Apr 6)
      formattedDate = format(dateObj, 'MMM d');
    } catch (error) {
      console.error("Error parsing date:", symptom.date, error);
      formattedDate = 'Invalid date';
    }

    return {
      rawDate: new Date(symptom.date), // Keep raw date for sorting
      date: formattedDate,
      mood: moodValue,
      pain: painValue,
      bloating: bloatingValue,
      fatigue: severityToNumber(symptom.fatigue),
      acne: severityToNumber(symptom.acne),
      hairLoss: severityToNumber(symptom.hairLoss),
      cravings: severityToNumber(symptom.cravings),
      headache: headacheValue
    };
  }).sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime());

  // Calculate averages for the summary view
  const calculateAverages = () => {
    if (symptoms.length === 0) return [];
    
    // Define the symptom types we want to display
    const symptomTypes = [
      { key: 'mood', label: 'Mood' },
      { key: 'pain', label: 'Pain' },
      { key: 'bloating', label: 'Bloating' },
      { key: 'fatigue', label: 'Fatigue' },
      { key: 'acne', label: 'Acne' },
      { key: 'hairLoss', label: 'Hair Loss' },
      { key: 'cravings', label: 'Cravings' },
      { key: 'headache', label: 'Headache' }
    ];
    
    const averages = symptomTypes.map(type => {
      // Get values from processed data to ensure we're using the converted numeric values
      const values = processedData.map(data => data[type.key as keyof typeof data] as number);
      const sum = values.reduce((acc, val) => acc + (isNaN(val) ? 0 : val), 0);
      const avg = sum / values.length;
      
      return {
        name: type.label,
        value: isNaN(avg) ? 0 : parseFloat(avg.toFixed(1))
      };
    });
    
    return averages.sort((a, b) => b.value - a.value);
  };

  const averageData = calculateAverages();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Symptom History</CardTitle>
          <CardDescription>Loading your symptom data...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-pcos-teal" />
        </CardContent>
      </Card>
    );
  }

  if (error || symptoms.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Symptom History</CardTitle>
          <CardDescription>
            {error || "No symptom data available"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-6 space-y-4">
          <AlertTriangle className="h-12 w-12 text-yellow-500" />
          <p className="text-center text-muted-foreground">
            {symptoms.length === 0
              ? "You haven't logged any symptoms yet."
              : "There was an error loading your symptom data."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Symptom History</CardTitle>
          <CardDescription>Track your symptom patterns over time</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">7 Days</SelectItem>
            <SelectItem value="30days">30 Days</SelectItem>
            <SelectItem value="90days">90 Days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="trends">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>
          <TabsContent value="trends" className="pt-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(symptomConfig).map(([key, config]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`symptom-${key}`} 
                    checked={selectedSymptoms.includes(key)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedSymptoms(prev => [...prev, key]);
                      } else {
                        setSelectedSymptoms(prev => prev.filter(s => s !== key));
                      }
                    }}
                    style={{ accentColor: config.color as any }}
                  />
                  <Label 
                    htmlFor={`symptom-${key}`}
                    className="text-sm"
                    style={{ color: config.color as any }}
                  >
                    {config.label}
                  </Label>
                </div>
              ))}
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={processedData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis 
                    dataKey="date" 
                    tickMargin={5}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis domain={[0, 10]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px' }}
                    itemStyle={{ padding: '2px 0' }}
                    labelFormatter={(label) => {
                      // Find the corresponding data point
                      const dataPoint = processedData.find(item => item.date === label);
                      if (dataPoint) {
                        // Format the full date (MMM d, yyyy)
                        return format(dataPoint.rawDate, 'MMMM d, yyyy');
                      }
                      return label;
                    }}
                  />
                  <Legend />
                  {selectedSymptoms.map(symptom => (
                    <Line 
                      key={symptom}
                      type="monotone" 
                      dataKey={symptom} 
                      stroke={symptomConfig[symptom as keyof typeof symptomConfig].color}
                      name={symptomConfig[symptom as keyof typeof symptomConfig].label}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-muted-foreground text-center mt-2">
              Symptom severity scale: 0 (none) to 10 (severe)
            </div>
          </TabsContent>
          <TabsContent value="summary" className="pt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={averageData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 10]} />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4AC6B7" name="Average Severity" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-muted-foreground text-center mt-2">
              Average symptom severity over the selected time period
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SymptomHistory;
