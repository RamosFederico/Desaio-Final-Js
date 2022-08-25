class Producto{
    constructor(id, nombre, precio, img, tipo, cantidad){
        this.id = parseInt(id);
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.img = img;
        this.tipo = tipo;
        this.cantidad = cantidad || 1;
    }

    agregarCantidad(valor){
        this.cantidad += valor; 
    }

    subtotal(){
        return this.cantidad * this.precio;
    }
}