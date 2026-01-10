import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Mock Data
const HISTORY_DATA = [
  {
    id: "h1",
    date: new Date(2025, 12, 5), // Jan 5, 2026
    total: 125000,
    store: "Supermercado Éxito",
    items: [
      { name: "Leche Deslactosada", qty: 3, price: 4500 },
      { name: "Huevos AA x30", qty: 1, price: 18000 },
      { name: "Pechuga de Pollo", qty: 2, price: 15000 },
      { name: "Arroz Diana 5kg", qty: 1, price: 21000 },
      { name: "Aceite 1L", qty: 1, price: 32000 },
    ]
  },
  {
    id: "h2",
    date: new Date(2025, 11, 28), // Dec 28, 2025
    total: 45000,
    store: "D1",
    items: [
      { name: "Detergente Líquido", qty: 1, price: 12000 },
      { name: "Limpia Pisos", qty: 2, price: 8000 },
      { name: "Esponjas x3", qty: 1, price: 5000 },
      { name: "Bolsas de Basura", qty: 1, price: 12000 },
    ]
  },
  {
    id: "h3",
    date: new Date(2025, 11, 15), // Dec 15, 2025
    total: 89000,
    store: "Carulla",
    items: [
      { name: "Vino Tinto", qty: 1, price: 45000 },
      { name: "Queso Paipa", qty: 1, price: 18000 },
      { name: "Jamón Serrano", qty: 1, price: 26000 },
    ]
  }
];

export function PurchaseHistory() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Historial de Compras</h2>
        <Badge variant="outline" className="text-muted-foreground">
          {HISTORY_DATA.length} Registros
        </Badge>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {HISTORY_DATA.map((purchase) => (
          <AccordionItem key={purchase.id} value={purchase.id}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex flex-1 items-center justify-between pr-4">
                <div className="flex flex-col items-start gap-1">
                  <span className="font-semibold text-lg">
                    {format(purchase.date, "d 'de' MMMM, yyyy", { locale: es })}
                  </span>
                  <span className="text-xs text-muted-foreground font-normal">
                    {purchase.store}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-primary block">
                    {formatCurrency(purchase.total)}
                  </span>
                  <span className="text-xs text-muted-foreground font-normal">
                    {purchase.items.length} items
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="bg-muted/30 rounded-lg p-3 space-y-3">
                {purchase.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm border-b border-muted last:border-0 pb-2 last:pb-0">
                    <div className="flex items-center gap-3">
                      <span className="bg-white text-muted-foreground w-6 h-6 flex items-center justify-center rounded-full text-xs box-border border shadow-sm">
                        {item.qty}
                      </span>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium text-gray-700">
                      {formatCurrency(item.price * item.qty)}
                    </span>
                  </div>
                ))}
                
                <div className="pt-2 mt-2 border-t flex justify-between items-center bg-white p-2 rounded shadow-sm">
                  <span className="font-bold">Total Pagado</span>
                  <span className="font-bold text-lg text-primary">
                    {formatCurrency(purchase.total)}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
