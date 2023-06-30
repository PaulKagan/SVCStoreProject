const express = require('express');
const bp = require('body-parser');
const db = require('mongoose');
const emailValidator = require('email-validator');//should we do custom one in the front?
const app = express();

let user = "blah";//! change to null!!
// let signedin = false;

// Setting up server config.


app.use(express.static("public"));
app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())


// Setting up DB.

// const url = "mongodb+srv://mishrb20:mishrb20@cluster0.9t512bo.mongodb.net/SVshop";
const url = "mongodb+srv://pkagan:mdbpw123@cluster0.wsme1wo.mongodb.net/SVCShop";

db.connect(url)
  .then(() => {
    console.log("DB is on.");
  })
  .catch((err) => {
    console.log(err);
  });


// Setting up schemas and models.

const userSchema = db.Schema({
  userName: String,
  email: String,
  password: String

});

const userModel = db.model('user', userSchema);

//? im not really sure that we suppose to do the next schema's
//?  yeah, we need them. paul.

const productSchema = db.Schema({
  productName: String,
  productPrice: Number
});

const productModel = db.model('product', productSchema);


const orderSchema = db.Schema({
  totalProducts: Number,
  totalPrice: Number,
  costumerName: String //? we need to figure out if this suposed to be an obj.
});

const orderModel = db.model('order', orderSchema);

// Server 

// Sign in page

app.get('/', (req, res) => {
  if (user == null) {
    res.sendFile(__dirname + "/public/index.html");
  } else {
    res.redirect('/products')
  }
});

app.post('/', async (req, res) => {
  //! Mishel
  console.log('dummy');
})


// Sign up page

app.get('/signup', (req, res) => {
  if (user == null) {
    res.sendFile(__dirname + '/public/signup.html');
  } else {
    res.redirect('/products');
  }
});

app.post('/signup', async (req, res) => {
  const user = {
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  };
  if (!emailValidator.validate(user.email)) {
    res.json({message: 'Please enter correct email address.', mailIsIncorrect: true});
  } else {
    const existing = await userModel.findOne({email: user.email});
    if (existing != null) {
      res.json({message: 'User already exists!', mailIsIncorrect: false, userExists : true});
    } else {
      await userModel.create(user).then(() => {
        res.json({url: '/', mailIsIncorrect: false, userExists: false});
      }).catch((err) => console.log(err)); 
    }
  }
});



// Producs page

app.get('/products', async (req, res) => {
  if (user == null) {
    res.redirect('/');
  } else {
    
    res.sendFile(__dirname + '/public/products.html');
  }
});

app.post('/products', async (req, res) =>{
  console.log('dummy');
});


// All page

app.get('/all', (req, res) => {
  res.sendFile(__dirname + '/public/all.html');
});

app.post('/all', async (req, res) =>{
  console.log('dummy');
});


// checkout page
//? I assume buy was supposed to be the checkout page?

app.get('/checkout', (req, res) => {
  res.sendFile(__dirname + '/public/checkout.html');
});

app.post('/checkout', async (req, res) =>{
  console.log('dummy');
});



//TERMS OF USE PAGE

app.get('/tos',(req,res) => {
  res.sendFile(__dirname + '/public/tos.html')
})








// app.get('/addProducts', async (req,res) => {


//   const products = [{productName:"Zara shirt", productPrice: 110 },
//    {productName:"Gucci shirt", productPrice:650 },
//   {productName:"Louis vitton shirt",productName:750},
// {productName:"Castro shirt", productPrice: 50},

// {productName:"CK belt", productPrice: 250},
// {productName:"LV belt", productPrice: 2300},
// {productName:"Hermess belt", productPrice:3500},

// {productName:"Adidas shoes", productPrice:350},
// {productName:"Nike shoes", productPrice:450},
// {productName:"New balanc shoes", productPrice:280},
// {productName:"Basic jordan shoes", productPrice:500},
// {productName:"Vintage jordan shoes", productPrice:1500},

// {productName:"New Era cap", productPrice: 150},
// {productName:"Nike cap", productPrice:120},
// {productName:"Adidas cap", productPrice:120},

// {productName:"MJ jeans", productPrice:300},
// {productName:"Craieser jeans", productPrice: 450},
// {productName:"Disel jeans", productPrice:850},
// {productName:"Lee cooper jeans",productPrice:380},
// {productName:"Zara jeans",productPrice:200},
// {productName:"Renuar jeans",productPrice:150},
// {productName:"Castro jeans",productPrice:120},

// {productName:"Zara jacket",productPrice:250},
// {productName:"Renuar jacket",productPrice:250},
// {productName:"Bershka ONE PIECE jacket",productPrice:200},
// {productName:"Denim jacket", productPrice:350},

// {productName:"Zara swimsuit",productPrice: 100},
// {productName:"Castro swimsuit",productPrice:80},
// {productName:"Bershka swimsuit",productPrice:85},
// {productName:"Basic swimsuit",productPrice:50},

// {productName:"Silver ring",productPrice:130},
// {productName:"Gold ring",productPrice:650},
// {productName:"gold neckless",productPrice:3200},

// {productName:"Castro boxers",productPrice:60},
// {productName:"CK boxers",productPrice:200},
// {productName:"Pierr cardin boxers",productPrice:100},

// {productName:"Cotton socks",productPrice:40},
// {productName:"No show socks",productPrice: 40},
// {productName:"Long socks ",productPrice:40}


// ]
// await productModel.insertMany(products)
// })












app.listen(3000, () => {
    console.log('running on port 3000')
});

    // עמוד ראשי (ערוץ '/'):

    // עמוד הרשמה (/signup):

// עמוד בחירת המוצרים (:(‘/products’

// (‘/buy’) לחיצה על כפתור קניה, תעביר את המשתמש לעמוד הרכישה :

// קיים ערוץ נוסף (‘/all’):



