import  { FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";

interface DeleteConfirmationModalProps {
  handleDelete?: () => void;
  handleCancel?: () => void;
}
const DeleteConfirmationModal: FC<DeleteConfirmationModalProps> = ({
  handleDelete,
  handleCancel,
}) => {
  return (
   
      <AlertDialog>
        <AlertDialogTrigger>
          {" "}
          <button className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-red-100">
            <Trash className="h-3.5 w-3.5 text-red-500" /> <span> Delete </span>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              {" "}
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
   
  );
};

export default DeleteConfirmationModal;
