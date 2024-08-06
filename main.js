// VARIABLES
const limiteDeEdad = 18
const capacidad = 10

let personasAdentro = []
let personasRechazadas = []

let listaNegra = document.getElementById('listaNegra')
let submitButton = document.getElementById('submit')

// EVENTOS
submitButton.addEventListener('click', function () {
  let nombre = document.getElementById('nombre').value
  let edad = document.getElementById('edad').value
  let isPass = document.getElementById('isPass')

  let persona = {
    nombre: nombre,
    edad: edad
  }

  if (esMayor(persona.edad)) {
    personasAdentro.push(persona)
    isPass.innerHTML = 'Puede pasar'
  } else {
    personasRechazadas.push(persona)
    isPass.innerHTML = 'No puede pasar'
  }

  document.getElementById('nombre').value = ''
  document.getElementById('edad').value = ''

  if (personasAdentro.length >= capacidad) {
    submitButton.disabled = true
    mostrarPersonas(personasRechazadas)
  }
})

// FUNCION
function esMayor(edad) {
  let esMayor = false

  if (edad >= limiteDeEdad) {
    esMayor = true
  }

  return esMayor
}

function mostrarPersonas(personas) {
  let div = document.getElementById('listaNegraContainer')
  div.style.display = 'block'
  personas.forEach((persona) => {
    let li = document.createElement('li')
    li.innerHTML = `${persona.nombre} - ${persona.edad}`;
    listaNegra.appendChild(li)
  })
}