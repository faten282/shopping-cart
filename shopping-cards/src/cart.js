let label = document.getElementById("label");

let shoppingCard = document.getElementById("shopping-cart");

let basket =JSON.parse(localStorage.getItem("data"))|| [];

let calculation = () =>{
    let cardIcon = document.getElementById("cartAmount");
     cardIcon.innerHTML=basket.map((x)=>x.item).reduce((x ,y )=>x+y,0);
    
    }
    calculation();


let generateCartItems = () =>{

  if(basket.length !==0){
 return shoppingCard.innerHTML = basket.map((x)=>{
    let {id , item} = x ;
    let search = shopitemsDate.find((y) => y.id===id) || [];
 return `
 <div class="shopping-cart" id="shopping-cart"></div>

 <div class="cart-item">
 <img src=${search.Img} alt="">

 <div class="info">
<div class="title-price-x">
<div class="cart-info">
    <p>${search.name}</p>
    <p class="price">$ ${search.price}</p>
</div>

<i class="bi bi-x-lg" onclick="removeItem(${id})"></i>
</div>
<div class="card-btns"></div>
    <h3 class="desc"></h3>
    <div class="buttons">
    <i  onclick="decrement(${id})" class="bi bi-dash-lg"></i>
    <div id=${id} class="quantity">${item}</div>
    <i  onclick="increment(${id})" class="bi bi-plus-lg"></i> 
</div>
   
 
  <h3>$ ${item*search.price}</h3>
   </div>
 </div>

`;


 }).join("");
  }
  else{
   shoppingCard.innerHTML=``
   label.innerHTML=`
   <h2>Cart is Empty <h2>
   <a href="index.html"> 
   <button class="HomeBtn">Back to home</button>
   </a>
   `
   ;

  }


    }

    generateCartItems();

    
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
    generateCartItems();
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
generateCartItems();
localStorage.setItem("data", JSON.stringify(basket));     
};

let update = (id) =>{
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmoun();
};

let removeItem =(id)=>{

let selecteditem = id ;
//console.log(selecteditem.id);
basket= basket.filter((x)=>x.id !== selecteditem.id);
localStorage.setItem("data", JSON.stringify(basket));  
generateCartItems();
totalAmoun();
calculation();
}

let clearcart = ()=>{
    basket = [];
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket)); 
    calculation();
}


let totalAmoun = () =>{
if(basket.length !==0)
{
    let amount = basket.map((x)=>{ 
        let {item , id,price} = x;
        let search = shopitemsDate.find((y) => y.id===id) || [];
        return item * search.price;
    }).reduce((x,y)=> x+y,0);

  label.innerHTML = `
  <h2>Total Bill: $ ${amount}</h2>
  <button class="checkout">Checkout</button>
  <button class="removeall" onclick="clearcart()">Clear Cart</button>
  `;
}
else return;
}
totalAmoun();