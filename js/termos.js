setTimeout(()=>{
    let termos = productos.filter(p => p.tipo === "termo");
    interfazProductos(termos)
    // filtrado.onclick = filtrarPorPrecio(termos);
    let filtrado = document.getElementById("filtro2");
    filtrado.addEventListener("click", function () {
      filtrarPorPrecio(termos);
    });
},500)
