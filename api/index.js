import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { registerUsers, singin, getMetrics } from "./controllers/UserController.js";
import { AddProduct, ShowProduct, ShowProducts } from "./controllers/ShoesController.js";
import { AddCart, ShowCartProducts, deleteAll, deleteOne, updateProduct } from "./controllers/CartController.js";

dotenv.config()
mongoose.connect(process.env.url_db)
    .then(()=>{
        console.log("Hay conexion a la base de datos")
    })
    .catch((error)=>{
        console.log("Hay un error: ", error)
})

const app = express();
    app.use(cors());
    //parse JSON responses
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.listen(4000, ()=>{
        console.log("Aplicaion corriendo en el servidor")
})

//users
app.post("/users/register", registerUsers)
app.post("/users/login", singin)
app.get("/metrics", getMetrics)

//products
app.post("/product/add", AddProduct)
app.post("/product/show", ShowProduct)
app.get("/product/showAll", ShowProducts)

//cart
app.post("/cart/add", AddCart)
app.post("/cart/showAll", ShowCartProducts)
app.delete("/cart/delete/:id", deleteOne)
app.delete("/cart/deleteAll/:id", deleteAll)
app.put("/cart/update", updateProduct)

