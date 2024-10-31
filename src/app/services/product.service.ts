import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/api/v1/products/search';

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

    return this.http.post(this.apiUrl, body, { headers });
  }
}
