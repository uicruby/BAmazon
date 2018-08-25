DROP DATABASE IF EXISTS Bamazon;
CREATE DATABASE Bamazon;

USE Bamazon;

-- create a table in database called products
CREATE TABLE Products(
ItemID INT NOT NULL AUTO_INCREMENT ,
    ProductName VARCHAR(100) NOT NULL,
    DepartmentName VARCHAR(50) NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    StockQuantity INT(10) NOT NULL,
    primary key(ItemID)
);
 SELECT * FROM Products;

-- values in the table product
INSERT INTO Products(ProductName,DepartmentName,Price,StockQuantity)
VALUES("dove", "Cosmetic", 5.00,50),
      ("puma","Shoes",70.50,20),
      ("SunGlasses", "Clothing",100.00,20),
      ("PS4", "Gaming",600.00,10),
      ("League of Legends", "Gaming", 60.00,20),
      ("Denim Jeans","Clothing",50.00,15),
      ("Gain","Soap and Detergents",30.00,15),
      ("Foundation","Makeup products",30.00,15),
      ("pillows","Bedding",25,18),
      ("Blankets","Bedding",30.00,12);
