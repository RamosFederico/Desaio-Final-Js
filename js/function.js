let carrito;
let carro;

if(localStorage.getItem('carrito') === null){
     carrito = [];
}else{
    carrito = [];
    //Vuelvo a instanciar los productos dentro de carrito ya que si no, no funcionan los metodos asociados a la clase.
    carro = JSON.parse(localStorage.getItem('carrito'));
    for(let producto of carro){
        carrito.push(new Producto(producto.id, producto.nombre, producto.precio, producto.img, producto.tipo, producto.cantidad))
    }
}

//GENERA INTERFAZ DE PRODUCTOS CON JQUERY
function interfazProductos(productos){
    //Vacio el interior del carrito
    $("#cardsProductos").empty();
    for (const p of productos) {
        $("#cardsProductos").append(`<div class="col-md-3 col-sm-6 productoCard">
        <div class="product-grid">
            <div class="product-image">
                <a href="#" class="image"><img src="${p.img}"></a>
            </div>
            <div class="product-content">
                <h3 class="title"><a href="#">${p.nombre}</a></h3>
                <div class="price">$ ${p.precio}</div>
                <a id='${p.id}' class="add-to-cart"><i class="fas fa-shopping-bag"></i> Añadir al carrito</a>
            </div>
        </div>
    </div>`);
    }
    // AGREGO EL EVENTO A CADA BOTON
    // Selecciono los botones y le agrego el evento "click" a cada boton
    $('.add-to-cart').on("click", compraManejador);
}



// MANEJADOR DE COMPRA DE PRODUCTOS
function compraManejador(){
    // Busco producto en el array de productos para generar la notificación.
    const notificacion = productos.find(p => p.id == this.id);
    Notiflix.Notify.Success(`Producto agregado al carrito`);
    // Primero compruebo si el objeto está en el carrito / Busco mediante el id dado al boton
    const seleccionado = carrito.find(p => p.id == this.id);

    if(seleccionado == undefined) {
    // En caso de que no se encuentre en el carrito lo pusheo al array de productos
        carrito.push(productos.find(p => p.id == this.id))
    } else {
        // Si se encontro el objeto en el carrito AGREGO CANTIDAD
        seleccionado.agregarCantidad(1);
    }

    // Guardo el carrito en el local storage.
    localStorage.setItem("carrito",JSON.stringify(carrito));
    carritoInterfaz(carrito);
}

function getID(){
    return productos.length;
}

function carritoInterfaz(carrito){
    $('.cantidadCarrito').html(carrito.length);
    if (("carrito" in localStorage) && (carrito.length != 0)) {
        const guardadosCarrito = JSON.parse(localStorage.getItem("carrito"));
        $('#carrito').empty();
        for (const p of carrito) {
            $('#carrito').append(`<div class="mainContainer">
                                        <div class="contenedorDatos flex-shrink">
                                            <div class="contenedorImg">
                                                <img class="imgProducto img-${p.tipo}" src="${p.img}" alt="">
                                            </div>
                                            <p class="nombreProducto">${p.nombre}</p>
                                            <div class="contador">
                                                <p id='cant-${p.id}' class="cantProductos">${p.cantidad}</p>
                                                <div class="contador__iconos">
                                                    <img id="${p.id}" class="boton_agregar" src="../multimedia/iconPlus.png" alt="">
                                                    <img id="${p.id}" class="boton_restar" src="../multimedia/iconRemove.png" alt="">
                                                </div>
                                            </div>
                                            <p id="precioProducto-${p.id}" class="precioProducto">$ ${p.subtotal()}</p>
                                        </div>
                                        <div class="padreEliminar"><img class="iconoEliminar boton_eliminar" id="${p.id}" src="../multimedia/iconoEliminar.png" alt=""></div>
                                     </div> `);
        }
    $('#carrito').append(`<div class="finalCarrito">
                            <div class="volverCarrito" onclick="history.back()"><i class="fas fa-long-arrow-alt-left"></i> &nbsp Volver</div>
                            <div id="totalCarrito">Total: &nbsp &nbsp $ ${totalCarrito(carrito)}</div>
                          </div>`)
    $('.boton_eliminar').click(eliminarCarrito);
    $('.boton_agregar').click(botonCantidad);
    $('.boton_restar').click(restarCantidad);
    } else {
        $('#carrito').empty();
        $('#carrito').append(`
                                <div class="mensajeCarrito"> No tienes ningun producto agregado al carrito</div>
                                <div class="volverCarrito2" onclick="history.back()"><i class="fas fa-long-arrow-alt-left"></i> &nbsp Volver</div>
                            `)
    }
}

//Elimina producto del carrito
function eliminarCarrito(){
    carrito = carrito.filter(producto => producto.id != this.id);
    localStorage.setItem("carrito",JSON.stringify(carrito));
    carritoInterfaz(carrito);
}

// Agrega cantidad en carrito
function botonCantidad(){
    let producto = carrito.find(p => p.id == this.id);
    producto.agregarCantidad(1);
    document.getElementById(`cant-${producto.id}`).innerHTML = ''
    document.getElementById(`cant-${producto.id}`).innerHTML = producto.cantidad;
    document.getElementById(`precioProducto-${producto.id}`).innerHTML = '$ ' + producto.subtotal();
    //Cambio total
    $("#totalCarrito").html(`Total: &nbsp &nbsp $ ${totalCarrito(carrito)}`)
    //Guardo en storage
    localStorage.setItem("carrito",JSON.stringify(carrito));
}

// Resta cantidad en carrito
function restarCantidad(){
    let producto = carrito.find(p => p.id == this.id);
    if(producto.cantidad > 1){
        producto.agregarCantidad(-1);
        document.getElementById(`cant-${producto.id}`).innerHTML = ''
        document.getElementById(`cant-${producto.id}`).innerHTML = producto.cantidad;
        document.getElementById(`precioProducto-${producto.id}`).innerHTML = '$ ' + producto.subtotal();
        //Cambio total
        $("#totalCarrito").html(`Total: &nbsp &nbsp $ ${totalCarrito(carrito)}`)

        //Guardo en storage
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }
    
}

function totalCarrito(carrito){
    let total = 0;
    carrito.forEach(p => total += p.subtotal());
    return total;
}

function filtrarPorPrecio(producto){
    console.log("clickeo");
    const min = $("#precioMin").val();
    const max = $("#precioMax").val();
    // Escondo con fade y realizo el filtro
    $('#cardsProductos').fadeOut(600,function(){
    if ((min == 0 && max == 0) || (min === null && max === null)) {
        interfazProductos(producto)
    }else if( (min >= 0) && (max >= 0) ) {
        const encontrados = producto.filter(p => p.precio >= min && p.precio <= max);

        if (encontrados.length === 0) {
            $("#cardsProductos").empty();
            $("#cardsProductos").append(`
            <div class="mensajeFiltro"> No se encontró ningun producto en ese rango de precio</div>
        `);
        } else {interfazProductos(encontrados);}
    }
    //Muestro con fade luego de generar los productos.
    $('#cardsProductos').fadeIn();
    });
};

