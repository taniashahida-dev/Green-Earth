const catagoriesContainer = document.getElementById('Categories-container')
const plantsContainer = document.getElementById('plants-container')


const catagoriesBth = ()=>{
    const url = 'https://openapi.programming-hero.com/api/categories'
    fetch(url)
    .then((res)=> res.json())
    .then((data)=> displayCatagoriesBth(data.categories))
    .catch((e)=>console.log(e));

}
const displayCatagoriesBth =(buttons)=>{
catagoriesContainer.innerHTML = ""
buttons.forEach(button => {
    const div = document.createElement("div")
    div.innerHTML = `
     <button class="btn  w-full">${button.category_name}</button>
    `
    catagoriesContainer.appendChild(div)
});
}


const loadPlant = ()=>{
    const url = 'https://openapi.programming-hero.com/api/plants'
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>displayPlant(data.plants))
}
const displayPlant=(allplants)=>{
plantsContainer.innerHTML=""

allplants.forEach(plant=>{
const div = document.createElement('div')
div.className = "card bg-base-100 shadow-sm"
div.innerHTML= `
 
  <figure>
    <img
     src="${plant.image}"
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

`
plantsContainer.appendChild(div)
})

}
catagoriesBth()
loadPlant()