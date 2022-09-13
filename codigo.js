const abrir = document.getElementById('abrir');
const modal = document.getElementById('id_productos');
modal.style.display = "none";
const cerrar = document.getElementById('cerrar');


abrir.addEventListener('click', () => {
    modal.style.display = "";
})

cerrar.addEventListener('click', () => {
    modal.style.display = "none";
})

let cards = document.querySelector('.productos');
let ventanaCarrito = document.querySelector('.items')
let carrito = [];
let precio_final = document.querySelector('.precioTotal');
let cantidad_carrito = document.querySelector('.cantidad');
let total = 0;
let cantidadproductos = 0;

eventos();
function eventos() {
    cards.addEventListener('click', agregar_producto);

    ventanaCarrito.addEventListener('click', borrarProducto);

}

function agregar_producto(e) {
    if (e.target.classList.contains('bi-cart')) {
        let productoSeleccionado = e.target.parentElement.parentElement;
        datos(productoSeleccionado);
    }
}

function borrarProducto(e) {
    if (e.target.classList.contains('borrar_producto')) {
        let borrarId = e.target.getAttribute('data-id');
        carrito.forEach(value => {
            if (value.id == borrarId) {
                let precioResta = (value.precio * value.cantidad);
                total = total - precioResta;
            }
        })
        carrito = carrito.filter(producto => producto.id !== borrarId)

        cantidadproductos--;
    } if (carrito.length === 0) {
        precio_final.innerHTML = 0;
        cantidad_carrito.innerHTML = 0;
    }

    actualizarhtml();
    interaccion();
}

function datos(producto) {
    let datoProducto = {
        imagen: producto.querySelector('div img').src,
        nombre: producto.querySelector('.name').textContent,
        precio: parseFloat(producto.querySelector('.precio').textContent.replaceAll("$", "")),
        id: producto.querySelector('div i').getAttribute('data-id'),
        cantidad: 1
    }

    total = total + datoProducto.precio;

    let mismoProducto = carrito.some(producto => producto.id === datoProducto.id)

    if (mismoProducto) {
        let producto_ = carrito.map(producto => {
            if (producto.id === datoProducto.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        });

        carrito = [...producto_];

    } else {
        carrito = [...carrito, datoProducto];
        cantidadproductos++;
    }
    interaccion();
}

function interaccion() {
    actualizarhtml();
    carrito.forEach(producto => {
        let { imagen, nombre, precio, id, cantidad } = producto;
        let car = document.createElement('div');
        car.classList.add('car_style');
        car.innerHTML = `
                <img src="${imagen}" alt=""><i class="borrar_producto bi bi-x-circle-fill" data-id="${id}"></i>
                <p class="name">${nombre}</p>
                <p class="precio_total">${precio}</p>
                <p>Cantidad: ${cantidad}</p>
        `;

        ventanaCarrito.appendChild(car)
    })

    precio_final.innerHTML = `Total: $ ${total}`;
    cantidad_carrito.innerHTML = cantidadproductos;
}

function actualizarhtml() {
    ventanaCarrito.innerHTML = '';

}

let registro = localStorage.getItem('proximo_id')
let id = 0;

if (registro) {
    id = parseInt(registro)
}
class Compra {
    constructor(compras) {
        this.compras = JSON.stringify(compras);
        this.id = id++;
    }

    almacenar_compra() {
        localStorage.setItem(this.id, this.compras)
    }
}

function comprar() {
    let compra = new Compra(carrito)
    compra.almacenar_compra()
    localStorage.setItem('proximo_id', id)
    actualizarhtml()
    carrito = []
    precio_final.innerHTML = `Total: $ 0`;
}

document.querySelector('.btn_comprar').addEventListener('click', comprar);





