setTimeout(()=>{
    let bolsos = productos.filter(p => p.tipo === "bolso");
    interfazProductos(bolsos)
    // filtrado.onclick = filtrarPorPrecio(termos);
    let filtrado = document.getElementById("filtro4");
    filtrado.addEventListener("click", function () {
      filtrarPorPrecio(bolsos);
    });
},500)
