"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MessageCircle, Clock } from "lucide-react";
import { authAxios } from "@/config/config";

import { toast } from "sonner";

export default function WakeupTimer() {
  

  const [message, setMessage] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    const hrs = parseInt(hours, 10);
    const mins = parseInt(minutes, 10);

    if (!message.trim()) {
      alert("Please enter a message.");
      return false;
    }

    if (isNaN(hrs) || hrs < 0 || hrs > 23) {
      alert("Please enter a valid hour (0–23)");
      return false;
    }

    if (isNaN(mins) || mins < 0 || mins > 59) {
      alert("Please enter a valid minute (0–59)");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      if (id) {
        await authAxios().put(`/auth/price-range/${id}`, {
          hours: parseInt(hours, 10),
          minutes: parseInt(minutes, 10),
          userMessage: message,
        });
      }
      toast.success('Wake-up Time saved successfully');

    } catch (err) {
      console.error(err);
      alert("Failed to save settings.");
    } finally {
      setLoading(false);
    }
  };

  const getWakeupUserMessage = async () => {
    try {
      const res = await authAxios().get(`/auth/price-range`, {
        params: { type: "WakeupUserTime" },
      });
      const data = res.data.data;
      setId(data._id || "");
      setMessage(data.userMessage || "");
      setHours(data.hours?.toString() || "0");
      setMinutes(data.minutes?.toString() || "0");
    } catch (err) {
      console.error("Error fetching wakeup data:", err);
    }
  };

  useEffect(() => {
    getWakeupUserMessage();
  }, []);

  return (
    <div className="max-w-3xl w-full mx-auto mt-20 px-6">
      <Card className="rounded-2xl shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold">
            Schedule Wake-up Message
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8 px-6 pb-10">
          {/* Message Input */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-base font-medium">
              Custom Message
            </Label>
            <div className="relative">
              <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                required
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Time Input Section */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Select Time</Label>
            <div className="grid grid-cols-2 gap-6">
              {/* Hours */}
              <div className="space-y-1">
                <Label htmlFor="hours">Hours (0–23)</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <Input
                    id="hours"
                    type="number"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    placeholder="HH"
                    min={0}
                    max={23}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Minutes */}
              <div className="space-y-1">
                <Label htmlFor="minutes">Minutes (0–59)</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <Input
                    id="minutes"
                    type="number"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    placeholder="MM"
                    min={0}
                    max={59}
                    className="pl-10" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <Button
              onClick={handleSave}
              className="w-full text-base"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
