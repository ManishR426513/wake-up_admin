import { useEffect, useState } from 'react'
import { Eye, MoreHorizontal } from 'lucide-react'
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
import { challengeInterface, paginationInterface } from '@/common/allInterface';
import { useAllContext } from '@/context/AllContext';
import { authAxios } from '@/config/config';
import { toast } from 'sonner';
import { handlePrice, setReportFormatDate } from '@/helper/helper';
import PaginationComponent from '@/common/PaginationComponent';
//import { setReportFormatDate } from '@/helper/helper';
const Challenge = () => {
    const { setloading } = useAllContext();

    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        isEditMode: boolean;
        isDeleteMode: boolean;
        currentChallenege: challengeInterface | null;
    }>({
        isOpen: false,
        isDeleteMode: false,
        isEditMode: false,
        currentChallenege: null,
    });
    const [pagination, setPagination] = useState<paginationInterface>({
        totalDocs: 0,
        limit: 10,
        totalPages: 0,
        page: 1,
        pagingCounter: 1,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: null,
        nextPage: null,
    });
    const [challenges, setchallenges] = useState<challengeInterface[]>([])

    const navigation = useNavigate()




    // const handleOpenDeleteModal = (item: challengeInterface): void => {
    //     setModalState({
    //         isOpen: false,
    //         isEditMode: false,
    //         isDeleteMode: true,
    //         currentChallenege: item,
    //     });
    // };
    const handleCloseModal = (): void => {
        setModalState({
            isOpen: false,
            isEditMode: false,
            isDeleteMode: false,
            currentChallenege: null,
        });
    };
    const handleDelete = async (): Promise<void> => {
        handleCloseModal();
        // try {
        //   const response = await authAxios().delete(
        //     `/category/${modalState?.currentCategory?._id}`
        //   );
        //   await getCategories();
        //   handleCloseModal();

        //   toast.success(response.data.message);
        // } catch (error) {
        //   console.error("Error deleting category:", error);
        // }
    };
    const getAllChallenges = async (page: number = 1, limit: number = 10): Promise<void> => {
        setloading(true);
        try {
            const response = await authAxios().get(`/challenge`, {
                params: {
                    type: "PUBLIC",
                    status: "RUNNING",
                    page: page,
                    limit: limit,

                }
            });
            const data = response.data.data;

            console.log("re", data)
            setchallenges(data.docs);
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
            });
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to fetch users");
        } finally {
            setloading(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        getAllChallenges(newPage, pagination.limit);
    };
    useEffect(() => {
        getAllChallenges();
    }, []);



    return (
        <div >
            <Main>

                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Challenges</h2>
                        <p className='text-muted-foreground'>
                            Here&apos;s a list of your Wakeup Challneges
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
                            {challenges.length > 0 ? (
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
                                        <TableCell>{item?.category?.name}</TableCell>
                                        <TableCell>{handlePrice(item.price)}</TableCell>
                                        <TableCell>{setReportFormatDate(item.duration)}</TableCell>
                                        <TableCell>{item?.stats?.participantsCount}</TableCell>
                                        <TableCell>{item?.stats?.totalRevenue}</TableCell>

                                        <TableCell>{item?.status}</TableCell>


                                        <TableCell className="text-right">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        onClick={() =>
                                                            setModalState((prev) => ({
                                                                ...prev,
                                                                currentCategory: item,
                                                            }))
                                                        }
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
                                                        {/* <button
                                                            className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                                                            onClick={() => handleOpenDeleteModal(item)}
                                                        >
                                                            <Trash className="h-3.5 w-3.5" />
                                                            <span>Delete</span>
                                                        </button> */}
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="px-4 py-3 text-center text-gray-500"
                                    >
                                        No Results
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <PaginationComponent
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    hasNextPage={pagination.hasNextPage}
                    hasPrevPage={pagination.hasPrevPage}
                    onPageChange={handlePageChange}
                    totalDocs={pagination.totalDocs}
                    limit={pagination.limit}
                />
                {modalState.isDeleteMode && (
                    <DeleteConfirmationModal
                        isOpen={modalState.isDeleteMode}
                        onClose={handleCloseModal}
                        onConfirm={handleDelete}
                        title="Delete Category"
                        description={`Are you sure you want to delete "${modalState.currentChallenege?.title}"? `}
                    />
                )}
            </Main>
        </div>
    )
}

export default Challenge
