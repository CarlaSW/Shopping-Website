export let cart=JSON.parse(localStorage.getItem('cart'));
//export let cart=[];
if(!cart)
{
    cart=[{
    productId:'2',
    quantity:1,
    deliveryOptionId:'1'
},
{
    productId:'5',
    quantity:3,
    deliveryOptionId:'2'
},
{
    productId:'8',
    quantity:2,
    deliveryOptionId:'3'
}];
}

calculateQuantity();


export function addToCart(){
    let addToCartButtons=document.querySelectorAll(".js-add-to-cart-button");
    addToCartButtons.forEach((button,index)=>{
        button.addEventListener('click',()=>{
            let productId=button.dataset.productId;
            let quantityOfProduct=Number(document.getElementById(`quantity-${productId}`).value);
            let matchingItem;
            cart.forEach((item)=>{
                if(item.productId===productId)
                {
                    matchingItem=item;
                }
            })
            if(matchingItem)
            {
                matchingItem.quantity+=quantityOfProduct;
            }
            else{
                cart.push({
                    productId:productId,
                    quantity:quantityOfProduct,
                    deliveryOptionId:'1'
                })
            }
            saveToStorage();

            calculateQuantity();
    
            document.querySelectorAll('.js-added').forEach((checkmark)=>{
                if(checkmark.dataset.productId===productId)
                {
                    checkmark.style.opacity=1;
                    setTimeout(()=>{
                        checkmark.style.opacity=0;
                    },1000)
                }
            })
        })
    })
}

export function calculateQuantity(){
    let totalQuantity=0;
    cart.forEach((item)=>{
        totalQuantity+=item.quantity;
    });
    document.querySelector('.js-cart-quantity').innerHTML=totalQuantity;
        
    console.log(cart);
    console.log(totalQuantity);
}

export function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}
export function updateCart(productId){
    let newCart=[];
    cart.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    })
    cart=newCart;
    saveToStorage();
    calculateQuantity();
}


export function updateDeliveryDate(productId,optionId){
    cart.forEach((cartItem)=>{
        if(cartItem.productId===productId)
        {
            cartItem.deliveryOptionId=optionId;
        }
    })
    saveToStorage();
}