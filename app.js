// Variable Declarations
var expressSanitizer  = require("express-sanitizer"),
    methodOverride    = require("method-override"),
    bodyParser        = require("body-parser"),
    express           = require("express"),
    app               = express(),
    request           = require('superagent'),
    //mongoose          = require("mongoose"),
    braintree         = require("braintree");


//Braintree Configuration
var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   'mc4gptqzgysjbp73',
    publicKey:    'n663hwc8487xj3rj',
    privateKey:   'f0f797403ec7da67a69cf23a02596722'
});


// Application Configuration
//mongoose.connect("mongodb://localhost/customer_profile");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.locals.basedir = __dirname + '/partials';

//Mongoose Customer Schema Configuration
//var customerSchema = new mongoose.Schema({
//  package: {type: String, default: "B HomeTV"},
//  accountNumber: String,
//  pinCode: {type: Number, default: "1111"},
//  username: String,
//  password: {type: String, default: "123456"},
//  image: { type: String, default: "https://d30y9cdsu7xlg0.cloudfront.net/png/1095860-200.png"},
//  posts: [postSchema],
//  firstName: String,
//  lastName: String,
//  email: String,
//  phoneNumber: String,
//  address: String,
//  addressTwo: String,
//  city: String,
//  zipcode: Number,
//  country: String,
//  state: String,
//  language: {type: String, default: "English"},
//  dateOfBirth: {type: Date, default: Date.now},
//  timezone: String
//});

//Mongoose Model Configuration
//var Customer = mongoose.model("Customer", customerSchema);


//Routes Configuration
//=====================

// * root
app.get("/", function(req, res, next){
      res.render("home");
  });

app.get("/terms", function(req, res){
  res.render("terms");
});

app.get("/channels", function(req, res){
	res.render("channels");
});

app.get("/thankYou", function(req,res){
	res.render("thanks");
});

app.get("/support", function(req, res){
	res.render("support");
});

//Installation Routes
//===================
app.get("/install/firetv", function(req, res){
	res.render("firetv");
});


//Mailchimp addSubscriber
//=======================

var mailchimpInstance   = 'us16',
    listUniqueId        = 'b727076568',
    mailchimpApiKey     = 'ad137dd5d9ca3cc45b0757015ae4ff7c-us16';


app.post("/subscribers/new", function(req, res){
   request
        .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
        .send({
          'email_address': req.body.email,
          'status': 'subscribed',
          'merge_fields': {
            'FNAME': req.body.firstName,
            'LNAME': req.body.lastName
          }
        })
            .end(function(err, response) {
              if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
                res.redirect('/thankYou');
              } else {
                res.send('Sign Up Failed :(' + err);
              }
          });
});

//Product Pages
//================

app.get("/products/mediaGateway", function(req,res){
  res.render("mediaGateway");
});

app.get("/help", function(req, res){
  res.render("help");
});



//Server Listener Setup
app.listen(8080, process.env.IP, function(){
  console.log("The Server Has Started...")
});
