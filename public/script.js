const signIn = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("enteredPass").value;

  if (password.length < 8 || password == password.toLowerCase() || password == password.toUpperCase()) {
    alert('The password must be at least 8 characters, and contain lower & upper case letters.');
    return false;
  }
  fetch('/', {
    method: 'post',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      email: email,
      password: password
    })
  }).then(res => res.json())
  .then(data => {
    if (data.mailIsIncorrect || data.wrongPassword) {
      alert(data.message);
      return false;
    } else {
      location.href = data.url
    }
  })


}


const signup = () => {
  const userName = document.getElementById("userName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPass = document.getElementById("confirmPass").value;
  const agree = document.getElementById("agree").checked;

  if (!agree) {
    alert('Please agree to TOS & PP.')
    return false;
  }
  if (userName.length < 3) {
    alert('Name must be 3 or more charecters.');
    return false;
  } 

  else if (password.length < 8 || password == password.toLowerCase() || password == password.toUpperCase()) {
    alert('The password must be at least 8 characters, and contain lower & upper case letters.');
    return false;
  } 
  else if (password == confirmPass) {
    fetch('/signup', {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userName,
        email: email,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.mailIsIncorrect) {
          alert(data.message);
          return false;
        } else if (data.userExists) {
          alert(data.message);
          return false;
        } else{
          location.href = data.url
        }
      });
    return true;
  } else {
    alert('Passwords dont match!')
    return false;
  }
};


// showing password 
function showPass() {
  const x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function showCPass() {
  const x = document.getElementById("confirmPass");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
  
function showEPass() {
  const x = document.getElementById("enteredPass");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}






///////////////////////////////////////////////////

// const products =[

//   {productName:"Zara shirt", productPrice: 110, image:"http://t1.gstatic.com/images?q=tbn:ANd9GcTSUHCNcaXbt9OyWqUclRptJ_9MXv1kOs6leECCh8a-gN9lDonm"  },
// {productName:"Gucci shirt", productPrice:650 , image:"https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1686932239/565806_XJAZY_9037_001_100_0000_Light-T-shirt-with-Gucci-Blade-print.jpg"},
// {productName:"Louis vitton shirt", productPrice:750, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS1ywjJ2h5kKTV0Ty4TL71Hfo73vVD1ljq3Q&usqp=CAU"},
// {productName:"Castro shirt", productPrice: 50, image:"https://cdn.speedsize.com/f685c8f2-fb72-4347-8237-384225b43882/https://www.castro.com/pub/media/catalog/product/cache/638ddee3296a44eae2e0ce5c49c2d017/8/6/8640347.01.0500-1647116393672908.jpg"},

// {productName:"CK belt", productPrice: 250, image:"https://xcdn.next.co.uk/COMMON/Items/Default/Default/ItemImages/AltItemShot/315x472/476898s.jpg"},
// {productName:"LV belt", productPrice: 2300, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-dopAGBc4Eq8wbLtwXT9kC5rgogdpKmkCPA&usqp=CAU"},
// {productName:"Hermess belt", productPrice:3500, image:"http://t2.gstatic.com/images?q=tbn:ANd9GcR3BGZB7mZzzWkD_G6Vm08Wpg5Ocd6LMlUiCH9zg7flzDKOwhdI"},

// {productName:"Adidas shoes", productPrice:350, image:"https://images.stockx.com/images/adidas-Superstar-Swarovski-White-Black-Product.jpg?fit=fill&bg=FFFFFF&w=1200&h=857&fm=webp&auto=compress&dpr=2&trim=color&updated_at=1615906223&q=75"},
// {productName:"Nike shoes", productPrice:450, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuyXRq_QCeyK3rWlAZSH96hP53O8uRMjuzCw&usqp=CAU"},
// {productName:"New balanc shoes", productPrice:280, image:"https://www.kicksonfire.com/wp-content/uploads/2023/01/new-balance-550-bbw550ca-5.jpeg"},
// {productName:"Basic jordan shoes", productPrice:500, image:"https://img01.ztat.net/article/spp-media-p1/3f5f289508104e778126a760f65ac617/9ede60c0eae9466aba239d87a3ee4e09.jpg?imwidth=1800&filter=packshot"},
// {productName:"Vintage jordan shoes", productPrice:1500, image:"https://i.ebayimg.com/images/g/vwQAAOSwJVRgR3Ue/s-l640.jpg"},

// {productName:"New Era cap", productPrice: 150, image:"https://www.neweracap.co.uk/globalassets/products/a1701_282/10745455/10745455-left2.jpg"},
// {productName:"Nike cap", productPrice:120, image:"http://t1.gstatic.com/images?q=tbn:ANd9GcSdhPrpdale-6wjrVlUPv3-nM6FkfDWdp3T4AW0GDVvAsBgiFgs"},
// {productName:"Adidas cap", productPrice:120, image:"https://assets.adidas.com/images/w_303,h_303,f_auto,q_auto,fl_lossy,c_fill,g_auto/95c3232e2a154d30a57fafc2010b64a3_9366/3-stripes-cotton-twill-baseball-cap.jpg"},

// {productName:"MJ jeans", productPrice:300, image:"https://www.maniajeans.co.il/pub/media/catalog/product/cache/0c10cf84d9daea477b73908a03179de8/4/2/42711-A6-1-16861514946518696.jpg"},
// {productName:"Craieser jeans", productPrice: 450, image:"https://www.zico-fashion.co.il/wp-content/uploads/2020/12/IMG_8487-scaled.jpg"},
// {productName:"Disel jeans", productPrice:850, image:""},
// {productName:"Lee cooper jeans",productPrice:380, image:"https://www.crossjeans.com/media/image/dd/b6/26/E_198_020_cross_jeans_null_1_800x800.jpg"},
// {productName:"Zara jeans",productPrice:200, image:""},
// {productName:"Renuar jeans",productPrice:150, image:""},
// {productName:"Castro jeans",productPrice:120, image:""},

// {productName:"Zara jacket",productPrice:250, image:""},
// {productName:"Renuar jacket",productPrice:250, image:""},
// {productName:"Bershka ONE PIECE jacket",productPrice:200, image:""},
// {productName:"Denim jacket", productPrice:350, image:""},

// {productName:"Zara swimsuit",productPrice: 100, image:""},
// {productName:"Castro swimsuit",productPrice:80, image:""},
// {productName:"Bershka swimsuit",productPrice:85, image:""},
// {productName:"Basic swimsuit",productPrice:50, image:""},

// {productName:"Silver ring",productPrice:130, image:""},
// {productName:"Gold ring",productPrice:650, image:""},
// {productName:"gold neckless",productPrice:3200, image:""},

// {productName:"Castro boxers",productPrice:60, image:""},
// {productName:"CK boxers",productPrice:200, image:""},
// {productName:"Pierr cardin boxers",productPrice:100, image:""},

// {productName:"Cotton socks",productPrice:40, image:""},
// {productName:"No show socks",productPrice: 40, image:""},
// {productName:"Long socks ",productPrice:40, image:""}

// ]

// const productList = document.getElementById('product-list');
//  for (let i = 0; i < products.length; i++) {
//       const product = products[i];

//       // Create a div element for the product
//       const productDiv = document.createElement('div');
//       productDiv.style.backgroundImage= `url(${product.image})`;
//       productDiv.classList.add('productDiv');

//       // Create a span element for the product name
//       const nameSpan = document.createElement('span');
//       nameSpan.textContent = product.productName + ` - $${product.productPrice}`;
//       nameSpan.classList.add("prod-top");
//       productDiv.appendChild(nameSpan);
      

      

//       // Create a span element for the product price
//       // const priceSpan = document.createElement('span');
//       // priceSpan.textContent = ` - $${product.productPrice}`;
//       // priceSpan.classList.add("prod-top");
//       // productDiv.appendChild(priceSpan);

//       // Create a button element for "Add to Cart"
//       const addToCartButton = document.createElement('button');
//       addToCartButton.textContent = 'Add to Cart';

//       // Add an event listener to the button
//       addToCartButton.addEventListener('onclick', function() {
//         // Add your logic for adding the product to the cart here
//         console.log('Product added to cart:', product.name);
//       });

//       productDiv.appendChild(addToCartButton);
//       addToCartButton.classList.add("prod-buttom");
//       // Append the product div to the product list container
//       productList.appendChild(productDiv);
//     }