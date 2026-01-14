import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CATEGORIES, PRODUCT_UNITS } from "@/lib/constants";
import { Plus } from "lucide-react";

type ProductData = {
  name: string;
  category: string;
  unit: string;
};

interface AddProductModalProps {
  onAddProduct: (product: ProductData) => void;
}

export function AddProductModal({ onAddProduct }: AddProductModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<ProductData>({
    name: "",
    category: "",
    unit: "",
  });

  const handleSave = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.unit) return;
    onAddProduct(newProduct);
    setNewProduct({ name: "", category: "", unit: "" });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Agregar nuevo producto</DialogTitle>
          <DialogDescription>
            Crea un nuevo producto para tu lista. Haz clic en guardar cuando
            termines.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              id="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="col-span-3"
              placeholder="Ej: Manzanas"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Categoría</Label>
            <div className="col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CATEGORIES.map((category) => {
                const isSelected = newProduct.category === category.id;
                // Get the base color name for hover utility (e.g., bg-red-100 -> hover:bg-red-100)
                // This assumes category.bgColor is in format 'bg-color-100' or similar tailwind class
                return (
                  <Button
                    key={category.id}
                    variant="outline"
                    size="sm"
                    className={`justify-start h-auto py-2 px-3 border-2 ${
                      isSelected
                        ? `${category.bgColor} ${category.color} border-current hover:${category.bgColor} hover:${category.color}`
                        : "hover:bg-muted border-transparent bg-background"
                    }`}
                    onClick={() =>
                      setNewProduct({
                        ...newProduct,
                        category: category.id,
                      })
                    }
                  >
                    <div className="flex flex-col items-center gap-1 w-full">
                      <category.icon className={`h-4 w-4 ${category.color}`} />
                      <span
                        className={`text-[10px] font-normal truncate w-full text-center ${
                          isSelected ? "text-current" : "text-muted-foreground"
                        }`}
                      >
                        {category.name}
                      </span>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Unidad</Label>
            <div className="col-span-3 flex flex-wrap gap-2">
              {PRODUCT_UNITS.map((unit) => (
                <Button
                  key={unit.value}
                  variant={
                    newProduct.unit === unit.value ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() =>
                    setNewProduct({ ...newProduct, unit: unit.value })
                  }
                  className="flex-1 min-w-[3rem]"
                >
                  {unit.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Guardar Producto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
