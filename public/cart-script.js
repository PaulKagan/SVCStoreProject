// const cart = [];
// sessionStorage.setItem('cart', JSON.stringify([]));

const getLilCart = () => {
    const cartContainerDiv = document.getElementById('cartContainerDiv');
    // Check if cartContainerDiv is exists, and toggles it.
    if (cartContainerDiv) {
        cartContainerDiv.remove();
    } else {
        displayLilCart();
    }
};




const addToCart = (productName, productPrice) => {
    const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
    const itemToAdd = {productName: productName, productPrice: productPrice}
    cartItems.push(itemToAdd);
    console.log(cartItems);
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
    const empty = document.getElementById('empty');
    // Check if cartContainerDiv is exists, and toggles it.
    if (empty) {
        empty.innerHTML ="";
        displayLilCart();
    }
};


const removeFromCart = (index) => {
    const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
    cartItems.splice(index,1);
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
};

const removeFromLilCart = (index) => {
    const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
    cartItems.splice(index,1);
    sessionStorage.setItem('cart', JSON.stringify(cartItems));

    const cartContainerDiv = document.getElementById('cartContainerDiv');
    cartContainerDiv.remove();
    displayLilCart();
};










    // const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];



function displayLilCart(){
    const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
    const emptySpan = document.getElementById("empty");
    let sum = 0;
    // Container div
    const cartContainerDiv = document.createElement('div');
    cartContainerDiv.setAttribute("id", "cartContainerDiv");
    cartContainerDiv.setAttribute("class", 'cart');

    // Item list Div
    const cartDiv = document.createElement("div");
    cartDiv.setAttribute('id', 'cartDiv');
    cartDiv.setAttribute('class', 'cart');

    //adds the items from the cart to cartDiv
    cartItems.forEach((item, index) => {
        // item row.
        const itemDiv = document.createElement("div");
        itemDiv.setAttribute('class', 'itemDiv');

        // delete item button
        const deleteItem = document.createElement("button")
        deleteItem.setAttribute("class", "del-btn");
        deleteItem.textContent = " x ";
        deleteItem.setAttribute("onclick",`removeFromLilCart(${index})`)

        // item description
        const itemSpan = document.createElement("span");
        itemSpan.textContent = item.productName + ` - $${item.productPrice}`;

        itemDiv.append(deleteItem);
        itemDiv.append(itemSpan);
        cartDiv.append(itemDiv);
        sum += item.productPrice;
    });

    // Summary with total items and price
    const summaryDiv = document.createElement('div');
    summaryDiv.setAttribute('id','cart-summary');
    summaryDiv.setAttribute('class', 'cart');
    summaryDiv.textContent = `Items: ${cartItems.length}, Total:$${sum}`
    // cartContainerDiv.append(summaryDiv);
    
    const checkoutButton = document.createElement('button');
    checkoutButton.setAttribute('class', 'cart');
    checkoutButton.setAttribute('onclick', 'checkout()');
    checkoutButton.setAttribute('id', 'checkout-btn');
    checkoutButton.textContent = "Checkout"
    // cartContainerDiv.append(checkoutAnchor);
    cartContainerDiv.append(cartDiv, summaryDiv, checkoutButton);

    emptySpan.append(cartContainerDiv);
}

function checkout(){
    location.href = '/buy'
}