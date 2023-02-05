import express from "express";
import productController from "../controllers/products_controller.js";

const productRouter = express.Router();

//subir una o varias imagenes a la bdd y servidor

productRouter.post("/upload", productController.uploadImage);

// Obtener una imagen por su id
productRouter.get("/image/:id", productController.getImage);


//add a product
productRouter.post("/add_product", productController.addProduct);

export default productRouter;
