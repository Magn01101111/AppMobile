import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import {environment} from './environments/environment.prod';
import { provideAnimations } from '@angular/platform-browser/animations';
import {provideFirebaseApp} from "@angular/fire/app";
import { AngularFireModule} from "@angular/fire/compat";
import {getAuth, provideAuth} from "@angular/fire/auth";

bootstrapApplication(AppComponent, {
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({})),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    ),
    importProvidersFrom(
      provideAuth(() => getAuth()),
    ),
    provideRouter(routes),
    provideAnimations()
],
});
//const analytics = getAnalytics(initializeApp(environment.firebaseConfig))
/*provideAuth(() => getAuth())*/

/*const firebaseConfig = {
  apiKey: "AIzaSyCfunfsZZWAiUV91Ctcu1AhhRVR2Qa_NSc",
  authDomain: "appmobile-e76af.firebaseapp.com",
  databaseURL: "https://appmobile-e76af-default-rtdb.firebaseio.com",
  projectId: "appmobile-e76af",
  storageBucket: "appmobile-e76af.appspot.com",
  messagingSenderId: "330596197212",
  appId: "1:330596197212:web:ab8722b7f9d4dc22209799",
  measurementId: "G-D6RCY0ECPR"
};*/
