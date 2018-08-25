//require mysql and inquirer
var mysql = require("mysql");
var inquirer = require('inquirer');
// create connection to database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Replicated@1",
  database: "Bamazon"
})
// below commented code is to check connection with mySql
// connection.connect(function (err) {
//   if (err) throw err
//   console.log("connected as id " + connection.threadId);
  start();
// });


//   function to ask the manager what would he like to do and then direct him to required function
function start(){
    inquirer.prompt([{
        type: "list",
        name: "doThing",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product","End Session"]
      }]).then(function(ans){
        switch(ans.doThing){
            case "View Products for Sale": viewProducts();
            break;
            case "View Low Inventory": viewLowInventory();
            break;
            case "Add to Inventory": addToInventory();
            break;
            case "Add New Product": addNewProduct();
            break;
            case "End Session": console.log('Bye!');
          }
        });
}
// if manager wants to view products
function viewProducts(){
    console.log('>>>>>>Viewing Products<<<<<<');

    connection.query('SELECT * FROM Products', function(err, res){
    if(err) throw err;
    console.log('----------------------------------------------------------------------------------------------------')

    for(var i = 0; i<res.length;i++){
      console.log("ID: " + res[i].ItemID + " | " + "Product: " + res[i].ProductName + " | " + "Department: " + res[i].DepartmentName + " | " + "Price: " + res[i].Price + " | " + "QTY: " + res[i].StockQuantity);
      console.log('--------------------------------------------------------------------------------------------------')
    }
//   will take back the manager to start page
    start();
    });
  }

//   if manager wants to view low inventory
function viewLowInventory(){
    console.log('>>>>>>Viewing Low Inventory<<<<<<');

    connection.query('SELECT * FROM Products', function(err, res){
    if(err) throw err;
    console.log('----------------------------------------------------------------------------------------------------')

    for(var i = 0; i<res.length;i++){
      if(res[i].StockQuantity <= 5){
      console.log("ID: " + res[i].ItemID + " | " + "Product: " + res[i].ProductName + " | " + "Department: " + res[i].DepartmentName + " | " + "Price: " + res[i].Price + " | " + "QTY: " + res[i].StockQuantity);
      console.log('--------------------------------------------------------------------------------------------------');
      }
    }

    start();
    });
  }

//   if manager wants to add to inventory
function addToInventory(){
    console.log('>>>>>>Adding to Inventory<<<<<<');

    connection.query('SELECT * FROM Products', function(err, res){
    if(err) throw err;
    var itemArray = [];
    //pushes each item into an itemArray
    for(var i=0; i<res.length; i++){
      itemArray.push(res[i].ProductName);
    }

    inquirer.prompt([{
      type: "list",
      name: "product",
      choices: itemArray,
      message: "Which item would you like to add inventory?"
    }, {
      type: "input",
      name: "qty",
      message: "How much would you like to add?",
      validate: function(value){
        if(isNaN(value) === false){return true;}
        else{return false;}
      }
      }]).then(function(ans){
        var currentQty;
        for(var i=0; i<res.length; i++){
          if(res[i].ProductName === ans.product){
            currentQty = res[i].StockQuantity;
          }
        }
        connection.query('UPDATE Products SET ? WHERE ?', [
          {StockQuantity: currentQty + parseInt(ans.qty)},
          {ProductName: ans.product}
          ], function(err, res){
            if(err) throw err;
            console.log('The quantity was updated.');
            start();
          });
        })
    });
  }
  function addNewProduct(){
    
  }

// start();