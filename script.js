const catagoriesContainer = document.getElementById("Categories-container");
const plantsContainer = document.getElementById("plants-container");
const loadingSpinner = document.getElementById("loading-spinner");

const showLoading = () => {
  loadingSpinner.classList.remove("hidden");
  plantsContainer.innerHTML = "";
};
const hideLoading = () => {
  loadingSpinner.classList.add("hidden");
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
showLoading()
  const allCategoriesBtn = document.querySelectorAll(
    "#Categories-container button, #trees-btn"
  );
// console.log(allCategoriesBtn)
  allCategoriesBtn.forEach((button) => {
    button.classList.remove("text-white", "bg-green-400");
  });

  const clickedBtn = event.currentTarget;
  clickedBtn.classList.add("text-white", "bg-green-400");
  console.log(clickedBtn)
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
     class="h-48 w-full object-cover"
       />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${plant.name}</h2>
    <p class="line-clamp-2">${plant.description}</p>
    <div class="badge badge-outline badge-success">${plant.category}</div>
    <div class="card-actions justify-between"> <h3 class="text-xl font-bold text-green-400">$ ${plant.price}</h3>
      <button class="btn bg-green-400 text-white ">Cart</button>
    </div>
  </div>

`;
    plantsContainer.appendChild(div);
  });
};
catagoriesBth();
loadPlant();
