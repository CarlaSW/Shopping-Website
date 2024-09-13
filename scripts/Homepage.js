import {cart,addToCart} from'../scripts/cart.js';
import { products } from '../scripts/products.js';

let productsHtml=``;
products.forEach((product,index)=>{
    productsHtml+=`
            <div class="product-preview">
                <div class="product-image">
                    <img class="product-icon" src=${product.image} alt="${product.name}-icon">
                </div>
                <div class="product-info">
                    <p class="product-name">${product.name}</p>
                    <div class="rating">
                        <img class="rating-stars-icon" src="images/rating-${product.rating.stars}.jpg"> 
                        <p class="rating-count">${product.rating.count}</p>
                    </div>
                    <p class="product-price">$${product.price/100}</p>
                </div>
                <div class="add-to-cart">
                    <button class="add-to-cart-button js-add-to-cart-button" data-product-id="${product.id}">
                        Add To Cart
                    </button>
                    <div class="added js-added"  data-product-id="${product.id}">
                        <p class="added-to-cart-phrase">&nbsp; Added To Cart   &nbsp;</p>
                        <img class="added-to-cart-icon" src="images/cart.jpeg" >
                        <img class="checkmark-icon" src="images/checkmark.jpg" > 
                    </div>
                </div>


            </div>  
    `;
})
let showProducts=document.querySelector(".js-products");
showProducts.innerHTML=productsHtml;
console.log(productsHtml);
addToCart();