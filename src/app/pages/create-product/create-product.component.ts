import { CategoryService } from './../../services/category.service';
import { ProductService } from '@services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Category } from '@interfaces/category.interface';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  isLoading: boolean = false;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      category_id: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'fechar');
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.isLoading = true;
      this.productService.createProduct(this.productForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.openSnackBar('Produto salvo com sucesso!');
          this.router.navigate(['/']);
        },
        error: () => {
          this.isLoading = false;
          this.openSnackBar('Falha ao tentar salvar o produto!');
        },
      });
    }
  }

  getCategories() {
    this.categoryService.listAllCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      error: () => this.openSnackBar('Falha ao tentar listar categorias'),
    });
  }

  displayFn(option: Category): string {
    return option.name ? option.name : '';
  }

  ngOnInit() {
    this.getCategories();
  }
}
