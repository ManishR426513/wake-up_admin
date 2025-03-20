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

export interface ModelInterface {
  show: boolean;
  data?: PlanInterface | null;
  deletemodel: boolean;
}

const Plans: React.FC = () => {
    const {setloading}  =useAllContext()
  
  const [plans, setplans] = useState<PlanInterface[]>([]);
  const [showModel, setshowModel] = useState<ModelInterface>({
    show: false,
    data: null,
    deletemodel: false,
  });

  const getPlans = async (): Promise<void> => {
    // setloading(true)
    // try {
    //   setloading(false)
    //   const response = await authAxios().get("/plan");
    //   if (response.data?.data?.plans) {
    //     setplans(response.data.data.plans);
    //   }
    // } catch (error) {
    //   setloading(false)
      
    // }
    setloading(true)
    await authAxios()
          .get(`/plan`)
          .then((response) => {
            setloading(false)
            setplans(response.data.data.plans);
          })
          .catch((error) => {
            console.log(error)
            setloading(false)
            toast.error(error.response.data.message)
          });
  };


  useEffect(() => {
    getPlans();
  }, []);

  const handleShowmodel = (type: string, data?: PlanInterface) => {
    if (type == "Add") {
      setshowModel((prev) => ({
        ...prev,
        show: true,
        data: null,
        deletemodel: false,
      }));
    } else if (type == "Edit") {
      setshowModel((prev) => ({
        ...prev,
        show: true,
        data: data,
        deletemodel: false,
      }));
    } else {
      // Handle other cases if needed
    }
  };

  const handleAction = (data?: dataContentInterface) => {
    if (showModel?.data?._id) {
      
      // For editing an existing plan
      const payLoad = {
        ...data,
        price: Number(data?.price),
        currency: "EURO",
        planType: data?.planName?.toLocaleUpperCase(),
      };

      setshowModel({
        show: false,
        data: null,
        deletemodel: false,
      });
      setloading(true)
      authAxios()
        .put(`/plan/${showModel?.data?._id}`, payLoad)
        .then((response) => {
          setloading(false)
          console.log(response)
          toast.success(response.data.message);
          getPlans();
         
        })
        .catch((error) => {
          setloading(false)
          toast.error(error?.response?.data?.message);
         
        });
    } else {
      // For adding a new plan
      // const payLoad = {
      //   ...data,
      //   currency: "EURO",
      //   planType: data?.planName?.toLocaleUpperCase(),
      // };

      // authAxios()
      //   .post(`/plan`, payLoad)
      //   .then((response) => {
      //     toast.success("Plan added successfully");
      //     getPlans();
      //     setshowModel({
      //       show: false,
      //       data: null,
      //       deletemodel: false,
      //     });
      //   })
      //   .catch((error) => {
      //     toast.error("Failed to add plan");
      //     console.log(error);
      //   });
    }
  };

  
  
  return (
    <div>
      <Main>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Plans</h1>
          {/* <Button onClick={() => handleShowmodel("Add")}>Add Category</Button> */}
        </div>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <Table className="w-full border-collapse text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 py-3 text-left">Sno</TableHead>
                <TableHead className="px-4 py-3 text-left">Plan Type</TableHead>
                <TableHead className="px-4 py-3 text-left">
                  Description
                </TableHead>
                <TableHead className="px-4 py-3 text-left">Price</TableHead>
                <TableHead className="px-4 py-3 text-left">Status</TableHead>
                <TableHead className="px-4 py-3 text-left">
                  Created At
                </TableHead>
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
                    <TableCell>{setReportFormatDate(item.createdAt)}</TableCell>
                    <TableCell>
                      {/* <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal size={20} />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-32 p-2  shadow-lg rounded-md z-50">
                          <button
                            onClick={() => handleShowmodel("Edit", item)}
                            className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-gray-100"
                          >
                            <Edit size={16} /> Edit
                          </button>
                         
                        </PopoverContent>
                      </Popover> */}

<Popover>
  <PopoverTrigger asChild>
    <Button variant="ghost" className="h-8 w-8 p-0">
      <MoreHorizontal size={20} />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-40 p-2 shadow-lg rounded-lg bg-white border border-gray-200">
    <button
      onClick={() => handleShowmodel("Edit", item)}
      className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-gray-100 transition-all duration-200"
    >
      <Edit size={16} /> Edit
    </button>
    {/* Uncomment if needed */}
    {/* <button
      className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-gray-100 transition-all duration-200"
    >
      <Trash size={16} /> Delete
    </button> */}
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