import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '@interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/api/v1/products';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  searchProducts(startDate: string, endDate: string, name: string): Observable<any> {

    const body = {
      startDate: startDate,
      endDate: endDate,
      name: name
    };

    return this.http.post(`${this.apiUrl}/search`, body, { headers:this.headers });
  }

  createProduct(product: Product): Observable<Product> {

    return this.http.post<Product>(this.apiUrl, product, { headers: this.headers});
  }

  deleteProduct(productId: number): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;

    const options = {
      headers: this.headers
    };

    return this.http.delete(url, options);
  }
}
