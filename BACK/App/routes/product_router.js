import express from "express";
import productController from "../controllers/products_controller.js";

const productRouter = express.Router();

//subir una o varias imagenes a la bdd y servidor

productRouter.post("/upload", productController.uploadImage);

// Obtener una imagen por su id
productRouter.get("/image/:id", productController.getImage);

//modify a product
productRouter.patch("/:id", productController.updateProduct);
//add a product
productRouter.post("/add_product", productController.addProduct);

//delete a product
productRouter.delete("/delete_product", productController.deleteProductByRef);

//obtener un product
productRouter.get("/products", productController.getProduct);

export default productRouter;
