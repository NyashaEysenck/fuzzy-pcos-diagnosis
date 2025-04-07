
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

interface Event {
  date: Date;
  type: string;
  note?: string;
  symptom?: string;
  severity?: string;
}

interface DayEventsProps {
  date: Date | undefined;
  events: Event[];
  onAddEvent: () => void;
}

const DayEvents = ({ date, events, onAddEvent }: DayEventsProps) => {
  if (!date) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <Card className="pcos-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-pcos-lavender" />
          {formatDate(date)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {events.length > 0 ? (
          <div className="space-y-4">
            {events.map((event, index) => (
              <div key={index} className="border-b pb-3 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <Badge 
                    variant="outline" 
                    className={`${
                      event.type === 'period' ? 'text-pcos-pink' : 'text-pcos-teal'
                    }`}
                  >
                    {event.type === 'period' ? 'Period' : event.symptom}
                  </Badge>
                  
                  {event.type === 'symptom' && event.severity && (
                    <Badge className="bg-gray-200 text-gray-800 hover:bg-gray-200">
                      {event.severity}
                    </Badge>
                  )}
                </div>
                
                {event.note && (
                  <p className="text-sm text-gray-600">{event.note}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-gray-500">No events for this day</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={onAddEvent}
            >
              Add Event
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DayEvents;
