import React, { useState, useEffect } from "react"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"
import { Clock, Dumbbell, Save } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { authAxios } from "@/config/config"

const Limit: React.FC = () => {
    const [videoDurationLimit, setVideoDurationLimit] = useState<number>(0)
    const [sportsSelectionLimit, setSportsSelectionLimit] = useState<number>(0)

    const [privateId, setPrivateId] = useState<string | null>(null)
    const [sportsId, setSportsId] = useState<string | null>(null)

    // 🔹 Fetch limits on mount
    useEffect(() => {
        const fetchLimits = async () => {
            try {
                // Private Content
                const privateRes = await authAxios().get("/auth/price-range", {
                    params: { type: "private-content" },
                })
                if (privateRes?.data?.data) {
                    setVideoDurationLimit(privateRes.data.data.minutes || 0)
                    setPrivateId(privateRes.data.data._id)
                }

                // Sports Interest
                const sportRes = await authAxios().get("/auth/price-range", {
                    params: { type: "sport-interest" },
                })
                if (sportRes?.data?.data) {
                    setSportsSelectionLimit(
                        sportRes.data.data.maximumSport || 0
                    )
                    setSportsId(sportRes.data.data._id)
                }
            } catch (error) {
                console.error(error)
                toast.error(" Failed to fetch limits")
            }
        }

        fetchLimits()
    }, [])

    // 🔹 Save both limits together
    const handleSave = async () => {
        await handleSavePrivate()
        await handleSaveSports()
        // toast.success(" Limits updated successfully")
    }

    // 🔹 Save private video duration limit
    const handleSavePrivate = async () => {
        if (videoDurationLimit < 1 || videoDurationLimit > 300) {
            toast.error("Video duration must be between 1 and 300 minutes.")
            return
        }
        try {
            await authAxios().put(`/auth/price-range/${privateId}`, {
                minutes: videoDurationLimit,
            })
            toast.success("Private video limit updated")
        } catch (error) {
            console.error(error)
            toast.error(" Failed to update private content limit")
        }
    }

    // 🔹 Save sports selection limit
    const handleSaveSports = async () => {
        if (sportsSelectionLimit < 1 || sportsSelectionLimit > 20) {
            toast.error(" Sports selection limit must be between 1 and 20.")
            return
        }
        try {
            await authAxios().put(`/auth/price-range/${sportsId}`, {
                maximumSport: sportsSelectionLimit,
            })
            toast.success(" Sports selection limit updated")
        } catch (error) {
            console.error(error)
            toast.error("Failed to update sports limit")
        }
    }

    return (
        <div className="flex justify-center items-center mt-10 bg-background p-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-xl"
            >
                <Card className="shadow-lg border rounded-2xl">
                    <CardHeader className="space-y-2">
                        <CardTitle className="text-2xl font-bold text-foreground">
                            ⚙️ Set User Limits
                        </CardTitle>
                        <CardDescription>
                            Define restrictions for private video content and sports selection.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {/* Video Duration Limit */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Private Content Video Limit (minutes)
                            </label>
                            <Input
                                type="text"
                                value={videoDurationLimit}
                                placeholder="Enter duration in minutes"
                                onChange={(e) => {
                                    const value = e.target.value
                                    if (/^\d*$/.test(value)) {  // ✅ only digits allowed
                                        setVideoDurationLimit(Number(value))
                                    }
                                }}
                            />
                            <p className="text-xs text-muted-foreground">
                                Allowed range: <b>1 - 300 minutes</b>
                            </p>
                        </div>

                        {/* Sports Selection Limit */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Dumbbell className="w-4 h-4" />
                                Sports Selection Limit
                            </label>
                            <Input
                                type="text"
                                value={sportsSelectionLimit}
                                placeholder="Enter number of sports"
                                onChange={(e) => {
                                    const value = e.target.value
                                    if (/^\d*$/.test(value)) {  // ✅ only digits allowed
                                        setSportsSelectionLimit(Number(value))
                                    }
                                }}
                            />
                            <p className="text-xs text-muted-foreground">
                                Allowed range: <b>1 - 20 sports</b>
                            </p>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-end">
                        <Button
                            onClick={handleSave}
                            className="flex items-center gap-2"
                            disabled={!privateId || !sportsId} // disable until data is loaded
                        >
                            <Save className="w-4 h-4" /> Save Limits
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}

export default Limit
