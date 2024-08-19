// VARIABLES
let user
let cart = []

let fernet = {
  id: 1,
  name: 'Fernet',
  price: 500,
  img: 'fernet.jpeg',
  qty: 0
  
  
}

let cerveza = {
  id: 2,
  name: 'Cerveza',
  price: 400,
  img: 'cerveza.jpeg',
  qty: 0
}

let cocaCola = {
  id: 3,
  name: 'Coca Cola',
  price: 400,
  img: 'cocacola.jpeg',
  qty: 0
}

let products = [cerveza, fernet, cocaCola]

// FUNCTIONS
function init() {
  user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    document.getElementById('validacion').style.display = 'none'
    document.getElementById('pagina_principal').style.display = 'flex'
  }
}
function mostrarProductos() {
  let html = ''
  products.forEach((product) => {
    html += `
      <div class="product">
        <h3>${product.name}</h3>
        <img src="img/${product.img}" alt="${product.name}">
        <p>Precio: $${product.price}</p>
        <input type="number" id="qty-${product.id}" value="0">
        <button onclick="agregarAlCarrito(${product.id})">Agregar al carrito</button>
      </div>
    `
  })
  document.getElementById('productos').innerHTML = html
}

function agregarAlCarrito(id) {
  let qty = parseInt(document.getElementById(`qty-${id}`).value)
  if (qty > 0) {
    let product = products.find((product) => product.id === id)
    if (cart.includes(product)) {
      cart.find((item) => item.id === product.id).qty += qty
    } else {
      product.qty = qty
      cart.push(product)
    }
  }

  if (cart.length > 0) {
    document.getElementById('carrito-qty').innerHTML = ` ${cart.length}`
  } else {
    document.getElementById('carrito-qty').innerHTML = ''
  }

  document.getElementById(`qty-${id}`).value = 0
}

function mostrarCarrito() {
  let html = ''
  cart.forEach((product) => {
    html += `
      <div class="cartProduct">
        <h3>${product.name}</h3>
        <p>Precio: $${product.price}</p>
        <p>Cantidad: ${product.qty}</p>
        <button onclick="EliminarDelCarrito(${product.id})">Eliminar del carrito</button>
      </div>
    `
  })
  document.getElementById('carrito_contenedor').style.display = 'block'
  document.getElementById('carrito').innerHTML = html
  document.getElementById('carrito-close').style.display = 'block'
}

function EliminarDelCarrito(id) {
  cart = cart.filter((product) => product.id !== id)
  if (cart.length === 0) {
    document.getElementById('carrito_contenedor').style.display = 'none'
  } else {
    mostrarCarrito()
  }

  if (cart.length > 0) {
    document.getElementById('carrito-qty').innerHTML = ` ${cart.length}`
  } else {
    document.getElementById('carrito-qty').innerHTML = ''
  }
}

// EVENTOS
document.getElementById('login-btn').addEventListener('click', () => {
  let name = document.getElementById('nombre').value
  let age = parseInt(document.getElementById('edad').value)
  let email = document.getElementById('correo').value

  if (age > 17 && name !== '' && email !== '') {
    user = {
      name: name,
      age: age,
      email: email
    }

    localStorage.setItem('user', JSON.stringify(user))

    document.getElementById('validacion').style.display = 'none'
    document.getElementById('pagina_principal').style.display = 'flex'
  } else {
    alert(
      'Por favor, complete todos los campos y verifique que sea mayor de edad'
    )
  }
})

document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('user')
  location.reload()
})

document.getElementById('carrito-btn').addEventListener('click', () => {
  document.getElementById('carrito').style.display = 'block'
  mostrarCarrito()
})

document.getElementById('carrito-close').addEventListener('click', () => {
  document.getElementById('carrito_contenedor').style.display = 'none'
  document.getElementById('carrito-close').style.display = 'none'
})

init()
mostrarProductos()