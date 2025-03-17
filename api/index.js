import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";

import {
  registerUsers,
  singin,
  getMetrics,
} from "./controllers/UserController.js";

import {
  AddProduct,
  ShowProduct,
  ShowProducts,
  DeleteProduct,
} from "./controllers/ShoesController.js";

import {
  AddCart,
  Buy,
  ShowCartProducts,
  deleteAll,
  deleteOne,
  updateProduct,
} from "./controllers/CartController.js";

dotenv.config();

mongoose
  .connect(process.env.url_db)
  .then(() => {
    console.log("✅ Conexión exitosa a la base de datos");
  })
  .catch((error) => {
    console.log("❌ Error al conectar a la base de datos:", error);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(4000, () => {
  console.log("🚀 Aplicación corriendo en el puerto 4000");
});

// 📦 Rutas de usuarios
app.post("/users/register", registerUsers);
app.post("/users/login", singin);
app.get("/metrics", getMetrics);

// 📦 Rutas de productos
app.post("/product/add", AddProduct);
app.post("/product/buy", Buy);
app.get("/product/showAll", ShowProducts);
app.post("/product/show", ShowProduct);
app.delete("/product/delete/:id", DeleteProduct); // <- DELETE TENIS

// 📦 Rutas del carrito
app.post("/cart/add", AddCart);
app.post("/cart/showAll", ShowCartProducts);
app.delete("/cart/delete/:id", deleteOne);
app.delete("/cart/deleteAll/:id", deleteAll);
app.put("/cart/update", updateProduct);
