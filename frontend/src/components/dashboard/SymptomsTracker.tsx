import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalendarIcon, Plus, Loader2, Info } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { symptomsAPI } from "@/lib/api";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SymptomTrackerProps {
  onSymptomLogged?: () => void;
}

const SymptomsTracker = ({ onSymptomLogged }: SymptomTrackerProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [symptoms, setSymptoms] = useState({
    mood: 5,
    painLevel: 0,
    bloating: 0,
    fatigue: 0,
    acne: 0,
    hairLoss: 0,
    cravings: 0,
    headache: 0,
  });
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleSliderChange = (name: string, value: number[]) => {
    setSymptoms({
      ...symptoms,
      [name]: value[0],
    });
  };

  const resetForm = () => {
    setDate(new Date());
    setSymptoms({
      mood: 5,
      painLevel: 0,
      bloating: 0,
      fatigue: 0,
      acne: 0,
      hairLoss: 0,
      cravings: 0,
      headache: 0,
    });
    setNotes("");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Map the frontend symptom values to the backend model format
      // The backend expects severity levels as strings: 'none', 'mild', 'moderate', 'severe'
      const getSeverityLevel = (value: number) => {
        if (value === 0) return 'none';
        if (value < 4) return 'mild';
        if (value < 7) return 'moderate';
        return 'severe';
      };
      
      // Create the symptom data in the format expected by the backend
      const symptomData = {
        date: date.toISOString().split('T')[0],
        // Map numeric values to severity levels
        acne: getSeverityLevel(symptoms.acne),
        hairLoss: getSeverityLevel(symptoms.hairLoss),
        fatigue: getSeverityLevel(symptoms.fatigue),
        cravings: getSeverityLevel(symptoms.cravings),
        
        // Additional fields that might not be in the backend model
        // but we'll include them in notes
        notes: `Mood: ${symptoms.mood}/10, Pain: ${getSeverityLevel(symptoms.painLevel)}, 
                Bloating: ${getSeverityLevel(symptoms.bloating)}, 
                Headache: ${getSeverityLevel(symptoms.headache)}
                ${notes ? '\n\nAdditional notes: ' + notes : ''}`
      };
      
      await symptomsAPI.createSymptom(symptomData);
      
      toast({
        title: "Symptoms Logged",
        description: "Your symptoms have been successfully recorded.",
      });
      
      resetForm();
      setIsDialogOpen(false);
      
      // Notify parent component if callback provided
      if (onSymptomLogged) {
        onSymptomLogged();
      }
    } catch (error: any) {
      console.error("Error logging symptoms:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to log symptoms. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Daily Symptom Tracker</CardTitle>
            <CardDescription>Log your daily symptoms to track patterns over time</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>The Daily Symptom Tracker is for recording how you feel each day. Use this to build a history of your symptoms over time.</p>
                <p className="mt-2">For a comprehensive PCOS risk evaluation, use the PCOS Assessment tool instead.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-pcos-teal">
              <Plus className="mr-2 h-4 w-4" />
              Log Today's Symptoms
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Daily Symptom Log</DialogTitle>
              <DialogDescription>
                Record how you're feeling today to track your symptoms over time. This helps identify patterns and triggers.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="symptom-date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="symptom-date"
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="mood">Mood</Label>
                    <span className="text-sm text-muted-foreground">
                      {symptoms.mood === 0 ? "Very Low" : 
                       symptoms.mood < 4 ? "Low" : 
                       symptoms.mood < 7 ? "Neutral" : 
                       symptoms.mood < 10 ? "Good" : "Excellent"}
                    </span>
                  </div>
                  <Slider
                    id="mood"
                    defaultValue={[5]}
                    max={10}
                    step={1}
                    value={[symptoms.mood]}
                    onValueChange={(value) => handleSliderChange("mood", value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="painLevel">Pain Level</Label>
                    <span className="text-sm text-muted-foreground">
                      {symptoms.painLevel === 0 ? "None" : 
                       symptoms.painLevel < 4 ? "Mild" : 
                       symptoms.painLevel < 7 ? "Moderate" : 
                       symptoms.painLevel < 10 ? "Severe" : "Extreme"}
                    </span>
                  </div>
                  <Slider
                    id="painLevel"
                    defaultValue={[0]}
                    max={10}
                    step={1}
                    value={[symptoms.painLevel]}
                    onValueChange={(value) => handleSliderChange("painLevel", value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="bloating">Bloating</Label>
                    <span className="text-sm text-muted-foreground">
                      {symptoms.bloating === 0 ? "None" : 
                       symptoms.bloating < 4 ? "Mild" : 
                       symptoms.bloating < 7 ? "Moderate" : 
                       symptoms.bloating < 10 ? "Severe" : "Extreme"}
                    </span>
                  </div>
                  <Slider
                    id="bloating"
                    defaultValue={[0]}
                    max={10}
                    step={1}
                    value={[symptoms.bloating]}
                    onValueChange={(value) => handleSliderChange("bloating", value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="fatigue">Fatigue</Label>
                    <span className="text-sm text-muted-foreground">
                      {symptoms.fatigue === 0 ? "None" : 
                       symptoms.fatigue < 4 ? "Mild" : 
                       symptoms.fatigue < 7 ? "Moderate" : 
                       symptoms.fatigue < 10 ? "Severe" : "Extreme"}
                    </span>
                  </div>
                  <Slider
                    id="fatigue"
                    defaultValue={[0]}
                    max={10}
                    step={1}
                    value={[symptoms.fatigue]}
                    onValueChange={(value) => handleSliderChange("fatigue", value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="acne">Acne</Label>
                    <span className="text-sm text-muted-foreground">
                      {symptoms.acne === 0 ? "None" : 
                       symptoms.acne < 4 ? "Mild" : 
                       symptoms.acne < 7 ? "Moderate" : 
                       symptoms.acne < 10 ? "Severe" : "Extreme"}
                    </span>
                  </div>
                  <Slider
                    id="acne"
                    defaultValue={[0]}
                    max={10}
                    step={1}
                    value={[symptoms.acne]}
                    onValueChange={(value) => handleSliderChange("acne", value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="hairLoss">Hair Loss</Label>
                    <span className="text-sm text-muted-foreground">
                      {symptoms.hairLoss === 0 ? "None" : 
                       symptoms.hairLoss < 4 ? "Mild" : 
                       symptoms.hairLoss < 7 ? "Moderate" : 
                       symptoms.hairLoss < 10 ? "Severe" : "Extreme"}
                    </span>
                  </div>
                  <Slider
                    id="hairLoss"
                    defaultValue={[0]}
                    max={10}
                    step={1}
                    value={[symptoms.hairLoss]}
                    onValueChange={(value) => handleSliderChange("hairLoss", value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="cravings">Cravings</Label>
                    <span className="text-sm text-muted-foreground">
                      {symptoms.cravings === 0 ? "None" : 
                       symptoms.cravings < 4 ? "Mild" : 
                       symptoms.cravings < 7 ? "Moderate" : 
                       symptoms.cravings < 10 ? "Severe" : "Extreme"}
                    </span>
                  </div>
                  <Slider
                    id="cravings"
                    defaultValue={[0]}
                    max={10}
                    step={1}
                    value={[symptoms.cravings]}
                    onValueChange={(value) => handleSliderChange("cravings", value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="headache">Headache</Label>
                    <span className="text-sm text-muted-foreground">
                      {symptoms.headache === 0 ? "None" : 
                       symptoms.headache < 4 ? "Mild" : 
                       symptoms.headache < 7 ? "Moderate" : 
                       symptoms.headache < 10 ? "Severe" : "Extreme"}
                    </span>
                  </div>
                  <Slider
                    id="headache"
                    defaultValue={[0]}
                    max={10}
                    step={1}
                    value={[symptoms.headache]}
                    onValueChange={(value) => handleSliderChange("headache", value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any additional details about your symptoms..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="bg-pcos-teal"
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Symptoms
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default SymptomsTracker;
