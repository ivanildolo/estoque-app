import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '@interfaces/product.interface';
import { ProductService } from '@services/product.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit{
  formLowStock: FormGroup;
  isLoadingLowStock: boolean = false;
  productsLowStock: Product[] = [];
  statusMessageLowStock: string = "";

  formExcessStock: FormGroup;
  isLoadingExcessStock: boolean = false;
  productsExcessStock: Product[] = [];
  statusMessageExcessStock: string = "";

  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'price',
    'quantity',
    'category',
    'location',
    'created_at'
  ];

  pageIndexExcessStock: number = 0;
  pageSizeExcessStock: number = 5;

  // Método para manipular o tamanho da página
  onPageChangeExcessStock(event: any) {
    this.pageIndexExcessStock = event.pageIndex;
    this.pageSizeExcessStock = event.pageSize;
  }

  pageIndexLowStock: number = 0;
  pageSizeLowStock: number = 5;

  // Método para manipular o tamanho da página
  onPageChangeLowStock(event: any) {
    this.pageIndexLowStock = event.pageIndex;
    this.pageSizeLowStock = event.pageSize;
  }

  productsMovements: Product[] = [];
  isLoadingProductsMovements: boolean = false;

  pageIndex: number = 0;
  pageSize: number = 5;

  // Para o controle do colapso
  expandedElement: Product | null = null;

  // Método para manipular o tamanho da página
  onPageChangeMovements(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private productService: ProductService,

  ) {
    this.formLowStock = this.fb.group({
      lowStock: [50, Validators.required],
    });
    this.formExcessStock = this.fb.group({
      excessStock: [200, Validators.required],
    });
  }

  getLowStockReport(){
    this.isLoadingLowStock = true;
    this.productService.getLowStockReport(this.formLowStock.value.lowStock).subscribe({
      next: (products) => {
        this.productsLowStock = products;
        this.isLoadingLowStock = false;
        this.statusMessageLowStock = products.length > 0 ? 'Atenção: Alguns produtos estão com estoque baixo!' : 'Estoque está dentro do limite esperado, tudo OK!';
      },
      error: () => {
        this.isLoadingLowStock = false;
        this.openSnackBar('Falha ao tentar listar produtos com estoque baixo!');
      },
    })
  }

  getExcessStockReport(){
    this.isLoadingExcessStock = true;
    this.productService.getExcessStockReport(this.formExcessStock.value.excessStock).subscribe({
      next: (products) => {
        this.productsExcessStock = products;
        this.isLoadingExcessStock = false;
        this.statusMessageExcessStock = products.length > 0 ? 'Atenção: Alguns produtos estão com estoque em excesso!' : 'Estoque está dentro do limite esperado, tudo OK!';
      },
      error: () => {
        this.isLoadingExcessStock = false;
        this.openSnackBar('Falha ao tentar listar produtos com estoque em excesso!');
      },
    })
  }

  getAllProducts(){
    this.isLoadingProductsMovements = true;
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.productsMovements = products;
        this.isLoadingProductsMovements = false;
      },
      error: () => {
        this.isLoadingProductsMovements = false;
        this.openSnackBar('Falha ao tentar listar movimentações dos produtos!');
      },
    })
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, 'fechar');
  }

  onSubmitLowStock() {
    if (this.formLowStock.valid) {
      this.getLowStockReport();
    }
  }

  onSubmitExcessStock() {
    if (this.formLowStock.valid) {
      this.getExcessStockReport();
    }
  }

  ngOnInit(): void {
    this.getLowStockReport();
    this.getExcessStockReport();
    this.getAllProducts();
  }
}
