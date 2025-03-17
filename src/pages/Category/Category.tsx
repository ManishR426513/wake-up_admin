import React, { FC, useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Main } from "@/components/main";
import { Button } from "@/components/ui/Button";;
import { authAxios } from "@/config/config";
import { setReportFormatDate } from "@/helper/helper";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import AddCategoryModal from "../../common/Modal/AddCatgoryModal";
import DeleteConfirmationModal from "@/common/Modal/DeleteConfirmationModal";

export interface CategoryInterface {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
}

const Category: FC = () => {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    isEditMode: boolean;
    currentCategory: CategoryInterface | null;
  }>({
    isOpen: false,
    isEditMode: false,
    currentCategory: null,
  });

  const getCategories = async (): Promise<void> => {
    try {
      const response = await authAxios().get("/category");
      setCategories(response.data.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleOpenAddModal = (): void => {
    setModalState({
      isOpen: true,
      isEditMode: false,
      currentCategory: null,
    });
  };

  const handleOpenEditModal = (category: CategoryInterface): void => {
    setModalState({
      isOpen: true,
      isEditMode: true,
      currentCategory: category,
    });
    setOpenPopover(null);
  };

  const handleCloseModal = (): void => {
    setModalState({
      isOpen: false,
      isEditMode: false,
      currentCategory: null,
    });
    setOpenPopover(null);
  };

  const handleEdit = async (categoryName: string): Promise<void> => {
    if (!modalState.currentCategory?._id) return;
    
    try {
      const payload = { name: categoryName };
      await authAxios().put(`/category/${modalState.currentCategory._id}`, payload);
      await getCategories();
      handleCloseModal();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleAdd = async (categoryName: string): Promise<void> => {
    try {
      const payload = { name: categoryName };
      await authAxios().post("/category", payload);
      await getCategories();
      handleCloseModal();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDelete = async (categoryId: string): Promise<void> => {
    try {
      await authAxios().delete(`/category/${categoryId}`);
      await getCategories();
      setOpenPopover(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="p-6">
      <Main>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Category</h1>
          <Button onClick={handleOpenAddModal}>Add Category</Button>
        </div>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <Table className="w-full border-collapse text-sm">
            {/* <TableCaption>A list of your recent categories.</TableCaption> */}
            <TableHeader >
              <TableRow>
                <TableHead className="px-4 py-3 text-left">Sno</TableHead>
                <TableHead className="px-4 py-3 text-left">
                  Category Name
                </TableHead>
                <TableHead className="px-4 py-3 text-left">
                  Created At
                </TableHead>
                <TableHead className="px-4 py-3 text-left">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length > 0 ? (
                categories.map((item, index) => (
                  <TableRow
                    key={item._id}
                    
                  >
                    <TableCell className="px-4 py-3 font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-4 py-3">{item.name}</TableCell>
                    <TableCell className="px-4 py-3">
                      {setReportFormatDate(item.createdAt)}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <Popover
                        open={openPopover === item._id}
                        onOpenChange={(open) =>
                          setOpenPopover(open ? item._id : null)
                        }
                      >
                        <PopoverTrigger asChild>
                          <Button variant="ghost" className="h-7 w-7 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent side="left" className="w-28 p-1">
                          <div className="flex flex-col space-y-1">
                            <button 
                              className="flex items-center space-x-2 px-2 py-1 rounded-md "
                              onClick={() => handleOpenEditModal(item)}
                            >
                              <Edit className="h-3.5 w-3.5" /> <span>Edit</span>
                            </button>
                            {/* <button 
                              className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-red-100"
                              onClick={() => handleDelete(item._id)}
                            >
                              <Trash className="h-3.5 w-3.5 text-red-500" /> <span>Delete</span>
                            </button> */}
                            <DeleteConfirmationModal handleCancel={handleCloseModal}  handleDelete={handleDelete}  />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="px-4 py-3 text-center text-gray-500"
                  >
                    No categories found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Main>

      {modalState.isOpen && (
        <AddCategoryModal
          isOpen={modalState.isOpen}
          isEditMode={modalState.isEditMode}
          categoryData={modalState.currentCategory}
          onClose={handleCloseModal}
          onEdit={handleEdit}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
};

export default Category;