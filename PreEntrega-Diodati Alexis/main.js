// VARIABLES
const limiteDeEdad = 18
const capacidad = 6
let personasAdentro = 0

// FUNCION
function esMayor(edad) {
  let esMayor = false

  if (edad >= limiteDeEdad) {
    esMayor = true
  }

  return esMayor
}

//   LOOP
for (let i = 0; i < capacidad; i++) {
  let edad = prompt('Ingrese su edad: ')

  console.log('Edad: ' + edad)

  if (esMayor(edad)) {
    alert('Puede pasar')
    personasAdentro++
  } else {
    alert('No puede pasar')
  }

  console.log('Cantidad de personas adentro: ' + personasAdentro)
}

alert(
  'El boliche está lleno, la cantidad de personas ingresadas fueron: ' +
    personasAdentro
)