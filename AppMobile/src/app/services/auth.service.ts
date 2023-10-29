import {Injectable} from '@angular/core';
import {Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "@angular/fire/auth";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: Auth
  ) {
  }

  async register(email: string, password: string) {
    const user = await createUserWithEmailAndPassword(this.afAuth, email, password);
    return await signInWithEmailAndPassword(this.afAuth, email, password);
  }

  login(email: string, password: string){
    return signInWithEmailAndPassword(this.afAuth, email, password)
  }

  logout(){
    return signOut(this.afAuth)
  }

  asd(): Observable<boolean> {

    return of(true) //te deja entrar a la ruta dependiendo si es true o false, acá va la lógica
  }
}
