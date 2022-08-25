setTimeout(()=>{
    let combos = productos.filter(p => p.tipo === "combo");
    interfazProductos(combos)
    // filtrado.onclick = filtrarPorPrecio(termos);
    let filtrado = document.getElementById("filtro3");
    filtrado.addEventListener("click", function () {
      filtrarPorPrecio(combos);
    });
},500)
