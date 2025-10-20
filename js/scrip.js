const data = "./data.json";  // ✅ Ruta correcta desde el HTML
const containerProduct = document.querySelector(".container__products");

async function cargarDatos() {
  try {
    const response = await fetch(data);
    if (!response.ok) throw new Error("Error al cargar el JSON");
    const datos = await response.json();
    render(datos);
  } catch (error) {
    console.log("error:", error.message);
  }
}


function render(products) {
  
  let htmlContent = "";
  
  for (let product of products) {
    console.log("Cargando imagen:", product.image.desktop);
    
    htmlContent += `
      <article class="product">
        <picture class="product__image">
          <source media="(min-width: 1201px)" srcset="${product.image.desktop}">
          <source media="(min-width: 650px) and (max-width: 1200px)" srcset="${product.image.tablet}">
          <source media="(max-width: 649px)" srcset="${product.image.mobile}">
          <img src="${product.image.desktop}" alt="${product.name}" loading="lazy">
        </picture>
        <div class="product__info">
          <p class="product__type">${product.category}</p>
          <h3 class="product__name">${product.name}</h3>
          <p class="product__price">$${product.price.toFixed(2)}</p>
          <button class="product__add-to-cart" aria-label="Añadir ${product.name} al carrito">
            <img src="./assets/images/icon-add-to-cart.svg" alt="Cart" aria-hidden="true" class="icon-cart">
            <span>Add to Cart</span>
          </button>
        </div>
      </article>`;
  }
  
  containerProduct.innerHTML+= htmlContent;
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', cargarDatos);
