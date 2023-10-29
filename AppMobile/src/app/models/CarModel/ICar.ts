import {IUser} from "../IUser";

export interface ICar {
  marca: string,
  owner: IUser,
  disponible: boolean,
}
