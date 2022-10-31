import { Component, OnInit } from '@angular/core';
import { ProductsserviceService } from '../shared/productsservice.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  constructor(protected servProd : ProductsserviceService) { }

  ngOnInit(): void {
  }

}
