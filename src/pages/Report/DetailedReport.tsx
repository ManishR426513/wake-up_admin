import { useEffect, useState, useMemo } from 'react'
import {  AlertCircle } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useNavigate, useParams } from 'react-router-dom'
import { Main } from '@/components/main'
import { reportInterface, paginationInterface } from '@/common/allInterface'
import { useAllContext } from '@/context/AllContext'
import { authAxios } from '@/config/config'
import { toast } from 'sonner'
import { handleThumbnail, setReportFormatDate } from '@/helper/helper'
import PaginationComponent from '@/common/PaginationComponent'



const ITEMS_PER_PAGE = 10

const DetailedReport: React.FC = () => {
    const { setloading } = useAllContext()
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

   

    const [pagination, setPagination] = useState<paginationInterface>({
        totalDocs: 0,
        limit: ITEMS_PER_PAGE,
        totalPages: 0,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
    })

    const [reports, setReports] = useState<reportInterface[]>([])
    const [isDeletingVideo, setIsDeletingVideo] = useState(false)

    // Memoized feed details
    const feedDetails = useMemo(() => reports[0]?.feedId || {}, [reports])

    // Modal handlers
    

   

   

    // API calls
    const getAllReports = async (page: number = 1, limit: number = ITEMS_PER_PAGE): Promise<void> => {
        if (!id) return

        setloading(true)
        try {
            const response = await authAxios().get('/report', {
                params: {
                    page,
                    limit,
                    feedId: id
                }
            })

            const data = response.data.data
            setReports(data.docs || [])
            setPagination({
                totalDocs: data.totalDocs,
                limit: data.limit,
                totalPages: data.totalPages,
                page: data.page,
                pagingCounter: data.pagingCounter,
                hasPrevPage: data.hasPrevPage,
                hasNextPage: data.hasNextPage,
                prevPage: data.prevPage,
                nextPage: data.nextPage,
            })
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Failed to fetch reports')
            setReports([])
        } finally {
            setloading(false)
        }
    }

    const handleDeleteVideo = async (data: boolean): Promise<void> => {
        console.log("data", data)

        setIsDeletingVideo(true);
        try {
            const response = await authAxios().delete(`/report/${id}`, {
                data: { removeVideo: data, feedId: feedDetails._id },
            });
            toast.success(response.data.message || 'Video deleted successfully');
            navigate('/report');
        } catch (error: any) {
            console.log("err",error)
            toast.error(error?.response?.data?.message || 'Failed to delete video');
        } finally {
            setIsDeletingVideo(false);
        }
    }

    const handlePageChange = (newPage: number) => {
        getAllReports(newPage, pagination.limit)
    }

    // Status badge component
    

    useEffect(() => {
        getAllReports()
    }, [id])

    if (!id) {
        return (
            <Main>
                <div className="text-center py-8">
                    <p className="text-muted-foreground">Invalid feed ID</p>
                </div>
            </Main>
        )
    }

    return (
        <Main>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
                        <p className="text-muted-foreground">
                            Here&apos;s a list of your reports for this feed
                        </p>
                    </div>
                </div>

                {/* Feed Details Card */}
                {feedDetails && (
                    <div className="rounded-lg border bg-card p-6 shadow-sm">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center">
                            <div className="shrink-0">
                                <img
                                    src={handleThumbnail(feedDetails?.thumbnail)}
                                    alt="Feed Thumbnail"
                                    className="h-24 w-24 rounded-lg border object-cover"
                                />
                            </div>

                            <div className="flex-1 space-y-2">
                                <h2 className="text-xl font-semibold">{feedDetails?.title}</h2>
                                <p className="text-sm text-muted-foreground">
                                    Feed ID: {id}
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    onClick={() => handleDeleteVideo(false)}
                                    disabled={isDeletingVideo}
                                    variant="default"
                                    size="sm"
                                >
                                    {isDeletingVideo ? 'Resolving...' : 'Mark Resolved'}
                                </Button>
                                <Button
                                    onClick={() => handleDeleteVideo(true)}
                                    disabled={isDeletingVideo}
                                    variant="destructive"
                                    size="sm"
                                >
                                    {isDeletingVideo ? 'Deleting...' : 'Delete Video'}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Reports Table */}
                <div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16">S.No</TableHead>
                                <TableHead>Report Type</TableHead>
                                <TableHead>Report Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reports.length > 0 ? (
                                reports.map((item, index) => (
                                    <TableRow key={item._id}>
                                        <TableCell className="font-medium">
                                            {(pagination.page - 1) * pagination.limit + index + 1}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {item?.reportType || 'Unknown'}
                                        </TableCell>
                                        <TableCell>
                                            {setReportFormatDate(item.createdAt)}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-2">
                                            <AlertCircle className="h-8 w-8 text-muted-foreground" />
                                            <p className="text-muted-foreground">No reports found</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {reports.length > 0 && (
                    <PaginationComponent
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        hasNextPage={pagination.hasNextPage}
                        hasPrevPage={pagination.hasPrevPage}
                        onPageChange={handlePageChange}
                        totalDocs={pagination.totalDocs}
                        limit={pagination.limit}
                    />
                )}
            </div>
        </Main>
    )
}

export default DetailedReport