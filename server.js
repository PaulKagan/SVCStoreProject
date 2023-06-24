const express = require('express');
const bp = require('body-parser');
const db = require('mongoose');
const app = express();


// Setting up server config.


app.use(express.static("public"));
app.use(bp.urlencoded({ extended: false }))
// app.use(bodyParser.json())


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
  res.sendFile(__dirname + "/public/index.html");
  console.log('hello');
});

app.post('/', async (req, res) => {
  console.log('dummy');
})


// Sign up page

app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/public/signup.html');
});

app.post('/signup', async (req, res) => {
  const user = {
    userName: req.body.usersName,
    email: req.body.email,
    password: req.body.password
  };
  await userModel.findOne({userName: user.userName})
  .then((existing)=>{   
    if (existing != undefined || existing != null) {
      alert('User exists');
      return;
    }
  });

  await userModel.create(user).then(() => {
    res.redirect(__dirname + '/public/home.html');
  }).catch(console.log(err));
  console.log('dummy');
});


//? Michell, why do we have products page and all page? what is the difference?
// Producs page

app.get('/products', (req, res) => {
  res.sendFile(__dirname + '/public/products.html');
});

app.post('/products', async (req, res) =>{
  console.log('dummy');
});


// All page

app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
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





















app.listen(3000, () => {
    console.log('running on port 3000')
})

    // עמוד ראשי (ערוץ '/'):

    // עמוד הרשמה (/signup):

// עמוד בחירת המוצרים (:(‘/products’

// (‘/buy’) לחיצה על כפתור קניה, תעביר את המשתמש לעמוד הרכישה :

// קיים ערוץ נוסף (‘/all’):



