import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideFirebaseApp} from "@angular/fire/app";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({})),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(firebaseConfig))
    ),
    provideRouter(routes),
    provideAnimations()
],
});

const firebaseConfig = {
  apiKey: "AIzaSyCfunfsZZWAiUV91Ctcu1AhhRVR2Qa_NSc",
  authDomain: "appmobile-e76af.firebaseapp.com",
  databaseURL: "https://appmobile-e76af-default-rtdb.firebaseio.com",
  projectId: "appmobile-e76af",
  storageBucket: "appmobile-e76af.appspot.com",
  messagingSenderId: "330596197212",
  appId: "1:330596197212:web:ab8722b7f9d4dc22209799",
  measurementId: "G-D6RCY0ECPR"
};
