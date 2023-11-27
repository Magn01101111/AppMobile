import {Component, inject, Input} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {ExploreContainerComponent} from '../explore-container/explore-container.component';
import {IUser} from "../models/IUser";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilsService} from "../services/utils.service";
import {FirebaseService} from "../services/firebase.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent],
})
export class Tab1Page {
  data?: IUser
  firebaseSvc= inject(FirebaseService)
  utilsSvc= inject(UtilsService)

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private utilService: UtilsService
  ) {
    this.activeRoute.queryParams.subscribe(async params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        console.log('entró getCurrentNavigation()?.extras.state')
        this.data = this.router.getCurrentNavigation()?.extras.state?.['user'];
        console.log('this.data ', this.data)
      } else {
        console.log('entró else ')
        let user: any = (await this.utilService.getFromLocalStorage('user'))
        this.data = JSON.parse(user)
        //let user = JSON.parse(preferences)
        console.log('this.data ', this.data)
      }
    });
  }

  async logOut() {
    await this.firebaseSvc.logOut()
  }


}
