
var Item = function Item(href,titulo,precio){
    this.href = href;
	this.titulo=titulo;
    this.precio = precio;
};

Item.prototype.getPrice = function(){
   return this.precio;
}

exports.Item = Item;
