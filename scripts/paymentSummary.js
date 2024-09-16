import { cart } from "./cart.js";
import { products } from "./products.js";
import { deliveryOptions } from "./deliveryOptions.js";

export function renderPaymentSummary(){
    let numOfItems=0;
    let itemsPrice=0;
    let shippingPrice=0;
    let totalBeforeTax=0;
    let tax=0;
    let totalAmountToBePaid=0;

    cart.forEach((cartItem)=>{
        numOfItems+=cartItem.quantity;
        let matchingProduct;
        let deliveryOption;

        products.forEach((product)=>{
            if(cartItem.productId === product.id)
            {
                matchingProduct=product;
            }
        })
        deliveryOptions.forEach((option)=>{
            if(option.id === cartItem.deliveryOptionId)
            {
                deliveryOption=option;
            }
        })

        itemsPrice+=((matchingProduct.price/100)*cartItem.quantity);
        shippingPrice+=((deliveryOption.priceCents/100)*cartItem.quantity);
        totalBeforeTax=itemsPrice+shippingPrice;
        tax=totalBeforeTax/10;
        totalAmountToBePaid=totalBeforeTax+tax;
    })

    let payementSummaryHtml=``;
    payementSummaryHtml+=`    
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (${numOfItems}):</div>
            <div class="payment-summary-money">$${itemsPrice.toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${shippingPrice.toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${totalBeforeTax.toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>$${tax.toFixed(2)}555</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${totalAmountToBePaid.toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>`;
        document.querySelector('.js-payment-summary').innerHTML=payementSummaryHtml;

}
renderPaymentSummary();