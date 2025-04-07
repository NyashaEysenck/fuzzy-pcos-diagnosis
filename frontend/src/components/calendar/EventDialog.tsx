
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { SymptomSeverity } from "@/lib/fuzzyLogic";

interface EventDialogProps {
  date: Date | undefined;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddEvent: (eventData: {
    type: 'period' | 'symptom';
    symptom?: string;
    severity?: SymptomSeverity;
    note: string;
  }) => void;
}

const symptomOptions = [
  { value: 'acne', label: 'Acne' },
  { value: 'hairLoss', label: 'Hair Loss' },
  { value: 'hairGrowth', label: 'Excessive Hair Growth' },
  { value: 'weightGain', label: 'Weight Gain' },
  { value: 'fatigue', label: 'Fatigue' },
  { value: 'mood', label: 'Mood Changes' },
];

const severityOptions: {value: SymptomSeverity, label: string}[] = [
  { value: 'mild', label: 'Mild' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'severe', label: 'Severe' },
];

const EventDialog = ({ date, isOpen, onOpenChange, onAddEvent }: EventDialogProps) => {
  const [eventType, setEventType] = useState<'period' | 'symptom'>('period');
  const [symptomType, setSymptomType] = useState<string>('acne');
  const [severity, setSeverity] = useState<SymptomSeverity>('mild');
  const [note, setNote] = useState<string>('');

  const handleSave = () => {
    let eventData: any = { type: eventType, note };
    
    if (eventType === 'symptom') {
      eventData.symptom = symptomType;
      eventData.severity = severity;
    }
    
    onAddEvent(eventData);
    setNote('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-pcos-teal hover:bg-pcos-teal/90 gap-1">
          <Plus size={18} />
          <span>Add Event</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogDescription>
            Record a period or symptom for {date?.toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Tabs defaultValue="period" onValueChange={(value) => setEventType(value as 'period' | 'symptom')}>
            <TabsList className="w-full mb-4">
              <TabsTrigger value="period" className="flex-1">Period</TabsTrigger>
              <TabsTrigger value="symptom" className="flex-1">Symptom</TabsTrigger>
            </TabsList>
            
            <TabsContent value="period">
              <div className="space-y-4">
                <div>
                  <Label>Notes</Label>
                  <Textarea 
                    placeholder="Add any notes about your period" 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="symptom">
              <div className="space-y-4">
                <div>
                  <Label>Symptom Type</Label>
                  <RadioGroup 
                    value={symptomType} 
                    onValueChange={setSymptomType}
                    className="grid grid-cols-2 gap-2 mt-2"
                  >
                    {symptomOptions.map(option => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`symptom-${option.value}`} />
                        <Label htmlFor={`symptom-${option.value}`} className="font-normal">{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <div>
                  <Label>Severity</Label>
                  <RadioGroup 
                    value={severity} 
                    onValueChange={(value) => setSeverity(value as SymptomSeverity)}
                    className="flex gap-4 mt-2"
                  >
                    {severityOptions.map(option => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`severity-${option.value}`} />
                        <Label htmlFor={`severity-${option.value}`} className="font-normal">{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <div>
                  <Label>Notes</Label>
                  <Textarea 
                    placeholder="Add any additional notes" 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button className="bg-pcos-teal hover:bg-pcos-teal/90" onClick={handleSave}>Save Event</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
