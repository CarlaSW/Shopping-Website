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