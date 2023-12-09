import {inject, Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile} from "@angular/fire/auth";
import {IUserLogin} from "../models/IUserLogin";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {getFirestore, setDoc, doc, getDoc, addDoc, collection, collectionData, query} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {getStorage, uploadString, getDownloadURL, ref} from "firebase/storage";
import {UtilsService} from "./utils.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  auth = inject(AngularFireAuth)
  firestore = inject(AngularFirestore)
  utilsService = inject(UtilsService)
  route = inject(Router)
  firestorage = inject(AngularFireStorage)

  //constructor() { }

  getAuth(){
    return getAuth()
  }

  signIn(user: IUserLogin) {
    return signInWithEmailAndPassword(getAuth(), <string>user.email, <string>user.password)
  }

  signUp(user: IUserLogin) {
    return createUserWithEmailAndPassword(getAuth(), <string>user.email, <string>user.password)
  }
  async logOut(){
    await getAuth().signOut();
    await this.utilsService.removeKey('user')
    await this.route.navigate(['/login'])
  }

  updateUser(displayName: string) {
    let user = getAuth().currentUser
    console.log('user ', user)
    if (user !== null)
      return updateProfile(user, {displayName})
    return 0
  }

  getCollectionData(path: string, collectionQuery?: any) {
    const ref = collection(getFirestore(), path)
    return collectionData(query(ref, collectionQuery), {idField: 'id'});
  }

  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data)

  }

  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data)
  }

  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  async uploadImage(path: string, dataUrl: string) {
    return uploadString(ref(getStorage(), path), dataUrl, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path))
    })
  }

}
