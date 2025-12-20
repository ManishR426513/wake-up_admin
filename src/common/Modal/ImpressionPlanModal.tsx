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
import { Switch } from "@/components/ui/switch";
import { X, Plus } from "lucide-react";
import { ModelInterface, PlanInterface, PlanFormData } from "../../common/allInterface";

interface ImpressionPlanModalProps {
  showModel: ModelInterface;
  setshowModel: React.Dispatch<React.SetStateAction<ModelInterface>>;
  handleAction: (data: PlanFormData) => void;
}

const ImpressionPlanModal: React.FC<ImpressionPlanModalProps> = ({
  showModel,
  setshowModel,
  handleAction,
}) => {
  const emptyState: PlanFormData = {
    title: "",
    features: [""],
    price: 0,
    impression: 0,
    active: true,
  };

  const [formData, setFormData] = useState<PlanFormData>(emptyState);
  const [errors, setErrors] = useState<Partial<Record<keyof PlanFormData, string>>>({});

  // Close Modal
  const handleClose = () => {
    setshowModel({ show: false, data: null, deletemodel: false });
    setFormData(emptyState);
    setErrors({});
  };

  // Validate Form
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PlanFormData, string>> = {};

    if (!formData.title?.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.impression || formData.impression <= 0) {
      newErrors.impression = "Impressions must be greater than 0";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    const validFeatures = formData.features.filter((f) => f.trim() !== "");
    if (validFeatures.length === 0) {
      newErrors.features = "At least one feature is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const filteredFeatures = formData.features.filter((f) => f.trim() !== "");

    handleAction({
      ...formData,
      features: filteredFeatures,
    });
  };

  // Input Handlers
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof PlanFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, "");
    
    setFormData((prev) => ({
      ...prev,
      [name]: numericValue === "" ? 0 : Number(numericValue),
    }));
    
    if (errors[name as keyof PlanFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Allow only valid decimal numbers
    const validValue = value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*?)\..*/g, "$1")
      .replace(/^0+(\d)/, "$1")
      .replace(/^(\d+\.\d{0,2}).*/, "$1");

    setFormData((prev) => ({
      ...prev,
      [name]: validValue === "" ? 0 : Number(validValue),
    }));

    if (errors[name as keyof PlanFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Features Handlers
  const handleFeatureChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((f, i) => (i === index ? value : f)),
    }));
    
    if (errors.features) {
      setErrors((prev) => ({ ...prev, features: undefined }));
    }
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index: number) => {
    if (formData.features.length > 1) {
      setFormData((prev) => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== index),
      }));
    }
  };

  // Load Edit Data
  useEffect(() => {
    if (showModel.data) {
      const plan = showModel.data as PlanInterface;
      setFormData({
        title: plan.title || "",
        features: plan.features && plan.features.length > 0 ? [...plan.features] : [""],
        price: plan.price || 0,
        impression: plan.impression || 0,
        active: plan.active ?? true,
      });
    } else {
      setFormData(emptyState);
    }
    setErrors({});
  }, [showModel.data, showModel.show]);

  return (
    <Dialog open={showModel.show} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {showModel.data ? "Edit Impression Plan" : "Add Impression Plan"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="grid gap-5 py-4 overflow-y-auto flex-1 px-1">
            {/* TITLE */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right font-medium">
                Title <span className="text-red-500">*</span>
              </Label>
              <div className="col-span-3">
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleTextChange}
                  placeholder="e.g., Basic, Premium, Enterprise"
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
              </div>
            </div>

            {/* IMPRESSIONS */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="impression" className="text-right font-medium">
                Impressions <span className="text-red-500">*</span>
              </Label>
              <div className="col-span-3">
                <Input
                  id="impression"
                  name="impression"
                  type="text"
                  value={formData.impression || ""}
                  onChange={handleNumberChange}
                  placeholder="e.g., 1000"
                  className={errors.impression ? "border-red-500" : ""}
                />
                {errors.impression && (
                  <p className="text-red-500 text-xs mt-1">{errors.impression}</p>
                )}
              </div>
            </div>

            {/* PRICE */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right font-medium">
                Price (€) <span className="text-red-500">*</span>
              </Label>
              <div className="col-span-3">
                <Input
                  id="price"
                  name="price"
                  type="text"
                  value={formData.price || ""}
                  onChange={handlePriceChange}
                  placeholder="e.g., 9.99"
                  className={errors.price ? "border-red-500" : ""}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                )}
              </div>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right font-medium mt-2">
                Features <span className="text-red-500">*</span>
              </Label>

              <div className="col-span-3 space-y-3">
                <div className="max-h-[280px] overflow-y-auto space-y-2 pr-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder={`Feature ${index + 1}`}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={formData.features.length === 1}
                        onClick={() => removeFeature(index)}
                        className="h-10 px-3"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={addFeature}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>

                {errors.features && (
                  <p className="text-red-500 text-xs">{errors.features}</p>
                )}
              </div>
            </div>

            {/* ACTIVE / INACTIVE TOGGLE */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">Status</Label>

              <div className="col-span-3 flex items-center gap-3">
                <Switch
                  checked={formData.active}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, active: checked }))
                  }
                />
                <span className="text-sm font-medium">
                  {formData.active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4 flex-shrink-0 gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              {showModel.data ? "Update Plan" : "Create Plan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ImpressionPlanModal;