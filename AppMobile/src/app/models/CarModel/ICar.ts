import {UserModel} from "../UserModel";

export interface ICar {
  marca: string,
  owner: UserModel,
  asientos_disp: number,
  disponible: boolean,
}
