import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserModel } from '../models/UserModel';
import { Paises } from "../constants/constants";
import {IUserLogin} from "../models/IUserLogin";
import {NavigationExtras, Router} from "@angular/router";
import { ProductModel } from '../models/IProductModel';
import {IUser} from "../models/IUser";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  @Output () valueResponse: IUser | undefined
  listUser: UserModel[]  = [
    new UserModel('19015510','1','Jorge','Escobar','User',true,'995755731','La Locura Street','123',true),
    new UserModel('18783391','spla@gmail.com','Sergio','Plaza','User',true,'995755721','La Demencia Street','123',true),
    new UserModel('11111111','drub@gmail.com','David','Rubio','User',true,'995755711','La Joker Street','123',false),
    new UserModel('22222222','ncav@gmail.com','Nicolas','Caviedes','User',true,'995755701','La Pizza Street','123',false)
  ];
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
        this.valueResponse = this.listUser[i]
        let userInfoSend: NavigationExtras = {
          state: {
            user: this.listUser[i]
          }
        }
        console.log('userInfoSend ',userInfoSend)
        if(this.listUser[i].user_type == 'User'){
          let sendInfo = this.route.navigate(['/tabs/tab1'], userInfoSend);
          console.log('sendInfo ',sendInfo)
          return true;
        }else{
          let sendInfo = this.route.navigate(['/tabs/tab1'], userInfoSend);
          console.log('sendInfo ',sendInfo)
          return true;
        }
      }
      console.log()
    }
    this.userLoginModalRestart();
    return false;
  }

  userLoginModalRestart(): void{
    this.userLoginModal.email = '';
    this.userLoginModal.password = '';
  }

}
