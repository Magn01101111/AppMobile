import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {ActivatedRoute, Router} from "@angular/router";
import {UtilsService} from "../../services/utils.service";
import {FirebaseService} from "../../services/firebase.service";
import {IUser} from "../../models/IUser";
import {ICar} from "../../models/CarModel/ICar";

@Component({
  selector: 'app-ver-vehiculos',
  templateUrl: './ver-vehiculos.page.html',
  styleUrls: ['./ver-vehiculos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class VerVehiculosPage implements OnInit {
  activeRoute = inject(ActivatedRoute)
  router = inject(Router)
  utilService = inject(UtilsService)
  firebaseService = inject(FirebaseService)
  vehiculo?: ICar[]
  user?: IUser

  constructor() {
    this.activeRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.vehiculo = this.router.getCurrentNavigation()?.extras.state?.['user'];
        console.log('this.vehiculos ', this.vehiculo)
      }
    });
  }

  async ngOnInit() {
    let preferences: any = await (this.utilService.getFromLocalStorage('user'))
    this.user = JSON.parse(preferences)

  }
}
