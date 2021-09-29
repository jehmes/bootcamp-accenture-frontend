import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopApiService {

  urlGetAll = "http://localhost:8080/product"
  urlGetById = "http://localhost:8080/product/"
  urlCreate = "http://localhost:8080/product"
  urlDelete = "http://localhost:8080/product/delete/"
  urlUpdate = "http://localhost:8080/product/update/"

  constructor(private http: HttpClient) { }
  
  createProduct(product: any): Observable<any> {
    return this.http.post<any>(this.urlCreate, product)
  }

  uploadImg(img: any) {
    return this.http.post<any>("http://localhost:8080/upload", img)
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
