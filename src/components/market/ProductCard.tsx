import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  name: string;
  category: string;
  price: string | number;
  imageUrl?: string;
  onAddToCart?: (quantity: number) => void;
}

export function ProductCard({
  name,
  category,
  price,
  imageUrl = "https://placehold.co/300x200",
  onAddToCart,
}: ProductCardProps) {
  const [quantity, setQuantity] = React.useState(1);

  return (
    <Card className="w-[300px] overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start gap-2">
          <CardTitle
            className="text-lg font-semibold leading-tight line-clamp-2"
            title={name}
          >
            {name}
          </CardTitle>
          <Badge variant="outline" className="shrink-0">
            {category}
          </Badge>
        </div>
        <div className="text-xl font-bold text-primary mt-2">
          {typeof price === "number" ? `$${price.toFixed(2)}` : price}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center gap-3">
          <label
            htmlFor={`qty-${name}`}
            className="text-sm font-medium text-muted-foreground whitespace-nowrap"
          >
            Cantidad
          </label>
          <Input
            id={`qty-${name}`}
            type="number"
            min={1}
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="w-full"
          />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={() => onAddToCart?.(quantity)}>
          Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  );
}
