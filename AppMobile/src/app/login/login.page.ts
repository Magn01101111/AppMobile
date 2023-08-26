import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserModel } from '../models/UserModel';
import { Paises } from "../constants/constants";
import {IUserLogin} from "../models/IUserLogin";
import {NavigationExtras, Router} from "@angular/router";
import { ProductModel } from '../models/IProductModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  listUser: UserModel[] = [
    new UserModel(1,'19015515','jgomez@gmail.com','Jorge','Escobar','ADMIN',true,'99551122','La Locura Street','123'),
    new UserModel(2,'18015515','jperez@gmail.com','Juan','Perez','USUARIO',true,'99551122','LaLocura Street','123'),
    new UserModel(3,'17015515','cgomez@gmail.com','Carlos','Rubio','USUARIO',true,'99551122','La Locura Street','123'),
    new UserModel(4,'16015515','vgomez@gmail.com','Valentina','Caviedes','ADMIN', true,'99551122','La Locura Street','123')
  ];
  listProduct: ProductModel[] =[
    new ProductModel(1, 11, 'Pan', 'Bimbo', true),
    new ProductModel(2, 12, 'Aceite', 'Bimbo', true),
    new ProductModel(3, 13, 'Queso', 'Bimbo', true),
    new ProductModel(4, 14, 'Fiambre', 'Bimbo', true),
    new ProductModel(5, 15, 'Agua', 'Bimbo', true),
    new ProductModel(6, 16, 'Bebida', 'Bimbo', true),
    new ProductModel(7, 17, 'Jugo', 'Bimbo', true),
    new ProductModel(8, 18, 'Gato', 'Bimbo', true),
    new ProductModel(9, 19, 'Perro', 'Bimbo', true)

  ]
  userLoginModal: IUserLogin = {
    email: '',
    password: ''
  };
  paises = Paises



  constructor(private route: Router) { }

  ngOnInit() {
    this.userLoginModalRestart();
  }

  userLogin(userLoginInfo: IUserLogin): boolean{
    for(let i = 0; i < this.listUser.length; i++){
      if((this.listUser[i].email == userLoginInfo.email) && (this.listUser[i].password == userLoginInfo.password)){
        console.log('User Loged...', this.userLoginModal.email, this.userLoginModal.password);
        let userInfoSend: NavigationExtras = {
          state: {
            user: this.listUser[i]
          }
        }
        if(this.listUser[i].user_type == 'USUARIO'){
          let sendInfo = this.route.navigate(['/tabs/tab1'], userInfoSend);
          console.log(sendInfo)
          return true;
        }else{
          let sendInfo = this.route.navigate(['/tabs/tab1'], userInfoSend);
          console.log(sendInfo)
          return true;
        }
      }
    }
    this.userLoginModalRestart();
    return false;

  }

  userLoginModalRestart(): void{
    this.userLoginModal.email = '';
    this.userLoginModal.password = '';
  }

}
