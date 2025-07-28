import { useEffect, useState } from 'react'
import { Eye, MoreHorizontal, Filter, Check, X } from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/Button';

import { Main } from '@/components/main';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { setReportFormatDate } from '@/helper/helper';
import { authAxios } from '@/config/config';
import { modalInterface, paginationInterface, withdrawalInterface } from '@/common/allInterface';
import { useAllContext } from '@/context/AllContext';
import { toast } from 'sonner';
import PaginationComponent from '@/common/PaginationComponent';
import { Action } from '@radix-ui/react-alert-dialog';
import ActionWithdrawal from '@/common/Modal/ActionWithdrawal';
import { data } from 'react-router-dom';




const WithdrawalRequests = () => {
    const { setloading } = useAllContext();



    // const [filterStatus, setFilterStatus] = useState<string>('ALL');
    // const [filterType, setFilterType] = useState<string>('ALL');
    // const [filterDirection, setFilterDirection] = useState<string>('ALL');


    const [modalState, setmodalState] = useState<modalInterface>({
        isOpen: false,
        type: "",
        data: {},
    })

    const handleCloseModal = () => {
        setmodalState({
            isOpen: false,
            type: "",
            data: {},
        })
    }
    const [transactions, settransactions] = useState<withdrawalInterface[]>([

    ]);

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


    const getAllTranscations = async (page: number = 1, limit: number = 10): Promise<void> => {
        setloading(true);
        try {
            const response = await authAxios().get(`/withdrawal/requests`, {
                params: {
                    // status:filterStatus,
                    // type:filterType,
                    // direction:filterDirection,
                    page: page,
                    limit: limit
                }
            });
            const data = response.data.data.withdrawalRequests;


            settransactions(data.docs)

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
            toast.error(error?.response?.data?.message);
        } finally {
            setloading(false);
        }
    }
    const handlePageChange = (newPage: number) => {
        getAllTranscations(newPage, pagination.limit);
    };

    const handleAction = async (data: any) => {

        if (modalState.type == "APPROVE") {
            await authAxios()
                .post(`/withdrawal/${modalState?.data._id}/approve`, data)
                .then((response) => {
                    toast.success(response.data.message);
                    getAllTranscations()
                }).catch((error) => {
                    toast.error(error?.response?.data?.message);
                })
        } else {
            await authAxios()
                .post(`/withdrawal/${modalState?.data._id}/reject`,  data )
                .then((response) => {
                    toast.success(response.data.message);
                    getAllTranscations()
                }).catch((error) => {
                    toast.error(error?.response?.data?.message);
                })
        }
    }

    useEffect(() => {
        getAllTranscations()
    }, [])



    console.log("wirhad", transactions)
    return (
        <div >
            <Main>
                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Withdrawal</h2>
                        <p className='text-muted-foreground'>
                            Here&apos;s a list of your all financial transactions
                        </p>
                    </div>
                </div>
                {/* <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-muted-foreground">Filters</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                                <label className="text-sm font-medium text-muted-foreground sm:sr-only" htmlFor="statusFilter">
                                    Status
                                </label>
                                <select
                                    id="statusFilter"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="w-full sm:w-auto px-3 py-2 border border-border rounded-md text-sm bg-background"
                                >
                                    <option value="ALL">All Status</option>
                                    <option value="SUCCESS">Success</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="FAILED">Failed</option>
                                </select>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                                <label className="text-sm font-medium text-muted-foreground sm:sr-only" htmlFor="typeFilter">
                                    Type
                                </label>
                                <select
                                    id="typeFilter"
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="w-full sm:w-auto px-3 py-2 border border-border rounded-md text-sm bg-background"
                                >
                                    <option value="ALL">All Types</option>
                                    <option value="SUBSCRIPTION">Subscription</option>
                                    <option value="CHALLENGE">Challenge</option>
                                    <option value="MASTER_CLASS">Master Class</option>
                                    <option value="WITHDRAWAL">Withdrawal</option>
                                    <option value="SHOP">Shop</option>
                                    <option value="TEACHER">Teacher</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                                <label className="text-sm font-medium text-muted-foreground sm:sr-only" htmlFor="directionFilter">
                                    Direction
                                </label>
                                <select
                                    id="directionFilter"
                                    value={filterDirection}
                                    onChange={(e) => setFilterDirection(e.target.value)}
                                    className="w-full sm:w-auto px-3 py-2 border border-border rounded-md text-sm bg-background"
                                >
                                    <option value="ALL">All Directions</option>
                                    <option value="INCOMING">Incoming</option>
                                    <option value="OUTGOING">Outgoing</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <Table className="w-full border-collapse text-sm">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Sno</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead> Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead> Method</TableHead>
                                <TableHead>View Details</TableHead>
                                <TableHead> Date</TableHead>
                                <TableHead className="text-right"> Actions</TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions && transactions.length > 0 ? (
                                transactions.map((item, index) => (
                                    <TableRow key={item._id}>
                                        <TableCell className="px-4 py-3 font-medium">
                                            {index + 1}
                                        </TableCell>


                                        <TableCell>
                                            {item?.userId?.email}
                                            <p>  {item?.userId?.fullname}</p>
                                        </TableCell>
                                        <TableCell>  {item.amount}</TableCell>
                                        <TableCell>  {item.status}</TableCell>
                                        <TableCell>  {item?.paymentMethod?.type}</TableCell>
                                        <TableCell>
                                            {item?.paymentMethod?.type === "PAYPAL" ? (
                                                <>
                                                    <div>Email: {item?.paymentMethod?.details?.paypalEmail}</div>
                                                </>
                                            ) : item?.paymentMethod?.type === "BANK_ACCOUNT" ? (
                                                <>
                                                    <div>Account Holder: {item?.paymentMethod?.details?.accountHolderName}</div>
                                                    <div>Account Number: {item?.paymentMethod?.details?.accountNumber}</div>
                                                    <div>Bank Name: {item?.paymentMethod?.details?.bankName}</div>
                                                    <div>IFSC: {item?.paymentMethod?.details?.ifsc}</div>
                                                </>
                                            ) : (
                                                "-"
                                            )}
                                        </TableCell>

                                        <TableCell>  {setReportFormatDate(item?.createdAt || '2025-07-03T15:05:16.957+00:00')}</TableCell>



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

                                                            onClick={() =>
                                                                setmodalState((prev: any) => ({
                                                                    ...prev,
                                                                    isOpen: true,
                                                                    type: "APPROVE",
                                                                    data: item
                                                                }))
                                                            }

                                                            className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                                                        >
                                                            <Check className="h-3.5 w-3.5" />
                                                            <span>Approve</span>
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                setmodalState((prev: any) => ({
                                                                    ...prev,
                                                                    isOpen: true,
                                                                    type: "REJECT",
                                                                    data: item
                                                                }))
                                                            }

                                                            className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                                                        >
                                                            <X className="h-3.5 w-3.5" />
                                                            <span>Reject</span>
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
                {
                    modalState.isOpen && <ActionWithdrawal isOpen={modalState?.isOpen} modalState={modalState} onClose={handleCloseModal} handleAction={handleAction} />
                }
                <PaginationComponent
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    hasNextPage={pagination.hasNextPage}
                    hasPrevPage={pagination.hasPrevPage}
                    onPageChange={handlePageChange}
                    totalDocs={pagination.totalDocs}
                    limit={pagination.limit}
                />
            </Main>

        </div>
    );
};

export default WithdrawalRequests;