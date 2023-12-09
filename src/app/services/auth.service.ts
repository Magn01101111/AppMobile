import {inject, Injectable} from '@angular/core';
import {Auth, signInWithEmailAndPassword, signOut} from "@angular/fire/auth";
import {FirebaseService} from "./firebase.service";
import {UtilsService} from "./utils.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firebaseService = inject(FirebaseService)
  utilService = inject(UtilsService)
  constructor(
    private afAuth: Auth
  ) {
  }

  async register(email: string, password: string) {
    return await signInWithEmailAndPassword(this.afAuth, email, password);
  }

  login(email: string, password: string){
    return signInWithEmailAndPassword(this.afAuth, email, password)
  }

  logout(){
    return signOut(this.afAuth)
  }

  async asd(): Promise<any> {
    console.log('entró asd')

    let user = (await this.utilService.getFromLocalStorage('user'));
    return new Promise((resolve) => {
      console.log('entró resolve')
      this.firebaseService.getAuth().onAuthStateChanged((auth) => {
        console.log('getAuth().onAuthStateChanged')
        if (auth) {
          console.log('if auth')
          if (user){
            console.log('resolve true')
            resolve(true);
          }else {
            console.log('resolve false')
            this.utilService.router.navigate(['/login'])
            resolve(false);
          }
        }else {
          console.log('resolve false')
          this.utilService.router.navigate(['/login'])
          resolve(false);
        }
      })
    })

    //return of(true) //te deja entrar a la ruta dependiendo si es true o false, acá va la lógica
  }
}
