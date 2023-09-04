import { Component, Input } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {IUser} from "../models/IUser";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ExploreContainerComponent {
  @Input() name?: string;
  @Input() user?: IUser | undefined;
}
