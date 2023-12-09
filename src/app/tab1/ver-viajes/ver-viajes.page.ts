import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {UtilsService} from "../../services/utils.service";
import {FirebaseService} from "../../services/firebase.service";
import {IUser} from "../../models/IUser";
import {IViaje} from "../../models/ViajeModel/IViaje";

@Component({
  selector: 'app-ver-viajes',
  templateUrl: './ver-viajes.page.html',
  styleUrls: ['./ver-viajes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class VerViajesPage implements OnInit {
  activeRoute = inject(ActivatedRoute)
  router = inject(Router)
  utilService = inject(UtilsService)
  firebaseService = inject(FirebaseService)
  viajes?: IViaje[]
  user?: IUser


  constructor() {
    this.activeRoute.queryParams.subscribe(params => {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.viajes = this.router.getCurrentNavigation()?.extras.state?.['viajes'];
      console.log('this.viajes ', this.viajes)
    }
  });
  }

  async ngOnInit() {
    /*await this.dibujarMap()*/
    let preferences: any = await (this.utilService.getFromLocalStorage('user'))
    this.user = JSON.parse(preferences)
  }

   /*dibujarMap(){
    const map: HTMLElement = document.getElementById('map')!;
    console.log(map)
    this.mapa = new google.maps.Map(map, {
      center: this.ubicacionTest,
      zoom: 18
    });

    this.marker = new google.maps.Marker({
      position: this.ubicacionTest,
      map: this.mapa
    })
  }*/

  async informacionViaje(viaje: IViaje) {
    console.log('viaje ',viaje)
    const userInfoSend: NavigationExtras = {
      state: {viaje: viaje}
    }
    let sendInfo = (await this.router.navigate(['/tabs/tab1/informacion-viaje'], userInfoSend));
    console.log('sendInfo ', sendInfo)
  }
}
