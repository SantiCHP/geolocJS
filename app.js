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
let map;
let lat = -34.397;
let lng = 150.644;



document.querySelector('#exampleSelect1').addEventListener('submit', (e) => {
    //Prevent actual submit
    e.preventDefault();
    function solicitaDatos(item) {
        setTimeout(() => { // Función temporizadora
            newGeoloc.forEach(geo => {
                if (geo.localizacion.includes(item)) {
                    const lat = geo.posicion[0];
                    const lng = geo.position[1];
                    function initMap() {
                        map = new google.maps.Map(document.getElementById("map"), {
                            center: {
                                lat: lat,
                                lng: lng
                            },
                            zoom: 8,
                        });
                    }
                } else {
                    console.log('No existe la localización indicada');
                }
            });
        }, 1000) // Simulamos que tarda un tiempo entre la solicitud y la llegada de la información
    }
});



//https://developers.google.com/maps/documentation/javascript/examples/map-simple#maps_map_simple-html <-- indicaciones para googleAPI MAPS

//     3- Crear otra función que inserte datos de otras ciudades en la lista y muestre a continuación la lista completa (simular 3 segundos de retardo)

//     4- Repetir los ejercicios 2 y 3 creando una promesa. Tener en cuenta la gestión de errores.

//     5- Crear una promesa que solicite una localización y la elimine del array. 

//     6- Por último, crear una promesa que modifique la localización de alguna de las ciudades incluidas en la fuente de datos.