var Products = new Meteor.Collection("Products");
Products.insert({Name : "Hammer", Price : 4.50, InStock : true});
Products.insert({Name : "Wrench", Price : 2.70, InStock : true});
Products.insert({Name : "Screw Driver", Price : 3.00, InStock : false});
Products.insert({Name : "Drill", Price : 5.25, InStock : true});
if (Meteor.isClient) {
  
  Template.Products.ProductArr = function(){
	return Products.find({}, {sort: {Name: 1}});
  };


var Cart = new Meteor.Collection("Cart");

Template.Cart.CartItems = function(){
	return Cart.find({}, {sort:{Name: 1}});
}

Template.Cart.Total = function(){
	return this.Price * this.Quantity;
}
Template.Cart.Subtotal = function(){
	var Items = Cart.find({});
	var Sum = 0;
	
	Items.forEach(function(Item){
		Sum += Item.Price * Item.Quantity;
		});
		return Sum;
		};
  
 Template.Products.events = {
 "click.Product": function(){
	if(this.InStock)
	{
		if(Cart.find({Name:this.Name, Price:this.Price}).count() > 0)//daca este deja un produs in cos
		{
			if(Confirm("Would you like to buy a " + this.Name)) //daca user doreste sa mai cumpere unul
				Cart.update(
					{ Name: this.Name, Price: this.Price },
					{ $inc: {Quantity: 1}});//incrementeaza cantitatea prod cu 1
		}
		else
		{
			if(Confirm("Would you like to buy a " + this.Name + " for " + this.Price + "$"))
				Cart.insert({Name: this.Name, Price: this.Price, Quantity: 1});//key: value [atribuire]
		}
	}
	else
		alert("This item is not in stock");
	}
};
}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  }
