import {Component, Input} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {ExploreContainerComponent} from '../explore-container/explore-container.component';
import {IUser} from "../models/IUser";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent],
})
export class Tab1Page {
  data?: IUser;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    ////TEST////
    const userType = this.activeRoute.snapshot.queryParamMap.get('user_type')
    this.activeRoute.paramMap.subscribe(res => {
    });
    console.log('asd ', userType)
    ////TEST////

    this.activeRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.data = this.router.getCurrentNavigation()?.extras.state?.['user'];
        console.log('this.data ',this.data)
      }
    });
  }


  consolear() {
  }
}
