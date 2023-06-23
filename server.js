const express = require('express');
const bp = require('body-parser');
const db = require('mongoose');
const app = express();



app.use(express.static("public"));
app.use(bp.urlencoded({extended:false}))
// app.use(bodyParser.json())

// const url = "mongodb+srv://mishrb20:mishrb20@cluster0.9t512bo.mongodb.net/SVshop";
const url = "mongodb+srv://mishrb20:mishrb20@cluster0.9t512bo.mongodb.net/SVshop";

db.connect(url)
  .then(() => {
    console.log("DB is on.");
  })
  .catch((err) => {
    console.log(err);
  });



  
  const userSchema = db.Schema({
      userName: String,
      email: String,
      password: String
      
    });
    
    const userModel = db.model('user',userSchema);

 // im not really sure that we suppose to do the next schema's
//  yeah, we need them. paul.

  const productSchema = db.Schema({
    productName: String,
    productPrice: Number
    });

    const productModel = db.model('product',productSchema);

 
    const orderSchema = db.schema({
        totalProducts: Number,
        totalPrice: Number,
        costumerName: String // we need to figure out if this suposed to be an obj.
    })

    const orderModel = db.models('order', orderSchema);










































app.listen(3000,()=>{
    console.log('running on port 3000')})

    // עמוד ראשי (ערוץ '/'):

    // עמוד הרשמה (/signup):

// עמוד בחירת המוצרים (:(‘/products’

// (‘/buy’) לחיצה על כפתור קניה, תעביר את המשתמש לעמוד הרכישה :

// קיים ערוץ נוסף (‘/all’):



