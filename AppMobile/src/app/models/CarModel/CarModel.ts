import {UserModel} from "../UserModel";

export class CarModel {
  constructor(
    public marca: string,
    public owner: UserModel,
    public disponible: boolean,
  ) {
  }

  //Metodo dentro de la clase para crear usuario. EJEMPLO solamente.
  static crearCar(event: {
    marca: string,
    owner: UserModel,
    disponible: boolean
  }){
    return {
      marca: event.marca,
      owner: event.owner,
      disponible: event.disponible
    }
  }
}
