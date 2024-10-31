import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Product } from '@interfaces/product.interface';
import { ProductService } from '@services/product.service';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrl: './estoque.component.scss',
})
export class EstoqueComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'price',
    'item_category',
    'warehouse_location',
    'creation_date',
  ];
  products: Product[] = [];
  isLoading: boolean = false;
  firstDate: string = '';
  lastDate: string = '';
  constructor(private productService: ProductService) {}

  searchProducts(productName: string, firstDate: string, lastDate: string) {
    this.isLoading = true;
    this.productService
      .searchProducts(firstDate, lastDate, productName)
      .subscribe(
        (data) => {
          this.products = data;
          this.isLoading = false;
        },
        (error) => console.error('Erro:', error)
      );
  }
  getIntervalDates() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');

    // Primeiro dia do mês
    this.firstDate = `${year}-${month}-01`;

    // Último dia do mês
    const lastDay = new Date(year, today.getMonth() + 1, 0).getDate(); // O dia 0 do próximo mês retorna o último dia do mês atual
    this.lastDate = `${year}-${month}-${String(lastDay).padStart(2, '0')}`;
  }

  ngOnInit(): void {
    this.getIntervalDates();
    this.searchProducts('', this.firstDate, this.lastDate);
  }

  onSubmit(form: NgForm) {
    const filters = form.value;
    this.searchProducts(filters.productName, filters.firstDate, filters.lastDate);
  }
}
