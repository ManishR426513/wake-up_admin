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
        <div className="w-full max-w-7xl mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Transaction Dashboard</h1>
                <p className="text-muted-foreground">Monitor and manage all financial transactions</p>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="text-sm font-medium">Filters:</span>
                </div>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border rounded-md text-sm bg-background"
                >
                    <option value="ALL">All Status</option>
                    <option value="SUCCESS">Success</option>
                    <option value="PENDING">Pending</option>
                    <option value="FAILED">Failed</option>
                </select>
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-3 py-2 border rounded-md text-sm bg-background"
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
                <select
                    value={filterDirection}
                    onChange={(e) => setFilterDirection(e.target.value)}
                    className="px-3 py-2 border rounded-md text-sm bg-background"
                >
                    <option value="ALL">All Directions</option>
                    <option value="INCOMING">Incoming</option>
                    <option value="OUTGOING">Outgoing</option>
                </select>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-card p-4 rounded-lg border shadow-sm">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Transactions</h3>
                    <p className="text-2xl font-bold">{filteredTransactions.length}</p>
                </div>
                <div className="bg-card p-4 rounded-lg border shadow-sm">
                    <h3 className="text-sm font-medium text-muted-foreground">Net Amount</h3>
                    <p className="text-2xl font-bold">
                        {formatAmount(totalAmount, 'EUR')}
                    </p>
                </div>
                <div className="bg-card p-4 rounded-lg border shadow-sm">
                    <h3 className="text-sm font-medium text-muted-foreground">Successful</h3>
                    <p className="text-2xl font-bold">
                        {filteredTransactions.filter(t => t.status === 'SUCCESS').length}
                    </p>
                </div>
                <div className="bg-card p-4 rounded-lg border shadow-sm">
                    <h3 className="text-sm font-medium text-muted-foreground">Pending</h3>
                    <p className="text-2xl font-bold">
                        {filteredTransactions.filter(t => t.status === 'PENDING').length}
                    </p>
                </div>
            </div>

            <div className="bg-card border rounded-lg overflow-hidden shadow-sm">
                <table className="w-full">
                    <caption className="py-4 text-sm text-muted-foreground">
                        A comprehensive list of all transactions
                    </caption>
                    <thead>
                        <tr className="bg-muted/50">
                            <th className="w-16 font-semibold text-left px-4 py-3">S.No</th>
                            <th className="font-semibold text-left px-4 py-3">Transaction ID</th>
                            <th className="font-semibold text-left px-4 py-3">Type</th>
                            <th className="font-semibold text-left px-4 py-3">Amount</th>
                            <th className="font-semibold text-left px-4 py-3">Direction</th>
                            <th className="font-semibold text-left px-4 py-3">Provider</th>
                            <th className="font-semibold text-left px-4 py-3">Status</th>
                            <th className="font-semibold text-left px-4 py-3">Date</th>
                            <th className="font-semibold text-center px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map((transaction, index) => (
                            <tr key={transaction.id} className="border-b hover:bg-muted/50">
                                <td className="font-medium px-4 py-3">
                                    {index + 1}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="font-medium text-sm">
                                        {transaction.id}
                                    </div>
                                    {transaction.paymentIntentId && (
                                        <div className="text-xs text-muted-foreground">
                                            {transaction.paymentIntentId}
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary">
                                        {transaction.transactionType}
                                    </span>
                                </td>
                                <td className="px-4 py-3 font-medium">
                                    {formatAmount(transaction.amount, transaction.currency)}
                                </td>
                                <td className="px-4 py-3">
                                    <span className="font-medium">
                                        {transaction.direction}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted">
                                        {transaction.provider}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary">
                                        {transaction.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    {formatDate(transaction.createdAt)}
                                </td>
                                <td className="text-center px-4 py-3">
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
                                            className="w-32 p-1 bg-popover border border-border shadow-md"
                                        >
                                            <div className="flex flex-col space-y-1">
                                                <button
                                                    onClick={() => navigation(`/transaction/${transaction.id}`)}
                                                    className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                                                >
                                                    <Eye className="h-3.5 w-3.5" />
                                                    <span>View</span>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        // Export transaction details
                                                        const dataStr = JSON.stringify(transaction, null, 2);
                                                        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
                                                        const exportFileDefaultName = `transaction_${transaction.id}.json`;
                                                        const linkElement = document.createElement('a');
                                                        linkElement.setAttribute('href', dataUri);
                                                        linkElement.setAttribute('download', exportFileDefaultName);
                                                        linkElement.click();
                                                    }}
                                                    className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                                                >
                                                    <Download className="h-3.5 w-3.5" />
                                                    <span>Export</span>
                                                </button>
                                                <button
                                                    onClick={() => handleOpenDeleteModal(transaction)}
                                                    className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm text-destructive"
                                                >
                                                    <Trash className="h-3.5 w-3.5" />
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {modalState.isDeleteMode && (
                <DeleteConfirmationModal
                    isOpen={modalState.isDeleteMode}
                    onClose={handleCloseModal}
                    onConfirm={handleDelete}
                    title="Delete Transaction"
                    description={`Are you sure you want to delete transaction "${modalState.currentTransaction?.id}"? This action cannot be undone.`}
                />
            )}

            <div className="mt-6 flex justify-between items-center text-sm text-muted-foreground">
                <div>
                    Showing {filteredTransactions.length} of {transactions.length} transactions
                </div>
                <div>
                    Total Value: {formatAmount(Math.abs(totalAmount), 'EUR')}
                </div>
            </div>
        </div>
    );
};

export default Transactions;