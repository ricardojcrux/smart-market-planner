import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES, MOCK_PRODUCTS } from "@/lib/constants";
import { AddProductModal } from "@/components/AddProductModal";

type Product = {
  id: string;
  name: string;
  unit: string;
};

export default function Products() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  const handleAddProduct = (newProduct: {
    name: string;
    category: string;
    unit: string;
  }) => {
    const categoryId = newProduct.category as keyof typeof products;
    const product: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: newProduct.name,
      unit: newProduct.unit,
    };

    setProducts((prev) => ({
      ...prev,
      [categoryId]: [...(prev[categoryId] || []), product],
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Listado de Productos
          </h1>
          <p className="text-muted-foreground mt-2">
            Gestiona tu catálogo de productos por categorías
          </p>
        </div>

        <AddProductModal onAddProduct={handleAddProduct} />
      </div>

      {CATEGORIES.map((category) => {
        const categoryProducts =
          products[category.id as keyof typeof products] || [];
        const Icon = category.icon;

        if (categoryProducts.length === 0) return null;

        return (
          <div key={category.id} className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-lg ${category.bgColor}`}>
                <Icon className={`h-5 w-5 ${category.color}`} />
              </div>
              <h2 className="text-xl font-semibold tracking-tight">
                {category.name}
              </h2>
              <Badge variant="secondary" className="ml-2">
                {categoryProducts.length}
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categoryProducts.map((product) => {
                const borderClass = category.color.replace("text-", "border-");
                return (
                  <Card
                    key={product.id}
                    className={`hover:shadow-md transition-shadow cursor-pointer border-l-4 ${borderClass}`}
                  >
                    <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-base font-medium leading-none truncate">
                        {product.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-xs text-muted-foreground capitalize">
                        Unidad: {product.unit}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
