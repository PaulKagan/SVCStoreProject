let products = [];
const getProducts = () => {
    fetch('/showProducts').then((res) => res.json())
        .then(data => {
            products = data.productList;
            showProducts(products);
        });
        
        
}
    
getProducts();
    
    
const sortItemsByPrice = () => {

};
    
    
    
const sortItemsByName = () => {

};


const showProducts = productsArray =>{
    const productList = document.getElementById('product-list');
    productsArray.forEach((product =>{

        const productContainerDiv = document.createElement('div');
        productContainerDiv.style.backgroundColor = `lightgray`;
        productContainerDiv.classList.add('productContainerDiv');

        // Create a div element for the product
        const productDiv = document.createElement('div');
        productDiv.style.backgroundImage = `url(${product.image})`;
        productDiv.classList.add('productDiv');
    
        // Create a span element for the product name
        const nameSpan = document.createElement('span');
        nameSpan.textContent = product.productName + ` - $${product.productPrice}`;
        nameSpan.classList.add("prod-top");
        productDiv.appendChild(nameSpan);
        
        // Create a button element for "Add to Cart"
        const addToCartButton = document.createElement('button');
        addToCartButton.classList.add("prod-buttom");
        addToCartButton.textContent = 'Add to Cart';
        
        // Add an event listener to the button
        addToCartButton.addEventListener('onclick', function () {
            // Add your logic for adding the product to the cart here
            console.log('Product added to cart:', product.name);
        });
        
        productDiv.appendChild(addToCartButton);
        // Append the product div to the product list container
        productContainerDiv.appendChild(productDiv);
        productList.appendChild(productContainerDiv);
    }));
} ;