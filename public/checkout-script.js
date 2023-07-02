const displayCheckoutCart = () =>{

    const cart = JSON.parse(sessionStorage.getItem('cart')) || [] ;
    console.log(cart);
    const numberOfProducts = cart.length;

    let sum = 0;
    cart.forEach(item => {
        sum += item.productPrice;
    })

    const totalProducts = document.getElementById("p1");
    const productAmount = document.createElement("p");
    productAmount.textContent = numberOfProducts;
    totalProducts.append(productAmount)

    
    const priceSum = document.getElementById("p2");
    const priceAmount = document.createElement("p");
    priceAmount.textContent = sum;
    priceSum.append(priceAmount);   
}

displayCheckoutCart();

const sendOrder = ()=>{
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [] ;
    const numberOfProducts = cart.length;
    if (numberOfProducts == 0) {
        alert('Cart is empty!');
        return false;
    }
    let sum = 0;
    cart.forEach(item => {
        sum += item.productPrice;
    })

    fetch('/buy', {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            totalProducts: numberOfProducts,
            totalPrice: sum
        })
    }).then(res => res.json())
    .then(data => {

        const div = document.getElementById("confirm-container");
        const confirmDiv = document.createElement("div");
        confirmDiv.textContent = data.message;
        div.append(confirmDiv);
        sessionStorage.setItem('cart', JSON.stringify([]));
        setTimeout(() => {
            location.href = "/products";
        },3500)
    });
};

function products(){
    location.href = '/products'
}