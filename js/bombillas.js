setTimeout(()=>{
    let bombillas = productos.filter(p => p.tipo === "bombilla");
    interfazProductos(bombillas)
    // filtrado.onclick = filtrarPorPrecio(termos);
    let filtrado = document.getElementById("filtro5");
    filtrado.addEventListener("click", function () {
      filtrarPorPrecio(bombillas);
    });
},500)
