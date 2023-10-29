import {Component, inject, Input} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {IUser} from "../models/IUser";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NavigationExtras, Router} from "@angular/router";
import {FirebaseService} from "../services/firebase.service";
import {UtilsService} from "../services/utils.service";

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ExploreContainerComponent {
  firebaseService = inject(FirebaseService)
  utilService = inject(UtilsService)
  router = inject(Router)

  @Input() name?: string;
  @Input() user?: IUser | undefined;


  async crearViaje() {
    const userInfoSend: NavigationExtras = {
      state: {user: this.user}
    }
    let sendInfo = (await this.router.navigate(['/tabs/tab1/crear-viaje'], userInfoSend));
    console.log('sendInfo ', sendInfo)

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
      next: (res: any) =>{
        console.log(res)
        sub.unsubscribe()

      }
    })

    /*const userInfoSend: NavigationExtras = {
      state: {user: this.user}
    }
    let sendInfo = (await this.router.navigate(['/tabs/tab1/ver-vehiculos'], userInfoSend));
    console.log('sendInfo ', sendInfo)*/
  }
}
