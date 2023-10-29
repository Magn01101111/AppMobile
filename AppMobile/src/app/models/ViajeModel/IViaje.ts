import {IUser} from "../IUser";

export interface IViaje {
  estado: number,
  pasajero: IUser[],
  owner: IUser,
  asientos_disp: number,
  precio: number,
  origen: string,
  destino: string,
}
/*
public conductor : IUser,
  public pasajero: IUser,
  public precio: number,
  public origen: string,
  public destino: string*/
