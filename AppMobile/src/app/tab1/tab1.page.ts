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
  @Input() sendInfo?: any;
  data?: IUser;

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router
  ) {
    /*this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state['user'];
        console.log(this.data)
      }
    });*/
  }


  consolear() {
    console.log('asd ', this.sendInfo)
  }
}
