import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginserviceService } from '../header/loginservice.service';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductsserviceService {

  private urlAPI = "http://localhost:3000/products";

  addUrl! :string;

  shoppingCart:number[] = [];

  // Test Area

  // shoppingCart:number[] = [1,2,3,4];

  constructor(private http: HttpClient, private servLogin: LoginserviceService) { }

  getProducts() {
    return this.http.get<Product[]>(this.urlAPI);
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${this.urlAPI}/${id}`);
  }

  searchProducts(recPage: number) {

    return this.http.get<Product[]>(`${this.urlAPI}?_limit=${recPage}`)

  }

  filterProducts(filter: string, recPage?: number) {
    if (recPage === undefined) {
      return this.http.get<Product[]>(`${this.urlAPI}?${filter}`);
    } else {
      return this.http.get<Product[]>(`${this.urlAPI}?_limit=${recPage}${filter}`);
    }
  }

  filterWishlist(){

    this.addUrl = "";

    for (let i = 0; i < this.servLogin.user.wishlist?.length!; i++) {
      this.addUrl += "&id=" + this.servLogin.user.wishlist![i];      
    };

    return this.http.get<Product[]>(`${this.urlAPI}?${this.addUrl}`);
  }

  insertProduct(product : Product){
    return this.http.post<Product>(this.urlAPI, product);
  }

  deleteProduct(id:number){
    return this.http.delete<Product>(`${this.urlAPI}/${id}`);
  }


  getShoppingCart(filter:string){
      return this.http.get<Product[]>(`${this.urlAPI}?${filter}`);
  }
  
}
