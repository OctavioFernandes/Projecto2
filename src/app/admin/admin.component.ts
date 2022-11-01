import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginserviceService } from '../header/loginservice.service';
import { Product } from '../shared/product';
import { ProductsserviceService } from '../shared/productsservice.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  productForm!: FormGroup;
  productTypes: string[] = [];

  filterProducts: Product[] = [];
  recPage: number = 10;

  usersList: User[] = [];

  validateDeletePopUp: boolean = false;

  constructor(private servProd: ProductsserviceService, private servLoged: LoginserviceService) { }

  ngOnInit(): void {

    this.productForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      marca: new FormControl('', [Validators.required]),
      tipo_de_produto: new FormControl('', [Validators.required]),
      cor: new FormControl('', [Validators.required]),
      preco: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      foto_principal: new FormControl(' ', { initialValueIsDefault : true, validators:[Validators.required]}),
      foto_secundaria: new FormControl(' ', { initialValueIsDefault : true, validators: [Validators.required]}),
      destaque: new FormControl(false, { initialValueIsDefault : true, validators: [Validators.required]})

      // marca : new FormControl('', { initialValueIsDefault : true, validators: [Validators.required,Validators.pattern('[A-Za-z ]{3,20}')]}),

    });

    this.loadTipes();
    this.getProducts("");
    this.getUsers()
  }

  loadTipes() {
    this.servProd.getProducts().subscribe(response => {

      for (let index = 0; index < response.length; index++) {
        if (!this.productTypes.includes(response[index].tipo_de_produto)) {
          this.productTypes.push(response[index].tipo_de_produto);
        }
      }

    });
  }

  insertProduct() {
    
    if (this.productForm.valid) {

      this.servProd.insertProduct(this.productForm.value).subscribe(response => {

      });
      this.productForm.reset();
    }
  }

  getProducts(searchedContent: string) {

    let filter = `&nome_like=${searchedContent.trim()}`;

    this.servProd.filterProducts(filter, this.recPage).subscribe(response => {
      this.filterProducts = response;
    });
  }


  deleteProduct(id: number, searchedContent: string) {
    this.servProd.deleteProduct(id).subscribe(response => {
      this.getProducts(searchedContent);
      this.validateDeletePopUp = false;
    });
  }

  showDeletePopup() {
    this.validateDeletePopUp = true;
  }

  hideDeletePopup() {
    this.validateDeletePopUp = false;
  }

  getUsers() {

    this.servLoged.getAllUsers().subscribe(response => {
      this.usersList = response;
    });
  }

  validateUser(user: User) {

    let userValid= {
        nome: user.nome,
        email: user.email,
        password: user.password,
        morada: user.morada,
        codigoPostal: user.codigoPostal,
        pais: user.pais,
        wishlist: user.wishlist,
        active: true,
        id: 2,
        admin: user.admin
      }

    this.servLoged.activateUser(userValid, user.id!).subscribe(response=>{
      this.getUsers();
    })
  }

}