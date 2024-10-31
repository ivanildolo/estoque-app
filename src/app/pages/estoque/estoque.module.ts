import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstoqueRoutingModule } from './estoque-routing.module';
import { EstoqueComponent } from './estoque.component';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from '../../shared/material/material.module';


@NgModule({
  declarations: [
    EstoqueComponent
  ],
  imports: [
    CommonModule,
    EstoqueRoutingModule,
    MaterialModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class EstoqueModule { }
