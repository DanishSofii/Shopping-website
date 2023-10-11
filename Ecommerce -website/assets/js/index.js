let carts = document.querySelectorAll('.addcart');

let products =[
    {
        name:'Nike Blue Shoes',
        type:'Men',
        tag:'product-1',
        price:20000,
        inCart :0

    },
    {
        name:'Nike Grey Shoes',
        type:'Men',
        tag:'product-2',
        price:30000,
        inCart :0

    },
    {
        name:'Nike Red Shoes',
        type:'Men',
        tag:'product-3',
        price:25000,
        inCart :0

    },
    {
        name:'Nike White Shoes',
        type:'Women',
        tag:'product-4',
        price:2000,
        inCart :0

    },
    {
        name:'Nike Yellow Shoes',
        type:'women',
        tag:'product-5',
        price:5000,
        inCart :0

    },
    {
        name:'Nike White-Red Shoes',
        type:'Men',
        tag:'product-6',
        price:15999,
        inCart :0

    },
    {
        name:'Nike Purple Shoes',
        type:'Women',
        tag:'product-7',
        price:8999,
        inCart :0

    },
    {
        name:'Nike Sky-Blue Shoes',
        type:'Men',
        tag:'product-8',
        price:6999,
        inCart :0

    }
]

for(let i = 0;i<carts.length;i++)
{
    carts[i].addEventListener('click',()=> {
        cartNumbers(products[i]);
        totalCost(products[i]);

    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers){
        $("cart-quantity").text(productNumbers);
        // document.querySelector("#cart-quantity").textContent=productNumbers;
    }
}

function cartNumbers(product) {
    
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers+1);
        document.querySelector("#cart-quantity").textContent=productNumbers+1;
    }
    else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector("#cart-quantity").textContent=1;

    }
    setItems(product);
    

}
function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);
    // console.log(cartItems);

    if(cartItems != null){
        
        if(cartItems[product.tag]== undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart +=1; 
        
    }
    else {
        product.inCart =1;
        cartItems ={
            [product.tag]:product
    
        }
        
    }

    localStorage.setItem('productsInCart',JSON.stringify(cartItems));
    console.log(product)
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    
    
    console.log(cartCost);
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost',cartCost+product.price);
    }
    else{
        localStorage.setItem('totalCost',product.price);

    }
}

function displayCart(){
    
    let cartItems=localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.products');
    // console.log(cartItems);

    let cartCost = localStorage.getItem('totalCost');
    
    if(cartItems && productContainer ){
        // console.log('running');
        productContainer.innerHTML='';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML+= `
            <div class="product">
            <div class="pro-cont">
            <div class="first-pro-cont">
            <li>
            <i id="remove-product" class="btn-product fa-regular fa-circle-xmark"></i>
            </li>
                <img src="./assets/images/${item.tag}.jpg" >
                <span>${item.name}</span>
                </div>
            </div>
            <div class="price">
            ${item.price}
            </div>
            <div class="quantity">
            <i onclick="decrement(${item.tag})" id="item-minus" class=" btn-product fa-regular fa-circle-down"></i>
            <span id="item-quantity" class="qty"> ${item.inCart} </span>
            <i onclick="increment(${item.tag})" id="item-plus" class=" btn-product fa-regular fa-circle-up"></i>
            </div>
            <div class="total">
            ${item.inCart * item.price},00
            </div>
            </div>
            `;
            

        });
        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">Basket Total</h4>
            <h4 class="basketTotal">
            ${cartCost},00
            </h4>
        `;        
    }    
}

onLoadCartNumbers();
displayCart();