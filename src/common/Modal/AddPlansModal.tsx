import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModelInterface } from "@/pages/Plans/Plans";

export interface dataContentInterface {
  planName?: string;
  planDescription?: string;
  price?: number | string;
  //currency?: string;
}

interface AddPlansModalProps {
  showModel: ModelInterface;
  setshowModel: React.Dispatch<React.SetStateAction<ModelInterface>>;
  handleAction?: (data: dataContentInterface) => void;
}

const AddPlansModal: React.FC<AddPlansModalProps> = ({
  showModel,
  setshowModel,
  handleAction,
}) => {
  // Handler to close the dialog and reset the state
  const handleClose = () => {
    setshowModel({
      show: false,
      data: null,
      deletemodel: false,
    });

    setdata({
      planName: "",
      planDescription: "",
      price: "",
    });
  };

  const [data, setdata] = useState<dataContentInterface>({
    planName: "",
    planDescription: "",
    price: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleAction) {
      handleAction(data);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setdata((prev) => ({
      ...prev,
      [name]: name === "price" ? (value ? Number(value) : "") : value,
    }));
  };

  useEffect(() => {
    if (showModel.data) {
      setdata({
        planName: showModel.data.planName || "",
        planDescription: showModel.data.planDescription || "",
        price: showModel.data.price || 0,
      });
    } else {
      setdata({
        planName: "",
        planDescription: "",
        price: "",
      });
    }
  }, [showModel.data]);

  return (
    <div>
      <Dialog
        open={showModel?.show}
        onOpenChange={(open) => {
          if (!open) handleClose();
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              {showModel?.data?._id ? "Edit Plan" : "Add Plan"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  required
                  disabled
                  value={data?.planName}
                  name="planName"
                  // onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  value={data?.planDescription}
                  name="planDescription"
                  required
                  type="text"
                  onChange={handleChange}
                  autoFocus={true}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  value={data?.price}
                  name="price"
                  required
                  type="number"
                  min={1}
                  onChange={handleChange}
                  id="price"
                  autoFocus={true}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPlansModal;
