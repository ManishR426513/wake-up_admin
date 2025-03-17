import React, { FC, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { CategoryInterface } from "./Category"; // Make sure to import from the correct path

interface AddCategoryModalProps {
  isOpen: boolean;
  isEditMode: boolean;
  categoryData: CategoryInterface | null;
  onClose: () => void;
  onEdit: (categoryName: string) => Promise<void>;
  onAdd: (categoryName: string) => Promise<void>;
}

const AddCategoryModal: FC<AddCategoryModalProps> = ({
  isOpen,
  isEditMode,
  categoryData,
  onClose,
  onEdit,
  onAdd,
}) => {
  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    // Set the initial value when editing an existing category
    if (isEditMode && categoryData) {
      setCategoryName(categoryData.name);
    } else {
      setCategoryName("");
    }
  }, [isEditMode, categoryData]);

  const handleSubmit = () => {
    if (!categoryName.trim()) return;
    
    if (isEditMode) {
      onEdit(categoryName);
    } else {
      onAdd(categoryName);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg text-center font-semibold">
            {isEditMode ? "Edit Category" : "Add Category"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right text-sm font-medium">Name</label>
            <Input
              id="categoryName"
              name="categoryName"
              value={categoryName}
              placeholder="Enter category name"
              className="col-span-3"
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
        </div>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>
            {isEditMode ? "Save Changes" : "Add Category"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddCategoryModal;