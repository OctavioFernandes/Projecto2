import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from '../header/loginservice.service';
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
  wishlistAddedPopup = false;

  // srcImg : string = "";


  secoundImg: boolean = false;


  constructor(private servProd: ProductsserviceService, private router: Router, protected servLogin: LoginserviceService) { }

  ngOnInit(): void {
    this.loadColorsAndTipes();
    this.getPaginateProducts();
    this.filterProducts("StartPage", "");
    // this.userLoged();
  }

  addWishlist(id: number) {
    // console.log("recebi o id a introduzir: " + id);
    this.servLogin.user.wishlist?.push(id);
    this.wishlistAddedPopup = true;

    //Não testo se ja existe na wishlist porque caso já exista a unica estrela que mostra é o de remover da wishlist.
  }

  removeWishlist(id: number) {
    this.servLogin.user.wishlist?.splice(this.servLogin.user.wishlist?.indexOf(id), 1);
    //Não testo se ja existe na wishlist porque caso já exista a unica estrela que mostra é o de remover da wishlist.
  }

  closeWishlistPopUp() {
    this.wishlistAddedPopup = !this.wishlistAddedPopup;
  }

  // Tests Area
  userLoged() {
    // console.log("user logado wishList:");
    // console.log(this.servLogin.user.wishlist);
    // console.log("user logado:");
    // console.log(this.servLogin.user);
  }
  // Tests Area

  wishList(id: number) {
    console.log(this.servLogin.user.wishlist)
    // console.log(id);
    // console.log(this.servLogin.user.wishlist?.includes(id))

    if (this.servLogin.user.wishlist?.includes(id)) {
      return true
    } else {
      return false;
    }
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

      // this.totalProducts = response.length
      // console.log("totalProducts: "+this.totalProducts)
      this.colorsList.sort();
      this.typesList.sort();
      // console.log(this.colorsList);

      // console.log(this.typesList);
    })
  }

  getPaginateProducts() {
    this.servProd.searchProducts(this.recPage).subscribe(response => {

      this.productsList = response;
      // console.log(this.productsList);

    });
  }

  filterProducts(key: string, value: string) {

    let field: string = "";

    this.addUrl = "";

    switch (key) {

      case "Tipo":
        field = "&tipo_de_produto=" + value;
        // console.log(field);

        if (!this.url.includes(field)) {
          this.url.push(field);

        } else {
          this.url.splice(this.url.indexOf(field), 1);
        }
        break;

      case "Cor":
        field = "&cor=" + value;
        // console.log(field);

        if (!this.url.includes(field)) {
          this.url.push(field);

        } else {
          this.url.splice(this.url.indexOf(field), 1);
        }
        break;

      case "VerMais":
        if ((this.recPage + 6) >= this.totalProducts) {

          this.recPage = this.totalProducts;
          this.seeMoreButton = false;

        } else {
          this.recPage = this.recPage + 6;
        }
        break;

      case "StartPage":
        break;
      // default:
      //   break;
    }

    for (let i = 0; i < this.url.length; i++) {
      this.addUrl += this.url[i];
    }

    // console.log(this.recPage);

    this.servProd.filterProducts(this.addUrl, this.recPage).subscribe(response => {
      this.productsList = response;
    });

    this.servProd.filterProducts(this.addUrl).subscribe(response => {
      this.totalProducts = response.length;

      // console.log("total:produtos" + this.totalProducts);
      if (this.totalProducts <= 6) {
        this.seeMoreButton = false;
      } else if (this.recPage === this.totalProducts) {
        this.seeMoreButton = false;
      }
      else {
        this.seeMoreButton = true;
      }
    });

    //http://localhost:3000/products?limit=6&tipo_de_produto=Calças&cor=Azul&cor=Laranja&tipo_de_produto=Casaco
  }

  showProductInfo(id: number) {
    this.router.navigateByUrl(`/infoproducts/${id}`);
  }

  showSecondImage() {
    // console.log("hover")
    this.secoundImg = true;
  }

  showFirstImage() {
    // console.log("out")
    this.secoundImg = false;
  }

}



// <img [src]="'/assets/Imagens/'+product.foto_principal" [alt]="product.nome" class="box">
