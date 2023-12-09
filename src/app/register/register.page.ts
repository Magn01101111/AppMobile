import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule, IonInput, ModalController} from '@ionic/angular';
import {NavigationExtras, Router} from "@angular/router";
import {FirebaseService} from "../services/firebase.service";
import {UtilsService} from "../services/utils.service";
import {IUserRegister} from "../models/IUserRegister";
import {CarModel} from "../models/CarModel/CarModel";
import {ViajeModel} from "../models/ViajeModel/ViajeModel";
import {IUserLogin} from "../models/IUserLogin";
import {Preferences} from "@capacitor/preferences";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {
  @ViewChild('rut') rut: IonInput | undefined | null;
  firebaseService = inject(FirebaseService)
  utilService = inject(UtilsService)

  /*export interface IUser {
  rut?: string,
  email?: string,
  name?: string,
  last_name?: string,
  user_type?: string,
  user_enabled?: boolean,
  phone?: string,
  address?: string,
  password?: string,
  tiene_auto?: boolean,
  vehiculo?: CarModel,
  viajes? : ViajeModel[]
}*/

  registro = this.formBuilder.group({
    uid: [''],
    user_type: ['User'],
    user_enabled: [true],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    rut: ['', Validators.compose([
      Validators.required,
    ])],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    name: ['', [Validators.required]],
    tiene_auto: [true, [Validators.required]],
    last_name: ['', [Validators.required]]

  })

  constructor(
    private route: Router,
    private modal: ModalController,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {


  }

  async registrarse() {
    if (this.registro.valid) {
      const loading = await this.utilService.loading();
      await loading.present();
      //const {email, password, name} = this.registro.getRawValue();


      this.firebaseService.signUp(this.registro.value as IUserLogin).then(async res => {

        await this.firebaseService.updateUser(this.registro.value.name as string)

        let userId = res.user.uid;
        this.registro.controls.uid.setValue(userId)

        await this.setUserInfo(userId)

        const userInfoSend: NavigationExtras = {
          state: {user: this.registro.value}
        }
        let sendInfo = this.route.navigate(['/login'], userInfoSend);
        console.log('sendInfo ', sendInfo)
        console.log('res', res)

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
    } else {
      this.registro.markAllAsTouched();
    }
  }

  async setUserInfo(uid: string) {
    if (this.registro.valid) {
      const loading = await this.utilService.loading();
      await loading.present();

      let path = `users/${uid}`
      //delete this.registro.value.password
      console.log(path)


      this.firebaseService.setDocument(path, this.registro.value).then(async res => {
        console.log('res', res)
        await this.utilService.saveLocalStorage('user', this.registro.value)
        let preferences: any = await (this.utilService.getFromLocalStorage('user'))
        let user = JSON.parse(preferences)
        console.log('user ',user)
        this.registro.reset();
        await this.route.navigate(['/login']);

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
    } else {
      this.registro.markAllAsTouched();
    }
  }

  rutChange() {
    if (this.rut?.value !== undefined && this.rut.value !== null) {
      let aux: string = this.rut.value.toString();
      aux = aux.replace('-', '');
      if (aux.length >= 1) {
        let aux2 = aux.match(/([k0-9])/gi);
        if (aux2 !== null) {
          let aux3 = aux2.join('');
          aux = aux3;
        }
      }
      if (aux.length >= 2) {
        let cuerpoRut: any;
        let dv: any;
        cuerpoRut = aux.slice(0, aux.length - 1);
        dv = aux.slice(aux.length - 1, aux.length);
        aux = cuerpoRut + '-' + dv;
      }
      this.rut.value = aux;
    }
  }
  async volverLogin(){
    await this.route.navigate(['/login']);
  }
}
