import {CarModel} from "./CarModel/CarModel";
import {ViajeModel} from "./ViajeModel/ViajeModel";
import {ICar} from "./CarModel/ICar";
import {IViaje} from "./ViajeModel/IViaje";

export interface IUser {
  uid: string,
  rut?: string,
  email?: string,
  name?: string,
  last_name?: string,
  user_type?: string,
  user_enabled?: boolean,
  phone?: string,
  address?: string,
  password?: string,
  tiene_auto?: boolean,
  vehiculo?: ICar,
  viajes? : IViaje[]
}
