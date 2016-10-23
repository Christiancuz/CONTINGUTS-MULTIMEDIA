var express = require('express');
var Item = require('./Item.js').Item;
var app = express();

// Configure jade to be our rendering engine
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

// Enable boostrap from npm as a served static directory
app.use("/libs",express.static('node_modules/bootstrap/dist'));

// Our CSS and JS files
app.use("/public",express.static('public'));

/*
var pics = [
    new Item("https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1457657054/430449_4E986_1100_001_100_0000_Light-Corbata-de-seda-y-lana-con-colibres.jpg", "Seda Lana_Colibrí", "79.5"),
    new Item("https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1448307014/417348_4E781_6478_001_100_0000_Light-Corbata-seda-algodn-estrella-abeja.jpg", "Seda_Cabezas_Felinas", "80.45"),
    new Item("https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1465229137/428813_4X201_1472_001_100_0000_Light-Corbata-de-cashmere-con-flores.jpg", "Cashmere_con_flores", "60.85"),
    new Item("https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1457657054/428855_4E002_4768_001_100_0000_Light-Corbata-de-seda-con-tribanda-y-abeja.jpg", "Tribanda_Abeja", "99.99"),
    new Item("https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1473093910/451521_4E630_4174_001_100_0000_Light-Corbata-de-Lino-de-Seda-con-Estampado-de-Lunares.jpg","Motivo_GG", "79.95"),
    new Item("https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1473093910/451521_4E630_4174_001_100_0000_Light-Corbata-de-Lino-de-Seda-con-Estampado-de-Lunares.jpg", "G_Tribanda", "69.95"),
    new Item("https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1442412026/406354_4E002_4000_001_100_0000_Light-Corbata-de-seda-GG-con-tribanda.jpg", "A7", "89.95"),
    new Item("https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1446753609/409254_4E002_6568_001_100_0000_Light-Lazo-de-seda-de-jacquard-con-motivo-floral.jpg", "Lazo_seda_floral", "69.95"),
    new Item("https://media.gucci.com/style/DarkGray_Center_0_0_980x980/1439376067/183430_4B002_1000_001_100_0000_Light-Corbata-de-jacquard-de-seda.jpg", "Jacquard_de_seda", "49.95")
];
*/

// Use 500px API to get random pictures for our products
var API500px = require('500px');
var api500px = new API500px("YecP85RjzG08DN0MqvgFa0N780dNaDmJX6iTPbYp");

api500px.photos.searchByTerm('Tahití', {'sort': 'created_at', 'rpp': '10','image_size':200},  function(error, results) {
	// Do something
	pics = results.photos.map(function(a){
		// Compose object to be used in show items template
		return new Item(a.image_url);
	});
});

// Render frontpage
app.get('/', function (req, res) {
    res.render('portada',{
        pics: pics
    });
});


// Server start
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
