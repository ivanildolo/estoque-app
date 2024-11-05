import { Category } from './../interfaces/category.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '@interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8080/api/v1/categories';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  constructor(private http: HttpClient) { }

  listAllCategories(): Observable<Category[]> {

    return this.http.get<Category[]>(this.apiUrl, { headers:this.headers });
  }
}
