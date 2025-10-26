const url = "./data.json"; // ✅ Ruta correcta desde el HTML
const containerProduct = document.querySelector(".products");

async function loadData() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("error al cargar el json");
    const data = await response.json();
    render(data);
  } catch (error) {
    console.log("error:", error.message);
  }
}
document.addEventListener("DOMContentLoaded", (event) => {
  loadData();
});

function randomId() {
  if (crypto.randomUUID) {
    return "item_" + crypto.randomUUID();
  }
}

function render(data) {
  let html = "";

  for (let product of data) {
    const productId = randomId();
    html += `
        <article class="products__item" id="${productId}">
            <picture class="products__item__image">
              <source srcset="${product.image.desktop}" media="(min-width:1024)" />
              <source srcset="${product.image.tablet}" media="(min-width: 600px)" />
              <img src="${product.image.mobile}" alt="${product.name}" class="responsive-image" />
            </picture>
            <section class="products__item__add-to">
              <div class="add-to__group" onclick="activeInput('${productId}')">
                <img
                  src="./assets/images/icon-add-to-cart.svg"
                  alt="Cart"
                  class="add-to__image"
                />
                <span class="add-to__text">Add to Cart</span>
              </div>
               <div class="add-to__input">
              <button onclick="changeValue('${productId}' , -1)" class="btn"><img src="./assets/images/icon-decrement-quantity.svg" alt="Decrease" /></button>
              <input type="number" value="1" max="100"/>
              <button onclick="changeValue('${productId}' , 1)" class="btn"><img src="./assets/images/icon-increment-quantity.svg" alt="Increase" /></button>
               </div>
            </section>
            <div class="products__item__description">
              <span class="description__category">${product.category}</span>
              <span class="description__name">${product.name}</span>
              <span class="description__price">$${product.price}</span>
            </div>
        </article>`;
  }

  containerProduct.innerHTML = html; // ✅ Asignar todo de una vez
}

function activeInput(id) {
  let element = containerProduct.querySelector(`#${id}`);
  element.classList.add("active");
}

function changeValue(id, num) {
  let parent = containerProduct.querySelector(`#${id}`);
  let input = containerProduct.querySelector(`#${id} input[type="number"]`);

  if (input) {
    let currentValue = Number(input.value) || 1;
    let newValue = currentValue + num;

    if (newValue < 1) {
      parent.classList.remove("active");
    } else {
      input.value = newValue;
    }
  }
}
