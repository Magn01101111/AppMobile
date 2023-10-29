import {Component, inject, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {IUser} from "../../models/IUser";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {IUserLogin} from "../../models/IUserLogin";
import {UtilsService} from "../../services/utils.service";
import {FirebaseService} from "../../services/firebase.service";

@Component({
  selector: 'app-crear-vehiculo',
  templateUrl: './crear-vehiculo.component.html',
  styleUrls: ['./crear-vehiculo.component.scss'],
  standalone: true,
  imports: [IonicModule, CrearVehiculoComponent, FormsModule, ReactiveFormsModule],
})
export class CrearVehiculoComponent  implements OnInit {
  activeRoute = inject(ActivatedRoute)
  router= inject(Router)
  utilService = inject(UtilsService)
  firebaseService = inject(FirebaseService)
  conductor?: IUser

  vehiculoForm = this.formBuilder.group({
    id: [''],
    marca: [''],
    owner: [''],
    disponible: [true],
  })

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.activeRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.conductor = this.router.getCurrentNavigation()?.extras.state?.['user'];
        console.log('this.conductor ',this.conductor)
      }
    });
  }

  ngOnInit() {}

  async crearVehiculo() {
    this.vehiculoForm.controls.owner.setValue(this.conductor?.uid as string)
    console.log(this.vehiculoForm.value)
    if (this.vehiculoForm.valid) {

      let path = `users/${this.conductor?.uid}/vehiculo`

      //GUARDAR IMAGENES FUTURO
      /*let dataUrl = this.vehiculoForm.value.image;
      let imagePath = `${this.conductor?.uid}/${Date.now()}`;
      let imageUrl = await this.firebaseService.uploadImage(imagePath, dataUrl);
      this.vehiculoForm.controls.image.setValue(imageUrl)*/

      delete this.vehiculoForm.value.id

      const loading = await this.utilService.loading();
      await loading.present();

      this.firebaseService.addDocument(path, this.vehiculoForm.value).then(async res => {

        console.log(res)
        await this.utilService.presentToast({
          message: 'Vehículo creado exitosamente',
          duration: 1500,
          animated: true,
          color: "success",
          position: "middle",
          icon: 'checkmark-circle-outline'
        })

      }).catch(error => {
        this.utilService.presentToast({
          message: error.message,
          duration: 2000,
          animated: true,
          color: "primary",
          position: "middle",
          icon: 'alert-circle-outline'
        })
        console.log(error)

      }).finally(() => {
        loading.dismiss();
      })
    }
  }

  async volver() {
    await this.router.navigate(['/tabs/tab1'])
  }
}
