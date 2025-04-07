import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import EventDialog from "@/components/calendar/EventDialog";
import DayEvents from "@/components/calendar/DayEvents";
import CycleStatistics from "@/components/calendar/CycleStatistics";
import CustomCalendar from "@/components/calendar/CustomCalendar";
import { SymptomSeverity } from "@/lib/fuzzyLogic";
import { calendarAPI } from "@/lib/api";

// Define the Event type used by the calendar components
interface Event {
  date: Date;
  type: string;
  note?: string;
  symptom?: string;
  severity?: string;
}

// Backend calendar event interface
interface CalendarEvent {
  _id: string;
  user: string;
  title: string;
  date: string;
  time?: string;
  type: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [backendEvents, setBackendEvents] = useState<CalendarEvent[]>([]);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Convert backend events to the format expected by calendar components
  const events: Event[] = backendEvents.map(event => ({
    date: new Date(event.date),
    type: event.type,
    note: event.description,
    symptom: event.type === 'symptom' ? event.title : undefined,
    severity: event.type === 'symptom' ? 'moderate' : undefined, // Default severity if not available
  }));

  useEffect(() => {
    const fetchEvents = async () => {
      if (!date) return;
      
      try {
        const start = new Date(date.getFullYear(), date.getMonth(), 1);
        const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        const response = await calendarAPI.getEventsByDateRange(
          start.toISOString(),
          end.toISOString()
        );
        
        setBackendEvents(response.data.data.events);
        setError(null);
      } catch (error: any) {
        console.error("Error fetching events:", error);
        setError(error.response?.data?.message || "Failed to fetch calendar events");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load your calendar events.",
        });
      }
    };

    fetchEvents();
  }, [date, toast]);

  const handleAddEvent = async (eventData: any) => {
    if (!date) return;
    
    try {
      // Format the event data for the API based on the backend model requirements
      const apiEventData = {
        date: date.toISOString(), // Send full ISO date
        type: eventData.type,
        // Add required fields based on event type
        ...(eventData.type === 'symptom' && {
          symptom: eventData.symptom || 'other',
          severity: eventData.severity || 'moderate'
        }),
        ...(eventData.type === 'appointment' && {
          title: eventData.title || 'Appointment'
        }),
        ...(eventData.type === 'medication' && {
          medication: eventData.medication || 'Medication',
          dosage: eventData.dosage || ''
        }),
        ...(eventData.type === 'other' && {
          title: eventData.title || 'Event'
        }),
        note: eventData.note || ''
      };
      
      await calendarAPI.createEvent(apiEventData);
      
      toast({
        title: "Event Added",
        description: "Your event has been added to the calendar.",
      });
      
      // Refresh events
      const start = new Date(date.getFullYear(), date.getMonth(), 1);
      const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const response = await calendarAPI.getEventsByDateRange(
        start.toISOString(),
        end.toISOString()
      );
      setBackendEvents(response.data.data.events);
    } catch (error: any) {
      console.error("Error adding event:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to add event. Please try again.",
      });
    }
    
    setIsAddingEvent(false);
  };

  const selectedDateEvents = date 
    ? events.filter(
        event => 
          event.date.getDate() === date.getDate() && 
          event.date.getMonth() === date.getMonth() && 
          event.date.getFullYear() === date.getFullYear()
      )
    : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-pcos-dark">Cycle Calendar</h1>
          <p className="text-gray-500">Track your cycle and symptoms</p>
        </div>
        <EventDialog 
          date={date}
          isOpen={isAddingEvent}
          onOpenChange={setIsAddingEvent}
          onAddEvent={handleAddEvent}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CustomCalendar 
            date={date}
            events={events}
            onSelect={setDate}
          />
        </div>
        
        <div>
          <DayEvents 
            date={date}
            events={selectedDateEvents}
            onAddEvent={() => setIsAddingEvent(true)}
          />
          
          <CycleStatistics />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
