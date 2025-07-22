import { useEffect, useState } from 'react'
import { Eye, MoreHorizontal, Trash, RefreshCw } from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/Button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from '@/common/Modal/DeleteConfirmationModal';
import { Main } from '@/components/main';
import { authAxios } from '@/config/config';
import { toast } from 'sonner';

interface ChallengeInterface {
    _id: string;
    title: string;
    description: string;
    duration: string;
    price: number;
    category: {
        _id: string;
        name: string;
    };
    userId: {
        _id: string;
        fullname: string;
        username: string;
        email: string;
        profilePic: string;
    };
    status: 'RUNNING' | 'COMPLETED' | 'CANCELLED';
    type: 'PUBLIC' | 'PRIVATE';
    winners: any[];
    createdAt: string;
    updatedAt: string;
    stats: {
        participantsCount: number;
        totalRevenue: number;
    };
}

interface ApiResponse {
    success: boolean;
    message: string;
    data: {
        docs: ChallengeInterface[];
        totalDocs: number;
        limit: number;
        totalPages: number;
        page: number;
        pagingCounter: number;
        hasPrevPage: boolean;
        hasNextPage: boolean;
        prevPage: number | null;
        nextPage: number | null;
    };
}

const Challenge = () => {
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        isEditMode: boolean;
        isDeleteMode: boolean;
        currentChallenge: ChallengeInterface | null;
    }>({
        isOpen: false,
        isDeleteMode: false,
        isEditMode: false,
        currentChallenge: null,
    });

    const [challenges, setChallenges] = useState<ChallengeInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalPages: 1,
        totalDocs: 0,
        hasNextPage: false,
        hasPrevPage: false
    });

    const navigation = useNavigate();

    const handleOpenDeleteModal = (item: ChallengeInterface): void => {
        setModalState({
            isOpen: false,
            isEditMode: false,
            isDeleteMode: true,
            currentChallenge: item,
        });
    };

    const handleCloseModal = (): void => {
        setModalState({
            isOpen: false,
            isEditMode: false,
            isDeleteMode: false,
            currentChallenge: null,
        });
    };

    const handleDelete = async (): Promise<void> => {
        if (!modalState.currentChallenge) return;

        try {
            setLoading(true);
            const response = await authAxios().delete(
                `/challenge/${modalState.currentChallenge._id}`
            );

            await getAllChallenges();
            handleCloseModal();
            toast.success(response.data.message || "Challenge deleted successfully");
        } catch (error: any) {
            console.error("Error deleting challenge:", error);
            toast.error(error?.response?.data?.message || "Failed to delete challenge");
        } finally {
            setLoading(false);
        }
    };

    const getAllChallenges = async (page: number = 1): Promise<void> => {
        try {
            setLoading(true);
            const response = await authAxios().get<ApiResponse>('/challenge', {
                params: {
                    type: "PUBLIC",
                    status: "RUNNING",
                    page,
                    limit: pagination.limit
                }
            });

            console.log("Fetched challenges:", response.data);

            if (response.data?.success && response.data?.data?.docs) {
                setChallenges(response.data.data.docs);
                setPagination({
                    page: response.data.data.page,
                    limit: response.data.data.limit,
                    totalPages: response.data.data.totalPages,
                    totalDocs: response.data.data.totalDocs,
                    hasNextPage: response.data.data.hasNextPage,
                    hasPrevPage: response.data.data.hasPrevPage
                });
            } else {
                setChallenges([]);
                toast.error("No challenges found");
            }
        } catch (error: any) {
            console.error("Error fetching challenges:", error);
            setChallenges([]);
            toast.error(error?.response?.data?.message || "Failed to fetch challenges");
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage: number): void => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            getAllChallenges(newPage);
        }
    };

    const formatDate = (dateString: string): string => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return 'Invalid Date';
        }
    };

    const formatPrice = (price: number): string => {
        return `$${price}`;
    };



    useEffect(() => {
        getAllChallenges();
    }, []);

    return (
        <div>
            <Main>
                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Challenges</h2>
                        <p className='text-muted-foreground'>
                            Here&apos;s a list of your Wakeup Challenges 
                            {/* ({pagination.totalDocs} total) */}
                        </p>
                    </div>

                </div>

                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <Table className="w-full border-collapse text-sm">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[60px]">Sno</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>End Date</TableHead>
                                <TableHead>Participants</TableHead>
                                <TableHead>Revenue</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={9}
                                        className="px-4 py-8 text-center text-gray-500"
                                    >
                                        <RefreshCw className="h-4 w-4 animate-spin mx-auto mb-2" />
                                        Loading challenges...
                                    </TableCell>
                                </TableRow>
                            ) : challenges.length > 0 ? (
                                challenges.map((item, index) => (
                                    <TableRow key={item._id}>
                                        <TableCell className="px-4 py-3 font-medium">
                                            {(pagination.page - 1) * pagination.limit + index + 1}
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{item.title}</div>
                                                <div className="text-xs text-gray-500 truncate max-w-[200px]">
                                                    {item.description}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{item.category.name}</TableCell>
                                        <TableCell>{formatPrice(item.price)}</TableCell>
                                        <TableCell>{formatDate(item.duration)}</TableCell>
                                        <TableCell>{item.stats.participantsCount}</TableCell>
                                        <TableCell>{formatPrice(item.stats.totalRevenue)}</TableCell>

                                        <TableCell>{item.status}</TableCell>
                                        <TableCell className="text-right">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
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
                                                            onClick={() => navigation(`/challenge/${item._id}`)}
                                                            className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                                                        >
                                                            <Eye className="h-3.5 w-3.5" />
                                                            <span>View</span>
                                                        </button>
                                                        <button
                                                            className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                                                            onClick={() => handleOpenDeleteModal(item)}
                                                            disabled={loading}
                                                        >
                                                            <Trash className="h-3.5 w-3.5" />
                                                            <span>Delete</span>
                                                        </button>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={9}
                                        className="px-4 py-8 text-center text-gray-500"
                                    >
                                        No challenges found. Try refreshing or check your filters.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between px-2 py-4">
                        <div className="text-sm text-muted-foreground">
                            Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
                            {Math.min(pagination.page * pagination.limit, pagination.totalDocs)} of{' '}
                            {pagination.totalDocs} results
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(pagination.page - 1)}
                                disabled={!pagination.hasPrevPage || loading}
                            >
                                Previous
                            </Button>
                            <div className="flex items-center space-x-1">
                                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                    const pageNumber = i + 1;
                                    return (
                                        <Button
                                            key={pageNumber}
                                            variant={pagination.page === pageNumber ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => handlePageChange(pageNumber)}
                                            disabled={loading}
                                        >
                                            {pageNumber}
                                        </Button>
                                    );
                                })}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(pagination.page + 1)}
                                disabled={!pagination.hasNextPage || loading}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}

                {modalState.isDeleteMode && (
                    <DeleteConfirmationModal
                        isOpen={modalState.isDeleteMode}
                        onClose={handleCloseModal}
                        onConfirm={handleDelete}
                        title="Delete Challenge"
                        description={`Are you sure you want to delete "${modalState.currentChallenge?.title}"? This action cannot be undone.`}
                    />
                )}
            </Main>
        </div>
    );
};

export default Challenge;