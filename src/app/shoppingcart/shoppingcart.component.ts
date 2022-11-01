import { Component, OnInit } from '@angular/core';
import { Cart } from '../shared/cart';
import { Product } from '../shared/product';
import { ProductsserviceService } from '../shared/productsservice.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  cartList: Product[] = [];
  cart: Cart[] = [];

  produtsQtd!: number;
  totalBill!: number;



  constructor(protected servProd: ProductsserviceService) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {

    if (this.servProd.shoppingCart.length !== 0) {

      let addUrl = "";

      for (let i = 0; i < this.servProd.shoppingCart.length; i++) {
        addUrl += "&id=" + this.servProd.shoppingCart[i];
      };

      this.servProd.getShoppingCart(addUrl).subscribe(response => {

        this.cartList = response;

        for (let i = 0; i < this.cartList.length; i++) {
          let cartPos = {
            id: this.cartList[i].id,
            qtd: 1,
            foto_principal: this.cartList[i].foto_principal,
            nome: this.cartList[i].nome,
            preco: this.cartList[i].preco
          }
          this.cart.push(cartPos);
        }
        this.cart.sort((a, b) => a.id! - b.id!);
        console.log(this.cart);
      })
    }
    this.cartList = [];
    this.cart = [];
  }

  removeFromCart(id: number) {

    this.servProd.shoppingCart.splice(this.servProd.shoppingCart.indexOf(id), 1)
    this.getCart();
  }

  qtdUp(id: number) {

    let cartRemoved = this.cart.splice(this.cart.indexOf(this.cart.find(x => x.id === id)!), 1);


    let newCart = {
      id: cartRemoved[0].id,
      qtd: cartRemoved[0].qtd + 1,
      foto_principal: cartRemoved[0].foto_principal,
      nome: cartRemoved[0].nome,
      preco: cartRemoved[0].preco
    }

    this.cart.push(newCart);
    this.cart.sort((a, b) => a.id! - b.id!);
    // console.log("newCart")
    // console.log(newCart)

  }

  qtdDown(id: number) {

    let cartRemoved = this.cart.splice(this.cart.indexOf(this.cart.find(x => x.id === id)!), 1);


    let newCart = {
      id: cartRemoved[0].id,
      qtd: cartRemoved[0].qtd - 1,
      foto_principal: cartRemoved[0].foto_principal,
      nome: cartRemoved[0].nome,
      preco: cartRemoved[0].preco
    }

    if ((cartRemoved[0].qtd - 1) === 0) {
      this.removeFromCart(id);
    } else {
      this.cart.push(newCart);
      this.cart.sort((a, b) => a.id! - b.id!);
    }
  }

  getTotals(){
    
  }

}

