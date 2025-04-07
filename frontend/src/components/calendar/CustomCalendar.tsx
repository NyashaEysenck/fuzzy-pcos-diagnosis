
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { DayContentProps } from "react-day-picker";

interface Event {
  date: Date;
  type: string;
}

interface CustomCalendarProps {
  date: Date | undefined;
  events: Event[];
  onSelect: (date: Date | undefined) => void;
}

const CustomCalendar = ({ date, events, onSelect }: CustomCalendarProps) => {
  const getDayContent = (day: Date) => {
    const dayEvents = events.filter(
      event => event.date.getDate() === day.getDate() && 
              event.date.getMonth() === day.getMonth() && 
              event.date.getFullYear() === day.getFullYear()
    );
    
    if (dayEvents.length > 0) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          {dayEvents.some(e => e.type === 'period') ? (
            <div className="h-2 w-2 rounded-full bg-pcos-pink"></div>
          ) : (
            <div className="h-2 w-2 rounded-full bg-pcos-teal"></div>
          )}
        </div>
      );
    }
    
    return null;
  };

  // Custom DayContent component function that safely handles the date content
  const CustomDayContent = (props: DayContentProps) => {
    // Safely render the date content, checking that props.date exists
    if (!props.date) return null;
    
    return (
      <>
        {/* Render the date number */}
        {props.date.getDate()}
        {/* Render any custom content for this day */}
        {getDayContent(props.date)}
      </>
    );
  };

  return (
    <Card className="pcos-card">
      <CardHeader>
        <CardTitle className="text-pcos-teal">Cycle Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          className="rounded-md border pointer-events-auto"
          components={{
            DayContent: CustomDayContent,
          }}
        />
        
        <div className="mt-4 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-pcos-pink"></div>
            <span className="text-sm">Period</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-pcos-teal"></div>
            <span className="text-sm">Symptom</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomCalendar;
