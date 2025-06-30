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
import { handleProfileImage, handleThumbnail, setReportFormatDate } from '@/helper/helper';
export interface ReportInterface {
    _id: string;
    userId: any;
    feedId: any;
    createdAt: string;
    updatedAt: string;
    status: string;
    reportType: string;
}

import {  Eye } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Report: FC = () => {
    const { setloading } = useAllContext();

    const navigation=useNavigate()

    const [reports, setreports] = useState<ReportInterface[]>([])


    const getReports = async () => {
        setloading(true);
        await authAxios()
            .get(`/report`)
            .then((response) => {
                setloading(false);
                console.log(response)

                setreports(response.data.data.docs)
            }).catch((error) => {
                setloading(false);
                toast.error(error.response.data.message);
            })
    }

    useEffect(() => {
        getReports()
    }, [])

    return (
        <div className="p-6">
            <Main>
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-foreground">Reports</h1>

                </div>
                <div className="overflow-x-auto rounded-lg shadow-lg border border-border">
                    <Table className="w-full border-collapse text-sm">
                        <TableHeader>
                            <TableRow className="border-b border-border bg-muted/50">
                                <TableHead className="px-4 py-3 text-left text-muted-foreground font-medium">
                                    Sno
                                </TableHead>
                                <TableHead className="px-4 py-3 text-left text-muted-foreground font-medium">
                                    Report Type
                                </TableHead>
                                <TableHead className="px-4 py-3 text-left text-muted-foreground font-medium">
                                    Content
                                </TableHead>
                                <TableHead className="px-4 py-3 text-left text-muted-foreground font-medium">
                                    Status
                                </TableHead>
                                <TableHead className="px-4 py-3 text-left text-muted-foreground font-medium">
                                    Report Date
                                </TableHead>
                                <TableHead className="px-4 py-3 text-left text-muted-foreground font-medium">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reports.length > 0 ? (
                                reports.map((item, index) => (
                                    <TableRow
                                        key={item._id}
                                        className="border-b border-border hover:bg-muted/30 transition-colors"
                                    >
                                        <TableCell className="px-4 py-3 font-medium text-foreground">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-foreground">
                                            {item?.reportType}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-foreground">
                                            <img src={handleThumbnail(item?.feedId?.thumbnail)} className="h-20 w-20 rounded-[10px]" />

                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-foreground">
                                            {item?.status}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-foreground">
                                            {setReportFormatDate(item.createdAt)}
                                        </TableCell>

                                        <TableCell onClick={() => navigation(`/report/${item?.feedId?._id}`)} className="px-4 py-3">
                                            <Eye className='cursor-pointer' />
                                            {/* <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        // onClick={() =>
                                                        //     setModalState((prev) => ({
                                                        //         ...prev,
                                                        //         currentCategory: item,
                                                        //     }))
                                                        // }
                                                        variant="ghost"
                                                        className="h-7 w-7 p-0 hover:bg-muted"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    side="left"
                                                    className="w-28 p-1 bg-popover border border-border shadow-md"
                                                >
                                                    <div className="flex flex-col space-y-1">
                                                        <button
                                                            className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                                                        // onClick={() => handleOpenEditModal(item)}
                                                        >
                                                            <Edit className="h-3.5 w-3.5" />
                                                            <span>Edit</span>
                                                        </button>
                                                        <button
                                                            className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                                                        //onClick={() => handleOpenDeleteModal(item)}
                                                        >
                                                            <Trash className="h-3.5 w-3.5" />
                                                            <span>Delete</span>
                                                        </button>
                                                    </div>
                                                </PopoverContent>
                                            </Popover> */}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
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

export default Report