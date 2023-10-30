import {inject} from '@angular/core';
import { CanActivateFn } from '@angular/router';
import {AuthService} from "../services/auth.service";
import {FirebaseService} from "../services/firebase.service";
import {UtilsService} from "../services/utils.service";



export const authGuard: CanActivateFn = (route,state)=>{
  const authService = inject(AuthService);
  const firebaseService = inject(FirebaseService)
  const utilService = inject(UtilsService)
  console.log('entró authGuard')
  return authService.asd()
};

