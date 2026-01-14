import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CATEGORIES, MOCK_PRODUCTS } from "@/lib/constants";
import { ShoppingCart, Plus, Minus, Check } from "lucide-react";

interface Product {
  id: string;
  name: string;
  unit: string;
}

interface SelectedProduct extends Product {
  quantity: number;
}

export function MarketPlanner({
  onStartShopping,
}: {
  onStartShopping?: () => void;
}) {
  const [selectedItems, setSelectedItems] = useState<
    Record<string, SelectedProduct>
  >({});
  const [activeTab, setActiveTab] = useState<string>(CATEGORIES[0].id);

  const handleAddItem = (product: Product) => {
    setSelectedItems((prev) => ({
      ...prev,
      [product.id]: { ...product, quantity: 1 },
    }));
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setSelectedItems((prev) => {
      const current = prev[productId];
      if (!current) return prev;

      const newQty = current.quantity + delta;
      if (newQty <= 0) {
        // Remove item
        // Remove item
        const newItems = { ...prev };
        delete newItems[productId];
        return newItems;
      }

      return {
        ...prev,
        [productId]: { ...current, quantity: newQty },
      };
    });
  };

  const handleQuantityInput = (productId: string, value: string) => {
    const qty = parseInt(value);
    if (isNaN(qty) || qty < 0) return;

    setSelectedItems((prev) => {
      if (qty === 0) {
        const newItems = { ...prev };
        delete newItems[productId];
        return newItems;
      }
      return {
        ...prev,
        [productId]: { ...prev[productId], quantity: qty },
      };
    });
  };

  const handleStartShopping = () => {
    console.log("Saving plan temporarily...", selectedItems);
    localStorage.setItem("currentShoppingPlan", JSON.stringify(selectedItems));
    // Simulate App state change if prop provided
    if (onStartShopping) {
      onStartShopping();
    } else {
      alert("Modo Compra iniciado! (Estado simulado)");
    }
  };

  const totalItems = Object.values(selectedItems).reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Planificar Nueva Compra
          </h2>
          <p className="text-muted-foreground">
            Selecciona los productos que necesitas por categoría.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full font-medium text-sm border border-indigo-100">
            {totalItems} items seleccionados
          </div>
          <Button
            onClick={handleStartShopping}
            disabled={totalItems === 0}
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Iniciar Compra
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto pb-4 scrollbar-hide">
          <TabsList className="h-auto p-1 bg-transparent gap-2 inline-flex">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeTab === cat.id;
              return (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className={`
                    flex flex-col gap-2 items-center justify-center p-3 h-24 w-24 rounded-xl border transition-all duration-200
                    ${
                      isSelected
                        ? `bg-white border-${
                            cat.color.split("-")[1]
                          }-500 shadow-md scale-105 ring-1 ring-${
                            cat.color.split("-")[1]
                          }-500`
                        : "bg-white/50 border-transparent hover:bg-white hover:border-slate-200 text-slate-500"
                    }
                    `}
                >
                  <div
                    className={`p-2 rounded-full ${cat.bgColor} ${cat.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      isSelected ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {cat.name}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {CATEGORIES.map((cat) => (
          <TabsContent key={cat.id} value={cat.id} className="mt-0">
            <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <cat.icon className={`h-6 w-6 ${cat.color}`} />
                  {cat.name}
                </CardTitle>
                <CardDescription>
                  Productos disponibles en esta categoría
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(MOCK_PRODUCTS as Record<string, Product[]>)[cat.id]?.map(
                    (product) => {
                      const selected = selectedItems[product.id];
                      return (
                        <div
                          key={product.id}
                          className={`
                                relative p-4 rounded-xl border transition-all duration-200 flex flex-col gap-3 group
                                ${
                                  selected
                                    ? "bg-indigo-50/50 border-indigo-200 shadow-sm"
                                    : "bg-white border-slate-100 hover:border-indigo-200 hover:shadow-sm"
                                }
                            `}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-slate-800">
                                {product.name}
                              </h3>
                              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                {product.unit}
                              </span>
                            </div>
                            {selected && (
                              <div className="bg-indigo-600 text-white p-1 rounded-full animate-in zoom-in duration-200">
                                <Check className="w-3 h-3" />
                              </div>
                            )}
                          </div>

                          <div className="mt-2">
                            {selected ? (
                              <div className="flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-200">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-8 w-8 rounded-full border-indigo-200 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800"
                                  onClick={() =>
                                    handleUpdateQuantity(product.id, -1)
                                  }
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <Input
                                  type="number"
                                  value={selected.quantity}
                                  onChange={(e) =>
                                    handleQuantityInput(
                                      product.id,
                                      e.target.value,
                                    )
                                  }
                                  className="h-8 w-16 text-center font-bold border-indigo-200 focus:ring-indigo-500 bg-white"
                                />
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-8 w-8 rounded-full border-indigo-200 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800"
                                  onClick={() =>
                                    handleUpdateQuantity(product.id, 1)
                                  }
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            ) : (
                              <Button
                                variant="outline"
                                className="w-full justify-start text-muted-foreground hover:text-indigo-600 hover:border-indigo-200 group-hover:bg-indigo-50/50"
                                onClick={() => handleAddItem(product)}
                              >
                                <Plus className="mr-2 h-4 w-4" /> Agregar
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
