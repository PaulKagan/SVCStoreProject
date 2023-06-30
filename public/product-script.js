let products = [];
const showProducts = () => {
    fetch('/showProducts').then((res) => res.json())
        .then(data => {
            products = data.productList;
            elementsForEach(products);
        });
        
        
}
    
showProducts()
    
    
sortItemsByPrice()
    
    
    
sortItemsByName()


    const elementsForEach = productsArray =>{
        const productList = document.getElementById('product-list');
        productsArray.forEach((product =>{
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
            addToCartButton.textContent = 'Add to Cart';
            
            // Add an event listener to the button
            addToCartButton.addEventListener('onclick', function () {
                // Add your logic for adding the product to the cart here
                console.log('Product added to cart:', product.name);
            });
            
            productDiv.appendChild(addToCartButton);
            addToCartButton.classList.add("prod-buttom");
            // Append the product div to the product list container
            productList.appendChild(productDiv);
        }));
    } 