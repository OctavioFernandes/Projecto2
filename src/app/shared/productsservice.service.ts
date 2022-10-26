import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductsserviceService {

  private urlAPI = "http://localhost:3000/products";

  constructor(private http : HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(this.urlAPI);
  }

  getProduct(id:number){
    return this.http.get<Product>(`${this.urlAPI}/${id}`);
  }
}
