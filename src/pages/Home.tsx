import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  BarChart2,
  Calendar,
  History,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Smart Market Planner
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Optimiza tus compras, ahorra dinero y planifica tu futuro con
            inteligencia artificial.
          </p>
          <div className="flex gap-4 justify-center pt-8">
            <Link to="/dashboard">
              <Button size="lg" className="gap-2">
                Ir al Dashboard <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/planner">
              <Button size="lg" variant="outline" className="gap-2">
                Planificar Compra <ShoppingCart className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <BarChart2 className="w-10 h-10 text-indigo-500 mb-4" />
              <CardTitle>Dashboard Inteligente</CardTitle>
              <CardDescription>
                Visualiza tus gastos y estadísticas de consumo en tiempo real.
              </CardDescription>
            </CardHeader>
            <CardContent>
              Revisa métricas clave y toma decisiones informadas sobre tu
              economía doméstica.
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <History className="w-10 h-10 text-purple-500 mb-4" />
              <CardTitle>Historial de Compras</CardTitle>
              <CardDescription>
                Registro detallado de tus compras anteriores.
              </CardDescription>
            </CardHeader>
            <CardContent>
              Mantén un seguimiento de precios y productos comprados a lo largo
              del tiempo.
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <Calendar className="w-10 h-10 text-pink-500 mb-4" />
              <CardTitle>Planificador Predictivo</CardTitle>
              <CardDescription>
                Organiza tu próxima visita al mercado.
              </CardDescription>
            </CardHeader>
            <CardContent>
              Utiliza predicciones basadas en tu historial para saber qué
              necesitas comprar antes de que se acabe.
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
