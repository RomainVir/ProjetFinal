import express from "express";
import deliveryController from "../controllers/delivery_controller.js";

const deliveryRouter = express.Router();

//add a delivery
deliveryRouter.post("/add_delivery", deliveryController.addDelivery);

//obtener un delivery
deliveryRouter.get("/deliveries", deliveryController.getDelivery);

export default deliveryRouter;
