const ubicaciones = [{
        localizacion: 'Gran Canaria. Las Palmas de Gran Canaria',
        posicion: [28.1280511, -15.44028138888889]
    },
    {
        localizacion: 'Tenerife. Santa Cruz de Tenerife',
        posicion: [28.463122, -16257559]
    },
    {
        localizacion: 'Fuerteventura. Puerto del Rosario',
        posicion: [28.500586921985388, -13.859574297656096]
    },
    {
        localizacion: 'Praia, Cape Verde',
        posicion: [14.916733, -23.509345]
    },
    {
        localizacion: 'Dakar, Senegal',
        posicion: [14.695589, -17.472145]
    }
];

newGeoloc = [...ubicaciones];

// Dado un array de objetos con localizaciones del planeta.

//     1- Geolocalizar por latitud y longitud cada una de ellas para completar el array (donde se encuentran: lat y long)

// HECHO

//     2- Crear una función que recupere datos de la lista mediante el método del callback (simular 2 segundos de retardo por el contacto con el servidor)
let fichado;
let localizado;
let indiceArray = 0;

//Crea las opciones del select
cargaLocations = () => {
    newGeoloc.forEach((item) => {
        const listaLocal = document.querySelector('#localizacion');
        const addLocation = document.createElement('option');
        const addLocalizacion = item.localizacion;
        addLocation.innerHTML = `
                    <option value="${addLocalizacion}">${addLocalizacion}</option>
               `;
        listaLocal.appendChild(addLocation);
    });
}
cargaLocations();

//Busca y muestra la localización seleccionada
const formulario = document.querySelector('#form-loc');
formulario.addEventListener('submit', (e) => {
    fichado = document.getElementById('localizacion').value;
    setTimeout(() => { // Función temporizadora
        newGeoloc.forEach((item, index) => {
            if (item.localizacion.includes(fichado)) {
                const localizado = item;
                document.getElementById('s-localizacion').value = localizado.localizacion;
                document.getElementById('s-latitud').value = localizado.posicion[0];
                document.getElementById('s-longitud').value = localizado.posicion[1];
                indiceArray = index;
            }
        });
    }, 2000) // Simulamos que tarda un tiempo entre la solicitud y la llegada de la información
    e.preventDefault();
});
//https://developers.google.com/maps/documentation/javascript/examples/map-simple#maps_map_simple-html <-- indicaciones para googleAPI MAPS

//     3- Crear otra función que inserte datos de otras ciudades en la lista y muestre a continuación la lista completa (simular 3 segundos de retardo)

//Añade localización, la carga dentro de las opciones del selector y limpia los inputs del formulario
const formularioDos = document.querySelector('#form-add-loc');
formularioDos.addEventListener('submit', (e) => {
    let getName = document.getElementById('nameAdd').value;
    let getLat = document.getElementById('latAdd').value;
    let getLng = document.getElementById('lngAdd').value;
    setTimeout(() => { // Función temporizadora
        newGeoloc.push({
            'localizacion': getName,
            'posicion': [
                parseFloat(getLat),
                parseFloat(getLng)
            ]
        }, );
        console.log(newGeoloc);
    }, 3000);
    const listaLocal = document.querySelector('#localizacion');
    const addLocation = document.createElement('option');
    addLocation.innerHTML = `
            <option value="${getName}">${getName}</option>
    `;
    listaLocal.appendChild(addLocation);
    document.getElementById('nameAdd').value = "";
    document.getElementById('latAdd').value = "";
    document.getElementById('lngAdd').value = "";
    e.preventDefault();
})

//     4- Repetir los ejercicios 2 y 3 creando una promesa. Tener en cuenta la gestión de errores.

// //Ejercicio 2 con promesa
// const formulario = document.querySelector('#form-loc');
// formulario.addEventListener('submit', (e) => {
//     return new Promise((resolve, reject) => {
//         fichado = document.getElementById('localizacion').value;
//         setTimeout(() => { // Función temporizadora
//             newGeoloc.forEach((item) => {
//                 if (item.localizacion.includes(fichado)) {
//                     localizado = item;
//                     muestraLoc = document.createElement('p');
//                     muestraLoc.id = 'muestraLoc';
//                     muestraLoc.innerHTML = `
//                     <strong>Localizacion: </strong>${localizado.localizacion} <strong>latitud: </strong>${localizado.posicion[0]} <strong>longitud: </strong>${localizado.posicion[1]}<br>
//                 `;
//                     document.querySelector('#visualizaLoc').appendChild(muestraLoc);
//                 }
//             });
//         }, 2000) // Simulamos que tarda un tiempo entre la solicitud y la llegada de la información
//         e.preventDefault();
//         const error = false; // si es false simula que no se recibió error del servidor
//         if (!error) {
//             resolve();
//         } else {
//             reject('Ha habido algún error');
//         }
//     });
// });

// //Ejercicio 3 con promesa
// const formularioDos = document.querySelector('#addLocCard');
// formularioDos.addEventListener('submit', (e) => {
//     return new Promise((resolve, reject) => {
//         let getName = document.getElementById('nameAdd').value;
//         let getLat = document.getElementById('latAdd').value;
//         let getLng = document.getElementById('lngAdd').value;
//         setTimeout(() => { // Función temporizadora
//             newGeoloc.push({
//                 'localizacion': getName,
//                 'posicion': [
//                     parseInt(getLat),
//                     parseInt(getLng)
//                 ]
//             }, );
//             console.log(newGeoloc);
//         }, 3000);
//         const listaLocal = document.querySelector('#localizacion');
//         const addLocation = document.createElement('option');
//         addLocation.innerHTML = `
//             <option value="${getName}">${getName}</option>
//     `;
//         listaLocal.appendChild(addLocation);
//         document.getElementById('nameAdd').value = "";
//         document.getElementById('latAdd').value = "";
//         document.getElementById('lngAdd').value = "";
//         e.preventDefault();
//         const error = false; // si es false simula que no se recibió error del servidor
//         if (!error) {
//             resolve();
//         } else {
//             reject('Ha habido algún error');
//         }
//     });
// })

//     5- Crear una promesa que solicite una localización,la elimina del array y recarga el selector con las opciones disponibles. 
const formularioMuestra = document.querySelector('#form-show');
formularioMuestra.addEventListener('submit', (e) => {
    return new Promise((resolve, reject) => {
        longArray = newGeoloc.length
        newGeoloc.forEach((item, index) => {
            if (document.getElementById('s-localizacion').value === item.localizacion &&
                parseFloat(document.getElementById('s-latitud').value) === item.posicion[0] &&
                parseFloat(document.getElementById('s-longitud').value) === item.posicion[1]) {
                console.log(item);
                newGeoloc.splice(index, 1);
                alert('Localizacion eliminada')
                console.log(newGeoloc);
                valueOption = item.localizacion;
                //Funcion que recarga el selector
                newGeoloc.filter(e => {
                    e = item.localizacion;
                    recorreOption = document.querySelectorAll('option');
                    recorreOption.forEach((element) => {
                        element.remove();
                    })
                    cargaLocations();
                })
            }
            e.preventDefault();
        });
        //limpia los campos del form
        limpiaForm = function() {
            document.getElementById('s-localizacion').value = "";
            document.getElementById('s-latitud').value = "";
            document.getElementById('s-longitud').value = "";
        };
        limpiaForm();
        newLongArray = newGeoloc.length
        if (longArray === newLongArray) {
            alert('La localización que intenta eliminar no existe');
        }
        const error = false; // si es false simula que no se recibió error del servidor
        if (!error) {
            resolve();
        } else {
            reject('Ha habido algún error');
        }
    })
})

//     6- Por último, crear una promesa que modifique la localización de alguna de las ciudades incluidas en la fuente de datos.

const modificaLoc = document.querySelector('#actualizar');
modificaLoc.addEventListener('click', () => {
    newGeoloc[indiceArray].localizacion = document.getElementById('s-localizacion').value;
    newGeoloc[indiceArray].posicion[0] = document.getElementById('s-latitud').value;
    newGeoloc[indiceArray].posicion[1] = document.getElementById('s-longitud').value;
    //Limpia formulario
    document.getElementById('s-localizacion').value = "";
    document.getElementById('s-latitud').value = "";
    document.getElementById('s-longitud').value = "";
    //recarga selector
    newGeoloc.forEach((item) => {
        newGeoloc.filter(e => {
            e = item.localizacion;
            recorreOption = document.querySelectorAll('option');
            recorreOption.forEach((element) => {
                element.remove();
            })
            cargaLocations();
        })
    })
})