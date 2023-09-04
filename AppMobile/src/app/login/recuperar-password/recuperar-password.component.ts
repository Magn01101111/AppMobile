import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IonicModule, IonInput, ModalController} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UserModel} from '../../models/UserModel';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RecuperarPasswordComponent  implements OnInit {
  @ViewChild('email') email: IonInput | undefined | string
  @ViewChild('password') password: IonInput | undefined | string
  @Input() users: UserModel[] | undefined

  constructor(
    private modal: ModalController
  ) { }

  ngOnInit() {
  }


  cambiarPass(nuevaPass: string | number | null | undefined) {
    let emailVal: string | number | null | undefined
    if (this.email instanceof IonInput) {
      emailVal = this.email.value
    }
    console.log('users ', this.users)
    console.log('emailVal ',emailVal)
    console.log('nuevaPass ',nuevaPass)
    for (let i = 0; !(this.users) || i < this.users.length; i++) {
      if (!(this.users) || this.users[i].email === emailVal) {
        if (this.users) {
          this.users[i].password = nuevaPass as string
          console.log('ahhhhh' ,this.users[i].password);
        }
      }
    }
  }
  async cerrarModal() {
      const cerrar = await this.modal.dismiss({data: this.users})
  }



}
