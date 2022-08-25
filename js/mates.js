setTimeout(()=>{
    let mates = productos.filter(p => p.tipo === "mate");
    interfazProductos(mates)
    let filtrado = document.getElementById("filtro1");
    filtrado.addEventListener("click", function () {
      filtrarPorPrecio(mates);
    });
},500)
