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
import { Edit, MoreHorizontal } from "lucide-react";
import AddCategoryModal from "../../common/Modal/AddCatgoryModal";
import DeleteConfirmationModal from "@/common/Modal/DeleteConfirmationModal";

export interface PlanInterface {
  _id: string;
  planName: string;
  planDescription: string;
  planType: string;
  price: string;
  isActive: boolean;
  currency: string;
  createdAt: string;
}

const Plan: FC = () => {
  const [plans, setPlans] = useState<PlanInterface[]>([]);
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    isEditMode: boolean;
    currentPlan: PlanInterface | null;
  }>({
    isOpen: false,
    isEditMode: false,
    currentPlan: null,
  });

  const getPlans = async (): Promise<void> => {
    try {
      const response = await authAxios().get("/plan");
      if (response.data?.data?.plans) {
        setPlans(response.data.data.plans);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  const handleOpenAddModal = (): void => {
    setModalState({
      isOpen: true,
      isEditMode: false,
      currentPlan: null,
    });
  };

  const handleOpenEditModal = (plan: PlanInterface): void => {
    setModalState({
      isOpen: true,
      isEditMode: true,
      currentPlan: plan,
    });
    setOpenPopover(null);
  };

  const handleCloseModal = (): void => {
    setModalState({
      isOpen: false,
      isEditMode: false,
      currentPlan: null,
    });
    setOpenPopover(null);
  };

  const handleEdit = async (planData: any): Promise<void> => {
    if (!modalState.currentPlan?._id) return;
    
    try {
      await authAxios().put(`/plan/${modalState.currentPlan._id}`, planData);
      await getPlans();
      handleCloseModal();
    } catch (error) {
      console.error("Error updating plan:", error);
    }
  };

  const handleAdd = async (planData: any): Promise<void> => {
    try {
      await authAxios().post("/plan", planData);
      await getPlans();
      handleCloseModal();
    } catch (error) {
      console.error("Error adding plan:", error);
    }
  };

  return (
    <div className="p-6">
      <Main>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Plans</h1>
          <Button onClick={handleOpenAddModal}>Add Plan</Button>
        </div>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <Table className="w-full border-collapse text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 py-3 text-left">Sno</TableHead>
                <TableHead className="px-4 py-3 text-left">Plan Type</TableHead>
                <TableHead className="px-4 py-3 text-left">Description</TableHead>
                <TableHead className="px-4 py-3 text-left">Price</TableHead>
                <TableHead className="px-4 py-3 text-left">Status</TableHead>
                <TableHead className="px-4 py-3 text-left">Created At</TableHead>
                <TableHead className="px-4 py-3 text-left">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.length > 0 ? (
                plans.map((item, index) => (
                  <TableRow key={item._id}>
                    <TableCell className="px-4 py-3 font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-4 py-3">{item.planType}</TableCell>
                    <TableCell className="px-4 py-3">{item.planDescription}</TableCell>
                    <TableCell className="px-4 py-3">{item.currency} {item.price}</TableCell>
                    <TableCell className="px-4 py-3">
                      {item.isActive ? "Active" : "Inactive"}
                    </TableCell>
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
                              className="flex items-center space-x-2 px-2 py-1 rounded-md"
                              onClick={() => handleOpenEditModal(item)}
                            >
                              <Edit className="h-3.5 w-3.5" /> <span>Edit</span>
                            </button>
                            <DeleteConfirmationModal handleCancel={handleCloseModal} />
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
          categoryData={modalState.currentPlan}
          onClose={handleCloseModal}
          onEdit={handleEdit}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
};

export default Plan;