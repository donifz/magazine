let catatlog = document.querySelector(".catalog");
let card = document.querySelector(".card");
let modal = document.querySelector(".modal");
let modalBlock = document.querySelector(".modal__block");

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

// function cardItem(id, img, text) {
//   let card = document.createElement("li");
//   cardItem.classList.add("card");
//   cardItem.innerHTML = `<img src="img/10341519753246.jpg" alt="test" />
// <div class="card__description">
//   <h3 class="card__title">Dior от Chanel</h3>
//   <div class="card__price">2350 сом</div>`;
//   return card;
// }
// catatlog.appendChild(cardItem);

async function getData(url) {
  let data = await fetch(url);
  if (!data.ok) {
    console.log(data.status);
  }
  return data.json();
}

getData("products.json").then(function (data) {
  console.log(data);
});

// function cardlist(id, img, text) {
//   let cardItem = document.createElement("li");
//   cardItem.classList.add("card");
//   cardItem.innerHTML = `<img src="img/10341519753246.jpg" alt="test" />
// <div class="card__description">
//   <h3 class="card__title">Dior от Chanel</h3>
//   <div class="card__price">2350 сом</div>`;
//   return cardItem;
// }
// catatlog.appendChild(cardList());