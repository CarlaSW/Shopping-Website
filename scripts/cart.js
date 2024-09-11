export let cart=[];

export function addToCart(){
    let addToCartButtons=document.querySelectorAll(".js-add-to-cart-button");
    addToCartButtons.forEach((button,index)=>{
        button.addEventListener('click',()=>{
            let productId=button.dataset.productId;
            let matchingItem;
            cart.forEach((item)=>{
                if(item.productId===productId)
                {
                    matchingItem=item;
                }
            })
            if(matchingItem)
            {
                matchingItem.quantity++;
            }
            else{
                cart.push({
                    productId:productId,
                    quantity:1
                })
            }
            
            let totalQuantity=0;
            cart.forEach((item)=>{
                totalQuantity+=item.quantity;
            })
    
            console.log(cart);
            console.log(totalQuantity);
            document.querySelector('.js-cart-quantity').innerHTML=totalQuantity;
    
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