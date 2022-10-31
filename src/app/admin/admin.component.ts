import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsserviceService } from '../shared/productsservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  productForm!: FormGroup;

  productTypes: string[] = [];

  constructor(private servProd: ProductsserviceService) { }

  ngOnInit(): void {

    this.productForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      marca: new FormControl('', [Validators.required]),
      tipo_de_produto: new FormControl('', [Validators.required]),
      cor: new FormControl('', [Validators.required]),
      preco: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      foto_principal: new FormControl(' ', [Validators.required]),
      foto_secundaria: new FormControl(' ', [Validators.required]),
      destaque: new FormControl(false, [Validators.required])

    });

    this.loadTipes();
  }

  loadTipes() {
    this.servProd.getProducts().subscribe(response => {

      for (let index = 0; index < response.length; index++) {
        if (!this.productTypes.includes(response[index].tipo_de_produto)) {
          this.productTypes.push(response[index].tipo_de_produto);
        }}

        console.log(this.productTypes)
    });
  }

  insertProduct(){

  }


}

// this.formProfile = new FormGroup({
//   nome: new FormControl('', [Validators.required]),

//   email: new FormControl('', [Validators.required, Validators.email]),

//   password: new FormControl('', [Validators.required, Validators.pattern('(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$')]),

//   morada: new FormControl('', [Validators.required]),

//   codigoPostal: new FormControl('', [Validators.required, Validators.minLength(8)]),

//   pais: new FormControl('', [Validators.required]),

//   wishlist: new FormControl([]),

//   active: new FormControl(false),

//   admin: new FormControl(false)

// });
