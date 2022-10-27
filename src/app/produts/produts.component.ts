import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../shared/product';
import { ProductsserviceService } from '../shared/productsservice.service';

@Component({
  selector: 'app-produts',
  templateUrl: './produts.component.html',
  styleUrls: ['./produts.component.css']
})
export class ProdutsComponent implements OnInit {

  colorsList: string[] = [];
  typesList: string[] = [];
  totalProducts!: number;
  recPage: number = 6;
  productsList: Product[] = [];
  seeMoreButton: boolean = true;

  url: string[] = [];
  addUrl: string = "";


  constructor(private servProd: ProductsserviceService, private router: Router) { }

  ngOnInit(): void {
    this.loadColorsAndTipes();
    this.getPaginateProducts();

  }

  loadColorsAndTipes() {
    this.servProd.getProducts().subscribe(response => {
      for (let index = 0; index < response.length; index++) {

        if (!this.colorsList.includes(response[index].cor)) {
          this.colorsList.push(response[index].cor);
        }

        if (!this.typesList.includes(response[index].tipo_de_produto)) {
          this.typesList.push(response[index].tipo_de_produto);
        }
      }

      this.totalProducts = response.length
      this.colorsList.sort();
      this.typesList.sort();
      console.log(this.colorsList);

      console.log(this.typesList);
    })
  }

  getPaginateProducts() {
    this.servProd.searchProducts(this.recPage).subscribe(response => {

      this.productsList = response;
      console.log(this.productsList);

    });
  }

  seeMoreProducts() {

    if ((this.recPage + 6) >= this.totalProducts) {

      this.recPage = this.totalProducts;
      this.seeMoreButton = false;

    } else {
      this.recPage = this.recPage + 6;
    }
    this.getPaginateProducts();

    console.log(this.recPage);

    console.log(this.servProd.urlAPIseacrh);

    this.servProd.urlAPIseacrh += (`limit=${this.recPage}`);

    console.log(this.servProd.urlAPIseacrh);

  }

  filterProducts(key: string, value: string) {

    let field: string = "";

    this.addUrl="";

    if (key === "Tipo") {

      field = "&tipo_de_produto=" + value;
      console.log(field);

      if (!this.url.includes(field)) {
        this.url.push(field);

      } else {
        this.url.splice(this.url.indexOf(field), 1);
      }


    } else {
      field = "&cor=" + value;
      console.log(field);

      if (!this.url.includes(field)) {
        this.url.push(field);

      } else {
        this.url.splice(this.url.indexOf(field), 1);
      }

    }

    // field = key + value;

    console.log(this.url);

    console.log(this.addUrl);

    for (let i = 0; i < this.url.length; i++) {
      this.addUrl += this.url[i];      
    }
    
    console.log("AddURL:"+this.addUrl);

    this.servProd.filterProducts(this.recPage,this.addUrl).subscribe(response=>{
      this.productsList = response;
      this.totalProducts = response.length;
    })


    //http://localhost:3000/products?limit=6&tipo_de_produto=Calças&cor=Azul&cor=Laranja&tipo_de_produto=Casaco


  }





  showProductInfo(id: number) {
    this.router.navigateByUrl(`/infoproducts/${id}`);
  }

}



// <img [src]="'/assets/Imagens/'+product.foto_principal" [alt]="product.nome" class="box">
