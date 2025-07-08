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
  benefits?: string[];
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
      benefits: [""],
    });
  };

  const [data, setdata] = useState<dataContentInterface>({
    planName: "",
    planDescription: "",
    price: "",
    benefits: [""],
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Filter out empty benefits before submitting
    const filteredData = {
      ...data,
      benefits: data.benefits?.filter(feature => feature.trim() !== "") || [],
    };
    if (handleAction) {
      handleAction(filteredData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setdata((prev) => ({
      ...prev,
      [name]: name === "price" ? (value ? Number(value) : "") : value,
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    setdata((prev) => ({
      ...prev,
      benefits: prev.benefits?.map((feature, i) => 
        i === index ? value : feature
      ) || [],
    }));
  };

  const addFeature = () => {
    setdata((prev) => ({
      ...prev,
      benefits: [...(prev.benefits || []), ""],
    }));
  };

  const removeFeature = (index: number) => {
    if (data.benefits && data.benefits.length > 1) {
      setdata((prev) => ({
        ...prev,
        benefits: prev.benefits?.filter((_, i) => i !== index) || [],
      }));
    }
  };
console.log("showca",showModel.data);
  useEffect(() => {
    if (showModel.data) {
      setdata({
        planName: showModel.data.planName || "",
        planDescription: showModel.data.planDescription || "",
        price: showModel.data.price || 0,
        benefits: Array.isArray(showModel.data.benefits) ? showModel.data.benefits : [""]
      });
    } else {
      setdata({
        planName: "",
        planDescription: "",
        price: "",
        benefits: [""],
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
        <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-center">
              {showModel?.data?._id ? "Edit Plan" : "Add Plan"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            <div className="grid gap-4 py-4 overflow-y-auto flex-1">
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

              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right mt-2">
                  Features
                </Label>
                <div className="col-span-3 space-y-2 max-h-[300px] overflow-y-auto pr-2">
                  {data.benefits?.map((feature, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Input
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder="Enter feature"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeFeature(index)}
                        disabled={data.benefits?.length === 1}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addFeature}
                    className="w-full"
                  >
                    Add Features
                  </Button>
                </div>
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
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter className="mt-4 flex-shrink-0">
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPlansModal;