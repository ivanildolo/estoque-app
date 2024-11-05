import { ProductService } from '@services/product.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '@interfaces/product.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-out-dialog',
  templateUrl: './product-out-dialog.component.html',
  styleUrl: './product-out-dialog.component.scss',
})
export class ProductOutDialogComponent {
  form: FormGroup;
  isLoading: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<ProductOutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private productService: ProductService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      quantity: ['', [Validators.required, Validators.min(1), Validators.max(product.quantity)]],
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'fechar');
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;
      this.productService
        .stockOut(this.product.id!, this.form.value.quantity)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.openSnackBar('Retirada do estoque realizada com sucesso!');
            this.dialogRef.close(true);
          },
          error: (response) => {
            this.isLoading = false;
            this.openSnackBar(response?.error?.message);
            this.dialogRef.close(false);
          },
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
