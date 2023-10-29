import {inject, Injectable} from '@angular/core';
import {LoadingController, ToastController, ToastOptions} from "@ionic/angular";
import {Router} from "@angular/router";
import {Preferences} from '@capacitor/preferences';
import {IUser} from "../models/IUser";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingController = inject(LoadingController)
  toastController = inject(ToastController)
  router = inject(Router)

  //constructor() { }

  loading() {
    return this.loadingController.create({
      spinner: "crescent"
      /*duration: time*/
    })
  }

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastController.create(opts);
    await toast.present();
  }

  async saveLocalStorage(key: string, value: any) {
    //return await Preferences.set({key: key, value: value})
    //return localStorage.setItem(key, JSON.stringify(value))
    return await Preferences.set({key: key, value: JSON.stringify(value)})

  }

  async getFromLocalStorage(value: string) {
    return (await Preferences.get({key: value})).value;
    //return JSON.parse(localStorage.getItem(value))
  }

}
