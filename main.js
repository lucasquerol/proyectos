//array donde se almacenan los objetos del archivo .JSON
let stockProductos = []


//Array donde se encontraran los productos que iran al carrito
let comprarProductos = JSON.parse(localStorage.getItem("productoComprar")) ?? []

//funcion para traer la información del archivo .JSON tanto al array stockProductos como al Storage
const pedirInfo =  async () =>{
  const resp = await fetch ("productos.json")
  const data = await resp.json()

  for (let elem of data){
      
      stockProductos.push(elem)
      
  }
  inicioDom()

  localStorage.setItem("stock", JSON.stringify(stockProductos))    
}

pedirInfo()



//La funcion inicioDom, imprime en el DOM un carrousel, los productos filtrados del array stockProductos que tienen un precio menor a 25000 y por último un pequeño formulario de suscripción, en invocada por primera vez en la función pedirInfo, para que al abrir la página se vean los productos que cumplen con la condición. 
//La funcion inicioDom, es invocada por segunda vez en el evento click de siempreDiez, es decir cada vez que se clickea el "logo" de la página

let wrapperInicio = document.getElementById("wrapper")
let wrapperCarrousel = document.getElementById("wrapperCarrousel")

function inicioDom(){

    wrapperInicio.innerHTML = ""
    let carrousel = document.createElement("div")
    carrousel.className = "carrousel"
    carrousel.innerHTML = ` 
    <div id="carouselExample" class="carousel slide">
            <div class="carousel-inner">
              <div id="stockRiver" class="carousel-item active">
                <img src="https://media.solodeportes.com.ar/media/slider/slide/08252909_3732940-RIVER_AWAY_WHS_Home-Banner-Desktop_1920x540px_copia.webp" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="https://media2.solodeportes.com.ar/media/slider/slide/13210910_SD_Desktop.webp" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="https://media.solodeportes.com.ar/media/slider/slide/16033108SD_Banner_desktop.webp" class="d-block w-100" alt="...">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
           <h1 class="tituloOfertas">Algunas de nuestras ofertas...</h1>
    `
    wrapperInicio.append(carrousel)

  
  let ofertas = stockProductos.filter(ofer => ofer.precio < 25000)

    for(let elem of ofertas){
      
      let containerProductos = document.createElement("div")
      containerProductos.className = "containerProductos col-12 col-md-6 col-lg-4 my-2"
      
      containerProductos.innerHTML = `
      <div class="card" style="width: 18rem;">
      <img src="${elem.imagen}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${elem.modelo}</h5>
        <p class="card-text">Marca: ${elem.marca}</p>
        <p class="card-text">Color: ${elem.color}</p>
        <p class="card-text">Precio: <strong>${elem.precio}</strong></p>
        <button id="comprar${elem.id}" href="#" class="btn btn-primary">Comprar</button>
      </div>
    </div>`

    wrapperInicio.append(containerProductos)

    let comprarBtn = document.getElementById(`comprar${elem.id}`)

    comprarBtn.addEventListener("click", ()=>{
      console.log("funciona")
      miCompra(elem)
      cargrProductosModal(comprarProductos)
    })
  }

  let formularioSuscripcion = document.createElement("div")
  formularioSuscripcion.className = "formularioSuscripcion d-block w-100"
  formularioSuscripcion.innerHTML = `        <form class="formSus">
  <h2  class="h2Sus">¡Suscribite!</h2>
  <p class="parrafoSus">Recibí novedades y promociones exclusivas en tu mail</p>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email:</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Teléfono</label>
    <input type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Acepto los terminos y condiciones</label>
  </div>
  <button type="submit" class="btn btn-primary">Suscribirme</button>
</form>`

wrapperInicio.append(formularioSuscripcion)

}

let siempreDiezBtn = document.getElementById("volverInicio")
siempreDiezBtn.addEventListener("click", inicioDom)



//La funcion filtro sirve para filtrar por propiedad, los objetos del array stockProductos, que luego seran impresos por la función imprimirDom, los objetos se filtran teniendo en cuenta el evento.


function filtro (array, filtro1, filtro2){
  let buscado = array.filter(prod => prod.producto == filtro1 && prod.sexo == filtro2)
  return buscado
}

//De la línea 131 a 269 se encuentran las capturas de los nodos del menú de navegación y los eventos de los mismos.

let zapatillasHombreBtn = document.getElementById("zapatillasHombre")
eventoZapatillasHombre = zapatillasHombreBtn.addEventListener("click", ()=>{

  imprimirDom(filtro(stockProductos, "zapatillas", "Hombre"))
  

})

let zapatillasMujerBtn = document.getElementById("zapatillasMujer")
eventoZapatillasMujer = zapatillasMujerBtn.addEventListener("click", ()=>{
  
  imprimirDom(filtro(stockProductos, "zapatillas", "Mujer"))

})

let camisetasHombreBtn = document.getElementById("camisetasHombre")
camisetasHombreBtn.addEventListener("click", ()=>{

  imprimirDom(filtro(stockProductos, "Camisetas", "Hombre"))

})

let camisetasMujerBtn = document.getElementById("camisetasMujer")
camisetasMujerBtn.addEventListener("click", ()=>{

  imprimirDom(filtro(stockProductos, "Camisetas", "Mujer"))

})

let botinesHombreBtn = document.getElementById("botinesHombre")
botinesHombreBtn.addEventListener("click", ()=>{
  imprimirDom(filtro(stockProductos, "Botines", "Hombre"))
})

let botinesMujerBtn = document.getElementById("botinesMujer")
botinesMujerBtn.addEventListener("click", ()=>{
  imprimirDom(filtro(stockProductos, "Botines", "Mujer"))
})

let remerasHombreBtn = document.getElementById("remerasHombre")
remerasHombreBtn.addEventListener("click", ()=>{
  imprimirDom(filtro(stockProductos, "Remeras", "Hombre"))
})

let remerasMujerBtn = document.getElementById("remerasMujer")
remerasMujerBtn.addEventListener("click", ()=>{
  imprimirDom(filtro(stockProductos, "Remeras", "Mujer"))
})

let shortsHombreBtn = document.getElementById("shortsHombre")
shortsHombreBtn.addEventListener("click", ()=>{
  imprimirDom(filtro(stockProductos, "Shorts", "Hombre"))
})

let shortsMujerBtn = document.getElementById("shortsMujer")
shortsMujerBtn.addEventListener("click", ()=>{
  imprimirDom(filtro(stockProductos, "Shorts", "Mujer"))
})

let camperasHombreBtn = document.getElementById("camperasHombre")
camperasHombreBtn.addEventListener("click", ()=>{
  imprimirDom(filtro(stockProductos, "Camperas", "Hombre"))
})

let camperasMujerBtn = document.getElementById("camperasMujer")
camperasMujerBtn.addEventListener("click", ()=>{
  imprimirDom(filtro(stockProductos, "Camperas", "Mujer"))
})

let zapatillasNiñosBtn = document.getElementById("zapatillasNiños")
zapatillasNiñosBtn.addEventListener("click", ()=>{
  imprimirDom(filtro(stockProductos, "zapatillas", "Niños"))
})

let botinesNiñosBtn = document.getElementById("botinesNiños")
botinesNiñosBtn.addEventListener("click", ()=>{
  imprimirDom(filtro(stockProductos, "Botines", "Niños"))
})

let camisetasNiñosBtn = document.getElementById("camisetasNiños")
camisetasNiñosBtn.addEventListener("click", ()=>{
  imprimirDom(filtro(stockProductos, "Camisetas", "Niños"))
})

let remerasNiñosBtn = document.getElementById("remerasNiños")
remerasNiñosBtn.addEventListener("click", ()=>{
  imprimirDom(filtro(stockProductos, "Remeras", "Niños"))
})

let shortsNiñosBtn = document.getElementById("shortsNiños")
shortsNiñosBtn.addEventListener("click", ()=>{
  imprimirDom(filtro(stockProductos, "Shorts", "Niños"))
})

let camperasNiñosBtn = document.getElementById("camperasNiños")
camperasNiñosBtn.addEventListener("click", ()=>{
  imprimirDom(filtro(stockProductos, "Camperas", "Niños"))
})




let marcaAdidasBtn = document.getElementById("marcaAdidas")
marcaAdidasBtn.addEventListener("click", ()=>{

  let stockMarcaAdidas = stockProductos.filter(prod => prod.marca == "Adidas")

  imprimirDom(stockMarcaAdidas)
})

let marcaNikeBtn = document.getElementById("marcaNike")
marcaNikeBtn.addEventListener("click", ()=>{

  let stockMarcaNike = stockProductos.filter(prod => prod.marca == "Nike")

  imprimirDom(stockMarcaNike)
})

let marcaReebokBtn = document.getElementById("marcaReebok")
marcaReebokBtn.addEventListener("click", ()=>{

  let stockMarcaReebok = stockProductos.filter(prod => prod.marca == "Reebok")

  imprimirDom(stockMarcaReebok)
})

let marcaTopperBtn = document.getElementById("marcaTopper")
marcaTopperBtn.addEventListener("click", ()=>{

   stockMarcaTopper = stockProductos.filter(prod => prod.marca == "Topper")

  imprimirDom(stockMarcaTopper)
})

let marcaPumaBtn = document.getElementById("marcaPuma")
marcaPumaBtn.addEventListener("click", ()=>{
  stockMarcaPuma = stockProductos.filter(prod => prod.marca == "Puma")
  imprimirDom(stockMarcaPuma)
})




//Captura del buscador y declaración del evento
let queEstasBuscando = document.getElementById("queEstasBuscando")

queEstasBuscando.addEventListener("input", ()=>{

  buscar(queEstasBuscando.value, stockProductos)

})


//La función buscar permite buscar las coincidencias ingresadas en el input con los productos del array stockProductos, en caso de encontrar coincidencias muestra solo los productos que coinciden y en caso de no hallar coincidencias muestra una alerta y todos los objetos de stockProductos

function buscar(buscado, array){
  
  let coincidencias = array.filter(
    (product) => {return product.marca.toLowerCase().includes(buscado.toLowerCase()) || product.modelo.toLowerCase().includes(buscado.toLowerCase())}
  )
  
  if(coincidencias.length > 0){
    wrapperInicio.innerHTML =""
    imprimirDom(coincidencias)
  }else{
    Swal.fire({
      title: "Advertencia",
      icon: "warning",
      text: "No se han encontrado coincidencias con su búsqueda, le dejamos nuestro catálogo completo",
      showConfirmButton: false,
      timer: 2500
      
    })
    queEstasBuscando.value = ""
    imprimirDom(array)
  }
  
}



//La función imprimirDom, muestra en el DOM los productos filtrados teniendo en cuenta el evento seleccionado. 
//En dicha función se imprimien las cards correspondientes a los productos y además un Div con un menú desplegable que ordena por precio descendente o ascendente según la función que sea invocada por el evento.

function imprimirDom(array){
  wrapperInicio.innerHTML = ""

  let menuLateral = document.createElement("div")
  menuLateral.className = "ordenarPorDiv col-12"
  menuLateral.innerHTML = `<div class="dropdown">
  <button id="ordenarPor" class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Ordenar por
  </button>
  <ul class="dropdown-menu">
    <li><a id="precioMenor" class="dropdown-item" href="#">Precio Menor a Mayor</a></li>
    <li><a id="precioMayor" class="dropdown-item" href="#">Precio Mayor a Menor</a></li>
    <li><a id="ordenAz" class="dropdown-item" href="#">A - Z</a></li>
    <li><a id="ordenZa" class="dropdown-item" href="#">Z - A</a></li>
    <li><a id="mostrarTodosProductos" class="dropdown-item" href="#">Ver todos los productos</a></li>
  </ul>
</div>
  ` 
  wrapperInicio.append(menuLateral)

  let ordenarPrecioMenor = document.getElementById("precioMenor")

  ordenarPrecioMenor.addEventListener("click", ()=>{


  let arrayPrecioMenor = array.concat()
  arrayPrecioMenor.sort(
      (a, b) => a.precio - b.precio
  )
  imprimirDom(arrayPrecioMenor)

})

  let ordenarPrecioMayor = document.getElementById("precioMayor")

  ordenarPrecioMayor.addEventListener("click", ()=>{

    let arrayPrecioMayor = array.concat()
    arrayPrecioMayor.sort(
        (a, b) => b.precio - a.precio
    )
    imprimirDom(arrayPrecioMayor)

  })

  let ordenAz = document.getElementById("ordenAz")

  ordenAz.addEventListener("click", ()=>{
    
    let arrayOrdenAz = array.concat()

    arrayOrdenAz.sort((a,b)=>{
      if(a.modelo < b.modelo){
        return -1;
      }
      if(a.modelo > b.modelo){
        return 1;
      }
      return 0;
    })

     imprimirDom(arrayOrdenAz)

  })

  let ordenZa = document.getElementById("ordenZa")

  ordenZa.addEventListener("click", ()=>{

    let arrayOrdenZa = array.concat()

    
    arrayOrdenZa.sort((a,b)=>{
      if(a.modelo > b.modelo){
        return -1;
      }
      if(a.modelo < b.modelo){
        return 1;
      }
      return 0;
    })

     imprimirDom(arrayOrdenZa)

  })

  let mostrarTodosProductos = document.getElementById("mostrarTodosProductos")

  mostrarTodosProductos.addEventListener("click", ()=>{
    imprimirDom(stockProductos)
  })



  for(let elem of array){
      
      let containerProductos = document.createElement("div")
      containerProductos.className = "containerProductos col-12 col-md-6 col-lg-4 my-2"
      
      containerProductos.innerHTML = `<div class="card" style="width: 18rem;">
      <img src="${elem.imagen}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${elem.modelo}</h5>
        <p class="card-text">Marca: ${elem.marca}</p>
        <p class="card-text">Color: ${elem.color}</p>
        <p class="card-text">Precio: <strong>${elem.precio}</strong></p>
        <button id="comprar${elem.id}" href="#" class="btn btn-primary">Comprar</button>
      </div>
    </div>`

    wrapperInicio.append(containerProductos)

    let comprarBtn = document.getElementById(`comprar${elem.id}`)

    comprarBtn.addEventListener("click", ()=>{
      
      miCompra(elem)
      cargrProductosModal(comprarProductos)
    })
  }
  
}



let comprarCarritoBtn = document.getElementById("comprarCarritoBtn")
comprarCarritoBtn.addEventListener("click", ()=>{
  
  cargrProductosModal(comprarProductos)
  
})


//La función miCompra Pushea al array comprarProductos los objetos, al producirse el evento de arriba
//Además esta función le incorpora una propiedad a los objetos, la de cantidad, que será teniada en cuenta a la hora de producirse la suma total del valor de los productos.
//En caso de que el productoAgregado no se encuentre en el array comprarProductos, tendra en cantidad el valor 1, en cambio si se encuentra en el array se sumara las veces que el usuario apriete el botón comprar

function miCompra(objeto){
  
  let productoAgregado = comprarProductos.find((producto)=> producto.id == objeto.id)

  if(productoAgregado == undefined){

    comprarProductos.push(objeto)

    objeto.cantidad = 1
  
    localStorage.setItem("productoComprar", JSON.stringify(comprarProductos))

    Toastify({
      text: `Se ha cargado exitosamente ${objeto.modelo} al carrito`,
      duration: 3000,
      gravity: "bottom", 
      position: "left", 
      style: {
        background: "#0d6efd",
      },
    }).showToast();

  }else{
    
    objeto.cantidad++

    localStorage.setItem("productoComprar", JSON.stringify(comprarProductos))    

    console.log(objeto)
    
    Toastify({
      text: `Se ha cargado exitosamente ${objeto.modelo} (X${objeto.cantidad}) al carrito`,
      duration: 3000,
      gravity: "bottom", 
      position: "left", 
      style: {
        background: "#0d6efd",
      },
    }).showToast();
  }
  

}


//precioFinal calcular el total del valor de la propiedad precio de los objetos que se encuentran en el array comprarProductos por la cantidad de veces que esten

let precioTotal = document.getElementById("precioTotal")
function precioFinal(arr){

  const totalReduce = arr.reduce(

    (acumulador, producto) => {return (acumulador + producto.precio)*producto.cantidad}, 0
  
    )
    if(totalReduce > 0){
      precioTotal.innerHTML = `El total de su compra es de $${totalReduce}`
    }else{
      precioTotal.innerHTML = `El carrito se encuentra vacío`
    }
}


//La función cargrProductosModal, imprime en el DOM (en el interior del modal carrito), los productos que se encuentran en el array comprarProductos
//Además en su interior tiene dos forEach que lo que hacen es que en caso de darse cierto evento o la cantidad de veces que haya un producto o lo eliminan del DOM o eliminan la cantidad 

let modalBody = document.getElementById("modal-body")


function cargrProductosModal(array){

  modalBody.innerHTML = ""

  array.forEach(elemComprar => {
    modalBody.innerHTML += `
    <div class="card border-primary mb-3" id ="productoCarrito${elemComprar.id}" style="max-width: 540px;">
         <img class="card-img-top" height="300px" src="${elemComprar.imagen}" alt="">
         <div class="card-body">
                <h4 class="card-title">${elemComprar.modelo}</h4>
                <p class="card-text">${elemComprar.marca}</p>
                <p class="card-text">Color: ${elemComprar.color}</p>
                <p class="cardCantidad" id="cantidadTotal${elemComprar.id}">Cantidad: ${elemComprar.cantidad}</p>
                <p class="card-text">$${elemComprar.precio}</p> 
                <button class= "btn btn-danger" id="botonEliminar${elemComprar.id}"><i class="fas fa-trash-alt"></i></button>
         </div>    
    </div>`
  })

  array.forEach(
    elemComprar =>{
      let btnEliminar = document.getElementById(`botonEliminar${elemComprar.id}`)
      btnEliminar.addEventListener("click", ()=>{
        
        if(elemComprar.cantidad == 1){


        let cardCarrito = document.getElementById(`productoCarrito${elemComprar.id}`)
        cardCarrito.remove()

        let productoEliminar = array.indexOf(elemComprar)
        array.splice(productoEliminar, 1)

        localStorage.setItem("productoComprar", JSON.stringify(array))

        precioFinal(array)

        }else{

          let cantidadTotal = document.getElementById(`cantidadTotal${elemComprar.id}`)

          elemComprar.cantidad--
          
          cantidadTotal.innerHTML = `Cantidad: ${elemComprar.cantidad}`
          console.log(elemComprar.cantidad)
          precioFinal(array)
        }

      })
    
    
    }
  )

  precioFinal(array)

}


//CAPTURA, EVENTO Y FUNCION PARA TERMINAR COMPRA
//Lo que hace es vaciar el storage del productoComprar y el array comprarProductos. 
//Con respecto al DOM elimina los productos del carrito y además mediante alertas de librerias expone mensajes de confirmar la finalización de la misma y su finalización con éxito

let terminarCompraBtn = document.getElementById("terminarCompra")

terminarCompraBtn.addEventListener("click", ()=>{
  terminarCompra()
})

function terminarCompra(){
  

  let DateTime = luxon.DateTime;
  let ahora = DateTime.now()
  let fechaAhora = ahora.toLocaleString(DateTime.DATE_HUGE)
  let horaAhora = ahora.toLocaleString(DateTime.TIME_WITH_SECONDS)


  Swal.fire({
    title: '¿Usted desea finalizar la compra?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, deseo finalizar la compra',
    cancelButtonText: 'No, quiero seguir comprando'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        '¡Su compra ha finalizado con éxito!',
        `La compra se realizó el día ${fechaAhora}, a las ${horaAhora}`,
        'success'
      )
      
      modalBody.innerHTML = ""
      precioTotal.innerHTML = `El carrito se encuentra vacío`
      
      comprarProductos = []
      
      localStorage.removeItem("productoComprar")
    }
  })
  
}
