import {inject, Injectable} from '@angular/core';
import {LoadingController, ModalController, ModalOptions, ToastController, ToastOptions} from "@ionic/angular";
import {Router} from "@angular/router";
import {Preferences} from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  modal = inject(ModalController)
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
    return await Preferences.set({key: key, value: JSON.stringify(value)})
  }

  async getFromLocalStorage(value: string) {
    return (await Preferences.get({key: value})).value;
  }

  async removeKey(key: any) {
    console.log(key)
    return (await Preferences.remove({key}))
  }

  async presentModal(opts: ModalOptions){
    const modal = await this.modal.create(opts)
    await modal.present();

    const {data} = await modal.onWillDismiss();
    if (data) return data;
  }

  dismissModal(data?: any){
    return this.modal.dismiss(data);
  }


}
