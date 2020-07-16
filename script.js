let catatlog = document.querySelector(".catalog");

let modal = document.querySelector(".modal");
let modalBlock = document.querySelector(".modal__block");
let menuItems = document.querySelectorAll(".menu__link")
let allCards = [];



catatlog.addEventListener("click", function (evt) {
  let target = evt.target;
  if (target.closest(".card")) {
    modal.classList.remove("hide");
  }
});

modal.addEventListener("click", function (evt) {
  let target = evt.target;
  if (target.closest(".modal__close") || !target.closest(".modal__block")) {
    modal.classList.add("hide");
  }
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

function renderCard(products, filtredProducts) {
  let card = '';
  products.forEach(item => {
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

  return cardItem
}

function filter(products) {

  menuItems.forEach(menu => {
    menu.addEventListener('click', function (evt) {
      let category = []
      category = products.filter(product => {

        return menu.dataset.category === product.category

      });
      renderCard(category)
    });
  });
}


function saveData(products) {
  localStorage.setItem("products", JSON.stringify(products));
}




getData("products.json").then(function (data) {

  renderCard(data);
  saveData(data);
  filter(data);

}).then(() => {
  getCards();
});