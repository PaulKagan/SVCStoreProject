let orders = [];

const getOrders = () => {
    fetch('/showOrders').then((res) => res.json())
        .then(data => {
            orders= data.orderList;
            showOrders();
        });
}

getOrders();

function showOrders(){
    const orderList = document.getElementById("order-list");
    
    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];

        const ordersDiv = document.createElement("div");
        ordersDiv.setAttribute("class","order-list");
        
        // header
        const header = document.createElement("h2");
        header.textContent = "Order number " + (i+1);
        
        
        // Total products
        const totalProdP = document.createElement("p");
        totalProdP.textContent = `Number of products  - ${order.totalProducts}`;
        
        
        // Total Price
        const priceP = document.createElement("p");
        priceP.textContent = `Total Price - $${order.totalPrice}`;
        

         // Customer name
        const nameP = document.createElement("p");
        nameP.textContent = `Name - ${order.usersName}`;
        
        
        // costumer email
        const emailP = document.createElement("p");
        emailP.textContent = `Email - ${order.usersEmail}`;

        ordersDiv.append(header, totalProdP, priceP, nameP, emailP);
        orderList.append(ordersDiv);
      }
};