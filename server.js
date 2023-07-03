const express = require('express');
const session = require('express-session');
const bp = require('body-parser');
const db = require('mongoose');
const emailValidator = require('email-validator');
const fillDB = require('./fillupCollections');
const app = express();


// __________________________________________________________________________________________________________
// Setting up server config.


app.use(express.static("public"));
app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())

app.use(express.static("images")); //pavel is that supposed to import the images?


app.use(
  session({
    secret: 'Shhhhh.....!', //? Replace with secret key from stripe? //? nope, aint nobody got time for that.
    resave: false,
    saveUninitialized: true,
    cookie:{
      maxAge: 60*60*1000,
    }
  })
);

// ________________________________________________________________________________________________________
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

// ____________________________________________________________________________________________________
// Setting up schemas and models.

const userSchema = db.Schema({
  userName: String,
  email: String,
  password: String

});

const userModel = db.model('user', userSchema);



const productSchema = db.Schema({
  productName: String,
  productPrice: Number,
  image: String
});

const productModel = db.model('product', productSchema);


const orderSchema = db.Schema({
  totalProducts: Number,
  totalPrice: Number,
  usersName: String, //? we need to figure out if this suposed to be an obj.
  usersEmail: String
});

const orderModel = db.model('order', orderSchema);

// ----Server------------- 
// ________________________________________________________________________________________________________________
// Sign in page

app.get('/', (req, res) => {
  if (req.session.user == null) {
    res.sendFile(__dirname + "/public/index.html");
  } else {
    res.redirect('/products')
  }
});

app.post('/', async (req, res) => {
  const userCredentials = {
    email: req.body.email,
    password: req.body.password
  };

  if (!emailValidator.validate(userCredentials.email)) {
    res.json({message: 'Please enter correct Email address.', mailIsIncorrect: true, wrongPassword: true});
  } else {
    const potentialUser = await userModel.findOne({email: userCredentials.email});
    if (potentialUser == null) {
      res.json({message: 'Wrong Email address.', mailIsIncorrect: true, wrongPassword: true});
    } else if (potentialUser.password != userCredentials.password) {
      res.json({message: 'Wrong Password.', mailIsIncorrect: false, wrongPassword: true});
    } else {
      // user = potentialUser;
      req.session.user = potentialUser;
      res.json({url: '/products', mailIsIncorrect: false, wrongPassword: false})
    }
  }
});

// _________________________________________________________________________________________________________________
// Sign up page

app.get('/signup', (req, res) => {
  if (req.session.user == null) {
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

// ____________________________________________________________________________________________________________
// Producs page

app.get('/showProducts',async(req,res) => {

  const productPull = await productModel.find({})
  res.json({productList: productPull});
})

app.get('/products', async (req, res) => {
  if (req.session.user == null) {
    res.redirect('/');
  } else {
  
    res.sendFile(__dirname + '/public/products.html');
    }
});

// app.post('/products', async (req, res) =>{
//   console.log('dummy');
// });




//________________________________________________________________________________________________________________
// Checkout/buy page

app.get('/buy', (req, res) => {
  
  if (req.session.user == null) {
    res.redirect('/');
  } else {
    res.sendFile(__dirname + '/public/buy.html');
  }
  
});

app.post('/buy', async (req, res) =>{
  console.log('dummy');
  const user = req.session.user;
  const order = {
    totalProducts: req.body.totalProducts,
    totalPrice: req.body.totalPrice,
    usersName: user.userName,
    usersEmail: user.email
  }
  
  await orderModel.create(order).then(() => {
    res.json({message:"Order sent."})
  })
});

// ______________________________________________________________________________

//TERMS OF USE PAGE

app.get('/tos', (req,res) => {
  res.sendFile(__dirname + '/public/tos.html')
  
})

//_______________________________________________________________________________


// All page

app.get('/showOrders', async (req,res) => {
  const orderPull = await orderModel.find({});
  res.json({orderList: orderPull});
});


app.use('/all',(req, res, next) => {
  if(req.query.admin == 'true')
  next();
  else{
    // res.status(400).sendFile(__dirname + '/public/error.html');
    const error = new Error('Not admin!');
    error.statusCode = 400;
    error.message = "Not admin!"
    return next(error);
  }
  console.log('middleware works') ;

});

app.get('/all', (req, res) => {
  res.sendFile(__dirname + '/public/all.html');
});


//________________________________________________________________________________________________________

app.get('/fillDB', (req,res) =>{
  fillDB.fillUp().then(res.redirect('/'));
  
})






app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/public/error.html');
});


app.use((error, req, res, next) => {
  res.status(error.statusCode).json({
    message: error.message || 'Internal Server Error',
    statusCode: error.statusCode
  });
  next()
});



// ! add a general create error function;




app.listen(3000, () => {
    console.log('running on port 3000')
});