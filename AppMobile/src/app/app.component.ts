import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { initializeApp } from "firebase/app";
import {getFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule,
    CommonModule,
  ],
})
export class AppComponent {
  public environmentInjector = inject(EnvironmentInjector);
  constructor() {}
}

// Initialize Firebase

