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
  secoundImg: boolean = false;

  constructor(private servProd: ProductsserviceService, private router: Router, protected servLogin: LoginserviceService) { }

  ngOnInit(): void {
    this.loadColorsAndTipes();
    this.getPaginateProducts();
    this.filterProducts("StartPage", "");
  }

  addWishlist(id: number) {
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

  wishList(id: number) {
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

      this.colorsList.sort();
      this.typesList.sort();
    })
  }

  getPaginateProducts() {
    this.servProd.searchProducts(this.recPage).subscribe(response => {
      this.productsList = response;
    });
  }

  filterProducts(key: string, value: string) {

    let field: string = "";

    this.addUrl = "";

    switch (key) {

      case "Tipo":
        field = "&tipo_de_produto=" + value;

        if (!this.url.includes(field)) {
          this.url.push(field);

        } else {
          this.url.splice(this.url.indexOf(field), 1);
        }
        break;

      case "Cor":
        field = "&cor=" + value;

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
    }

    for (let i = 0; i < this.url.length; i++) {
      this.addUrl += this.url[i];
    }

    this.servProd.filterProducts(this.addUrl, this.recPage).subscribe(response => {
      this.productsList = response;
    });

    this.servProd.filterProducts(this.addUrl).subscribe(response => {
      this.totalProducts = response.length;

      if (this.totalProducts <= 6) {
        this.seeMoreButton = false;
      } else if (this.recPage === this.totalProducts) {
        this.seeMoreButton = false;
      }
      else {
        this.seeMoreButton = true;
      }
    });

  }

  showProductInfo(id: number) {
    this.router.navigateByUrl(`/infoproducts/${id}`);
  }

  showSecondImage() {
    this.secoundImg = true;
  }

  showFirstImage() {
    this.secoundImg = false;
  }

  addShoppingCart(id : number){

    if (!this.servProd.shoppingCart.includes(id)) {
      this.servProd.shoppingCart.push(id);
    }
  }

}
