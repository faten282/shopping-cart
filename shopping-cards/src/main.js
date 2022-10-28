
let shop = document.getElementById('cards');

let basket =JSON.parse(localStorage.getItem("data"))|| [];


let generateShop =()=> {
return (shop.innerHTML = shopitemsDate.map((x)=>{
    let {id , name , price ,desc , Img} = x;
    let search = basket.find((x)=> x.id===id)||[];
 return `
<div  id=pridect-id-${id} class="card">
<div class="img-card">
  <img src="${Img}" alt="" >
</div>
<div class="card-info">
<h2 class="card-title">${name}</h2>
<p class="card-subtitle">${desc}</p>
<div class="price-q">
<h2>$ ${price}</h2>
<div class="buttons">
<i  onclick="decrement(${id})" class="bi bi-dash-lg"></i>
<div id=${id} class="quantity">${search.item===undefined?  0:search.item}</div>
<i  onclick="increment(${id})" class="bi bi-plus-lg"></i> 
    </div>
  </div>
</div>

</div>

`
}).join(""));
}
generateShop();


let increment = (id)=>{
    let selectedItem = id ;
    let search = basket.find((x)=> x.id===selectedItem.id);
     if(search===undefined){
       basket.push({
       id:selectedItem.id ,
       item:1});
     }
    else{
        search.item +=1;
    }
    update(selectedItem.id);
localStorage.setItem("data", JSON.stringify(basket));   
};

let decrement = (id)=>{

    let selectedItem = id ;
    let  search = basket.find((x)=> x.id === selectedItem.id);
    if(search===undefined)return;
    else if(search.item === 0) return;
    else{
        search.item -=1;
    }
    update(selectedItem.id);
    basket = basket.filter((x)=>x.item !== 0);  
    localStorage.setItem("data", JSON.stringify(basket));     

};
let update = (id) =>{
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation = () =>{
let cardIcon = document.getElementById("cartAmount");
 cardIcon.innerHTML=basket.map((x)=>x.item).reduce((x ,y )=>x+y,0);

}
calculation();