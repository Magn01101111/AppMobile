export class UserModel {
  constructor(
    public rut: string,
    public email: string,
    public name: string,
    public last_name: string,
    public user_type: string,
    public user_enabled: boolean,
    public phone: string,
    public address: string,
    public password: string,
    public tiene_auto: boolean
  ) {
  }
    /*constructor(
        public id: number,
        public rut: string,
        public email: string,
        public name: string,
        public last_name: string,
        public user_type: string,
        public user_enabled: boolean,
        public phone: string,
        public address: string,
        public password: string,
    ) {
    }*/

    //Metodo dentro de la clase para crear usuario. EJEMPLO solamente.
    static crearUsuario(event: {
        name: string,
        rut: string,
        email: string
    }){
        return {
            name: event.email,
            rut: event.rut,
            email: event.email
        }
    }
}
