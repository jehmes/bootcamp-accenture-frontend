import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopApiService {

  urlGetAll = "http://localhost:8765/product-service"
  urlGetById = "http://localhost:8765/product-service/"
  urlCreate = "http://localhost:8765/product-service"
  urlDelete = "http://localhost:8765/product-service/delete/"
  urlUpdate = "http://localhost:8080/product-service/update/"

  constructor(private http: HttpClient) { }
  
  createProduct(product: any): Observable<any> {
    return this.http.post<any>(this.urlCreate, product)
  }
  
  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.urlGetAll)
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.urlGetById}${id}`)
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlDelete}${id}`)
  }

  updateProduct(product: any, id: number): Observable<any> {
    return this.http.post<any>(`${this.urlUpdate}${id}`, product)
  }
}
