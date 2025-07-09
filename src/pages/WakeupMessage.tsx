"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { MessageCircle, Clock } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function WakeupTimer() {
  const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());

  return (
    <div className="max-w-xl w-full mx-auto mt-20 px-4">
      <Card className="bg-white/30 dark:bg-black/30 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-2xl rounded-2xl">
        <CardHeader className="text-center py-8">
          <CardTitle className="text-4xl font-semibold text-gray-800 dark:text-white tracking-tight">
            Message & Time
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-10 px-6 pb-10">
          {/* Message Input */}
          <div className="space-y-3">
            <Label
              htmlFor="message"
              className="text-lg font-semibold text-gray-700 dark:text-gray-200"
            >
              Custom Message
            </Label>
            <div className="relative">
              <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
              <Input
                id="message"
                placeholder="Type your message..."
                className="pl-12 pr-4 py-4 text-base h-14 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/80 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Time Input */}
          <div className="space-y-3">
            <Label
              htmlFor="time"
              className="text-lg font-semibold text-gray-700 dark:text-gray-200"
            >
              Select Time
            </Label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={22} />
              <DatePicker
                selected={selectedTime}
                onChange={(date) => setSelectedTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeFormat="HH:mm"
                dateFormat="HH:mm"
                className="pl-12 pr-4 py-4 w-full text-base h-14 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900/80 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary focus:outline-none"
                placeholderText="Select time"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
