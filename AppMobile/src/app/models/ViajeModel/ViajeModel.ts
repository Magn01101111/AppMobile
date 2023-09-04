import {IUser} from "../IUser";

export class ViajeModel {
  constructor(
    public conductor : IUser,
    public pasajero: IUser,
    public precio: number,
    public origen: string,
    public destino: string
  ) {
  }

  //Metodo dentro de la clase para crear usuario. EJEMPLO solamente.
  static crearViaje(event: {
    conductor : IUser,
    pasajero: IUser,
    precio: number,
    origen: string,
    destino: string

  }){
    return {
      conductor: event.conductor,
      pasajero: event.pasajero,
      precio: event.precio,
      origen: event.origen,
      destino: event.destino
    }
  }
}
