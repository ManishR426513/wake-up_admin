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
import AddPlansModal, {
  dataContentInterface,
} from "@/common/Modal/AddPlansModal";
import { toast } from "sonner";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Edit, MoreHorizontal } from "lucide-react";
import { useAllContext } from "@/context/AllContext";
import { useAuth } from "@/context/AuthContext";

export interface PlanInterface {
  benefits: boolean;
  _id: string;
  planName: string;
  planDescription: string;
  planType: string;
  price: string;
  isActive: boolean;
  currency: string;
  createdAt: string;
}

export interface ModelInterface {
  show: boolean;
  data?: PlanInterface | null;
  deletemodel: boolean;
}

const Plans: React.FC = () => {
  const { setloading } = useAllContext();
  const { token } = useAuth();

  const [plans, setplans] = useState<PlanInterface[]>([]);
  const [showModel, setshowModel] = useState<ModelInterface>({
    show: false,
    data: null,
    deletemodel: false,
  });

  const getPlans = async (): Promise<void> => {
    setloading(true);
    try {
      const response = await authAxios(token).get("/plan");
      setplans(response.data.data.plans);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch plans");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if(token){

    
    getPlans();
}}, [token]);

  const handleShowmodel = (type: string, data?: PlanInterface) => {
    setshowModel({
      show: true,
      data: type === "Edit" ? data : null,
      deletemodel: false,
    });
  };

  const handleAction = (data?: dataContentInterface) => {
    const payLoad = {
      ...data,
      price: Number(data?.price),
      currency: "EURO",
      planType: data?.planName?.toLocaleUpperCase(),
      benefits:data?.benefits

    };

    setloading(true);

    if (showModel?.data?._id) {
      // Edit
      authAxios(token)
        .put(`/plan/${showModel.data._id}`, payLoad)
        .then((response) => {
          toast.success(response.data.message);
          getPlans();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
        })
        .finally(() => {
          setshowModel({ show: false, data: null, deletemodel: false });
          setloading(false);
        });
    } else {
      // Add
      authAxios(token)
        .post(`/plan`, payLoad)
        .then(() => {
          toast.success("Plan added successfully");
          getPlans();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || "Failed to add plan");
        })
        .finally(() => {
          setshowModel({ show: false, data: null, deletemodel: false });
          setloading(false);
        });
    }
  };

  return (
    <div>
      <Main>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Plans</h1>
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
                    <TableCell>{item.planType}</TableCell>
                    <TableCell>{item.planDescription}</TableCell>
                    <TableCell>
                      {item.currency} {item.price}
                    </TableCell>
                    <TableCell>
                      {item.isActive ? "Active" : "Inactive"}
                    </TableCell>
                    <TableCell>
                      {setReportFormatDate(item.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal size={20} />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-20 p-2 rounded-xl border bg-background text-foreground shadow-xl"
                          side="left"        // 👈 Position popover to the left
                          align="center"     // 👈 Vertically center it relative to the trigger
                          sideOffset={5}     // 👈 Optional spacing
                        >
                          <button
                            onClick={() => handleShowmodel("Edit", item)}
                            className="flex w-full items-center gap-1 rounded-md px-1 py-1 text-sm hover:bg-muted transition-colors"
                          >
                            <Edit size={16} /> Edit
                          </button>
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

      <AddPlansModal
        showModel={showModel}
        setshowModel={setshowModel}
        handleAction={handleAction}
      />
    </div>
  );
};

export default Plans;
