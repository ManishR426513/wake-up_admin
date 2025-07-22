import { FC, useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Main } from "@/components/main";
import { Button } from "@/components/ui/Button";
import { authAxios } from "@/config/config";
import { setReportFormatDate } from "@/helper/helper";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit, MoreHorizontal, Plus, Trash } from "lucide-react";
import AddCategoryModal from "../../common/Modal/AddCatgoryModal";
import DeleteConfirmationModal from "@/common/Modal/DeleteConfirmationModal";
import { toast } from "sonner";
import { useAllContext } from "@/context/AllContext";


export interface CategoryInterface {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
}
const Category: FC = () => {
  const { setloading } = useAllContext();
  

  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    isEditMode: boolean;
    isDeleteMode: boolean;
    currentCategory: CategoryInterface | null;
  }>({
    isOpen: false,
    isDeleteMode: false,
    isEditMode: false,
    currentCategory: null,
  });

  const getCategories = async (): Promise<void> => {
    setloading(true);
    await authAxios()
      .get(`/category`)
      .then((response) => {
        setloading(false);
        setCategories(response.data.data.categories);
      })
      .catch((error) => {
        console.log(error);
        setloading(false);
        toast.error(error.response.data.message);
      });
  };

  useEffect(() => {
    
      getCategories();
    
    // 
  }, []);

  const handleOpenAddModal = (): void => {
    setModalState({
      isOpen: true,
      isEditMode: false,
      isDeleteMode: false,
      currentCategory: null,
    });
  };

  const handleOpenEditModal = (category: CategoryInterface): void => {
    setModalState({
      isOpen: true,
      isEditMode: true,
      isDeleteMode: false,
      currentCategory: category,
    });
  };

  const handleOpenDeleteModal = (category: CategoryInterface): void => {
    setModalState({
      isOpen: false,
      isEditMode: false,
      isDeleteMode: true,
      currentCategory: category,
    });
  };

  const handleCloseModal = (): void => {
    setModalState({
      isOpen: false,
      isEditMode: false,
      isDeleteMode: false,
      currentCategory: null,
    });
  };

  const handleEdit = async (categoryName: string): Promise<void> => {
    if (!modalState.currentCategory?._id) return;

    try {
      const payload = { name: categoryName };
      const response = await authAxios().put(
        `/category/${modalState.currentCategory._id}`,
        payload
      );
      await getCategories();
      handleCloseModal();
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleAdd = async (categoryName: string): Promise<void> => {
    try {
      const payload = { name: categoryName };
      const response = await authAxios().post("/category", payload);
      await getCategories();
      handleCloseModal();

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDelete = async (): Promise<void> => {
    try {
      const response = await authAxios().delete(
        `/category/${modalState?.currentCategory?._id}`
      );
      await getCategories();
      handleCloseModal();

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div >
      <Main>
       
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Category</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your Wakeup Sports
            </p>
          </div>
          <Button className='space-x-1'
            onClick={handleOpenAddModal}
          >
            <span>Add</span>
            <Plus size={18} />
          </Button>
        </div>

        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <Table className="w-full border-collapse text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Sno</TableHead>
                <TableHead>Category Name</TableHead>
                <TableHead> Created At</TableHead>

                <TableHead className="text-right"> Actions</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length > 0 ? (
                categories.map((item, index) => (
                  <TableRow key={item._id}>
                    <TableCell className="px-4 py-3 font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell>  {item.name}</TableCell>
                    <TableCell>{setReportFormatDate(item.createdAt)}</TableCell>
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
                              className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                              onClick={() => handleOpenEditModal(item)}
                            >
                              <Edit className="h-3.5 w-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
                              onClick={() => handleOpenDeleteModal(item)}
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
                    colSpan={7}
                    className="px-4 py-3 text-center text-gray-500"
                  >
                    No plans found.
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

      {modalState.isDeleteMode && (
        <DeleteConfirmationModal
          isOpen={modalState.isDeleteMode}
          onClose={handleCloseModal}
          onConfirm={handleDelete}
          title="Delete Category"
          description={`Are you sure you want to delete "${modalState.currentCategory?.name}"? This action cannot be undone.`}
        />
      )}
    </div>
  );
};

export default Category;