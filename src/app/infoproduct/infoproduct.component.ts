import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../shared/product';
import { ProductsserviceService } from '../shared/productsservice.service';

@Component({
  selector: 'app-infoproduct',
  templateUrl: './infoproduct.component.html',
  styleUrls: ['./infoproduct.component.css']
})
export class InfoproductComponent implements OnInit {
  id!:number;
  product!: Product;

  constructor(private rotaactiva: ActivatedRoute, private servprod : ProductsserviceService) { }

  ngOnInit(): void {
    this.id=Number(this.rotaactiva.snapshot.paramMap.get("id"));
    
    if (this.id !== 0) {
      this.servprod.getProduct(this.id)
    .subscribe(reposta=>{
      this.product=reposta;
    });      
    }
    
  }

}
