import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const historyData = [
  {
    id: "ORD-001",
    date: "2023-06-01",
    store: "Supermercado Central",
    total: 125.5,
    items: 12,
    status: "Completado",
  },
  {
    id: "ORD-002",
    date: "2023-06-15",
    store: "Mercado Local",
    total: 45.2,
    items: 5,
    status: "Completado",
  },
  {
    id: "ORD-003",
    date: "2023-06-28",
    store: "Supermercado Central",
    total: 210.0,
    items: 24,
    status: "Completado",
  },
  {
    id: "ORD-004",
    date: "2023-07-05",
    store: "Tienda de Conveniencia",
    total: 15.75,
    items: 3,
    status: "Completado",
  },
];

export default function History() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Historial de Compras
        </h1>
        <p className="text-muted-foreground">
          Revisa tus compras pasadas y detalles.
        </p>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Orden ID</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Tienda</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyData.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.store}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 hover:bg-green-100"
                  >
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
