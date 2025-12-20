import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { authAxios } from "@/config/config";
import { Main } from "@/components/main";
import { Button } from "@/components/ui/Button";
import { setReportFormatDate } from "@/helper/helper";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit, MoreHorizontal, Loader2 } from "lucide-react";
import { useAllContext } from "@/context/AllContext";
import ImpressionPlanModal from "@/common/Modal/ImpressionPlanModal";
import { ModelInterface, PlanFormData, PlanInterface } from "@/common/allInterface";

// ------------------ Interfaces ------------------





// ------------------ Component ------------------

const ImpressionPlan: React.FC = () => {
  const { setloading } = useAllContext();

  const [plans, setPlans] = useState<PlanInterface[]>([]);
  const [showModel, setShowModel] = useState<ModelInterface>({
    show: false,
    data: null,
    deletemodel: false,
  });
  const [isLoadingPlans, setIsLoadingPlans] = useState<boolean>(false);

  // Fetch Impression Plans
  const getPlans = async () => {
    setIsLoadingPlans(true);
    setloading(true);
    try {
      const response = await authAxios().get("/plan/impression");
      if (response.data && Array.isArray(response.data.data)) {
        setPlans(response.data.data);
      } else {
        setPlans([]);
        toast.error("Invalid data format received");
      }
    } catch (error: any) {
      console.error("Error fetching plans:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch plans");
      setPlans([]);
    } finally {
      setIsLoadingPlans(false);
      setloading(false);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  // Show Modal
  const handleShowModel = (type: "Edit" | "Add", data?: PlanInterface) => {
    setShowModel({
      show: true,
      data: type === "Edit" && data ? data : null,
      deletemodel: false,
    });
  };

  // Handle Add / Edit
  const handleAction = async (formData: PlanFormData) => {
    if (!formData.title?.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!formData.impression || formData.impression <= 0) {
      toast.error("Impression must be greater than 0");
      return;
    }

    if (!formData.price || formData.price <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    const payload: PlanFormData = {
      title: formData.title.trim(),
      features: formData.features.filter((f) => f.trim() !== ""),
      impression: Number(formData.impression),
      price: Number(formData.price),
      active: Boolean(formData.active),
    };

    setloading(true);

    try {
      if (showModel.data?._id) {
        // Edit mode
        const response = await authAxios().put(
          `/plan/impression/${showModel.data._id}`,
          payload
        );
        toast.success(response.data.message || "Plan updated successfully");
      } else {
        // Add mode (if you implement it later)
        const response = await authAxios().post("/plan/impression", payload);
        toast.success(response.data.message || "Plan created successfully");
      }
      await getPlans();
      setShowModel({ show: false, data: null, deletemodel: false });
    } catch (error: any) {
      console.error("Error saving plan:", error);
      toast.error(
        error?.response?.data?.message || "Failed to save plan"
      );
    } finally {
      setloading(false);
    }
  };

  return (
    <div>
      <Main>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Impression Plans
            </h2>
            <p className="text-muted-foreground mt-1">
              Manage your impression-based promotion plans
            </p>
          </div>
          {/* Uncomment if you want to add "Add New Plan" button */}
          {/* <Button onClick={() => handleShowModel("Add")}>
            Add New Plan
          </Button> */}
        </div>

        <div className="-mx-4 flex-1 overflow-auto px-4 py-1">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">S.No</TableHead>
                  <TableHead className="min-w-[120px]">Title</TableHead>
                  <TableHead className="min-w-[250px]">Features</TableHead>
                  <TableHead className="w-[120px]">Impressions</TableHead>
                  <TableHead className="w-[100px]">Price</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead className="w-[150px]">Created At</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoadingPlans ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Loading plans...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : plans && plans.length > 0 ? (
                  plans.map((plan, index) => (
                    <TableRow key={plan._id}>
                      <TableCell className="font-medium">
                        {index + 1}
                      </TableCell>

                      <TableCell className="font-medium">
                        {plan.title}
                      </TableCell>

                      {/* Features Column with Tooltip */}

                      <TableCell>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className="text-left max-w-[200px] line-clamp-3 cursor-pointer">
                            <div className="whitespace-pre-line text-left">
                              {plan.features?.length > 0
                                ? plan.features.join("\n")
                                : "No Features"}
                            </div>
                          </TooltipTrigger>

                          <TooltipContent className="max-w-xs whitespace-pre-line p-3">
                            {plan.features?.join("\n")}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                     
                      <TableCell className="font-medium">
                        {plan.impression.toLocaleString()}
                      </TableCell>

                      <TableCell className="font-medium">
                        €{plan.price.toFixed(2)}
                      </TableCell>

                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            plan.active
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                          }`}
                        >
                          {plan.active ? "Active" : "Inactive"}
                        </span>
                      </TableCell>

                      <TableCell className="text-sm text-muted-foreground">
                        {setReportFormatDate(plan.createdAt)}
                      </TableCell>

                      <TableCell>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              aria-label="Actions"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>

                          <PopoverContent
                            className="w-32 p-2 rounded-lg border bg-background shadow-xl z-50"
                            side="left"
                            align="center"
                            sideOffset={5}
                          >
                            <button
                              onClick={() => handleShowModel("Edit", plan)}
                              className="flex w-full items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                              <span>Edit</span>
                            </button>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-muted-foreground py-8"
                    >
                      No impression plans found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Main>

      <ImpressionPlanModal
        showModel={showModel}
        setshowModel={setShowModel}
        handleAction={handleAction}
      />
    </div>
  );
};

export default ImpressionPlan;