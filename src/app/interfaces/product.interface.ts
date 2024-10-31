export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  item_category: string;
  warehouse_location: string;
  creation_date: string; // usando string para ISO date format
}
