import { Category } from "./category.interface";
import { Movement } from "./moviment.interface";

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: Category;
  location: string;
  created_at?: string;
  movements: Movement[];
}
