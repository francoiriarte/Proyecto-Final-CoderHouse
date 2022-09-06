//CLASE PRODUCTO

class Producto {
  constructor(obj) {
    this.nombre = obj.nombre;
    this.imagen = obj.imagen;
    this.precio = obj.precio;
    this.categoria = obj.precio;
    this.id = obj.id;
    this.cantidad = obj.cantidad;
  }
}

let productos = [
  {
    nombre: "Mate Camionero Premium",
    precio: "6250",
    imagen: "./productsAssets/camioneroPremium.jpeg",
    categoria: "mates",
    id: "1",
    cantidad: "0",
  },
  {
    nombre: "Mate de Algarrobo",
    precio: "4200",
    imagen: "./productsAssets/mateAlgarrobo.jpeg",
    categoria: "mates",
    id: "2",
    cantidad: "0",
  },
  {
    nombre: "Mate Torpedo Premium",
    precio: "6000",
    imagen: "./productsAssets/torpedoPremium.jpeg",
    categoria: "mates",
    id: "3",
    cantidad: "0",
  },
  {
    nombre: "Mate Imperial Premium",
    precio: "9800",
    imagen: "./productsAssets/imperialPremium.jpeg",
    categoria: "mates",
    id: "4",
    cantidad: "0",
  },
  {
    nombre: "Mate de Acero Térmico",
    precio: "4500",
    imagen: "./productsAssets/mateAceroTermico.jpeg",
    categoria: "mates",
    id: "5",
    cantidad: "0",
  },
  {
    nombre: "Termo Stanley Acero Inoxidable",
    precio: "22000",
    imagen: "./productsAssets/stanleyAcero.png",
    categoria: "termos",
    id: "6",
    cantidad: "0",
  },
  {
    nombre: "Termo Stanley Classic",
    precio: "24150",
    imagen: "./productsAssets/stanleyClassic.jpeg",
    categoria: "termos",
    id: "7",
    cantidad: "0",
  },
  {
    nombre: "Termo Lumilagro",
    precio: "4700",
    imagen: "./productsAssets/lumilagro.jpeg",
    categoria: "termos",
    id: "8",
    cantidad: "0",
  },
  {
    nombre: "Bombilla de Alpaca",
    precio: "2130",
    imagen: "./productsAssets/alpaca.jpeg",
    categoria: "bombillas",
    id: "9",
    cantidad: "0",
  },
  {
    nombre: "Bombillón de Alpaca",
    precio: "3300",
    imagen: "./productsAssets/bombillonAlpaca.jpeg",
    categoria: "bombillas",
    id: "10",
    cantidad: "0",
  },
  {
    nombre: "Bombillón Pico de Rey",
    precio: "3500",
    imagen: "./productsAssets/bombillonPicoRey.jpeg",
    categoria: "bombillas",
    id: "11",
    cantidad: "0",
  },
  {
    nombre: "Bombilla Pico de Loro",
    precio: "1600",
    imagen: "./productsAssets/picoLoroAlpaca.jpeg",
    categoria: "bombillas",
    id: "12",
    cantidad: "0",
  },
  {
    nombre: "Yerba Canarias 1/2 KG",
    precio: "650",
    imagen: "./productsAssets/canarias.webp",
    categoria: "yerbas",
    id: "13",
    cantidad: "0",
  },
  {
    nombre: "Yerba Rei Verde 1/2 KG",
    precio: "550",
    imagen: "./productsAssets/reiverde.jpg",
    categoria: "yerbas",
    id: "14",
    cantidad: "0",
  },
];

//STORAGE

const guardarLocal = (clave, valor) => {
  localStorage.setItem(clave, valor);
};

//VARIABLES
const confirmacion = document.querySelector("main");
const contenedorProductos = document.querySelector("#product-container");
const contenedorCarrito = document.querySelector("#carrito-container");
const categoriaElegida = document.querySelector("#categoria-selector");
const contenedorImporte = document.querySelector("#importe-container");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const confirmarCompra = document.querySelector("#confirmar-carrito");
let categoriaValue = "todos";

let carrito = [];

let total = 0;

//EVENT LISTENERS

function cargarEventListeners() {
  //filtro
  categoriaElegida.addEventListener("change", (e) => {
    limpiarProductos();
    categoriaValue = e.target.value;
    mostrarProductos(categoriaValue);
  });

  //agregarproducto
  contenedorProductos.addEventListener("click", agregarProducto);

  //eliminarproducto
  contenedorCarrito.addEventListener("click", eliminarProducto);

  //vaciarcarrito
  vaciarCarrito.addEventListener("click", () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "¿Está seguro que desea vaciar el carrito?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, vaciar carrito",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
        allowOutsideClick: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          carrito = [];
          total = 0;
          contenedorImporte.innerHTML = `<h4>Total: $${total}</h4>`;
          localStorage.clear();
          limpiarHTML();
        }
      });
  });

  //contenido cargado
  document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    total = JSON.parse(localStorage.getItem("total")) || 0;
    mostrarCarrito();
  });

  //confirmar carrito
  confirmarCompra.addEventListener("click", () => {
    if (carrito.length > 0) {
      const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            efectivo: `Efectivo en el local`,
            tarjeta: `Crédito/Débito`,
          });
        }, 1000);
      });

      const { value: pago } = Swal.fire({
        title: "Seleccione la forma de pago:",
        input: "radio",
        inputOptions: inputOptions,
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "Por favor, seleccione el método de pago";
          } else if (value === "efectivo") {
            Swal.fire({
              title: "¡COMPRA EXITOSA!",
              text: `Pase por el local para abonar y retirar su compra.`,
            });
            carrito = [];
            total = 0;
            contenedorImporte.innerHTML = `<h4>Total: $${total}</h4>`;
            localStorage.clear();
            limpiarHTML();
          } else {
            Swal.fire({
              title: "¡COMPRA EXITOSA!",
              text: `Presione 'OK' y será redirigido para realizar el pago.`,
            });
            carrito = [];
            total = 0;
            contenedorImporte.innerHTML = `<h4>Total: $${total}</h4>`;
            localStorage.clear();
            limpiarHTML();
          }
        },
      });
    } else {
      Swal.fire({
        title: "El carrito se encuentra vacío.",
        text: `Agregue productos al carrito antes de continuar al pago.`,
      });
    }
  });
}

//EJECUCIÓN

//obtenerProductos();
mostrarProductos();
cargarEventListeners();

//FUNCIONES

//FUNCIONES FILTRO y MOSTRAR PRODUCTOS
function mostrarProductos(cat) {
  productos.forEach((producto) => {
    if (producto.categoria === cat) {
      const item = document.createElement("col");
      item.innerHTML = `<img src="${producto.imagen}"></img>
        <h5 id="${producto.id}">${producto.nombre}</h5>
        <h6>$<b>${producto.precio}</b></h6>
        <a href="" class="agregar-carrito">AGREGAR AL CARRITO</a>`;

      contenedorProductos.appendChild(item);
    }
  });
}

const limpiarProductos = () => (contenedorProductos.innerHTML = "");

//FUNCIONES COMPRAR

function agregarProducto(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const productoSeleccionado = e.target.parentElement;
    leerDatosProducto(productoSeleccionado);
  }

  Toastify({
    text: "Producto agregado al carrito",
    duration: 2500,
    position: "right",
    gravity: "bottom",
    style: {
      background: "#359144",
    },
  }).showToast();
}

function leerDatosProducto(producto) {
  const infoProducto = {
    imagen: producto.querySelector("img").src,
    nombre: producto.querySelector("h5").innerText,
    precio: producto.querySelector("b").innerText,
    id: producto.querySelector("h5").getAttribute("id"),
    cantidad: 1,
  };

  total += parseInt(infoProducto.precio);

  const existe = carrito.some((producto) => producto.id === infoProducto.id);

  if (existe) {
    const productos = carrito.map((producto) => {
      if (producto.id === infoProducto.id) {
        producto.cantidad++;
        return producto;
      } else {
        return producto;
      }
    });
    carrito = [...productos];
  } else {
    carrito = [...carrito, infoProducto];
  }
  mostrarCarrito();
}

//FUNCIONES MOSTRAR CARRITO

function mostrarCarrito() {
  limpiarHTML();

  carrito.forEach((producto) => {
    const item = document.createElement("tr");
    item.innerHTML = `<td style="width: 20%"><img src="${producto.imagen}"></td>
    <td style="width: 35%"><b>${producto.nombre}</b></td>
    <td style="width: 15%">${producto.cantidad}</td>
    <td style="width: 15%">$${producto.precio}</td>
    <td style="width: 15%">
    <a href="" class="borrar-producto" id="${producto.id}">x</a>
    </td>`;

    contenedorCarrito.appendChild(item);
  });
  contenedorImporte.innerHTML = `<h4>Total: $${total}</h4>`;
  sincronizarStorage();
}

function limpiarHTML() {
  contenedorCarrito.innerHTML = "";
}

//ELIMINAR PRODUCTO DEL CARRITO
function eliminarProducto(e) {
  e.preventDefault();

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "¿Está seguro que desea eliminar el producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      allowOutsideClick: false,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          "Eliminado.",
          "El producto se ha eliminado correctamente.",
          "success"
        );

        if (e.target.classList.contains("borrar-producto")) {
          const productoID = e.target.getAttribute("id");

          carrito.forEach((producto) => {
            if (producto.id == productoID) {
              total -= producto.precio * producto.cantidad;
            }
          });

          carrito = carrito.filter((producto) => producto.id !== productoID);

          mostrarCarrito();
        }
      }
    });
}

//SINCRONIZAR STORAGE
function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  localStorage.setItem("total", JSON.stringify(total));
}
