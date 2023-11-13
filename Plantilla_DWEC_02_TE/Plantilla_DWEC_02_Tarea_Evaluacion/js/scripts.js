"use strict";

console.log("Empieza el programa");

//#region 'Variables globales'
const formulario = document.querySelector("#formNombre");
const sociosArray = [];
const idString = "Socio numero ";

const contenedorEscribirSocios = document.getElementById(
  "contenedorPintarSocios"
);
//#endregion

//Carga el json
cargarSociosJSON();

/*
  Cargar los datos del JSON y los pasa para poder agregarlos al array.
*/
function cargarSociosJSON() {
  let path = "../model/datosSocios.json";

  let request = new Request(path, {
    headers: new Headers({
      "Content-Type": "text/json",
    }),
    method: "GET",
  });

  fetch(request)
    .then((response) => response.json())
    .then((data) => {
      aniadirSociosInicialesArray(data.socios);
      console.log("Datos", data);
    });
}

/* 
  Recorre el array del JSON pasado por parametro, crear un objeto Socio por cada objeto y luego los agrega al array
*/
function aniadirSociosInicialesArray(socios) {
  socios.forEach((socioItem) => {
    let socio = new Socio(socioItem.id, socioItem.Nombre, socioItem.Apellido);

    sociosArray.push(socio);
  });
}

/*
  Cojemos los valores de los campos del HTML y los pasamos como parametro al metodo crearSocio()
*/
function capturarDatosSocio() {
  // TODO: recoger los el nombre y apellido del HTML
  var nombre = document.getElementById("fnombre").value;
  var apellido = document.getElementById("fapellido").value;
  // TODO: crear el socio y añadirlo al array
  crearSocio(nombre, apellido);
}

/* 
 Creamos el objeto socio con los valores pasados como parametro.
 Llamamos a la funcion crearID() para poder crear el numero de identificacion siguiente.
 Agregamos al array.
 */
function crearSocio(nombre, apellido) {
  const socio = new Socio(crearID(), nombre, apellido);
  sociosArray.push(socio);
}

/*
TODO: 
    Creamos el siguiente ID, si el array esta vacio, le damos un ID 1 como primer ID, si no calculamos la siguiente ID con el length, conseguimos el ID y agregamos 1.
*/
function crearID() {
  if (sociosArray === 0) {
    return 1;
  }

  let ultimoSocio = sociosArray[sociosArray.length - 1];

  return ultimoSocio.id + 1;
}

/*
  Pintmos la lista de socios.
  Primero, buscamos si es firstChild, es decir, comprueba si hay algún nodo hijo, en este caso seria algún <p>, si tiene, elimina, asi dejamos en blanco cada vez que damos 
  al boton.
  Cuando no tiene nngun nodo hjo, reocorramos el array, creamos un elemento <p> para mostrar los valores en pantalla y asignamos los valores, asi hacemos para cada entrada
  en el array.
*/
function pintarListaSocios() {
  while (contenedorEscribirSocios.firstChild) {
    contenedorEscribirSocios.removeChild(contenedorEscribirSocios.firstChild);
  }

  for (let i = 0; i < sociosArray.length; i++) {
    var paragraphSocio = document.createElement("p");

    paragraphSocio.textContent =
      idString +
      sociosArray[i].id +
      ": " +
      sociosArray[i].nombre +
      " " +
      sociosArray[i].apellido;

    contenedorEscribirSocios.appendChild(paragraphSocio);
  }
}
//#endregion

//#region Clases

/*
  La clase Socio
*/
class Socio {
  constructor(id, nombre, apellido) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
  }
}
//#endregion

// ------------------- MAIN ------------------------

// TODO: añadimos los socios iniciales cuando empieza el programa

console.log("Acaba el programa");
