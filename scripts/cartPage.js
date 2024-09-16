import {cart,updateCart,updateDeliveryDate} from '../scripts/cart.js';
import { products } from '../scripts/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from './deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

let cartHtml=``;

let today=dayjs();
generateCartPageHtml();

//generate html for cart page
function generateCartPageHtml()
{
    cartHtml=``;
    cart.forEach((cartItem)=>{
        let id=cartItem.productId;
        let deliveryOptionId=cartItem.deliveryOptionId;
        let matchingProduct;
        let date;
        products.forEach((product)=>{
            if(product.id === id)
            {
                matchingProduct=product;
            }
        });
        deliveryOptions.forEach((option)=>{
            if(option.id===deliveryOptionId)
            {
                date=today.add(option.days,'days').format('dddd, MMMM DD');
            }
        });
    
        cartHtml+=`
            <div class="item-grid  js-item-grid-${matchingProduct.id}">
                <p class="delivery-date-phrase js-delivery-date-phrase">Delivery date: ${date}</p>
                <div class="purchase-details-grid">
                    <div class="product-image">
                        <img class="product-cart-icon" src=${matchingProduct.image}>
                    </div>
                    <div class="product-info">  
                        <p class="product-name">${matchingProduct.name}</p>
                        <p class="product-price">$${matchingProduct.price/100}</p>
                        <p class="product-quantity">Quantity: ${cartItem.quantity} <span class="update-link js-update-link">Update</span> <span class="delete-link js-delete-link" data-delete-link=${matchingProduct.id} >Delete</span></p>
                    </div>
                    <div class="delivery-details">
                        <p class="delivery-phrase">Choose a delivery option:</p>
                        <div class="options js-options">
                        ${generateDeliveryOptions(matchingProduct,cartItem)}  
                        </div>    
                    </div>
                </div>
            </div>
        `;
    })
    document.querySelector('.js-cart-item-grid').innerHTML=cartHtml;



    //Delete link for each cart item
let deleteLinks=document.querySelectorAll('.js-delete-link');
deleteLinks.forEach((link)=>{
    link.addEventListener('click',()=>{
        let IDtoDeleteProduct=link.dataset.deleteLink;
        updateCart(IDtoDeleteProduct);
        let productRemoved=document.querySelector(`.js-item-grid-${IDtoDeleteProduct}`).remove();
        console.log(cart);
        renderPaymentSummary();

    })

})

//update when delivery option changes
let deliveryOptionsButtons = document.querySelectorAll('.js-delivery-option');
deliveryOptionsButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
        let productId=button.dataset.productId;
        let optionId=button.dataset.optionId;
        updateDeliveryDate(productId,optionId);
        generateCartPageHtml();
        console.log(cart);
        renderPaymentSummary();

    })

}) 

}



//generate delivery option for each cart item hasab the day you orderd it
function generateDeliveryOptions(matchingProduct,cartItem){
    let deliveryOptionsHtml=``;
    let price;
    deliveryOptions.forEach((option)=>{
        if(option.priceCents===0)
        {
            price='FREE';
        }
        else
        {
            price= `$${option.priceCents/100}`;
        }
        let isChecked=false;
        if(option.id===cartItem.deliveryOptionId)
        {
            isChecked=true;
        }
        deliveryOptionsHtml+=`
        <div class="delivery-options js-delivery-option" data-product-id=${matchingProduct.id} data-option-id=${option.id}>
            <input type="radio" name="delivery-date-${matchingProduct.id}" class="delivery-radio" ${isChecked?'checked' : ''}>
            <label>
                <span class="date">${today.add(option.days,'days').format('dddd, MMMM DD')}</span>
                <span class="shipping-price"> ${price} - Shipping</span>
            </label>
        </div>
    `;
    })    
    return deliveryOptionsHtml;
}

