import React, { useState } from 'react'
import { Edit, Eye, MoreHorizontal, Trash, Download, Filter } from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from '@/common/Modal/DeleteConfirmationModal';
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
interface TransactionInterface {
    id: string;
    userId: string;
    paymentDetails: Record<string, any>;
    paymentIntentId?: string;
    amount: number;
    currency: string;
    direction: 'INCOMING' | 'OUTGOING';
    transactionType: 'SUBSCRIPTION' | 'CHALLENGE' | 'MASTER_CLASS' | 'WITHDRAWAL' | 'SHOP' | 'TEACHER' | 'OTHER';
    provider: 'STRIPE' | 'BIZUM';
    status: 'PENDING' | 'SUCCESS' | 'FAILED';
    createdAt: string;
    updatedAt: string;
}

const Transactions = () => {
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        isEditMode: boolean;
        isDeleteMode: boolean;
        currentTransaction: TransactionInterface | null;
    }>({
        isOpen: false,
        isDeleteMode: false,
        isEditMode: false,
        currentTransaction: null,
    });

    const [filterStatus, setFilterStatus] = useState<string>('ALL');
    const [filterType, setFilterType] = useState<string>('ALL');
    const [filterDirection, setFilterDirection] = useState<string>('ALL');

    const [transactions] = useState<TransactionInterface[]>([
        {
            id: '1',
            userId: 'user123',
            paymentDetails: { method: 'card', last4: '4242' },
            paymentIntentId: 'pi_1234567890',
            amount: 99.99,
            currency: 'EUR',
            direction: 'INCOMING',
            transactionType: 'CHALLENGE',
            provider: 'STRIPE',
            status: 'SUCCESS',
            createdAt: '2025-07-15T10:30:00Z',
            updatedAt: '2025-07-15T10:30:00Z',
        },
        {
            id: '2',
            userId: 'user456',
            paymentDetails: { method: 'bizum', phone: '***6789' },
            paymentIntentId: 'pi_0987654321',
            amount: 149.99,
            currency: 'EUR',
            direction: 'INCOMING',
            transactionType: 'SUBSCRIPTION',
            provider: 'BIZUM',
            status: 'SUCCESS',
            createdAt: '2025-07-14T14:20:00Z',
            updatedAt: '2025-07-14T14:20:00Z',
        },
        {
            id: '3',
            userId: 'user789',
            paymentDetails: { method: 'card', last4: '1234' },
            amount: 250.00,
            currency: 'EUR',
            direction: 'OUTGOING',
            transactionType: 'WITHDRAWAL',
            provider: 'STRIPE',
            status: 'PENDING',
            createdAt: '2025-07-13T09:15:00Z',
            updatedAt: '2025-07-13T09:15:00Z',
        },
        {
            id: '4',
            userId: 'user321',
            paymentDetails: { method: 'card', last4: '5678' },
            paymentIntentId: 'pi_1122334455',
            amount: 79.99,
            currency: 'EUR',
            direction: 'INCOMING',
            transactionType: 'MASTER_CLASS',
            provider: 'STRIPE',
            status: 'SUCCESS',
            createdAt: '2025-07-12T16:45:00Z',
            updatedAt: '2025-07-12T16:45:00Z',
        },
        {
            id: '5',
            userId: 'user654',
            paymentDetails: { method: 'card', last4: '9012' },
            paymentIntentId: 'pi_5566778899',
            amount: 39.99,
            currency: 'EUR',
            direction: 'INCOMING',
            transactionType: 'SHOP',
            provider: 'STRIPE',
            status: 'FAILED',
            createdAt: '2025-07-11T11:30:00Z',
            updatedAt: '2025-07-11T11:30:00Z',
        },
        {
            id: '6',
            userId: 'user987',
            paymentDetails: { method: 'bizum', phone: '***1234' },
            amount: 199.99,
            currency: 'EUR',
            direction: 'INCOMING',
            transactionType: 'TEACHER',
            provider: 'BIZUM',
            status: 'SUCCESS',
            createdAt: '2025-07-10T13:20:00Z',
            updatedAt: '2025-07-10T13:20:00Z',
        },
    ]);

    const navigation = useNavigate();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatAmount = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    };

    const handleOpenDeleteModal = (item: TransactionInterface): void => {
        setModalState({
            isOpen: false,
            isEditMode: false,
            isDeleteMode: true,
            currentTransaction: item,
        });
    };

    const handleCloseModal = (): void => {
        setModalState({
            isOpen: false,
            isEditMode: false,
            isDeleteMode: false,
            currentTransaction: null,
        });
    };

    const handleDelete = async (): Promise<void> => {
        handleCloseModal();
        // API call to delete transaction
        // try {
        //     const response = await authAxios(token).delete(
        //         `/transactions/${modalState?.currentTransaction?.id}`
        //     );
        //     await getTransactions();
        //     toast.success("Transaction deleted successfully");
        // } catch (error) {
        //     console.error("Error deleting transaction:", error);
        // }
    };

    const filteredTransactions = transactions.filter(transaction => {
        const statusMatch = filterStatus === 'ALL' || transaction.status === filterStatus;
        const typeMatch = filterType === 'ALL' || transaction.transactionType === filterType;
        const directionMatch = filterDirection === 'ALL' || transaction.direction === filterDirection;
        return statusMatch && typeMatch && directionMatch;
    });

    const totalAmount = filteredTransactions.reduce((sum, transaction) => {
        return transaction.direction === 'INCOMING'
            ? sum + transaction.amount
            : sum - transaction.amount;
    }, 0);

    return (
        <div >
            <Main>
                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Transcations</h2>
                        <p className='text-muted-foreground'>
                            Here&apos;s a list of your all financial transactions
                        </p>
                    </div>
                </div>
                <div className="mb-6">
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
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <Table className="w-full border-collapse text-sm">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Sno</TableHead>

                                <TableHead>Type</TableHead>
                                <TableHead> Amount</TableHead>
                                <TableHead>Direction</TableHead>

                                <TableHead> Provider</TableHead>
                                <TableHead> Status</TableHead>
                                <TableHead> Date</TableHead>

                                <TableHead className="text-right"> Actions</TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.length > 0 ? (
                                transactions.map((item, index) => (
                                    <TableRow key={item._id}>
                                        <TableCell className="px-4 py-3 font-medium">
                                            {index + 1}
                                        </TableCell>


                                        <TableCell>  {item.transactionType}</TableCell>
                                        <TableCell>  {item.amount}</TableCell>
                                        <TableCell>  {item.direction}</TableCell>
                                        <TableCell>  {item.provider}</TableCell>
                                        <TableCell>  {item.status}</TableCell>
                                        <TableCell>  {setReportFormatDate(item.createdAt)}</TableCell>


                                        {/* <TableCell>{setReportFormatDate(item.category)}</TableCell> */}
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
                                                            // onClick={() => navigation(`/challenge/${item.id}`)}
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
                                        No Challenges found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

            </Main>

        </div>
    );
};

export default Transactions;