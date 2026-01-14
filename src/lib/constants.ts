import {
  Beef,
  Carrot,
  PackageOpen,
  Milk,
  SprayCan,
  Heart,
  CupSoda,
  PawPrint,
} from "lucide-react";

export const CATEGORIES = [
  {
    id: "carnes",
    name: "Carnes",
    icon: Beef,
    color: "text-red-500",
    bgColor: "bg-red-100",
  },
  {
    id: "verduras",
    name: "Verduras",
    icon: Carrot,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    id: "despensa",
    name: "Despensa",
    icon: PackageOpen,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    id: "lacteos",
    name: "Lácteos",
    icon: Milk,
    color: "text-blue-400",
    bgColor: "bg-blue-100",
  },
  {
    id: "aseo-hogar",
    name: "Aseo Hogar",
    icon: SprayCan,
    color: "text-cyan-500",
    bgColor: "bg-cyan-100",
  },
  {
    id: "cuidado-personal",
    name: "Cuidado Personal",
    icon: Heart,
    color: "text-pink-500",
    bgColor: "bg-pink-100",
  },
  {
    id: "bebidas",
    name: "Bebidas",
    icon: CupSoda,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  {
    id: "mascotas",
    name: "Mascotas",
    icon: PawPrint,
    color: "text-orange-500",
    bgColor: "bg-orange-100",
  },
] as const;

export const SHOPPING_FREQUENCIES = [
  { value: "semanal", label: "Semanal" },
  { value: "quincenal", label: "Quincenal" },
  { value: "mensual", label: "Mensual" },
] as const;

export const PRODUCT_UNITS = [
  { value: "lb", label: "Libra (lb)" },
  { value: "kg", label: "Kilogramo (kg)" },
  { value: "pq", label: "Paquete (pq)" },
  { value: "l", label: "Litro (l)" },
] as const;

export const MOCK_PRODUCTS = {
  carnes: [
    { id: "c1", name: "Pechuga de Pollo", unit: "kg" },
    { id: "c2", name: "Carne Molida", unit: "kg" },
    { id: "c3", name: "Chuleta de Cerdo", unit: "kg" },
  ],
  verduras: [
    { id: "v1", name: "Tomate", unit: "kg" },
    { id: "v2", name: "Cebolla", unit: "kg" },
    { id: "v3", name: "Zanahoria", unit: "kg" },
  ],
  despensa: [
    { id: "d1", name: "Arroz", unit: "kg" },
    { id: "d2", name: "Aceite", unit: "l" },
    { id: "d3", name: "Frijoles", unit: "pq" },
  ],
  lacteos: [
    { id: "l1", name: "Leche Entera", unit: "l" },
    { id: "l2", name: "Queso Mozzarella", unit: "g" },
    { id: "l3", name: "Yogurt", unit: "l" },
  ],
  "aseo-hogar": [
    { id: "a1", name: "Detergente Ropa", unit: "l" },
    { id: "a2", name: "Lavaloza", unit: "und" },
    { id: "a3", name: "Cloro", unit: "l" },
  ],
  "cuidado-personal": [
    { id: "p1", name: "Shampoo", unit: "frasco" },
    { id: "p2", name: "Jabón de Baño", unit: "und" },
    { id: "p3", name: "Pasta Dental", unit: "und" },
  ],
  bebidas: [
    { id: "b1", name: "Agua con gas", unit: "l" },
    { id: "b2", name: "Jugo de Naranja", unit: "l" },
    { id: "b3", name: "Gaseosa", unit: "l" },
  ],
  mascotas: [
    { id: "m1", name: "Comida Perro", unit: "kg" },
    { id: "m2", name: "Arena Gatos", unit: "kg" },
    { id: "m3", name: "Snacks", unit: "pq" },
  ],
};
