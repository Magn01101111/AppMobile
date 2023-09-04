import {CarModel} from "./CarModel/CarModel";
import {ViajeModel} from "./ViajeModel/ViajeModel";

export interface IUser {
  rut: string,
  email: string,
  name: string,
  last_name: string,
  user_type: string,
  user_enabled: boolean,
  phone: string,
  address: string,
  password: string,
  tiene_auto: boolean,
  vehiculo?: CarModel,
  viajes? : ViajeModel[]
}
