import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../shared/product';
import { ProductsserviceService } from '../shared/productsservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nr:number=1;
  sliderImg  = `/assets/Imagens/slider${this.nr}.jpg`;

  productsList : Product[] = [];

  constructor(private servProducts : ProductsserviceService, private router:Router) { }

  ngOnInit(): void {

    setInterval(()=>{
      if (this.nr===3) {
        this.nr=0
      }
    this.nr++
    this.sliderImg  = `/assets/Imagens/slider${this.nr}.jpg`;
  },3000);
  
  this.loadProducts();

  }

  loadProducts(){
    this.servProducts.getProducts()
    .subscribe(response=>{
      this.productsList = response;
      // console.log(this.productsList)
    })
  }

  showProductInfo(id: number){
    this.router.navigateByUrl(`/infoproducts/${id}`)
  }





}
