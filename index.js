
var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');

mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"node_project"
});


var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');


app.listen(8000);
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret:"secret"}));

function isProductInCart(cart,id){
    for (let i = 0; i< cart.length; i++){
        if(cart[i].id == id){
            return true;
        }
    }
    return false;
};

function caculateTotal(cart, req){
    total = 0;
    for (let i = 0; i< cart.length; i++){
        if(cart[i.price]){
            // total = total + cart[i.price]*cart[i*quantity];
        }else {
            // total = total + cart[i.price]*cart[i*quantity];
        }
    }
    req.session.total = total;
    return total;
};

// localhost:8000
app.get('/', function(req, res){

    var con = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"node_project"
    });

    con.query("SELECT * FROM products", (err,result)=>{
        res.render('pages/index',{result:result});
    });

});

app.post('/add_to_cart',function(req,res){
    var id = req.body.id;
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var quantity = 10;
    var product = {id:id,name:name,price:price,image:image, quantity:quantity};

    if (!req.session.cart) {
        req.session.cart = [];
    }
    req.session.cart.push(product);

    res.redirect('/');
});

app.get('/cart', function(req,res){
    var cart = req.session.cart;
    var total = req.session.total;

    res.render('pages/cart',{cart:cart,total:total});
});

app.get('/about', function(req,res){

    res.render('pages/about');
});

app.get('/blog', function(req,res){

    res.render('pages/blog');
});

app.get('/product', function(req,res){

    res.render('pages/product');
});

app.post('/remove_from_cart', function(req, res){
    var id = req.body.id; // Assuming the item index is sent in the request body
    var cart = req.session.cart;
    
    for (let i = 0; i<cart.length; i++){
        if (cart[i].id == id) {
            req.session.cart.splice(cart.indexOf(i),1);
        }
    }
    
    res.redirect('/cart');
});