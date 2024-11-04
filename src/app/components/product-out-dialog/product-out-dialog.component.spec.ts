import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEntryDialogComponent } from './product-out-dialog.component';

describe('ProductEntryDialogComponent', () => {
  let component: ProductEntryDialogComponent;
  let fixture: ComponentFixture<ProductEntryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductEntryDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
