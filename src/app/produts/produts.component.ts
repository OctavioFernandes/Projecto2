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
  seeMoreButton:boolean = true;


  constructor(private servProd: ProductsserviceService, private router:Router) { }

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

  filter(key: string, value: string) {
    console.log(key + ' ' + value);
  }

  getPaginateProducts() {
    this.servProd.searchProducts(this.recPage).subscribe(response => {

      this.productsList=response;
      console.log(this.productsList);

    });
  }

  seeMoreProducts(){

    if ((this.recPage + 6) >= this.totalProducts) {

      this.recPage = this.totalProducts;
      this.seeMoreButton = false;

    }else{
      this.recPage = this.recPage + 6 ;
    }
    this.getPaginateProducts();
    
    console.log(this.recPage);

  }
  showProductInfo(id: number){
    this.router.navigateByUrl(`/infoproducts/${id}`)
  }

}



// <img [src]="'/assets/Imagens/'+product.foto_principal" [alt]="product.nome" class="box">
