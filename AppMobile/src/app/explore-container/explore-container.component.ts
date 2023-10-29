import {Component, inject, Input, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {IUser} from "../models/IUser";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NavigationExtras, Router} from "@angular/router";
import {FirebaseService} from "../services/firebase.service";
import {UtilsService} from "../services/utils.service";
import {CrearViajeComponent} from "../tab1/crear-viaje/crear-viaje.component";
import {ICar} from "../models/CarModel/ICar";

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ExploreContainerComponent implements OnInit{
  firebaseService = inject(FirebaseService)
  utilService = inject(UtilsService)
  router = inject(Router)

  vehiculos!: ICar[];


  @Input() name?: string;
  @Input() user?: IUser | undefined;

  ngOnInit(){
    if (this.user?.tiene_auto === true){
      let path = `users/${this.user?.uid}/vehiculo`
      let sub = this.firebaseService.getCollectionData(path, '').subscribe({
        next: async (res: any) => {
          this.vehiculos = res
          console.log(res)
          console.log('this.vehiculos ',this.vehiculos)
          sub.unsubscribe()
        }
      })
    }
  }

  ionViewWillEnter(){

  }

  async crearViaje() {

    await this.utilService.presentModal({
      component: CrearViajeComponent,
      componentProps: {user: this.user, vehiculos: this.vehiculos}
    })

    /*const userInfoSend: NavigationExtras = {
      state: {user: this.user}
    }
    let sendInfo = (await this.router.navigate(['/tabs/tab1/crear-viaje'], userInfoSend));
    console.log('sendInfo ', sendInfo)*/

  }

  async crearVehiculo() {
    const userInfoSend: NavigationExtras = {
      state: {user: this.user}
    }
    let sendInfo = (await this.router.navigate(['/tabs/tab1/crear-vehiculo'], userInfoSend));
    console.log('sendInfo ', sendInfo)

  }

  async verVehiculos() {

    let path = `users/${this.user?.uid}/vehiculo`
    let sub = this.firebaseService.getCollectionData(path, '').subscribe({
      next: async (res: any) => {
        console.log(res)
        const userInfoSend: NavigationExtras = {
          state: {user: res}
        }
        let sendInfo = (await this.router.navigate(['/tabs/tab1/ver-vehiculos'], userInfoSend));
        console.log('sendInfo ', sendInfo)
        sub.unsubscribe()
      }
    })

  }


}
