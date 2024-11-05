import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOutDialogComponent } from './product-out-dialog.component';

describe('ProductOutDialogComponent', () => {
  let component: ProductOutDialogComponent;
  let fixture: ComponentFixture<ProductOutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductOutDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductOutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
