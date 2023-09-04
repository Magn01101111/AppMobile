import {UserModel} from "../UserModel";

export class CarModel {
  constructor(
    public marca: string,
    public owner: UserModel,
    public asientos_disp: number,
    public disponible: boolean,
  ) {
  }

  //Metodo dentro de la clase para crear usuario. EJEMPLO solamente.
  static crearCar(event: {
    marca: string,
    owner: UserModel,
    asientos_disp: number,
    disponible: boolean
  }){
    return {
      marca: event.marca,
      owner: event.owner,
      asientos_disp: event.asientos_disp,
      disponible: event.disponible
    }
  }
}
