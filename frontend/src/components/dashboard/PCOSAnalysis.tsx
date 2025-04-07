import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { assessmentAPI } from "@/lib/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

const assessmentFormSchema = z.object({
  // Menstrual factors
  menstrualPattern: z.enum(["regular", "irregular", "very_irregular", "absent"]),
  
  // Hormonal factors
  acneSeverity: z.enum(["none", "mild", "moderate", "severe"]),
  hairLoss: z.enum(["none", "mild", "moderate", "severe"]),
  excessiveHairGrowth: z.enum(["none", "mild", "moderate", "severe"]),
  
  // Metabolic factors
  bmi: z.number().min(10).max(50),
  weightGain: z.enum(["none", "mild", "moderate", "severe"]),
  skinTags: z.enum(["none", "mild", "moderate", "severe"]),
  darkPatches: z.enum(["none", "mild", "moderate", "severe"]),
  
  // Other factors
  fatigue: z.enum(["none", "mild", "moderate", "severe"]),
  moodChanges: z.enum(["none", "mild", "moderate", "severe"]),
});

type AssessmentFormValues = z.infer<typeof assessmentFormSchema>;

const PCOSAnalysis = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(165);
  const [bmi, setBmi] = useState<number>(25.7);
  const [activeTab, setActiveTab] = useState("assessment");
  const { toast } = useToast();

  const form = useForm<AssessmentFormValues>({
    resolver: zodResolver(assessmentFormSchema),
    defaultValues: {
      menstrualPattern: "regular",
      acneSeverity: "none",
      hairLoss: "none",
      excessiveHairGrowth: "none",
      bmi: 25.7,
      weightGain: "none",
      skinTags: "none",
      darkPatches: "none",
      fatigue: "none",
      moodChanges: "none",
    },
  });

  useEffect(() => {
    fetchLatestAssessment();
  }, [toast]);

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

  const calculateBMI = () => {
    if (weight > 0 && height > 0) {
      const heightInMeters = height / 100;
      const calculatedBMI = weight / (heightInMeters * heightInMeters);
      setBmi(parseFloat(calculatedBMI.toFixed(1)));
      form.setValue("bmi", parseFloat(calculatedBMI.toFixed(1)), { shouldValidate: true });
    }
  };

  useEffect(() => {
    calculateBMI();
  }, [weight, height]);

  const onSubmit = async (data: AssessmentFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Prepare the data in the format expected by the backend
      const submissionData = {
        ...data,
        // Don't convert BMI to string, keep it as a number
        bmi: data.bmi
      };
      
      const response = await assessmentAPI.createAssessment(submissionData);
      
      // Set the assessment data from the response
      if (response.data?.data?.assessment) {
        setAssessment(response.data.data.assessment);
      }
      
      toast({
        title: "Assessment Submitted",
        description: "Your PCOS assessment has been successfully submitted.",
      });
      
      // Switch to results tab
      setActiveTab("results");
      
    } catch (error: any) {
      console.error("Error submitting assessment:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to submit assessment. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const renderSeverityRadioGroup = (
    name: keyof AssessmentFormValues, 
    label: string, 
    description?: string
  ) => {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
                className="flex space-x-1"
              >
                <FormItem className="flex items-center space-x-1 space-y-0 flex-1">
                  <FormControl>
                    <RadioGroupItem value="none" className="sr-only peer" />
                  </FormControl>
                  <FormLabel className="w-full cursor-pointer rounded-md border p-2 text-center text-xs peer-data-[state=checked]:bg-muted peer-data-[state=checked]:border-primary">
                    None
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-1 space-y-0 flex-1">
                  <FormControl>
                    <RadioGroupItem value="mild" className="sr-only peer" />
                  </FormControl>
                  <FormLabel className="w-full cursor-pointer rounded-md border p-2 text-center text-xs peer-data-[state=checked]:bg-muted peer-data-[state=checked]:border-primary">
                    Mild
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-1 space-y-0 flex-1">
                  <FormControl>
                    <RadioGroupItem value="moderate" className="sr-only peer" />
                  </FormControl>
                  <FormLabel className="w-full cursor-pointer rounded-md border p-2 text-center text-xs peer-data-[state=checked]:bg-muted peer-data-[state=checked]:border-primary">
                    Moderate
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-1 space-y-0 flex-1">
                  <FormControl>
                    <RadioGroupItem value="severe" className="sr-only peer" />
                  </FormControl>
                  <FormLabel className="w-full cursor-pointer rounded-md border p-2 text-center text-xs peer-data-[state=checked]:bg-muted peer-data-[state=checked]:border-primary">
                    Severe
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>PCOS Risk Assessment</CardTitle>
              <CardDescription>
                Evaluate your PCOS risk factors and get personalized recommendations
              </CardDescription>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>This comprehensive assessment evaluates your overall PCOS risk based on multiple factors.</p>
                  <p className="mt-2">Complete this assessment periodically (monthly or quarterly) to monitor changes in your condition.</p>
                  <p className="mt-2">For tracking daily symptoms, use the Daily Symptom Tracker instead.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={assessment ? "results" : "assessment"} value={activeTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="assessment">Assessment Form</TabsTrigger>
              <TabsTrigger value="results">Results & Recommendations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="assessment" className="pt-4">
              {isLoading ? (
                <div className="flex justify-center items-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-pcos-teal" />
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">BMI Calculation</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="weight" className="text-sm font-medium">
                            Weight (kg)
                          </label>
                          <Input
                            id="weight"
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(parseFloat(e.target.value))}
                            onBlur={calculateBMI}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="height" className="text-sm font-medium">
                            Height (cm)
                          </label>
                          <Input
                            id="height"
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(parseFloat(e.target.value))}
                            onBlur={calculateBMI}
                            className="w-full"
                          />
                        </div>
                      </div>
                      
                      <div className="p-4 bg-muted rounded-md">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="text-sm font-medium">Your BMI</div>
                            <div className="text-2xl font-bold">{bmi}</div>
                            <div className="text-xs text-muted-foreground">{getBMICategory(bmi)}</div>
                          </div>
                          <FormField
                            control={form.control}
                            name="bmi"
                            render={({ field }) => (
                              <FormItem className="w-full sm:w-2/3">
                                <FormControl>
                                  <Slider
                                    value={[field.value]}
                                    min={10}
                                    max={50}
                                    step={0.1}
                                    onValueChange={(value) => {
                                      field.onChange(value[0]);
                                    }}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Menstrual Factors</h3>
                      <FormField
                        control={form.control}
                        name="menstrualPattern"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Menstrual Pattern</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="regular" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Regular (21-35 days)
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="irregular" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Irregular (varying cycle length)
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="very_irregular" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Very Irregular (unpredictable)
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="absent" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Absent (no periods for 3+ months)
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Hormonal Factors</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {renderSeverityRadioGroup("acneSeverity", "Acne")}
                        {renderSeverityRadioGroup("hairLoss", "Hair Loss")}
                        {renderSeverityRadioGroup("excessiveHairGrowth", "Excessive Hair Growth")}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Metabolic Factors</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {renderSeverityRadioGroup("weightGain", "Weight Gain")}
                        {renderSeverityRadioGroup("skinTags", "Skin Tags")}
                        {renderSeverityRadioGroup("darkPatches", "Dark Skin Patches")}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Other Factors</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {renderSeverityRadioGroup("fatigue", "Fatigue")}
                        {renderSeverityRadioGroup("moodChanges", "Mood Changes/Anxiety/Depression")}
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-pcos-teal"
                      disabled={isSubmitting}
                    >
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {assessment ? "Update Assessment" : "Complete Assessment"}
                    </Button>
                  </form>
                </Form>
              )}
            </TabsContent>
            
            <TabsContent value="results" className="pt-4">
              {assessment ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted rounded-md text-center">
                      <div className="text-sm font-medium text-muted-foreground">Menstrual Score</div>
                      <div className="text-2xl font-bold mt-1">{Math.round(assessment.menstrualScore * 100)}%</div>
                    </div>
                    <div className="p-4 bg-muted rounded-md text-center">
                      <div className="text-sm font-medium text-muted-foreground">Hormonal Score</div>
                      <div className="text-2xl font-bold mt-1">{Math.round(assessment.hormonalScore * 100)}%</div>
                    </div>
                    <div className="p-4 bg-muted rounded-md text-center">
                      <div className="text-sm font-medium text-muted-foreground">Metabolic Score</div>
                      <div className="text-2xl font-bold mt-1">{Math.round(assessment.metabolicScore * 100)}%</div>
                    </div>
                  </div>
                  
                  <div className="p-6 border rounded-md">
                    <div className="flex flex-col items-center justify-center mb-4">
                      <div className="text-sm font-medium text-muted-foreground">Overall Risk Score</div>
                      <div className="text-4xl font-bold text-pcos-lavender mt-2">
                        {Math.round(assessment.overallRiskScore * 100)}%
                      </div>
                      <div className="text-sm mt-1">Risk Category: <span className="font-medium">{assessment.riskCategory}</span></div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3">Recommendations</h3>
                      <ul className="space-y-2">
                        {assessment.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
                  <h3 className="text-lg font-medium">No Assessment Results</h3>
                  <p className="text-muted-foreground mt-2">
                    Complete the assessment to see your personalized results and recommendations.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PCOSAnalysis;
