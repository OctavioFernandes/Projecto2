import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from '../header/loginservice.service';
import { Product } from '../shared/product';
import { ProductsserviceService } from '../shared/productsservice.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlist!: Product[];
  wishlistShow: boolean = false;

  constructor(private servProd: ProductsserviceService, protected servLogin: LoginserviceService) { }

  ngOnInit(): void {
    this.getWishlist();
  }

  getWishlist() {
    if (this.servLogin.user.wishlist?.length !== 0) {
      this.servProd.filterWishlist().subscribe(response => {

        this.wishlist = response;
        this.wishlistShow = true;
      });
    } else {
      this.wishlistShow = false;
    }
  }

  removeFromWishlist(id:number){
    this.servLogin.user.wishlist?.splice(this.servLogin.user.wishlist?.indexOf(id),1)
    this.getWishlist();
  }

}
