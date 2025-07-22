import  { useState } from 'react'
import {  Eye, MoreHorizontal, Trash, Download, Filter, CheckCircle, XCircle, Clock, DollarSign } from 'lucide-react'
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

interface WithdrawalRequestInterface {
    id: string;
    userId: string;
    userDetails: {
        name: string;
        email: string;
        phone?: string;
    };
    requestedAmount: number;
    availableBalance: number;
    currency: string;
    withdrawalMethod: 'BANK_TRANSFER' | 'PAYPAL' | 'STRIPE' | 'BIZUM' | 'CRYPTO';
    bankDetails?: {
        accountNumber: string;
        routingNumber: string;
        bankName: string;
        accountHolderName: string;
    };
    paypalEmail?: string;
    cryptoAddress?: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
    requestDate: string;
    processedDate?: string;
    adminNotes?: string;
    reasonForRejection?: string;
    transactionFee: number;
    netAmount: number;
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
    verificationStatus: 'VERIFIED' | 'PENDING_VERIFICATION' | 'REJECTED';
    documents?: string[];
    createdAt: string;
    updatedAt: string;
}

const WithdrawalRequests = () => {
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        isEditMode: boolean;
        isDeleteMode: boolean;
        isApprovalMode: boolean;
        currentRequest: WithdrawalRequestInterface | null;
    }>({
        isOpen: false,
        isDeleteMode: false,
        isEditMode: false,
        isApprovalMode: false,
        currentRequest: null,
    });

    const [filterStatus, setFilterStatus] = useState<string>('ALL');
    const [filterMethod, setFilterMethod] = useState<string>('ALL');
    const [filterPriority, setFilterPriority] = useState<string>('ALL');
    const [filterVerification, setFilterVerification] = useState<string>('ALL');

    const [withdrawalRequests] = useState<WithdrawalRequestInterface[]>([
        {
            id: 'WR001',
            userId: 'user123',
            userDetails: {
                name: 'John Doe',
                email: 'john.doe@email.com',
                phone: '+1234567890'
            },
            requestedAmount: 500.00,
            availableBalance: 750.00,
            currency: 'EUR',
            withdrawalMethod: 'BANK_TRANSFER',
            bankDetails: {
                accountNumber: '****1234',
                routingNumber: '123456789',
                bankName: 'Chase Bank',
                accountHolderName: 'John Doe'
            },
            status: 'PENDING',
            requestDate: '2025-07-20T10:30:00Z',
            adminNotes: '',
            transactionFee: 5.00,
            netAmount: 495.00,
            priority: 'MEDIUM',
            verificationStatus: 'VERIFIED',
            createdAt: '2025-07-20T10:30:00Z',
            updatedAt: '2025-07-20T10:30:00Z',
        },
        {
            id: 'WR002',
            userId: 'user456',
            userDetails: {
                name: 'Jane Smith',
                email: 'jane.smith@email.com',
                phone: '+9876543210'
            },
            requestedAmount: 1200.00,
            availableBalance: 1500.00,
            currency: 'EUR',
            withdrawalMethod: 'PAYPAL',
            paypalEmail: 'jane.smith@paypal.com',
            status: 'APPROVED',
            requestDate: '2025-07-19T14:20:00Z',
            processedDate: '2025-07-19T16:45:00Z',
            adminNotes: 'Approved after verification',
            transactionFee: 12.00,
            netAmount: 1188.00,
            priority: 'HIGH',
            verificationStatus: 'VERIFIED',
            createdAt: '2025-07-19T14:20:00Z',
            updatedAt: '2025-07-19T16:45:00Z',
        },
        {
            id: 'WR003',
            userId: 'user789',
            userDetails: {
                name: 'Mike Johnson',
                email: 'mike.johnson@email.com'
            },
            requestedAmount: 2500.00,
            availableBalance: 2000.00,
            currency: 'EUR',
            withdrawalMethod: 'BANK_TRANSFER',
            bankDetails: {
                accountNumber: '****5678',
                routingNumber: '987654321',
                bankName: 'Bank of America',
                accountHolderName: 'Mike Johnson'
            },
            status: 'REJECTED',
            requestDate: '2025-07-18T09:15:00Z',
            processedDate: '2025-07-18T11:30:00Z',
            adminNotes: 'Insufficient balance',
            reasonForRejection: 'Requested amount exceeds available balance',
            transactionFee: 25.00,
            netAmount: 2475.00,
            priority: 'HIGH',
            verificationStatus: 'VERIFIED',
            createdAt: '2025-07-18T09:15:00Z',
            updatedAt: '2025-07-18T11:30:00Z',
        },
        {
            id: 'WR004',
            userId: 'user321',
            userDetails: {
                name: 'Sarah Wilson',
                email: 'sarah.wilson@email.com',
                phone: '+1122334455'
            },
            requestedAmount: 800.00,
            availableBalance: 1200.00,
            currency: 'EUR',
            withdrawalMethod: 'BIZUM',
            status: 'PROCESSING',
            requestDate: '2025-07-17T16:45:00Z',
            processedDate: '2025-07-18T08:00:00Z',
            adminNotes: 'Processing payment',
            transactionFee: 8.00,
            netAmount: 792.00,
            priority: 'MEDIUM',
            verificationStatus: 'VERIFIED',
            createdAt: '2025-07-17T16:45:00Z',
            updatedAt: '2025-07-18T08:00:00Z',
        },
        {
            id: 'WR005',
            userId: 'user654',
            userDetails: {
                name: 'David Brown',
                email: 'david.brown@email.com'
            },
            requestedAmount: 300.00,
            availableBalance: 450.00,
            currency: 'EUR',
            withdrawalMethod: 'CRYPTO',
            cryptoAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
            status: 'PENDING',
            requestDate: '2025-07-21T11:30:00Z',
            adminNotes: '',
            transactionFee: 15.00,
            netAmount: 285.00,
            priority: 'URGENT',
            verificationStatus: 'PENDING_VERIFICATION',
            documents: ['id_verification.pdf', 'address_proof.pdf'],
            createdAt: '2025-07-21T11:30:00Z',
            updatedAt: '2025-07-21T11:30:00Z',
        },
        {
            id: 'WR006',
            userId: 'user987',
            userDetails: {
                name: 'Emily Davis',
                email: 'emily.davis@email.com',
                phone: '+5566778899'
            },
            requestedAmount: 1500.00,
            availableBalance: 2200.00,
            currency: 'EUR',
            withdrawalMethod: 'STRIPE',
            status: 'COMPLETED',
            requestDate: '2025-07-16T13:20:00Z',
            processedDate: '2025-07-16T15:30:00Z',
            adminNotes: 'Successfully completed',
            transactionFee: 15.00,
            netAmount: 1485.00,
            priority: 'LOW',
            verificationStatus: 'VERIFIED',
            createdAt: '2025-07-16T13:20:00Z',
            updatedAt: '2025-07-16T15:30:00Z',
        },
    ]);

    const navigation = useNavigate();

   

    const formatAmount = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'APPROVED':
            case 'COMPLETED':
                return <CheckCircle className="h-4 w-4" />;
            case 'REJECTED':
            case 'CANCELLED':
                return <XCircle className="h-4 w-4" />;
            case 'PENDING':
            case 'PENDING_VERIFICATION':
                return <Clock className="h-4 w-4" />;
            case 'PROCESSING':
                return <DollarSign className="h-4 w-4" />;
            default:
                return <Clock className="h-4 w-4" />;
        }
    };

   

    const handleOpenDeleteModal = (request: WithdrawalRequestInterface): void => {
        setModalState({
            isOpen: false,
            isEditMode: false,
            isDeleteMode: true,
            isApprovalMode: false,
            currentRequest: request,
        });
    };

    const handleCloseModal = (): void => {
        setModalState({
            isOpen: false,
            isEditMode: false,
            isDeleteMode: false,
            isApprovalMode: false,
            currentRequest: null,
        });
    };

    const handleApprove = async (): Promise<void> => {
        // API call to approve withdrawal request
        console.log('Approving request:', modalState.currentRequest?.id);
        handleCloseModal();
        // try {
        //     const response = await authAxios().patch(
        //         `/withdrawal-requests/${modalState?.currentRequest?.id}/approve`
        //     );
        //     await getWithdrawalRequests();
        //     toast.success("Withdrawal request approved successfully");
        // } catch (error) {
        //     console.error("Error approving withdrawal request:", error);
        // }
    };

    const handleReject = async (): Promise<void> => {
        // API call to reject withdrawal request
        console.log('Rejecting request:', modalState.currentRequest?.id);
        handleCloseModal();
        // try {
        //     const response = await authAxios().patch(
        //         `/withdrawal-requests/${modalState?.currentRequest?.id}/reject`
        //     );
        //     await getWithdrawalRequests();
        //     toast.success("Withdrawal request rejected successfully");
        // } catch (error) {
        //     console.error("Error rejecting withdrawal request:", error);
        // }
    };

    const handleDelete = async (): Promise<void> => {
        handleCloseModal();
        // API call to delete withdrawal request
        // try {
        //     const response = await authAxios().delete(
        //         `/withdrawal-requests/${modalState?.currentRequest?.id}`
        //     );
        //     await getWithdrawalRequests();
        //     toast.success("Withdrawal request deleted successfully");
        // } catch (error) {
        //     console.error("Error deleting withdrawal request:", error);
        // }
    };

    const filteredRequests = withdrawalRequests.filter(request => {
        const statusMatch = filterStatus === 'ALL' || request.status === filterStatus;
        const methodMatch = filterMethod === 'ALL' || request.withdrawalMethod === filterMethod;
        const priorityMatch = filterPriority === 'ALL' || request.priority === filterPriority;
        const verificationMatch = filterVerification === 'ALL' || request.verificationStatus === filterVerification;
        return statusMatch && methodMatch && priorityMatch && verificationMatch;
    });

    const totalRequestedAmount = filteredRequests.reduce((sum, request) => sum + request.requestedAmount, 0);
   
    const totalNetAmount = filteredRequests.reduce((sum, request) => sum + request.netAmount, 0);

    const pendingRequests = filteredRequests.filter(req => req.status === 'PENDING').length;
    const approvedRequests = filteredRequests.filter(req => req.status === 'APPROVED' || req.status === 'COMPLETED').length;

    return (
        <div>
            <Main>
                <div className='mb-6 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Withdrawal Requests</h2>
                        <p className='text-muted-foreground'>
                            Manage and process user withdrawal requests
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Button 
                            onClick={() => {/* Export functionality */}}
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <Download className="h-4 w-4" />
                            Export
                        </Button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-card p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Pending</span>
                        </div>
                        <div className="text-2xl font-bold">{pendingRequests}</div>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Approved</span>
                        </div>
                        <div className="text-2xl font-bold">{approvedRequests}</div>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Total Requested</span>
                        </div>
                        <div className="text-2xl font-bold">{formatAmount(totalRequestedAmount, 'EUR')}</div>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Net Amount</span>
                        </div>
                        <div className="text-2xl font-bold">{formatAmount(totalNetAmount, 'EUR')}</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium text-muted-foreground">Filters</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full sm:w-auto px-3 py-2 border border-border rounded-md text-sm bg-background"
                            >
                                <option value="ALL">All Status</option>
                                <option value="PENDING">Pending</option>
                                <option value="APPROVED">Approved</option>
                                <option value="REJECTED">Rejected</option>
                                <option value="PROCESSING">Processing</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
                            </select>

                            <select
                                value={filterMethod}
                                onChange={(e) => setFilterMethod(e.target.value)}
                                className="w-full sm:w-auto px-3 py-2 border border-border rounded-md text-sm bg-background"
                            >
                                <option value="ALL">All Methods</option>
                                <option value="BANK_TRANSFER">Bank Transfer</option>
                                <option value="PAYPAL">PayPal</option>
                                <option value="STRIPE">Stripe</option>
                                <option value="BIZUM">Bizum</option>
                                <option value="CRYPTO">Crypto</option>
                            </select>

                            <select
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value)}
                                className="w-full sm:w-auto px-3 py-2 border border-border rounded-md text-sm bg-background"
                            >
                                <option value="ALL">All Priorities</option>
                                <option value="URGENT">Urgent</option>
                                <option value="HIGH">High</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="LOW">Low</option>
                            </select>

                            <select
                                value={filterVerification}
                                onChange={(e) => setFilterVerification(e.target.value)}
                                className="w-full sm:w-auto px-3 py-2 border border-border rounded-md text-sm bg-background"
                            >
                                <option value="ALL">All Verification</option>
                                <option value="VERIFIED">Verified</option>
                                <option value="PENDING_VERIFICATION">Pending Verification</option>
                                <option value="REJECTED">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1'>
                    <Table className="w-full border-collapse text-sm">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">ID</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Verification</TableHead>
                                <TableHead>Request Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredRequests.length > 0 ? (
                                filteredRequests.map((request) => (
                                    <TableRow key={request.id}>
                                        <TableCell className="font-medium">
                                            {request.id}
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{request.userDetails.name}</div>
                                                <div className="text-xs text-muted-foreground">{request.userDetails.email}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{formatAmount(request.requestedAmount, request.currency)}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    Net: {formatAmount(request.netAmount, request.currency)}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{request.withdrawalMethod.replace('_', ' ')}</TableCell>
                                        <TableCell>
                                            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground`}>
                                                {getStatusIcon(request.status)}
                                                {request.status}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground`}>
                                                {request.priority}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground`}>
                                                {request.verificationStatus.replace('_', ' ')}
                                            </span>
                                        </TableCell>
                                        <TableCell>{setReportFormatDate(request.requestDate)}</TableCell>
                                        <TableCell className="text-right">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        onClick={() =>
                                                            setModalState((prev) => ({
                                                                ...prev,
                                                                currentRequest: request,
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
                                                    className="w-40 p-1 bg-popover border border-border shadow-md"
                                                >
                                                    <div className="flex flex-col space-y-1">
                                                        <button
                                                            onClick={() => navigation(`/withdrawal-requests/${request.id}`)}
                                                            className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                                                        >
                                                            <Eye className="h-3.5 w-3.5" />
                                                            <span>View Details</span>
                                                        </button>
                                                        {request.status === 'PENDING' && (
                                                            <>
                                                                <button
                                                                    onClick={() => handleApprove()}
                                                                    className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                                                                >
                                                                    <CheckCircle className="h-3.5 w-3.5" />
                                                                    <span>Approve</span>
                                                                </button>
                                                                <button
                                                                    onClick={() => handleReject()}
                                                                    className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                                                                >
                                                                    <XCircle className="h-3.5 w-3.5" />
                                                                    <span>Reject</span>
                                                                </button>
                                                            </>
                                                        )}
                                                        <button
                                                            className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                                                            onClick={() => handleOpenDeleteModal(request)}
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
                                        className="px-4 py-8 text-center text-muted-foreground"
                                    >
                                        No withdrawal requests found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Delete Confirmation Modal */}
                {modalState.isDeleteMode && modalState.currentRequest && (
                    <DeleteConfirmationModal
                        isOpen={modalState.isDeleteMode}
                        onClose={handleCloseModal}
                        onConfirm={handleDelete}
                        title="Delete Withdrawal Request"
                       // message={`Are you sure you want to delete withdrawal request ${modalState.currentRequest.id}? This action cannot be undone.`}
                    />
                )}
            </Main>
        </div>
    );
};

export default WithdrawalRequests;