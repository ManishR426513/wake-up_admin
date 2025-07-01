import { Main } from '@/components/main';
import { authAxios } from '@/config/config';
import { useAllContext } from '@/context/AllContext';
import { FC, useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { toast } from 'sonner';
import { Button } from "@/components/ui/Button";
import {  handleThumbnail, setReportFormatDate } from '@/helper/helper';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

// Optional: Badge component for status styling
const StatusBadge = ({ status }: { status: string }) => {
    let color = "bg-yellow-100 text-yellow-800";
    if (status === "resolved") color = "bg-green-100 text-green-800";
    if (status === "pending") color = "bg-orange-100 text-orange-800";
    if (status === "rejected") color = "bg-red-100 text-red-800";
    return (
        <span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>
            {status}
        </span>
    );
};

export interface ReportInterface {
    _id: string;
    userId: any;
    feedId: any;
    createdAt: string;
    updatedAt: string;
    status: string;
    reportType: string;
}

const DetailedReport: FC = () => {
    const { token } = useAuth();

    const { setloading } = useAllContext();
    const [reports, setreports] = useState<ReportInterface[]>([])
    const { id } = useParams()

    // Get feed details from the first report (if available)
    const feedDetails = reports[0]?.feedId || {};

    const getReports = async () => {
        setloading(true);
        await authAxios(token)
            .get(`/report`, {
                params: {
                    feedId: id
                }
            })
            .then((response) => {
                setloading(false);
                setreports(response.data.data.docs)
            }).catch((error) => {
                setloading(false);
                toast.error(error?.response?.data?.message || "Failed to fetch reports");
            })
    }

    const DeleteVideo = async () => {
        await authAxios(token)
            .put(`/report`, { feedId: id })
            .then(() => {
                toast.success("Video deleted successfully.");
                getReports();
            }).catch(() => {
                toast.error("Failed to delete video.");
            })
    }

    useEffect(() => {
        if (token) {
            getReports()

        }
    }, [token])

    return (
        <div className="p-6">
            <Main>
                {/* Feed Details Card */}
                <div className="mb-6 flex flex-col md:flex-row items-center gap-6 bg-muted/40 rounded-lg p-5 shadow border border-border">
                    <img
                        src={handleThumbnail(feedDetails?.thumbnail)}
                        alt="Feed Thumbnail"
                        className="h-24 w-24 rounded-lg object-cover border"
                    />
                    <div className="flex-1 w-full">
                        <h2 className="text-xl font-semibold text-foreground mb-1">
                            {feedDetails?.title || "Feed Title"}
                        </h2>
                        {/* <p className="text-muted-foreground text-sm mb-1">
                            {feedDetails?.description || "No description available."}
                        </p> */}
                        <div className="flex gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">Feed ID:</span>
                            <span className="text-xs font-mono">{feedDetails?._id || id}</span>
                        </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-auto">
                        {reports && reports[0]?.status !== "resolved" && (
                            <Button onClick={DeleteVideo} variant="destructive">
                                Delete Video
                            </Button>
                        )}
                    </div>
                </div>

                {/* Reports Table */}
                <div className="overflow-x-auto rounded-lg shadow-lg border border-border bg-background">
                    <Table className="w-full border-collapse text-sm">
                        <TableHeader>
                            <TableRow className="border-b border-border bg-muted/50">
                                <TableHead className="px-4 py-3 text-left text-muted-foreground font-medium">Sno</TableHead>
                                <TableHead className="px-4 py-3 text-left text-muted-foreground font-medium">Username</TableHead>
                                <TableHead className="px-4 py-3 text-left text-muted-foreground font-medium">Report Type</TableHead>
                                <TableHead className="px-4 py-3 text-left text-muted-foreground font-medium">Status</TableHead>
                                <TableHead className="px-4 py-3 text-left text-muted-foreground font-medium">Report Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reports.length > 0 ? (
                                reports.map((item, index) => (
                                    <TableRow
                                        key={item._id}
                                        className="border-b border-border hover:bg-muted/30 transition-colors"
                                    >
                                        <TableCell className="px-4 py-3 font-medium text-foreground">{index + 1}</TableCell>
                                        <TableCell className="px-4 py-3 font-medium text-foreground">{item?.userId?.username}</TableCell>
                                        <TableCell className="px-4 py-3 text-foreground">{item?.reportType}</TableCell>
                                        <TableCell className="px-4 py-3">
                                            <StatusBadge status={item?.status} />
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-foreground">{setReportFormatDate(item.createdAt)}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="px-4 py-8 text-center text-muted-foreground"
                                    >
                                        No Reports Found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Main>
        </div>
    )
}

export default DetailedReport