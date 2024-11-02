import { ProductService } from '@services/product.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent {
  productForm: FormGroup;
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stock_quantity: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      warehouse_location: ['', Validators.required]
    });
  }

  openSnackBar(message:string) {
    this.snackBar.open(message, "fechar");
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.isLoading = true;
      this.productService.createProduct(this.productForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.openSnackBar("Produto salvo com sucesso!");
          this.router.navigate(['/']);
        },
        error: () => {
          this.isLoading = false;
          this.openSnackBar("Falha ao tentar salvar o produto!");
        }
      });
    }
  }
}
