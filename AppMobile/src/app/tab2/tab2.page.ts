import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IUser } from '../models/IUser';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent]
})
export class Tab2Page {

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

}
