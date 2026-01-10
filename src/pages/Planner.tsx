import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Sparkles,
  Check,
  ShoppingCart,
  DollarSign,
  TrendingUp,
} from "lucide-react";

// Types
interface ShoppingItem {
  id: number;
  name: string;
  quantity: string;
  checked: boolean;
}

interface PredictionItem {
  id: number;
  product: string;
  currentStock: string;
  score: number;
  suggestedQty: number;
}

// Data
const initialShoppingList: ShoppingItem[] = [
  { id: 1, name: "Leche Deslactosada", quantity: "2 lts", checked: false },
  { id: 2, name: "Huevos", quantity: "30 un", checked: false },
  { id: 3, name: "Pan Integral", quantity: "1 pq", checked: true },
  { id: 4, name: "Manzanas", quantity: "1 kg", checked: false },
];

const predictionStats = [
  {
    title: "Producto más probable",
    value: "Papel Higiénico",
    desc: "Muy alta probabilidad de agotarse",
    icon: <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Gasto Sugerido",
    value: "$120,000",
    desc: "Para cubrir predicciones",
    icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Precisión",
    value: "85%",
    desc: "Basado en últimos 3 meses",
    icon: <TrendingUp className="h-4 w-4 text-green-500" />,
  },
];

const suggestions: PredictionItem[] = [
  {
    id: 101,
    product: "Papel Higiénico",
    currentStock: "Crítico",
    score: 95,
    suggestedQty: 12,
  },
  {
    id: 102,
    product: "Arroz Integral",
    currentStock: "Bajo",
    score: 80,
    suggestedQty: 2,
  },
  {
    id: 103,
    product: "Aceite de Oliva",
    currentStock: "Medio",
    score: 65,
    suggestedQty: 1,
  },
  {
    id: 104,
    product: "Detergente Ropa",
    currentStock: "Medio",
    score: 40,
    suggestedQty: 1,
  },
];

export default function Planner() {
  const [shoppingList, setShoppingList] =
    React.useState<ShoppingItem[]>(initialShoppingList);
  const [acceptedPredictions, setAcceptedPredictions] = React.useState<
    number[]
  >([]);

  const handleToggleItem = (id: number) => {
    setShoppingList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const handleAcceptPrediction = (item: PredictionItem) => {
    if (acceptedPredictions.includes(item.id)) return;

    setAcceptedPredictions((prev) => [...prev, item.id]);
    setShoppingList((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: item.product,
        quantity: `x${item.suggestedQty}`,
        checked: false,
      },
    ]);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-red-500 hover:bg-red-600";
    if (score >= 70) return "bg-orange-500 hover:bg-orange-600";
    return "bg-yellow-500 hover:bg-yellow-600";
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Planificador de Compras
          </h1>
          <p className="text-muted-foreground">
            Gestiona tu lista y revisa sugerencias inteligentes.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Agregar Item Manual
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column: Manual Shopping List */}
        <div className="space-y-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Mi Lista de Compras</CardTitle>
              <CardDescription>
                {shoppingList.filter((i) => !i.checked).length} items pendientes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {shoppingList.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Tu lista está vacía.
                </div>
              ) : (
                shoppingList.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox
                      id={`item-${item.id}`}
                      checked={item.checked}
                      onCheckedChange={() => handleToggleItem(item.id)}
                    />
                    <div className="flex-1 space-y-1">
                      <label
                        htmlFor={`item-${item.id}`}
                        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer ${
                          item.checked
                            ? "line-through text-muted-foreground"
                            : ""
                        }`}
                      >
                        {item.name}
                      </label>
                      <p className="text-xs text-muted-foreground">
                        {item.quantity}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Predictions & Stats */}
        <div className="space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {predictionStats.map((stat, index) => (
              <Card
                key={index}
                className="bg-indigo-50/50 dark:bg-indigo-950/10 border-indigo-100 dark:border-indigo-900"
              >
                <CardContent className="p-4 pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </span>
                    {stat.icon}
                  </div>
                  <div className="text-lg font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Predictions Table */}
          <Card className="overflow-hidden border-indigo-200 dark:border-indigo-800">
            <CardHeader className="bg-indigo-50/30 dark:bg-indigo-950/20">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <CardTitle>Sugerencias Inteligentes</CardTitle>
              </div>
              <CardDescription>
                Basado en tus hábitos de consumo y stock estimado.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suggestions.map((item) => {
                    const isAccepted = acceptedPredictions.includes(item.id);
                    return (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">{item.product}</span>
                            <span className="text-xs text-muted-foreground">
                              Sug: x{item.suggestedQty}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${getScoreColor(
                              item.score,
                            )} border-none text-white text-xs px-2 py-0.5 h-auto`}
                          >
                            {item.currentStock}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant={isAccepted ? "ghost" : "outline"}
                            className={`h-8 w-8 p-0 ${
                              isAccepted
                                ? "text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100"
                                : ""
                            }`}
                            onClick={() => handleAcceptPrediction(item)}
                            disabled={isAccepted}
                          >
                            {isAccepted ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Plus className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
