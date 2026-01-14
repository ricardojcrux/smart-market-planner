import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SHOPPING_FREQUENCIES } from "@/lib/constants";
import { User, Calendar, Save } from "lucide-react";

export function ProfileSettings() {
  const [frequency, setFrequency] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Saved frequency:", frequency);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-t-indigo-500">
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-indigo-50 rounded-xl">
            <User className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Mi Perfil
            </CardTitle>
          </div>
        </div>
        <CardDescription className="text-base text-slate-500">
          Personaliza tu planificador para optimizar tus compras.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label
            htmlFor="frequency"
            className="text-sm font-semibold text-slate-700 flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-indigo-500" />
            Frecuencia de Compra
          </Label>
          <Select value={frequency} onValueChange={setFrequency}>
            <SelectTrigger
              id="frequency"
              className="w-full h-11 border-slate-200 focus:ring-indigo-500 hover:border-indigo-300 transition-colors"
            >
              <SelectValue placeholder="Selecciona tu frecuencia de compra" />
            </SelectTrigger>
            <SelectContent>
              {SHOPPING_FREQUENCIES.map((freq) => (
                <SelectItem
                  key={freq.value}
                  value={freq.value}
                  className="cursor-pointer focus:bg-indigo-50 focus:text-indigo-700"
                >
                  {freq.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-[0.8rem] text-slate-500 bg-slate-50 p-2 rounded-md border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
            ℹ️ Calcularemos tus sugerencias de stock basándonos en ciclos{" "}
            {frequency ? (
              <b>
                {SHOPPING_FREQUENCIES.find(
                  (f) => f.value === frequency,
                )?.label.toLowerCase()}
                es
              </b>
            ) : (
              "de compra"
            )}
            .
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
          disabled={!frequency || isLoading}
          onClick={handleSave}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Guardando...
            </span>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Guardar Configuración
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
