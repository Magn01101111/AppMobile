import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule, ModalController} from '@ionic/angular';
import {UserModel} from '../models/UserModel';
import {IUserLogin} from "../models/IUserLogin";
import {NavigationExtras, Router} from "@angular/router";
import {RecuperarPasswordComponent} from "./recuperar-password/recuperar-password.component";
import {FirebaseService} from "../services/firebase.service";
import {UtilsService} from "../services/utils.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  resUser: any
  firebaseService = inject(FirebaseService)
  utilService = inject(UtilsService)
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
  //paises = Paises

  loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(
    private route: Router,
    private modal: ModalController,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    console.log('listUser ', this.listUser)
    this.userLoginModalRestart();
  }

  // EN DESUSO //
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

  //CON FIREBASE
  async login() {
    if (this.loginForm.valid) {
      const loading = await this.utilService.loading();
      await loading.present();

      this.firebaseService.signIn(this.loginForm.value as IUserLogin).then(async res => {

        /*let preferences: any = await (this.utilService.getFromLocalStorage('user'))
        let user = JSON.parse(preferences)*/

        await this.getUserInfo(res.user.uid).then(async() =>{
        })


      }).catch(error => {
        this.utilService.presentToast({
          message: error.message,
          duration: 2000,
          animated: true,
          color: "primary",
          position: "middle",
          icon: 'alert-circle-outline'
        })
        console.log(error)

      }).finally(() => {
        loading.dismiss();
      })
    }
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
        users: this.listUser
      }
    }).then((modalres => {
      modalres.present();
      modalres.onDidDismiss().then(res => {
        if (res.data != null) {
          console.log('res.data ', res.data)
        }
      })
    }))
  }

  async registro() {
    await this.route.navigate(['/register']);
  }

  async getUserInfo(uid: string) {
    const loading = await this.utilService.loading();
    await loading.present();
    let path = `users/${uid}`
    this.firebaseService.getDocument(path).then(async(res: any) => {
      console.log('res', res)
      await this.utilService.saveLocalStorage('user', res)
      await this.utilService.presentToast({
        message: `Bienvenido ${res.name}`,
        duration: 2000,
        animated: true,
        color: "primary",
        position: "middle",
        icon: 'person-circle-outline'
      })
      await this.entrar(res)
      //let preferences: any = await (this.utilService.getFromLocalStorage('user'))
      //let user = JSON.parse(preferences)

    }).catch(error => {
      this.utilService.presentToast({
        message: error.message,
        duration: 2000,
        animated: true,
        color: "primary",
        position: "middle",
        icon: 'alert-circle-outline'
      })
      console.log(error)

    }).finally(() => {
      loading.dismiss();
    })

  }

  async entrar(res: any) {
    /*let preferences: any = await (this.utilService.getFromLocalStorage('user'))
    let user = JSON.parse(preferences)
    console.log(user)*/
    const userInfoSend: NavigationExtras = {
      state: {user: res}
    }
    if (res.user_type == 'User'){
      let sendInfo = (await this.route.navigate(['/tabs/tab1'], userInfoSend));
      console.log('sendInfo ', sendInfo)
      console.log('res', res)
    }else{
      let sendInfo = (await this.route.navigate(['/tabs/tab2'], userInfoSend));
      console.log('sendInfo ', sendInfo)
      console.log('res', res)
    }
  }
}
