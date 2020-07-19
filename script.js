let catatlog = document.querySelector(".catalog");
let recycleBtn = document.querySelector(".recycle__btn");
let modal = document.querySelector(".modal");
let modalBlock = document.querySelector(".modal__block");
let menuItems = document.querySelectorAll(".menu__link");
let recycle = document.querySelector(".recycle");
let recycleBlock = document.querySelector(".recycle__block");
let recycleClose = document.querySelector(".recycle__close");
let recycleContent = document.querySelector(".recycle__content");
let cartTotalPrice = document.querySelector(".total__price");

let allCards = [];
let load = [];

// close modal

modal.addEventListener("click", function (evt) {
  let target = evt.target;
  if (target.closest(".modal__close") || !target.closest(".modal__block")) {
    modal.classList.add("hide");
  }
});

// close cart
recycleBtn.addEventListener("click", function () {
  recycle.classList.toggle("recycle__hide");
  // recycle.classList.remove("hide");
});

recycle.addEventListener("click", function (evt) {
  if (!evt.target.closest(".recycle__block")) {
    this.classList.toggle("recycle__hide");
  }
});

// get json data

async function getData(url) {
  let data = await fetch(url);
  if (!data.ok) {
    console.log(data.status + "сто то не так");
  }
  return data.json();
}

getData("products.json").then(function (data) {
  console.log(data);
});

// сохраняем все данные в local
function saveData(products) {
  return localStorage.setItem("products", JSON.stringify(products));
}

// render all product cards

function renderCard(products) {
  let card = "";
  products.forEach((item) => {
    card += `<li class="card" >
    <img
      src=${item.image}
      alt="test"
    />
    <div class="card__description">
      <h3 data-id=${item.id} class="card__title">${item.text}</h3>
      <div class="card__price">${item.price} сом</div>
    </div>
  </li>`;
    return card;
  });
  catatlog.innerHTML = card;
}

// событие на каждый card

function getCards() {
  let cardItem = document.querySelectorAll(".card");
  cardItem.forEach((item) => {
    item.addEventListener("click", function () {
      modal.classList.remove("hide");
      createModal(item);
    });
  });
}

// create modal

function createModal(product) {
  let cardTitle = product.querySelector(".card__title");
  let img = product.querySelector("img");
  let text = product.querySelector(".card__title");
  let price = product.querySelector(".card__price");
  let data = JSON.parse(localStorage.getItem("cart")) || [];

  // check for  in cart product
  let dis = "";
  let gray = "";
  data.forEach((item) => {
    if (item.id == cardTitle.dataset.id) {
      dis = "disabled";
      gray = 'style="background-color:gray"';
    }
  });

  modal.innerHTML = `<div class="modal__block">
    <h2 class="modal__header">Купить</h2>
    <div class="modal__content">
      <div>
        <img class="modal__image modal__image-item" src=${img.src} alt="test" />
      </div>
      <div class="modal__description">
        <h3 class="modal__header-item" >${text.textContent}</h3>
        <p>
          Описание:
          <span class="modal__description-item">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet,
            aut deleniti dolores ex explicabo fugit hic?</span>
        </p>
        <p>Цена: <span class="modal__cost-item">${price.textContent}</span></p>
        <button ${dis} ${gray} class="btn buy__btn" data-id=${cardTitle.dataset.id}>В корзину</button>
      </div>
    </div>
    <button  class="modal__close">&#10008;</button>
  </div>`;
  cartBtn(modal);
  console.log(data);
}
// открывшую модалку передаем в новую функцию
// находим проукцию с dataset.id из local
function cartBtn(modal) {
  let modalBtn = modal.querySelector(".buy__btn");
  let data = JSON.parse(localStorage.getItem("products"));

  modalBtn.addEventListener("click", function () {
    let cartId = data.find((id) => {
      return modalBtn.dataset.id == id.id;
    });
    modal.classList.add("hide");
    cartStorage(cartId);
  });
}
// создаем данные в local для корзинки cart

function cartStorage(cart) {
  allCards.push(cart);
  console.log(allCards);
  localStorage.setItem("cart", JSON.stringify(allCards));
  load = JSON.parse(localStorage.getItem("cart")) || [];
  createCart(load);
}
load = JSON.parse(localStorage.getItem("cart")) || [];

// получаем данные  из local

function createCart(arr) {
  recycleContent.innerHTML = "";
  let product = "";

  arr.forEach((item) => {
    product += `<div class="recycle__product">
    <img class="product__img" src=${item.image} />
    <div class="product__description">
        <h3 class="product__text">${item.text}</h3>
        <p class="product__price">${item.price} Сом</p>
        <p data-id=${item.id} class="product__del">Удалить</p>
    </div>
</div>
`;
  });
  recycleContent.insertAdjacentHTML("afterbegin", product);
  cartTotal(load);
}
// Итого
function cartTotal() {
  let all = load.reduce((acc, cure) => {
    return acc + Number(cure.price);
  }, 0);
  console.log(all);
  cartTotalPrice.textContent = "Итого: " + all + " Сом";
}

function deleteProd() {
  let productDel = document.querySelectorAll(".product__del");

  productDel.forEach((item) => {
    item.addEventListener("click", function () {
      let deletFind = load.find((id) => {
        return id.id == item.dataset.id;
      });
      item.parentElement.parentNode.remove();
    });
  });
}

// меню

function filter(products) {
  menuItems.forEach((menu) => {
    menu.addEventListener("click", function (evt) {
      let target = evt.target;
      let category = [];
      if (this.dataset.category == "all") {
        renderCard(products);
        getCards(products);
      } else {
        category = products.filter((product) => {
          return menu.dataset.category === product.category;
        });
        renderCard(category);
        getCards(category);
      }
    });
  });
}

// поиск

function searchBag(products) {
  let searchInput = document.querySelector("#search");
  searchInput.addEventListener("input", function () {
    let name = products.filter((item) => {
      return item.text.toLowerCase().indexOf(this.value.toLowerCase()) !== -1;
    });
    renderCard(name);
    getCards(name);
  });
}

getData("products.json").then(function (data) {
  renderCard(data);
  saveData(data);
  filter(data);
  searchBag(data);

  createCart(load);
  getCards();
  deleteProd();
});
// .then(() => {});
