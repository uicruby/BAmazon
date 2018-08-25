//require mysql and inquirer
var mysql = require("mysql");
var inquirer = require('inquirer');
//create connection to dataBase
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "Bamazon"
});
connection.connect(function (err) {
    if (err) throw err
    console.log("connected as id " + connection.threadId);
     start();

});


// function to start
function start() {
    //     // print items for sales and there details
    connection.query('SELECT * FROM Products', function (err, res) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("WELCOME TO BAMAZON");
            console.log('---------------------------------------------');

            for (var i = 0; i < res.length; i++) {
                // will display info for every item
                console.log("ID: " + res[i].ItemID + " | " + "Product: " + res[i].ProductName + " | " + "Department: " + res[i].DepartmentName + " | " + "Price: " + res[i].Price + " | " + "QTY: " + res[i].StockQuantity);
                console.log('--------------------------------------------------------------------------------------------------');
            }
        }

        // prompt users with two messages.
        console.log(' ');

        inquirer.
            prompt([
                // 1st ask the user the ID of the product they would like to buy.
                {
                    type: "input",
                    name: "id",
                    message: "What is the id for the product that you would like to purchase?",
                    validate: function (value) {
                        if (isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                },
                // how many units of the product user would like to buy.
                {
                    type: "input",
                    name: "qty",
                    message: "How much would you like to purchase?",
                    validate: function(value){
                      if(isNaN(value)){
                        return false;
                      } else{
                        return true;
                      }
                    }
                }
            ]).then(function(ans){
                var whatToBuy=(ans.id)-1;
                var howMuchToBuy=parseInt(ans.qty);
                // res[id of what user want to buy].price on that id* qty to buy
                var grandTotal=parseFloat(((res[whatToBuy].Price)*howMuchToBuy).toFixed(2));

                // check if quantity is sufficient
                if(res[whatToBuy].StockQuantity>=howMuchToBuy){
                    
                    // if there is sufficient, update quantity in table product
                    connection.query("UPDATE Products SET ? WHERE ?", [
                        {StockQuantity: (res[whatToBuy].StockQuantity - howMuchToBuy)},
                        {ItemID: ans.id}
                        ], function(err, result){
                            if(err) throw err;
            console.log("Success! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped to you in 3-5 business days.");
                        });

                }
                else{
                    console.log("we are sorry, we don't have"+ howMuchToBuy +"items");
                }
            })

    });
}
