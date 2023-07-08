const express = require('express');
const session = require('express-session');
const bp = require('body-parser');
const db = require('mongoose');
const emailValidator = require('email-validator');
const helper = require('./helpers');//another file that keeps server a bit cleaner.
const app = express();


// __________________________________________________________________________________________________________
// Setting up server config.


app.use(express.static("public"));
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.use(
  session({
    secret: 'Shhhhh.....!', //? Replace with secret key from stripe? //? nope, aint nobody got time for that.
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000,
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

app.get('/', (req, res, next) => {
  try {
    if (req.session.user == null) {
      res.sendFile(__dirname + "/public/index.html");
    } else {
      res.redirect('/products');
    };

  } catch (error) {
    next(helper.createError(503, 'Sorry cannot get the page. Try again later.'));
  };
});

app.post('/', async (req, res, next) => {
  try {
    const userCredentials = {
      email: req.body.email,
      password: req.body.password
    };

    if (!emailValidator.validate(userCredentials.email)) {
      res.json({ message: 'Please enter correct Email address.', mailIsIncorrect: true, wrongPassword: true });
    } else {
      const potentialUser = await userModel.findOne({ email: userCredentials.email });
      if (potentialUser == null) {
        res.json({ message: 'Wrong Email address.', mailIsIncorrect: true, wrongPassword: true });
      } else if (potentialUser.password != userCredentials.password) {
        res.json({ message: 'Wrong Password.', mailIsIncorrect: false, wrongPassword: true });
      } else {
        req.session.user = potentialUser;
        res.json({ url: '/products', mailIsIncorrect: false, wrongPassword: false });
      };
    };

  } catch (error) {
    next(helper.createError(500, 'Cannot sign in. Try again later.'));
  };
});

// _________________________________________________________________________________________________________________
// Sign up page

app.get('/signup', (req, res, next) => {
  try {
    if (req.session.user == null) {
      res.sendFile(__dirname + '/public/signup.html');
    } else {
      res.redirect('/products');
    };
  } catch (error) {
    next(helper.createError(503, 'Sorry cannot get the page. Try again later.'));
  };
});

app.post('/signup', async (req, res, next) => {
  try {
    const user = {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    };
    if (!emailValidator.validate(user.email)) {
      res.json({ message: 'Please enter correct email address.', mailIsIncorrect: true });
    } else {
      const existing = await userModel.findOne({ email: user.email });
      if (existing != null) {
        res.json({ message: 'User already exists!', mailIsIncorrect: false, userExists: true });
      } else {
        await userModel.create(user).then(() => {
          res.json({ url: '/', mailIsIncorrect: false, userExists: false });
        });
      };
    };

  } catch (error) {
    next(helper.createError(503, 'Cannot create a user for now.. Try again later.'));
  };
});

// ____________________________________________________________________________________________________________
// Producs page

app.get('/showProducts', async (req, res, next) => {
  try {
    const productPull = await productModel.find({});
    res.json({ productList: productPull });

  } catch (error) {
    next(helper.createError(500, 'Couldnt get products..'));
  };
});

app.get('/products', async (req, res, next) => {
  try {
    if (req.session.user == null) {
      res.redirect('/');
    } else {
      res.sendFile(__dirname + '/public/products.html');
    }
  } catch (error) {
    next(helper.createError(503, 'Sorry cannot get the page. Try again later.'));
  };
});






//________________________________________________________________________________________________________________
// Checkout/buy page

app.get('/buy', (req, res, next) => {
  try {
    if (req.session.user == null) {
      res.redirect('/');
    } else {
      res.sendFile(__dirname + '/public/buy.html');
    }
  } catch (error) {
    next(helper.createError(503, 'Sorry cannot get the page. Try again later.'));
  };

});

app.post('/buy', async (req, res, next) => {
  try {
    const user = req.session.user;
    const order = {
      totalProducts: req.body.totalProducts,
      totalPrice: req.body.totalPrice,
      usersName: user.userName,
      usersEmail: user.email
    }

    await orderModel.create(order).then(() => {
      res.json({ message: "Order sent." });
    });

  } catch (error) {
    next(helper.createError(518, "But I'm a teapot.. I cannot make coffee.."));

  };
});

// ______________________________________________________________________________

//TERMS OF USE PAGE

app.get('/tos', (req, res, next) => {
  try {
    res.sendFile(__dirname + '/public/tos.html');
  } catch (error) {
    next(helper.createError(503, 'Sorry cannot get the page. Try again later.'));
  };
});

//_______________________________________________________________________________


// All page

app.get('/showOrders', async (req, res, next) => {
  try {
    const orderPull = await orderModel.find({});
    res.json({ orderList: orderPull });
  } catch (error) {
    next(helper.createError(404, 'Page not found!'));
  };
});

// Check the query for admin = true/
app.use('/all', (req, res, next) => {
  if (req.query.admin == 'true')
    next();
  else
    next(helper.createError(400, "Not admin!"));
});

app.get('/all', (req, res, next) => {
  try {
    res.sendFile(__dirname + '/public/all.html');
  } catch (error) {
    next(helper.createError(503, 'Sorry cannot get the page. Try again later.'));
  };
});


//________________________________________________________________________________________________________
// Util.

app.get('/fillDB', (req, res, next) => {
  try {
    helper.fillUp().then(res.redirect('/'));

  } catch (error) {
    next(helper.createError(500, 'Internal Server Error!'));
  };
});




//Middlware to catch any wrong address.
app.use((req, res, next) => {
  next(helper.createError(404, 'Page not found!'));
});


// Error middleware.
app.use((error, req, res, next) => {
  res.status(error.statusCode).send(helper.genErrorPage(error.statusCode, error.message));
});

//___Export________________________________________________________________________________________________
module.exports = {
  url
}

// ________________________________________________________________________________________________________

app.listen(3000, () => {
  console.log('running on port 3000');
});