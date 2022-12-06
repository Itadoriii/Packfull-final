


function displayProducts(productList) {
    let productsHTML = '';
    productList.forEach(element => {
        productsHTML +=
        `<div class="card" id="${element.name}">
        <img src="${element.imagen}" alt="${element.name}" style="width:100%">
        <h1>${element.name}</h1>
        <p>$${element.precio}</p>
        <p><button onclick="displayInformation('${element.name}','${element.imagen}','${element.precio}','${element.descripcion}')" id="botoncarrito" >Detalles del Producto</button></p>
        </div>`
    });
    document.getElementById('page-content').innerHTML = productsHTML;

}

window.onload = async()=>{
	const productos = await(await fetch("/api/productos")).json();
	console.log(productos);
	displayProducts(productos);
} 	

function displayInformation(name,imagen,precio,descripcion,){
    let informacion = "";
    informacion +=
        `<div class ="product">
            <div class ="img-producto">
            <img src="${imagen}" alt="${name}" style="width:100%">
            </div>
            <div class ="informacion">
			<a>flecha
            <h1>${name}</h1>
            <h2>Precio unitario neto:${precio}</h2>
            <h2>Descripcion:${descripcion}</h2>
            </div>
        </div>`
	document.getElementById('page-content').innerHTML = informacion;
    
}
const btnDepartamentos = document.getElementById('btn-departamentos'),
	  btnCerrarMenu = document.getElementById('btn-menu-cerrar'),
	  grid = document.getElementById('grid'),
	  contenedorEnlacesNav = document.querySelector('#menu .contenedor-enlaces-nav'),
	  contenedorSubCategorias = document.querySelector('#grid .contenedor-subcategorias'),
	  esDispositivoMovil = () => window.innerWidth <= 800;

btnDepartamentos.addEventListener('mouseover', () => {
	if(!esDispositivoMovil()){
		grid.classList.add('activo');
	}
});

grid.addEventListener('mouseleave', () => {
	if(!esDispositivoMovil()){
		grid.classList.remove('activo');
	}
});

document.querySelectorAll('#menu .categorias a').forEach((elemento) => {
	elemento.addEventListener('mouseenter', (e) => {
		if(!esDispositivoMovil()){
			document.querySelectorAll('#menu .subcategoria').forEach((categoria) => {
				categoria.classList.remove('activo');
				if(categoria.dataset.categoria == e.target.dataset.categoria){
					categoria.classList.add('activo');
				}
			});
		};
	});
});

// EventListeners para dispositivo movil.
document.querySelector('#btn-menu-barras').addEventListener('click', (e) => {
	e.preventDefault();
	if(contenedorEnlacesNav.classList.contains('activo')){
		contenedorEnlacesNav.classList.remove('activo');
		document.querySelector('body').style.overflow = 'visible';
	} else {
		contenedorEnlacesNav.classList.add('activo');
		document.querySelector('body').style.overflow = 'hidden';
	}
});

// Click en boton de todos los departamentos (Para version movil).
btnDepartamentos.addEventListener('click', (e) => {
	e.preventDefault();
	grid.classList.add('activo');
	btnCerrarMenu.classList.add('activo');
});

// Boton de regresar en el menu de categorias
document.querySelector('#grid .categorias .btn-regresar').addEventListener('click', (e) => {
	e.preventDefault();
	grid.classList.remove('activo');
	btnCerrarMenu.classList.remove('activo');
});

document.querySelectorAll('#menu .categorias a').forEach((elemento) => {
	elemento.addEventListener('click', (e) => {
		if(esDispositivoMovil()){
			contenedorSubCategorias.classList.add('activo');
			document.querySelectorAll('#menu .subcategoria').forEach((categoria) => {
				categoria.classList.remove('activo');
				if(categoria.dataset.categoria == e.target.dataset.categoria){
					categoria.classList.add('activo');
				}
			});
		}
	});
});

// Boton de regresar en el menu de categorias
document.querySelectorAll('#grid .contenedor-subcategorias .btn-regresar').forEach((boton) => {
	boton.addEventListener('click', (e) => {
		e.preventDefault();
		contenedorSubCategorias.classList.remove('activo');
	});
});

btnCerrarMenu.addEventListener('click', (e)=> {
	e.preventDefault();
	document.querySelectorAll('#menu .activo').forEach((elemento) => {
		elemento.classList.remove('activo');
	});
	document.querySelector('body').style.overflow = 'visible';
});

/**
 * CARRUSEL
 * Creator           : Coding's Time
 * Youtube Channel   : https://www.youtube.com/channel/UC6dnKqrImGWqMb9ty1n0Ziw
 * Github Profile    : https://github.com/codingstime
 */

 let onSlide = false;

 window.addEventListener("load", () => {
	autoSlide();
 
	const dots = document.querySelectorAll(".carousel_dot");
	for (let i = 0; i < dots.length; i++) {
	   dots[i].addEventListener("click", () => slide(i));
	}
 
	const buttonPrev = document.querySelector(".carousel_button__prev");
	const buttonNext = document.querySelector(".carousel_button__next");
	buttonPrev.addEventListener("click", () => slide(getItemActiveIndex() - 1));
	buttonNext.addEventListener("click", () => slide(getItemActiveIndex() + 1));
 })
 
 function autoSlide() {
	setInterval(() => {
	   slide(getItemActiveIndex() + 1);
	}, 3000); // slide speed = 3s
 }
 
 function slide(toIndex) {
	if (onSlide)
	   return;
	onSlide = true;
 
	const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
	const itemActive = document.querySelector(".carousel_item__active");
	const itemActiveIndex = itemsArray.indexOf(itemActive);
	let newItemActive = null;
 
	if (toIndex > itemActiveIndex) {
	   // check if toIndex exceeds the number of carousel items
	   if (toIndex >= itemsArray.length) {
		  toIndex = 0;
	   }
 
	   newItemActive = itemsArray[toIndex];
 
	   // start transition
	   newItemActive.classList.add("carousel_item__pos_next");
	   setTimeout(() => {
		  newItemActive.classList.add("carousel_item__next");
		  itemActive.classList.add("carousel_item__next");
	   }, 20);
	} else {
	   // check if toIndex exceeds the number of carousel items
	   if (toIndex < 0) {
		  toIndex = itemsArray.length - 1;
	   }
 
	   newItemActive = itemsArray[toIndex];
 
	   // start transition
	   newItemActive.classList.add("carousel_item__pos_prev");
	   setTimeout(() => {
		  newItemActive.classList.add("carousel_item__prev");
		  itemActive.classList.add("carousel_item__prev");
	   }, 20);
	}
 
	// remove all transition class and switch active class
	newItemActive.addEventListener("transitionend", () => {
	   itemActive.className = "carousel_item";
	   newItemActive.className = "carousel_item carousel_item__active";
	   onSlide = false;
	}, {
	   once: true
	});
 
	slideIndicator(toIndex);
 }
 
 function getItemActiveIndex() {
	const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
	const itemActive = document.querySelector(".carousel_item__active");
	const itemActiveIndex = itemsArray.indexOf(itemActive);
	return itemActiveIndex;
 }
 
 function slideIndicator(toIndex) {
	const dots = document.querySelectorAll(".carousel_dot");
	const dotActive = document.querySelector(".carousel_dot__active");
	const newDotActive = dots[toIndex];
 
	dotActive.classList.remove("carousel_dot__active");
	newDotActive.classList.add("carousel_dot__active");
 }
 function insertbusqueda(productList,categoria) {
    let productsHTML = '';
    productList.forEach(element => {
		if(element.busqueda==categoria){
		productsHTML +=
        `<div class="card" id="${element.name}">
        <img src="${element.imagen}" alt="${element.name}" style="width:100%">
        <h1>${element.name}</h1>
        <p>$${element.precio}</p>
        <p><button onclick="displayInformation('${element.name}','${element.imagen}','${element.precio}','${element.descripcion}')" id="botoncarrito" >Detalles del Producto</button></p>
        </div>`
		}
    
    });
    document.getElementById('page-content').innerHTML = productsHTML;

}
 // seccion link 
 document.getElementById('loadautoarmables').addEventListener('click',function(e){
	e.preventDefault();
	let productsHTML = '';
	document.getElementById('page-content').innerHTML = productsHTML;
	productsHTML +=
		`<div class="card" id="Autoarmables">
        <img src="img/Productos/autoarmables.png" alt="Autoarmables" style="width:100%">
        <h1>Autoarmables</h1>
        <p>$7000</p>
        <p><button onclick="displayInformation('Autoarmables','img/Productos/autoarmables.png','7000','muy bonita')" id="botoncarrito" >Detalles del Producto</button></p>
        </div>`
	productsHTML +=
		`<div class="card" id="Caja generica">
        <img src="img/Productos/caja generica.jpg" alt="Autoarmables" style="width:100%">
        <h1>Caja generica</h1>
        <p>$7000</p>
        <p><button onclick="displayInformation('Autoarmables','img/Productos/caja generica.jpg','7000','muy bonita')" id="botoncarrito" >Detalles del Producto</button></p>
        </div>`
	document.getElementById('page-content').innerHTML = productsHTML;
  	});


 document.getElementById('loadpersonalizadas').addEventListener('click',function(e){
	e.preventDefault();
	let productsHTML = '';
	document.getElementById('page-content').innerHTML = productsHTML;
	productsHTML +=
		`<div class="card" id="Caja Spiderman">
        <img src='img/Productos/caja spiderman.png' alt="Caja Spiderman" style="width:100%">
        <h1>Caja Spiderman</h1>
        <p>$12000</p>
        <p><button onclick="displayInformation('Caja Spiderman','img/Productos/caja spiderman.png','7000','muy bonita')" id="botoncarrito" >Detalles del Producto</button></p>
        </div>`
	productsHTML +=
		`<div class="card" id="Caja AMONG US">
        <img src="img/Productos/caja amongus.png" alt="Caja Among us" style="width:100%">
        <h1>Caja AMONG US</h1>
        <p>$12000</p>
        <p><button onclick="displayInformation('Caja AMONG US','img/Productos/caja amongus.png','12000','muy bonita')" id="botoncarrito" >Detalles del Producto</button></p>
        </div>`
	document.getElementById('page-content').innerHTML = productsHTML;
  	});


 document.getElementById('loadcalendarios').addEventListener('click',function(e){
	e.preventDefault();
	let productsHTML = '';
	document.getElementById('page-content').innerHTML = productsHTML;
	productsHTML +=
		`<div class="card" id="Calendario">
        <img src="img/Productos/calendario1.jpg" alt="Autoarmables" style="width:100%">
        <h1>Calendario 1</h1>
        <p>$50</p>
        <p><button onclick="displayInformation('Autoarmables','img/Productos/calendario1.jpg','50','2022/2023')" id="botoncarrito" >Detalles del Producto</button></p>
        </div>`
	
	document.getElementById('page-content').innerHTML = productsHTML;
  	});


 document.getElementById('loadantigrasa').addEventListener('click',function(e){
	e.preventDefault();
	let productsHTML = '';
	document.getElementById('page-content').innerHTML = productsHTML;
	productsHTML +=
		`<div class="card" id="Papel antigrasa">
        <img src="img/Productos/papel antigrasa.png" alt="Autoarmables" style="width:100%">
        <h1>Papel antigrasa</h1>
        <p>$7000</p>
        <p><button onclick="displayInformation('Papel antigrasa','img/Productos/papel antigrasa.png','7000','2022/2023')" id="botoncarrito" >Detalles del Producto</button></p>
        </div>`
	
	document.getElementById('page-content').innerHTML = productsHTML;
  	});


