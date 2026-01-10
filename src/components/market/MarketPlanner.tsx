import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Minus, ShoppingCart } from "lucide-react";

// Sample Data
const MARKET_DATA = {
  Verduras: [
    { id: "v1", name: "Tomate Chonto", unit: "lb" },
    { id: "v2", name: "Cebolla Larga", unit: "atado" },
    { id: "v3", name: "Zanahoria", unit: "lb" },
    { id: "v4", name: "Papa Criolla", unit: "lb" },
    { id: "v5", name: "Lechuga Batavia", unit: "un" },
  ],
  Proteinas: [
    { id: "p1", name: "Pechuga de Pollo", unit: "lb" },
    { id: "p2", name: "Carne Molida", unit: "lb" },
    { id: "p3", name: "Huevos AA", unit: "bandeja" },
    { id: "p4", name: "Atún en Agua", unit: "lata" },
  ],
  Aseo: [
    { id: "a1", name: "Detergente Líquido", unit: "botella" },
    { id: "a2", name: "Limpia Pisos", unit: "botella" },
    { id: "a3", name: "Papel Higiénico", unit: "paq 12" },
  ],
  Lacteos: [
    { id: "l1", name: "Leche Deslactosada", unit: "bolsa" },
    { id: "l2", name: "Queso Mozzarella", unit: "lb" },
    { id: "l3", name: "Yogurt Griego", unit: "vaso" },
  ],
};

interface ProductState {
  [key: string]: {
    quantity: number;
    checked: boolean;
  };
}

export function MarketPlanner() {
  const [products, setProducts] = useState<ProductState>({});
  const [activeTab, setActiveTab] = useState("Verduras");

  const updateQuantity = (id: string, delta: number) => {
    setProducts((prev) => {
      const current = prev[id] || { quantity: 0, checked: false };
      const newQty = Math.max(0, current.quantity + delta);
      return {
        ...prev,
        [id]: { ...current, quantity: newQty, checked: newQty > 0 },
      };
    });
  };

  const toggleCheck = (id: string) => {
    setProducts((prev) => {
      const current = prev[id] || { quantity: 1, checked: false };
      return {
        ...prev,
        [id]: { ...current, checked: !current.checked },
      };
    });
  };

  const getQuantity = (id: string) => products[id]?.quantity || 0;
  const getChecked = (id: string) => products[id]?.checked || false;

  const totalItems = Object.values(products).filter(
    (p) => p.checked && p.quantity > 0,
  ).length;

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* 100vh - header/nav offset approx */}

      <Tabs
        defaultValue="Verduras"
        className="w-full flex-1 flex flex-col"
        onValueChange={setActiveTab}
      >
        <div className="px-4 py-2 bg-white border-b">
          <TabsList className="w-full justify-start overflow-x-auto no-scrollbar h-auto p-1 gap-2 bg-transparent">
            {Object.keys(MARKET_DATA).map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="rounded-full border px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden relative bg-gray-50/50">
          <ScrollArea className="h-full px-4 py-4">
            {Object.entries(MARKET_DATA).map(([category, items]) => (
              <TabsContent
                key={category}
                value={category}
                className="mt-0 space-y-3"
              >
                {items.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden border-none shadow-sm"
                  >
                    <CardContent className="p-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Checkbox
                          id={item.id}
                          checked={getChecked(item.id)}
                          onCheckedChange={() => toggleCheck(item.id)}
                          className="h-5 w-5 rounded-md data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                        />
                        <div className="truncate">
                          <label
                            htmlFor={item.id}
                            className={`font-medium block truncate cursor-pointer ${
                              getChecked(item.id)
                                ? "line-through text-muted-foreground"
                                : ""
                            }`}
                          >
                            {item.name}
                          </label>
                          <span className="text-xs text-muted-foreground">
                            {item.unit}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-secondary/30 rounded-lg p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-md hover:bg-white"
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={getQuantity(item.id) <= 0}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-4 text-center text-sm font-semibold">
                          {getQuantity(item.id)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-md hover:bg-white"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Spacer for FAB */}
                <div className="h-20" />
              </TabsContent>
            ))}
          </ScrollArea>

          {/* Floating Action Button area */}
          <div className="absolute bottom-6 left-0 right-0 px-6 flex justify-center pointer-events-none">
            <Button
              className="w-full max-w-md shadow-xl rounded-full h-12 text-base pointer-events-auto bg-indigo-600 hover:bg-indigo-700 transition-all active:scale-95"
              onClick={() => console.log("Finalizar", products)}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Finalizar Mercado ({totalItems})
            </Button>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
