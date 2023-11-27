import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {ActivatedRoute, Router} from "@angular/router";
import {UtilsService} from "../../services/utils.service";
import {FirebaseService} from "../../services/firebase.service";
import {IViaje} from "../../models/ViajeModel/IViaje";
import {IUser} from "../../models/IUser";
declare var google: any
@Component({
  selector: 'app-informacion-viaje',
  templateUrl: './informacion-viaje.page.html',
  styleUrls: ['./informacion-viaje.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InformacionViajePage implements OnInit {
  activeRoute = inject(ActivatedRoute)
  router = inject(Router)
  utilService = inject(UtilsService)
  firebaseService = inject(FirebaseService)
  viaje?: IViaje
  user?: IUser
  mapa: any;
  marker: any;
  ubicacionTest = {
    lat: -33.033554187419796,
    lng: -71.5331733908785
  };
  search: any;
  directionService = new google.maps.DirectionsService();
  directionRenderer = new google.maps.DirectionsRenderer();
  constructor() {
    this.activeRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.viaje = this.router.getCurrentNavigation()?.extras.state?.['viaje'];
        console.log('this.viajes ', this.viaje)
      }
    });
  }

  ngOnInit() {
    this.dibujarMap()
    this.buscarDireccion(this.mapa, this.marker)
    console.log(this.viaje)
  }
  dibujarMap(){
    const map: HTMLElement = document.getElementById('map')!;
    console.log(map)
    this.mapa = new google.maps.Map(map, {
      center: this.ubicacionTest,
      zoom: 18
    });

    this.marker = new google.maps.Marker({
      position: this.ubicacionTest,
      map: this.mapa
    });

    this.directionRenderer.setMap(this.mapa);
    const indicaciones: HTMLElement = document.getElementById('indicaciones')!
    this.directionRenderer.setPanel(indicaciones);
  }

  calcularRuta() {
    const place = this.search.getPlace().geometry.location;
    const request = {
      origin: this.ubicacionTest,
      destination: place,
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionService.route(request, (response: any, status: any)=>{
      console.log(place,request, response)
      this.directionRenderer.setDirections(response);
    });
    this.marker.setPosition(null)

  }
  buscarDireccion(mapaLocal : any, marcadorLocal : any){
    const autocomplete: HTMLElement = document.getElementById('autocomplete')!;
    const search = new google.maps.places.Autocomplete(autocomplete);
    this.search = search
    search.addListener('place_changed', function(){
      const place = search.getPlace().geometry.location;
      mapaLocal.setCenter(place);
      mapaLocal.setZoom(15);
      marcadorLocal.setPosition(place)

    });

  }
}
