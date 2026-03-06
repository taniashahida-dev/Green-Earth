const catagoriesContainer = document.getElementById("Categories-container");
const plantsContainer = document.getElementById("plants-container");
const loadingSpinner = document.getElementById("loading-spinner");
const modalContainer = document.getElementById("modal-container");
const cartContainer = document.getElementById('cart-Container')
const totalPrice = document.getElementById('totalPrice')
const emptyCart = document.getElementById('emptyCartMessage')
let cart =[]
// const modal = document.getElementById('modal')

const showLoading = () => {
  loadingSpinner.classList.remove("hidden");
  plantsContainer.innerHTML = "";
};
const hideLoading = () => {
  loadingSpinner.classList.add("hidden");
};

const loadModal = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayModal(data.plants);
};

const displayModal = (details) => {
  modalContainer.innerHTML = `
  <h2 class="card-title text-green-900 font-bold text-3xl" >${details.name}</h2>
 <img class="h-40 md:h-48 w-full object-cover  rounded-sm my-2" src="${details.image}" alt="">
 
 <p class="text-gray-500 font-bold text-2xl">Category: <span class="badge badge-outline bg-purple-950 text-gray-300">${details.category}</span></p>
  <p class="line-clamp-2 text-gray-500 " >${details.description}</p>
  <h3 class="text-3xl font-bold text-green-400 cursor-pointer" >$${details.price}</h3>
  `;

  document.getElementById("modal").showModal();
};

const catagoriesBth = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCatagoriesBth(data.categories))
    .catch((e) => console.log(e));
};
const displayCatagoriesBth = (buttons) => {
  catagoriesContainer.innerHTML = "";
  buttons.forEach((button) => {
    const btn = document.createElement("div");
    btn.innerHTML = `
     <button class="btn  w-full category-btn" onclick="selectCategory(${button.id})">${button.category_name}</button>
    `;
    catagoriesContainer.appendChild(btn);
  });
};

const selectCategory = (categoryId) => {
  const allCategoriesBtn = document.querySelectorAll(
    "#Categories-container button, #trees-btn",
  );
  showLoading();
  // console.log(allCategoriesBtn)
  allCategoriesBtn.forEach((button) => {
    button.classList.remove("text-white", "bg-green-400");
    button.classList.add("btn-outline");
  });

  const clickedBtn = event.currentTarget;
  clickedBtn.classList.add("text-white", "bg-green-400");
  // console.log(clickedBtn)
  const url = `https://openapi.programming-hero.com/api/category/${categoryId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayPlant(data.plants);
      hideLoading();
    });
};

const loadPlant = () => {
  showLoading();
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayPlant(data.plants);
      hideLoading();
    });
};
const displayPlant = (allplants) => {
  plantsContainer.innerHTML = "";

  allplants.forEach((plant) => {
    const div = document.createElement("div");
    div.className = "card bg-base-100 shadow-sm";
    div.innerHTML = `
 
  <figure>
    <img
     src="${plant.image}"
     alt="${plant.name}"
     title="${plant.name}"
     class="h-40 md:h-48 w-full object-cover cursor-pointer"
     onclick="loadModal(${plant.id})"
       />
  </figure>
  <div   class="card-body">
    <h2 class="card-title cursor-pointer" onclick="loadModal(${plant.id})">${plant.name}</h2>
    <p class="line-clamp-2 cursor-pointer" onclick="loadModal(${plant.id})">${plant.description}</p>
    <div  class="badge badge-outline badge-success border border-green-400 cursor-pointer" onclick="loadModal(${plant.id})">${plant.category}</div>
    <div class="card-actions justify-between"> <h3 class="text-xl font-bold text-green-400 cursor-pointer" onclick="loadModal(${plant.id})" >$ ${plant.price}</h3>
      <button class="btn bg-green-400 text-white" onclick="addToCart(${plant.id},'${plant.name}',${plant.price})">Cart</button>
    </div>
  </div>

`;
    plantsContainer.appendChild(div);
  });
};

function addToCart(id, name, price) {
  const existingItem = cart.find((item)=>item.id===id)
  if (existingItem) {
   existingItem.quantity +=1
  } else {
    cart.push({id,
       name,
        price,
        quantity:1})
  }
updateCart()
}
function updateCart() {
  cartContainer.innerHTML = ""
if (cart.length===0) {
  emptyCart.classList.remove('hidden')
  totalPrice.textContent=`$${0}`
  return
}
emptyCart.classList.add('hidden')

  let total = 0;
  cart.forEach((item)=>{
    total += item.price*item.quantity
    const cartItem = document.createElement('div')
    cartItem.className = "card card-body bg-slate-100 font-semibold"
    cartItem.innerHTML=`
    <div class="flex justify-between items-center">
                                <div>
                                    <h2>${item.name}</h2>
                                    <p> $${item.price}× ${item.quantity}</p>
                                </div>
                                <button onclick="removeCart(${item.id})" class="btn btn-ghost">X</button>
                            </div>
                            <p class="text-right font-semibold text-xl">$${item.price*item.quantity}</p>
    `
    cartContainer.appendChild(cartItem)
  })
  totalPrice.innerText = `$${total}`
}
function removeCart(treeid){
  const updateCartElemetn = cart.filter((item)=>item.id != treeid)
  cart = updateCartElemetn
  updateCart()
}

catagoriesBth();
loadPlant();
