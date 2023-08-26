export class ProductModel {

    constructor(
        public id: number,
        public sku: number,
        public name: string,
        public brand: string,
        public product_enabled: boolean
    ) {
    }

    //Metodo dentro de la clase para crear usuario. EJEMPLO solamente.
    static crearProduct(event: {
        sku: string,
        name: string,
        product_enabled: string
    }){
        return {
            sku: event.sku,
            name: event.name,
            product_enabled: event.product_enabled
        }
    }
}