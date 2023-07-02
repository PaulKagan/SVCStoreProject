let products = [];

const getProducts = () => {
    fetch('/showProducts').then((res) => res.json())
        .then(data => {
            products = data.productList;
            showProducts(products);
        });
}

getProducts();

// Sort by name and sort by price.
const sortItemsByName = () => {
    const searchInput = document.getElementById('search-bar').value.toLowerCase();
    console.log(searchInput);
    const sortedProducts = products.filter(product => product.productName.toLowerCase().includes(searchInput));
    console.log(sortedProducts);
    showProducts(sortedProducts);
};

const sortItemsByPrice = () => {
    console.log("sorted");

    const sortOption = document.getElementById('sortBox').value;
    let sortedProducts;
    switch (sortOption) {
        case 'lowToHigh':
            sortedProducts = [...products].sort((a, b) => a.productPrice - b.productPrice);
            break;
            case 'highToLow':
                sortedProducts = [...products].sort((a, b) => b.productPrice - a.productPrice);
                break;
        default:
            sortedProducts = [...products];
            break;
        }
        
        showProducts(sortedProducts);
    };

    
    // Listeners
    document.getElementById('sortBox').addEventListener('change', sortItemsByPrice);
    document.getElementById('search-bar').addEventListener('input', sortItemsByName);
    
    // Show function, which generates and displays the products in the array. 
    function showProducts(productsArray) {
        const productList = document.getElementById('product-list');
        productList.innerHTML = "";
        productsArray.forEach((product => {
    
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
            addToCartButton.classList.add("prod-button");
            addToCartButton.textContent = 'Add to Cart';
    
            addToCartButton.setAttribute('onclick', `addToCart('${product.productName}', ${product.productPrice})`);
    
            productDiv.appendChild(addToCartButton);
            // Append the product div to the product list container
            productContainerDiv.appendChild(productDiv);
            productList.appendChild(productContainerDiv);
        }));
    };
