
const fillUp = async () => {
    const db = require('mongoose');

    const url = "mongodb+srv://pkagan:mdbpw123@cluster0.wsme1wo.mongodb.net/SVCShop";

    db.connect(url)
        .then(() => {
            console.log("DB is on.");
        })
        .catch((err) => {
            console.log(err);
        });




    const productModel = db.model('product');




    const orderModel = db.model('order');


    //!fill up oreder collection
    const ordersHistory = [
        { totalProducts: 5, totalPrice: 1200, usersName: "mish", usersEmail: "mish@4gmail.com" },
        { totalProducts: 6, totalPrice: 1000, usersName: "mike", usersEmail: "mike@3walla.com" },
        { totalProducts: 2, totalPrice: 120, usersName: "pavel", usersEmail: "pavel@2gmail.com" },
        { totalProducts: 1, totalPrice: 250, usersName: "paul", usersEmail: "paul@1walla.com" },
    ]

    await orderModel.insertMany(ordersHistory);



    // ! fill up product collection
    const products =
        [
            { productName: "Zara shirt", productPrice: 110, image: "http://t1.gstatic.com/images?q=tbn:ANd9GcTSUHCNcaXbt9OyWqUclRptJ_9MXv1kOs6leECCh8a-gN9lDonm" },
            { productName: "Gucci shirt", productPrice: 650, image: "https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1686932239/565806_XJAZY_9037_001_100_0000_Light-T-shirt-with-Gucci-Blade-print.jpg" },
            { productName: "Louis vitton shirt", productPrice: 750, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS1ywjJ2h5kKTV0Ty4TL71Hfo73vVD1ljq3Q&usqp=CAU" },
            { productName: "Castro shirt", productPrice: 50, image: "https://cdn.speedsize.com/f685c8f2-fb72-4347-8237-384225b43882/https://www.castro.com/pub/media/catalog/product/cache/638ddee3296a44eae2e0ce5c49c2d017/8/6/8640347.01.0500-1647116393672908.jpg" },
            { productName: "CK belt", productPrice: 250, image: "https://xcdn.next.co.uk/COMMON/Items/Default/Default/ItemImages/AltItemShot/315x472/476898s.jpg" },
            { productName: "LV belt", productPrice: 2300, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-dopAGBc4Eq8wbLtwXT9kC5rgogdpKmkCPA&usqp=CAU" },
            { productName: "Hermess belt", productPrice: 3500, image: "http://t2.gstatic.com/images?q=tbn:ANd9GcR3BGZB7mZzzWkD_G6Vm08Wpg5Ocd6LMlUiCH9zg7flzDKOwhdI" },
            { productName: "Adidas shoes", productPrice: 350, image: "https://images.stockx.com/images/adidas-Superstar-Swarovski-White-Black-Product.jpg?fit=fill&bg=FFFFFF&w=1200&h=857&fm=webp&auto=compress&dpr=2&trim=color&updated_at=1615906223&q=75" },
            { productName: "Nike shoes", productPrice: 450, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuyXRq_QCeyK3rWlAZSH96hP53O8uRMjuzCw&usqp=CAU" },
            { productName: "New balanc shoes", productPrice: 280, image: "https://www.kicksonfire.com/wp-content/uploads/2023/01/new-balance-550-bbw550ca-5.jpeg" },
            { productName: "Basic jordan shoes", productPrice: 500, image: "https://img01.ztat.net/article/spp-media-p1/3f5f289508104e778126a760f65ac617/9ede60c0eae9466aba239d87a3ee4e09.jpg?imwidth=1800&filter=packshot" },
            { productName: "Vintage jordan shoes", productPrice: 1500, image: "https://i.ebayimg.com/images/g/vwQAAOSwJVRgR3Ue/s-l640.jpg" },
            { productName: "New Era cap", productPrice: 150, image: "https://www.neweracap.co.uk/globalassets/products/a1701_282/10745455/10745455-left2.jpg" },
            { productName: "Nike cap", productPrice: 120, image: "http://t1.gstatic.com/images?q=tbn:ANd9GcSdhPrpdale-6wjrVlUPv3-nM6FkfDWdp3T4AW0GDVvAsBgiFgs" },
            { productName: "Adidas cap", productPrice: 120, image: "https://assets.adidas.com/images/w_303,h_303,f_auto,q_auto,fl_lossy,c_fill,g_auto/95c3232e2a154d30a57fafc2010b64a3_9366/3-stripes-cotton-twill-baseball-cap.jpg" },
            { productName: "MJ jeans", productPrice: 300, image: "https://www.maniajeans.co.il/pub/media/catalog/product/cache/0c10cf84d9daea477b73908a03179de8/4/2/42711-A6-1-16861514946518696.jpg" },
            { productName: "Craieser jeans", productPrice: 450, image: "https://www.zico-fashion.co.il/wp-content/uploads/2020/12/IMG_8487-scaled.jpg" },
            { productName: "Disel jeans", productPrice: 850, image: "https://www.mesinio.co.il/wp-content/uploads/2021/02/WhatsApp-Image-2021-02-02-at-11.48.00-768x1024.jpeg" },
            { productName: "Lee cooper jeans", productPrice: 380, image: "https://www.crossjeans.com/media/image/dd/b6/26/E_198_020_cross_jeans_null_1_800x800.jpg" },
            { productName: "Zara jeans", productPrice: 200, image: "https://static.zara.net/photos///2023/V/0/2/p/0840/385/800/2/w/750/0840385800_6_1_1.jpg?ts=1669216977337" },
            { productName: "Renuar jeans", productPrice: 150, image: "https://www.renuar.co.il/dw/image/v2/BDRJ_PRD/on/demandware.static/-/Sites-renuar-master/default/dw3f8ca0da/images/large/422455429/422455429-2.jpg?sh=1000" },
            { productName: "Castro jeans", productPrice: 120, image: "https://www.castro.com/pub/media/catalog/product/cache/638ddee3296a44eae2e0ce5c49c2d017/2/0/2070750.01.2001_d3-1662376810426554.jpg" },
            { productName: "Zara jacket", productPrice: 250, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr1bw_Vh9AAP26i3IuRRL-j-XNB13Wx49rdA&usqp=CAU" },
            { productName: "Renuar jacket", productPrice: 250, image: "https://i.ebayimg.com/images/g/aEMAAOSwywpkb9f1/s-l500.jpg" },
            { productName: "ONE PIECE jacket", productPrice: 200, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQu2pj8MANcq1gvbnFZzUZrUqpCx3CDu39Xf8wfYR1RfhnBgwbrRkTSpkubjmp1BvvSrRXZq660zlqkGKHE6-bU_cDNZbs9CmMNX9D5AD47wbm7DWL9mulqdw&usqp=CAE" },
            { productName: "Denim jacket", productPrice: 350, image: "https://static.pullandbear.net/2/photos//2023/I/0/2/p/4710/540/427/4710540427_1_1_8.jpg?t=1686728547245&imwidth=750" },
            { productName: "Zara swimsuit", productPrice: 100, image: "https://i.etsystatic.com/23536483/r/il/ef30a2/5064075923/il_794xN.5064075923_3uq2.jpg" },
            { productName: "Castro swimsuit", productPrice: 80, image: "https://www.tilboshet.co.il/images/itempics/23182803102_16042023162650.jpg" },
            { productName: "Bershka swimsuit", productPrice: 85, image: "https://static.bershka.net/4/photos2/2023/I/0/2/p/4807/305/402/7e2efdc3aac6ac78acfed08d8b146da0-4807305402_2_4_0.jpg?cropfixwidth=2052&imwidth=750&impolicy=bershka-crop-fix-width-itxmediumhigh&imformat=chrome" },
            { productName: "Basic swimsuit", productPrice: 50, image: "https://static.bershka.net/4/photos2/2023/I/0/2/p/4806/305/420/ce7419411c48a084f65a09f015de7cab-4806305420_2_4_0.jpg?cropfixwidth=2052&imwidth=750&impolicy=bershka-crop-fix-width-itxmediumhigh&imformat=chrome" },
            { productName: "Silver ring", productPrice: 130, image: "https://hg-unique-jewelry.co.il/wp-content/uploads/2021/09/20210808-web-res-1500-38_optimized.jpg" },
            { productName: "Gold ring", productPrice: 650, image: "https://cdn10.bigcommerce.com/s-fc1z5ke/products/157/images/2829/USAF_gold_500px__93491.1639536854.380.500.jpg?c=2" },
            { productName: "gold neckless", productPrice: 3200, image: "https://i0.wp.com/www.noyasjewelry.co.il/wp-content/uploads/2021/04/%D7%A9%D7%A8%D7%A9%D7%A8%D7%AA-%D7%A7%D7%95%D7%91%D7%A0%D7%99%D7%AA-%D7%96%D7%94%D7%91-5-%D7%9E%D7%9E.jpg?resize=768%2C768&ssl=1" },
            { productName: "Castro boxers", productPrice: 60, image: "https://m.media-amazon.com/images/I/71atmecQ2gL._AC_SY606_.jpg" },
            { productName: "CK boxers", productPrice: 200, image: "https://www.factory54.co.il/on/demandware.static/-/Sites-master-catalog/default/dw37ec3e82/images/large/850450644_P_1.png" },
            { productName: "Pierr cardin boxers", productPrice: 100, image: "https://cdn.shopify.com/s/files/1/0472/9123/6517/products/7297611219850-9_720x.jpg?v=1624540947" },
            { productName: "Cotton socks", productPrice: 40, image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/60bbe24b-2a42-4269-b24b-606e3339a08a/everyday-cushioned-training-crew-socks-znMjdV.png" },
            { productName: "No show socks", productPrice: 40, image: "https://www.vans.co.il/media/catalog/product/cache/c561981a6a0fbcb7af3b8463720b42ef/v/n/vn000xttwht-hero_1.jpg" },
            { productName: "Long socks ", productPrice: 40, image: "https://www.canyon.com/dw/image/v2/BCML_PRD/on/demandware.static/-/Sites-canyon-master/default/dw0be9713c/images/full/9101709_Ca/2022/9101709_Canyon_Signature_Pro_Wool_Socks_grey_full_v2.png" }
        ]
    await productModel.insertMany(products);

};

// _________________________________________________________________/
 
const genErrorPage = (statusCode, message) => {
    const htmlPage =
    `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>
<body>
    <!-- navbar -->
    <nav>
        <div id="logo" class="nav-items">SVShop</div>
        <a id="home" class="nav-items" href="/products">Home</a>
    </nav>
    <div id="errDivContainer">
        <div id="errDiv">
            <p>Error ${statusCode}!</p>
            <p>${message}</p>
        </div>
    </div>
</body>
</html>
    
    `;

    return htmlPage;
}

const createError = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}


module.exports = {
    fillUp, genErrorPage, createError
};