/*
var Item = function Item(href,titulo,precio){
    this.href = href;
	this.titulo=titulo;
    this.precio = precio;
};

Item.prototype.getPrice = function(){
   return this.precio;
}

exports.Item = Item;
*/


var Item = function Item(imagen){
	this.image = imagen;
	this.price = 0.00;
    	this.name = "Tahití";
};

// Get random price in range min, max
Item.prototype.getPrice = function(){
	var min = 100;
	var max = 1000;
	return (Math.random() * (max - min) + min).toFixed(2);
}

exports.Item = Item;
