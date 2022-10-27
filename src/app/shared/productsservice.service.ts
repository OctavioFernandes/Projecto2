import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductsserviceService {

  private urlAPI = "http://localhost:3000/products";

  public urlAPIseacrh : string = "http://localhost:3000/products";

  constructor(private http : HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(this.urlAPI);
  }

  getProduct(id:number){
    return this.http.get<Product>(`${this.urlAPI}/${id}`);
  }

  searchProducts(recPage: number){

    return this.http.get<Product[]>(`${this.urlAPI}?_limit=${recPage}`)

  }

  filterProducts(recPage: number, filter: string){

    console.log(`${this.urlAPI}?_limit=${recPage}${filter}`);

    return this.http.get<Product[]>(`${this.urlAPI}?_limit=${recPage}${filter}`)

  }

  //http://localhost:3000/products?tipo_de_produto=Calças&cor=Azul&_limit=100

  //http://localhost:3000/products?limit=6&tipo_de_produto=Calças&cor=Azul&cor=Laranja&tipo_de_produto=Casaco


  // pesquisaPhotos(pesquisa : string, initial : number, recPage: number) {
  //   return this.http.get<Photo[]>(`${this.urlAPI}?title_like=${pesquisa}&_start=${initial}&_limit=${recPage}`, { observe : 'response' })
  //     .pipe(
  //       catchError(this.processaErro)
  //     );
  // }

}
