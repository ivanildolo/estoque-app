import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateProductRoutingModule } from './create-product-routing.module';
import { CreateProductComponent } from './create-product.component';
import { MaterialModule } from '@shared/material/material.module';


@NgModule({
  declarations: [
    CreateProductComponent
  ],
  imports: [
    CommonModule,
    CreateProductRoutingModule,
    MaterialModule
  ]
})
export class CreateProductModule { }
