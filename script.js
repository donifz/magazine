let catatlog = document.querySelector(".catalog");
let recycleBtn = document.querySelector(".recycle__btn");
let modal = document.querySelector(".modal");
let modalBlock = document.querySelector(".modal__block");
let menuItems = document.querySelectorAll(".menu__link");
let recycle = document.querySelector(".recycle");
let recycleBlock = document.querySelector(".recycle__block");
let recycleClose = document.querySelector(".recycle__close");
let allCards = [];

modal.addEventListener("click", function (evt) {
  let target = evt.target;
  if (target.closest(".modal__close") || !target.closest(".modal__block")) {
    modal.classList.add("hide");
  }
});

recycleBtn.addEventListener("click", function () {
  recycle.classList.toggle("recycle__hide");
  // recycleBlock.classList.add();
});

recycleClose.addEventListener("click", function () {
  recycle.classList.toggle("recycle__hide");
});

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

function renderCard(products) {
  let card = "";
  products.forEach((item) => {
    card += `<li class="card">
    <img
      src=${item.image}
      alt="test"
    />
    <div class="card__description">
      <h3 class="card__title">${item.text}</h3>
      <div class="card__price">${item.price} сом</div>
    </div>
  </li>`;
    return card;
  });
  catatlog.innerHTML = card;
}

function getCards() {
  let cardItem = [...document.querySelectorAll(".card")];
  cardItem.forEach((item) => {
    item.addEventListener("click", function (evt) {
      let target = evt.target;
      modal.classList.remove("hide");
      createModal(item);
    });
  });
}
function createModal(product) {
  let img = product.querySelector("img");
  let text = product.querySelector(".card__title");
  let price = product.querySelector(".card__price");
  modal.innerHTML = `<div class="modal__block">
    <h2 class="modal__header">Купить</h2>
    <div class="modal__content">
      <div>
        <img class="modal__image modal__image-item" src=${img.src} alt="test" />
      </div>
      <div class="modal__description">
        <h3 class="modal__header-item">${text.textContent}</h3>
        
        <p>
          Описание:
          <span class="modal__description-item">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet,
            aut deleniti dolores ex explicabo fugit hic?</span>
        </p>
        <p>Цена: <span class="modal__cost-item">${price.textContent}</span></p>
        <button class="btn">Купить</button>
      </div>
    </div>
    <button class="modal__close">&#10008;</button>
  </div>`;
}

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

function saveData(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

getData("products.json")
  .then(function (data) {
    renderCard(data);
    saveData(data);
    filter(data);
    searchBag(data);
  })
  .then(() => {
    getCards();
  });
