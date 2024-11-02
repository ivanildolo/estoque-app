import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/estoque/estoque.module').then((m) => m.EstoqueModule),
  },
  {
    path: 'novo-produto',
    loadChildren: () =>
      import('./pages/create-product/create-product.module').then(
        (m) => m.CreateProductModule
      ),
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
