import { useEffect, useState, useMemo } from 'react'
import { AlertCircle } from 'lucide-react'
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
import { MediaViewer } from '@/common/MediaViewer'

const ITEMS_PER_PAGE = 10

const DetailedReport: React.FC = () => {
    const { setloading } = useAllContext()
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [viewMedia, setviewMedia] = useState<{
        open: boolean;
        media: any[]; // Replace `any` with a proper media type if available
    }>({
        open: false,
        media: [],
    });

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
    const feedDetails = useMemo(() => reports[0]?.feedId || {}, [reports])

    const getAllReports = async (page: number = 1, limit: number = ITEMS_PER_PAGE): Promise<void> => {
        if (!id) return
        setloading(true)
        try {
            const response = await authAxios().get('/report', {
                params: { page, limit, feedId: id },
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

    const handleDeleteVideo = async (removeVideo: boolean): Promise<void> => {
        setIsDeletingVideo(true)
        try {
            const response = await authAxios().delete(`/report/${id}`, {
                data: { removeVideo, feedId: feedDetails._id },
            })
            toast.success(response.data.message || 'Video deleted successfully')
            navigate('/report')
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Failed to delete video')
        } finally {
            setIsDeletingVideo(false)
        }
    }

    const handlePageChange = (newPage: number) => {
        getAllReports(newPage, pagination.limit)
    }

    useEffect(() => {
        getAllReports()
    }, [id])

    return (
        <Main>
            <div className="mx-auto w-full max-w-5xl space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Reports</h1>
                        <p className="text-sm text-muted-foreground">List of all reports for this feed</p>
                    </div>
                </div>

                {/* Feed Details */}
                {feedDetails && (
                    <div className="rounded-xl border p-4 md:p-6 bg-background shadow-sm space-y-4">
                        <div className="flex flex-col md:flex-row gap-4 md:items-center">
                            <img
                                onClick={() => setviewMedia((prev) => ({
                                    ...prev,
                                    media: reports[0]?.feedId?.media,
                                    open: !viewMedia.open
                                }))}
                                src={handleThumbnail(feedDetails?.thumbnail)}
                                alt="Feed Thumbnail"
                                className="h-20 w-20 rounded-md border object-cover"
                            />
                            <div className="flex-1 space-y-1">
                                <h2 className="text-lg font-medium">{feedDetails?.title||feedDetails?.shop?.title}</h2>
                                <p className="text-sm text-muted-foreground">Feed ID: {id}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => handleDeleteVideo(false)}
                                    disabled={isDeletingVideo}
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
                <div className="rounded-lg border overflow-hidden">
                    <Table className="table-auto w-full text-sm">
                        <TableHeader>
                            <TableRow className="bg-muted/30">
                                <TableHead className="w-12 text-center">#</TableHead>
                                <TableHead>Report Type</TableHead>
                                <TableHead>Report Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reports.length > 0 ? (
                                reports.map((item, index) => (
                                    <TableRow key={item._id} className="h-10">
                                        <TableCell className="text-center">
                                            {(pagination.page - 1) * pagination.limit + index + 1}
                                        </TableCell>
                                        <TableCell className="capitalize font-medium">
                                            {item?.reportType || 'Unknown'}
                                        </TableCell>
                                        <TableCell>{setReportFormatDate(item.createdAt)}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="h-24 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-1 text-muted-foreground">
                                            <AlertCircle className="h-6 w-6" />
                                            <p>No reports found.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {
                    viewMedia.open && <MediaViewer viewMedia={viewMedia} setviewMedia={setviewMedia} />
                }
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
