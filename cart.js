document.addEventListener("DOMContentLoaded", function () {
 const cartButtons = document.querySelectorAll(".cart-btn");
 const cartAmount = document.querySelector(".cart-amount");
  const addedItems = JSON.parse(localStorage.getItem("myId")) || [];
  const added = JSON.parse(localStorage.getItem("cartData")) || []
  let cartCount = addedItems.length;
  cartAmount.textContent = cartCount;
  let cartShop = document.createElement("div")


 function addToCart(id) {
  //  let cartItemName = document.getElementsByClassName("cart-product-title");
  //  addProductToCart(title, price, image)
  //  addCartClicked(event)
  //  let cartBoxContent = `
  //    <img src=${image} alt="" class="cart-img"/>
  //           <div class="detail-box">
  //           <p class="cart-product-title">${title}</p>
  //             <p class="cart-price">${price}</p>
  //             <div class="buttons">
  //               <i class="fa fa-minus" onclick="decrement(this)" aria-hidden="true"></i>
  //               <div class="cart-quantity">1</div>
  //               <i class="fa fa-plus" onclick="increment(this)"></i>
  //             </div>
  //           </div>
  //           <i class="fa-solid fa-trash cart-remove"></i>
  // `;
  //  cartShop.innerHTML = cartBoxContent;
  //  const cartData = {
  //    cartBoxContent,
  //  };
  //  loadCartData()

  if (!addedItems.includes(id)) {
   cartCount++;
   addedItems.push(id);
  //  added.push(id)
   cartAmount.textContent = cartCount;
  //  cartShop.textContent = cartData.cartBoxContent
  } 
   localStorage.setItem("cartAmount", cartCount)
   localStorage.setItem("myId", JSON.stringify(addedItems))
  //  localStorage.setItem("cartData", JSON.stringify(cartData));
 }


 cartButtons.forEach((button) => {
  button.addEventListener("click", function () {
   const itemId = button.id;
  addToCart(itemId);
  });
 });

});


let cartIcon = document.querySelector(".cart-flex")
let cart = document.querySelector(".cart-content")
let closeCart = document.querySelector("#close-cart")

cartIcon.onclick = () =>{
 cart.classList.add("active")
//  cart.style.display = "block"
//   setTimeout(() => {
//     cart.style.opacity = "1";
//     document.body.style.opacity = "0.5"
//   }, 0);
}
closeCart.onclick = ()=>{
 cart.classList.remove("active")
  // cart.style.display = "none"
  // setTimeout(() => {
  //   cart.style.opacity = "1";
  //   document.body.style.opacity = "1"
  // }, 0);
}

if(document.readyState == "loading"){
 document.addEventListener("DOMContentLoaded", ready)
} else{
 ready()
}

 function ready(){
  let removeCartButton = document.getElementsByClassName("cart-remove")
  for(let i = 0; i < removeCartButton.length; i++){
   let button = removeCartButton[i]
   button.addEventListener('click', removeCartItem)
  }

  let addCart = document.getElementsByClassName("cart-btn");
 for (let i = 0; i < addCart.length; i++){
   let button = addCart[i]
   button.addEventListener('click', addCartClicked)
 }
 }

 function increment(button){
   let cartQuantity = button.parentElement.querySelector(".cart-quantity");
   let currentAmount = parseInt(cartQuantity.textContent);
   currentAmount++;
   cartQuantity.textContent = currentAmount;
   updateTotal();
 }
 function decrement(button){
  let cartQuantity = button.parentElement.querySelector(".cart-quantity")
   let currentAmount = parseInt(cartQuantity.textContent);
   if(currentAmount > 1){
    currentAmount--;
    cartQuantity.textContent = currentAmount;
    updateTotal()
   }
 }


 function removeCartItem(event){
  let buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal()
  //  let cartBoxContent = `
  //    <img src=${image} alt="" class="cart-img"/>
  //           <div class="detail-box">
  //             <p class="cart-product-title">${title}</p>
  //             <p class="cart-price">${price}</p>
  //             <div class="buttons">
  //               <i class="fa fa-minus" onclick="decrement(this)" aria-hidden="true"></i>
  //               <div class="cart-quantity">1</div>
  //               <i class="fa fa-plus" onclick="increment(this)"></i>
  //             </div>
  //           </div>
  //           <i class="fa-solid fa-trash cart-remove"></i>
  // `;
  // cartShop.innerHTML = cartBoxContent;
  //  const cartData = {
  //    cartBoxContent,
  //   //  cartCount,
  //   //  cartShop,
  //   //  cartShopHTML: id,
  //  };
  //  localStorage.setItem("cartData", JSON.stringify(cartData));

 }

// function loadCartData() {
//   const cartAmount = document.querySelector(".cart-amount");
//   let cartShop = document.createElement("div")
//   const cartData = JSON.parse(localStorage.getItem("cartData"));
//   if (cartData) {
//     cartCount = cartData.cartCount;
//     cartAmount.textContent = cartCount;
//     cartShop.innerHTML = cartData.cartBoxContent;
//   }
// }
 
 function addCartClicked(event){
  let button = event.target;
  let shopProduct = button.parentElement;
  let title = shopProduct.getElementsByClassName("product-title")[0].innerText;
  let price = shopProduct.getElementsByClassName("product-price")[0].innerText;
  let image =  shopProduct.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, image);
  updateTotal();
 }

  function addProductToCart(title, price, image){
   let cartShop = document.createElement("div")
   cartShop.classList.add('cart-box');
   let cartItem = document.getElementsByClassName("cart-bigbox")[0];
   let cartItemName = cartItem.getElementsByClassName("cart-product-title");
   for(let i = 0; i <  cartItemName.length; i++){
    if(cartItemName[i].innerText == title){
      alert("Item have already been added")
      return; 
    }
   }
  let cartBoxContent = `
     <img src=${image} alt="" class="cart-img"/>
            <div class="detail-box">
              <p class="cart-product-title">${title}</p>
              <p class="cart-price">${price}</p>
              <div class="buttons">
                <i class="fa fa-minus" onclick="decrement(this)" aria-hidden="true"></i>
                <div class="cart-quantity">1</div>
                <i class="fa fa-plus" onclick="increment(this)"></i>
              </div>
            </div>
            <i class="fa-solid fa-trash cart-remove"></i>
  `;
  cartShop.innerHTML = cartBoxContent;
  cartItem.append(cartShop);
  cartShop.getElementsByClassName("cart-remove")[0].addEventListener('click', removeCartItem)
  }

 function updateTotal(){
  let cartBigBox = document.getElementsByClassName("cart-bigbox")[0];
  let cartBoxes = cartBigBox.getElementsByClassName("cart-box");
  let total = 0;
  for(var i = 0; i < cartBoxes.length; i++){
   let cartBox = cartBoxes[i];
   let priceElement = cartBox.getElementsByClassName("cart-price")[0];
   let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
   let quantity = parseInt(quantityElement.textContent);
   let price = parseFloat(priceElement.innerText.replace("$", ""));
   total = total + (price * quantity);
   total = Math.round(total * 100) / 100;

     document.getElementsByClassName("total-price")[0].innerText = "$" + total;
  }
 }
