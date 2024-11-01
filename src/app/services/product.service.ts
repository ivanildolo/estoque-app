import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '@interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/api/v1/products';

  constructor(private http: HttpClient) { }

  searchProducts(startDate: string, endDate: string, name: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      startDate: startDate,
      endDate: endDate,
      name: name
    };

    return this.http.post(`${this.apiUrl}/search`, body, { headers });
  }

  saveProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'User-Agent': 'insomnia/8.6.1'
    });

    return this.http.post<Product>(this.apiUrl, product, { headers});
  }
}
