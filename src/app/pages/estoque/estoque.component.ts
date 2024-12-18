import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '@interfaces/product.interface';
import { ProductService } from '@services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@components/confirm-dialog/confirm-dialog.component';
import { ProductEntryDialogComponent } from '@components/product-entry-dialog/product-entry-dialog.component';
import { ProductOutDialogComponent } from '@components/product-out-dialog/product-out-dialog.component';

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
    'quantity',
    'category',
    'location',
    'created_at',
    'actions',
  ];
  products: Product[] = [];
  isLoading: boolean = false;
  firstDate: string = '';
  lastDate: string = '';
  isLoadingDeleteProduct: boolean = false;

  pageIndex: number = 0;
  pageSize: number = 5;


  @ViewChild('form') form!: NgForm;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

    onPageChange(event: any) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
    }

  searchProducts(productName: string, firstDate: string, lastDate: string) {
    this.isLoading = true;
    this.productService
      .searchProducts(firstDate, lastDate, productName)
      .subscribe({
        next: (data) => {
          this.products = data;
          this.isLoading = false;
        },
        error: (error) => console.error('Erro:', error),
      });
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

    this.searchProducts('', this.firstDate, this.lastDate);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'fechar');
  }

  ngOnInit(): void {
    this.getIntervalDates();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const filters = form.value;
      this.searchProducts(
        filters.productName,
        filters.firstDate,
        filters.lastDate
      );
    } else {
      this.openSnackBar('Intervalo de datas invalido!');
    }
  }

  deleteProdut(product: Product): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: `Tem certeza que deseja deletar o produto:${product.name}?`,
    });
    dialogRef.afterClosed().subscribe((ok) => {
      if (ok) {
        this.isLoadingDeleteProduct = true;
        this.productService.deleteProduct(product.id!).subscribe({
          next: () => {
            this.openSnackBar(
              `Produto "${product.name}" deletado com sucesso!`
            );
            const values = this.form.value;
            this.searchProducts(values.name, values.startDate, values.endDate);
            this.isLoadingDeleteProduct = false;
          },
          error: (error) => {
            this.openSnackBar(error.message);
            this.isLoadingDeleteProduct = false;
          },
        });
      }
    });
  }

  stockIn(product: Product): void {
    const dialogRef = this.dialog.open(ProductEntryDialogComponent, {
      data: product,
    });
    dialogRef.afterClosed().subscribe((ok) => {
      if (ok && this.form.valid) {
        const filters = this.form.value;
        this.isLoading = true;
        setTimeout(() => {
          this.searchProducts(
            filters.productName,
            filters.firstDate,
            filters.lastDate
          );
        }, 2000);
      }
    });
  }

  stockOut(product: Product): void {
    const dialogRef = this.dialog.open(ProductOutDialogComponent, {
      data: product,
    });
    dialogRef.afterClosed().subscribe((ok) => {
      if (ok && this.form.valid) {
        const filters = this.form.value;
        this.isLoading = true;
        setTimeout(() => {
          this.searchProducts(
            filters.productName,
            filters.firstDate,
            filters.lastDate
          );
        }, 2000);
      }
    });
  }
}
