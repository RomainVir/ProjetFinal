import express from "express";
import offerController from "../controllers/offers_controller.js";

const offerRouter = express.Router();

//modify a offer
offerRouter.patch("/:id", offerController.updateOffer);

//add a offer
offerRouter.post("/add_offer", offerController.addOffer);

//obtener un offer
offerRouter.get("/offers", offerController.getOffer);

export default offerRouter;
