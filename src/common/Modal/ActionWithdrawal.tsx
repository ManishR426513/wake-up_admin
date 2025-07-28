import { FC, useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

interface ModalState {
    type: "APPROVE" | "REJECT";
    data?: any;
}

interface WithdrawalModalProps {
    isOpen: boolean;
    modalState: ModalState;
    onClose: () => void;
    handleAction: (payload: { adminNotes?: string; referenceNumber?: string; rejectReason?: string }) => Promise<void>;
}

const ActionWithdrawal: FC<WithdrawalModalProps> = ({
    isOpen,
    modalState,
    onClose,
    handleAction,
}) => {
    const [adminNotes, setAdminNotes] = useState<string>("");
    const [referenceNumber, setReferenceNumber] = useState<string>("");
    const [rejectReason, setRejectReason] = useState<string>("");

    useEffect(() => {
        if (isOpen) {
            setAdminNotes("");
            setReferenceNumber("");
            setRejectReason("");
        }
    }, [isOpen]);

    const handleSubmit = async () => {
        if (modalState.type === "APPROVE") {
            await handleAction({
                adminNotes,
                referenceNumber,
            });
        } else {
            await handleAction({
                rejectReason,
            });
        }
        onClose();
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-lg text-center font-semibold">
                        {modalState.type === "APPROVE"
                            ? "Update Withdrawal Details"
                            : "Reject Withdrawal Request"}
                    </AlertDialogTitle>
                </AlertDialogHeader>

                {modalState.type === "APPROVE" ? (
                    <div className="space-y-4 mt-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label className="text-right text-sm font-medium">Admin Notes</label>
                            <Input
                                id="adminNotes"
                                name="adminNotes"
                                value={adminNotes}
                                placeholder="Enter admin notes"
                                className="col-span-3"
                                onChange={(e) => setAdminNotes(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <label className="text-right text-sm font-medium">Reference Number</label>
                            <Input
                                id="referenceNumber"
                                name="referenceNumber"
                                value={referenceNumber}
                                placeholder="Enter reference number"
                                className="col-span-3"
                                onChange={(e) => setReferenceNumber(e.target.value)}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4 mt-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label className="text-right text-sm font-medium">Reason</label>
                            <Input
                                id="rejectReason"
                                name="rejectReason"
                                value={rejectReason}
                                placeholder="Enter rejection reason"
                                className="col-span-3"
                                onChange={(e) => setRejectReason(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                <AlertDialogFooter className="mt-6">
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit}>
                        Save Changes
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ActionWithdrawal;
