var weight = 0
let input_name = document.querySelector("#poke-name")
let weight_total = document.querySelector("#total-value")
let search_button = document.querySelector("#poke-search")
//let total = document.querySelector("#total-value")

//total.textContent = 0

search_button.addEventListener("click", (_) => {
  if(input_name.value != ""){
        input_name.classList.remove("warning")
        add_item_to_ul(input_name.value, total);
   }else{
        input_name.classList.add("warning")
        input_name.classList.add("warning")
  }
})

function get_element_li (poke_data) {
  let li = document.createElement('li')
  let poke_name = document.createElement('p')
  let poke_weight = document.createElement('p')
  let poke_height = document.createElement('p')
  let poke_types = document.createElement('ul')
  let poke_exp = document.createElement('p')
  let image = document.createElement('img')
  let button = document.createElement('button')

  button.classList.add("remove")
  button.innerText = "remove"
  poke_name.textContent = poke_data.name
  poke_weight.textContent = poke_data.weight
  poke_height.textContent = poke_data.height
  poke_data.types.forEach((type) =>{
    let poke_type = document.createElement('li')
    poke_type.textContent = type.type.name
    poke_types.appendChild(poke_type)
  });
  poke_exp.textContent = poke_data.base_experience
  image.src = poke_data.sprites.front_default

  button.addEventListener("click", (_) => {
    remove_item(li)
  });

  li.appendChild(poke_name)
  li.appendChild(image)
  li.appendChild(poke_weight)
  li.appendChild(poke_height)
  li.appendChild(poke_types)
  li.appendChild(poke_exp)
  li.appendChild(button);
  return li
}

async function get_pokemon(name){
    try{
        const res = await axios.get('http://localhost:3000/pokemon/'+ name)
        return res.data
    } catch(e){
        let div = document.createElement('div')
        let span = document.createElement('span')
        let body = document.body
        div.classList.add("bar")
        span.classList.add("error")
        span.addEventListener("click", function () {
            var bar = this.parentElement
            bar.parentElement.removeChild(bar)
        });
        span.innerText = "Could not find pokemon, please try again with a valid name or id"
        div.appendChild(span)
        body.appendChild(div)
    }
};

function add_item_to_ul(name, total){
  (async () => {
    let poke_data  = await get_pokemon(name)
    //weight += parseInt(poke_data.weight,10)
    let li = get_element_li(poke_data)
    let ul = document.getElementById("list")
    ul.appendChild(li)
    //total.textContent = weight
  })()
}

let remove_item  = (node_to_remove) => {
  let ul = document.getElementById("list")
  //weight -= parseInt(node_to_remove.children[1].innerText)
  //total_value.textContent = weight
  ul.removeChild(node_to_remove)
}
