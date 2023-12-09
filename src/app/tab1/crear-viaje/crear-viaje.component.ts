import {Component, inject, Input, OnInit} from '@angular/core';
import {IonicModule, ModalController} from "@ionic/angular";
import {IUser} from "../../models/IUser";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilsService} from "../../services/utils.service";
import {ICar} from "../../models/CarModel/ICar";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {FirebaseService} from "../../services/firebase.service";

@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.component.html',
  styleUrls: ['./crear-viaje.component.scss'],
  standalone: true,
  imports: [IonicModule, CrearViajeComponent, FormsModule, ReactiveFormsModule],
})
export class CrearViajeComponent  implements OnInit {
  @Input() vehiculos?: ICar[] | undefined;
  @Input() user?: IUser | undefined;
  activeRoute = inject(ActivatedRoute)
  router= inject(Router)
  utilService = inject(UtilsService)
  firebaseService = inject(FirebaseService)

  viajeForm = this.formBuilder.group({
    estado: [0],
    pasajero: [''],
    conductor: [''],
    asientos_disp: [4, [Validators.max(4)]],
    precio: [0, [Validators.required]],
    origen: ['',
      Validators.required],
    destino: ['', [Validators.required]]

  })

  constructor(
    private route: Router,
    private modal: ModalController,
    private formBuilder: FormBuilder,
  ) {


    /*this.activeRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.conductor = this.router.getCurrentNavigation()?.extras.state?.['user'];
        console.log('this.conductor ',this.conductor)
      }
    });*/
  }
  ngOnInit() {
    let userId = this.user?.uid as string;
    this.viajeForm.controls.conductor.setValue(userId)
    console.log(this.vehiculos)
    console.log(this.user)



  }

  dismiss(){
    this.utilService.dismissModal();
  }


  async crearViaje() {
    console.log(this.viajeForm.value)
    if (this.viajeForm.valid) {

      let path = `viajes`

      //GUARDAR IMAGENES FUTURO
      /*let dataUrl = this.vehiculoForm.value.image;
      let imagePath = `${this.conductor?.uid}/${Date.now()}`;
      let imageUrl = await this.firebaseService.uploadImage(imagePath, dataUrl);
      this.vehiculoForm.controls.image.setValue(imageUrl)*/

      //delete this.viajeForm.value.id

      const loading = await this.utilService.loading();
      await loading.present();

      this.firebaseService.addDocument(path, this.viajeForm.value).then(async res => {

        console.log(res)
        await this.utilService.presentToast({
          message: 'Viaje creado exitosamente',
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
}
