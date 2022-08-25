
window.addEventListener('load',()=>{

    //MOSTRAR ELEMENTO CON UN FADE
    $('#cardsProductos').fadeIn("slow");
})

//Carga asincrona de productos de origen local.
$(document).ready(function () {
$.get('../data/productos.json', function(datos, estado){
    if(estado == 'success'){
        for (const literal of datos) {
            productos.push(new Producto(literal.id, literal.nombre, literal.precio, literal.img, literal.tipo, literal.cantidad));
        }
    }
});
});



