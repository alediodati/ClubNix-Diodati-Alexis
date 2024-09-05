// VARIABLES
let user
let cart = []
let products = [];

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

  fetch('http://127.0.0.1:5501/products.json')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    products = data
console.log(products)
    products.forEach((product) => {
      html += `
        <div class="product">
          <h3>${product.name}</h3>
          <img src="./img/${product.img}" alt="${product.name}">
          <p>Precio: $${product.price}</p>
          <input type="number" id="qty-${product.id}" value="0">
          <button onclick="agregarAlCarrito(${product.id})">Agregar al carrito</button>
        </div>
      `
    })
    document.getElementById('productos').innerHTML = html
  })
  .catch((error) => {
    console.error('Error al obtener el JSON:', error);
  });
}

function agregarAlCarrito(id) {
  let qty = parseInt(document.getElementById(`qty-${id}`).value);
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

  mostrarCarrito()
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
  document.getElementById('carrito-card').innerHTML = html
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
    Swal.fire({
      title: "Error",
      text: "Por favor complete todos los campos y verifique ser mayor de edad",
      icon: "error"
    });
  }
})

document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('user')
  location.reload()
})

document.getElementById('carrito-btn').addEventListener('click', () => {
  document.getElementById('carrito-card').style.display = 'block'
  mostrarCarrito()
})

document.getElementById('carrito-close').addEventListener('click', () => {
  document.getElementById('carrito_contenedor').style.display = 'none'
})

document.getElementById('carrito-finish').addEventListener('click', () => {
  Swal.fire({
    title: "Compra Finalizada",
    text: "Gracias por su compra, beba con moderacion",
    icon: "success",
    confirmButtonText: "Confirmar"
  }).then((result) => {
    location.reload()
  });
  
})

init()
mostrarProductos()