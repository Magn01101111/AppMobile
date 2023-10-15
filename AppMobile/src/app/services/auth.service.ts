import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  asd(): Observable<boolean>{
    return of(true) //te deja entrar a la ruta dependiendo si es true o false, acá va la lógica
  }
}
