import {Component, inject, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {IUser} from "../../models/IUser";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.component.html',
  styleUrls: ['./crear-viaje.component.scss'],
  standalone: true,
  imports: [IonicModule, CrearViajeComponent],
})
export class CrearViajeComponent  implements OnInit {
  activeRoute = inject(ActivatedRoute)
  router= inject(Router)

  conductor?: IUser

  constructor() {
    this.activeRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.conductor = this.router.getCurrentNavigation()?.extras.state?.['user'];
        console.log('this.conductor ',this.conductor)
      }
    });
  }
  ngOnInit() {}

}
