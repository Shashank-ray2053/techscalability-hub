
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface ChatScheduleFormProps {
  onSubmit: (date: Date, time: string, notes: string) => void;
  onCancel: () => void;
}

export function ChatScheduleForm({ onSubmit, onCancel }: ChatScheduleFormProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  // Generate available time slots (9 AM to 5 PM)
  const timeSlots = [];
  for (let hour = 9; hour <= 17; hour++) {
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const ampm = hour < 12 ? "AM" : "PM";
    timeSlots.push(`${formattedHour}:00 ${ampm}`);
    timeSlots.push(`${formattedHour}:30 ${ampm}`);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast({
        title: "Date required",
        description: "Please select a date for your appointment.",
        variant: "destructive",
      });
      return;
    }

    if (!time) {
      toast({
        title: "Time required",
        description: "Please select a time for your appointment.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(date, time, notes);
  };

  // Function to disable weekends and past dates
  const isDateDisabled = (date: Date) => {
    const day = date.getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Disable weekends (0 is Sunday, 6 is Saturday)
    const isWeekend = day === 0 || day === 6;
    
    // Disable past dates
    const isPastDate = date < today;
    
    return isWeekend || isPastDate;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Select Date</Label>
        <div className="border rounded-md p-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={isDateDisabled}
            className="mx-auto"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="time">Select Time</Label>
        <Select value={time} onValueChange={setTime}>
          <SelectTrigger id="time">
            <SelectValue placeholder="Select a time slot" />
          </SelectTrigger>
          <SelectContent>
            {timeSlots.map((slot) => (
              <SelectItem key={slot} value={slot}>
                {slot}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes (Optional)</Label>
        <Textarea
          id="notes"
          placeholder="Please share any specific topics you'd like to discuss"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />
      </div>
      
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Schedule Meeting</Button>
      </div>
    </form>
  );
}
