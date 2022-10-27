import { Component, OnInit } from '@angular/core';
import { ProductsserviceService } from '../shared/productsservice.service';

@Component({
  selector: 'app-produts',
  templateUrl: './produts.component.html',
  styleUrls: ['./produts.component.css']
})
export class ProdutsComponent implements OnInit {

  colorsList : string[] = [];  
  typesList : string[] = [];
  totalProducts! : number;

  constructor(private servProd:ProductsserviceService) { }

  ngOnInit(): void {
    this.loadColorsAndTipes()

  }

  loadColorsAndTipes(){
    this.servProd.getProducts().subscribe(response=>{
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

  filter(key:string, value:string){
    console.log(key+' '+value);

  }

}
