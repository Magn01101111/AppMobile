import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule, ModalController} from '@ionic/angular';
import {UserModel} from '../models/UserModel';
import {Paises} from "../constants/constants";
import {IUserLogin} from "../models/IUserLogin";
import {NavigationExtras, Router} from "@angular/router";
import {IUser} from "../models/IUser";
import {RecuperarPasswordComponent} from "./recuperar-password/recuperar-password.component";
import {ViajeModel} from "../models/ViajeModel/ViajeModel";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  /*viajes: ViajeModel[] = [
    new ViajeModel('19015510', '1', 'Jorge', 'Escobar', 'Plaza'),
    new ViajeModel('19015510', '1', 'Jorge', 'Escobar', 'Plaza'),
    new ViajeModel('19015510', '1', 'Jorge', 'Escobar', 'Plaza'),
    new ViajeModel('19015510', '1', 'Jorge', 'Escobar', 'Plaza'),
  ];*/
  listUser: UserModel[] = [
    new UserModel('19015510', '1', 'Jorge', 'Escobar', 'User', true, '995755731', 'La Locura Street', '123', true),
    new UserModel('18783391', 'spla@gmail.com', 'Sergio', 'Plaza', 'Admin', true, '995755721', 'La Demencia Street', '123', true),
    new UserModel('11111111', 'drub@gmail.com', 'David', 'Rubio', 'User', true, '995755711', 'La Joker Street', '123', false),
    new UserModel('22222222', 'ncav@gmail.com', 'Nicolas', 'Caviedes', 'User', true, '995755701', 'La Pizza Street', '123', false)
  ];
  userLoginModal: IUserLogin = {
    email: '',
    password: ''
  };
  paises = Paises

  constructor(
    private route: Router,
    private modal: ModalController
  ) {
  }

  ngOnInit() {
    console.log('listUser ', this.listUser)
    this.userLoginModalRestart();
  }

  userLogin(userLoginInfo: IUserLogin): boolean {
    for (let i = 0; i < this.listUser.length; i++) {
      if ((this.listUser[i].email == userLoginInfo.email) && (this.listUser[i].password == userLoginInfo.password)) {
        console.log('User Loged...', this.userLoginModal.email, this.userLoginModal.password);

        ////TEST////
        const params: NavigationExtras = {
          queryParams: {userid: this.listUser[i]}
        }
        ////TEST////

        const userInfoSend: NavigationExtras = {
          state: {user: this.listUser[i]}
        }
        console.log('userInfoSend ', userInfoSend)
        if (this.listUser[i].user_type == 'User') {
          let sendInfo = this.route.navigate(['/tabs/tab1'], userInfoSend);
          console.log('sendInfo ', sendInfo)
          return true;
        } else {
          let sendInfo = this.route.navigate(['/tabs/tab2'], userInfoSend);
          console.log('sendInfo ', sendInfo)
          return true;
        }
      }
    }
    this.userLoginModalRestart();
    return false;
  }

  userLoginModalRestart(): void {
    this.userLoginModal.email = '';
    this.userLoginModal.password = '';
  }

  async recoverPassword() {
    /*let modal = await this.modal.create({
      component: RecuperarPasswordComponent,
      componentProps: {
        users: this.listUser
      }
    });
    return modal.present();*/
    this.modal.create({
      component: RecuperarPasswordComponent,
      componentProps: {
        users: this.listUser}
    }).then((modalres => {
      modalres.present();
      modalres.onDidDismiss().then(res => {
        if (res.data != null){
          console.log('res.data ',res.data)
        }
      })
    }))
  }
}
